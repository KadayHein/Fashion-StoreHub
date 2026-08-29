package com.gdc.backend.outfitHub.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.gdc.backend.outfitHub.dao.ProductDao;
import com.gdc.backend.outfitHub.ds.FilterDTO;
import com.gdc.backend.outfitHub.ds.FilterDatasetDTO;
import com.gdc.backend.outfitHub.ds.ProductDTO;
import com.gdc.backend.outfitHub.entities.Category_;
import com.gdc.backend.outfitHub.entities.Genre_;
import com.gdc.backend.outfitHub.entities.Product;
import com.gdc.backend.outfitHub.entities.Product_;
import com.gdc.backend.util.CriteriaUtil;
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
    
    public List<Product> searchProductsByText(String searchText, Long categoryId){
    	Specification<Product> spec = CriteriaUtil.join3tbl(Product_.genre, Genre_.category, Category_.id, "eq", categoryId);
    	spec = spec.and(CriteriaUtil.whereLike(Product_.name, searchText));
    	return productDao.findAll(spec);
    }
    
    public List<Product> filterProducts(FilterDatasetDTO filterDataset, Long categoryId){
    	
    	Specification<Product> spec = CriteriaUtil.join3tbl(Product_.genre, Genre_.category, Category_.id, "eq", categoryId);
    	
    	for (FilterDTO filter : filterDataset.getFilterList()) {
    		if("number".equals(filter.getDatatype())) spec = spec.and(CriteriaUtil.where(Product_.price, filter.getCondition(), Double.parseDouble(filter.getValue()), "bt".equals(filter.getCondition()) ? Double.parseDouble(filter.getValue2()) : 0.00));
    		if("text".equals(filter.getDatatype())) spec = spec.and(CriteriaUtil.where(Product_.name, filter.getCondition(), filter.getValue()));
    	};
    	return productDao.findAll(spec);
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

