package com.example.groovielivespring.auth.config;

// Pour permettre a Spring security d'utiliser des user dans la bdd pour s'authentifier avec le formulaire de connexion
// Classe qui implemente une interface fournit par SpringSecurity //La configuration de Spring Security doit prendre en compte cette classe via un AuthenticationManager.

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.groovielivespring.auth.model.UserDB;
import com.example.groovielivespring.auth.controller.AuthRepo;

@Service

public class DBUserDetailsService implements UserDetailsService {
// création classe implémentant l’interface UserDetailsService permet d’authentifier des utilisateurs sur la base des informations contenues dans une bdd.

	@Autowired
	private AuthRepo AuthRepo;

	@Override
	public UserDetails loadUserByUsername(String username) {
		//methode appelee par springsecurity lors de l'authentification du user -> recupere les info d'un user dans la bdd, puis cree un user comprehensible par SprigSecurity
		UserDB userdb = AuthRepo.findByUsername(username);
		if (userdb == null){
			throw new UsernameNotFoundException(username);
		}
		return new MyUserPrincipal(userdb);
	}

	private List<GrantedAuthority> getGrantedAuthorities(String role) {
		
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
		return authorities;
		
	}
}
