package salon.member.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.member.dao.MemberDao;
import salon.member.domain.Member;
import salon.member.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {
	
	@Autowired MemberDao memberDao;
	@Override
	public void register(Member member) {
		memberDao.insert(member);
	}

}
