package salon.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.domain.Blog;
import salon.domain.BlogComment;

public interface BlogService {
	//본문
	public Map<String, Object> register(Blog blog, MultipartHttpServletRequest mRequest) throws Exception;
	public List<Blog> selectList();
	public void delete(Blog blog);
	
	//댓글
	public List<BlogComment> selectCommentList(BlogComment comment);
	public BlogComment commentRegister(BlogComment comment);
	public void commentDelete(BlogComment comment);
}
