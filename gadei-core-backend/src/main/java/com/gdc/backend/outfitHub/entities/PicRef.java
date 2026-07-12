package com.gdc.backend.outfitHub.entities;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Getter @Setter
@NoArgsConstructor
public class PicRef {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long syskey;
	private String imageUrl;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "title_syskey")
	private TitleRef title;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = true)
	private Product product;
	
	public PicRef (TitleRef title, String imageUrl, Product product) {
		super();
		this.title = title;
		this.imageUrl = imageUrl;
		this.product = product;
	}
}
