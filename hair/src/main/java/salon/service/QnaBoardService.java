package salon.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import salon.domain.QnaBoard;
import salon.domain.QnaReply;

@Service
public interface QnaBoardService {
	
	public List<QnaBoard> listBoard(Map<String, Object> param);
	public void regist(QnaBoard vo);
	public QnaBoard detail(int qna_no);
	public void delete(int qna_no);
	public void update(QnaBoard vo);
	public void viewUpdate(int viewnum);
	public int boardCount(Map<String, Object> param);
	public void replyInsert(QnaReply reply);
	public List<QnaReply> replySelect(int qna_no);
	public void qnaDelete(int qnaReply_no);
    public int replyCount(int qna_no);
    public void updateReply(QnaReply reply);
}
