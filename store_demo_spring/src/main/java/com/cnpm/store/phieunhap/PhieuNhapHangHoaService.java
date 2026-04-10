package com.cnpm.store.phieunhap;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhieuNhapHangHoaService {

    private final PhieuNhapHangHoaRepository repository;

    public PhieuNhapHangHoaService(PhieuNhapHangHoaRepository repository) {
        this.repository = repository;
    }

    public List<PhieuNhapHangHoaEntity> findAll() {
        return repository.findAll();
    }
}
