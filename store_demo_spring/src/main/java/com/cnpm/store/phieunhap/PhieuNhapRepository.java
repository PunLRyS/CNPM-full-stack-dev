package com.cnpm.store.phieunhap;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PhieuNhapRepository extends JpaRepository<PhieuNhapEntity, UUID> {
}
