
# Paths
import json
import os

def rename_all():


    temp_songs_path = "../data/songs-data/"
    temp_artists_path = "./artists.json"  # Adjust path if needed
    count_renamed = 0

    # Artist renaming based on known prefixes
    hemant_prefix_system = [
        {"AP": "AP Dhillon"},
        {"AUJLA": "Karan Aujla"},
        {"ARJAN": "Arjan Dhillon"},
        {"Channi": "Channi Nattan"},
        {"Cheema": "Cheema Y"},
        {"CHEEMA": "Cheema Y"},
        {"DILJIT": "Diljit Dosanjh"},
        {"HoneySingh": "Yo Yo Honey Singh"},
        {"MASOOM": "Masoom Sharma"},
        {"MASSOM": "Masoom Sharma"},
        {"PREM": "Prem Dhillon"},
        {"Talwiinder": "Talwinder"},
        {"SIDHU": "Sidhu Moosewala"},
        {"Sidhu Moose Wala": "Sidhu Moosewala"},
        {"CHANI NATTAN": "Channi Nattan"}
    ]

    # Number prefixes to remove
    hemant_prefix_nums = {1, 2, 3, 4, 5, 6, 7, 8, 21, 22, 23}

    # Load artists.json
    with open(temp_artists_path, "r", encoding="utf-8") as f:
        artists_obj = json.load(f)

    # Step 1: Remove numeric prefixes
    songs_list = [f for f in os.listdir(temp_songs_path) if os.path.isfile(os.path.join(temp_songs_path, f))]

    for song_file in songs_list:
        try:
            old_path = os.path.join(temp_songs_path, song_file)
            name, ext = os.path.splitext(song_file)
            parts = name.strip().split(" ")

            if parts[0].isnumeric() and int(parts[0]) in hemant_prefix_nums:
                new_name = " ".join(parts[1:]).strip()
                new_filename = f"{new_name}{ext}"
                new_path = os.path.join(temp_songs_path, new_filename)

                if not os.path.exists(new_path) and old_path != new_path:
                    os.rename(old_path, new_path)
                    print(f"[Prefix Removed] {song_file} → {new_filename}")
                    count_renamed += 1
                else:
                    print(f"[Skipped] (exists or same) {song_file}")
        except Exception as e:
            print(f"[Error] Removing prefix from {song_file}: {e}")

    # Step 2: Expand known prefix codes
    songs_list = [f for f in os.listdir(temp_songs_path) if os.path.isfile(os.path.join(temp_songs_path, f))]

    for song_file in songs_list:
        try:
            name, ext = os.path.splitext(song_file)
            old_path = os.path.join(temp_songs_path, song_file)

            for prefix_map in hemant_prefix_system:
                for key, val in prefix_map.items():
                    first_word = name.split(" ")[0]
                    dash_prefix = name.split("-")[0].strip()

                    if (first_word == key or dash_prefix == key) and not name.startswith(val):
                        remaining = name[len(key):].strip(" -_")
                        new_name = f"{val} - {remaining}".strip()
                        new_filename = f"{new_name}{ext}"
                        new_path = os.path.join(temp_songs_path, new_filename)

                        if not os.path.exists(new_path) and old_path != new_path:
                            os.rename(old_path, new_path)
                            print(f"[Artist Expanded] {song_file} → {new_filename}")
                            count_renamed += 1
                        else:
                            print(f"[Skipped] (exists or same) {song_file}")
                        break
        except Exception as e:
            print(f"[Error] Expanding artist prefix for {song_file}: {e}")

    # Step 3: Prefix songs with artist from JSON
    songs_list = [f for f in os.listdir(temp_songs_path) if os.path.isfile(os.path.join(temp_songs_path, f))]

    for song_file in songs_list:
        try:
            old_path = os.path.join(temp_songs_path, song_file)
            song_name, ext = os.path.splitext(song_file)
            song_lower = song_name.lower()

            already_prefixed = False
            for category, artists in artists_obj.items():
                for artist_name in artists:
                    artist_lower = artist_name.lower()
                    if song_lower.startswith(artist_lower):
                        already_prefixed = True
                        break
                if already_prefixed:
                    break

            if already_prefixed:
                continue

            for category, artists in artists_obj.items():
                for artist_name in artists:
                    artist_lower = artist_name.lower()
                    if artist_lower in song_lower and not song_lower.startswith(artist_lower):
                        new_song_name = f"{artist_name} - {song_name}{ext}"
                        new_path = os.path.join(temp_songs_path, new_song_name)

                        if not os.path.exists(new_path) and old_path != new_path:
                            os.rename(old_path, new_path)
                            print(f"[Artist Mapped] {song_file} → {new_song_name}")
                            count_renamed += 1
                        else:
                            print(f"[Skipped] (exists or same) {song_file}")
                        break
                else:
                    continue
                break

        except Exception as e:
            print(f"[Error] Prefixing artist from JSON for {song_file}: {e}")
    
    return count_renamed

rename_all()