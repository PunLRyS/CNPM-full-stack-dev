package com.cnpm.store.phieuxuat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PhieuXuatHangHoaRepository extends JpaRepository<PhieuXuatHangHoaEntity, UUID> {
}
