package salon.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import salon.domain.Blog;
import salon.domain.Favorite;

@Repository
public interface MainDao {
	
	List<Blog> mainList(HashMap<String, Object> resultMap);

	List<Blog> search(HashMap<String, Object> resultMap);
	
//	int selectByNo(HashMap<String, Object> map);
	
	// favorite
	void insertFav(Favorite favorite);
	
	void deleteFav(Favorite favorite);
	
	List<Favorite> favBlogList(int mno);
	
	List<Blog> getBlogbyFav(HashMap<String, Object> resultMap);
}
