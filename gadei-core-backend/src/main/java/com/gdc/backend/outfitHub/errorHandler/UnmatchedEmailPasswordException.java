package com.gdc.backend.outfitHub.errorHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UnmatchedEmailPasswordException extends ResponseStatusException {
    public UnmatchedEmailPasswordException(String email, String password) {
        super(HttpStatus.NOT_FOUND, "Un-matched " + email + " and " + password);
        System.out.println("Un-matched " + email + " and " + password);
    }
}
