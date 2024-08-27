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
    private LocalTime time;
    private int seatNum;
    private int rno;

    public StudyRoomVO(LocalDate date, LocalTime time, int seatNum) {
        this.date = date;
        this.time = time;
        this.seatNum = seatNum;
    }
}
