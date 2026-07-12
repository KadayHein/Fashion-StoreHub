package com.gdc.backend.outfitHub.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.gdc.backend.outfitHub.dao.CategoryDao;
import com.gdc.backend.outfitHub.entities.Category;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryDao categoryDao;

    public List<Category> allCategories(){
        return categoryDao.findAll();
    }

    public Category getCategoryById(Long id){
    	try {
    		return categoryDao.findById(id).orElseThrow();
		} catch (Exception e) {
			return null;
		}
    }
}
