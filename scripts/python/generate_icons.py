import os

from folder_management import get_character_image_folder
from schaledb_utils import fetch_icon, get_schale_db, translate_schale_to_wiki


def generate_icon_name(name: str):
    return name.replace("_", "").replace("(", "").replace(")", "").replace(" ", "") + ".webp"

def generate_icons():
    image_folder = get_character_image_folder()

    # Create the folder if it does not exist
    os.makedirs(image_folder, exist_ok=True)

    schale_db = get_schale_db()

    # Get all existing icons
    icons = os.listdir(image_folder)

    # Get all the student names
    student_names = [generate_icon_name(translate_schale_to_wiki(student["Name"])) for student in schale_db.values()]

    # Remove all the icons that are not in the student names
    for icon in icons:
        if icon not in student_names:
            print("Removing icon", icon)
            os.remove(image_folder + icon)
    
    # Filter out the students that already have an icon
    schale_db = {student["Id"]: student for student in schale_db.values() if generate_icon_name(translate_schale_to_wiki(student["Name"])) not in icons}

    for student in schale_db.values():
        print("Generating icon for", student["Name"])
        file_name = generate_icon_name(translate_schale_to_wiki(student["Name"]))
        image = fetch_icon(student["Id"])
        with open(image_folder + file_name, 'wb') as image_file:
            image_file.write(image)