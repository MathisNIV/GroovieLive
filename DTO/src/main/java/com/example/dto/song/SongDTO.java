package com.example.dto.song;

import java.util.Arrays;

public class SongDTO {

    private String title;
    private String[] author;
    private String[] authorRemix;
    private String musicalKey;
    private String genre;
    private String subGenre;
    private int bpm;
    private int energyLevel;
    private String mixTitle;
    private int length;
    private String sampleUrl;

    public SongDTO(String title, String[] author, String[] authorRemix, String musicalKey, String genre, String subGenre, int bpm, int energyLevel,
                   String mixTitle, int length, String sampleUrl) {
        this.title = title;
        this.author = author;
        this.authorRemix = authorRemix;
        this.musicalKey = musicalKey;
        this.genre = genre;
        this.subGenre = subGenre;
        this.bpm = bpm;
        this.energyLevel = energyLevel;
        this.mixTitle = mixTitle;
        this.length = length;
        this.sampleUrl = sampleUrl;
    }

    // Getters and setters for the new fields

    public String getMixTitle() {
        return mixTitle;
    }

    public void setMixTitle(String mixTitle) {
        this.mixTitle = mixTitle;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public String getSampleUrl() {
        return sampleUrl;
    }

    public void setSampleUrl(String sampleUrl) {
        this.sampleUrl = sampleUrl;
    }

    @Override
    public String toString() {
        return "Song{" +
                "title='" + title + '\'' +
                ", author=" + Arrays.toString(author) +
                ", authorRemix=" + Arrays.toString(authorRemix) +
                ", musicalKey='" + musicalKey + '\'' +
                ", genre='" + genre + '\'' +
                ", subGenre='" + subGenre + '\'' +
                ", bpm=" + bpm +
                ", energyLevel=" + energyLevel +
                ", mixTitle='" + mixTitle + '\'' +
                ", length=" + length +
                ", sampleUrl='" + sampleUrl + '\'' +
                '}';
    }
}
