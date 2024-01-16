package com.example.dto.song;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;
import java.util.Arrays;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SongDTO implements Serializable {

    private String title;
    private String[] author;
    private String[] authorRemix;
    private String camelotKey;
    private String genre;
    private String subGenre;
    private int bpm;
    private int energyLevel;
    private String mixTitle;
    private int length;
    private String sampleUrl;
    private String imageUrl;
    private int id;

    public SongDTO(String title, String[] author, String[] authorRemix, String camelotKey, String genre, String subGenre, int bpm, int energyLevel,
                   String mixTitle, int length, String sampleUrl, String imageUrl, int id) {
        this.title = title;
        this.author = author;
        this.authorRemix = authorRemix;
        this.camelotKey = camelotKey;
        this.genre = genre;
        this.subGenre = subGenre;
        this.bpm = bpm;
        this.energyLevel = energyLevel;
        this.mixTitle = mixTitle;
        this.length = length;
        this.sampleUrl = sampleUrl;
        this.imageUrl = imageUrl;
        this.id = id;
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

    public String getcamelotKey() {
        return camelotKey;
    }

    public void setcamelotKey(String camelotKey) {
        this.camelotKey = camelotKey;
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

    public String getImageUrl() {
    	return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
    	this.imageUrl = imageUrl;
    }

    public int getId() {
    	return id;
    }

    public void setId(int id) {
    	this.id = id;
    }

    @Override
    public String toString() {
        return "Song{" +
                "title='" + title + '\'' +
                ", author=" + Arrays.toString(author) +
                ", authorRemix=" + Arrays.toString(authorRemix) +
                ", camelotKey='" + camelotKey + '\'' +
                ", genre='" + genre + '\'' +
                ", subGenre='" + subGenre + '\'' +
                ", bpm=" + bpm +
                ", energyLevel=" + energyLevel +
                ", mixTitle='" + mixTitle + '\'' +
                ", length=" + length +
                ", sampleUrl='" + sampleUrl + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", id=" + id +
                '}';
    }
}
