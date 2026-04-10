package com.cnpm.store.phieuxuat;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhieuXuatHangHoaService {

    private final PhieuXuatHangHoaRepository repository;

    public PhieuXuatHangHoaService(PhieuXuatHangHoaRepository repository) {
        this.repository = repository;
    }

    public List<PhieuXuatHangHoaEntity> findAll() {
        return repository.findAll();
    }
}
