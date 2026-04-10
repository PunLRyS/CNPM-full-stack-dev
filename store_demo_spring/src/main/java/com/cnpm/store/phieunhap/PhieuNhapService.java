package com.cnpm.store.phieunhap;

import com.cnpm.store.phieunhap.dto.CreatePhieuNhapHangHoaRequest;
import com.cnpm.store.phieunhap.dto.CreatePhieuNhapRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class PhieuNhapService {

    private final PhieuNhapRepository phieuNhapRepository;
    private final PhieuNhapHangHoaRepository phieuNhapHangHoaRepository;

    public PhieuNhapService(PhieuNhapRepository phieuNhapRepository,
                            PhieuNhapHangHoaRepository phieuNhapHangHoaRepository) {
        this.phieuNhapRepository = phieuNhapRepository;
        this.phieuNhapHangHoaRepository = phieuNhapHangHoaRepository;
    }

    @Transactional
    public PhieuNhapEntity createPhieuNhap(CreatePhieuNhapRequest request) {
        PhieuNhapEntity phieuNhap = new PhieuNhapEntity();
        phieuNhap.setMa(request.getMa());
        phieuNhap.setTotalAmount(request.getTotalAmount());
        phieuNhap = phieuNhapRepository.save(phieuNhap);

        if (request.getDanhSachHangHoa() != null) {
            for (CreatePhieuNhapHangHoaRequest item : request.getDanhSachHangHoa()) {
                if (item.getMaHangHoa() == null || item.getMaHangHoa().isBlank()) {
                    continue;
                }
                PhieuNhapHangHoaEntity chiTiet = new PhieuNhapHangHoaEntity();
                chiTiet.setMaPhieuNhap(phieuNhap.getMa());
                chiTiet.setMaHangHoa(item.getMaHangHoa());
                phieuNhapHangHoaRepository.save(chiTiet);
            }
        }

        return phieuNhap;
    }

    @Transactional(readOnly = true)
    public List<PhieuNhapEntity> findAll() {
        return phieuNhapRepository.findAll();
    }

    @Transactional(readOnly = true)
    public PhieuNhapEntity findOne(UUID id) {
        return phieuNhapRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "PhieuNhap not found"));
    }

    @Transactional
    public void deletePhieuXuat(UUID id) {
        PhieuNhapEntity phieuNhap = findOne(id);
        phieuNhapRepository.delete(phieuNhap);
    }
}
