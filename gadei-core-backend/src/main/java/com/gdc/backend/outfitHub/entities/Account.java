package com.gdc.backend.outfitHub.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.format.annotation.NumberFormat;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Account {
    @Id
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    @NumberFormat(style = NumberFormat.Style.NUMBER, pattern = "###-###-###")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.ROLE_USER;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Role{
        ROLE_USER,
        ROLE_ADMIN
    }
    
    

    public Account(String email, String password, String fullname, String phoneNumber){
        this.email = email;
        this.password = password;
        this.fullName = fullname;
        this.phoneNumber = phoneNumber;
    }
}

