package com.example.groovielivespring.song;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SongCrt {

    @Autowired
    private SongService songService;

    @GetMapping("/search")
    public String searchByTitle(@RequestParam String title) {
        return songService.search(title);
    }

}
