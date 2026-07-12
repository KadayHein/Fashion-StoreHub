package com.gdc.backend.outfitHub.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.gdc.backend.outfitHub.dao.GenreDao;
import com.gdc.backend.outfitHub.entities.Genre;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreDao genreDao;

    public List<Genre> allGenres(){
        return genreDao.findAll();
    }

    public List<Genre> allGenresByCategoryId(Long id){
        return genreDao.findGenresByCategory_Id(id);
    }

    public Genre getGenreById(Long id){
        return genreDao.findById(id).orElseThrow();
    }
    
    public Boolean uploadGenre(String name) {
    	Genre newGenre = new Genre();
    	newGenre.setName(name);
    	genreDao.save(newGenre);
    	return true;
    }
}
