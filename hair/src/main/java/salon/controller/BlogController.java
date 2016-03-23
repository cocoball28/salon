package salon.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.dao.BlogDao;
import salon.domain.Blog;
import salon.domain.BlogComment;
import salon.domain.Member;
import salon.service.BlogService;


@Controller
@RequestMapping("/blog/*")
public class BlogController {
	
	@Autowired 
	BlogDao blogDao;
	
	@Autowired 
	BlogService blogService;
	
	@RequestMapping(value="list", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> list(Blog blog, HttpServletRequest request){
		System.out.println("블로그번호 :"+blog.getMno());
		return blogService.selectList(blog,request);
	}
	
	@RequestMapping(value="delete", method=RequestMethod.POST)
	@ResponseBody
	public void delete(Blog blog){
		blogService.delete(blog);
	}
	
	@RequestMapping(value="regist", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> regist(Blog blog, MultipartHttpServletRequest mRequest) throws Exception{
		return blogService.register(blog, mRequest);
	}

	
	//댓글 출력
	@RequestMapping(value="listComment", method=RequestMethod.POST)
	@ResponseBody
	public List<BlogComment> listComment(BlogComment comment){
		return blogService.selectCommentList(comment);
	}
	
	//댓글 입력
	@RequestMapping(value="registComment", method=RequestMethod.POST)
	@ResponseBody
	public BlogComment registComment(BlogComment comment, HttpServletRequest request){
		return blogService.commentRegister(comment, request);
	}
	
	//댓글 삭제
	@RequestMapping(value="deleteComment", method=RequestMethod.POST)
	@ResponseBody
	public void deleteComment(BlogComment comment){
		blogService.commentDelete(comment);
	}
	
}
