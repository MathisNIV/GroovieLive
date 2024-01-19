package com.example.groovieliveauth.auth.controller;
// Pour permettre a SpringSecurity d'utiliser des user en BDD pour s'identifier

import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import com.example.dto.user.LoginDTO;
import com.example.groovieliveauth.auth.model.BeatportClient;

@Service
public class AuthService {
    
    public String beatportLogin(LoginDTO loginDTO) {
        String ret = "";
        try {
            BeatportClient beatportClient = new BeatportClient();
            beatportClient.login(loginDTO.getUsername(), loginDTO.getPassword());
            ret = beatportClient.fetchAccessToken();
        } catch (HttpServerErrorException e) {
            ret = "Beatport server is curretly unavailable, please try again later";
        } catch (HttpClientErrorException e) {
            ret = "Wrong credentials";
        } catch (Exception e) {
            ret = "Something went wrong";
        }
        return ret;
    }
}



