package com.gdc.backend.outfitHub.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.gdc.backend.util.CriteriaUtil;

@Entity @Setter @Getter
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    private Category category;
    @OneToMany(mappedBy = "genre", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products = new ArrayList<>();

    public void addProduct(Product product) {
        products.add(product);
        product.setGenre(this);
    }
    
    public static Specification<Genre> getGenreById(Long id) {
        return CriteriaUtil.whereEqual(Genre.class,"id", id);
    }

//            return switch (condition) {
//                case "eq" -> cb.equal(root.get(colname), colvalue);
//                case "c" -> cb.like(root.get(colname), "%" + colvalue + "%");
//                case "sw" -> cb.like(root.get(colname), colvalue + "%"); // Starts with
//                case "ew" -> cb.like(root.get(colname), "%" + colvalue); // Ends with
//                default -> cb.equal(root.get("description"), colvalue);
//            };
//        };
}