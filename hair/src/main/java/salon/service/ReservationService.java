package salon.service;

import java.util.List;

import salon.domain.Member;
import salon.domain.Reservation;


public interface ReservationService {
	public List<Reservation> selectList(Reservation reservation);
	public Reservation register(Reservation reservation);
	public List<Member> selectDsnList(Reservation reservation);
}
