package salon.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import salon.domain.AjaxResult;
import salon.domain.Member;
import salon.domain.QnaBoard;
import salon.domain.QnaReply;
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
		if(board != null) {
			for(int i=0; i<board.size(); i++) {
				QnaBoard qnaBoard = board.get(i);
				qnaBoard.setReplyCount(boardService.replyCount(qnaBoard.getQna_no()));
			}
		}
		resultObj.put("status", "success");
		resultObj.put("data", board);	
		
		return resultObj;
	}
	
	@RequestMapping("/boardCount.do")
	public @ResponseBody Map<String, Object> boardCount(@RequestParam Map<String, Object> param){
	   
	    Map<String, Object> resultObj = new HashMap<String, Object>();		
	    int count = boardService.boardCount(param);
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
    @RequestMapping(value="/detail.do")
	public @ResponseBody Map<String,Object> detailBoard(@RequestParam("qna_no") int no){
    	boardService.viewUpdate(no);
    	//List<QnaReply> replyList = boardService.replySelect(no);
    	Map<String, Object> resultObj = new HashMap<String, Object>();
    	resultObj.put("status", "success");
		resultObj.put("data", boardService.detail(no));
		//resultObj.put("replyList", replyList);
		return resultObj; 
    	
	}
	@RequestMapping("/delete.do")
	public String deleteBoard(@RequestParam("qna_no") int no,RedirectAttributes redirectAttributes){
		boardService.delete(no);
		return "redirect:/qna/qnaList.html";
		
	}
	
	@RequestMapping(value="/update.do")
	public String updateBoard(QnaBoard board,RedirectAttributes redirectAttributes){
		
    	boardService.update(board);
	    return "redirect:/qna/qnaList.html";
	}
	
	 @RequestMapping("/replyCount.do")
	 public int selectReCount(@RequestParam("qna_no") int no){
	    return boardService.replyCount(no);
	 }
	
	
	/* 댓글 */
	
	@RequestMapping(value="/insertReply.do")
	public String insertReply(QnaReply reply,RedirectAttributes redirectAttributes){
		boardService.replyInsert(reply);
		return "redirect:/qna/qnaDetail.html?qna_no="+reply.getQna_no();
	}
	
    @RequestMapping(value="/selectReply.do") 
	public @ResponseBody Map<String, Object> selectReply(int qna_no){
		List<QnaReply> replyList = boardService.replySelect(qna_no);
    	Map<String, Object> resultObj = new HashMap<String, Object>();
    	resultObj.put("status", "success");
    	resultObj.put("data", replyList);
		return resultObj; 
	}
    
    @RequestMapping("/deleteReply.do")
	public String deleteReply(@RequestParam("qnaReply_no") int no, @RequestParam("qna_no") int qna_no, RedirectAttributes redirectAttributes){
		boardService.qnaDelete(no);
		return "redirect:/qna/qnaDetail.html?qna_no=" + qna_no;
    }
    
    @RequestMapping("/updateReply.do")
    public String updateReply(QnaReply reply,RedirectAttributes redirectAttributes){
    	boardService.updateReply(reply);
    	return "redirect:/qna/qnaDetail.html?qna_no=" + reply.getQna_no();
    }
    
    @RequestMapping("/getSession.do")
    public @ResponseBody Map<String, Object> getNick(HttpSession session, HttpServletRequest req){
    	Member member = (Member)req.getSession().getAttribute("loginUser");
    	String nick = member.getNick();
    	Map<String, Object> result = new HashMap<>();
    	result.put("nick", nick);
    	return result;
    	
    }
   
    	
}	