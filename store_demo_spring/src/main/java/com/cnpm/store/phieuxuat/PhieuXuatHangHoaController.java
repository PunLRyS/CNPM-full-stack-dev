package com.cnpm.store.phieuxuat;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/phieu-xuat-hang-hoa")
public class PhieuXuatHangHoaController {

    private final PhieuXuatHangHoaService phieuXuatHangHoaService;

    public PhieuXuatHangHoaController(PhieuXuatHangHoaService phieuXuatHangHoaService) {
        this.phieuXuatHangHoaService = phieuXuatHangHoaService;
    }

    @GetMapping("/get-du-lieu")
    public List<PhieuXuatHangHoaEntity> findOne() {
        return phieuXuatHangHoaService.findAll();
    }
}
