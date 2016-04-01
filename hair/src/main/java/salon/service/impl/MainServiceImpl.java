package salon.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mysql.fabric.xmlrpc.base.Array;

import salon.dao.MainDao;
import salon.dao.MemberDao;
import salon.domain.Blog;
import salon.service.MainService;

@Service
public class MainServiceImpl implements MainService{
	
	@Autowired	MemberDao memberDao;
	@Autowired	ServletContext servletContext;
	@Autowired	MainDao mainDao;
	
	@Override
	public List<Blog> favBlog(HashMap<String, Object> resultMap) {
		
		List<Blog> favList = mainDao.getBlogbyFav(resultMap);
		return favList;
	}


	@Override
	public List<Blog> search(HashMap<String, Object> resultMap) {
		String result = (String)resultMap.get("result");
		/* sprit */
		
		String[] resultArray = result.split(" ");
		resultMap.put("resultArray", resultArray);
		
		List<Blog> searchList = mainDao.search(resultMap);
		
		return searchList;
	}
	
	
	
	
}
