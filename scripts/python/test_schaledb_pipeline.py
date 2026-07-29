import unittest

from fetch_info import build_character_info
from global_student_list import build_global_student_list
from schaledb_utils import get_student_id, get_students_by_id


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

    def test_builds_release_order_and_normalizes_schaledb_values(self):
        info = build_character_info(
            student(BulletType="Pierce", TacticRole="Tanker"),
            student(FamilyName="陸八魔", PersonalName="アル"),
        )

        self.assertEqual(info["releaseOrder"], 7)
        self.assertEqual(info["damageType"], "Piercing")
        self.assertEqual(info["role"], "Tank")
        self.assertEqual(info["birthday"], "2000/03/12")
        self.assertEqual(info["nativeName"], "陸八魔 アル")

    def test_global_list_uses_schaledb_release_flag(self):
        released = student(Name="Aru", IsReleased=[True, True, False])
        jp_only = student(Id=101, Name="Hina", IsReleased=[True, False, False])
        jp_data = {"Aru": {"id": "Aru"}, "Hina": {"id": "Hina"}}

        global_data = build_global_student_list(
            jp_data, {"100": released, "101": jp_only}
        )

        self.assertEqual(global_data, {"Aru": {"id": "Aru"}})


if __name__ == "__main__":
    unittest.main()
