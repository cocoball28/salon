package salon.service;

import salon.domain.Member;

public interface MemberService {
	Member retrieve(String email, String password);
}
