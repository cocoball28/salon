package salon.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import salon.member.dao.MemberDao;
import salon.member.domain.Member;
import salon.member.service.MemberService;

@Controller
@RequestMapping("/member/*")
public class MemberController {
	@Autowired MemberDao memberDao;
	@Autowired MemberService memberService;
	
	
	@RequestMapping(value="regist", method=RequestMethod.POST)
	@ResponseBody
	public void regist(Member member) {
		System.out.println("들어왔다");
	}
}
