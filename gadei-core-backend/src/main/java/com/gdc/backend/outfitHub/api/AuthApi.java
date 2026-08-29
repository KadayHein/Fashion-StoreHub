package com.gdc.backend.outfitHub.api;
import lombok.RequiredArgsConstructor;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.gdc.backend.outfitHub.ds.JwtRespDTO;
import com.gdc.backend.outfitHub.ds.SignInDTO;
import com.gdc.backend.outfitHub.ds.SignUpDTO;
import com.gdc.backend.outfitHub.services.AuthService;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthApi {

   private final AuthService authService;

    @MutationMapping
    public JwtRespDTO signIn(@Argument SignInDTO signInForm){
        String loginToken = authService.signIn(signInForm);
        JwtRespDTO jwtRespDto = new JwtRespDTO();
        jwtRespDto.setToken(loginToken);
        return jwtRespDto;
    }

    @MutationMapping
    public JwtRespDTO signUp(@Argument SignUpDTO signUpForm){
        String loginToken = authService.signUp(signUpForm);
        JwtRespDTO jwtRespDto = new JwtRespDTO();
        jwtRespDto.setToken(loginToken);
        return jwtRespDto;
    }
}
