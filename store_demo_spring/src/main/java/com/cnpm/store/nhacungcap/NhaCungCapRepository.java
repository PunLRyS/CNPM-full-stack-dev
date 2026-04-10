package com.cnpm.store.nhacungcap;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface NhaCungCapRepository extends JpaRepository<NhaCungCapEntity, UUID> {

    Optional<NhaCungCapEntity> findByMa(String ma);
}
