//var shopPath = 'http://192.168.0.7:8008/salon';

function getContextPath(){
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
    return ctxPath;
}


var contextPath =  getContextPath();
var mno;
//login check
$(document).ready(function(){
	 /* check login */
	$.get(contextPath+"/auth/checkLogin.do", function(data){
		 if(data.data == null){
			 alert("로그인이 필요한 페이지 입니다.");
			 window.location.href = contextPath+"/auth/index.html#signin";
			 } else{ 
				 $("#dd").append(data.data.nick);
				 mno = data.data.mno;
				 $("#dd").append("<input type='hidden' id='memberNo' value="+mno+" />")
			 return true;
		 }
	});
}); 

/* parameter */
var getParameter = function(url) {
	var paramText = decodeURI(url).split("=")[1];
	return paramText;
};
var pageParam = getParameter(document.location.href);


/* favorite ==================================*/
$(document).on('click', '.bookmark', function(){
	var sano = pageParam
	var change = $(this).find(".fa");
	var from = $(this).attr("from");
	console.log("from" + from);
	var getClass = $(this).find("i").attr("class");
	var fav;
	if(getClass == "fa fa-heart"){
		fav = 0;
	}else{
		fav = 1;
	}
	 $.get(contextPath + "/salon/ajax/updateFav.do",
		{mno: mno,
		 sano: sano,
		 from: from,
		 fav: fav})
		.done(function(){
		change.toggleClass("fa-heart fa-heart-o");
	 }); 
	return false; 
});
