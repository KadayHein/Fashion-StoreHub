package com.gdc.backend.outfitHub.ds;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

public record SignInDTO(String email,
                         String password) {

    public Authentication authentication(){
        return UsernamePasswordAuthenticationToken.unauthenticated(email,password);
    }
}
