import json
from itertools import combinations
from folder_management import get_asset_folder


# returns a list of characters that cause conflicts
def check_equality(characters, included_fields):

    # Create a list to store the character data with only the included fields
    characters_with_included_fields = []

    for character in characters.values():
        # Copy only the included fields
        character_included = {field: character[field] for field in included_fields if field in character}
        characters_with_included_fields.append(character_included)

    # Check if any two characters have equal values for the included fields
    same_characters = []
    for i in range(len(characters_with_included_fields)):
        for j in range(i + 1, len(characters_with_included_fields)):
            if characters_with_included_fields[i] == characters_with_included_fields[j]:
                print(f"Characters {list(characters.keys())[i]} and {list(characters.keys())[j]} are equal (including {included_fields}).")
                same_characters.append(list(characters.keys())[i])


    if len(same_characters) == 0:
        print(f"No two characters have equal values (including {included_fields}).")
    return same_characters

def find_minimal_identifier_fields(characters):
    EXCLUDED_FIELDS = ['id', 'fullName', 'shortName', 'nativeName', 'image', 'releaseDate', 'outfit', 'weaponType']
    # Extract all possible fields
    all_fields = set()
    for character in characters.values():
        all_fields.update(character.keys())
    
    # Remove excluded fields
    fields_to_check = all_fields - set(EXCLUDED_FIELDS)
    
    # Convert to list for combinations
    fields_to_check = list(fields_to_check)
    
    # Check combinations of fields
    for r in range(1, len(fields_to_check) + 1):
        for combo in combinations(fields_to_check, r):
            seen = set()
            unique = True
            for character in characters.values():
                identifier = tuple(character[field] for field in combo if field in character)
                if identifier in seen:
                    unique = False
                    break
                seen.add(identifier)
            if unique:
                return combo
    return None