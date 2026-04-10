package com.cnpm.store.hanghoa;

import com.cnpm.store.hanghoa.dto.CreateHangHoaRequest;
import com.cnpm.store.hanghoa.dto.UpdateHangHoaRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class HangHoaService {

    private final HangHoaRepository hangHoaRepository;

    public HangHoaService(HangHoaRepository hangHoaRepository) {
        this.hangHoaRepository = hangHoaRepository;
    }

    public HangHoaEntity createHangHoa(CreateHangHoaRequest request) {
        HangHoaEntity entity = new HangHoaEntity();
        entity.setMa(request.getMa());
        entity.setTen(request.getTen());
        entity.setDescription(request.getDescription());
        entity.setSoLuong(request.getSoLuong());
        entity.setGiaNhap(request.getGiaNhap());
        entity.setMaDaiLy(request.getMaDaiLy());
        return hangHoaRepository.save(entity);
    }

    public List<HangHoaEntity> findAll() {
        return hangHoaRepository.findAll();
    }

    public HangHoaEntity findById(UUID id) {
        return hangHoaRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "HangHoa not found"));
    }

    public HangHoaEntity updateByMa(String ma, UpdateHangHoaRequest request) {
        HangHoaEntity entity = findByMa(ma);

        if (request.getTen() != null) {
            entity.setTen(request.getTen());
        }
        if (request.getDescription() != null) {
            entity.setDescription(request.getDescription());
        }
        if (request.getSoLuong() != null) {
            entity.setSoLuong(request.getSoLuong());
        }
        if (request.getGiaNhap() != null) {
            entity.setGiaNhap(request.getGiaNhap());
        }
        if (request.getMaDaiLy() != null) {
            entity.setMaDaiLy(request.getMaDaiLy());
        }

        return hangHoaRepository.save(entity);
    }

    public void deleteById(UUID id) {
        HangHoaEntity entity = findById(id);
        hangHoaRepository.delete(entity);
    }

    public HangHoaEntity findByMa(String ma) {
        return hangHoaRepository.findByMa(ma)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Khong tim thay hang hoa voi ma " + ma));
    }

    public HangHoaEntity findByMaDaiLy(String maDaiLy) {
        return hangHoaRepository.findByMaDaiLy(maDaiLy)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Khong tim thay hang hoa voi ma dai ly " + maDaiLy));
    }
}
