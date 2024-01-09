package com.example.groovielivespring.auth.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity

public class SpringSecurityConfig {
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		//Modelisation d'une chaine de filtres de securite, gestion des roles de 2 type d'utilisateurs
	
			return http.authorizeHttpRequests(auth -> {
				auth.requestMatchers("/search/").permitAll();
				auth.requestMatchers("/admin").hasRole("ADMIN");
				auth.requestMatchers("/user").hasRole("USER");
				auth.anyRequest().permitAll();
			}).formLogin(Customizer.withDefaults()).build();
		}
		
		@Bean
		public UserDetailsService users() {
			//details de creation d'un utilisateur
			
			UserDetails user = User.builder()
					.username("user")
					.password(passwordEncoder().encode("user"))
					.roles("USER").build();
			UserDetails admin = User.builder()
					.username("admin")
					.password(passwordEncoder().encode("admin"))
					.roles("USER", "ADMIN").build();
			return new InMemoryUserDetailsManager(user, admin);
		}
		
		@Bean
		public BCryptPasswordEncoder passwordEncoder() {
			return new BCryptPasswordEncoder();
		}
		

}
