package com.cnpm.store.phieunhap.dto;

public class CreatePhieuNhapHangHoaRequest {

    private String maPhieuNhap;
    private String maHangHoa;

    public String getMaPhieuNhap() {
        return maPhieuNhap;
    }

    public void setMaPhieuNhap(String maPhieuNhap) {
        this.maPhieuNhap = maPhieuNhap;
    }

    public String getMaHangHoa() {
        return maHangHoa;
    }

    public void setMaHangHoa(String maHangHoa) {
        this.maHangHoa = maHangHoa;
    }
}
