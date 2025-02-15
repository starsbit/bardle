from datetime import datetime

from dateutil.relativedelta import relativedelta
from folder_management import get_asset_folder
from json_utils import dump_data, load_gl_data, load_jp_data

FIRST_THREE_MONTHS_CATCHUP_START_DATE = "2025/01/23"

def get_global_release_date(date: str) -> str:
    input_date = datetime.strptime(date, '%Y/%m/%d')
    new_date = input_date + relativedelta(months=6)
    return new_date.strftime('%Y/%m/%d')


def generate_global_student_list():
    target_file = get_asset_folder() + "/character_info_gl.json"
    student_list = load_jp_data()
    global_student_list = {}
    current_date = datetime.now()
    
    for student in student_list.values():
        release_date = datetime.strptime(student["releaseDate"], '%Y/%m/%d') + relativedelta(months=6)
        if release_date < current_date:
            # Add 6 months to the release date
            student["releaseDate"] = release_date.strftime('%Y/%m/%d')
            global_student_list[student["id"]] = student
    
    dump_data(global_student_list, target_file)
    
    return global_student_list


def disable_student(student_id):
    # Load the JSON data from the file
    characters = load_jp_data()

    if student_id in characters:
        # Disable the student
        characters[student_id]["disabled"] = True

        # Dump the data back into the file
        dump_data(characters, get_asset_folder() + '/character_info.json')
        
        print(f"Student {student_id} has been disabled in the JP character list.")

    # Load the JSON data from the file
    characters = load_gl_data()

    if student_id in characters:
        # Disable the student
        characters[student_id]["disabled"] = True

        # Dump the data back into the file
        dump_data(characters, get_asset_folder() + '/character_info_gl.json')

        print(f"Student {student_id} has been disabled in the GL character list.")