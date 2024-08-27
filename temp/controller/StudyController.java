package com.allinone.apart.prototype.controller;

import com.allinone.apart.prototype.mapper.StudyRoomMapper;
import com.allinone.apart.prototype.vo.StudyRoomVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservation_studyRoom")

public class StudyController {

    @Autowired
    private StudyRoomMapper roomMapper;

    @GetMapping
    public List<StudyRoomVO> roomlist(){
        System.out.println("good");
        return  roomMapper.roomlist();

    }

    @PostMapping
    public String insertPost(@RequestBody StudyRoomVO vo){
        System.out.println("post constoller insert " +vo);
        int cnt = roomMapper.roominsert(vo);
        return cnt !=0 ? "성공":"실패";
    }
    @DeleteMapping("/{rno}")
    public List<StudyRoomVO> ll(@PathVariable int rno) {
        System.out.println(rno);
        int cnt = roomMapper.deleteReservation(rno);

        return roomMapper.roomlist();
    }



}
