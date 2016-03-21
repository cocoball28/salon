package salon.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import salon.domain.QnaBoard;

@Repository
public interface QnaBoardDao {
	
	
	public List<QnaBoard> selectBoardVOs(Map<String, Object> param);
    public int insertBoardVO(QnaBoard board);
    public QnaBoard selectBoardVO(int qna_no);
	public void deleteBoardVO(int qna_no);
	public void updateBoardVO(QnaBoard board);
	public void updateView(int viewnum);
	public int boardCount();
	public void saveImage(Map<String, Object> hmap);
}
