package com.gdc.backend.util;

import com.gdc.backend.outfitHub.ds.ProductDTO;
import com.gdc.backend.outfitHub.entities.Product;

import org.springframework.beans.BeanUtils;

public class EntityUtil {
	
	
	public static ProductDTO toProductDto(Product product){
		ProductDTO productDto = new ProductDTO();
        BeanUtils.copyProperties(product, productDto);
        productDto.setGenre_id(product.getGenre().getId());
        return productDto;
    }
	
	public static Product toProduct(ProductDTO productDto){
		Product product = new Product();
        BeanUtils.copyProperties(productDto, product);
        return product;
    }

}
