


$("td").css("padding","2px");


var openReservationForm = function() {
	$(".reservationForm").show('slow');
	$(".mainControl").hide('fast');
}

var closeReservationForm = function() {
	$(".reservationForm").hide('slow');
	$(".mainControl").show('fast');
	$(".beginTimeInputBox").val("");
	$(".endTimeInputBox").val("");
	$(".endTimeInputBox").attr("disabled","");
}

var confirmReservationForm = function(){
	$(".endTimeInputBox").attr("disabled","");
	var hairdresser = $(".hairdresserName").val();
	var customer = $(".customerName").val();
	var hairStyle = $(".hairStyle").val();
	var beginTimeStr = $(".beginTimeInputBox").val();
	var sta = beginTimeStr.split(":");
	var beginTime = sta[0]*1+sta[1];
	var endTimeStr = $(".endTimeInputBox").val();
	sta = endTimeStr.split(":");
	var endTime = sta[0]*1+sta[1];
	var rsvDate = $(".selectedDateDisplay").attr("rsvDate");
	//console.log(hairdresser, customer, hairStyle, beginTime, endTime)
	$.post(
			"/salon/reservation/regist.do",
			{	
				"saNo":"1",
				"rsvDate":rsvDate,
				"dName":hairdresser,
				"cName":customer,
				"sTime":beginTimeStr,
				"eTime":endTimeStr,
				"style":hairStyle
			},
			function(){
				alert("success");
			}
	)
	
	/*	
	private String hdName;
	private String ctName;
	private String beginTime;
	private String endTime;
	private String style;
	private String bookDate;
	*/
	
	
	
	
	$(".customerName").val("");
	$(".hairStyle").val("");
	$(".beginTimeInputBox").val("");
	$(".endTimeInputBox").val("");
	addReservation(hairdresser, customer, hairStyle, beginTimeStr, endTimeStr);
	//reservationTimeSelector(beginTime,endTime)
}

var addReservation = function (hairdresser, customer, hairStyle, beginTime, endTime, reservationNo) {
	var cloneReservation = $(".cloneReservationInfo").find(".reservationInfoDiv").clone();
	$(cloneReservation).find(".time").text(beginTime + " - " + endTime);
	$(cloneReservation).find(".style").text(hairStyle);
	$(cloneReservation).find(".customer").text(customer);
	$(cloneReservation).find(".customer").css({"font-weight":"bold","font-size":"20px"});
	$(cloneReservation).attr("rNo",reservationNo);
	reservationTimeSelector(beginTime,endTime,reservationNo);
	var beginHour = beginTime.split(":")
	var targetTd = beginHour[0]*1+beginHour[1];
	//console.log(targetTd);
	$(".reservationStatusDisply").find("."+targetTd).append(cloneReservation);
}



var reservationTimeSelector = function(begin, end, rNo) {
	var beginTime = begin.split(":")
	var beginHour = beginTime[0]*1
	var beginMinute = beginTime[1]*1
	var endTime = end.split(":")
	var endHour = endTime[0]*1
	var endMinute = (endTime[1]*1)-15;
	if(endMinute == -15){
		endMinute = 45;
		endHour--;
	}
	console.log(endMinute);
	
	for(var i = beginHour ; i <= endHour ; i++){
		for(var j = beginMinute ; j <= 45 ; j+=15 ) {
			var selectedClass = (i*100)+ j;
			//console.log(i + ":" + j);
			console.log(selectedClass);
			$("."+selectedClass).css(
					{"background-color":"deepskyblue", 
					"color":"white"
					}
			);
			$("."+selectedClass).attr("rNo",rNo);
			if(i == endHour && j == endMinute) break;
		}
		beginMinute = 0;
	}
}


$(".controlBtnDiv span").hover(
	function() {
		$(this).css("color","#aaa");
	}, 
	function() {
		$(this).css("color","#666");
	}
);

var showSelectBeginTime = function(){
	$(".beginTimeInputBox").hide();
	$(".beginTimeSelectBox").show();
	
}

$(".beginTimeSelectBox option").click(function(){
	$(".beginTimeInputBox").val($(this).text());
	$(".beginTimeInputBox").show();
	$(".beginTimeSelectBox").hide();
	$(".endTimeInputBox").removeAttr("disabled");
	$(".endTimeInputBox").css("cursor","pointer");
	
})

var showSelectEndTime = function(){
	$(".endTimeInputBox").hide();
	$(".endTimeSelectBox").show();
}

$(".endTimeSelectBox option").click(function(){
	$(".endTimeInputBox").val($(this).text());
	$(".endTimeInputBox").show();
	$(".endTimeSelectBox").hide();
})





var currentYear = "";
var currentMonth = "";
var currentDate = "";

/* 오늘날짜 */
var dateObj = new Date();
var realyear = dateObj.getFullYear();
var realmonth = dateObj.getMonth() + 1;
var realDate = dateObj.getDate();

/* 현재 날짜 표시 ==================================*/
var dataDisplayClass = "#reservationCalendar ."+realyear+realmonth+realDate;
console.log(dataDisplayClass);
$(".selectedDateDisplay").attr("rsvDate",""+realyear+realmonth+realDate);


/* 달력 그리기 ====================================================*/  
var printCalendar = function(id, date) {
	var reservationCalendar = document.getElementById(id);
	if( typeof( date ) !== 'undefined' ) {
		date = date.split('-');
		date[1] = date[1] - 1;
		date = new Date(date[0], date[1], date[2]);
	} else {
		var date = new Date();
	}
	currentYear = date.getFullYear();
	//년도를 구함
	
	currentMonth = date.getMonth() + 1;
	//연을 구함. 월은 0부터 시작하므로 +1, 12월은 11을 출력
	
	currentDate = date.getDate();
	//오늘 일자.
	
	date.setDate(1);
	var currentDay = date.getDay();
	//이번달 1일의 요일은 출력. 0은 일요일 6은 토요일
	
	var dateString = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
	var lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if( (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 )
		lastDate[1] = 29;
	//각 달의 마지막 일을 계산, 윤년의 경우 년도가 4의 배수이고 100의 배수가 아닐 때 혹은 400의 배수일 때 2월달이 29일 임.
	
	var currentLastDate = lastDate[currentMonth-1];
	var week = Math.ceil( ( currentDay + currentLastDate ) / 7 );
	//총 몇 주인지 구함.
	
	if(currentMonth != 1)
		var prevDate = currentYear + '-' + ( currentMonth - 1 ) + '-' + currentDate;
	else
		var prevDate = ( currentYear - 1 ) + '-' + 12 + '-' + currentDate;
	//만약 이번달이 1월이라면 1년 전 12월로 출력.
	
	if(currentMonth != 12) 
		var nextDate = currentYear + '-' + ( currentMonth + 1 ) + '-' + currentDate;
	else
		var nextDate = ( currentYear + 1 ) + '-' + 1 + '-' + currentDate;
	//만약 이번달이 12월이라면 1년 후 1월로 출력.
	
	var calendar = '';
	calendar += '<div id="header">';
	calendar += '			<span><a href="#" class="button left" onclick="printCalendar(\'' +  id + '\', \'' + prevDate + '\')"><</a></span>';
	calendar += '			<span id="date">' + currentYear + '년 ' + currentMonth + '월</span>';
	calendar += '			<span><a href="#" class="button right" onclick="printCalendar(\'' + id + '\', \'' + nextDate + '\')">></a></span>';
	calendar += '		</div>';
	calendar += '		<table border="0" cellspacing="0" cellpadding="0">';
	calendar += '			<caption>' + currentYear + '년 ' + currentMonth + '월 달력</caption>';
	calendar += '			<thead>';
	calendar += '				<tr>';
	calendar += '				  <th class="sun" scope="row">SUN</th>';
	calendar += '				  <th class="mon" scope="row">MON</th>';
	calendar += '				  <th class="tue" scope="row">TUE</th>';
	calendar += '				  <th class="wed" scope="row">WED</th>';
	calendar += '				  <th class="thu" scope="row">THU</th>';
	calendar += '				  <th class="fri" scope="row">FRI</th>';
	calendar += '				  <th class="sat" scope="row">SAT</th>';
	calendar += '				</tr>';
	calendar += '			</thead>';
	calendar += '			<tbody class="' + currentYear + ' '+currentMonth+'">';
	
	var dateNum = 1 - currentDay;
	
	for(var i = 0; i < week; i++) {
		calendar += '			<tr>';
		for(var j = 0; j < 7; j++, dateNum++) {
			if( dateNum < 1 || dateNum > currentLastDate ) {
				calendar += '				<td class="' + dateString[j] + '"> </td>';
				continue;
			}
			calendar += '				<td class="' + dateString[j]+' '+currentYear+''+currentMonth+''+dateNum+'">' + dateNum + '</td>';
		}
		calendar += '			</tr>';
	}
	calendar += '			</tbody>';
	calendar += '		</table>';
	reservationCalendar.innerHTML = calendar;
	
	//$(".selectedDateDisplay").text(currentYear+"년 "+currentMonth+"월 "+currentDate+"일" );
	
	/* 날짜 선택 =====================================================*/
	$("#reservationCalendar tbody td").click(function(){
		$("td").css("border","0px")
		$(this).css("border","2px solid white")
		var selectDate = $(this).text()*1;
		dateSelector(currentYear,currentMonth,selectDate);
		$(".reservationStatusDisply").find(".reservationBody").remove();
		var clonereservationBody = $(".cloneReservationBody").find(".reservationBody").clone();
		$(".reservationStatusDisply").find("tbody").append(clonereservationBody);
		$(".reservationStatusDisply").find("td").css("background-color","#f7f6f3");
		printReservationList();
	})
	
	$(dataDisplayClass).css(
			{background:"skyblue", color:"white", border:"2px solid white"}
	);
}

printCalendar('reservationCalendar');
/* 달력 그리기 ====================================================*/  


/* 날짜 표시 ========================*/
$(".selectedDateDisplay").text(currentYear+"년 "+currentMonth+"월 "+currentDate+"일" );


var dateSelector = function(year,month,date){
	console.log(year,month,date);
	$(".selectedDateDisplay").text(year+"년 "+month+"월 "+date+"일" );
	$(".selectedDateDisplay").attr("rsvDate",""+year+month+date);
};

var showReservarionCalender = function(){
	$(".reservationDateSelector").show("slow");
	$(".selectedDateDisplay").attr("onclick","closeReservarionCalender();");
}

var closeReservarionCalender = function(){
	$(".reservationDateSelector").hide("slow");
	$(".selectedDateDisplay").attr("onclick","showReservarionCalender();");
}


/* 첫화면 미용사리스트 뽑아내기 */


/* 첫화면 리스트 뽑아내기 */
var printReservationList = function(){
	$.post(
			"/salon/reservation/list.do",
			{
				"saNo":1,
				"rsvDate":$(".selectedDateDisplay").attr("rsvDate")
			},
			function(data){
				console.log(data);
				for(var i = 0 ; i < data.length ; i ++){
					addReservation(data[i].dName, data[i].cName, data[i].style, data[i].sTime, data[i].eTime, data[i].rNo)
				}
			}
	)
}

printReservationList();







