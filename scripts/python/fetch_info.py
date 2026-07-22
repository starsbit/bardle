import os
import re

from folder_management import get_asset_folder
from generate_icons import generate_icon_name, generate_icons
from json_utils import dump_data, load_jp_data
from schaledb_utils import (
    ARMOR_TYPE_MAP,
    BULLET_TYPE_MAP,
    JP_REGION,
    ROLE_MAP,
    SCHOOL_MAP,
    SQUAD_TYPE_MAP,
    fetch_schaledb_en,
    fetch_schaledb_jp,
    get_outfit,
    get_student_id,
    get_students_by_id,
)
from wiki_utils import fetch_release_dates


def extract_integer(value: str):
    match = re.search(r"\d+", value)
    return int(match.group()) if match else None


def format_birthday(value: str) -> str:
    """Convert SchaleDB's M/D birthday to the date-shaped format used by Bardle."""
    try:
        month, day = value.split("/")
        return f"2000/{int(month):02d}/{int(day):02d}"
    except (ValueError, AttributeError):
        return value


def _full_name(student: dict) -> str:
    family_name = student.get("FamilyName", "")
    personal_name = student.get("PersonalName", student.get("Name", ""))
    return " ".join(part.strip() for part in (family_name, personal_name) if part.strip())


def build_character_info(
    en_student: dict, jp_student: dict | None, release_date: str
) -> dict:
    student_id = get_student_id(en_student)
    outfit = get_outfit(en_student)
    full_name = _full_name(en_student)
    if outfit != "Default":
        full_name += f" ({outfit})"

    ex_costs = en_student.get("Skills", {}).get("Ex", {}).get("Cost", [])
    return {
        "id": student_id,
        "fullName": full_name,
        "shortName": en_student["Name"],
        "nativeName": _full_name(jp_student) if jp_student else "",
        "school": SCHOOL_MAP.get(
            en_student.get("School", ""), en_student.get("School", "")
        ),
        "damageType": BULLET_TYPE_MAP.get(
            en_student.get("BulletType", ""), en_student.get("BulletType", "")
        ),
        "armorType": ARMOR_TYPE_MAP.get(
            en_student.get("ArmorType", ""), en_student.get("ArmorType", "")
        ),
        "role": ROLE_MAP.get(
            en_student.get("TacticRole", ""), en_student.get("TacticRole", "")
        ),
        "combatClass": SQUAD_TYPE_MAP.get(
            en_student.get("SquadType", ""), en_student.get("SquadType", "")
        ),
        "exSkillCost": ex_costs[0] if ex_costs else None,
        "positioning": en_student.get("Position", ""),
        "height": extract_integer(en_student.get("CharHeightMetric", "")) or 0,
        "outfit": outfit,
        "releaseDate": release_date,
        "weaponType": en_student.get("WeaponType", ""),
        "image": generate_icon_name(student_id),
        "birthday": format_birthday(en_student.get("BirthDay", "")),
        "disabled": False,
    }


def build_jp_student_list(
    en_data: dict,
    jp_data: dict,
    existing_info: dict,
    release_dates: dict[int, str],
) -> dict:
    jp_by_schale_id = {int(key): value for key, value in jp_data.items()}
    characters = {}

    for student_id, student in get_students_by_id(en_data).items():
        if not student.get("IsReleased", [False])[JP_REGION]:
            continue

        release_date = release_dates.get(student["Id"])
        if not release_date:
            raise ValueError(
                f"Blue Archive Wiki has no JP release date for "
                f"{student['Name']} (ID {student['Id']})"
            )
        info = build_character_info(
            student, jp_by_schale_id.get(student["Id"]), release_date
        )
        info["disabled"] = existing_info.get(student_id, {}).get("disabled", False)
        characters[student_id] = info

    return characters


def fetch_info(
    en_data: dict | None = None,
    jp_data: dict | None = None,
    release_dates: dict[int, str] | None = None,
) -> dict:
    en_data = en_data or fetch_schaledb_en()
    jp_data = jp_data or fetch_schaledb_jp()
    if release_dates is None:
        release_dates, _ = fetch_release_dates()

    generate_icons(en_data)

    character_info_path = get_asset_folder() + "character_info.json"
    existing_info = load_jp_data() if os.path.exists(character_info_path) else {}
    characters = build_jp_student_list(
        en_data, jp_data, existing_info, release_dates
    )
    dump_data(characters, character_info_path)
    print(f"Wrote {len(characters)} JP students to {character_info_path}")
    return characters
