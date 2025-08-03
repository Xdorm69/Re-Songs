            artists = json.load(f)
        songs = os.listdir(temp_songs_path)
        categorized_songs = {f for f in songs if f in artists}