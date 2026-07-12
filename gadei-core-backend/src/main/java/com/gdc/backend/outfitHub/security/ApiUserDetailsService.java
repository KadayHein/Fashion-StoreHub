package com.gdc.backend.outfitHub.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gdc.backend.outfitHub.dao.AccountRepo;

//@Service
@RequiredArgsConstructor
public class ApiUserDetailsService implements UserDetailsService {

    private final AccountRepo accountRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountRepo.findById(username)
                .map(account -> User.builder()
                        .username(account.getEmail())
                        .password(account.getPassword())
                        .authorities(account.getRole().name())
                        .build()
                ).orElseThrow(() -> new UsernameNotFoundException(username));
    }
}
