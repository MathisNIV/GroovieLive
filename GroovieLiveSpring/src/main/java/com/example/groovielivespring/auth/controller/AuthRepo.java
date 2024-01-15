package com.example.groovielivespring.auth.controller;

import com.example.groovielivespring.auth.controller.AuthRepo;
import com.example.groovielivespring.auth.model.UserDB;
import org.springframework.data.repository.CrudRepository;


public interface AuthRepo extends CrudRepository<UserDB, Integer> {
	public UserDB findByUsername(String username);

}