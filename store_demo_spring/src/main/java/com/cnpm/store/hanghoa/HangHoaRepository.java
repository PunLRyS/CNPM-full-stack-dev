package com.cnpm.store.hanghoa;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface HangHoaRepository extends JpaRepository<HangHoaEntity, UUID> {

    Optional<HangHoaEntity> findByMa(String ma);

    Optional<HangHoaEntity> findByMaDaiLy(String maDaiLy);
}
