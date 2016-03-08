package salon.blog.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.blog.domain.Blog;

@Repository
public interface BlogDao {
	public void insert(Blog blog);
	public List<Blog> selectBlogList();
	public Blog selectBlog();
}
