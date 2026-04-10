package com.cnpm.store.hanghoa.dto;

import java.math.BigDecimal;

public class UpdateHangHoaRequest {

    private String ten;
    private String description;
    private Integer soLuong;
    private BigDecimal giaNhap;
    private String maDaiLy;

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public BigDecimal getGiaNhap() {
        return giaNhap;
    }

    public void setGiaNhap(BigDecimal giaNhap) {
        this.giaNhap = giaNhap;
    }

    public String getMaDaiLy() {
        return maDaiLy;
    }

    public void setMaDaiLy(String maDaiLy) {
        this.maDaiLy = maDaiLy;
    }
}
