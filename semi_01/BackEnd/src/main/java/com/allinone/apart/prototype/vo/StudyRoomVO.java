package com.allinone.apart.prototype.vo;

import lombok.*;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class StudyRoomVO {
    private int uid;
    private LocalDate date;
    private String time; // 여기 수정함 10:22
    private int seatNum;
    private int rno;

//    public StudyRoomVO(LocalDate date, LocalTime time, int seatNum) { //여기도 주석처리함 10:22
//        this.date = date;
//        this.time = time;
//        this.seatNum = seatNum;
//    }
}
