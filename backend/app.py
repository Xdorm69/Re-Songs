# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import dotenv
import os
import json
from normalize import rename_all

dotenv.load_dotenv()
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

temp_songs_path = "../data/songs-data"
temp_artists_path = "./artists.json"


@app.route("/api/artists", methods=["GET"])
def artists_info():
    data = []
    category_param = request.args.get("category", "").lower()  # category query param
    artist_param = request.args.get("artist", "").lower()  # artist query param
    page_num = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))



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
                "songs": songArr,
                "artist": artist,
                "category": cat,
                "imgSrc": f"/images/artist_images/{artist.split()[0].lower()}.webp"
            })    
    print("category", category_param)

    if category_param:
        data = [artist for artist in data if artist["category"].lower() == category_param]
    if artist_param:
        data = [artist for artist in data if artist["artist"].lower() == artist_param]

    return jsonify(sorted(data[(page_num - 1) * limit: page_num * limit], key=lambda x: x["artist"]))


@app.route("/api/songs", methods=["GET"])
def all_songs():
    try:
        songs_path = request.args.get("path", temp_songs_path)
        print(f"Using songs path: {songs_path}")

        if not songs_path or not os.path.exists(songs_path):
            return jsonify({
                "error": f"Directory not found: {songs_path}",
                "default_path_used": not bool(request.args.get("path"))
            }), 404

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
                        "category": category,
                        "artist": artist,
                        "song": song_name
                    })
                    matched = True
                    break

            if not matched:
                unmatched_list.append(song_name)

        categories = {entry["category"] for entry in songs_list}
        artists = {entry["artist"] for entry in songs_list}

        return jsonify({
            "status": "success",
            "categories_count": len(categories),
            "artists_count": len(artists),
            "songs_count": len(song_files),
            "matched": songs_list,
            "unmatched": unmatched_list
        })

    except FileNotFoundError:
        return jsonify({
            "status": "error",
            "message": "Songs data file not found"
        }), 404
    except json.JSONDecodeError:
        return jsonify({
            "status": "error",
            "message": "Invalid JSON data in songs file"
        }), 500
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"An error occurred: {str(e)}"
        }), 500

@app.route("/api/rename", methods=["PUT"])
def rename():
    try:
        # Get JSON data from request
        data = request.get_json()
        if not data or 'secret' not in data:
            return jsonify({
                "status": "error",
                "message": "Missing secret in request"
            }), 400
            
        user_secret = data.get('secret')
        if user_secret != os.getenv("SECRET"):
            return jsonify({
                "status": "error",
                "message": "Unauthorized"
            }), 401
            
        count_renamed = rename_all()
        return jsonify({
            "status": "success",
            "count": count_renamed,
            "message": f"Successfully renamed {count_renamed} files"
        })
        
    except Exception as e:
        app.logger.error(f"Error in rename endpoint: {str(e)}", exc_info=True)
        return jsonify({
            "status": "error",
            "message": "An error occurred while processing your request"
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
