package com.cnpm.store.daily.dto;

import java.util.List;

public class UpdateDaiLyRequest {

    private String ma;
    private String ten;
    private String diaChi;
    private String phone;
    private List<CreatePhieuXuatDaiLyRequest> danhSachPhieuXuat;

    public String getMa() {
        return ma;
    }

    public void setMa(String ma) {
        this.ma = ma;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<CreatePhieuXuatDaiLyRequest> getDanhSachPhieuXuat() {
        return danhSachPhieuXuat;
    }

    public void setDanhSachPhieuXuat(List<CreatePhieuXuatDaiLyRequest> danhSachPhieuXuat) {
        this.danhSachPhieuXuat = danhSachPhieuXuat;
    }
}
