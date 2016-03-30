package salon.domain;

public class Reservation {
	private int rno;
	private int sano;
	private int mno;
	private String cName;
	private String sTime;
	private String eTime;
	private String style;
	private String rsvDate;

	public int getRno() {
		return rno;
	}

	public void setRno(int rno) {
		this.rno = rno;
	}

	public int getSano() {
		return sano;
	}

	public void setSano(int sano) {
		this.sano = sano;
	}

	public int getMno() {
		return mno;
	}

	public void setMno(int mno) {
		this.mno = mno;
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
		return "Reservation [rno=" + rno + ", sano=" + sano + ", mno=" + mno + ", cName=" + cName + ", sTime=" + sTime
				+ ", eTime=" + eTime + ", style=" + style + ", rsvDate=" + rsvDate + "]";
	}
	
}
