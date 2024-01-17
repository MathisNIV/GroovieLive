package com.example.dto.song;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SongListDTO {
    private List<SongDTO> songs;

    public SongListDTO(List<SongDTO> songs) {
        this.songs = songs;
    }

    public SongListDTO() {
        this.songs = new ArrayList<>();
    }

    public List<SongDTO> getSongs() {
        return songs;
    }

    public void setSongs(List<SongDTO> songs) {
        this.songs = songs;
    }
}
