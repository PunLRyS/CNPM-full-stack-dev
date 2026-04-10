package com.cnpm.store.daily;

import com.cnpm.store.daily.dto.CreateDaiLyRequest;
import com.cnpm.store.daily.dto.CreatePhieuXuatDaiLyRequest;
import com.cnpm.store.daily.dto.UpdateDaiLyRequest;
import com.cnpm.store.phieuxuat.PhieuXuatDaiLyEntity;
import com.cnpm.store.phieuxuat.PhieuXuatDaiLyRepository;
import com.cnpm.store.phieuxuat.PhieuXuatRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class DaiLyService {

    private final DaiLyRepository daiLyRepository;
    private final PhieuXuatRepository phieuXuatRepository;
    private final PhieuXuatDaiLyRepository phieuXuatDaiLyRepository;

    public DaiLyService(DaiLyRepository daiLyRepository,
                        PhieuXuatRepository phieuXuatRepository,
                        PhieuXuatDaiLyRepository phieuXuatDaiLyRepository) {
        this.daiLyRepository = daiLyRepository;
        this.phieuXuatRepository = phieuXuatRepository;
        this.phieuXuatDaiLyRepository = phieuXuatDaiLyRepository;
    }

    @Transactional(readOnly = true)
    public List<DaiLyEntity> searchDaiLy(String ten) {
        String keyword = ten == null ? "" : ten.trim();
        return daiLyRepository.findByTenContainingIgnoreCase(keyword);
    }

    @Transactional(readOnly = true)
    public DaiLyEntity findById(UUID id) {
        return daiLyRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "DaiLy not found"));
    }

    @Transactional(readOnly = true)
    public DaiLyEntity findByMa(String ma) {
        return daiLyRepository.findByMa(ma)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Khong tim thay dai ly voi ma " + ma));
    }

    @Transactional(readOnly = true)
    public List<DaiLyEntity> findAll() {
        return daiLyRepository.findAll();
    }

    @Transactional
    public DaiLyEntity createDaiLy(CreateDaiLyRequest request) {
        DaiLyEntity entity = new DaiLyEntity();
        entity.setMa(request.getMa());
        entity.setTen(request.getTen());
        entity.setDiaChi(request.getDiaChi());
        entity.setPhone(request.getPhone());
        return daiLyRepository.save(entity);
    }

    @Transactional
    public DaiLyEntity updateDaiLy(UUID id, UpdateDaiLyRequest request) {
        DaiLyEntity entity = findById(id);
        if (request.getMa() != null) {
            entity.setMa(request.getMa());
        }
        if (request.getTen() != null) {
            entity.setTen(request.getTen());
        }
        if (request.getDiaChi() != null) {
            entity.setDiaChi(request.getDiaChi());
        }
        if (request.getPhone() != null) {
            entity.setPhone(request.getPhone());
        }

        return daiLyRepository.save(entity);
    }

    @Transactional
    public void deleteDaiLy(UUID id) {
        DaiLyEntity entity = findById(id);
        daiLyRepository.delete(entity);
    }

    @Transactional
    public DaiLyEntity addDaiLyToPhieuXuast(CreateDaiLyRequest request) {
        if (request.getDanhSachPhieuXuat() != null) {
            for (CreatePhieuXuatDaiLyRequest item : request.getDanhSachPhieuXuat()) {
                phieuXuatRepository.findByMa(item.getMaPhieuXuat())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Ma Phieu Xuat: " + item.getMaPhieuXuat() + " khong ton tai trong csdl."));
            }
        }

        DaiLyEntity daiLy = createDaiLy(request);

        if (request.getDanhSachPhieuXuat() != null) {
            for (CreatePhieuXuatDaiLyRequest item : request.getDanhSachPhieuXuat()) {
                PhieuXuatDaiLyEntity relation = new PhieuXuatDaiLyEntity();
                relation.setMaDaiLy(daiLy.getMa());
                relation.setMaPhieuXuat(item.getMaPhieuXuat());
                phieuXuatDaiLyRepository.save(relation);
            }
        }

        return daiLy;
    }
}
