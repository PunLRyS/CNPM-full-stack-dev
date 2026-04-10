package com.cnpm.store.hanghoa;

import com.cnpm.store.hanghoa.dto.CreateHangHoaRequest;
import com.cnpm.store.hanghoa.dto.UpdateHangHoaRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/hanghoa")
public class HangHoaController {

    private final HangHoaService hangHoaService;

    public HangHoaController(HangHoaService hangHoaService) {
        this.hangHoaService = hangHoaService;
    }

    @PostMapping("/create-hang-hoa")
    public HangHoaEntity create(@Valid @RequestBody CreateHangHoaRequest request) {
        return hangHoaService.createHangHoa(request);
    }

    @GetMapping("/get-du-lieu")
    public List<HangHoaEntity> findAll() {
        return hangHoaService.findAll();
    }

    @GetMapping("/{id}")
    public HangHoaEntity findOne(@PathVariable UUID id) {
        return hangHoaService.findById(id);
    }

    @PutMapping("/update/{ma}")
    public HangHoaEntity update(@PathVariable String ma, @RequestBody UpdateHangHoaRequest request) {
        return hangHoaService.updateByMa(ma, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        hangHoaService.deleteById(id);
    }

    @GetMapping("/find/{ma}")
    public HangHoaEntity findByMa(@PathVariable String ma) {
        return hangHoaService.findByMa(ma);
    }

    @GetMapping("/find-by-ma-dai-ly/{maDaiLy}")
    public HangHoaEntity findByMaDaiLy(@PathVariable String maDaiLy) {
        return hangHoaService.findByMaDaiLy(maDaiLy);
    }
}
