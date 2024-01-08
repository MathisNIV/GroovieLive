package com.example.groovielivespring.song.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class SongCrt {

    @Autowired
    private SongService songService;

    @RequestMapping(method = RequestMethod.GET, value = "/search/{song}")
    public String search(@PathVariable String song) {
        return songService.search(song);
    }

}
