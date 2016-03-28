package salon.service.impl;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.dao.MemberDao;
import salon.dao.ShopDao;
import salon.domain.Member;
import salon.domain.Shop;
import salon.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	MemberDao memberDao;
	@Autowired
	ServletContext servletContext;
	@Autowired
	ShopDao shopDao;
	
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
				member.setPhotoPath(srcPath+realFileName);
				System.out.println(member.getPhotoPath());
			}
		}
		memberDao.insert(member);
		System.out.println("성공 후 서비스");
		return "success";
	}

	@Override
	public Member updateMember(Member member, MultipartHttpServletRequest mRequest) {
		System.out.println("service" + member.getNick());
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
				
				member.setPhotoPath(srcPath+realFileName);
			}
		}
		memberDao.updateMember(member);
		member = memberDao.getMember(member.getMno());
		
		System.out.println("성공 후 서비스");
		return member;
	}

	@Override
	public boolean emailCheck(String email) {
		int result = memberDao.emailCheck(email);
		System.out.println(result);
		if(result == 0){
			return true;
		}else{
			return false;
		}
		
	}

	@Override
	public List<Shop> getShop(Shop shop) {
		
		List<Shop> list = shopDao.getShop(shop);
		
		return list;
	}
	
	
	
}
