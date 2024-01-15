from typing import List, Optional
from pydantic import BaseModel


class SongDTO(BaseModel):
    id: int
    bpm: int
    genre: str
    sub_genre: Optional[str] = None
    camelot_key: str


class SongsMatchDTO(BaseModel):
    song1: SongDTO
    song2: SongDTO


class PlaylistDTO(BaseModel):
    playlist: List[SongDTO]
    
    
class PlaylistMatchDTO(BaseModel):
    song: SongDTO
    playlist: PlaylistDTO



