import json
import datetime
from dateutil.relativedelta import relativedelta

def load_student_list():
    with open('./src/assets/character_info.json') as f:
        return json.load(f)
    
def generate_global_student_list():
    target_file = "./src/assets/character_info_gl.json"
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