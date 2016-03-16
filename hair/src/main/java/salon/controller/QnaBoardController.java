package salon.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import salon.domain.QnaBoard;
import salon.service.QnaBoardService;


@Controller
@RequestMapping("/board")
public class QnaBoardController {
	
	

	@Autowired
	QnaBoardService boardService;
	
	@Autowired
	ServletContext servletcontext;
	
	@RequestMapping("/list.do")
	public @ResponseBody Map<String, Object> selectList(){
	    int number;
		int count = boardService.boardCount();
	    if(count%10==0){
	    	number = count/10;
	    }else{
	    	number = count/10 +1;
	    }
	    Map<String, Object> resultObj = new HashMap<String, Object>();
		resultObj.put("status", "success");
		resultObj.put("number", number);
		List<QnaBoard> board = boardService.listBoard();
		resultObj.put("data", board);	
		
		return resultObj;
	}
	
	@RequestMapping("/listTitle.do")
	public @ResponseBody Map<String, Object> selectListTitle(){
		int count = boardService.boardCount();
		int number;
		if(count%10!=0){
			number = count/10+1;
		}else{
			number = count/10;
		}
		Object bunho = number;
		Map<String, Object> resultObj = new HashMap<String, Object>();
		resultObj.put("number",number);
		resultObj.put("status", "success");
		List<QnaBoard> board = boardService.listBoardTitle();
		resultObj.put("data", board);	
		
		return resultObj;
	}
	
	@RequestMapping("/listContent.do")
	public @ResponseBody Map<String, Object> selectListContent(){
		int count = boardService.boardCount();
		int number;
		if(count%10!=0){
			number = count/10+1;
		}else{
			number = count/10;
		}
		Object bunho = number;
		Map<String, Object> resultObj = new HashMap<String, Object>();
		resultObj.put("number",number);
		resultObj.put("status", "success");
		List<QnaBoard> board = boardService.listBoardContent();
		resultObj.put("data", board);	
		
		return resultObj;
	}
	
	@RequestMapping("/listNick.do")
	public @ResponseBody Map<String, Object> selectListNick(){
		int count = boardService.boardCount();
		int number;
		if(count%10!=0){
			number = count/10+1;
		}else{
			number = count/10;
		}
		Object bunho = number;
		Map<String, Object> resultObj = new HashMap<String, Object>();
		resultObj.put("number",number);
		resultObj.put("status", "success");
		List<QnaBoard> board = boardService.listBoardNick();
		resultObj.put("data", board);	
		
		return resultObj;
	}
	
	
	
	
	@RequestMapping(value="/regist.do",method=RequestMethod.POST)
	public String registPost( @ModelAttribute("board") QnaBoard board, RedirectAttributes redirectAttributes){
		
		boardService.regist(board);
		return "redirect:/qna/qnaList.html";
	}
    @RequestMapping(value="/detail.do")
	public @ResponseBody Map<String,Object> detailBoard(@RequestParam("qna_no") int no){
    	boardService.viewUpdate(no);
    	Map<String, Object> resultObj = new HashMap<String, Object>();
    	resultObj.put("status", "success");
		resultObj.put("data", boardService.detail(no));	
		return resultObj; 
    	
	}
	@RequestMapping("/delete.do")
	public String deleteBoard(@RequestParam("qna_no") int no,RedirectAttributes redirectAttributes){
		boardService.delete(no);
		return "redirect:/qna/qnaList.html";
		
	}
	
	@RequestMapping(value="/update.do")
	public @ResponseBody Map<String,Object>updateBoard(@RequestParam("qna_no") int no){
    	boardService.viewUpdate(no);
    	Map<String, Object> resultObj = new HashMap<String, Object>();
    	resultObj.put("status", "success");
		resultObj.put("data", boardService.detail(no));	
		return resultObj; 
	
	}
	
	
}