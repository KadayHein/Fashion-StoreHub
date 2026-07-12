package com.gdc.backend.outfitHub.ds;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class ProductDTO {
	private Long id;
    private String code;
    private String name;
    private String imageUrl;
    private double price;
    private int quantity;
    private double discount;
    private Long genre_id;
}
