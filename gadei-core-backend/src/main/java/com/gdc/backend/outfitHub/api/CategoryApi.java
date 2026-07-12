package com.gdc.backend.outfitHub.api;

import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gdc.backend.outfitHub.entities.Category;
import com.gdc.backend.outfitHub.services.CategoryService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryApi {
    private final CategoryService categoryService;

    @QueryMapping
    public List<Category> allCategories() {
        return categoryService.allCategories();
    }

    @QueryMapping
    public Category categoryById(@Argument Long id){
        return categoryService.getCategoryById(id);
    }
}
