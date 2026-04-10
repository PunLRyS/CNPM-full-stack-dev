package com.cnpm.store.phieunhap;

import com.cnpm.store.phieunhap.dto.CreatePhieuNhapRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/phieu-nhap")
public class PhieuNhapController {

    private final PhieuNhapService phieuNhapService;

    public PhieuNhapController(PhieuNhapService phieuNhapService) {
        this.phieuNhapService = phieuNhapService;
    }

    @PostMapping("/search")
    public PhieuNhapEntity searchphieuNhap(@RequestParam("id") UUID id) {
        return phieuNhapService.findOne(id);
    }

    @GetMapping("/find")
    public List<PhieuNhapEntity> timKiemTT() {
        return phieuNhapService.findAll();
    }

    @PostMapping("/create")
    public PhieuNhapEntity createphieuNhap(@Valid @RequestBody CreatePhieuNhapRequest phieuNhap) {
        return phieuNhapService.createPhieuNhap(phieuNhap);
    }

    @DeleteMapping("/{id}")
    public void remove(@PathVariable UUID id) {
        phieuNhapService.deletePhieuXuat(id);
    }
}
