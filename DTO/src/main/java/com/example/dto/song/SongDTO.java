package com.example.dto.song;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;
import java.util.Arrays;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SongDTO implements Serializable {

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String[] getAuthor() {
        return author;
    }

    public void setAuthor(String[] author) {
        this.author = author;
    }

    public String[] getAuthorRemix() {
        return authorRemix;
    }

    public void setAuthorRemix(String[] authorRemix) {
        this.authorRemix = authorRemix;
    }

    public String getMusicalKey() {
        return musicalKey;
    }

    public void setMusicalKey(String musicalKey) {
        this.musicalKey = musicalKey;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getSubGenre() {
        return subGenre;
    }

    public void setSubGenre(String subGenre) {
        this.subGenre = subGenre;
    }

    public int getBpm() {
        return bpm;
    }

    public void setBpm(int bpm) {
        this.bpm = bpm;
    }

    public int getEnergyLevel() {
        return energyLevel;
    }

    public void setEnergyLevel(int energyLevel) {
        this.energyLevel = energyLevel;
    }

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
