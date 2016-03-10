package salon.blog.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import salon.blog.dao.BlogDao;
import salon.blog.domain.Blog;
import salon.blog.domain.BlogImage;
import salon.blog.domain.Comment;
import salon.blog.service.BlogService;


@Controller
@RequestMapping("/blog/*")
public class BlogController {
	
	@Autowired 
	BlogDao blogDao;
	
	@Autowired 
	BlogService blogService;
	
	@Autowired
	ServletContext servletContext;
	
	
	@RequestMapping("list")
	public List<Blog> list(){
		return blogService.selectList();
	}
	
	@RequestMapping("regist")
	public Blog regist(Blog blog){
		return blogService.register(blog);
	}
	
	@RequestMapping("delete")
	public void delete(Blog blog){
		blogService.delete(blog);
	}
	
	//파일 업로드
	@RequestMapping(value="fileupload", method=RequestMethod.POST)
	@ResponseBody
	public String fileupload(MultipartFile image) throws Exception{
		System.out.println(image.getOriginalFilename());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
		String realPath = servletContext.getRealPath("/upload/");
		String filePath = realPath + sdf.format(new Date());
		File file = new File(filePath);
		file.mkdirs();
		BlogImage imageVO = new BlogImage();
		String oriFileName = image.getOriginalFilename();
			if(oriFileName != null && !oriFileName.equals("")){
				String ext = oriFileName.substring(oriFileName.lastIndexOf("."));
				String realFileName = UUID.randomUUID().toString()+ext;
				String saveFullFileName = filePath+"/"+realFileName;
				image.transferTo(new File(saveFullFileName));
				/*
				imageVO.setFilePath(filePath);
				imageVO.setFileSize(mFile.getSize());
				imageVO.setOriFileName(oriFileName);
				imageVO.setRealFileName(realFileName);
				*/
			}
		return "success";
	}
	
	
	
	//댓글 출력
	@RequestMapping("listComment")
	public List<Comment> listComment(Comment comment){
		return blogService.selectCommentList(comment);
	}
	
	//댓글 입력
	@RequestMapping("registComment")
	public Comment registComment(Comment comment){
		return blogService.commentRegister(comment);
	}
	
	//댓글 입력
	@RequestMapping("deleteComment")
	public void deleteComment(Comment comment){
		blogService.commentDelete(comment);
	}
	
}
