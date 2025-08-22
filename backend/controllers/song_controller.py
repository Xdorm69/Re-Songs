import os
import json
from flask import jsonify

def get_all_songs(songs_path, temp_artists_path):
    if not songs_path or not os.path.exists(songs_path):
        return {
            "error": f"Directory not found: {songs_path}",
            "default_path_used": not bool(songs_path)
        }, 404

    with open(temp_artists_path, "r", encoding='utf-8') as f:
        artists_data = json.load(f)

    song_files = [
        f for f in os.listdir(songs_path)
        if os.path.isfile(os.path.join(songs_path, f))
    ]

    songs_list = []
    unmatched_list = []

    # Flatten artists with category
    artist_entries = []
    for category, artists in artists_data.items():
        for artist in artists:
            artist_entries.append((artist.lower(), category, artist))

    for song_file in song_files:
        song_name = os.path.splitext(song_file)[0]
        song_name_lower = song_name.lower()
        matched = False

        for artist_l, category, artist in artist_entries:
            if artist_l in song_name_lower:
                songs_list.append({
                    "category": category.capitalize(),
                    "artist": artist,
                    "song": song_name
                })
                matched = True
                break

        if not matched:
            unmatched_list.append(song_name)

    categories = {entry["category"] for entry in songs_list}
    artists = {entry["artist"] for entry in songs_list}

    return {
        "status": "success",
        "categories_count": len(categories),
        "artists_count": len(artists),
        "songs_count": len(song_files),
        "matched": songs_list,
        "unmatched": unmatched_list
    }
