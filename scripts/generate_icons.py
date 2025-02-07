import os
from schaledb_utils import get_schale_db, translate_schale_to_wiki, fetch_icon
from folder_management import get_character_image_folder

def generate_icon_name(name: str):
    return name.replace("_", "").replace("(", "").replace(")", "").replace(" ", "") + ".webp"

def generate_icons():
    image_folder = get_character_image_folder()

    # Create the folder if it does not exist
    os.makedirs(image_folder, exist_ok=True)

    schale_db = get_schale_db()

    # Clear the image folder
    for file in os.listdir(image_folder):
        os.remove(image_folder + file)

    for student in schale_db.values():
        print("Generating icon for", student["Name"])
        fileName = generate_icon_name(translate_schale_to_wiki(student["Name"]))
        image = fetch_icon(student["Id"])
        with open(image_folder + fileName, 'wb') as image_file:
            image_file.write(image)