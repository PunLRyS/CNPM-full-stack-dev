package com.cnpm.store.phieuxuat.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class CreatePhieuXuatRequest {

    @NotBlank
    private String ma;

    @Valid
    private List<CreatePhieuXuatHangHoaRequest> danhSachHangHoa;

    public String getMa() {
        return ma;
    }

    public void setMa(String ma) {
        this.ma = ma;
    }

    public List<CreatePhieuXuatHangHoaRequest> getDanhSachHangHoa() {
        return danhSachHangHoa;
    }

    public void setDanhSachHangHoa(List<CreatePhieuXuatHangHoaRequest> danhSachHangHoa) {
        this.danhSachHangHoa = danhSachHangHoa;
    }
}
