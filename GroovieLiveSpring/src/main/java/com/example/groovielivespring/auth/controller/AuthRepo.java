package com.example.groovielivespring.auth.controller;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.groovielivespring.auth.model.UserDB;

public interface AuthRepo extends JpaRepository<UserDB, Integer> {
	public UserDB findByUsername(String username);
}