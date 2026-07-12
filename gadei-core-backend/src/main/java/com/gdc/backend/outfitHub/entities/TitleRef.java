package com.gdc.backend.outfitHub.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Getter @Setter
@NoArgsConstructor
public class TitleRef {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long syskey;
	private String name;
	private LocalDate validFrom;
	private LocalDate expireAt;
	
	public TitleRef(String name, LocalDate validFrom, LocalDate expireAt) {
		super();
		this.name = name;
		this.validFrom = validFrom;
		this.expireAt = expireAt;
	}
	
	
}
