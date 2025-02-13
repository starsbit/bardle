from folder_management import get_asset_folder, get_character_image_folder
from json_utils import dump_data
import json
import os
import shutil

def check_key_and_id_field(data):
    new_data = {}
    for key, value in data.items():
        if key != value['id']:
            new_data[value['id']] = value
        else:
            new_data[key] = value

    dump_data(new_data, get_asset_folder() + 'character_info.json')
    return new_data

def delete_saved_info():
    character_info_jp = get_asset_folder() + 'character_info.json'
    character_info_gl = get_asset_folder() + 'character_info_gl.json'
    character_icon_folder = get_character_image_folder()
    if os.path.exists(character_info_jp):
        os.remove(character_info_jp)
    if os.path.exists(character_info_gl):
        os.remove(character_info_gl)
    if os.path.exists(character_icon_folder):
        shutil.rmtree(character_icon_folder)
