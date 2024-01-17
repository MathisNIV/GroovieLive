import numpy as np

sorted_distances = np.load('static/distances.npy')


def lookup_category(genre):
    categories = {
        "house": ["afro-house", "bass-club", "bass-house", "deep-house", "funky-house", "house", "jackin-house",
                  "melodic-house-techno", "organic-house-downtempo", "progressive-house", "tech-house"],
        "techno": ["techno-peak-time-driving", "techno-raw-deep-hypnotic", "hard-techno"],
        "trance": ["trance-main-floor", "trance-raw-deep-hypnotic", "psy-trance"],
        "dubstep": ["140-deep-dubstep-grime", "drum-bass", "dubstep"],
        "edm": ["electro-classic-detroit-modern", "mainstage"],
        "dance": ["dance-electro-pop", "indie-dance", "hardcore"]}

    for category, subgenres in categories.items():
        if genre in subgenres:
            return category

    return None


def compute_song_distance(song1, song2):
    camelot_wheel = ['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '9A', '10A', '11A', '12A',
                     '1B', '2B', '3B', '4B', '5B', '6B', '7B', '8B', '9B', '10B', '11B', '12B']

    index1 = camelot_wheel.index(song1.camelotKey.upper())
    index2 = camelot_wheel.index(song2.camelotKey.upper())

    identical = index1 == index2
    adjacent = abs(index1 - index2) == 1 or abs(index1 - index2) == len(camelot_wheel) - 1

    bpm_difference = abs(song1.bpm - song2.bpm)

    same_subgenre = song1.subGenre == song2.subGenre or song1.subGenre == None
    same_genre = song1.genre == song2.genre
    same_category = lookup_category(song1.genre) == lookup_category(song2.genre) or lookup_category(song1.genre) is None

    distance = ((not identical and not adjacent)
                + 0.3 * bpm_difference
                + 0.3 * (not same_category)
                + 0.3 * (not same_genre)
                + 0.3 * (not same_subgenre))

    return distance


def get_match_score(songA, songB):
    distance = compute_song_distance(songA, songB)
    index = np.argmax(sorted_distances >= distance)
    percentage_above_distance = 100 * (1 - (index / len(sorted_distances)))
    return percentage_above_distance


def get_match_score_playlist(song, playlist):
    mean = 0
    for song_i in playlist:
        mean += get_match_score(song, song_i)
    mean /= len(playlist)
    return mean

def sort_playlist(playlist):
    sorted_playlist = []
    for song in playlist:
        if len(sorted_playlist) == 0:
            sorted_playlist.append(song)
        else:
            best_song = get_best_song_match(song, sorted_playlist)
            index_of_best_song = sorted_playlist.index(best_song)
            sorted_playlist.insert(index_of_best_song + 1, song)
    return sorted_playlist

def get_best_song_match(song, playlist):
    best_score, best_song = 0, None
    for cur_song in playlist:
        current_score = get_match_score(song, cur_song)
        if current_score > best_score:
            best_score, best_song = current_score, cur_song
    return best_song




