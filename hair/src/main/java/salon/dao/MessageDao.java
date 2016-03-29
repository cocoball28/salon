package salon.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import salon.domain.Member;
import salon.domain.Message;

@Repository
public interface MessageDao {
	//본문
	public List<Member> selectMemberListByNick(Member member);
	public List<Message> selectList(Message message);
	public List<Message> selectMoreList(Message message);
}


