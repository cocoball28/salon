package salon.service;

import java.util.HashMap;
import java.util.List;

import salon.domain.Blog;

public interface MainService {

	List<Blog> favBlog(HashMap<String, Object> resultMap);

	List<Blog> search(HashMap<String, Object> resultMap);
	
}
