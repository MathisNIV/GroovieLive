package com.example.groovielivespring.song.controller;

import com.example.dto.song.SongDTO;
import com.example.dto.song.SongListDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @RequestMapping(method = RequestMethod.PUT, value = "/playlist/{name}")
    public int createPlaylist(@PathVariable String name) {
        int playlistId = songService.create_playlist(name);
        System.out.println("playlist id: " + playlistId);
        return playlistId;
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/playlist/{id}")
    public boolean deletePlaylist(@PathVariable int id) {
        boolean success = songService.delete_playlist(id);
        System.out.println("playlist deleted: " + success);
        return success;
    }

    // id 3002763
    @RequestMapping(method = RequestMethod.PATCH, value = "/playlist/{id}/add")
    public boolean addSongsPlaylist(@PathVariable int id, @RequestBody SongListDTO songs) {
        return songService.add_song_playlist(id, songs.getSongs());
    }

    @RequestMapping(method = RequestMethod.PATCH, value = "/playlist/{id}/remove")
    public boolean removeSongsPlaylist(@PathVariable int id, @RequestBody SongListDTO songs) {
        Map<Integer, List<Integer>> trackMap = songService.get_track_ids(id);

        List<Integer> toRemove = new ArrayList<>();

        for (SongDTO song : songs.getSongs()) {
            int songId = song.getId();
            List<Integer> values = trackMap.get(songId);
            if (values != null) {
                toRemove.addAll(values);
            }
        }

        System.out.println("to remove:" +toRemove);
        return songService.remove_song_playlist(id, toRemove);
    }

}
