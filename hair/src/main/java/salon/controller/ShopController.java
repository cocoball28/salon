package salon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import salon.dao.ShopDao;
import salon.domain.Shop;
import salon.service.ShopService;

@Controller
@RequestMapping("/shop/*")
public class ShopController {

	@Autowired ShopDao shopDao;
	@Autowired ShopService shopService;
	
	@RequestMapping("list")
	public List<Shop> list() {
		return shopService.selectList();
	}
}
