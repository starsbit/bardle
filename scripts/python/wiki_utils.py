import datetime
import re

import requests

BLUE_ARCHIVE_WIKI_API_URL = "https://bluearchive.wiki/w/api.php"
CHARACTER_CATEGORY = "Category:Characters"
REQUEST_TIMEOUT_SECONDS = 30
USER_AGENT = "Bardle data updater (https://github.com/starsbit/bardle)"

_FIELD_PATTERN = re.compile(
    r"^\|\s*(Id|ReleaseDate|ReleaseDateGL)\s*=\s*([^\r\n]*)", re.MULTILINE
)


def _normalize_date(value: str) -> str | None:
    if not value:
        return None
    try:
        return datetime.datetime.strptime(value, "%Y/%m/%d").strftime("%Y/%m/%d")
    except ValueError:
        return None


def _normalize_global_date(value: str) -> str | None:
    """The wiki stores Global dates as YYYY/DD/MM; normalize to YYYY/MM/DD."""
    if not value:
        return None
    try:
        return datetime.datetime.strptime(value, "%Y/%d/%m").strftime("%Y/%m/%d")
    except ValueError:
        return None


def parse_release_dates(wikitext: str) -> tuple[int, str, str | None] | None:
    """Extract the numeric SchaleDB ID and regional dates from a character page."""
    fields = {
        name: value.strip() for name, value in _FIELD_PATTERN.findall(wikitext)
    }
    if not fields.get("Id") or not fields.get("ReleaseDate"):
        return None

    jp_release_date = _normalize_date(fields["ReleaseDate"])
    if not jp_release_date:
        return None

    try:
        student_id = int(fields["Id"])
    except ValueError:
        return None

    global_release_date = _normalize_global_date(fields.get("ReleaseDateGL", ""))
    return student_id, jp_release_date, global_release_date


def fetch_release_dates() -> tuple[dict[int, str], dict[int, str]]:
    """Fetch JP and Global release dates through MediaWiki's API."""
    params = {
        "action": "query",
        "generator": "categorymembers",
        "gcmtitle": CHARACTER_CATEGORY,
        "gcmtype": "page",
        "gcmlimit": "max",
        "prop": "revisions",
        "rvprop": "content",
        "rvslots": "main",
        "format": "json",
        "formatversion": 2,
    }
    jp_release_dates = {}
    global_release_dates = {}
    continuation = {}

    while True:
        response = requests.get(
            BLUE_ARCHIVE_WIKI_API_URL,
            params={**params, **continuation},
            headers={"User-Agent": USER_AGENT},
            timeout=REQUEST_TIMEOUT_SECONDS,
        )
        response.raise_for_status()
        payload = response.json()
        if "error" in payload:
            error = payload["error"]
            raise RuntimeError(
                f"Blue Archive Wiki API error: {error.get('info', error)}"
            )

        for page in payload.get("query", {}).get("pages", []):
            revisions = page.get("revisions", [])
            if not revisions:
                continue
            content = revisions[0].get("slots", {}).get("main", {}).get("content", "")
            parsed = parse_release_dates(content)
            if parsed:
                student_id, jp_release_date, global_release_date = parsed
                jp_release_dates[student_id] = jp_release_date
                if global_release_date:
                    global_release_dates[student_id] = global_release_date

        continuation = payload.get("continue", {})
        if not continuation:
            break

    return jp_release_dates, global_release_dates
