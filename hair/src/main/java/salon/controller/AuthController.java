package salon.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.dao.MemberDao;
import salon.domain.AjaxResult;
import salon.domain.Member;
import salon.service.MemberService;

@Controller
@RequestMapping("/auth/*")
public class AuthController {  
  @Autowired 
  MemberService memberService;
  @Autowired
  MemberDao memberDao;
  
  @RequestMapping(value="login", method=RequestMethod.GET)
  public String loginform() {
    return "auth/login";
  }
      
  @RequestMapping(value="login", method=RequestMethod.POST)
  public AjaxResult login(
      String email,
      String password,
      String saveEmail,
      HttpServletResponse response, 
      HttpSession session) {

    Cookie emailCookie = null;
    if (saveEmail != null) { // 이메일 저장을 체크했으면,
      emailCookie = new Cookie("email", email);
      emailCookie.setMaxAge(60 * 60 * 24 * 15);
    } else {
      emailCookie = new Cookie("email", "");
      emailCookie.setMaxAge(0); // 웹브라우저에게 email 쿠키 삭제를 명령한다.
    }
    response.addCookie(emailCookie);
    
    Member member = memberService.retrieve(email, password);
    AjaxResult ajaxResult = new AjaxResult("success", member);
    if (member == null) { // 로그인 실패!
      session.invalidate(); // 세션을 무효화시킴. => 새로 세션 객체 생성!
      ajaxResult.setData(null);
      return ajaxResult;
    }else{
    	session.setAttribute("loginUser", member);
    }
    return ajaxResult;
  }
  
  @RequestMapping(value="add", method=RequestMethod.POST)
  @ResponseBody
  public AjaxResult add(Member member, MultipartHttpServletRequest mRequest) throws Exception {
	  String result = memberService.insert(member, mRequest);
    return new AjaxResult("success", result);
  }
  
  @RequestMapping(value="emailCheck", method=RequestMethod.POST)
  public AjaxResult emailCheck(String email) throws Exception{
	  boolean result = memberService.emailCheck(email);
	  AjaxResult ajaxResult = new AjaxResult("success", result);
	  
	  return ajaxResult;
  }
  
  @RequestMapping(value="getShop", method=RequestMethod.POST)
  public AjaxResult getShop(String email) throws Exception{
	  boolean result = memberService.emailCheck(email);
	  AjaxResult ajaxResult = new AjaxResult("success", result);
	  
	  return ajaxResult;
  }
  
  @RequestMapping(value="checkLogin", method=RequestMethod.GET)
  @ResponseBody
  public AjaxResult check(HttpServletRequest request) throws Exception{
	  
    Member member = (Member)request.getSession().getAttribute("loginUser");
	AjaxResult ajaxResult = new AjaxResult("checkLogin", member);    
    if (member == null) {
      return ajaxResult.setData(null); // 다음으로 가는 것을 멈춰라!
    }
	    
    return ajaxResult;
  }
  
  @RequestMapping(value="logout", method=RequestMethod.GET)
  @ResponseBody
  public String logout(HttpSession session) {
    session.invalidate();
    return "success";
  }
}

