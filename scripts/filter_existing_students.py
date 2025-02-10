import json
import os

from folder_management import get_asset_folder
from json_utils import load_jp_data
from schaledb_utils import translate_schale_to_wiki


def filter_existing_students(students):
    character_info_file = get_asset_folder() + "character_info.json"

    if not os.path.exists(character_info_file):
        return students
    
    character_info = load_jp_data()
    # the keys are different here from what we get. The spaces are replaced with underscores
    character_info = [key.replace("_", " ") for key in character_info.keys()]

    filtered_students = [student for student in students if translate_schale_to_wiki(student) not in character_info]
    print("Filtered students:", filtered_students, character_info)
    
    return filtered_students
