package com.gdc.backend.outfitHub.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import com.gdc.backend.outfitHub.dao.AccountRepo;
import com.gdc.backend.outfitHub.ds.SecurityInfo;
import com.gdc.backend.outfitHub.ds.SignInForm;

@Service
@RequiredArgsConstructor
public class SecurityService {
   private final AccountRepo accountRepo;
   private final AuthenticationManager authenticationManager;

   public SecurityInfo signIn(SignInForm signInForm){
       var authentication = authenticationManager.authenticate(signInForm.authentication());

       return null;
   }
}


