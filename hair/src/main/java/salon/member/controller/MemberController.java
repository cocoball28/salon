package salon.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import salon.member.dao.MemberDao;
import salon.member.domain.Member;
import salon.member.service.MemberService;

@Controller
@RequestMapping("/member/*")
public class MemberController {
	@Autowired MemberDao memberDao;
	@Autowired MemberService memberService;
	
	@RequestMapping("regist")
	public void regist(Member member) {
		
	}
}
