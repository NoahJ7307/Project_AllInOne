package com.allinone.apart.prototype.controller;

import com.allinone.apart.prototype.service.LoginService;
import com.allinone.apart.prototype.vo.ApartVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody ApartVO vo) {
        boolean isAuthenticated = loginService.comparePw(vo.getMid(), vo.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok().body("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
