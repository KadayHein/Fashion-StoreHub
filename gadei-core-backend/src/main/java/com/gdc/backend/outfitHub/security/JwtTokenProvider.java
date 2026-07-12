package com.gdc.backend.outfitHub.security;

import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;
import java.util.Arrays;

@Slf4j
//@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private SecretKey key = Jwts.SIG.HS512.key().build();

    public Authentication parse(String token){
        if(StringUtils.hasLength(token)){
            var jwt = Jwts.parser()
                    .verifyWith(key)
                    .requireIssuer("com.ysc")
                    .build()
                    .parseSignedClaims(token);

            var username = jwt.getPayload().getSubject();
            var authorities = Arrays.stream(jwt.getPayload().get("role").toString().split(", "))
                    .map(SimpleGrantedAuthority::new)
                    .toList();

            return new UsernamePasswordAuthenticationToken(username, null, authorities);
        }
        else{
            throw new JwtException(token);
        }
    }

}
