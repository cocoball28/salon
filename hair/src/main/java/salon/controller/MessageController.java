package salon.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import salon.dao.MessageDao;
import salon.domain.Member;
import salon.domain.Message;
import salon.service.MessageService;

@Controller
@RequestMapping("/message/*")
public class MessageController {
	
	@Autowired 
	MessageDao messageDao;
	
	@Autowired 
	MessageService messageService;
	
	//메시지 출력
	@RequestMapping(value="list", method=RequestMethod.POST)
	@ResponseBody
	public List<Message> list(Message message){
		List<Message> list = messageService.selectList(message);
		return list;
	}
	
	//메시지 출력
	@RequestMapping(value="moreList", method=RequestMethod.POST)
	@ResponseBody
	public List<Message> moreList(Message message){
		System.out.println(message.getMessageNo());
		List<Message> list = messageService.selectMoreList(message);
		return list;
	}
	
	//로그인 유저 정보
	@RequestMapping(value="loginUserInfo", method=RequestMethod.POST)
	@ResponseBody
	public Member loginUserInfo(HttpServletRequest request){
		Member loginUser = (Member)request.getSession().getAttribute("loginUser");
		return loginUser;
	}
	
	//유저 검색
	@RequestMapping(value="memberList", method=RequestMethod.POST)
	@ResponseBody
	public List<Member> memberList(Member member){
		return messageDao.selectMemberListByNick(member); 
	}
}
