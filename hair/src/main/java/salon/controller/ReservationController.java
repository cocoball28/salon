package salon.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import salon.domain.Member;
import salon.domain.Reservation;
import salon.service.ReservationService;

@Controller
@RequestMapping("/reservation/*")
public class ReservationController {
/*	@Autowired 
	ReservationDao reservationDao;
 */
	
	@Autowired 
	ReservationService reservationService;
	
	@RequestMapping(value="list", method=RequestMethod.POST)
	@ResponseBody
	public List<Reservation> list(Reservation reservation){
		//System.out.println(reservation);
		return reservationService.selectList(reservation);
	}
	
	@RequestMapping(value="regist", method=RequestMethod.POST)
	@ResponseBody
	public void regist(Reservation reservation){
		reservationService.register(reservation);
		System.out.println(reservation);
	}
	
	@RequestMapping(value="memberList", method=RequestMethod.POST)
	@ResponseBody
	public List<Member> memberList (Reservation reservation){
		return reservationService.selectDsnList(reservation);
	}
	
}
