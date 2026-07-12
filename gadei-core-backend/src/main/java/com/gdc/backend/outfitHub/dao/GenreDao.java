package com.gdc.backend.outfitHub.dao;

import java.util.List;

import com.gdc.backend.outfitHub.entities.Genre;


public interface GenreDao extends BaseRepository<Genre,Long> {
    List<Genre> findGenresByCategory_Id(Long id);
}
