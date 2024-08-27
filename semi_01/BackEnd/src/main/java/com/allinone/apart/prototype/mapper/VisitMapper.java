package com.allinone.apart.prototype.mapper;

import com.allinone.apart.prototype.vo.ApartVO;
import com.allinone.apart.prototype.vo.VisitVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper

public interface VisitMapper {
    public int insert(VisitVO vo);
    public List<VisitVO> list();
    public int delete(int vo);
}
