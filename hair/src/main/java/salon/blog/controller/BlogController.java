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
	
	
	@RequestMapping(value="list", method=RequestMethod.POST)
	@ResponseBody
	public List<Blog> list(){
		return blogService.selectList();
	}
	
	@RequestMapping(value="regist", method=RequestMethod.POST)
	@ResponseBody
	public Blog regist(Blog blog){
		System.out.println("image"+blog.getImageFile());
		return blogService.register(blog);
	}
	
	@RequestMapping(value="delete", method=RequestMethod.POST)
	@ResponseBody
	public void delete(Blog blog){
		blogService.delete(blog);
	}
	
	//파일 업로드
	@RequestMapping(value="fileupload", method=RequestMethod.POST)
	@ResponseBody
	public BlogImage fileupload(MultipartFile image) throws Exception{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");
		String realPath = servletContext.getRealPath("/upload/");
		String sdfPath = sdf.format(new Date());
		String filePath = realPath + sdfPath;
		File file = new File(filePath);
		file.mkdirs();
		BlogImage blogImage = new BlogImage();
		String oriFileName = image.getOriginalFilename();
		if(oriFileName != null && !oriFileName.equals("")){
			String ext = oriFileName.substring(oriFileName.lastIndexOf("."));
			String realFileName = UUID.randomUUID().toString()+ext;
			String saveFullFileName = filePath+"/"+realFileName;
			String srcPath = "../upload/"+ sdfPath;
			image.transferTo(new File(saveFullFileName));
			blogImage.setSaveFullFileName(srcPath+realFileName);
			blogImage.setFileName(realFileName);
		}
		
		return blogImage;
	}
	
	
	
	//댓글 출력
	@RequestMapping(value="listComment", method=RequestMethod.POST)
	@ResponseBody
	public List<Comment> listComment(Comment comment){
		return blogService.selectCommentList(comment);
	}
	
	//댓글 입력
	@RequestMapping(value="registComment", method=RequestMethod.POST)
	@ResponseBody
	public Comment registComment(Comment comment){
		return blogService.commentRegister(comment);
	}
	
	//댓글 입력
	@RequestMapping(value="deleteComment", method=RequestMethod.POST)
	@ResponseBody
	public void deleteComment(Comment comment){
		blogService.commentDelete(comment);
	}
	
}
