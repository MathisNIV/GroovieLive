package com.example.groovielivespring.song.controller;

import com.example.dto.song.SongDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;

@Service
public class SongService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String apiBaseUrl = "https://api.beatport.com/v4/";


    public ArrayList<SongDTO> searchSong(String query, String token) {
        String searchEndpoint = "catalog/search";

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        headers.add("Authorization", "Bearer " + token);

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        String uri = UriComponentsBuilder.fromUriString(apiBaseUrl)
                .path(searchEndpoint)
                .queryParam("q", query)
                .queryParam("type", "tracks")
                .build()
                .toUriString();
        System.out.println(uri);
        System.out.println(entity);
        System.out.println(token);
        System.out.println(headers);
        ResponseEntity<String> result = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);
        return music_treatment(result.getBody());
    }

    public ArrayList<SongDTO> searchArtist(String query, String token) {
        String searchEndpoint = "catalog/search";

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        headers.add("Authorization", "Bearer " + token);

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        String uri = UriComponentsBuilder.fromUriString(apiBaseUrl)
                .path(searchEndpoint)
                .queryParam("q", "")
                .queryParam("type", "tracks")
                .queryParam("artist_name", query)
                .build()
                .toUriString();

        ResponseEntity<String> result = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);
        return music_treatment(result.getBody());
    }

    public ArrayList<SongDTO> music_treatment(String musics) {
        ArrayList<SongDTO> songs;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(musics);
            JsonNode tracksNode = rootNode.path("tracks");

            songs = new ArrayList<>();

            if (tracksNode.isArray() && !tracksNode.isEmpty()) {
                for (JsonNode trackNode : tracksNode) {

                    String title = trackNode.path("name").asText();
                    String[] author = trackNode.path("artists").isArray() && !trackNode.path("artists").isEmpty()
                            ? trackNode.path("artists").get(0).path("name").asText().split(",")
                            : new String[0];

                    String[] authorRemix = trackNode.path("remixers").isArray() && !trackNode.path("remixers").isEmpty()
                            ? trackNode.path("remixers").get(0).path("name").asText().split(",")
                            : new String[0];

                    int id = trackNode.path("id").asInt();
                    String camelotLetter = trackNode.path("key").path("camelot_letter").asText();
                    int camelotNumber = trackNode.path("key").path("camelot_number").asInt();
                    String camelotKey = camelotNumber + camelotLetter;


                    String genre = trackNode.path("genre").path("name").asText();
                    String subGenre = trackNode.path("sub_genre").asText();
                    int bpm = trackNode.path("bpm").asInt();
                    int energyLevel = 0;
                    String mixTitle = trackNode.path("mix_name").asText();
                    int length = trackNode.path("length_ms").asInt();
                    String sampleUrl = trackNode.path("sample_url").asText();

                    String imageUrl = trackNode.path("release").path("image").path("uri").asText();

                    SongDTO song = new SongDTO(title, author, authorRemix, camelotKey, genre, subGenre, bpm, energyLevel, mixTitle, length, sampleUrl, imageUrl,id);
                    songs.add(song);

                }

            } else {
                System.out.println("No tracks found");
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return songs;
    }

    public int create_playlist(String playlistName, String token) {
        String searchEndpoint = "/my/playlists/";

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        headers.add("Authorization", "Bearer " + token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = "{\"name\": \"" + playlistName + "\"}";
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        String uri = UriComponentsBuilder.fromUriString(apiBaseUrl)
                .path(searchEndpoint)
                .build()
                .toUriString();

        ResponseEntity<String> result = restTemplate.exchange(uri, HttpMethod.POST, entity, String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(result.getBody());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return Integer.parseInt(jsonNode.get("id").asText());
    }

    public boolean delete_playlist(int id, String token) {
        String searchEndpoint = "/my/playlists/" + id + "/";
        System.out.println("delete playlist endpoint: " + searchEndpoint);


        HttpHeaders headers = new HttpHeaders();
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        headers.add("Authorization", "Bearer " + token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(null, headers);

        String uri = UriComponentsBuilder.fromUriString(apiBaseUrl)
                .path(searchEndpoint)
                .build()
                .toUriString();

        ResponseEntity<String> responseEntity = new RestTemplate().exchange(
                uri,
                HttpMethod.DELETE,
                entity,
                String.class
        );

        return responseEntity.getStatusCode().is2xxSuccessful();
    }

    public boolean add_song_playlist(int playlistId, List<SongDTO> songs, String token){
        String searchEndpoint = "/my/playlists/" + playlistId + "/tracks/bulk/";

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        headers.add("Authorization", "Bearer " + token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = "{\"track_ids\": [";
        for(SongDTO song: songs){
            requestBody = requestBody + song.getId() + ", ";
        }
        requestBody = requestBody.substring(0, requestBody.length() - 2);
        requestBody = requestBody + "]}";

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        String uri = UriComponentsBuilder.fromUriString(apiBaseUrl)
                .path(searchEndpoint)
                .build()
                .toUriString();

        ResponseEntity<String> responseEntity = new RestTemplate().exchange(
                uri,
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        return responseEntity.getStatusCode().is2xxSuccessful();
    }

    public Map<Integer, List<Integer>> get_track_ids(int playlistId, String token){
        String searchEndpoint = "/my/playlists/" + playlistId + "/tracks/ids/";

        HttpHeaders headers = new HttpHeaders();

        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        headers.add("Authorization", "Bearer " + token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(null, headers);

        String uri = UriComponentsBuilder.fromUriString(apiBaseUrl)
                .path(searchEndpoint)
                .build()
                .toUriString();

        ResponseEntity<String> responseEntity = new RestTemplate().exchange(
                uri,
                HttpMethod.GET,
                requestEntity,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        Map<Integer, List<Integer>> trackMap = new HashMap<>();

        JsonNode rootNode = null;
        try {
            rootNode = objectMapper.readTree(responseEntity.getBody());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        JsonNode tracksNode = rootNode.get("tracks");

        if (tracksNode.isArray()) {
            for (JsonNode trackNode : tracksNode) {
                int trackId = trackNode.get("track_id").asInt();
                int itemId = trackNode.get("id").asInt();

                trackMap.computeIfAbsent(trackId, k -> new ArrayList<>()).add(itemId);
            }
        }
        System.out.println("map:"+trackMap);
        return trackMap;
    }

    public boolean remove_song_playlist(int playlistId, List<Integer> toRemove, String token) {
        String searchEndpoint = "/my/playlists/" + playlistId + "/tracks/bulk/";

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        headers.add("Authorization", "Bearer " + token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = "{\"item_ids\": " + toRemove + "}";
        System.out.println("body:" + requestBody);


        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        String uri = UriComponentsBuilder.fromUriString(apiBaseUrl)
                .path(searchEndpoint)
                .build()
                .toUriString();

        ResponseEntity<String> responseEntity = new RestTemplate().exchange(
                uri,
                HttpMethod.DELETE,
                requestEntity,
                String.class
        );

        return responseEntity.getStatusCode().is2xxSuccessful();
    }

    public boolean sort_playlist(int playlistId, List<Integer> sortedSongs, String token) {
        String searchEndpoint = "/my/playlists/" + playlistId + "/tracks/bulk/";

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        headers.add("Authorization", "Bearer " + token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String fSongs = "";
        for(int i=0; i<sortedSongs.size(); i++){
            fSongs = fSongs + "{\"item_id\": " + sortedSongs.get(i) + ", \"position\": " + (i+1) +"}, ";
        }
        fSongs = fSongs.substring(0, fSongs.length() - 2);

        String requestBody = "{\"items\": [" + fSongs + "]}";
        System.out.println("body sort:" + requestBody);


        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        String uri = UriComponentsBuilder.fromUriString(apiBaseUrl)
                .path(searchEndpoint)
                .build()
                .toUriString();

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                uri,
                HttpMethod.PATCH,
                requestEntity,
                String.class
        );

        return responseEntity.getStatusCode().is2xxSuccessful();
    }

}