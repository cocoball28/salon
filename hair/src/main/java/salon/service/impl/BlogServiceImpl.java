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
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.dao.BlogDao;
import salon.domain.Blog;
import salon.domain.BlogImage;
import salon.domain.Member;
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
		Member member = (Member)mRequest.getSession().getAttribute("loginUser");
		blog.setMno(member.getMno());
		blogDao.insert(blog);
		int bno = blog.getBno();
		//System.out.println("글번호 : "+no);
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
				blogImage.setPath(srcPath+realFileName);
				blogImage.setBno(bno);
				blogDao.insertImage(blogImage);
			}
		}
		map.put("blog", blogDao.selectBlogByNo(blog));
		map.put("blogImageList", blogDao.selectImage(blog));
		return map;
	}

	@Override
	public Map<String, Object> selectList(Blog blog, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<>();
		Member loginUser = (Member)request.getSession().getAttribute("loginUser");
		System.out.println("로그인유저의 미용실번호 : "+loginUser.getSano());
		int loginMemberNo = loginUser.getMno();
		String loginMemberStatus = loginUser.getStatus();
		int mno = blog.getMno();
		System.out.println(mno);
		map.put("loginUser", loginUser);
		map.put("dsnInfo", blogDao.selectDsnInfo(blog));
		//블로그 주인의 미용실 번호
		int sano = blogDao.selectDsnInfo(blog).getSano();
		map.put("partnerInfo", blogDao.selectPartnerDsnInfo(loginUser));
		map.put("blogList", blogDao.selectBlogList(blog));
		map.put("shopInfo", blogDao.selectShopInfo(sano));
		boolean myBlogFlag = false;
		if(loginMemberNo == mno){
			if(loginMemberStatus.equals("d")){
				myBlogFlag = true;
			};
		}
		map.put("myBlogFlag",myBlogFlag);
		return map;
	}

	@Override
	public void delete(Blog blog) {
		blogDao.deleteCommentByBlogNo(blog);
		blogDao.deleteImageByBlogNo(blog);
		blogDao.deleteBlog(blog);
	}
	
		
	// 댓글 파트
	@Override
	public BlogComment commentRegister(BlogComment blogComment, HttpServletRequest request) {
		Member member = (Member)request.getSession().getAttribute("loginUser");
		blogComment.setMno(member.getMno());
		blogComment.setNick(member.getNick());
		blogDao.insertComment(blogComment);
		int cno = blogComment.getCno();
		blogComment.setCno(cno);
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
