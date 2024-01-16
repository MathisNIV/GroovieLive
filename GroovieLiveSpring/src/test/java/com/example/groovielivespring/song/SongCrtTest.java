package com.example.groovielivespring.song;

import com.example.dto.song.SongDTO;
import com.example.groovielivespring.song.controller.SongCrt;
import com.example.groovielivespring.song.controller.SongService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;

@SpringBootTest
public class SongCrtTest {

    @Mock
    private SongService songService;

    @InjectMocks
    private SongCrt songCrt;

    @Test
    public void testSearchSong() {
        ArrayList<SongDTO> expectedSongs = new ArrayList<>();
        Mockito.when(songService.searchSong(anyString())).thenReturn(expectedSongs);

        ArrayList<SongDTO> result = songCrt.searchSong("la mort avec toi");

        assertThat(result).isEqualTo(expectedSongs);
    }

    @Test
    public void testSearchArtists() {
        ArrayList<SongDTO> expectedSongs = new ArrayList<>();
        Mockito.when(songService.searchArtist(anyString())).thenReturn(expectedSongs);

        ArrayList<SongDTO> result = songCrt.searchArtists("billx");

        assertThat(result).isEqualTo(expectedSongs);
    }
}
