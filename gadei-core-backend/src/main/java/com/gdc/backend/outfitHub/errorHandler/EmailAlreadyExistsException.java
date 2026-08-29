package com.gdc.backend.outfitHub.errorHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class EmailAlreadyExistsException extends ResponseStatusException {
    public EmailAlreadyExistsException(String email) {
        super(HttpStatus.BAD_REQUEST, email + " already exists");
        System.out.println(email + " already exists");
    }
}
