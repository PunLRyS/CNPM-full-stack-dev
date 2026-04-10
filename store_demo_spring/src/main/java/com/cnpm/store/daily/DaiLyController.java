package com.cnpm.store.daily;

import com.cnpm.store.daily.dto.CreateDaiLyRequest;
import com.cnpm.store.daily.dto.UpdateDaiLyRequest;
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
@RequestMapping("/daily")
public class DaiLyController {

    private final DaiLyService daiLyService;

    public DaiLyController(DaiLyService daiLyService) {
        this.daiLyService = daiLyService;
    }

    @GetMapping("/search")
    public List<DaiLyEntity> searchDaiLy(@RequestParam("ten") String ten) {
        return daiLyService.searchDaiLy(ten);
    }

    @GetMapping("/get-by-id/{id}")
    public DaiLyEntity findDaiLyById(@PathVariable UUID id) {
        return daiLyService.findById(id);
    }

    @GetMapping
    public List<DaiLyEntity> findAllDaiLy() {
        return daiLyService.findAll();
    }

    @PostMapping
    public DaiLyEntity createDaiLy(@Valid @RequestBody CreateDaiLyRequest request) {
        return daiLyService.createDaiLy(request);
    }

    @PutMapping("/edit/{id}")
    public DaiLyEntity updateDaiLy(@PathVariable UUID id, @RequestBody UpdateDaiLyRequest request) {
        return daiLyService.updateDaiLy(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteDaiLy(@PathVariable UUID id) {
        daiLyService.deleteDaiLy(id);
    }

    @PostMapping("/add-dai-ly/-phieu-xuat")
    public DaiLyEntity addDaiLyToPhieuXuast(@RequestBody CreateDaiLyRequest request) {
        return daiLyService.addDaiLyToPhieuXuast(request);
    }

    @GetMapping("/get-by-ma/{ma}")
    public DaiLyEntity findDaiLyByMa(@PathVariable String ma) {
        return daiLyService.findByMa(ma);
    }
}
