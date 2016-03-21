package salon.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import salon.domain.Member;

@Repository
public interface MemberDao {
	Member selectOneByEmailPassword(Map<String,Object> paramMap);

	int insert(Member member);
	
	Member modifyUser(int no);

	Member getMember(int no);

	void updateMember(Member member);
}
