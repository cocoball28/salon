package salon.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.domain.Shop;
import salon.domain.ShopImage;

@Repository
public interface ShopDao {
	public List<Shop> selectShopList();
	public void insertImage(ShopImage shopImage);
}
