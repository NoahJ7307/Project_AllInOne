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
   @PutMapping
    public String updatePost(@RequestBody ApartVO vo){
        System.out.println("post constoller update " +vo);
        int cnt = mapper.update(vo);
        return cnt !=0 ? "성공":"실패";
    }

}
