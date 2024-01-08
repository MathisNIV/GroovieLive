package com.example.groovielivespring.song;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class SongService {
    private final WebClient webClient;
    public SongService(WebClient.Builder webClientBuilder) {
        String api_base_url = "https://api.beatport.com/v4/";
        this.webClient = webClientBuilder.baseUrl(api_base_url).build();
    }

    public String search(String query) {
        String search_endpoint = "catalog/search/";
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path(search_endpoint)
                        .queryParam("q", query)
                        .queryParam("type", "tracks")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
