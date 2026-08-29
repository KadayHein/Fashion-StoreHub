package com.gdc.backend.outfitHub.dao;

import java.util.Optional;

import com.gdc.backend.outfitHub.entities.Account;

public interface AccountDao extends BaseRepository<Account,String> {
//    Optional<Account> findByEmail(String email);
//
    boolean existsByEmail(String email);

    boolean existsByEmailAndPassword(String email,String password);
}
