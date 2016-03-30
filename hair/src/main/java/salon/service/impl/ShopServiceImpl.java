package salon.service.impl;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.dao.ShopDao;
import salon.domain.Member;
import salon.domain.Shop;
import salon.domain.ShopImage;
import salon.service.ShopService;

@Service
public class ShopServiceImpl implements ShopService {

	@Autowired ShopDao shopDao;
	
	@Autowired ServletContext servletContext;

	@Override
	public Map<String, Object> selectList(Shop shop) {
		Map<String, Object> map = new HashMap<>();
		map.put("image", shopDao.selectShopImageList(shop));
		map.put("dsn", shopDao.selectDesignerList(shop));
		map.put("info", shopDao.selectShopList(shop));
		return map;
	}

	@Override
	public List<ShopImage> register(Shop shop, MultipartHttpServletRequest mRequest) throws Exception {
		int sano = shop.getSano();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");
		String realPath = servletContext.getRealPath("/upload/");
		String sdfPath = sdf.format(new Date());
		String filePath = realPath + sdfPath;
		File file = new File(filePath);
		file.mkdirs();
		System.out.println(filePath);
		Iterator<String> iter = mRequest.getFileNames();
		
		while(iter.hasNext()){
			ShopImage shopImage = new ShopImage();
			MultipartFile mFile =  mRequest.getFile(iter.next());
			String oriFileName = mFile.getOriginalFilename();
			System.out.println(oriFileName);
			if(oriFileName != null && !oriFileName.equals("")){
				String ext = oriFileName.substring(oriFileName.lastIndexOf("."));
				String realFileName = UUID.randomUUID().toString()+ext;
				String saveFullFileName = filePath+"/"+realFileName;
				String srcPath = "../upload/"+ sdfPath;
				mFile.transferTo(new File(saveFullFileName));
				shopImage.setPath(srcPath+realFileName);
				shopImage.setSano(sano);
				shopDao.insertImage(shopImage);
			}
		}
		return shopDao.selectShopImageList(shop);
	}
	
}
