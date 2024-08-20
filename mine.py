import os
import zipfile

# Set the path to the directory containing the ZIP files
zip_folder = 'D:/themes/Elementor Pro Templates'
output_folder = 'D:/outs'  # Set where you want to save the images

# Ensure the output directory exists
os.makedirs(output_folder, exist_ok=True)

# Iterate through each file in the zip_folder
for filename in os.listdir(zip_folder):
    if filename.endswith('.zip'):
        zip_path = os.path.join(zip_folder, filename)
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            # List all files in the zip archive
            for file in zip_ref.namelist():
                # Check for the specific file within the screenshots folder
                if file.endswith('screenshots/global-kit-styles.jpg'):
                    # Create a new file name based on the zip file's name
                    new_name = filename.replace('.zip', '.jpg')
                    # Extract and save the file with the new name
                    zip_ref.extract(file, output_folder)
                    os.rename(
                        os.path.join(output_folder, file),
                        os.path.join(output_folder, new_name)
                    )
                    break  # Move to the next zip file after finding the jpg
