from fetch_info import fetch_info
from check_equality import check_equality
from global_student_list import generate_global_student_list

if __name__ == "__main__":
    print("Fetching information...")
    fetch_info()  
    print("Fetching information done.")
    print("Checking equality...")
    check_equality()
    print("Checking equality done.")
    print("Generating global student list...")
    generate_global_student_list()
    print("Generating global student list done.")