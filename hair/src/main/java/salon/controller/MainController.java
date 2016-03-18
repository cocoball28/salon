package salon.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import salon.dao.MainDao;
import salon.dao.MemberDao;
import salon.domain.AjaxResult;
import salon.domain.Main;
import salon.domain.Member;

@Controller("ajax.BoardController")
@RequestMapping("/salon/ajax/*")
public class MainController { 
  
  public static final String SAVED_DIR = "/attachfile";
  
  @Autowired MainDao mainDao;
  @Autowired ServletContext servletContext;
  @Autowired MemberDao memberDao;
   
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
	  System.out.println("member" + member);
	  return member;
  }
/*  @RequestMapping(value="update", method=RequestMethod.GET)
  @ResponseBody
  public Member update(int no) throws Exception{
	  
	  Member member = memberDao.modifyUser(no);
	  System.out.println("member" + member);
	  return member;
  }
*/  
  /*@RequestMapping("delete.do")
  public AjaxResult delete(int no, String password) throws Exception {

    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("no", no);
    paramMap.put("password", password);
    
    if (mainDao.delete(paramMap) <= 0) {
      return new AjaxResult("failure", null);
    } 

    return new AjaxResult("success", null);
  }
 */
  
  /*@RequestMapping(value="add", method=RequestMethod.POST)
  public AjaxResult add(Member member, MultipartFile file) throws Exception {
    
    if (file.getSize() > 0) {
      String newFileName = MultipartHelper.generateFilename(file.getOriginalFilename());  
      File attachfile = new File(servletContext.getRealPath(SAVED_DIR) 
                                  + "/" + newFileName);
      file.transferTo(attachfile);
      board.setAttachFile(newFileName);
    }
    
	System.out.println("controller debugggggggggggggggg");
    boardDao.insert(member);
    System.out.println("controller debugggggggggggggggg after daooooooooooooooooooo");
    
    return new AjaxResult("success", "success");
  }
  
  @RequestMapping("detail")
  public Object detail(int no) throws Exception {
    Board board = boardDao.selectOne(no);
    return new AjaxResult("success", board);
  }

  */
  
}
