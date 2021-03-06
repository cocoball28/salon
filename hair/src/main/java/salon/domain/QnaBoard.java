package salon.domain;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

public class QnaBoard {
	
	private int qna_no;
	private String nick;
	private String qna_title;
	private String qna_content;
	private Date reg_Date;
	private int viewnum;
	private int replyCount;
	
	
	
	
	public int getViewnum() {
		return viewnum;
	}
	public void setViewnum(int viewnum) {
		this.viewnum = viewnum;
	}
	public int getQna_no() {
		return qna_no;
	}
	public void setQna_no(int qna_no) {
		this.qna_no = qna_no;
	}
	
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
	}
	public String getQna_title() {
		return qna_title;
	}
	public void setQna_title(String qna_title) {
		this.qna_title = qna_title;
	}
	public String getQna_content() {
		return qna_content;
	}
	public void setQna_content(String qna_content) {
		this.qna_content = qna_content;
	}
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"+" "+"HH:mm");
	public String getReg_Date() {
		return sdf.format(reg_Date);
	}
	public void setReg_Date(Date reg_Date) {
		this.reg_Date = reg_Date;
	}
	
	public int getReplyCount() {
		return this.replyCount;
	}
	
	public void setReplyCount(int replyCount) {
		this.replyCount = replyCount;
	}

}
