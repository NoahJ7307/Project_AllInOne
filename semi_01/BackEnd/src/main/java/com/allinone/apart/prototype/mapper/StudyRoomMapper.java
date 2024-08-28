//package com.allinone.apart.prototype.mapper;
//
//import com.allinone.apart.prototype.vo.ApartVO;
//import com.allinone.apart.prototype.vo.StudyRoomVO;
//import org.apache.ibatis.annotations.Mapper;
//
//import java.util.List;
//
//@Mapper
//public interface StudyRoomMapper {
//    public int roominsert(StudyRoomVO vo);
//    public List<StudyRoomVO> roomlist();
//    int deleteReservation(int id);
//
//}
package com.allinone.apart.prototype.mapper;

import com.allinone.apart.prototype.vo.StudyRoomVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StudyRoomMapper { //재윤님 추가 함 0827
    public int roominsert(StudyRoomVO vo);
    public List<StudyRoomVO> roomlist();
    int deleteReservation(int id);
    int updateReservation(StudyRoomVO vo);
    StudyRoomVO reservationByRno(int rno);

}

