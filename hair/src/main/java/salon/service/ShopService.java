package salon.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.domain.Shop;

public interface ShopService {
	public Map<String, Object> selectList();
	public List<Shop> register(Shop shop, MultipartHttpServletRequest mRequest) throws Exception;
}
