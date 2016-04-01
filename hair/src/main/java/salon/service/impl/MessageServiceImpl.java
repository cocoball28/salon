package salon.service.impl;

import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.dao.MessageDao;
import salon.domain.Member;
import salon.domain.Message;
import salon.domain.Shop;
import salon.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	MessageDao messageDao;
	
	
	@Autowired
	ServletContext servletContext;


	@Override
	public List<Message> selectList(Message message) {
		return messageDao.selectList(message);
	}
	
	@Override
	public List<Message> selectMoreList(Message message) {
		return messageDao.selectMoreList(message);
	}

	@Override
	public List<Shop> selectFavShopList(Member member) {
		return messageDao.selectFavShopList();
	}


}
