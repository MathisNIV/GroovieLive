package com.example.groovielivespring.auth.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class UserDB {


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	private Integer id;
	private String username;
	private String password;
	private String role;
	private String email;

	public UserDB (){

	}
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

	public void setEmail(String email) {
		this.email = email;
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

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}