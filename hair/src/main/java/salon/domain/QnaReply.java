package salon.domain;

import java.text.SimpleDateFormat;
import java.util.Date;

public class QnaReply {
	
	private int qnaReply_no;
	private String nick;
	private String qnaReply_content;
	private Date qnaReply_date;
	private int qna_no;
	
	
	
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
	}
	public int getQna_no() {
		return qna_no;
	}
	public void setQna_no(int qna_no) {
		this.qna_no = qna_no;
	}
	public int getQnaReply_no() {
		return qnaReply_no;
	}
	public void setQnaReply_no(int qnaReply_no) {
		this.qnaReply_no = qnaReply_no;
	}
	
	public String getQnaReply_content() {
		return qnaReply_content;
	}
	public void setQnaReply_content(String qnaReply_content) {
		this.qnaReply_content = qnaReply_content;
	}
	
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"+" "+"HH:mm");
	public String getQnaReply_date() {
		return sdf.format(qnaReply_date);
	}
	
	public void setQnaReply_date(Date qnaReply_date) {
		this.qnaReply_date = qnaReply_date;
	}
	
	

}
