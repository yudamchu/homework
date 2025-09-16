package it.korea.app_boot.gallery.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

import it.korea.app_boot.gallery.service.GalleryService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryService galleryService;

    // 리스트 화면
    @GetMapping("/gallery")
    public ModelAndView getListView() {
        ModelAndView view = new ModelAndView();
        view.setViewName("views/gal/galleryList");
        return view;
    }

    // 상세 (모달에서 불러오기)
    @GetMapping("/gallery/{nums}")
    public ModelAndView detailView(@PathVariable("nums") String nums) {
        ModelAndView view = new ModelAndView();
        try {
            Map<String, Object> resultMap = galleryService.getGallery(nums);
            view.addObject("vo", resultMap.get("vo"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        view.setViewName("views/gal/galleryDetail");
        return view;
    }

    // 수정 (모달에서 불러오기)
    @GetMapping("/gallery/update/{nums}")
    public ModelAndView updateForm(@PathVariable("nums") String nums) {
        ModelAndView view = new ModelAndView();
        try {
            Map<String, Object> resultMap = galleryService.getGallery(nums);
            view.addObject("vo", resultMap.get("vo"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        view.setViewName("views/gal/galleryUpdateForm");
        return view;
    }
}
