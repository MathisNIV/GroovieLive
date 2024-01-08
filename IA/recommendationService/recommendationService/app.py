from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/compare_songs', methods=['POST'])
def compare_songs():
    try:
        data = request.get_json()

        song1 = data.get('song1')
        song2 = data.get('song2')

        print(f"Song 1: {song1}")
        print(f"Song 2: {song2}")

        return jsonify({"message": "Songs received successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/compare_song_and_playlist', methods=['POST'])
def compare_song_and_list():
    try:
        data = request.get_json()

        song = data.get('song')
        string_list = data.get('string_list')

        print(f"Song: {song}")
        print(f"Playlist: {string_list}")

        return jsonify({"message": "Data received successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run()
