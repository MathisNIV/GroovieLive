package com.example.groovielivespring.song.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SongCrt {

    @Autowired
    private SongService songService;

    @GetMapping("/searchByTitle")
    public String searchByTitle(@RequestParam String title) {
        return songService.searchByTitle(title);
    }

    @GetMapping("/searchByAuthor")
    public String searchByAuthor(@RequestParam String author) {
        return songService.searchByAuthor(author);
    }
}
