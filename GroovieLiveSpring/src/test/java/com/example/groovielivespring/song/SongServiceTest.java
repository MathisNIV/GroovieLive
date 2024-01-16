package com.example.groovielivespring.song;

import com.example.dto.song.SongDTO;
import com.example.groovielivespring.song.controller.SongService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;

@SpringBootTest
public class SongServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private SongService songService;

    @Test
    public void testSearchSong() {
        ResponseEntity<String> mockResponseEntity = new ResponseEntity<>("mocked response", HttpStatus.OK);
        Mockito.when(restTemplate.exchange(Mockito.anyString(), Mockito.any(HttpMethod.class), Mockito.any(HttpEntity.class), Mockito.any(Class.class)))
                .thenReturn(mockResponseEntity);

//        Mockito.when(songService.music_treatment("query")).thenReturn(new ArrayList<>());
//
//        ArrayList<SongDTO> result = songService.searchSong("query");
//
//        assertThat(result).isNotNull();
    }

    @Test
    public void testSearchArtist() {
        ResponseEntity<String> mockResponseEntity = new ResponseEntity<>("mocked response", HttpStatus.OK);
        Mockito.when(restTemplate.exchange(Mockito.anyString(), Mockito.any(HttpMethod.class), Mockito.any(HttpEntity.class), Mockito.any(Class.class)))
                .thenReturn(mockResponseEntity);

//        Mockito.when(songService.music_treatment("artistQuery")).thenReturn(new ArrayList<>());
//
//        ArrayList<SongDTO> result = songService.searchArtist("artistQuery");
//
//        assertThat(result).isNotNull();
    }



}
