package com.example.groovielivespring.song;

import org.springframework.stereotype.Service;

@Service
public class SongService {

    // Simulated data (replace with actual implementation)
    private static final String[] titles = {"Song1", "Song2", "Song3"};
    private static final String[] authors = {"Author1", "Author2", "Author3"};

    public String searchByTitle(String title) {
        //TODO requeteAPI
        return title;
    }

    public String searchByAuthor(String author) {
        //TODO requeteAPI
        return author;
    }

}
