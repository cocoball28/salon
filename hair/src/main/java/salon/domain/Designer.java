package salon.domain;

public class Designer {
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	private int no;
	private int shopNo;
	private String grade;
	private String pic;
	public String getPic() {
		return pic;
	}
	public void setPic(String pic) {
		this.pic = pic;
	}
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public int getShopNo() {
		return shopNo;
	}
	public void setShopNo(int shopNo) {
		this.shopNo = shopNo;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
}
