package com.allinone.apart.prototype;

import com.allinone.apart.prototype.mapper.ApartMapper;
import com.allinone.apart.prototype.vo.ApartVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PrototypeApplicationTests {

	@Autowired
	private ApartMapper mapper;

	@Test
	void contextLoads() {
	}

	@Test
	public void insert(){
		mapper.insert(new ApartVO(0,"a","b","c","d",1970,5,7,"5"));
	}

}
