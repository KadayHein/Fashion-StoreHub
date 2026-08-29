package com.gdc.backend.outfitHub.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    @Value("${app.jwt.secret}")
    private String jwtSecret;
    @Value("${app.jwt.expiration.milliseconds}")
    private long jwtExpiration;

    private Key secretKey(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String generateToken(Authentication authentication){
        String email = authentication.getName();
        System.out.println("Authentication.getName() = " + email);
        System.out.println("Authentication.getAuthorities() = " + authentication.getAuthorities().toString());
        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.getTime() + jwtExpiration);
        String token = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(currentDate)
                .setExpiration(expirationDate)
                .signWith(secretKey())
                .compact();
        return token;
    }

    public String getUserEmailFromToken(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        String email = claims.getSubject();
        System.out.println("Token.getSubject() = " + email);
        return email;
    }

    public boolean isTokenValid(String token){
        Jwts.parser()
                .setSigningKey(secretKey())
                .build()
                .parse(token);
        return true;
    }
}