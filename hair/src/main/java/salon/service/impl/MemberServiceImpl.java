package salon.service.impl;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.dao.MemberDao;
import salon.domain.Member;
import salon.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	MemberDao memberDao;
	@Autowired
	ServletContext servletContext;
	
	public Member retrieve(String email, String password) {
	    HashMap<String,Object> paramMap = new HashMap<>();
	    paramMap.put("email", email);
	    paramMap.put("password", password);
	    Member member = memberDao.selectOneByEmailPassword(paramMap);
	    		
	    return member;
	  }

	@Override
	public String insert(Member member, MultipartHttpServletRequest mRequest) {
		
		// 멤버 이미지 등록
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");
		String realPath = servletContext.getRealPath("/upload/");
		String sdfPath = sdf.format(new Date());
		String filePath = realPath + sdfPath;
		File file = new File(filePath);
		file.mkdirs();
		Iterator<String> iter = mRequest.getFileNames();
		while(iter.hasNext()){
			MultipartFile mFile =  mRequest.getFile(iter.next());
			String oriFileName = mFile.getOriginalFilename();
			System.out.println(oriFileName);
			if(oriFileName != null && !oriFileName.equals("")){
				String ext = oriFileName.substring(oriFileName.lastIndexOf("."));
				String realFileName = UUID.randomUUID().toString()+ext;
				String saveFullFileName = filePath+"/"+realFileName;
				String srcPath = "../upload/"+ sdfPath;
				try { 
					mFile.transferTo(new File(saveFullFileName));
				} catch (Exception e) {
					e.printStackTrace();
				} 
				System.out.println(srcPath+realFileName);
				
				member.setFilePath(srcPath+realFileName);
				memberDao.insert(member);
			}
		}
		System.out.println("성공 후 서비스");
		return "success";
	}

	@Override
	public String updateMember(Member member, MultipartHttpServletRequest mRequest) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");
		String realPath = servletContext.getRealPath("/upload/");
		String sdfPath = sdf.format(new Date());
		String filePath = realPath + sdfPath;
		File file = new File(filePath);
		file.mkdirs();
		Iterator<String> iter = mRequest.getFileNames();
		while(iter.hasNext()){
			MultipartFile mFile =  mRequest.getFile(iter.next());
			String oriFileName = mFile.getOriginalFilename();
			System.out.println(oriFileName);
			if(oriFileName != null && !oriFileName.equals("")){
				String ext = oriFileName.substring(oriFileName.lastIndexOf("."));
				String realFileName = UUID.randomUUID().toString()+ext;
				String saveFullFileName = filePath+"/"+realFileName;
				String srcPath = "../upload/"+ sdfPath;
				try { 
					mFile.transferTo(new File(saveFullFileName));
				} catch (Exception e) {
					e.printStackTrace();
				} 
				System.out.println(srcPath+realFileName);
				
				member.setFilePath(srcPath+realFileName);
				memberDao.updateMember(member);
			}
		}
		System.out.println("성공 후 서비스");
		return "success";
	}
	
	
	
}
