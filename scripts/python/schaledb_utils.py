import requests

SCHALE_DB_URL = "https://schaledb.com/data/en/students.min.json"

SCHALE_DB_ICON_URL = "https://schaledb.com/images/student/icon/"

# Students that are called differently in bluearchive wiki and schaledb
# Format: (wiki_name, schaledb_name)
INCONSISTEN_STUDENT_LOOKUP = [
    ("Shiroko (Riding)", "Shiroko (Cycling)"),
    ("Neru (Bunny Girl)", "Neru (Bunny)"),
    ("Karin (Bunny Girl)", "Karin (Bunny)"),
    ("Asuna (Bunny Girl)", "Asuna (Bunny)"),
    ("Utaha (Cheerleader)", "Utaha (Cheer Squad)"),
    ("Hibiki (Cheerleader)", "Hibiki (Cheer Squad)"),
    ("Akane (Bunny Girl)", "Akane (Bunny)"),
    ("Arisu", "Aris"),
    ("Arisu (Maid)", "Aris (Maid)"),
    ("Toki (Bunny Girl)", "Toki (Bunny)"),
    ("Kotori (Cheerleader)", "Kotori (Cheer Squad)"),
    ("Kotama (Camping)", "Kotama (Camp)"),
    ("Maki (Camping)", "Maki (Camp)"),
    ("Hare (Camping)", "Hare (Camp)"),
    ("Shiroko＊Terror", "Shiroko*Terror"),
    ("Yuuka (Pajama)", "Yuuka (Pajamas)"),
    ("Noa (Pajama)", "Noa (Pajamas)"),
    ("Asuna (School Uniform)", "Asuna (Uniform)"),
    ("Karin (School Uniform)", "Karin (Uniform)"),
    ("Neru (School Uniform)", "Neru (Uniform)"),
    ("Shun (Kid)", "Shun (Small)"),
    ("Yuuka (Sportswear)", "Yuuka (Track)"),
    ("Mari (Sportswear)", "Mari (Track)"),
    ("Hasumi (Sportswear)", "Hasumi (Track)"),
    ("Haruna (Sportswear)", "Haruna (Track)"),
    ("Hoshino (Battle)", "Hoshino (Armed)"),
]

def translate_wiki_to_schale(wiki_name):
    for wiki, schale in INCONSISTEN_STUDENT_LOOKUP:
        if wiki == wiki_name:
            return schale
    return wiki_name

def translate_schale_to_wiki(schale_name):
    for wiki, schale in INCONSISTEN_STUDENT_LOOKUP:
        if schale == schale_name:
            return wiki
    return schale_name

def get_schale_db():
    response = requests.get(SCHALE_DB_URL)
    return response.json()

def fetch_icon(student_id):
    response = requests.get(SCHALE_DB_ICON_URL + str(student_id) + ".webp")
    response.raise_for_status()
    return response.content

def generate_wiki_article_list_from_schaledb():
    schale_db = get_schale_db()
    wiki_articles = []
    for student in schale_db.values():
        wiki_articles.append(translate_schale_to_wiki(student["Name"]))
    return wiki_articles