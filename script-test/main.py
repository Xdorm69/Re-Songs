import os

path = "D:/Web Dev/FullStack/react-flask-re-songs/data/songs-data"

files = [f for f in os.listdir(path) if f.endswith(".mp3")]

# data cleaning
for i in files:
    if("aujla" in i.lower()):
        old_path = os.path.join(path, i)
        print(i)
