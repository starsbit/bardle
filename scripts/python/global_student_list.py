from banner_utils import fetch_global_banner_dates, resolve_global_release_dates
from folder_management import get_asset_folder
from json_utils import dump_data, load_gl_data, load_jp_data
from schaledb_utils import GLOBAL_REGION, fetch_schaledb_en, get_students_by_id
from wiki_utils import fetch_release_dates


def build_global_student_list(
    jp_data: dict, en_data: dict, release_dates: dict[int, str]
) -> dict:
    students = get_students_by_id(en_data)
    global_students = {}
    for student_id, student in jp_data.items():
        schaledb_student = students.get(student_id)
        if not schaledb_student or not schaledb_student.get(
            "IsReleased", [False, False]
        )[GLOBAL_REGION]:
            continue

        release_date = release_dates.get(schaledb_student["Id"])
        if not release_date:
            raise ValueError(
                f"Blue Archive Wiki has no Global release date for "
                f"{schaledb_student['Name']} (ID {schaledb_student['Id']})"
            )
        global_students[student_id] = {
            **student,
            "releaseDate": release_date,
        }

    return global_students


def generate_global_student_list(
    jp_data: dict | None = None,
    en_data: dict | None = None,
    release_dates: dict[int, str] | None = None,
):
    jp_data = jp_data or load_jp_data()
    en_data = en_data or fetch_schaledb_en()
    if release_dates is None:
        jp_release_dates, wiki_global_dates = fetch_release_dates()
        release_dates = resolve_global_release_dates(
            en_data,
            jp_release_dates,
            wiki_global_dates,
            fetch_global_banner_dates(),
        )
    global_student_list = build_global_student_list(
        jp_data, en_data, release_dates
    )
    target_file = get_asset_folder() + "character_info_gl.json"
    dump_data(global_student_list, target_file)
    return global_student_list


def disable_student(student_id):
    characters = load_jp_data()
    if student_id in characters:
        characters[student_id]["disabled"] = True
        dump_data(characters, get_asset_folder() + "character_info.json")
        print(f"Student {student_id} has been disabled in the JP character list.")

    characters = load_gl_data()
    if student_id in characters:
        characters[student_id]["disabled"] = True
        dump_data(characters, get_asset_folder() + "character_info_gl.json")
        print(f"Student {student_id} has been disabled in the GL character list.")
