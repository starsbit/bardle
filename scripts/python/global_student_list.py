from folder_management import get_asset_folder
from json_utils import dump_data, load_gl_data, load_jp_data
from schaledb_utils import GLOBAL_REGION, fetch_schaledb_en, get_students_by_id


def build_global_student_list(jp_data: dict, en_data: dict) -> dict:
    students = get_students_by_id(en_data)
    return {
        student_id: student
        for student_id, student in jp_data.items()
        if student_id in students
        and students[student_id].get("IsReleased", [False, False])[GLOBAL_REGION]
    }


def generate_global_student_list(jp_data: dict | None = None, en_data: dict | None = None):
    jp_data = jp_data or load_jp_data()
    global_student_list = build_global_student_list(
        jp_data, en_data or fetch_schaledb_en()
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
