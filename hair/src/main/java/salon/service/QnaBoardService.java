package salon.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import salon.domain.QnaBoard;

@Service
public interface QnaBoardService {
	
	public List<QnaBoard> listBoard(Map<String, Object> param);
	public void regist(QnaBoard vo);
	public QnaBoard detail(int qna_no);
	public void delete(int qna_no);
    public void viewUpdate(int viewnum);
	public int boardCount();
	public void regiImage(Map<String, Object> hmap);
	public void updateBoard(QnaBoard board);
}

