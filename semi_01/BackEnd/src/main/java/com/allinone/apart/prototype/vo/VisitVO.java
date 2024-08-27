package com.allinone.apart.prototype.vo;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class VisitVO {
    private int id_visit;
    private String name_visit;
    private String phone_visit;
    private String carNumber_visit;
    private LocalDate date_visit;
    private int dong_visit;
    private int ho_visit;
}
