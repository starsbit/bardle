import os

def rename_files_in_directory(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".png"):
            new_filename = filename.replace("_", "").replace("(", "").replace(")", "")
            os.rename(os.path.join(directory, filename), os.path.join(directory, new_filename))

# Call the function with the directory path
rename_files_in_directory("src/assets/images/characters/")