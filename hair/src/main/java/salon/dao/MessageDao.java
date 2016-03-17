package salon.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.domain.Message;

@Repository
public interface MessageDao {
	//본문
	public int insert(Message message);
	public List<Message> selectList(Message message);
	public Message selectByNo(Message message);
	public void delete(Message message);
}
