// login check
$(document).ready(function(){
	 /* check login */
	$.get("/hair2/auth/checkLogin.do", function(data){
		 if(data.data == null){
			 alert("로그인이 필요한 페이지 입니다.");
			 window.location.href = contextPath+"/auth/index.html#signin";
			 } else{ 
				 $("#dd").append(data.data.nick);
				 $("#dd").append("<input type='hidden' id='memberNo' value="+data.data.mno+" />")
			 return true;
		 }
	});
		
}); 

/* favorite ==================================*/
$(document).on('click', '.bookmark', function(){
	var mno = $("#dd").find("#memberNo").val();
	var mdno = $("#mdno").val();
	var bno	=$(this).closest(".mainContents").attr("blogNo");
	var from = $(this).attr("from")
	console.log("from" + from);
	var change = $(this).find(".fa");
	var getClass = $(this).find("i").attr("class");
	var fav;
	if(getClass == "fa fa-heart"){
		fav = 0;
	}else{
		fav = 1;
	}
	 $.get("/hair2/salon/ajax/updateFav.do",
		{mno: mno,
		 mdno: mdno,
		 bno: bno,
		 from: from,
		 fav: fav})
		.done(function(){
		change.toggleClass("fa-heart fa-heart-o");
	 }); 
	return false; 
});

// 현재 들어온 페이지 번호
var currentViewDsnNo = $(location).attr('search').split("=")[1];
console.log(currentViewDsnNo);


// 왼쪽 정보창 떠다니게 하기
$(".infoDiv").each(function(){
	var $window = $(window),
		$infoDiv = $(this),
		infoDivOffsetTop = $infoDiv.offset().top;
	$window.on('scroll',function(){
		if($window.scrollTop() +65> infoDivOffsetTop){
			$infoDiv.addClass('sticky');
			$(".infoDivDummy").show();
		}else{
			$infoDiv.removeClass('sticky');
			$(".infoDivDummy").hide();
		}	
	});
	$window.trigger('scroll');
});


$(".repImg").each(function(){
	var $window = $(window),
	$repImg = $(this),
	repImgOffsetTop = $repImg.offset().top;
	$window.on('scroll',function(){
		if($window.scrollTop() > repImgOffsetTop -100){
			$repImg.addClass('stickyElse');
		}else{
			$repImg.removeClass('stickyElse');
		}	
	});
	$window.trigger('scroll');
});

var showDetail = function() {
	$("#shopDetail").show("fast");
};
var closeDetail = function() {
	$("#shopDetail").hide("fast");
};
var showMessage = function(){
	$(".message").show("fast");
}
var closeMessage = function(){
	$(".message").hide("fast");
}




/*$(".comment_hover").hover(
	function(){
		$('.comment_hover').find(".deleteCommentBtn").show();
	},
	function(){
		$(".deleteCommentBtn").hide();
	}
);*/


// 동료 미용사 정보 
/*
var isAnimate = false;
$(".partnerInfo").mouseenter(function(e){
	e.stopPropagation();
	if (isAnimate == true) return;
	isAnimate = true;
	$(this).next().show('slow', function() {
		isAnimate = false;
	});
});

$(".partnerInfo").mouseout(function(e){
	$(this).next().hide('slow');
});
*/



$(".showShopIcon").hover(
		function(){
			$('.showShopIcon').animate({opacity:0.7},200)
		},
		function(){
			$('.showShopIcon').animate({opacity:0.8},200)
		}
);

var scrolltotop = function(){
	$('html, body').animate({ scrollTop: 0 }, 'slow');
};

var viewRegistForm = function(){
	$('html, body').animate({ scrollTop: 284 }, 'slow');
	$('.registForm').show('slow');
}
var cancelRegist = function(){
	$('.imagePreview').hide();
	$('.imagePreview').attr('src', "");
	$('.registForm').hide('slow');
	$("input[id=uploadImage]").val("");
}
var likePush = function(data){
	$(data).animate({opacity:1},500)
	$(data).attr('onclick','likePull(this)');
	
}
var likePull = function(data){
	$(data).animate({opacity:0.3},500)
	$(data).attr('onclick','likePush(this)');
}


/* 댓글 입력 ==================================*/
var registComment = function(target){
	var blogNo = $(target).closest(".mainContents").attr("blogNo");
	var content = $(target).val();
	var blogDiv = $(target).closest(".comment_list");
	if(event.keyCode == 13){
		$.post(
			blogPath+"/blog/registComment.do",
			{"bno":blogNo, content:content},
			function(data){
				console.log(data);
				addComment(blogDiv, data)
				$(target).val("");
			}
		);
	}
}
/* 댓글 입력 ==================================*/


/* 댓글 삭제 ==================================*/
var removeComment = function(target){
	var commentTr = $(target).closest("tr");
	var commentNo = $(commentTr).attr("commentno");
		$.post(
				blogPath+"/blog/deleteComment.do",
				{"cno":commentNo},
				function(){
					commentTr.hide('slow');
				}
		);
}
/* 댓글 삭제 ==================================*/


/* 댓글 보기 ==================================*/
var viewComments = function(target){
	var blogDiv = $(target).closest(".mainContents");
	var blogNo = $(blogDiv).attr('blogNo');
	console.log("blogno :" + blogNo)
	$(blogDiv).find(".comment_list").show("fast");
		$.post(
				blogPath+"/blog/listComment.do",
				{"bno":blogNo},
				function(data){
					console.log("댓글 데이터:"+data);
					for(var i = 0 ; i < data.length ; i ++){
						addComment(blogDiv, data[i]);
					};
				}
		);
	$(target).attr('onclick','closeComments(this)');
};
/* 댓글 보기 ==================================*/


/* 댓글 닫기 ==================================*/
var closeComments = function(target){
	var blogDiv = $(target).closest(".mainContents");
	$(blogDiv).find(".comment_list").hide("slow");
	$(blogDiv).find('table tr').remove();
	$(target).attr('onclick','viewComments(this)');
};
/* 댓글 닫기 ==================================*/


/* 댓글 출력 파트 ===============================*/
var addComment = function(blogDiv, data){
	console.log(data);
	var cloneTr = $('#commentClone table').find("tr").clone();
	cloneTr.find(".commentContent").html(data.content);
	cloneTr.find(".commentNick").html(data.nick);
	var portrait = "";
	if(data.phothPath != null){
		portrait = data.photoPath;
	}else{
		portrait = "img/contents/default-portrait.png";
	}
	cloneTr.find(".commentPortrait").attr("src",portrait);
	cloneTr.attr("commentNo", data.cno);
	$(blogDiv).find('table').append(cloneTr);
}
/* 댓글 출력 파트 ===============================*/


/* 첫 화면 출력 =================================*/
$(function(){
	$.post(
			blogPath+"/blog/list.do",
			{"mno":currentViewDsnNo},
			function(data){
				console.log("블로그 화면 출력");
				console.log(data);
				insertShopInfo(data.shopInfo);
				blogOwnerCheck(data.myBlogFlag);
				printDsnInfo(data.dsnInfo);	
				for(var i = 0; i < data.blogList.length ; i ++){
						addBoard(data.blogList[i]);
				}
				for(var i = 0; i < data.favList.length ; i ++){
					if(data.favList[i].mdno == $("#mdno").val()){
						dsnFav(data.favList[i].mdno);
					}
				}
				for(var i = 0; i < data.favList.length ; i ++){
					addFav(data.favList[i].bno);
				}
				for(var i = 0 ; i < data.partnerInfo.length ; i++){
					addPartnerInfo(data.partnerInfo[i]);
				}
				$("#loginUserId").text(data.loginUser.nick);
	});
})
/* 첫 화면 출력 =================================*/


/* 미용실 정보 출력*/
var insertShopInfo = function(data){
	$(".shopName").text(data.name);
	$(".shopTelephoneNumber").text(data.tel);
	$(".shopAddr").text(data.addr);
	$(".shopInformation").attr("sano",data.sano)
}
/* 미용실 정보 출력*/


/* 미용실로 이동 ================================*/
var moveToShopService = function(target){
	var sano = $(target).attr("sano");
	var url = contextPath+"/shop/shop.html?sano="+sano;    
	$(location).attr('href',url);
}
/* 미용실로 이동 ================================*/


/* 디자이너 본인 여부 확인 ===========================*/
var blogOwnerCheck = function(data){
	if(data == false){
		$("#viewRegistFormBtn").remove();
		$(".registForm").remove();
		$(".deleteMainContent").remove();
	}
}
/* 디자이너 본인 여부 확인 ===========================*/


/* 디자이너 정보 출력 =============================*/
var blogDsnNick = "";
var blogDsnMno = "";
var printDsnInfo = function(data){
	if(data.photoPath == null){
		$("#hairdresserPhoto").attr("src","img/contents/default-portrait.png");
	}else{
		$("#hairdresserPhoto").attr("src",data.photoPath);
	}
	$("#hairdresserName").text(data.nick);
	var gender="";
	if(data.gender == "f"){
		gender = "female";
	}else{
		gender = "male";
	}
	blogDsnMno = data.mno;
	$("#hairdresserIntroduce").text(data.email+", "+data.nick+", "+gender);
};
/* 디자이너 정보 출력 =============================*/

var dsnFav = function(mdno){
	$(".infoDiv").find(".fa").toggleClass("fa-heart fa-heart-o");
}


/* 파트너 디자이너 정보 출력 ================================*/
var addPartnerInfo = function(data){
	if(data.mno == blogDsnMno){
		return null;
	}
	var clonePartnerInfo = $(".clonePartnerInfoList").find(".partnerInfo").clone();
	if(data.photoPath != null){
		clonePartnerInfo.find(".partnerGeneralInfo").find(".partnerPhoto").attr("src",data.photoPath);
		clonePartnerInfo.find(".partnerDetailInfoDiv").find(".partnerPhoto").attr("src",data.photoPath);
	}
	clonePartnerInfo.find(".partnerGeneralInfo").find(".partnerName").text(data.nick);
	clonePartnerInfo.find(".partnerDetailInfoDiv").find(".partnerName").text(data.nick);
	var gender="";
	if(data.gender == "f"){
		gender = "female";
	}else{
		gender = "male";
	}
	clonePartnerInfo.find(".partnerDetailInfoDiv").find(".parnerIntroduce").text(data.email+", "+data.nick+", "+gender);
	$(".partnerInfoList").append(clonePartnerInfo);
}
/* 파트너 디자이너 정보 출력 ===============================*/



/* 파트너 디자이너 상세정보 열기 및 닫기 =============================*/
var viewPartnerDetailInfo = function(target){
	$(target).closest(".partnerInfo").find(".partnerDetailInfoDiv").show('slow');
	$(target).attr("onclick","closePartnerDetailInfo(this)");
}
var closePartnerDetailInfo = function(target){
	$(target).closest(".partnerInfo").find(".partnerDetailInfoDiv").hide('slow');
	$(target).attr("onclick","viewPartnerDetailInfo(this)");
}
/* 파트너 디자이너 상세정보 열기 및 닫기=============================*/


/* 블로그 글삭제 파트 ==================================*/
var deleteMainContent = function(target){
	var blogDiv = $(target).closest(".mainContents");
	var blogNo = $(blogDiv).attr("blogno");
	$.post(
			blogPath+"/blog/delete.do",
			{"bno":blogNo},
			function(){
				$(target).closest(".mainContents").hide('slow');
	});
};
/* 블로그 글삭제 파트 ==================================*/


/* 블로그 레지스터 ====================================*/
var registBlog = function(){
	var form = $(".registForm")[0];
	var formData = new FormData(form);
	$.ajax({
	   url: blogPath+"/blog/regist.do",
	   processData: false,
	   contentType: false,
	   data: formData,
	   type: 'POST',
	   success: function(data){
		   //console.log(data);
		  /* alert("성공");*/
		   addBoard(data.blog, data.blogImageList);
			$('.registForm').hide('slow');
			$("[name=tag]").val("");
			$("[name=content]").val("");
			$('.imagePreview').attr('src', "");
			$('.imagePreview').hide();
			$("input[id=uploadImage]").val("");
	   }
	});
}
/* 블로그 레지스터 ====================================*/


/* 블로그 출력 파트 =================================*/
var addBoard = function(blog){
	var cloneContent = $(".cloneMainContents > .mainContents").clone();
	cloneContent.attr("blogNo", blog.bno);
	cloneContent.find('.tag').text(blog.tag);
	cloneContent.find('.description').text(blog.content);
	//console.log(blog.blogImageList.length);
	for(var i = 0 ; i < blog.blogImageList.length ; i ++){
		var cloneImage = $(".cloneblogImagesDiv .blogImage").clone();
		cloneImage.attr('src',blog.blogImageList[i].path);
		cloneContent.find('.blogImagesDiv').append(cloneImage)
	}
	if(blog.blogImageList.length == 0 ){
		cloneContent.find('.blogImagesDiv').remove();
	}
	$(".blogMainContents").prepend(cloneContent);
}
/* 블로그 출력 파트 =================================*/

var addFav = function(favList){
	$("[blogNo="+favList+"]").find(".fa").toggleClass("fa-heart fa-heart-o");
}

/* 블로그 이미지 업로드 미리보기 ======================== */
var prevImageOrder = 4;
var imageAttachStatus = 0;
var imageAttach = function(target){
		readURL(target);
		$(".imageAttach").children().eq(imageAttachStatus++).hide();
		$(".imageAttach").children().eq(imageAttachStatus).show();
		if(imageAttachStatus >= 5){
			$(".imageAttach").children().eq(imageAttachStatus).hide()
		}
}

var readURL = function(input) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
    	var previewImage = $('.imagePreviewDiv').children().eq(prevImageOrder--);
    	previewImage.attr('src', e.target.result);
        previewImage.show();
        }
      reader.readAsDataURL(input.files[0]);
    }
}
/* 블로그 이미지 업로드 미리보기 ========================*/


//더미데이터에 임시번호 부여함, 댓글 테스트용
$(".dummyMainContent").attr("blogNo", 1);


