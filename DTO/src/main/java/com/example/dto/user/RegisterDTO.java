package com.example.dto.user;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;


@JsonInclude(JsonInclude.Include.NON_NULL)

public class RegisterDTO implements Serializable {
	
    private String username;
    private String password;
    private String role;
    private String email;
    
    
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	
	public String getRole() {
		return role;
	}
	public String getEmail() {
		return email;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public void setEmail(String email) {
		this.email = email;
	}

    @Override
    public String toString() {
        return "RegisterDTO{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
