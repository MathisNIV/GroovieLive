package com.example.groovielivespring.song.controller;

import com.example.dto.song.SongDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class SongCrt {

    @Autowired
    private SongService songService;

    @RequestMapping(method = RequestMethod.GET, value = "/search/tracks/{song}")
    public ArrayList<SongDTO> searchSong(@PathVariable String song) {
        System.out.println("search");
        return songService.searchSong(song);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/artists/{artist}")
    public ArrayList<SongDTO> searchArtists(@PathVariable String artist) {
        System.out.println("search");
        return songService.searchArtist(artist);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/create-playlist")
    public int createPlaylist(@PathVariable String name) {
        System.out.println("recu query");
        int playlistId = 0;
        try {
            playlistId = songService.create_playlist(name);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        System.out.println("playlist id: " + playlistId);
        return playlistId;
    }

}
