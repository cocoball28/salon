package salon.blog.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.blog.domain.Blog;
import salon.blog.domain.BlogImage;
import salon.blog.domain.Comment;

@Repository
public interface BlogDao {
	//본문
	public int insert(Blog blog);
	public List<Blog> selectBlogList();
	public Blog registAndselectBlog(Blog blog);
	public void deleteBlog(Blog blog);
	public BlogImage insertImageFile(BlogImage blogImage);
	
	//댓글 부분
	public void insertComment(Comment comment);
	public List<Comment> selectCommentList(Comment comment);
	public Comment selectComment(Comment comment);
	public void deleteComment(Comment comment);
}
