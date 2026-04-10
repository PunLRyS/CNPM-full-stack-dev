package com.cnpm.store.phieuxuat;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/phieu-xuat-dai-ly")
public class PhieuXuatDaiLyController {

    private final PhieuXuatDaiLyService phieuXuatDaiLyService;

    public PhieuXuatDaiLyController(PhieuXuatDaiLyService phieuXuatDaiLyService) {
        this.phieuXuatDaiLyService = phieuXuatDaiLyService;
    }

    @GetMapping("/get-du-lieu")
    public List<PhieuXuatDaiLyEntity> findOne() {
        return phieuXuatDaiLyService.findAll();
    }
}
