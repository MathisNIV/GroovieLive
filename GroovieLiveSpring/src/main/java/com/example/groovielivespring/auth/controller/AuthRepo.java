package com.example.groovielivespring.auth.controller;

import com.example.groovielivespring.auth.model.UserDB;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;

public interface AuthRepo extends JpaRepository<UserDB, Integer> {
	public UserDB findByUsername(String username);

}