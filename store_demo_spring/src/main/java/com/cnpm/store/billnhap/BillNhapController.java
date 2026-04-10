package com.cnpm.store.billnhap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/bill-nhap")
public class BillNhapController {

    private final BillNhapService billNhapService;

    public BillNhapController(BillNhapService billNhapService) {
        this.billNhapService = billNhapService;
    }

    @PostMapping("/create/{maPhieuNhap}")
    public BillNhapEntity createBillNhap(@PathVariable String maPhieuNhap,
                                         @RequestParam("maHangHoa") String maHangHoa,
                                         @RequestParam("quantity") Integer quantity) {
        return billNhapService.createBillNhap(maPhieuNhap, maHangHoa, quantity);
    }

    @GetMapping({"/{maPhieuNhap}/total/{ignored}", "/{maPhieuNhap}/total"})
    public BigDecimal getTotalAmount(@PathVariable String maPhieuNhap) {
        return billNhapService.calculateTotalAmount(maPhieuNhap);
    }
}
