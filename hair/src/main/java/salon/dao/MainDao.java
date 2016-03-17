package salon.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import salon.domain.Main;

@Repository
public interface MainDao {
	
	List<Main> mainList(HashMap<String, Object> resultMap);

	Main selectByNo(int no);

	void updateFav(Main main);
}
