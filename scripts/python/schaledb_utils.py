import requests

SCHALE_DB_EN_URL = "https://schaledb.com/data/en/students.min.json"
SCHALE_DB_JP_URL = "https://schaledb.com/data/jp/students.min.json"
SCHALE_DB_ICON_URL = "https://schaledb.com/images/student/icon/"

JP_REGION = 0
GLOBAL_REGION = 1
REQUEST_TIMEOUT_SECONDS = 30

BULLET_TYPE_MAP = {
    "Explosion": "Explosive",
    "Pierce": "Piercing",
    "Mystic": "Mystic",
    "Sonic": "Sonic",
}

ARMOR_TYPE_MAP = {
    "LightArmor": "Light",
    "HeavyArmor": "Heavy",
    "Unarmed": "Special",
    "ElasticArmor": "Elastic",
    "CompositeArmor": "Composite",
}

SCHOOL_MAP = {
    "RedWinter": "Red Winter",
    "WildHunt": "Wildhunt",
}

ROLE_MAP = {
    "DamageDealer": "Attacker",
    "Tanker": "Tank",
    "Healer": "Healer",
    "Supporter": "Support",
    "Vehicle": "Tactical Support",
}

SQUAD_TYPE_MAP = {
    "Main": "Striker",
    "Support": "Special",
}


def _fetch_json(url: str) -> dict:
    response = requests.get(url, timeout=REQUEST_TIMEOUT_SECONDS)
    response.raise_for_status()
    return response.json()


def fetch_schaledb_en() -> dict:
    return _fetch_json(SCHALE_DB_EN_URL)


def fetch_schaledb_jp() -> dict:
    return _fetch_json(SCHALE_DB_JP_URL)


def fetch_icon(student_id: int) -> bytes:
    response = requests.get(
        f"{SCHALE_DB_ICON_URL}{student_id}.webp",
        timeout=REQUEST_TIMEOUT_SECONDS,
    )
    response.raise_for_status()
    return response.content


def get_student_id(student: dict) -> str:
    return student["Name"].replace(" ", "_")


def get_outfit(student: dict) -> str:
    name = student["Name"]
    if "(" not in name:
        return "Default"
    return name.rsplit("(", 1)[1].removesuffix(")")


def get_students_by_id(schaledb_data: dict) -> dict:
    """Index students by SchaleDB name and merge multi-form release flags."""
    students_by_id = {}
    for student in schaledb_data.values():
        student_id = get_student_id(student)
        existing = students_by_id.get(student_id)
        if existing is None:
            students_by_id[student_id] = student.copy()
            continue

        release_flags = [
            old or new
            for old, new in zip(existing["IsReleased"], student["IsReleased"])
        ]
        if student["DefaultOrder"] < existing["DefaultOrder"]:
            students_by_id[student_id] = student.copy()
        students_by_id[student_id]["IsReleased"] = release_flags

    return students_by_id
