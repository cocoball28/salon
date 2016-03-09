package salon.blog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import salon.blog.dao.BlogDao;
import salon.blog.domain.Blog;
import salon.blog.domain.Comment;
import salon.blog.service.BlogService;


@Controller
@RequestMapping("/blog/*")
public class BlogController {
	
	@Autowired BlogDao blogDao;
	@Autowired BlogService blogService;
	
	@RequestMapping("list")
	public List<Blog> list(){
		return blogService.selectList();
	}
	
	@RequestMapping("regist")
	public Blog regist(Blog blog){
		return blogService.register(blog);
	}
	
	
	//댓글 출력
	@RequestMapping("listComment")
	public List<Comment> listComment(Comment comment){
		return blogService.selectCommentList(comment);
	}
	
	//댓글 입력
	@RequestMapping("registComment")
	public void registComment(Comment comment){
		blogService.commentRegister(comment);
	}
	
	
}
