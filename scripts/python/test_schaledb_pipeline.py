import unittest
from unittest.mock import Mock, patch

from banner_utils import resolve_global_release_dates
from fetch_info import build_character_info
from global_student_list import build_global_student_list
from schaledb_utils import get_student_id, get_students_by_id
from wiki_utils import fetch_release_dates, parse_release_dates


def student(**overrides):
    value = {
        "Id": 100,
        "Name": "Aru",
        "DefaultOrder": 7,
        "IsReleased": [True, False, False],
        "FamilyName": "Rikuhachima",
        "PersonalName": "Aru",
        "School": "Gehenna",
        "BulletType": "Explosion",
        "ArmorType": "LightArmor",
        "TacticRole": "DamageDealer",
        "SquadType": "Main",
        "Skills": {"Ex": {"Cost": [4, 4, 4, 4, 4]}},
        "Position": "Back",
        "CharHeightMetric": "160cm",
        "WeaponType": "SR",
        "BirthDay": "3/12",
    }
    value.update(overrides)
    return value


class SchaleDbPipelineTest(unittest.TestCase):
    def test_uses_schaledb_name_as_student_id(self):
        self.assertEqual(
            get_student_id(student(Name="Shiroko (Cycling)")),
            "Shiroko_(Cycling)",
        )

    def test_merges_release_flags_for_duplicate_battle_forms(self):
        first = student(
            Id=10098,
            Name="Hoshino (Armed)",
            DefaultOrder=188,
            IsReleased=[True, True, True],
        )
        second = student(
            Id=10099,
            Name="Hoshino (Armed)",
            DefaultOrder=189,
            IsReleased=[True, False, False],
        )

        merged = get_students_by_id({"10098": first, "10099": second})

        self.assertEqual(list(merged), ["Hoshino_(Armed)"])
        self.assertEqual(merged["Hoshino_(Armed)"]["DefaultOrder"], 188)
        self.assertEqual(merged["Hoshino_(Armed)"]["IsReleased"], [True, True, True])

    def test_builds_release_date_and_normalizes_schaledb_values(self):
        info = build_character_info(
            student(BulletType="Pierce", TacticRole="Tanker"),
            student(FamilyName="陸八魔", PersonalName="アル"),
            "2021/03/12",
        )

        self.assertEqual(info["releaseDate"], "2021/03/12")
        self.assertEqual(info["damageType"], "Piercing")
        self.assertEqual(info["role"], "Tank")
        self.assertEqual(info["birthday"], "2000/03/12")
        self.assertEqual(info["nativeName"], "陸八魔 アル")

    def test_parses_release_date_from_character_template(self):
        wikitext = """{{Character
| Id = 20035
| Wikiname = Tsubaki (Guide)
| ReleaseDate = 2024/03/27
| ReleaseDateGL = 2024/24/09
}}"""

        self.assertEqual(
            parse_release_dates(wikitext),
            (20035, "2024/03/27", "2024/09/24"),
        )

    def test_ignores_missing_or_invalid_release_dates(self):
        self.assertIsNone(parse_release_dates("| Id = 100\n| ReleaseDate ="))
        self.assertIsNone(
            parse_release_dates("| Id = 100\n| ReleaseDate = 2024/99/99")
        )

    @patch("wiki_utils.requests.get")
    def test_fetches_paginated_release_dates(self, get: Mock):
        first_response = Mock()
        first_response.json.return_value = {
            "continue": {"rvcontinue": "next", "continue": "||"},
            "query": {
                "pages": [
                    {
                        "revisions": [
                            {
                                "slots": {
                                    "main": {
                                        "content": "| Id = 100\n| ReleaseDate = 2021/03/12"
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
        }
        second_response = Mock()
        second_response.json.return_value = {
            "query": {
                "pages": [
                    {
                        "revisions": [
                            {
                                "slots": {
                                    "main": {
                                        "content": "| Id = 101\n| ReleaseDate = 2022/04/20\n| ReleaseDateGL = 2022/18/10"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
        get.side_effect = [first_response, second_response]

        self.assertEqual(
            fetch_release_dates(),
            (
                {100: "2021/03/12", 101: "2022/04/20"},
                {101: "2022/10/18"},
            ),
        )
        self.assertNotIn("rvcontinue", get.call_args_list[0].kwargs["params"])
        self.assertEqual(
            get.call_args_list[1].kwargs["params"]["rvcontinue"], "next"
        )

    def test_global_list_uses_schaledb_release_flag(self):
        released = student(Name="Aru", IsReleased=[True, True, False])
        jp_only = student(Id=101, Name="Hina", IsReleased=[True, False, False])
        jp_data = {"Aru": {"id": "Aru"}, "Hina": {"id": "Hina"}}

        global_data = build_global_student_list(
            jp_data,
            {"100": released, "101": jp_only},
            {100: "2021/11/09"},
        )

        self.assertEqual(
            global_data,
            {"Aru": {"id": "Aru", "releaseDate": "2021/11/09"}},
        )

    def test_resolves_global_dates_from_banners_and_release_cohorts(self):
        featured = student(
            Id=102,
            Name="Saya (Casual)",
            StarGrade=3,
            IsReleased=[True, True, False],
        )
        two_star = student(
            Id=103,
            Name="Kirino",
            StarGrade=2,
            IsReleased=[True, True, False],
        )
        yuzu = student(
            Id=20055,
            Name="Yuzu (Armed)",
            StarGrade=3,
            IsReleased=[True, True, False],
        )

        release_dates = resolve_global_release_dates(
            {"102": featured, "103": two_star, "20055": yuzu},
            {
                102: "2021/08/12",
                103: "2021/08/12",
                20055: "2026/02/12",
            },
            {},
            {
                "Saya (Casual)": "2021/10/27",
                "Yuzu (Armed)": "2026/06/23",
            },
        )

        self.assertEqual(release_dates[102], "2021/10/27")
        self.assertEqual(release_dates[103], "2021/10/27")
        self.assertEqual(release_dates[20055], "2026/06/23")


if __name__ == "__main__":
    unittest.main()
