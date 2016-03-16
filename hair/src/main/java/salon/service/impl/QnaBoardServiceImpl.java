package salon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.dao.QnaBoardDAO;
import salon.domain.QnaBoard;
import salon.service.QnaBoardService;

@Service
public class QnaBoardServiceImpl implements QnaBoardService{
	
	@Autowired
	QnaBoardDAO dao;
	
	public List<QnaBoard> listBoard(){
		return dao.selectBoardVOs();
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
	
	public int boardCount(){
		return dao.boardCount();
	}
	
	public List<QnaBoard> listBoardTitle(){
		return dao.selectBoardVOsTitle();
	}
	
	public List<QnaBoard> listBoardContent(){
		return dao.selectBoardVOsContent();
	}
	
	public List<QnaBoard> listBoardNick(){
		return dao.selectBoardVOsNick();
	}
	
	

}
