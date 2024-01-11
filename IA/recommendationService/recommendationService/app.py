from flask import Flask, request, jsonify

import util
from dto import SongsMatchDTO, PlaylistMatchDTO

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
        playlist_dto = PlaylistMatchDTO(**data)

        song = playlist_dto.song
        playlist = playlist_dto.playlist

        score = util.get_match_score_playlist(song, playlist)

        return jsonify({"score": score})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(port=5001)
