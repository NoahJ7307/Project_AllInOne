package com.allinone.apart.prototype.vo;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ApartVO {

    private int id;
    private String mid;
    private String password;
    private String name;
    private String carnumber;
    private String residentNumber;
    private int dong;
    private int ho;
    private String phonenumber;
}
