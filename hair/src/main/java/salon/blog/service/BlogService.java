package salon.blog.service;

import java.util.List;

import salon.blog.domain.Blog;
import salon.blog.domain.Comment;

public interface BlogService {
	//본문
	Blog register(Blog blog);
	List<Blog> selectList();
	
	//댓글
	List<Comment> selectCommentList(Comment comment);
	void commentRegister(Comment comment);
}
