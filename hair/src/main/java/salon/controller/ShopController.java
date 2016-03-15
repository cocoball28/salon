package salon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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
	
	@RequestMapping(value="regist", method=RequestMethod.POST)
	@ResponseBody
	public List<Shop> regist(MultipartHttpServletRequest mRequest) throws Exception {
		System.out.println("컨트롤러");
		return null;
		//return shopService.register(mRequest);
	}
}