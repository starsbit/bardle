import os
import json

folder = "src/assets/images/characters/"

# Get a list of all .png files in the current directory
png_files = [file for file in os.listdir(folder) if file.endswith('.png')]

# Remove the file extension from the file names
png_files = [file.replace('.png', '') for file in png_files]

# Create a dictionary with a key 'png_files' containing the list of PNG file names
data = {'wikiArticles': png_files}

# Write the dictionary to a JSON file
with open('src/assets/wikiArticles.json', 'w') as json_file:
    json.dump(data, json_file)

print("JSON file containing PNG file names has been created: png_files.json")
