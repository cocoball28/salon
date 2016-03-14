package salon.service;

import java.util.List;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.domain.Shop;

public interface ShopService {
	List<Shop> selectList();
	public List<Shop> register(Shop shop, MultipartHttpServletRequest mRequest) throws Exception;
}
