package com.allinone.apart.prototype.service;

import com.allinone.apart.prototype.mapper.ApartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private ApartMapper mapper;

    public boolean comparePw(String userId, String password) {
        String correctPw = mapper.checkMid(userId);
        return correctPw != null && correctPw.equals(password);
    }
}
