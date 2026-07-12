package com.gdc.backend.outfitHub.ds;

import lombok.*;

@Getter @Setter @ToString
@EqualsAndHashCode // for unique CartItem
@NoArgsConstructor@AllArgsConstructor
public class CartItem {
    private Long productId;
    private String productImage;
    private String productName;
    private double price;
    private Integer quantity = 1;
}
