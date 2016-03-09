package salon.salonpage.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.salonpage.dao.SalonpageDao;
import salon.salonpage.domain.Salonpage;
import salon.salonpage.service.SalonpageService;

@Service
public class SalonpageServiceImpl implements SalonpageService {

	@Autowired SalonpageDao salonpageDao;

	@Override
	public List<Salonpage> selectList() {
		return salonpageDao.selectSalonpageList();
	}
	
}
