package com.cnpm.store.phieuxuat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PhieuXuatRepository extends JpaRepository<PhieuXuatEntity, UUID> {

    Optional<PhieuXuatEntity> findByMa(String ma);
}
