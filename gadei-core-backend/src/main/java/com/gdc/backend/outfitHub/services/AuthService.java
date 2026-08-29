package com.gdc.backend.outfitHub.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gdc.backend.outfitHub.dao.AccountDao;
import com.gdc.backend.outfitHub.ds.SignInDTO;
import com.gdc.backend.outfitHub.ds.SignUpDTO;
import com.gdc.backend.outfitHub.entities.Account;
import com.gdc.backend.outfitHub.errorHandler.EmailAlreadyExistsException;
import com.gdc.backend.outfitHub.jwt.JwtTokenProvider;

@Service
@RequiredArgsConstructor
public class AuthService {
   private final AccountDao accountDao;
   private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public String signUp(SignUpDTO signUpForm){
        if(accountDao.existsByEmail(signUpForm.email())){
            throw new EmailAlreadyExistsException(signUpForm.email());
        }
        Account account = new Account(signUpForm.email(),passwordEncoder.encode(signUpForm.password()),signUpForm.fullName(),signUpForm.phoneNumber());
        accountDao.save(account);
        return signIn(new SignInDTO(signUpForm.email(), signUpForm.password()));
    }

    public String signIn(SignInDTO signInForm){
        Authentication authenticatedObject = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInForm.email(),signInForm.password())
        );
        SecurityContextHolder.getContext().setAuthentication(authenticatedObject);
        System.out.println("authenticatedObject.getName() = "+authenticatedObject.getName());
        String loginToken = jwtTokenProvider.generateToken(authenticatedObject);
        System.out.println("Login token: " + loginToken);
        return loginToken;
    }
}


