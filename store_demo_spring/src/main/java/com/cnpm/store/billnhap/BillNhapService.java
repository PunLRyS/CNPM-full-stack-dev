package com.cnpm.store.billnhap;

import com.cnpm.store.hanghoa.HangHoaEntity;
import com.cnpm.store.hanghoa.HangHoaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@Service
public class BillNhapService {

    private final BillNhapRepository billNhapRepository;
    private final HangHoaRepository hangHoaRepository;

    public BillNhapService(BillNhapRepository billNhapRepository, HangHoaRepository hangHoaRepository) {
        this.billNhapRepository = billNhapRepository;
        this.hangHoaRepository = hangHoaRepository;
    }

    public BillNhapEntity createBillNhap(String maPhieuNhap, String maHangHoa, Integer quantity) {
        HangHoaEntity hangHoa = hangHoaRepository.findByMa(maHangHoa)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hang hoa khong ton tai"));

        BigDecimal unitPrice = hangHoa.getGiaNhap();
        BigDecimal totalPrice = unitPrice.multiply(BigDecimal.valueOf(quantity));

        BillNhapEntity bill = new BillNhapEntity();
        bill.setMaPhieuNhap(maPhieuNhap);
        bill.setMaHangHoa(maHangHoa);
        bill.setProductName(hangHoa.getTen());
        bill.setQuantity(quantity);
        bill.setUnitPrice(unitPrice);
        bill.setTotalPrice(totalPrice);

        return billNhapRepository.save(bill);
    }

    public BigDecimal calculateTotalAmount(String maPhieuNhap) {
        List<BillNhapEntity> bills = billNhapRepository.findByMaPhieuNhap(maPhieuNhap);
        return bills.stream()
            .map(BillNhapEntity::getTotalPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
