package salon.blog.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.blog.domain.Blog;
import salon.blog.domain.Comment;

@Repository
public interface BlogDao {
	//본문
	public void insert(Blog blog);
	public List<Blog> selectBlogList();
	public Blog selectBlog();
	public void deleteBlog(Blog blog);
	
	//댓글 부분
	public void insertComment(Comment comment);
	public List<Comment> selectCommentList(Comment comment);
	public Comment selectComment();
	public void deleteComment(Comment comment);
}
