package com.gdc.backend.outfitHub.errorHandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidRoleException extends ResponseStatusException {
    public InvalidRoleException(String role) {
        super(HttpStatus.NOT_FOUND, role + " is not a valid role");
        System.out.println(role + " is not a valid role");
    }
}
