package com.example.groovielivespring.song.controller;

import com.example.dto.song.SongDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Collections;

@Service
public class SongService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String apiBaseUrl = "https://api.beatport.com/v4/";
    private final String token = "Ew3rvsR0VCGk4CmpA0Pj66hTWWIliT";

    public ArrayList<SongDTO> search(String query) {
        String searchEndpoint = "catalog/search";

        System.out.println("Searching for " + query);

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

        ResponseEntity<String> result = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);
        System.out.println("response = " + music_treatment(result.getBody()));
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

                    System.out.println("trackNode = " + trackNode);

                    String title = trackNode.path("name").asText();
                    String[] author = trackNode.path("artists").isArray() && !trackNode.path("artists").isEmpty()
                            ? trackNode.path("artists").get(0).path("name").asText().split(",")
                            : new String[0];

                    String[] authorRemix = trackNode.path("remixers").isArray() && !trackNode.path("remixers").isEmpty()
                            ? trackNode.path("remixers").get(0).path("name").asText().split(",")
                            : new String[0];


                    String camelotLetter = trackNode.path("key").path("camelot_letter").asText();
                    int camelotNumber = trackNode.path("key").path("camelot_number").asInt();
                    String musicalKey = camelotNumber + camelotLetter;


                    String genre = trackNode.path("genre").path("name").asText();
                    String subGenre = trackNode.path("sub_genre").asText();
                    int bpm = trackNode.path("bpm").asInt();
                    int energyLevel = 0;
                    String mixTitle = trackNode.path("mix_name").asText();
                    int length = trackNode.path("length_ms").asInt();
                    String sampleUrl = trackNode.path("sample_url").asText();

                    String imageUrl = trackNode.path("release").path("image").path("uri").asText();

                    SongDTO song = new SongDTO(title, author, authorRemix, musicalKey, genre, subGenre, bpm, energyLevel, mixTitle, length, sampleUrl, imageUrl);
                    songs.add(song);

                }

            } else {
                System.out.println("No tracks found");
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        System.out.println("songs = " + songs);
        return songs;
    }

    public void suggestion_query(ArrayList<SongDTO> songs) {
        String nodeEndpoint = "/GroovieLiveNode-api/songs";

        ObjectMapper mapper = new ObjectMapper();
        try {
            String jsonSongs = mapper.writeValueAsString(songs);

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            headers.add("user-agent", "Mozilla/5.0");

            HttpEntity<String> entity = new HttpEntity<>(jsonSongs, headers);

            String uri = UriComponentsBuilder.fromUriString("http://localhost")
                    .path(nodeEndpoint)
                    .toUriString();

            System.out.println(jsonSongs);

            ResponseEntity<String> result = restTemplate.exchange(uri, HttpMethod.POST, entity, String.class);
            System.out.println(result.getBody());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

}