package com.cnpm.store.billnhap;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BillNhapRepository extends JpaRepository<BillNhapEntity, UUID> {

    List<BillNhapEntity> findByMaPhieuNhap(String maPhieuNhap);
}
