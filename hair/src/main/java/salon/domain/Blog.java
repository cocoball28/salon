package salon.domain;

import java.util.List;

public class Blog {
	private String tag;
	private String content;
	private int no;
	private List<BlogImage> blogImageList;
	
	public List<BlogImage> getBlogImageList() {
		return blogImageList;
	}

	public void setBlogImageList(List<BlogImage> blogImageList) {
		this.blogImageList = blogImageList;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
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
