package salon.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.domain.Member;
import salon.domain.Shop;
import salon.domain.ShopImage;

@Repository
public interface ShopDao {
	public List<Shop> selectShopList(Shop shop);
	public List<Member> selectDesignerList(Shop shop);
	public List<ShopImage> selectShopImageList(Shop shop);
	public void insertImage(ShopImage shopImage);
	public List<Shop> getShop(Shop shop);
}
