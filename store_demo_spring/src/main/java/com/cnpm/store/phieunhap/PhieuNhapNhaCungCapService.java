package com.cnpm.store.phieunhap;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhieuNhapNhaCungCapService {

    private final PhieuNhapNhaCungCapRepository repository;

    public PhieuNhapNhaCungCapService(PhieuNhapNhaCungCapRepository repository) {
        this.repository = repository;
    }

    public List<PhieuNhapNhaCungCapEntity> findAll() {
        return repository.findAll();
    }
}
