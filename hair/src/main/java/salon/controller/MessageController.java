package salon.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
	
	@RequestMapping(value="list", method=RequestMethod.POST)
	@ResponseBody
	public List<Message> list(HttpServletRequest request, HttpServletResponse response, Message message){
		Member member = (Member)request.getSession().getAttribute("loginUser");
		String sender = member.getNick();
		message.setSender(sender);
		List<Message> list = messageService.selectList(message);
		return list;
	}
	
	@RequestMapping(value="delete", method=RequestMethod.POST)
	@ResponseBody
	public void delete(Message message){
		messageService.delete(message);
	}
	
	@RequestMapping(value="regist", method=RequestMethod.POST)
	@ResponseBody
	public Message regist(HttpServletRequest request, HttpServletResponse response, Message message) throws Exception{
		Member member = (Member)request.getSession().getAttribute("loginUser");
		String sender = member.getNick();
		message.setSender(sender);
		return messageService.register(message);
	}
}
