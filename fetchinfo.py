import requests
from bs4 import BeautifulSoup
import json
import re
import os
import glob

def extract_integer(s):
    match = re.search(r'\d+', s)
    if match:
        return int(match.group())
    else:
        return None

def generate_info_from_url(url):

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
        school = table.find('td', title=True).text.strip()
        damage_type = table.find('th', text='Damage Type').find_next('td').text.strip()
        armor_type = table.find('th', text='Armor Type').find_next('td').text.strip()
        role_positioning = table.find('th', text='Role').find_next('td').find_next('td').text.strip()
        combat_class = table.find('th', text='Combat Class').find_next('td').text.strip()
        name = soup.find('th', class_='character-name').text.strip().replace(" ", "_")

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
            "outfit": outfit,
        }

        file_name = name + ".json"
        # Store the dictionary in a JSON file inside the 

        file_path = os.path.join(folder_path, file_name)
        with open(file_path , 'w') as json_file:
            json.dump(character_info, json_file, indent=4)

        print("Data has been stored in character_info.json file.")
        print("Character Information:", character_info)
        
def generate_url_from_string(image_name):
    # Remove .png from the image name
    string = image_name.replace(".png", "")
    # Generate the URL from the string
    url = "https://bluearchive.wiki/wiki/" + string
    return url

def get_all_pngs_from_folder(folder_path):
    import os
    png_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]
    return png_files

def merge_json_files(folder_path):
    merged_data = {}
    for filename in os.listdir(folder_path):
        if filename.endswith('.json'):
            with open(os.path.join(folder_path, filename)) as f:
                file_data = json.load(f)
                file_name = os.path.splitext(filename)[0]
                merged_data[file_name] = file_data
    return merged_data

if __name__ == "__main__":
    # Get all the PNG files from the folder
    folder_path = "src/assets/"

    png_files = get_all_pngs_from_folder(folder_path)
    for image_name in png_files:
        # Generate the URL from the image name
        url = generate_url_from_string(image_name)
        print("URL for", image_name, ":", url)
        # Generate the character information from the URL
        generate_info_from_url(url)
        print("\n")

    merged_json = merge_json_files(folder_path)

    # Dump merged data into character_info.json
    with open('character_info.json', 'w') as outfile:
        json.dump(merged_json, outfile)

    print("Merged data dumped into character_info.json")

    # Get a list of all JSON files in the directory
    json_files = glob.glob(os.path.join(folder_path, '*.json'))

    # Filter out character_info.json
    json_files = [file for file in json_files if os.path.basename(file) != 'character_info.json']

    # Delete the remaining JSON files
    for file in json_files:
        os.remove(file)

    print("All JSON files except character_info.json have been deleted.")