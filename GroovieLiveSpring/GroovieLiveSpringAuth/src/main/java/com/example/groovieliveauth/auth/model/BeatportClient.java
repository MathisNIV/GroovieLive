package com.example.groovieliveauth.auth.model;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


public class BeatportClient {
    private HttpHeaders headers = new HttpHeaders();
    private final RestTemplate restTemplate = new RestTemplate();
    private final String beatportBaseUrl = "https://api.beatport.com/v4";
    private final String clientId = "0GIvkCltVIuPkkwSJHp6NDb3s0potTjLBQr388Dd";

    public BeatportClient() {
        this.headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        this.headers.setContentType(MediaType.APPLICATION_JSON);
    }

    public String login(String username, String password) {
        String loginEndPoint = "/auth/login/";
        String requestBody = "{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}";
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        String uri = UriComponentsBuilder.fromUriString(beatportBaseUrl)
                .path(loginEndPoint)
                .build()
                .toUriString();
        ResponseEntity<String> result = restTemplate.exchange(uri, HttpMethod.POST, entity, String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = null;
        try {
            rootNode = objectMapper.readTree(result.getBody());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        System.out.println(rootNode);
        return "";
    }
    
}
