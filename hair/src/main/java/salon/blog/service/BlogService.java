package salon.blog.service;

import java.util.List;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.blog.domain.Blog;
import salon.blog.domain.BlogImage;
import salon.blog.domain.Comment;

public interface BlogService {
	//본문
	public Blog register(Blog blog);
	public List<Blog> selectList();
	public void delete(Blog blog);
	public BlogImage imageUpload (BlogImage blogImage);
	
	//댓글
	public List<Comment> selectCommentList(Comment comment);
	public Comment commentRegister(Comment comment);
	public void commentDelete(Comment comment);
}
