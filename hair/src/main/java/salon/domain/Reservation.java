package salon.domain;

public class Reservation {
	private int rNo;
	private int saNo;
	private String dName;
	private String cName;
	private String sTime;
	private String eTime;
	private String style;
	private String rsvDate;

	public int getrNo() {
		return rNo;
	}

	public void setrNo(int rNo) {
		this.rNo = rNo;
	}

	public int getSaNo() {
		return saNo;
	}

	public void setSaNo(int saNo) {
		this.saNo = saNo;
	}

	public String getdName() {
		return dName;
	}

	public void setdName(String dName) {
		this.dName = dName;
	}

	public String getcName() {
		return cName;
	}

	public void setcName(String cName) {
		this.cName = cName;
	}

	public String getsTime() {
		return sTime;
	}

	public void setsTime(String sTime) {
		this.sTime = sTime;
	}

	public String geteTime() {
		return eTime;
	}

	public void seteTime(String eTime) {
		this.eTime = eTime;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public String getRsvDate() {
		return rsvDate;
	}

	public void setRsvDate(String rsvDate) {
		this.rsvDate = rsvDate;
	}

	
	@Override
	public String toString() {
		return "Reservation [rNo=" + rNo + ", saNo=" + saNo + ", dName=" + dName + ", cName=" + cName + ", sTime="
				+ sTime + ", eTime=" + eTime + ", style=" + style + ", rsvDate=" + rsvDate + "]";
	}
	
}
