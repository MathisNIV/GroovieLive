package com.example.groovieliveauth.auth.config;

import com.example.groovieliveauth.auth.model.UserDB;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class MyUserPrincipal implements UserDetails {

    private UserDB userdb;

    public MyUserPrincipal(UserDB userdb){
        this.userdb = userdb;
    }

    public UserDB getUserdb() {
        return userdb;
    }

    public void setUserdb(UserDB userdb) {
        this.userdb = userdb;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
