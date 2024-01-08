package com.example.groovielivespring.song.controller;

import com.example.dto.song.Song;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class SongService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String apiBaseUrl = "https://api.beatport.com/v4/";
    private final String token = "jVBcmkLkGKRPnjNstYolS2IofiFbnR";

    public String search(String query) {
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

        ResponseEntity<String> result = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);
        music_treatment(result.getBody());
        return result.getBody();
    }

    public void music_treatment(String musics) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(musics);
            JsonNode tracksNode = rootNode.path("tracks");

            if (tracksNode.isArray() && !tracksNode.isEmpty()) {
                JsonNode firstTrackNode = tracksNode.get(0);

                String title = firstTrackNode.path("name").asText();
                String[] author = firstTrackNode.path("artists").isArray() && !firstTrackNode.path("artists").isEmpty()
                        ? firstTrackNode.path("artists").get(0).path("name").asText().split(",")
                        : new String[0];

                String[] authorRemix = firstTrackNode.path("remixers").isArray() && !firstTrackNode.path("remixers").isEmpty()
                        ? firstTrackNode.path("remixers").get(0).path("name").asText().split(",")
                        : new String[0];


                String camelotLetter = firstTrackNode.path("key").path("camelot_letter").asText();
                int camelotNumber = firstTrackNode.path("key").path("camelot_number").asInt();
                String musicalKey =camelotNumber + camelotLetter ;



                String genre = firstTrackNode.path("genre").path("name").asText();
                String subGenre = firstTrackNode.path("sub_genre").asText();
                int bpm = firstTrackNode.path("bpm").asInt();
                int energyLevel = 0;
                String mixTitle = firstTrackNode.path("mix_name").asText();
                int length = firstTrackNode.path("length_ms").asInt();
                String sampleUrl = firstTrackNode.path("sample_url").asText();

                Song song = new Song(title, author,authorRemix ,musicalKey, genre, subGenre, bpm, energyLevel, mixTitle, length, sampleUrl);

                System.out.println(song);
            } else {
                System.out.println("No tracks found in the response.");
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}