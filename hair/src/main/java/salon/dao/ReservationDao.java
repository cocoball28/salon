package salon.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import salon.domain.Member;
import salon.domain.Reservation;

@Repository
public interface ReservationDao {
	public List<Reservation> selectList(Reservation reservation);
	public List<Member> selectMemberList(Reservation reservation);
	public void insert(Reservation reservation);
	
}
