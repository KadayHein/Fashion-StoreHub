package com.gdc.backend.outfitHub.api;

import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gdc.backend.outfitHub.ds.ProductDTO;
import com.gdc.backend.outfitHub.entities.Product;
import com.gdc.backend.outfitHub.services.ProductService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductApi {
    private final ProductService productService;

    @QueryMapping
    public List<Product> allProducts(){
        return productService.allProducts();
    }

    @QueryMapping
    public List<Product> productsByGenreId(@Argument Long id){
        return productService.allProductsByGenreId(id);
    }

    @QueryMapping
    public Product productById(@Argument Long id){
        return productService.getProductById(id);
    }
    
    @MutationMapping
    public Integer uploadProduct(@Argument ProductDTO product) {
    	System.out.println("URL"+product.getImageUrl());
        return productService.uploadProduct(product);
    }
}
