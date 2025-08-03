import os
import requests
import json
from PIL import Image
from io import BytesIO
from ddgs import DDGS

# Output directory
dir_for_saving = "../frontend/public/images/artist_images"
os.makedirs(dir_for_saving, exist_ok=True)

# Replace this with your artist list
with open("artists.json", "r") as f:
    artists = json.load(f)

def fetch_first_image(query):
    results = DDGS().images(query, max_results=1)
    if results:
        return results[0]['image']
    return None

def download_and_resize(image_url, save_path, size=(200, 200)):
    try:
        response = requests.get(image_url, timeout=10)
        img = Image.open(BytesIO(response.content))
        img = img.convert("RGB")
        img = img.resize(size, Image.Resampling.LANCZOS)
        img.save(save_path, format="WEBP")
        print(f"Saved: {save_path}")
    except Exception as e:
        print(f"Failed to process {image_url}: {e}")

for category, artists in artists.items():
    for artist in artists:
        filename = artist.split()[0].lower() + ".webp"  # Use first word only
        filepath = os.path.join(dir_for_saving, filename)
        print(f"Saving {filename}")
        print(f"Searching for: {artist}")
        img_url = fetch_first_image(f"{artist} {category} singer latest images")
        if img_url:
            download_and_resize(img_url, filepath)
        else:
            print(f"No image found for {artist}")
