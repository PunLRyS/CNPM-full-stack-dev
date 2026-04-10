package com.cnpm.store.daily.dto;

public class CreatePhieuXuatDaiLyRequest {

    private String maDaiLy;
    private String maPhieuXuat;

    public String getMaDaiLy() {
        return maDaiLy;
    }

    public void setMaDaiLy(String maDaiLy) {
        this.maDaiLy = maDaiLy;
    }

    public String getMaPhieuXuat() {
        return maPhieuXuat;
    }

    public void setMaPhieuXuat(String maPhieuXuat) {
        this.maPhieuXuat = maPhieuXuat;
    }
}
