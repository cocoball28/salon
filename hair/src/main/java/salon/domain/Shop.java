package salon.domain;

public class Shop {
	private int sano;
	private String name;
	private int tel;
	private int zip;
	private String addr;
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTel() {
		return tel;
	}
	public int getSano() {
		return sano;
	}
	public void setSano(int sano) {
		this.sano = sano;
	}
	public int getZip() {
		return zip;
	}
	public void setZip(int zip) {
		this.zip = zip;
	}
	public void setTel(int tel) {
		this.tel = tel;
	}
}
