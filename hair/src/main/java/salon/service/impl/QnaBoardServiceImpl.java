package salon.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.dao.QnaBoardDao;
import salon.domain.QnaBoard;
import salon.domain.QnaReply;
import salon.service.QnaBoardService;

@Service
public class QnaBoardServiceImpl implements QnaBoardService{
	
	@Autowired
	QnaBoardDao dao;
	
	public List<QnaBoard> listBoard(Map<String, Object> param){
		return dao.selectBoardVOs(param);
	}
	
	public void regist(QnaBoard vo){
	    dao.insertBoardVO(vo);
	}
	
	public QnaBoard detail(int qna_no){
		return dao.selectBoardVO(qna_no);
	}
	
	public void delete(int qna_no){
		dao.deleteBoardVO(qna_no);
	}
	
	public void update(QnaBoard vo){
		dao.updateBoardVO(vo);
	}
	
	public void viewUpdate(int qna_no){
		dao.updateView(qna_no);
	}
	
	public int boardCount(Map<String, Object> param){
		return dao.boardCount(param);
	}
	
	public void replyInsert(QnaReply reply){
		dao.insertReply(reply);
	}

	public List<QnaReply> replySelect(int qna_no) {
		return dao.selectReply(qna_no);
	}
	
	public void qnaDelete(int qnaReply_no){
		dao.deleteReply(qnaReply_no);
	}
	
	public int replyCount(int qna_no){
		return dao.selectReCount(qna_no);
	}
	
	public void updateReply(QnaReply reply){
		dao.updateReply(reply);
	}
	
	
	


	
	

}
