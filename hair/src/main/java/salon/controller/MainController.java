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
import salon.dao.ShopDao;
import salon.domain.AjaxResult;
import salon.domain.Blog;
import salon.domain.Favorite;
import salon.domain.Member;
import salon.domain.Shop;
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
  @Autowired ShopDao shopDao;
  
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
    List<Favorite> favList = mainDao.favBlogList(mno);
        
    resultMap.put("member", member);
    resultMap.put("mList", mList);
    resultMap.put("favList", favList);
    
    return resultMap;
  }
  
  @RequestMapping(value="updateFav", method=RequestMethod.GET)
  @ResponseBody
  public AjaxResult updateFav(Favorite favorite) throws Exception {
	System.out.println(favorite.getBno()+"  "+ favorite.getMno() +"  "+favorite.getFav() +"  "+favorite.getFrom());
	
	if(favorite.getFav() == 1 ){
		mainDao.insertFav(favorite);
	}else{
		mainDao.deleteFav(favorite);
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
  public AjaxResult favBlog(HttpServletRequest request, String from, int mno,
	@RequestParam(defaultValue="1") int pageNo,@RequestParam(defaultValue="20") int pageSize) throws Exception{
	  
	  Member member = (Member)request.getSession().getAttribute("loginUser");
	  System.out.println("check" + from);
	  HashMap<String, Object> resultMap = new HashMap<>();
	  resultMap.put("startIndex", (pageNo - 1) * pageSize);
	  resultMap.put("length", pageSize);
	  resultMap.put("mno", member.getMno());

	  AjaxResult ajaxResult = new AjaxResult();
	  if(from.equals("blog")){
		  System.out.println("in");
		  List<Blog> favBlog = mainService.favBlog(resultMap);
		  ajaxResult.setData(favBlog);
		  ajaxResult.setStatus("favBlog");
	  }else if(from.equals("designer")){
		  List<Member> favMember = memberDao.favMember(resultMap);
		  ajaxResult.setData(favMember);
		  ajaxResult.setStatus("favMember");
	  }else if(from.equals("shop")){
		  List<Shop> favShop = shopDao.favShop(resultMap);
		  ajaxResult.setData(favShop);
		  ajaxResult.setStatus("favShop");
	  }
	  
	  return ajaxResult;
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
