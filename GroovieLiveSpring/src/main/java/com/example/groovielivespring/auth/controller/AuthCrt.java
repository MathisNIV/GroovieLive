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
	
    @PostMapping("/register") //endingPoint accept quest HTTP de type POST à url /register
    public String registerUser(@RequestBody RegisterDTO registerDTO) {
        // Inscription dans la base de données

        // Check if user exist or not
        if (registerDTO.getUsername() != null){
            if (authRepo.findByUsername(registerDTO.getUsername()) != null) {
                System.out.println("User existe deja");
                return "Username already exists";
            }
        }
        System.out.println("User saved successfully");

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
    @PostMapping("/login")
    public String loginUser(@RequestBody LoginDTO loginDTO) {
        System.out.println("Rentre dans login controller");
        System.out.println("DTOOO : "+ loginDTO);

        return "ca lance login";
    }

    // Méthode pour vérifier si le mdp correspond après le déchiffrement
    private boolean passwordMatches(String rawPassword, String encodedPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
	
}
