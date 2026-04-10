package com.cnpm.store.phieunhap.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public class CreatePhieuNhapRequest {

    @NotBlank
    private String ma;

    @NotNull
    private BigDecimal totalAmount;

    @Valid
    private List<CreatePhieuNhapHangHoaRequest> danhSachHangHoa;

    private Integer soLuong;

    public String getMa() {
        return ma;
    }

    public void setMa(String ma) {
        this.ma = ma;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<CreatePhieuNhapHangHoaRequest> getDanhSachHangHoa() {
        return danhSachHangHoa;
    }

    public void setDanhSachHangHoa(List<CreatePhieuNhapHangHoaRequest> danhSachHangHoa) {
        this.danhSachHangHoa = danhSachHangHoa;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }
}
