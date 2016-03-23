package salon.domain;

import java.util.List;

public class Blog {
	private int no;
	private int mno;
	private int bNo;
	private int bno;
	private String tag;
	private String content;
	private String regDate; 
	private List<BlogImage> blogImageList;
	
	
	
	public int getBno() {
		return bno;
	}

	public void setBno(int bno) {
		this.bno = bno;
	}

	public String getRegDate() {
		return regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public int getMno() {
		return mno;
	}

	public void setMno(int mno) {
		this.mno = mno;
	}

	public List<BlogImage> getBlogImageList() {
		return blogImageList;
	}

	public void setBlogImageList(List<BlogImage> blogImageList) {
		this.blogImageList = blogImageList;
	}
	
	public int getbNo() {
		return bNo;
	}

	public void setbNo(int bNo) {
		this.bNo = bNo;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}
