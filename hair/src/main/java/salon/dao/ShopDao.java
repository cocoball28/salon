package salon.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.domain.Shop;

@Repository
public interface ShopDao {
	public List<Shop> selectShopList();
}
