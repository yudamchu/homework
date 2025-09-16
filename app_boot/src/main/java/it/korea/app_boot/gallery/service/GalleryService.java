package it.korea.app_boot.gallery.service;

import java.io.File;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.korea.app_boot.common.dto.PageVO;
import it.korea.app_boot.common.files.FileUtils;
import it.korea.app_boot.gallery.dto.GalleryDTO;
import it.korea.app_boot.gallery.dto.GalleryRequest;
import it.korea.app_boot.gallery.entity.GalleryEntity;
import it.korea.app_boot.gallery.repository.GalleryRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GalleryService {

    @Value("${server.file.gallery.path}")
    private String filePath;

    private final GalleryRepository galleryRepository;
    private final FileUtils fileUtils;
    private List<String> extentions =
            Arrays.asList("jpg", "jpeg", "gif", "png", "webp", "bmp");

    /* 리스트 */
    public Map<String, Object> getGalleryList(Pageable pageable) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        Page<GalleryEntity> list = galleryRepository.findAll(pageable);

        List<GalleryDTO> gallerys = list.getContent().stream()
                .map(GalleryDTO::of).toList();

        PageVO pageVO = new PageVO();
        pageVO.setData(list.getNumber(), (int) list.getTotalElements());

        resultMap.put("total", list.getTotalElements());
        resultMap.put("page", list.getNumber());
        resultMap.put("content", gallerys);
        resultMap.put("pageHTML", pageVO.pageHTML());

        return resultMap;
    }

    /* 단건 조회 */
    public Map<String, Object> getGallery(String nums) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        Optional<GalleryEntity> entityOpt = galleryRepository.findById(nums);

        if (entityOpt.isEmpty()) {
            throw new RuntimeException("해당 갤러리를 찾을 수 없습니다.");
        }

        GalleryDTO dto = GalleryDTO.of(entityOpt.get());
        resultMap.put("vo", dto);

        return resultMap;
    }

    /* 등록 */
    @Transactional
    public void addGallery(GalleryRequest request) throws Exception {
        String fileName = request.getFile().getOriginalFilename();
        String ext = fileName.substring(fileName.lastIndexOf(".") + 1);

        if (!extentions.contains(ext)) {
            throw new RuntimeException("파일형식이 맞지 않습니다. 이미지만 가능합니다.");
        }

        Map<String, Object> fileMap =
                fileUtils.uploadFiles(request.getFile(), filePath);

        if (fileMap == null) {
            throw new RuntimeException("파일 업로드가 실패했습니다.");
        }

        String thumbFilePath = filePath + "thumb" + File.separator;
        String storedFilePath = filePath + fileMap.get("storedFileName").toString();

        File file = new File(storedFilePath);

        if (!file.exists()) {
            throw new RuntimeException("업로드파일이 존재하지 않음 ");
        }

        String thumbName = fileUtils.thumbNailFile(150, 150, file, thumbFilePath);
        String newNums = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 10);

        GalleryEntity entity = new GalleryEntity();
        entity.setNums(newNums);
        entity.setTitle(request.getTitle());
        entity.setWriter("admin");
        entity.setFileName(fileMap.get("fileName").toString());
        entity.setStoredName(fileMap.get("storedFileName").toString());
        entity.setFilePath(filePath);
        entity.setFileThumbName(thumbName);

        galleryRepository.save(entity);
    }

    /*수정 */
    @Transactional
    public void updateGallery(GalleryRequest request) throws Exception {
        GalleryEntity entity = galleryRepository.findById(request.getNums())
                .orElseThrow(() -> new RuntimeException("갤러리를 찾을 수 없습니다."));

        entity.setTitle(request.getTitle());

        // 파일 변경 시
        if (request.getFile() != null && !request.getFile().isEmpty()) {
            Map<String, Object> fileMap =
                    fileUtils.uploadFiles(request.getFile(), filePath);

            String thumbFilePath = filePath + "thumb" + File.separator;
            String storedFilePath = filePath + fileMap.get("storedFileName").toString();

            File file = new File(storedFilePath);
            if (!file.exists()) {
                throw new RuntimeException("업로드파일이 존재하지 않음 ");
            }

            String thumbName = fileUtils.thumbNailFile(150, 150, file, thumbFilePath);

            entity.setFileName(fileMap.get("fileName").toString());
            entity.setStoredName(fileMap.get("storedFileName").toString());
            entity.setFilePath(filePath);
            entity.setFileThumbName(thumbName);
        }

        galleryRepository.save(entity);
    }

    /*삭제 */
    @Transactional
    public void deleteGallery(String nums) throws Exception {
        galleryRepository.deleteById(nums);
    }

    /*파일 삭제 */
    @Transactional
    public void deleteFile(String nums) throws Exception {
        GalleryEntity entity = galleryRepository.findById(nums)
                .orElseThrow(() -> new RuntimeException("갤러리를 찾을 수 없습니다."));

        entity.setFileName(null);
        entity.setStoredName(null);
        entity.setFileThumbName(null);

        galleryRepository.save(entity);
    }
}
