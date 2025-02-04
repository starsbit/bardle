import json
import datetime
from dateutil.relativedelta import relativedelta
from folder_management import get_asset_folder

def load_student_list():
    with open(get_asset_folder() + '/character_info.json') as f:
        return json.load(f)
    
def generate_global_student_list():
    target_file = get_asset_folder() + "/character_info_gl.json"
    student_list = load_student_list()
    global_student_list = {}
    current_date = datetime.datetime.now()
    
    for student in student_list.values():
        release_date = datetime.datetime.strptime(student["releaseDate"], '%Y/%m/%d') + relativedelta(months=6)
        if release_date < current_date:
            # Add 6 months to the release date
            student["releaseDate"] = release_date.strftime('%Y/%m/%d')
            global_student_list[student["id"]] = student
    
    with open(target_file, 'w') as f:
        json.dump(global_student_list, f, indent=4)
    
    return global_student_list


def disable_student(student_id):
    # Load the JSON data from the file
    with open(get_asset_folder() + '/character_info.json') as f:
        characters = json.load(f)

    # Disable the student
    characters[student_id]["disabled"] = True

    # Dump the data back into the file
    with open(get_asset_folder() + '/character_info.json', 'w') as f:
        json.dump(characters, f, indent=4)

    # Load the JSON data from the file
    with open(get_asset_folder() + '/character_info_gl.json') as f:
        characters = json.load(f)

    # Disable the student
    characters[student_id]["disabled"] = True

    # Dump the data back into the file
    with open(get_asset_folder() + '/character_info_gl.json', 'w') as f:
        json.dump(characters, f, indent=4)

    print(f"Student {student_id} has been disabled in both the global list and the character list.")