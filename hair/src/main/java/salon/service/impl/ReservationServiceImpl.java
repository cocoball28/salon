package salon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salon.dao.ReservationDao;
import salon.domain.Reservation;
import salon.service.ReservationService;

@Service
public class ReservationServiceImpl implements ReservationService{

	@Autowired
	ReservationDao reservationDao;
	
	@Override
	public Reservation register(Reservation reservation) {
		reservationDao.insert(reservation);
		System.out.println(reservation.getrNo());
		return null;
	}

	@Override
	public List<Reservation> selectList(Reservation reservation) {
		return reservationDao.selectList(reservation);
	}

}
