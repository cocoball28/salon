package salon.service.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.dao.MemberDao;
import salon.domain.Member;
import salon.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	MemberDao memberDao;
	
	public Member retrieve(String email, String password) {
	    HashMap<String,Object> paramMap = new HashMap<>();
	    paramMap.put("email", email);
	    paramMap.put("password", password);
	    Member member = memberDao.selectOneByEmailPassword(paramMap);
	    		
	    return member;
	  }
}
