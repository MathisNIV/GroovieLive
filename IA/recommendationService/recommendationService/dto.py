from typing import List, Optional
from pydantic import BaseModel


class SongDTO(BaseModel):
    title: str
    author: List[str]
    authorRemix: List[str]
    musicalKey: str
    genre: str
    subGenre: Optional[str] = None
    bpm: int
    energyLevel: int
    mixTitle: str
    length: int
    sampleUrl: str
    imageUrl: str
    id: int

class SongsMatchDTO(BaseModel):
    song1: SongDTO
    song2: SongDTO


class PlaylistDTO(BaseModel):
    playlist: List[SongDTO]
    
    
class PlaylistMatchDTO(BaseModel):
    song: SongDTO
    playlist: PlaylistDTO



