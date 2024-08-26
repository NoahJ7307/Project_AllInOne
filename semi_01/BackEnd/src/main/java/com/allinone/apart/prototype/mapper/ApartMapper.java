package com.allinone.apart.prototype.mapper;

import com.allinone.apart.prototype.vo.ApartVO;
import org.apache.catalina.core.AprStatus;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface ApartMapper {
    public int insert(ApartVO vo);
    public List<ApartVO> list();
}
