package salon.service;

import java.util.List;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.domain.Member;
import salon.domain.Shop;

public interface MemberService {
	Member retrieve(String email, String password);

	String insert(Member member, MultipartHttpServletRequest mRequest);

	Member updateMember(Member member, MultipartHttpServletRequest mRequest);

	boolean emailCheck(String email);

	List<Shop> getShop(Shop shop);
}
