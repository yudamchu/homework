package it.korea.app_boot.gallery.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.korea.app_boot.gallery.dto.GalleryRequest;
import it.korea.app_boot.gallery.service.GalleryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class GalleryAPIController {

    private final GalleryService galleryService;

    // 리스트
    @GetMapping("/gal")
    public ResponseEntity<Map<String, Object>> getGalleryList(
            @PageableDefault(page = 0, size = 10, sort = "createDate",
                    direction = Sort.Direction.DESC) Pageable pageable) throws Exception {

        Map<String, Object> resultMap = galleryService.getGalleryList(pageable);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    // 단건 조회
    @GetMapping("/gal/{nums}")
    public ResponseEntity<Map<String, Object>> getGallery(@PathVariable("nums") String nums) throws Exception {
        Map<String, Object> resultMap = galleryService.getGallery(nums);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    // 등록
    @PostMapping("/gal")
    public ResponseEntity<Map<String, Object>> writeGallery(@Valid @ModelAttribute GalleryRequest request) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        galleryService.addGallery(request);
        resultMap.put("resultCode", 200);
        resultMap.put("resultMessage", "OK");
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    // 수정
    @PutMapping("/gal")
    public ResponseEntity<Map<String, Object>> updateGallery(@Valid @ModelAttribute GalleryRequest request) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        galleryService.updateGallery(request);
        resultMap.put("resultCode", 200);
        resultMap.put("resultMessage", "OK");
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    // 삭제
    @DeleteMapping("/gal/{nums}")
    public ResponseEntity<Map<String, Object>> deleteGallery(@PathVariable("nums") String nums) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        galleryService.deleteGallery(nums);
        resultMap.put("resultCode", 200);
        resultMap.put("resultMessage", "OK");
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    // 파일 삭제
    @DeleteMapping("/gal/file/{nums}")
    public ResponseEntity<Map<String, Object>> deleteFile(@PathVariable("nums") String nums) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        galleryService.deleteFile(nums);
        resultMap.put("resultCode", 200);
        resultMap.put("resultMessage", "OK");
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
