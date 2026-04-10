package com.cnpm.store.phieuxuat;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhieuXuatDaiLyService {

    private final PhieuXuatDaiLyRepository repository;

    public PhieuXuatDaiLyService(PhieuXuatDaiLyRepository repository) {
        this.repository = repository;
    }

    public List<PhieuXuatDaiLyEntity> findAll() {
        return repository.findAll();
    }
}
