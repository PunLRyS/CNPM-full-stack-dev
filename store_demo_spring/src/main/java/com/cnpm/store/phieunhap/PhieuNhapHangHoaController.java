package com.cnpm.store.phieunhap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/phieu-Nhap-hang-hoa")
public class PhieuNhapHangHoaController {

    private final PhieuNhapHangHoaService phieuNhapHangHoaService;

    public PhieuNhapHangHoaController(PhieuNhapHangHoaService phieuNhapHangHoaService) {
        this.phieuNhapHangHoaService = phieuNhapHangHoaService;
    }

    @GetMapping("/get-du-lieu")
    public List<PhieuNhapHangHoaEntity> findAll() {
        return phieuNhapHangHoaService.findAll();
    }
}
