package com.gdc.backend.outfitHub.ds;


import com.gdc.backend.outfitHub.entities.Product;
import com.gdc.backend.outfitHub.entities.TitleRef;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
public class PicRefDTO {
	private long syskey;
	private String imageUrl;
	private TitleRef title;
	private Product product;
}
