import datetime
from email.utils import parsedate_to_datetime

import requests

from schaledb_utils import GLOBAL_REGION, get_students_by_id

GLOBAL_BANNER_API_URL = "https://api.ennead.cc/buruaka/banner"
REQUEST_TIMEOUT_SECONDS = 30


def _format_start_date(value: int | float | str) -> str:
    if isinstance(value, (int, float)):
        date = datetime.datetime.fromtimestamp(
            value / 1000, tz=datetime.timezone.utc
        )
    else:
        date = parsedate_to_datetime(value)
    return date.strftime("%Y/%m/%d")


def fetch_global_banner_dates() -> dict[str, str]:
    """Return the earliest Global banner date for every featured student."""
    response = requests.get(
        GLOBAL_BANNER_API_URL,
        timeout=REQUEST_TIMEOUT_SECONDS,
    )
    response.raise_for_status()
    payload = response.json()
    release_dates = {}

    for status in ("current", "upcoming", "ended"):
        for banner in payload.get(status, []):
            release_date = _format_start_date(banner["startedAt"])
            for student_name in banner.get("rateups", []):
                release_dates[student_name] = min(
                    release_dates.get(student_name, release_date),
                    release_date,
                )

    return release_dates


def resolve_global_release_dates(
    en_data: dict,
    jp_release_dates: dict[int, str],
    wiki_global_dates: dict[int, str],
    banner_dates: dict[str, str],
) -> dict[int, str]:
    """Resolve actual Global dates from wiki data and first-release banners."""
    students = get_students_by_id(en_data)
    cohort_dates = {}

    for student in students.values():
        jp_release_date = jp_release_dates.get(student["Id"])
        banner_date = banner_dates.get(student["Name"])
        if not jp_release_date or not banner_date:
            continue
        cohort_dates[jp_release_date] = min(
            cohort_dates.get(jp_release_date, banner_date),
            banner_date,
        )

    release_dates = {}
    for student in students.values():
        if not student.get("IsReleased", [False, False])[GLOBAL_REGION]:
            continue

        student_id = student["Id"]
        release_date = wiki_global_dates.get(student_id)
        if not release_date and student.get("StarGrade") == 3:
            release_date = banner_dates.get(student["Name"])
        if not release_date:
            release_date = cohort_dates.get(jp_release_dates.get(student_id))
        if not release_date:
            release_date = banner_dates.get(student["Name"])
        if not release_date:
            raise ValueError(
                f"No Global release date found for "
                f"{student['Name']} (ID {student_id})"
            )
        release_dates[student_id] = release_date

    return release_dates
