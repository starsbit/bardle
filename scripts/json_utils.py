import json

from folder_management import get_asset_folder


def dump_data(data, file_path):
    with open(file_path, 'w') as outfile:
        json.dump(data, outfile, indent=2)

def load_gl_data():
    with open(get_asset_folder() + 'character_info_gl.json') as f:
        return json.load(f)
    
def load_jp_data():
    with open(get_asset_folder() + 'character_info.json') as f:
        return json.load(f)
