package com.example.groovielivespring.song.model;

public class BeatportClient {
    private String username;
    private String password;
    private String clientId;
    private String token;

    public BeatportClient(String username, String password, String clientId, String token) {
        setUsername(username);
        setPassword(password);
        setClientId(clientId);
        setToken(token);
    }

    public BeatportClient(String username, String password) {
        this(username, password, "", "");
    }

    public BeatportClient() {
        this("","","","");
    }

    public String getUsername() {
        return username;
    }

    private void setUsername(String username) {
        this.username = username;
    }

    private String getToken() {
        return token;
    }

    private void setToken(String token) {
        this.token = token;
    }

    private String getPassword() {
        return password;
    }
    
    private void setPassword(String password) {
        this.password = password;
    }
    
    private String getClientId() {
        return clientId;
    }
    
    private void setClientId(String clientId) {
        this.clientId = clientId;
    }
}