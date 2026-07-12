package com.gdc.backend.outfitHub.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Getter @Setter
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String name;
    private String imageUrl;
    private double price;
    private int quantity;
    private double discount;
    @ManyToOne
    private Genre genre;

    public Product(String code, String name, String imageUrl, double price, int quantity, double discount,Genre genre) {
        this.code = code;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount;
        this.genre = genre;
    }

	@Override
	public String toString() {
		return "Product [id=" + id + ", code=" + code + ", name=" + name + ", imageUrl=" + imageUrl + ", price=" + price
				+ ", quantity=" + quantity + ", discount=" + discount + "]";
	}
    
    
}
