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

import salon.dao.MainDao;
import salon.domain.AjaxResult;
import salon.domain.Main;
import salon.domain.Member;

@Controller("ajax.BoardController")
@RequestMapping("/salon/ajax/*")
public class MainController { 
  
  public static final String SAVED_DIR = "/attachfile";
  
  @Autowired MainDao mainDao;
  @Autowired ServletContext servletContext;
  
   
  @RequestMapping("list")
  public HashMap<String, Object> list(HttpServletRequest request, HttpServletResponse response) throws Exception {
    List<Main> mList = mainDao.mainList();
    Member member = (Member)request.getSession().getAttribute("loginUser");
    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("member", member);
    resultMap.put("mList", mList);
    
    return resultMap;
  }
  
  @RequestMapping(value="updateFav", method=RequestMethod.GET)
  public AjaxResult update(int no) throws Exception {
    
	
    
    return new AjaxResult("success", null);
  }
  
  
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

  
  
  @RequestMapping("delete.do")
  public AjaxResult delete(int no, String password) throws Exception {

    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("no", no);
    paramMap.put("password", password);
    
    if (boardDao.delete(paramMap) <= 0) {
      return new AjaxResult("failure", null);
    } 

    return new AjaxResult("success", null);
  }*/
}
