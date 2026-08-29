package com.gdc.backend.outfitHub.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.format.annotation.NumberFormat;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "account")
public class Account {

    @Id
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(
        name = "phone_number",
        nullable = false
    )
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.ROLE_USER;

    @Column(
        name = "created_at",
        nullable = false,
        updatable = false
    )
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Role {
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

