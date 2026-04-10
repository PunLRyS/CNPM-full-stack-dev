package com.cnpm.store.phieunhap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/phieu-nhap-nha-cung-cap")
public class PhieuNhapNhaCungCapController {

    private final PhieuNhapNhaCungCapService phieuNhapNhaCungCapService;

    public PhieuNhapNhaCungCapController(PhieuNhapNhaCungCapService phieuNhapNhaCungCapService) {
        this.phieuNhapNhaCungCapService = phieuNhapNhaCungCapService;
    }

    @GetMapping("/get-du-lieu")
    public List<PhieuNhapNhaCungCapEntity> findAll() {
        return phieuNhapNhaCungCapService.findAll();
    }
}
