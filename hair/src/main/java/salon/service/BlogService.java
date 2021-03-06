package salon.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.domain.Blog;
import salon.domain.BlogComment;
import salon.domain.Member;

public interface BlogService {
	//본문
	public Map<String, Object> register(Blog blog, MultipartHttpServletRequest mRequest) throws Exception;
	public Map<String, Object> selectList(Blog blog, HttpServletRequest request);
	public List<Blog> selectMoreList(Blog blog);
	public void delete(Blog blog);
	
	//댓글
	public List<BlogComment> selectCommentList(BlogComment comment);
	public BlogComment commentRegister(BlogComment comment, HttpServletRequest request);
	public void commentDelete(BlogComment comment);

}
