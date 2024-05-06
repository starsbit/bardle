import json

EXCLUDED_FIELDS = ['id', 'fullName', 'nativeName', 'weaponType', 'outfit']

# Load the JSON data from the file
with open('./src/assets/character_info.json') as f:
    characters = json.load(f)

# Create a list to store the character data without the 'id', 'fullName', and 'nativeName' fields
characters_without_ids = []

for character in characters.values():
    # Copy the character data and remove the 'id', 'fullName', and 'nativeName' fields
    character_copy = character.copy()
    for field in EXCLUDED_FIELDS:
        character_copy.pop(field, None)
    characters_without_ids.append(character_copy)

found_equal_characters = False

# Check if any two characters have equal values for the remaining fields
for i in range(len(characters_without_ids)):
    for j in range(i + 1, len(characters_without_ids)):
        if characters_without_ids[i] == characters_without_ids[j]:
            print(f"Characters {list(characters.keys())[i]} and {list(characters.keys())[j]} are equal (excluding {EXCLUDED_FIELDS}).")
            found_equal_characters = True

if not found_equal_characters:
    print(f"No two characters have equal values (excluding {EXCLUDED_FIELDS}).")