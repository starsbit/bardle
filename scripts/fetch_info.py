import datetime
import json
import os
import re

import requests
from bs4 import BeautifulSoup
from filter_existing_students import filter_existing_students
from folder_management import get_asset_folder
from generate_icons import generate_icon_name, generate_icons
from schaledb_utils import generate_wiki_article_list_from_schaledb


def extract_integer(s):
    match = re.search(r'\d+', s)
    if match:
        return int(match.group())
    else:
        return None


def separate_names(name_string):
    # Regular expression to match the Latin name and Japanese name
    match = re.search(r"[^\x00-\x7F]+(?:\s[^\x00-\x7F]+)*$", name_string)
    if match:
        split_index = match.start()
        latin_name = name_string[:split_index].strip()
        japanese_name = name_string[split_index:].strip()
        return latin_name, japanese_name
    return name_string, ""

def format_birthday(bday_str):
    try:
        date_obj = datetime.datetime.strptime(bday_str, "%B %d")
        return date_obj.strftime("%d.%m.")
    except ValueError:
        return bday_str  # Return the original string if parsing fails

def generate_info_from_url(url, image_name):

    # Fetch the HTML content of the webpage
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    html_content = response.content

    # Parse the HTML
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find the desired table element
    table = soup.find('table', class_='wikitable character')

    ex_skill_cost = None

    for text in soup.find_all(text=True):
        # Check if the text contains "Cost"
        if "Cost" in text and text != 'Cost Recovery\n':
            # Print the first occurrence and break the loop
            ex_skill_cost = extract_integer(text)
            break

    if not table:
        print("Character Table not found on the webpage.")

    # Extract the required information from the table
    if table:
        # Find relevant elements within the table
        full_name = table.find('th', text='Full Name').find_next('td').text.strip()
        height = extract_integer(table.find('th', text='Height').find_next('td').text.strip())
        school = table.find('td', title=True).text.strip()
        damage_type = table.find('th', text='Damage Type').find_next('td').text.strip()
        armor_type = table.find('th', text='Armor Type').find_next('td').text.strip()
        role_positioning = table.find('th', text='Role').find_next('td').find_next('td').text.strip()
        combat_class = table.find('th', text='Combat Class').find_next('td').text.strip()
        name = soup.find('th', class_='character-name').text.strip().replace(" ", "_")
        releaseDateJP = soup.find('th', text='Release Date JP').find_next('td').text.strip()
        weaponType = soup.find('div', class_='weapon-text').text.strip()
        bday = soup.find('th', text='Birthday').find_next('td').text.strip()

        if height is None:
            # Shun Small is the only character with no height listed
            height = 0

        bday = format_birthday(bday)

        full_name, native_name = separate_names(full_name)

        role = role_positioning.split('/')[0]
        positioning = role_positioning.split('/')[1]

        match = re.search(r'\((.*?)\)', name)
        outfit = "Default"
        if match:
            outfit = match.group(1).replace("_", " ")

        # add the outfit to the name if it is not the default outfit
        if outfit != "Default":
            full_name = full_name + " (" + outfit + ")"

        # Create a dictionary
        character_info = {
            "id": name,
            "fullName": full_name,
            "shortName": name.replace("_", " "),
            "nativeName": native_name,
            "school": school,
            "damageType": damage_type,
            "armorType": armor_type,
            "role": role,
            "combatClass": combat_class,
            "exSkillCost": ex_skill_cost,
            "positioning": positioning,
            "height": height,
            "outfit": outfit,
            "releaseDate": releaseDateJP,
            "weaponType": weaponType,
            "image": image_name,
            "birthday": bday,
            "disabled": False
        }

        print("Character Information:", character_info)

        return character_info
        
def generate_url_from_string(article_name):
    # Generate the URL from the string
    url = "https://bluearchive.wiki/wiki/" + article_name.replace(" ", "_")
    return url

def fetch_info():

    # Get all the PNG files from the folder
    folder_path = get_asset_folder()

    # Generate the icons
    print("Generating icons...")
    generate_icons()

    # Get all the articles from the schaledb
    print("Getting all articles from the schaledb...")
    all_articles = generate_wiki_article_list_from_schaledb()

    print("All articles:", all_articles)

    filtered_articles = filter_existing_students(all_articles)
    print("Filtered articles:", filtered_articles)

    existing_info = {}
    print("Loading existing character info if available...")
    if os.path.exists(folder_path + 'character_info.json'):
        with open(folder_path + 'character_info.json', 'r') as file:
            existing_info = json.load(file)
        

    for article_name in filtered_articles:
        # Generate the URL
        url = generate_url_from_string(article_name)
        print("URL for", article_name, ":", url)

        # Generate the character information from the URL
        existing_info[article_name.replace(" ", "_")] = generate_info_from_url(url, generate_icon_name(article_name))
        print("\n")

    # Dump merged data into character_info.json
    with open(folder_path + 'character_info.json', 'w') as outfile:
        json.dump(existing_info, outfile)

    print("Merged data dumped into character_info.json")

    return existing_info
    