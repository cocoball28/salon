package salon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.dao.ShopDao;
import salon.domain.Shop;
import salon.service.ShopService;

@Service
public class ShopServiceImpl implements ShopService {

	@Autowired ShopDao shopDao;

	@Override
	public List<Shop> selectList() {
		return shopDao.selectShopList();
	}
	
}
