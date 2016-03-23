package salon.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.domain.Designer;
import salon.domain.Shop;
import salon.domain.ShopImage;

@Repository
public interface ShopDao {
	public List<Shop> selectShopList();
	public List<Designer> selectDesignerList();
	public List<ShopImage> selectShopImageList();
	public void insertImage(ShopImage shopImage);
	public List<Shop> getShop(Shop shop);
}
