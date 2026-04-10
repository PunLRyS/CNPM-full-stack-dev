package com.cnpm.store.phieuxuat;

import com.cnpm.store.daily.DaiLyEntity;
import com.cnpm.store.daily.DaiLyRepository;
import com.cnpm.store.hanghoa.HangHoaEntity;
import com.cnpm.store.hanghoa.HangHoaRepository;
import com.cnpm.store.phieuxuat.dto.CreatePhieuXuatHangHoaRequest;
import com.cnpm.store.phieuxuat.dto.CreatePhieuXuatRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PhieuXuatService {

    private final PhieuXuatRepository phieuXuatRepository;
    private final HangHoaRepository hangHoaRepository;
    private final PhieuXuatHangHoaRepository phieuXuatHangHoaRepository;
    private final PhieuXuatDaiLyRepository phieuXuatDaiLyRepository;
    private final DaiLyRepository daiLyRepository;

    public PhieuXuatService(PhieuXuatRepository phieuXuatRepository,
                           HangHoaRepository hangHoaRepository,
                           PhieuXuatHangHoaRepository phieuXuatHangHoaRepository,
                           PhieuXuatDaiLyRepository phieuXuatDaiLyRepository,
                           DaiLyRepository daiLyRepository) {
        this.phieuXuatRepository = phieuXuatRepository;
        this.hangHoaRepository = hangHoaRepository;
        this.phieuXuatHangHoaRepository = phieuXuatHangHoaRepository;
        this.phieuXuatDaiLyRepository = phieuXuatDaiLyRepository;
        this.daiLyRepository = daiLyRepository;
    }

    @Transactional
    public String placeOrder(CreatePhieuXuatRequest request, String maDaiLy) {
        List<CreatePhieuXuatHangHoaRequest> danhSachHangHoa = request.getDanhSachHangHoa();
        if (danhSachHangHoa == null || danhSachHangHoa.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Danh sach hang hoa khong duoc de trong");
        }

        for (CreatePhieuXuatHangHoaRequest item : danhSachHangHoa) {
            HangHoaEntity hangHoa = hangHoaRepository.findByMa(item.getMaHangHoa())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Khong tim thay hang hoa voi ma: " + item.getMaHangHoa()));

            if (hangHoa.getSoLuong() < item.getSoLuong()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Khong du so luong de xuat voi ma: " + item.getMaHangHoa());
            }
        }

        PhieuXuatEntity phieuXuat = new PhieuXuatEntity();
        phieuXuat.setMa(request.getMa());
        phieuXuat.setTotalAmount(BigDecimal.ZERO);
        phieuXuat.setMaDaiLy(maDaiLy);
        phieuXuat = phieuXuatRepository.save(phieuXuat);

        BigDecimal totalAmount = BigDecimal.ZERO;
        for (CreatePhieuXuatHangHoaRequest item : danhSachHangHoa) {
            HangHoaEntity hangHoa = hangHoaRepository.findByMa(item.getMaHangHoa())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Khong tim thay hang hoa voi ma: " + item.getMaHangHoa()));

            hangHoa.setSoLuong(hangHoa.getSoLuong() - item.getSoLuong());
            hangHoaRepository.save(hangHoa);

            PhieuXuatHangHoaEntity chiTiet = new PhieuXuatHangHoaEntity();
            chiTiet.setMaPhieuXuat(phieuXuat.getMa());
            chiTiet.setMaHangHoa(item.getMaHangHoa());
            chiTiet.setSoLuong(item.getSoLuong());
            chiTiet.setGiaNhap(item.getGiaNhap());
            phieuXuatHangHoaRepository.save(chiTiet);

            BigDecimal amount = item.getGiaNhap().multiply(BigDecimal.valueOf(item.getSoLuong()));
            totalAmount = totalAmount.add(amount);
        }

        phieuXuat.setTotalAmount(totalAmount);
        phieuXuatRepository.save(phieuXuat);

        if (maDaiLy != null && !maDaiLy.isBlank()) {
            Optional<DaiLyEntity> daiLyOpt = daiLyRepository.findByMa(maDaiLy);
            if (daiLyOpt.isPresent()) {
                PhieuXuatDaiLyEntity phieuXuatDaiLy = new PhieuXuatDaiLyEntity();
                phieuXuatDaiLy.setMaDaiLy(maDaiLy);
                phieuXuatDaiLy.setMaPhieuXuat(phieuXuat.getMa());
                phieuXuatDaiLyRepository.save(phieuXuatDaiLy);
            }
        }

        return phieuXuat.getMa();
    }

    @Transactional(readOnly = true)
    public List<PhieuXuatEntity> findAll() {
        return phieuXuatRepository.findAll();
    }

    @Transactional
    public void deletePhieuXuat(UUID id) {
        PhieuXuatEntity phieuXuat = phieuXuatRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "PhieuXuat not found"));
        phieuXuatRepository.delete(phieuXuat);
    }

    @Transactional(readOnly = true)
    public PhieuXuatEntity findPhieuXuatByMa(String ma) {
        return phieuXuatRepository.findByMa(ma)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Khong tim thay phieu xuat voi ma " + ma));
    }
}
