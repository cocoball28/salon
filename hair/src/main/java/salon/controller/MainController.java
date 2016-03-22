package salon.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.dao.MainDao;
import salon.dao.MemberDao;
import salon.domain.AjaxResult;
import salon.domain.Main;
import salon.domain.Member;
import salon.service.MemberService;

@Controller("ajax.BoardController")
@RequestMapping("/salon/ajax/*")
public class MainController { 
  
  public static final String SAVED_DIR = "/attachfile";
  
  @Autowired MainDao mainDao;
  @Autowired ServletContext servletContext;
  @Autowired MemberDao memberDao;
  @Autowired MemberService memberService; 
  
  @RequestMapping("list")
  @ResponseBody
  public HashMap<String, Object> list(HttpServletRequest request, HttpServletResponse response,
		  @RequestParam(defaultValue="1") int pageNo,@RequestParam(defaultValue="20") int pageSize) throws Exception {
    HashMap<String, Object> resultMap = new HashMap<>();
	resultMap.put("startIndex", (pageNo - 1) * pageSize);
	resultMap.put("length", pageSize);
	
    List<Main> mList = mainDao.mainList(resultMap);
    Member member = (Member)request.getSession().getAttribute("loginUser");
    resultMap.put("member", member);
    resultMap.put("mList", mList);
    
    return resultMap;
  }
  
  @RequestMapping(value="updateFav", method=RequestMethod.GET)
  @ResponseBody
  public AjaxResult updateFav(int no) throws Exception {
	Main main = mainDao.selectByNo(no);
	
	if(main.getFavorite() == 1){
		main.setFavorite(0);
		mainDao.updateFav(main);
	}else{
		main.setFavorite(1);
		mainDao.updateFav(main);
	}
	
	System.out.println("성공");
    return new AjaxResult("success", "success");
  }
  
  
  
  
  // 회원정보
  @RequestMapping(value="update", method=RequestMethod.GET)
  @ResponseBody
  public Member update(HttpServletRequest request, HttpServletResponse response) throws Exception{
	  Member member = (Member)request.getSession().getAttribute("loginUser");
	  member = memberDao.getMember(member.getMno());
	  System.out.println("file " + member.getPhotoPath());
	  return member;
  }
  
  @RequestMapping(value="update", method=RequestMethod.POST)
  @ResponseBody
  public AjaxResult updateMember(Member member, MultipartHttpServletRequest mRequest,HttpSession session) throws Exception{
	  System.out.println("mno " + member.getMno());
	  member = memberService.updateMember(member, mRequest);
	  session.setAttribute("loginUser", member);
	  return new AjaxResult("success", "success");
  }

  @RequestMapping(value="shopSearch", method=RequestMethod.POST)
  @ResponseBody
  public AjaxResult shopSearch() throws Exception{
	  
	  return null;
  }
  
  
}
