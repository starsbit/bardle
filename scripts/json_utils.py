import json

def dump_data(data, file_path):
    with open(file_path, 'w') as outfile:
        json.dump(data, outfile, indent=2)