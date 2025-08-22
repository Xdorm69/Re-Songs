import os
import json
from flask import jsonify

def get_artists_data(temp_songs_path, temp_artists_path, category_param, artist_param, page_num, limit):
    data = []
    song_files = [
        f for f in os.listdir(temp_songs_path)
        if os.path.isfile(os.path.join(temp_songs_path, f))
    ]

    with open(temp_artists_path, 'r', encoding='utf-8') as f:
        artist_map = json.load(f)

    for cat, artists in artist_map.items():
        for artist in artists:
            songArr = []
            for song_file in song_files:
                song_name = os.path.splitext(song_file)[0]
                if artist.lower() in song_name.lower():
                    songArr.append(song_name)

            data.append({
                "songs": len(songArr),
                "artist": artist,
                "category": cat,
                "imgSrc": f"/images/artist_images/{artist.split()[0].lower()}.webp"
            })

    if category_param:
        data = [artist for artist in data if artist["category"].lower() == category_param]
    if artist_param:
        data = [artist for artist in data if artist["artist"].lower() == artist_param]

    return sorted(data[(page_num - 1) * limit: page_num * limit], key=lambda x: x["artist"])
