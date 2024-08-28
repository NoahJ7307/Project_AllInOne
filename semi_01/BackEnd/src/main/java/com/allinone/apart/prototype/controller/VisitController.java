package com.allinone.apart.prototype.controller;

import com.allinone.apart.prototype.mapper.VisitMapper;
import com.allinone.apart.prototype.vo.StudyRoomVO;
import com.allinone.apart.prototype.vo.VisitVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visit")

public class VisitController {

    @Autowired
    private VisitMapper visitMapper;

    @GetMapping
    public List<VisitVO> visitlist(){
        System.out.println("get data");
        return  visitMapper.list();
    }

    @PostMapping
    public String insertPost(@RequestBody VisitVO vo){
        System.out.println("post controller insert " +vo);
        int cnt = visitMapper.insert(vo);
        return cnt !=0 ? "성공":"실패";
    }

    @DeleteMapping("/{selected}")
    public List<VisitVO> delete(@PathVariable int selected) {
        System.out.println("delete controller delete" + selected);
        visitMapper.delete(selected);
        return visitMapper.list();
    }

    @PutMapping
    public List<VisitVO> update(@RequestBody VisitVO vo){
        System.out.println("put controller update" + vo);
        visitMapper.update(vo);
        return visitMapper.list();
    }

    @GetMapping("/search")
    public List<VisitVO> searchList(@RequestParam String category, @RequestParam String search){
        System.out.println("search keyword : "+search+" / "+category);
        return  visitMapper.search(search, category);
    }
}
