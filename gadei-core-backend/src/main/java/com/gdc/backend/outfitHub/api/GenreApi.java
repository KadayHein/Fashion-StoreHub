package com.gdc.backend.outfitHub.api;

import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gdc.backend.outfitHub.entities.Genre;
import com.gdc.backend.outfitHub.services.GenreService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GenreApi {
    private final GenreService genreService;

    @QueryMapping
    public List<Genre> allGenres(){
        return genreService.allGenres();
    }

    @QueryMapping
    public List<Genre> genresByCategoryId(@Argument Long id){
        return genreService.allGenresByCategoryId(id);
    }

    @QueryMapping
    public Genre genreById(@Argument Long id){
        return genreService.getGenreById(id);
    }
}
