package salon.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.domain.Member;
import salon.domain.Shop;
import salon.domain.ShopImage;

public interface ShopService {
	public Map<String, Object> selectList(Shop shop);
	public List<ShopImage> register(Shop shop, MultipartHttpServletRequest mRequest) throws Exception;
}
