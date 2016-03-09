package salon.blog.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.blog.domain.Blog;
import salon.blog.domain.Comment;

@Repository
public interface BlogDao {
	public void insert(Blog blog);
	public List<Blog> selectBlogList();
	public Blog selectBlog();
	
	//댓글 부분
	public void insertComment(Comment comment);
	public List<Comment> selectCommentList(Comment comment);
}
