package com.cnpm.store.billxuat;

import com.cnpm.store.hanghoa.HangHoaEntity;
import com.cnpm.store.hanghoa.HangHoaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@Service
public class BillXuatService {

    private final BillXuatRepository billXuatRepository;
    private final HangHoaRepository hangHoaRepository;

    public BillXuatService(BillXuatRepository billXuatRepository, HangHoaRepository hangHoaRepository) {
        this.billXuatRepository = billXuatRepository;
        this.hangHoaRepository = hangHoaRepository;
    }

    public BillXuatEntity createBillXuat(String maPhieuXuat, String maHangHoa, Integer quantity) {
        HangHoaEntity hangHoa = hangHoaRepository.findByMa(maHangHoa)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hang hoa khong ton tai"));

        if (hangHoa.getSoLuong() < quantity) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "So luong hang hoa khong du");
        }

        BigDecimal unitPrice = hangHoa.getGiaNhap().multiply(BigDecimal.valueOf(1.08));
        BigDecimal totalPrice = unitPrice.multiply(BigDecimal.valueOf(quantity));

        BillXuatEntity bill = new BillXuatEntity();
        bill.setMaPhieuXuat(maPhieuXuat);
        bill.setMaHangHoa(maHangHoa);
        bill.setProductName(hangHoa.getTen());
        bill.setQuantity(quantity);
        bill.setUnitPrice(unitPrice);
        bill.setTotalPrice(totalPrice);

        return billXuatRepository.save(bill);
    }

    public BigDecimal calculateTotalAmount(String maPhieuXuat) {
        List<BillXuatEntity> bills = billXuatRepository.findByMaPhieuXuat(maPhieuXuat);
        return bills.stream()
            .map(BillXuatEntity::getTotalPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
