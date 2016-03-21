package salon.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import salon.domain.Member;
import salon.filter.AuthFilter;

@RequestMapping(value="/check/checkLogin", method=RequestMethod.GET)
public class AuthInterceptor extends HandlerInterceptorAdapter {
	private static final Logger log = Logger.getLogger(AuthFilter.class);
	  
	  @Override
	  public boolean preHandle(
	      HttpServletRequest request, 
	      HttpServletResponse response, 
	      Object handler) throws Exception {
	    
	    log.debug("로그인 인터셉터 실행!");
	    
	    Member member = (Member)request.getSession().getAttribute("loginUser");
	    System.out.println("인터셉터 들어옴");
	    
	    if (!request.getServletPath().startsWith("/auth") 
	        && member == null) {
	      System.out.println("인터셉터 member checkcheckchekc "+ request.getContextPath());
//	      response.sendRedirect(request.getContextPath() + "/auth/login.html");
	      return false; // 다음으로 가는 것을 멈춰라!
	    }
	    
	    
	    System.out.println(request.getServletPath());
	    return true; // 다음 인터셉터나 페이지 컨트롤러로 가라.
	  }
}
