from flask import Flask, request, jsonify

import util
import logging
from dto import SongsMatchDTO, PlaylistMatchDTO, PlaylistDTO

app = Flask(__name__)


@app.route('/compare/songs', methods=['POST'])
def compare_songs():
    print("received request to compare songs")
    try:
        data = request.get_json()
        songs_dto = SongsMatchDTO(**data)

        song1 = songs_dto.song1
        song2 = songs_dto.song2
        print(f"received songs {song1}; {song2}")
        score = util.get_match_score(song1, song2)
        print(f"score: {score}")
        return jsonify({"score": score})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/compare/playlist', methods=['POST'])
def compare_song_and_list():
    print("received request to compare song and playlist ", request.get_json())
    try:
        data = request.get_json()
        playlist_match_dto = PlaylistMatchDTO(**data)

        song = playlist_match_dto.song
        playlist = playlist_match_dto.playlist

        score = util.get_match_score_playlist(song, playlist)

        return jsonify({"score": score})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/sort/playlist', methods=['POST'])
def sort_playlist_and_list():
    print("received request to sort playlist ", request.get_json())
    try:
        data = request.get_json()
        playlist_dto = PlaylistDTO(**data)
        playlist = playlist_dto.playlist

        sorted_playlist = util.sort_playlist(playlist)
        print(f"sorted playlist {sorted_playlist}")

        return jsonify({"playlist": [songDTO.dict() for songDTO in sorted_playlist]})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(port=5001)
