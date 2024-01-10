package com.example.groovielivespring.auth.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;


@Entity
public class UserDB {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private Integer id;
	private String username;
	private String password;
	private String role;
	
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	public String getRole() {
		return role;
	}
	public void setUsername(String username2) {
		// TODO Auto-generated method stub
		
	}
	public void setPassword(String hashedPassword) {
		// TODO Auto-generated method stub
		
	}
	public void setRole(String role2) {
		// TODO Auto-generated method stub
		
	}

}