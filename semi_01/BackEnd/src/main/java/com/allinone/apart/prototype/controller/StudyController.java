package com.allinone.apart.prototype.controller;


import com.allinone.apart.prototype.mapper.StudyRoomMapper;
import com.allinone.apart.prototype.vo.StudyRoomVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
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

    @GetMapping("/{rno}")
    public StudyRoomVO roomOne(@PathVariable("rno") int rno){
        System.out.println("one get : good"+rno);
        return  roomMapper.reservationByRno(rno);

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
    @PostMapping("/dateCheck/")
    public Boolean dateCheck(@RequestBody StudyRoomVO vo) {
        System.out.println("vo:"+vo);
        int hour = Integer.parseInt(vo.getTime().substring(0,2));
        int minute = Integer.parseInt(vo.getTime().substring(3,5));
        //현재시간
        LocalTime nowTime = LocalTime.now();
        String nowDateString = nowTime.toString(); //날짜를 문자열로 변환
        int nowHour = Integer.parseInt(nowDateString.substring(0,2));
        int nowMinute = Integer.parseInt(nowDateString.substring(3,5));
        System.out.println("선택한 시간 hour) " + hour + ",분 : " + minute+", 현재시간 : " + nowHour + ",분 : " +nowMinute);

        LocalDate nowDate = LocalDate.now();
        System.out.println(nowDate + "사랑" + vo.getDate());
        if(nowDate.equals(vo.getDate())) {
            System.out.println("사랑");
            if (hour < nowHour) return false;
            else if (hour == nowHour) {
                if (minute < nowMinute) return false;
                else return true;
            }

        }
        return true;


    }
    @PutMapping("/{rno}")
    public  List<StudyRoomVO> update(@RequestBody StudyRoomVO VO){
        System.out.println(VO);
        int update=roomMapper.updateReservation(VO);
        System.out.println("수정된 데이터 갯수 :" +update);
        return roomMapper.roomlist();
    }


}