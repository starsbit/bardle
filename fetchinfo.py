import requests
from bs4 import BeautifulSoup
import json
import re
import os
import glob


global merged_data

def extract_integer(s):
    match = re.search(r'\d+', s)
    if match:
        return int(match.group())
    else:
        return None

def generate_info_from_url(url, image_name):

    # Fetch the HTML content of the webpage
    response = requests.get(url)
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
        releaseDate = soup.find('th', text='Release Date').find_next('td').text.strip()
        weaponType = soup.find('div', class_='weapon-text').text.strip()

        split_string = full_name.split('(')

        full_name = split_string[0].strip()  # Get the full name and remove any leading/trailing spaces
        native_name = split_string[1].replace(')', '').strip()

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
            "releaseDate": releaseDate,
            "weaponType": weaponType,
            "image": image_name
        }

        merged_json[name] = character_info

        print("Character Information:", character_info)
        
def generate_url_from_string(article_name):
    # Generate the URL from the string
    url = "https://bluearchive.wiki/wiki/" + article_name
    return url

def get_all_articles_from_file(folder_path):
    files = None
    with open(folder_path, 'r') as json_file:
        data = json.load(json_file)
        files = data['wikiArticles']

    return [file.replace(".png", "") for file in files]

if __name__ == "__main__":

    merged_json = {}

    # Get all the PNG files from the folder
    folder_path = "src/assets/"

    all_articles = get_all_articles_from_file(folder_path + 'wikiArticles.json')

    print("All articles:", all_articles)

    for article_name in all_articles:
        # Generate the URL from the image name
        url = generate_url_from_string(article_name)
        print("URL for", article_name, ":", url)

        # Generate the character information from the URL
        image_name = article_name.replace("_", "").replace("(", "").replace(")", "") + ".png"
        generate_info_from_url(url, image_name)
        print("\n")

    # Dump merged data into character_info.json
    with open(folder_path + 'character_info.json', 'w') as outfile:
        json.dump(merged_json, outfile)

    print("Merged data dumped into character_info.json")
    