package salon.service.impl;

import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.dao.MessageDao;
import salon.domain.Message;
import salon.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	MessageDao messageDao;
	
	
	@Autowired
	ServletContext servletContext;


	@Override
	public Message register(Message message) {
		messageDao.insert(message);
		return messageDao.selectByNo(message);
	}


	@Override
	public List<Message> selectList(Message message) {
		return messageDao.selectList(message);
	}


	@Override
	public void delete(Message message) {
		messageDao.delete(message);
	}
	
		

}
