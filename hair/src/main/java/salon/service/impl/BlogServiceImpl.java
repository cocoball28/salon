package salon.service.impl;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.dao.BlogDao;
import salon.domain.Blog;
import salon.domain.BlogImage;
import salon.domain.BlogComment;
import salon.service.BlogService;

@Service
public class BlogServiceImpl implements BlogService {

	@Autowired
	BlogDao blogDao;
	
	
	@Autowired
	ServletContext servletContext;
	
	// 본문 파트
	@Override
	public Map<String, Object> register(Blog blog, MultipartHttpServletRequest mRequest) throws Exception{
		blogDao.insert(blog);
		int no = blog.getNo();
		System.out.println("글번호 : "+no);
		Map<String, Object> map = new HashMap<String, Object>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");
		String realPath = servletContext.getRealPath("/upload/");
		String sdfPath = sdf.format(new Date());
		String filePath = realPath + sdfPath;
		File file = new File(filePath);
		file.mkdirs();
		Iterator<String> iter = mRequest.getFileNames();
		while(iter.hasNext()){
			BlogImage blogImage = new BlogImage();
			MultipartFile mFile =  mRequest.getFile(iter.next());
			String oriFileName = mFile.getOriginalFilename();
			System.out.println(oriFileName);
			if(oriFileName != null && !oriFileName.equals("")){
				String ext = oriFileName.substring(oriFileName.lastIndexOf("."));
				String realFileName = UUID.randomUUID().toString()+ext;
				String saveFullFileName = filePath+"/"+realFileName;
				String srcPath = "../upload/"+ sdfPath;
				mFile.transferTo(new File(saveFullFileName));
				blogImage.setFileName(srcPath+realFileName);
				blogImage.setNo(no);
				blogDao.insertImage(blogImage);
			}
		}
		map.put("blog", blogDao.selectBlogByNo(blog));
		map.put("blogImageList", blogDao.selectImage(blog));
		return map;
	}

	@Override
	public List<Blog> selectList() {
		return blogDao.selectBlogList();
	}

	@Override
	public void delete(Blog blog) {
		blogDao.deleteBlog(blog);
	}
	
		
	// 댓글 파트
	@Override
	public BlogComment commentRegister(BlogComment blogComment) {
		blogDao.insertComment(blogComment);
		return blogDao.selectComment(blogComment);
	}

	@Override
	public List<BlogComment> selectCommentList(BlogComment blogComment) {
		return blogDao.selectCommentList(blogComment);
	}

	@Override
	public void commentDelete(BlogComment blogComment) {
		blogDao.deleteComment(blogComment);
	}

}
