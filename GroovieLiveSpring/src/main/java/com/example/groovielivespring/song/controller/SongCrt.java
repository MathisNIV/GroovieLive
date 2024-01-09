package com.example.groovielivespring.song.controller;

import com.example.dto.song.SongDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class SongCrt {

    @Autowired
    private SongService songService;

    @RequestMapping(method = RequestMethod.GET, value = "/search/{song}")
    public ArrayList<SongDTO> search(@PathVariable String song) {
        System.out.println("search");
        return songService.search(song);
    }

}
