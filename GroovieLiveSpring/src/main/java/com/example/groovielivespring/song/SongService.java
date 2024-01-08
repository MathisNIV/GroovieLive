package com.example.groovielivespring.song;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;

@Service
public class SongService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String apiBaseUrl = "https://api.beatport.com/v4/";

    public Object search(String query) {
        String searchEndpoint = "catalog/search/";

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        headers.add("Authorization","Bearer"+" "+token);

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        // Build the URI with query parameters
        String uri = UriComponentsBuilder.fromUriString(apiBaseUrl)
                .path(searchEndpoint)
                .queryParam("q", query)
                .queryParam("type", "tracks")
                .build()
                .toString();

        ResponseEntity<?> result = restTemplate.exchange(uri, HttpMethod.GET, entity, Object.class);
        return result.getBody();
    }
}
