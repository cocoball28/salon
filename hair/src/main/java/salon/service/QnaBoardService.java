package salon.service;

import java.util.List;

import org.springframework.stereotype.Service;

import salon.domain.QnaBoard;

@Service
public interface QnaBoardService {
	
	public List<QnaBoard> listBoard();
	public void regist(QnaBoard vo);
	public QnaBoard detail(int qna_no);
	public void delete(int qna_no);
	public void update(QnaBoard vo);
	public void viewUpdate(int viewnum);
	public int boardCount();
	public List<QnaBoard> listBoardTitle();
	public List<QnaBoard> listBoardContent();
	public List<QnaBoard> listBoardNick();
}
