from typing import List, Optional
from pydantic import BaseModel


class SongDTO(BaseModel):
    bpm: int
    genre: str
    sub_genre: Optional[str] = None
    camelot_key: str


class PlaylistMatchDTO(BaseModel):
    song: SongDTO
    playlist: List[SongDTO]


class SongsMatchDTO(BaseModel):
    song1: SongDTO
    song2: SongDTO
