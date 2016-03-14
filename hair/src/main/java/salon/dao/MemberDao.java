package salon.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import salon.domain.Member;

@Repository
public interface MemberDao {
	Member selectOneByEmailPassword(Map<String,Object> paramMap);

//	void insert(Member member);
}
