package salon.salonpage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.salonpage.domain.Salonpage;

@Repository
public interface SalonpageDao {
	public List<Salonpage> selectSalonpageList();
}
