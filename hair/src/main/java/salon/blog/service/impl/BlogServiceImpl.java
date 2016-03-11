package salon.blog.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.blog.dao.BlogDao;
import salon.blog.domain.Blog;
import salon.blog.domain.BlogImage;
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
		return blogDao.registAndselectBlog(blog);
	}

	@Override
	public List<Blog> selectList() {
		return blogDao.selectBlogList();
	}

	@Override
	public void delete(Blog blog) {
		blogDao.deleteBlog(blog);
	}
	
	// 파일
	@Override
	public BlogImage imageUpload(BlogImage blogImage) {
		blogDao.insertImageFile(blogImage);
		return null;
	}
	
	
	// 댓글 파트
	@Override
	public Comment commentRegister(Comment comment) {
		blogDao.insertComment(comment);
		return blogDao.selectComment(comment);
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
