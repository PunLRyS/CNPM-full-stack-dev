package com.cnpm.store.daily;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DaiLyRepository extends JpaRepository<DaiLyEntity, UUID> {

    Optional<DaiLyEntity> findByMa(String ma);

    List<DaiLyEntity> findByTenContainingIgnoreCase(String ten);
}
