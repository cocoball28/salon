package salon.domain;

import java.util.List;

public class Blog {
	private int bNo;
	private int bno;
	private int mno;
	private String tag;
	private String content;
	private String regDate; 
	private List<BlogImage> blogImageList;
	private int fav;
	
	
	public int getFav() {
		return fav;
	}

	public void setFav(int fav) {
		this.fav = fav;
	}

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

	@Override
	public String toString() {
		return "Blog [mno=" + mno + ", bno=" + bno + ", tag=" + tag + ", content=" + content + ", regDate=" + regDate
				+ ", blogImageList=" + blogImageList + "]";
	}
	
}
