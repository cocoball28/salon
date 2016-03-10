package salon.member.dao;

import org.springframework.stereotype.Repository;

import salon.member.domain.Member;

@Repository
public interface MemberDao {
	public void insert(Member member);
}
