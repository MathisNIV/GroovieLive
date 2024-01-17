package com.example.groovielivespringauth.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
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
	
	@Autowired
	private DBUserDetailsService customUserDetailsService;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		//Modelisation d'une chaine de filtres de securite, gestion des roles de 2 type d'utilisateurs

		//auth.requestMatchers("/admin").hasRole("ADMIN");
		//auth.requestMatchers("/user").hasRole("USER");
		
			//return http.authorizeHttpRequests(auth -> {
				//auth.requestMatchers("/search/").permitAll();
				//auth.anyRequest().permitAll();
			//}).formLogin(Customizer.withDefaults()).build();
			return http
					.authorizeRequests(authorizeRequests -> authorizeRequests.anyRequest().permitAll())
					.cors().and().csrf().disable() // Configurer CORS et désactiver CSRF pour simplifier l'exemple
					.formLogin(Customizer.withDefaults()).build();
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
		
		@Bean
		public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder) throws Exception {
			AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(bCryptPasswordEncoder);
			return authenticationManagerBuilder.build();
		}

}
