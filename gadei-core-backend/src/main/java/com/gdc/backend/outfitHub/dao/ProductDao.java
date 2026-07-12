package com.gdc.backend.outfitHub.dao;

import java.util.List;

import com.gdc.backend.outfitHub.entities.Product;


public interface ProductDao extends BaseRepository<Product,Long> {
    List<Product> findProductsByGenre_Id(Long id);
}
