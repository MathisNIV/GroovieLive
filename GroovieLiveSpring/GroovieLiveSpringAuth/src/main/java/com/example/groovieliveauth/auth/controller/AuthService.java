package com.example.groovieliveauth.auth.controller;
// Pour permettre a SpringSecurity d'utiliser des user en BDD pour s'identifier

import org.springframework.stereotype.Service;

import com.example.dto.user.LoginDTO;
import com.example.groovieliveauth.auth.model.BeatportClient;

@Service
public class AuthService {
    
    public String login(LoginDTO loginDTO) {
        BeatportClient beatportClient = new BeatportClient();
        beatportClient.login(loginDTO.getUsername(), loginDTO.getPassword());
        return "";
    }
}



