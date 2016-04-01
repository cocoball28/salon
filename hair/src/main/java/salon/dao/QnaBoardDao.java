package salon.dao;

import java.util.List;
import java.util.Map;

import salon.domain.QnaBoard;
import salon.domain.QnaReply;

public interface QnaBoardDao {
    
	public int boardCount(Map<String, Object> param);
	public List<QnaBoard> selectBoardVOs(Map<String, Object> param);
	public void insertBoardVO(QnaBoard board);
	public QnaBoard selectBoardVO(int qna_board);
	public void deleteBoardVO(int qna_no);
	public void updateBoardVO(QnaBoard board);
	public void updateView(int qna_no);
    public void insertReply(QnaReply reply);
	public List<QnaReply> selectReply(int qna_no);
	public void deleteReply(int qnaReply_no);
	public int selectReCount(int qna_no);
	public void updateReply(QnaReply reply);
}
