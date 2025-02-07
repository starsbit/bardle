from check_equality import check_equality, find_minimal_identifier_fields
from fetch_info import fetch_info
from global_student_list import disable_student, generate_global_student_list

INCLUDED_FIELDS = ['school', 'exSkillCost', 'armorType', 'role', 'releaseDate', 'damageType', 'birthday']

if __name__ == "__main__":
    print("Fetching information...")
    fetch_info()
    print("Fetching information done.")
    print("Generating global student list...")
    gl_list = generate_global_student_list()
    print("Generating global student list done.")
    print("Checking equality...")
    conflicts = check_equality(gl_list, INCLUDED_FIELDS)
    if conflicts:
        print(f"Conflicts: {conflicts}")
        print("Students will be disabled in both the global list and the character list.")
        for student in conflicts:
            disable_student(student)
        print("Repairing done.")
    
    print("Checking equality done.")
    print(f"Smallest identifier fields: {find_minimal_identifier_fields(gl_list)}")