package com.cnpm.store.phieuxuat.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public class CreatePhieuXuatRequest {

    @NotBlank
    private String ma;

    @NotNull
    private BigDecimal totalAmount;

    @Valid
    private List<CreatePhieuXuatHangHoaRequest> danhSachHangHoa;

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

    public List<CreatePhieuXuatHangHoaRequest> getDanhSachHangHoa() {
        return danhSachHangHoa;
    }

    public void setDanhSachHangHoa(List<CreatePhieuXuatHangHoaRequest> danhSachHangHoa) {
        this.danhSachHangHoa = danhSachHangHoa;
    }
}
