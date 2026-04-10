package com.cnpm.store.nhacungcap;

import com.cnpm.store.nhacungcap.dto.CreateNhaCungCapRequest;
import com.cnpm.store.nhacungcap.dto.UpdateNhaCungCapRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class NhaCungCapService {

    private final NhaCungCapRepository nhaCungCapRepository;

    public NhaCungCapService(NhaCungCapRepository nhaCungCapRepository) {
        this.nhaCungCapRepository = nhaCungCapRepository;
    }

    public NhaCungCapEntity createNhaCungCap(CreateNhaCungCapRequest request) {
        NhaCungCapEntity entity = new NhaCungCapEntity();
        entity.setMa(request.getMa());
        entity.setTen(request.getTen());
        entity.setDiaChi(request.getDiaChi());
        entity.setSoDienThoai(request.getSoDienThoai());
        return nhaCungCapRepository.save(entity);
    }

    public NhaCungCapEntity updateNhaCungCap(UUID id, UpdateNhaCungCapRequest request) {
        NhaCungCapEntity entity = findById(id);
        if (request.getMa() != null) {
            entity.setMa(request.getMa());
        }
        if (request.getTen() != null) {
            entity.setTen(request.getTen());
        }
        if (request.getDiaChi() != null) {
            entity.setDiaChi(request.getDiaChi());
        }
        if (request.getSoDienThoai() != null) {
            entity.setSoDienThoai(request.getSoDienThoai());
        }

        return nhaCungCapRepository.save(entity);
    }

    public NhaCungCapEntity findById(UUID id) {
        return nhaCungCapRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "NhaCungCap not found"));
    }

    public List<NhaCungCapEntity> findAll() {
        return nhaCungCapRepository.findAll();
    }

    public NhaCungCapEntity findByMa(String ma) {
        return nhaCungCapRepository.findByMa(ma)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Khong tim thay nha cung cap voi ma " + ma));
    }

    public void deleteNhaCungCap(UUID id) {
        NhaCungCapEntity entity = findById(id);
        nhaCungCapRepository.delete(entity);
    }
}
