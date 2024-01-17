package com.example.groovielivespring.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.dto.user.LoginDTO;
import com.example.dto.user.RegisterDTO;
import com.example.groovielivespring.auth.model.UserDB;

import java.util.Objects;

@RestController
public class AuthCrt {

    @Autowired
    private AuthRepo authRepo;
    
	@GetMapping("/user")
	public String getUser() {
		return "Welcome, User";
	}
	
	@GetMapping("/admin")
	public String getAdmin() {
		return "Welcome, Admin";
	}

    @PostMapping("/logout")
    public String logout() {
        // de-connect en invalidant la session
        SecurityContextHolder.clearContext();
        return "Logout successful";
    }
	
    @PostMapping("/Register") //endingPoint accept quest HTTP de type POST à url /register
    public String registerUser(@RequestBody RegisterDTO registerDTO) {
        // Inscription dans la base de données

        if (!Objects.equals(registerDTO.getUsername(), "") && !Objects.equals(registerDTO.getPassword(), "") && !Objects.equals(registerDTO.getEmail(), "")) {
            // Check if user exist or not
            if (authRepo.findByUsername(registerDTO.getUsername()) != null) {
                System.out.println("User existe deja");
                return "Username already exists";
            }
            else {

                // Encode password
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                String hashedPassword = passwordEncoder.encode(registerDTO.getPassword());

                // Creation new user
                UserDB newUser = new UserDB();
                newUser.setUsername(registerDTO.getUsername());
                newUser.setPassword(hashedPassword);
                newUser.setRole(registerDTO.getRole());
                newUser.setEmail(registerDTO.getEmail());

                // Save user in bdd
                authRepo.save(newUser);

                return "User registered successfully";
            }
        }
        else {
                return "Please complete the required fields";
            }


    }
    @PostMapping("/Login")
    public String loginUser(@RequestBody LoginDTO loginDTO) {
        // Recherche ud user dans la bdd
        UserDB user = authRepo.findByUsername(loginDTO.getUsername());

        // Vérification si l'utilisateur existe et si le mot de passe correspond
        if (user != null && passwordMatches(loginDTO.getPassword(), user.getPassword())) {
            return "User logged in successfully";
        }
        else {
            return "Invalid username or password";
        }
    }

    // Méthode pour vérifier si le mdp correspond après le déchiffrement
    private boolean passwordMatches(String rawPassword, String encodedPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
	
}
