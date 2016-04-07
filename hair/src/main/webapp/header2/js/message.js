//컨텍스트 패스
function getContextPath(){
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
    return ctxPath;
}
var contextPath =  getContextPath();


//현재 로그인 되어있는 유저 닉네임 출력
var loginUserNickName = "";
var loginUserMno = "";
var loginUserPhoto = "";

var messageInit = function(){
	$.post(
		contextPath+"/message/loginUserInfo.do",
		function(data){
			console.log("로그인유저정보:");
			console.log(data);
			loginUserNickName = data.nick;
			loginUserMno = data.mno;
			loginUserPhoto = data.photoPath;
			console.log(loginUserPhoto);
			console.log(loginUserNickName);
			
			/*$(".loginUserNameDisply").text(loginUserNickName);*/
		}
	)
}
messageInit();

//메시지창 열기
var messageOpen = function(){
	//$('.messageContents').animate({ scrollTop: 1000 }, 'slow');
	$(".messageMemberList").show("fast");
	$(".loginUserNickName").text(loginUserNickName);
	$.post(
			contextPath+"/message/favShopList.do",
			{mno:loginUserMno},
			function(data){
				$(".favShopList").html("");
				$(".searchDsnList").html("");
				console.log(data);
				for(var i = 0 ; i < data.length ; i++){
					addFavShopList(data[i]);
				}
			}
	)
	/*$(".tempFullScreen").show();*/
};


//즐겨찾기 빠른 메시지를 위한 미용실리스트
var addFavShopList = function(data){
	var cloneFavShopDiv = $(".cloenFavShopList").find(".dsnMemberDiv").clone();
	$(cloneFavShopDiv).find(".shopName").text(data.name);
	$(".favShopList").append(cloneFavShopDiv);
}


//메시지창 닫기
var messageClose = function(){
	$(".messageMemberList").hide("slow");
	$(".messageBox").hide("slow");
	$(".messageContents").text("");
	$(".tempFullScreen").show();
};

//보낸 메시지 채팅창에 출력
var addMyMessage = function(data){
	var cloneSendMessage = $(".messageClone").find(".sendMessage").clone();
	$(cloneSendMessage).find(".sendMessageContent").text(data.content);
	$(cloneSendMessage).attr("messageNo",data.messageNo);
	$(".messageContents").append(cloneSendMessage);
	$(cloneSendMessage).show('slow');
};

//받은 메시지 채팅창에 출력
var addReceiveMessage = function(data){
	var cloneReceiveMessage = $(".messageClone").find(".receiveMessage").clone();
	$(cloneReceiveMessage).find(".reciveMessageContent").text(data.content);
	$(cloneReceiveMessage).find(".reciveMessageName").text(data.smnick);
	$(cloneReceiveMessage).find(".reciveMessagePhoto").find("img").attr("src",data.pho);
	$(cloneReceiveMessage).attr("messageNo",data.messageNo);
	$(".messageContents").append(cloneReceiveMessage);
	$(cloneReceiveMessage).show('slow');
}

var dsnSearchMode = function(){
	$(".favShopList").hide();
	$(".favDsnMessageMode").hide();
	$(".dsnSearchMode").show();
	$(".searchDsn").show();
	$(".favDsnList").hide();
}

var favDsnMessageMode = function(){
	$(".favShopList").show();
	$(".favDsnMessageMode").show();
	$(".dsnSearchMode").hide();
	$(".favDsnList").show();
	$(".searchDsn").hide();
	$(".searchMemberList").val("");
	$(".searchDsnList").html("");
}

//채팅대상 이름 검색
var searchMemberList = function(target){
	$(".searchDsnList").html("");
	var nickName = $(target).val();
	if(nickName.length > 1){
		$.post(
				contextPath+"/message/memberList.do",
				{"nick":nickName},
				function(data){
					console.log(data);
					for(var i = 0; i < data.length ; i ++){
						addDsnInfoList(data[i]);
					}
				}
		);
	}
}



//채팅대상리스트 출력
var addDsnInfoList = function(data){
	var cloneDsnMemberDiv = $(".cloneFavDsnList").find(".dsnMemberDiv").clone();
	cloneDsnMemberDiv.attr("mno",data.mno);
	if(data.photoPath != null){
		cloneDsnMemberDiv.find(".dsnPhoto").attr("src",data.photoPath);
	}
	cloneDsnMemberDiv.find(".dsnNickName").text(data.nick);
	$(".searchDsnList").append(cloneDsnMemberDiv);
};

//메신저창 열기
var messageBegin = function(target){
	//채팅대상 이름 지정
	var targetUserNickName = $(target).find(".dsnNickName").text();
	var mno = 5;
	if(target != null){
		var mno = $(target).attr("mno");
	}
	$(".messageMemberList").hide('slow');
	$(".messageBox").show("slow");
	if(targetUserNickName == ""){
		targetUserNickName = "Bruce";
	}
	$(".messageRoomName").text(loginUserNickName + " + " + targetUserNickName);
	loadMessageList();
}

//알람으로 받은 메시지창 열기
var alramMessageBegin = function(target){
	//채팅대상 이름 지정
	var targetUserNickName = $(target).find(".senderName").text();
	targetUserMno = $(target).attr("smno");
	$(".messageBox").show("fast");
	$(".messageRoomName").text(loginUserNickName + " + " + targetUserNickName);
	loadMessageList(targetUserMno);
}

//메신저창에 대화 불러오기
var loadMessageList = function(targetUserMno){
	$.post(
			contextPath+"/message/list.do",
			{rmno:targetUserMno, smno:loginUserMno},
			function(data) {
				for(var i = data.length-1 ; i >= 0 ; i--){
					if(data[i].smno == loginUserMno){
						addMyMessage(data[i]);
					}else{
						addReceiveMessage(data[i]);
					}
				}
				var readMore =  $(".cloneReadMoreMessage").find(".readMoreMessage").clone();
				$(".messageContents").prepend(readMore);
		  });
};


//메시지 보내기
var sendMessage = function(target){
	var content = $(target).val();
	if(content == ""){
		return null;
	}
	
	//node.js
	
	if(event.keyCode == 13){
		$.ajax({
			   url: "http://192.168.0.10:3000/sendMsg?callback=?&smno=" + loginUserMno + "&rmno=" + targetUserMno+"&content="+content,
			   processData: false,
			   contentType: false,
			   type: 'GET'
		});
		console.log(loginUserPhoto);
		console.log(loginUserNickName);
		var data = {content:content, rmno:targetUserMno, smno:loginUserMno, smpho:loginUserPhoto, smnick:loginUserNickName}
		socket.emit('fromClient',data);
		addMyMessage(data);
		$(target).val("");
		$('.messageContents').animate({ scrollTop: 100000 }, 'slow');
	}
	
	
};

//node.js
//소켓 생성

var socket = io.connect('http://192.168.0.10:3000');
	socket.on('toClient',function(data){
		console.log(data);
    if(data.rmno == loginUserMno){
    	console.log(data.content);
    	addReceiveMessage(data);
    	var cloneAlram = $(".cloneDisplayMessageAlarm").find(".displayMessageAlarm").clone();
    	$(cloneAlram).find(".senderName").text(data.smnick);
    	if(data.smpho != null){
    		$(cloneAlram).find(".senderPhoto").attr("src",data.smpho);
    	}
    	$(cloneAlram).attr("smno",data.smno);
    	$(".alramDiv").append(cloneAlram);
    	$(cloneAlram).show('fast');
    	
    	//지정된 시간 후에 실행하는 함수
    	setTimeout(function() {
    		setTimeout(function(){
    			$(cloneAlram).remove();
    		},1000)
    		$(cloneAlram).hide('fast');
    	}, 4000);
    	
    }
    $('.messageContents').animate({ scrollTop: 100000 }, 'slow');
});



//메시지 더 보기 버튼
var readMoreMessage = function(target){
	var firstMessageNo = $(target).next("div").attr("messageNo");
	$(target).remove();
	loadMoreMessageList();
	console.log(readMessageCount);
};

// 메시지 더 보기 함수
var readMessageCount = 5;
var loadMoreMessageList = function(firstMessageNo){
	var readMore = true;
	$.post(
			contextPath+"/message/moreList.do",
			{rmno:targetUserMno, smno:loginUserMno, messageNo:readMessageCount},
			function(data) {
				console.log(data);
				for(var i = data.length-1 ; i >= 0 ; i--){
					if(data[i].smno == loginUserMno){
						addMoreMyMessage(data[i]);
					}else{
						addMoreReceiveMessage(data[i]);
					}
				}
				var readMore =  $(".cloneReadMoreMessage").find(".readMoreMessage").clone();
				$(".messageContents").prepend(readMore);
				readMessageCount+=10;
			  //console.log(data);
		  });
};

//더 보기
var addMoreMyMessage = function(data){
	var cloneSendMessage = $(".messageClone").find(".sendMessage").clone();
	$(cloneSendMessage).find(".sendMessageContent").text(data.content);
	$(cloneSendMessage).attr("messageNo",data.messageNo);
	$(".messageContents").prepend(cloneSendMessage);
	$(cloneSendMessage).show();
};

var addMoreReceiveMessage = function(data){
	var cloneReceiveMessage = $(".messageClone").find(".receiveMessage").clone();
	$(cloneReceiveMessage).find(".reciveMessageContent").text(data.content);
	$(cloneReceiveMessage).find(".reciveMessageName").text(data.senderNick);
	$(cloneReceiveMessage).attr("messageNo",data.messageNo);
	$(".messageContents").prepend(cloneReceiveMessage);
	$(cloneReceiveMessage).show();
}

var reservationToMessenger = function(target){
	//messageInit();
	$(".messageBox").show("fast");
	var managerNo = $(target).attr("managerNo")
	var managerNick = $(target).attr("managerNick")
	var shopName = $(target).attr("shopName")
	console.log(managerNo, managerNick, shopName);
	$(".messageRoomName").text(loginUserNickName+" + "+shopName+"/"+managerNick);
	targetUserMno = managerNo;
	
}