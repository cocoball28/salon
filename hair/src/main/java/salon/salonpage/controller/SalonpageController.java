package salon.salonpage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import salon.salonpage.dao.SalonpageDao;
import salon.salonpage.domain.Salonpage;
import salon.salonpage.service.SalonpageService;

@Controller
@RequestMapping("/salonpage/*")
public class SalonpageController {

	@Autowired SalonpageDao salonpageDao;
	@Autowired SalonpageService salonpageService;
	
	@RequestMapping("list")
	public List<Salonpage> list() {
		return salonpageService.selectList();
	}
}
