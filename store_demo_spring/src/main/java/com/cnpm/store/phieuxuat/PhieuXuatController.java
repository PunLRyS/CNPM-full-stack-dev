package com.cnpm.store.phieuxuat;

import com.cnpm.store.phieuxuat.dto.CreatePhieuXuatRequest;
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
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/phieu-xuat")
public class PhieuXuatController {

    private final PhieuXuatService phieuXuatService;

    public PhieuXuatController(PhieuXuatService phieuXuatService) {
        this.phieuXuatService = phieuXuatService;
    }

    @PostMapping("/create")
    public Map<String, String> placeOrder(@Valid @RequestBody CreatePhieuXuatRequest request,
                                          @RequestParam(value = "maDaiLy", required = false) String maDaiLy) {
        String maPhieuXuat = phieuXuatService.placeOrder(request, maDaiLy);
        return Map.of("maPhieuXuat", maPhieuXuat);
    }

    @GetMapping("/get-du-lieu")
    public List<PhieuXuatEntity> findAll() {
        return phieuXuatService.findAll();
    }

    @DeleteMapping("/{id}")
    public void remove(@PathVariable UUID id) {
        phieuXuatService.deletePhieuXuat(id);
    }

    @GetMapping("/find/{ma}")
    public PhieuXuatEntity findPhieuXuatByMa(@PathVariable String ma) {
        return phieuXuatService.findPhieuXuatByMa(ma);
    }
}
