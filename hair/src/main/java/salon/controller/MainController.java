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

import com.fasterxml.jackson.core.json.DupDetector;

import salon.dao.MainDao;
import salon.dao.MemberDao;
import salon.domain.AjaxResult;
import salon.domain.Blog;
import salon.domain.Member;
import salon.service.MainService;
import salon.service.MemberService;

@Controller("ajax.BoardController")
@RequestMapping("/salon/ajax/*")
public class MainController { 
  
  public static final String SAVED_DIR = "/attachfile";
  
  @Autowired MainDao mainDao;
  @Autowired ServletContext servletContext;
  @Autowired MemberDao memberDao;
  @Autowired MemberService memberService; 
  @Autowired MainService mainService;
  
  @RequestMapping("list")
  @ResponseBody
  public HashMap<String, Object> list(HttpServletRequest request, HttpServletResponse response,
		  @RequestParam(defaultValue="1") int pageNo,@RequestParam(defaultValue="20") int pageSize) throws Exception {
    HashMap<String, Object> resultMap = new HashMap<>();
	resultMap.put("startIndex", (pageNo - 1) * pageSize);
	resultMap.put("length", pageSize);
	
    List<Blog> mList = mainDao.mainList(resultMap);
    Member member = (Member)request.getSession().getAttribute("loginUser");
    int mno = member.getMno();
    System.out.println(mno);
    List<Integer> favList = mainDao.favList(mno);
        
    resultMap.put("member", member);
    resultMap.put("mList", mList);
    resultMap.put("favList", favList);
    
    return resultMap;
  }
  
  @RequestMapping(value="updateFav", method=RequestMethod.GET)
  @ResponseBody
  public AjaxResult updateFav(int bno, int mno, int fav) throws Exception {
	System.out.println(bno + "  " + mno + "  " + fav);
	HashMap<String, Object> map = new HashMap<>();
	map.put("bno", bno);
	map.put("mno", mno);
	if(fav == 1 ){
		mainDao.insertFav(map);
	}else{
		mainDao.deleteFav(map);
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
  
  @RequestMapping("favBlog")
  @ResponseBody
  public AjaxResult favBlog(HttpServletRequest request,
	@RequestParam(defaultValue="1") int pageNo,@RequestParam(defaultValue="20") int pageSize) throws Exception{
	  
	  Member member = (Member)request.getSession().getAttribute("loginUser");
	  
	  HashMap<String, Object> resultMap = new HashMap<>();
	  resultMap.put("startIndex", (pageNo - 1) * pageSize);
	  resultMap.put("length", pageSize);
	  resultMap.put("mno", member.getMno());
	  
	  List<Blog> favBlog = mainService.favBlog(resultMap);
	  
	  return new AjaxResult("favBlog", favBlog);
  }
  
  @RequestMapping("search")
  @ResponseBody
  public AjaxResult search(String result,
		  @RequestParam(defaultValue="1") int pageNo,@RequestParam(defaultValue="20") int pageSize) throws Exception{
	 
	  System.out.println("result " + result);
	  
	  HashMap<String, Object> resultMap = new HashMap<>();
	  resultMap.put("startIndex", (pageNo - 1) * pageSize);
	  resultMap.put("length", pageSize);
	  resultMap.put("result", result);
	  
	  List<Blog> searchList = mainService.search(resultMap);
	  
	  return new AjaxResult("result", searchList);
  }
  
}
