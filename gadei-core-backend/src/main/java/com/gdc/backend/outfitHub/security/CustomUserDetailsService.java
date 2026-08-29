package com.gdc.backend.outfitHub.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gdc.backend.outfitHub.dao.AccountDao;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountDao accountDao;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return accountDao.findById(email)
                .map(account -> User.builder()
                        .username(account.getEmail())
                        .password(account.getPassword())
                        .authorities(account.getRole().name())
                        .build()
                ).orElseThrow(() -> new UsernameNotFoundException(email));
    }
}
