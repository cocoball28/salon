package salon.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import salon.domain.Member;

public interface MemberService {
	Member retrieve(String email, String password);

	String insert(Member member, MultipartHttpServletRequest mRequest);

	Member updateMember(Member member, MultipartHttpServletRequest mRequest);

	boolean emailCheck(String email);
}
