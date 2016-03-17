package salon.service;

import java.util.List;


import salon.domain.Message;

public interface MessageService {
	//본문
	public Message register(Message message);
	public List<Message> selectList(Message message);
	public void delete(Message message);
}
