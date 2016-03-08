package salon.blog.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.blog.dao.BlogDao;
import salon.blog.domain.Blog;
import salon.blog.service.BlogService;

@Service
public class BlogServiceImpl implements BlogService{
	
	@Autowired BlogDao blogDao;
	
	@Override
	public Blog register(Blog blog) {
		blogDao.insert(blog);
		return blogDao.selectBlog();
	}

	@Override
	public List<Blog> selectList() {
		return blogDao.selectBlogList();
	}
}
