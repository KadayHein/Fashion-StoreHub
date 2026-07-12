package com.gdc.backend.outfitHub.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gdc.backend.outfitHub.dao.ProductDao;
import com.gdc.backend.outfitHub.ds.ProductDTO;
import com.gdc.backend.outfitHub.entities.Product;
import com.gdc.backend.util.EntityUtil;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
	@Autowired
    private ProductDao productDao;
	@Autowired
	private GenreService genreService;

    public List<Product> allProducts(){
        return productDao.findAll();
    }

    public List<Product> allProductsByGenreId(Long id){
        return productDao.findProductsByGenre_Id(id);
    }

    public Product getProductById(Long id){
        return productDao.findById(id).orElseThrow();	
    }
    
    public Integer uploadProduct(ProductDTO product) {
    	var newProduct = EntityUtil.toProduct(product);
    	newProduct.setGenre(genreService.getGenreById(product.getGenre_id()));
    	System.out.println(newProduct.toString());
//    	productDao.save(newProduct);
        return 1;
    }
}

