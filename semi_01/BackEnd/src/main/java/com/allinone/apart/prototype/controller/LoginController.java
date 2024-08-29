package com.allinone.apart.prototype.controller;

import com.allinone.apart.prototype.mapper.ApartMapper;
import com.allinone.apart.prototype.vo.ApartVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private ApartMapper mapper;

    @PostMapping
    public String login(@RequestBody ApartVO vo) {
        String correctPw = mapper.checkMid(vo.getMid());

        if (correctPw == null) {
            System.out.println("존재하지 않는 ID 입니다...");
            return "ID not found";
        }

        if (correctPw.equals(vo.getPassword())) {
            System.out.println("로그인 성공 !!");

            return "Login successful";
        } else {
            System.out.println("비밀번호가 올바르지 않습니다...");
            return "Invalid credentials";
        }
    }
}