package salon.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.dao.ShopDao;
import salon.domain.Shop;
import salon.domain.ShopImage;
import salon.service.ShopService;

@Controller
@RequestMapping("/shop/*")
public class ShopController {

	@Autowired ShopDao shopDao;
	@Autowired ShopService shopService;
	
	@RequestMapping("list")
	public Map<String, Object> list() {
		return shopService.selectList();
	}
	
	@RequestMapping(value="regist", method=RequestMethod.POST)
	@ResponseBody
	public List<ShopImage> regist(Shop shop, MultipartHttpServletRequest mRequest) throws Exception {
		System.out.println("컨트롤러");
		System.out.println(mRequest);
		
		shopService.register(shop, mRequest);
		List<ShopImage> list = (List<ShopImage>) shopService.selectList().get("image");
		
		return list;
		
		
	/*	return shopService.selectList();*/
		//return shopService.register(mRequest);
	}
}
