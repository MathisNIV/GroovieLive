package com.example.groovieliveauth.auth.model;

import jakarta.persistence.*;

@Entity
public class UserDB {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userdb_seq")
	@SequenceGenerator(name = "userdb_seq", sequenceName = "USERDB_SEQ")
	
	private Integer id;
	private String username;
	private String password;
	private String role;
	private String email;

	public UserDB (){
	}
	public UserDB(String username, String password, String role, String email){
		this.username = username;
		this.password = password;
		this.role = role;
		this.email = email;
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