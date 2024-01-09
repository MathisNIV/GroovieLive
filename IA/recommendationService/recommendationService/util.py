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

    index1 = camelot_wheel.index(song1.camelot_key.upper())
    index2 = camelot_wheel.index(song2.camelot_key.upper())

    identical = index1 == index2
    adjacent = abs(index1 - index2) == 1 or abs(index1 - index2) == len(camelot_wheel) - 1

    bpm_difference = abs(song1.bpm - song2.bpm)

    same_subgenre = song1.sub_genre == song2.sub_genre or song1.sub_genre is None
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