package com.gdc.backend.outfitHub.api;
import lombok.RequiredArgsConstructor;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gdc.backend.outfitHub.ds.SecurityInfo;
import com.gdc.backend.outfitHub.ds.SignInForm;
import com.gdc.backend.outfitHub.services.SecurityService;

@RestController
@RequiredArgsConstructor
public class SecurityApi {

   private final SecurityService securityService;

   @MutationMapping
   public SecurityInfo signIn(@Argument SignInForm signInForm){
       return securityService.signIn(signInForm);
   }


}

