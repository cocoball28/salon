package salon.blog.service;

import java.util.List;

import org.springframework.stereotype.Service;

import salon.blog.domain.Blog;

public interface BlogService {
	Blog register(Blog blog);
	List<Blog> selectList();
}
