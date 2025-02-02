import json

INCLUDED_FIELDS = ['id', 'damageType', 'armorType', 'role', 'combatClass', 'exSkillCost', 'positioning', 'height', 'releaseDate']

def check_equality():
    # Load the JSON data from the file
    with open('./src/assets/character_info.json') as f:
        characters = json.load(f)

    # Create a list to store the character data with only the included fields
    characters_with_included_fields = []

    for character in characters.values():
        # Copy only the included fields
        character_included = {field: character[field] for field in INCLUDED_FIELDS if field in character}
        characters_with_included_fields.append(character_included)

    found_equal_characters = False

    # Check if any two characters have equal values for the included fields
    for i in range(len(characters_with_included_fields)):
        for j in range(i + 1, len(characters_with_included_fields)):
            if characters_with_included_fields[i] == characters_with_included_fields[j]:
                print(f"Characters {list(characters.keys())[i]} and {list(characters.keys())[j]} are equal (including {INCLUDED_FIELDS}).")
                found_equal_characters = True

    if not found_equal_characters:
        print(f"No two characters have equal values (including {INCLUDED_FIELDS}).")