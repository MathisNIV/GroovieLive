package com.example.groovielivespring.auth.controller;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.groovielivespring.auth.model.UserDB;
import org.springframework.stereotype.Repository;

@Repository

public interface AuthRepo extends JpaRepository<UserDB, Long> {
	public UserDB findByUsername(String username);

}