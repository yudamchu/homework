package it.korea.app_boot.gallery.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class GalleryRequest {

    private String nums;   // 수정/삭제 시 필요 (등록시에는 null)

    @NotBlank(message = "타이틀은 존재해야 합니다.")
    private String title;

    // 등록 시에는 필수, 수정 시에는 선택
    private MultipartFile file;

    private String contents; // 필요하면 본문 추가
}
