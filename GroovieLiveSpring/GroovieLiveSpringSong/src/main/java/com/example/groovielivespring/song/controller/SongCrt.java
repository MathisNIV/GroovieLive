package com.example.groovielivespring.song.controller;

import com.example.dto.song.SongDTO;
import com.example.dto.song.SongListDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
public class SongCrt {

    @Autowired
    private SongService songService;

    @RequestMapping(method = RequestMethod.GET, value = "/search/tracks/{song}")
    public ArrayList<SongDTO> searchSong(@PathVariable String song,@RequestHeader("Authorization") String authorizationHeader) {
        System.out.println("search");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String authToken = authorizationHeader.substring(7);
            return songService.searchSong(song,authToken);
        } else {
            throw new IllegalArgumentException("Token Bearer manquant ou mal formaté");
        }

    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/artists/{artist}")
    public ArrayList<SongDTO> searchArtists(@PathVariable String artist,@RequestHeader("Authorization") String authorizationHeader) {
        System.out.println("search");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String authToken = authorizationHeader.substring(7);
            return songService.searchArtist(artist,authToken);
        } else {
            throw new IllegalArgumentException("Token Bearer manquant ou mal formaté");

        }
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/playlist/{name}")
    public int createPlaylist(@PathVariable String name,@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String authToken = authorizationHeader.substring(7);
            System.out.println("token spring side: " + authToken);
            int playlistId = songService.create_playlist(name,authToken);
            System.out.println("playlist id: " + playlistId);
            return playlistId;
        }else{
            throw new IllegalArgumentException("Token Bearer manquant ou mal formaté");
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/playlist/{id}")
    public boolean deletePlaylist(@PathVariable int id,@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String authToken = authorizationHeader.substring(7);
            boolean success = songService.delete_playlist(id,authToken);
            System.out.println("playlist deleted: " + success);
            return success;
        }else{
            throw new IllegalArgumentException("Token Bearer manquant ou mal formaté");
        }
    }

    @RequestMapping(method = RequestMethod.PATCH, value = "/playlist/{id}/add")
    public boolean addSongsPlaylist(@PathVariable int id, @RequestBody SongListDTO songs,@RequestHeader("Authorization") String authorizationHeader) {
        System.out.println("add songs srpting " + songs);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            System.out.println("add songs if "+ songs.getSongs());
            String authToken = authorizationHeader.substring(7);
            return songService.add_song_playlist(id, songs.getSongs(), authToken);
        } else {
            throw new IllegalArgumentException("Token Bearer manquant ou mal formaté");

        }
    }

        @RequestMapping(method = RequestMethod.PATCH, value = "/playlist/{id}/remove")
        public boolean removeSongsPlaylist ( @PathVariable int id, @RequestBody SongListDTO songs, @RequestHeader("Authorization") String authorizationHeader){
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String authToken = authorizationHeader.substring(7);
                Map<Integer, List<Integer>> trackMap = songService.get_track_ids(id,authToken);

                List<Integer> toRemove = new ArrayList<>();

                for (SongDTO song : songs.getSongs()) {
                    int songId = song.getId();
                    List<Integer> values = trackMap.get(songId);
                    if (values != null) {
                        toRemove.addAll(values);
                    }
                }

                System.out.println("to remove:" + toRemove);
                return songService.remove_song_playlist(id, toRemove, authToken);
            } else {
                throw new IllegalArgumentException("Token Bearer manquant ou mal formaté");
            }
        }

        @RequestMapping(method = RequestMethod.PATCH, value = "/playlist/{id}/sort")
        public boolean sortPlaylist ( @PathVariable int id, @RequestBody SongListDTO songs, @RequestHeader("Authorization") String authorizationHeader){
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String authToken = authorizationHeader.substring(7);

                try {
                    TimeUnit.SECONDS.sleep(3); // Waiting for last added song to be added to playlist on beatport
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                Map<Integer, List<Integer>> trackMap = songService.get_track_ids(id,authToken);

                List<Integer> toSort = new ArrayList<>();

                for (SongDTO song : songs.getSongs()) {
                    int songId = song.getId();
                    List<Integer> values = trackMap.get(songId);
                    if (values != null) {
                        toSort.addAll(values);
                    }
                }
                System.out.println("to sort:" + toSort);
                return songService.sort_playlist(id, toSort, authToken);
            } else {
                throw new IllegalArgumentException("Token Bearer manquant ou mal formaté");

            }

        }
    }
