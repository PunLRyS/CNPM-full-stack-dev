package com.cnpm.store.billxuat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BillXuatRepository extends JpaRepository<BillXuatEntity, UUID> {

    List<BillXuatEntity> findByMaPhieuXuat(String maPhieuXuat);
}
