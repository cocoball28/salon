package salon.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import salon.domain.QnaBoard;

@Repository
public interface QnaBoardDAO {
	
	
	public List<QnaBoard> selectBoardVOs();
    public int insertBoardVO(QnaBoard vo);
    public QnaBoard selectBoardVO(int qna_no);
	public void deleteBoardVO(int qna_no);
	public void updateBoardVO(QnaBoard board);
	public void updateView(int viewnum);
	public int boardCount();
	public List<QnaBoard> selectBoardVOsTitle();
	public List<QnaBoard> selectBoardVOsContent();
	public List<QnaBoard> selectBoardVOsNick();
	
}
