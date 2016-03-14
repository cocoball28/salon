package salon.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.domain.Main;

@Repository
public interface MainDao {
	List<Main> mainList();
}
