import os

from folder_management import get_character_image_folder
from schaledb_utils import JP_REGION, fetch_icon, fetch_schaledb_en, get_students_by_id


def generate_icon_name(student_id: str) -> str:
    return student_id.replace("_", "").replace("(", "").replace(")", "") + ".webp"


def generate_icons(schaledb_data: dict | None = None):
    image_folder = get_character_image_folder()
    os.makedirs(image_folder, exist_ok=True)

    students = get_students_by_id(schaledb_data or fetch_schaledb_en())
    released_students = {
        student_id: student
        for student_id, student in students.items()
        if student.get("IsReleased", [False])[JP_REGION]
    }
    existing_icons = set(os.listdir(image_folder))
    expected_icons = {
        generate_icon_name(student_id) for student_id in released_students
    }

    for file_name in existing_icons - expected_icons:
        if file_name.endswith(".webp"):
            print(f"Removing stale icon {file_name}")
            os.remove(image_folder + file_name)

    for student_id, student in released_students.items():
        file_name = generate_icon_name(student_id)
        file_path = image_folder + file_name
        if file_name in existing_icons and os.path.getsize(file_path) > 0:
            continue
        print(f"Downloading icon for {student_id}")
        image = fetch_icon(student["Id"])
        with open(file_path, "wb") as image_file:
            image_file.write(image)
