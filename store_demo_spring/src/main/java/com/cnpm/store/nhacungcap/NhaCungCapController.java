package com.cnpm.store.nhacungcap;

import com.cnpm.store.nhacungcap.dto.CreateNhaCungCapRequest;
import com.cnpm.store.nhacungcap.dto.UpdateNhaCungCapRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/nha-cung-cap")
public class NhaCungCapController {

    private final NhaCungCapService nhaCungCapService;

    public NhaCungCapController(NhaCungCapService nhaCungCapService) {
        this.nhaCungCapService = nhaCungCapService;
    }

    @PostMapping("/create")
    public NhaCungCapEntity create(@Valid @RequestBody CreateNhaCungCapRequest request) {
        return nhaCungCapService.createNhaCungCap(request);
    }

    @PutMapping("/{id}")
    public NhaCungCapEntity update(@PathVariable UUID id, @RequestBody UpdateNhaCungCapRequest request) {
        return nhaCungCapService.updateNhaCungCap(id, request);
    }

    @GetMapping("/{id}")
    public NhaCungCapEntity findById(@PathVariable UUID id) {
        return nhaCungCapService.findById(id);
    }

    @GetMapping
    public List<NhaCungCapEntity> findAll() {
        return nhaCungCapService.findAll();
    }

    @GetMapping("/search/by-ma")
    public NhaCungCapEntity findByMa(@RequestParam("ma") String ma) {
        return nhaCungCapService.findByMa(ma);
    }

    @DeleteMapping("/{id}")
    public void deleteNhaCungCap(@PathVariable UUID id) {
        nhaCungCapService.deleteNhaCungCap(id);
    }
}
