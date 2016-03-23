package salon.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.pattern.IntegerPatternConverter;
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
	public @ResponseBody Map<String, Object> selectList(@RequestParam Map<String, Object> param){
	   
	    Map<String, Object> resultObj = new HashMap<String, Object>();
	    if(param.get("pageNo") != null) {
	    	if(param.get("pageNo").toString().equals("1")) {
	    		param.put("startIdx", 0);
	    	} else {
	    		param.put("startIdx", Integer.parseInt(param.get("pageNo").toString())*10-10);
	    	}
	    }
		
	    List<QnaBoard> board = boardService.listBoard(param);
		resultObj.put("status", "success");
		resultObj.put("data", board);	
		
		return resultObj;
	}
	
	@RequestMapping("/boardCount.do")
	public @ResponseBody Map<String, Object> boardCount(@RequestParam Map<String, Object> param){
	   
	    Map<String, Object> resultObj = new HashMap<String, Object>();		
	    int count = boardService.boardCount();
		int number;
		if(count%10!=0){
			number = count/10+1;
		}else{
			number = count/10;
		}
		resultObj.put("status", "success");
		resultObj.put("data", number);	
		
		return resultObj;
	}
	
	
	
	
	
	
	@RequestMapping(value="/regist.do",method=RequestMethod.POST)
	public String registPost( @ModelAttribute("board") QnaBoard board,RedirectAttributes redirectAttributes){
		
		boardService.regist(board);
		
	    return "redirect:/qna/qnaList.html";
	}
	
	@RequestMapping(value="/reRegist.do",method=RequestMethod.POST)
	public String reRegist( @ModelAttribute("board") QnaBoard board,RedirectAttributes redirectAttributes){
		
		
		boardService.reRegi(board);
		
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
	public @ResponseBody String update(QnaBoard board,RedirectAttributes redirectAttributes){
		boardService.update(board);
		return "redirect:/qna/qnaList.html";
    	
    }
	
}
	
	
	
	
