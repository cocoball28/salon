package salon.blog.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.blog.dao.BlogDao;
import salon.blog.domain.Blog;
import salon.blog.domain.Comment;
import salon.blog.service.BlogService;

@Service
public class BlogServiceImpl implements BlogService {

	@Autowired
	BlogDao blogDao;
	
	// 본문 파트
	@Override
	public Blog register(Blog blog) {
		blogDao.insert(blog);
		return blogDao.selectBlog();
	}

	@Override
	public List<Blog> selectList() {
		return blogDao.selectBlogList();
	}

	@Override
	public void delete(Blog blog) {
		System.out.println(blog.getNo());
		blogDao.deleteBlog(blog);
	}
	
	// 댓글 파트
	@Override
	public Comment commentRegister(Comment comment) {
		blogDao.insertComment(comment);
		return blogDao.selectComment();
	}

	@Override
	public List<Comment> selectCommentList(Comment comment) {
		return blogDao.selectCommentList(comment);
	}

	@Override
	public void commentDelete(Comment comment) {
		blogDao.deleteComment(comment);
	}

}
