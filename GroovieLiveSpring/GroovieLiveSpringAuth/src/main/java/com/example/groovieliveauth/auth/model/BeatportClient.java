package com.example.groovieliveauth.auth.model;

import java.net.URI;
import java.util.List;

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
    private final String beatportRediretUri = beatportBaseUrl + "/auth/o/post-message/";
    private final String clientId = "0GIvkCltVIuPkkwSJHp6NDb3s0potTjLBQr388Dd";

    public BeatportClient() {
        this.headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        this.headers.setContentType(MediaType.APPLICATION_JSON);
    }

    public void login(String username, String password) {
        String loginEndPoint = "/auth/login/";
        String requestBody = "{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}";
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
        String uri = UriComponentsBuilder.fromUriString(beatportBaseUrl)
            .path(loginEndPoint)
            .build()
            .toUriString();
        ResponseEntity<String> result = restTemplate.exchange(uri, HttpMethod.POST, entity, String.class);
        addSessionCookies(result.getHeaders());
    }

    public String fetchAccessToken() {
        String authorizationCode = fetchAuthorizationCode();
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String uri = UriComponentsBuilder.fromUriString(beatportBaseUrl)
            .path("/auth/o/token/")
            .queryParam("code", authorizationCode)
            .queryParam("grant_type", "authorization_code")
            .queryParam("redirect_uri", beatportRediretUri)
            .queryParam("client_id", clientId)
            .toUriString();
        ResponseEntity<String> result = restTemplate.exchange(uri, HttpMethod.POST, entity, String.class);
        JsonNode rootNode = parseJson(result.getBody());
        return rootNode.toString();
    }
    
    private String fetchAuthorizationCode() {
        RestTemplate custoTemplate = new RestTemplate(new CustomClientHttpRequestFactory());
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String uri = UriComponentsBuilder.fromHttpUrl(beatportBaseUrl)
            .path("/auth/o/authorize/")
            .queryParam("client_id", clientId)
            .queryParam("response_type", "code")
            .queryParam("redirect_uri", beatportRediretUri)
            .toUriString();
        ResponseEntity<String> response = custoTemplate.exchange(uri, HttpMethod.GET, entity,String.class);
        URI redirectUri = response.getHeaders().getLocation();
        return redirectUri.getQuery().split("&")[0].split("=")[1];
    }

    private void addSessionCookies(HttpHeaders headers) {
        List<String> cookies = headers.get("set-cookie");
        String csrfToken = cookies.get(0).split(";")[0];
        String sessionId = cookies.get(1).split(";")[0];
        this.headers.add("Cookie", csrfToken + ";" + sessionId);
    }

    private JsonNode parseJson(String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = null;
        try {
            rootNode = objectMapper.readTree(json);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return rootNode;
    }
}
