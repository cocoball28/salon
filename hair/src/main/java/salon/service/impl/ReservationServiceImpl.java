package salon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.dao.ReservationDao;
import salon.domain.Member;
import salon.domain.Reservation;
import salon.service.ReservationService;

@Service
public class ReservationServiceImpl implements ReservationService{

	@Autowired
	ReservationDao reservationDao;
	
	@Override
	public Reservation register(Reservation reservation) {
		reservationDao.insert(reservation);
		return null;
	}

	@Override
	public List<Reservation> selectList(Reservation reservation) {
		return reservationDao.selectList(reservation);
	}

	@Override
	public List<Member> selectDsnList(Reservation reservation) {
		return reservationDao.selectMemberList(reservation);
	}

}
