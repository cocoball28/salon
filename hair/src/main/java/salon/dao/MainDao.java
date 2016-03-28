package salon.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import salon.domain.Blog;

@Repository
public interface MainDao {
	
	List<Blog> mainList(HashMap<String, Object> resultMap);

	int selectByNo(HashMap<String, Object> map);

	void insertFav(HashMap<String, Object> map);

	void deleteFav(HashMap<String, Object> map);

	List<Integer> favList(int mno);

	List<Blog> getBlogbyFav(HashMap<String, Object> resultMap);

	List<Blog> search(HashMap<String, Object> resultMap);
}
