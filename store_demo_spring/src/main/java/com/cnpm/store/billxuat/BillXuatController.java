package com.cnpm.store.billxuat;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/bill-xuat")
public class BillXuatController {

    private final BillXuatService billXuatService;

    public BillXuatController(BillXuatService billXuatService) {
        this.billXuatService = billXuatService;
    }

    @PostMapping("/create/{maPhieuXuat}")
    public BillXuatEntity createBillXuat(@PathVariable String maPhieuXuat,
                                         @RequestParam("maHangHoa") String maHangHoa,
                                         @RequestParam("quantity") Integer quantity) {
        return billXuatService.createBillXuat(maPhieuXuat, maHangHoa, quantity);
    }

    @GetMapping({"/{maPhieuXuat}/total/{ignored}", "/{maPhieuXuat}/total"})
    public BigDecimal getTotalAmount(@PathVariable String maPhieuXuat) {
        return billXuatService.calculateTotalAmount(maPhieuXuat);
    }
}
