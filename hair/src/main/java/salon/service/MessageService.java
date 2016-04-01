package salon.service;

import java.util.List;

import salon.domain.Member;
import salon.domain.Message;
import salon.domain.Shop;

public interface MessageService {
	//본문
	public List<Message> selectList(Message message);
	public List<Message> selectMoreList(Message message);
	public List<Shop> selectFavShopList(Member member); 
}
