from flask import Flask, jsonify, request
from flask_cors import CORS
import dotenv
import os
from controllers.artist_controller import get_artists_data
from controllers.song_controller import get_all_songs
from controllers.rename_controller import handle_rename

dotenv.load_dotenv()
app = Flask(__name__)
CORS(app)

songs_path = os.getenv("SONGS_PATH_DEV")
artists_path = os.getenv("ARTISTS_PATH")


@app.route("/api/artists", methods=["GET"])
def artists_info():
    category_param = request.args.get("category", "").lower()
    artist_param = request.args.get("artist", "").lower()
    page_num = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    
    data = get_artists_data(
        songs_path, 
        artists_path, 
        category_param, 
        artist_param, 
        page_num, 
        limit
    )
    
    return jsonify(data)


@app.route("/api/songs", methods=["GET"])
def all_songs():
    try:
        songs_path = request.args.get("path", songs_path)
        result = get_all_songs(songs_path, artists_path)
        
        if isinstance(result, tuple) and len(result) == 2 and isinstance(result[1], int):
            return jsonify(result[0]), result[1]
        return jsonify(result)
        
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
        data = request.get_json()
        result = handle_rename(data, os.getenv("SECRET"))
        
        if isinstance(result, tuple) and len(result) == 2 and isinstance(result[1], int):
            return jsonify(result[0]), result[1]
        return jsonify(result)
        
    except Exception as e:
        app.logger.error(f"Error in rename endpoint: {str(e)}", exc_info=True)
        return jsonify({
            "status": "error",
            "message": "An error occurred while processing your request"
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
