package com.gdc.backend.outfitHub.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.NumberFormat;

import java.time.LocalDateTime;

@Entity
@Data
@EqualsAndHashCode
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

    @Column(nullable = false)
    private Role role;

    @CreatedDate
    private LocalDateTime createdAt;

    public enum Role{
        USER,
        ADMIN
    }
}

