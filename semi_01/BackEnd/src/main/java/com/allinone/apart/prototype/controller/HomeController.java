package com.allinone.apart.prototype.controller;


import com.allinone.apart.prototype.mapper.ApartMapper;
import com.allinone.apart.prototype.vo.ApartVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apart")
public class HomeController {

    @Autowired
    private ApartMapper mapper;

    @GetMapping
    public List<ApartVO>     list(){
        System.out.println("this is love");
        return  mapper.list();
    }

    @PostMapping
    public String insertPost(@RequestBody ApartVO vo){
        System.out.println("post constoller insert " +vo);
        int cnt = mapper.insert(vo);
        return cnt !=0 ? "성공":"실패";
    }

    @PutMapping("/{mid}")
    public String updatePost(@RequestBody ApartVO vo, @PathVariable String mid) {
        System.out.println("post controller update mid=" + mid + " ApartVO=" + vo);
        vo.setMid(mid);
        int cnt = mapper.update(vo);
        return cnt != 0 ? "성공" : "실패";
    }

    @DeleteMapping("/{mid}")
    public String deletePost(@PathVariable String mid) {
        System.out.println("post controller delete mid="+ mid);
        int cnt = mapper.delete(mid);
        return cnt != 0 ? "삭제 성공" : "삭제 실패: 사용자 없음";
    }
}
