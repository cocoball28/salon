// login check
$(document).ready(function(){
	 /* check login */
	$.get(blogPath+"/auth/checkLogin.do", function(data){
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
	 $.get(blogPath + "/salon/ajax/updateFav.do",
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
	$('.registForm').show('fast');
	var cloneImageAttachDiv = $(".cloneImageAttach").find(".imageAttachDiv").clone();
	$(".imageAttach").append(cloneImageAttachDiv);
	$(".uploadImage").hover(
		function(){
			$('.imageUploadBtn').animate({
				backgroundColor:"#d00",
				color: "#fff"		
			},150)
		},
		function(){
			$('.imageUploadBtn').animate({
				backgroundColor:"#fff",
				color: "black"		
			},150);
		}
	);
}
var cancelRegist = function(){
	$('.imagePreview').hide();
	$('.imagePreview').attr('src', "");
	$('.registForm').hide('fast');
	$(".registForm").find(".imageAttachDiv").remove();
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
//댓글 삭제 확인
var removeCommentCheck =function(target){
	var commentTr = $(target).closest("tr");
	var commentNo = $(commentTr).attr("commentno");
	var mno = $(commentTr).attr("mno");
	$("#deleteCommentModal").attr("cno",commentNo);
	$("#deleteCommentModal").attr("mno",mno);
}

//댓글 삭제
var removeComment = function(){
	var mno = $("#deleteCommentModal").attr("mno");
	var cno = $("#deleteCommentModal").attr("cno");
	
	//댓글을 지우는 함수
	var removeCommentExcute = function(){
		$.post(
				blogPath+"/blog/deleteComment.do",
				{"cno":cno},
				function(){
					$("[commentNo="+cno+"]").hide("fast");
					//commentTr.hide('slow');
				}
		);
	}
	//댓글 지우기 권한 체크
	if(blogOwner != true){
		if(mno != loginUserMno){
			alert("삭제 권한이 없습니다");
			return null;
		}else{
			removeCommentExcute();
		}
	}else{
		removeCommentExcute();
	}
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
	$(blogDiv).find(".comment_list").hide("fast");
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
	if(data.photoPath != null){
		portrait = data.photoPath;
	}else{
		portrait = "img/contents/default-portrait.png";
	}
	cloneTr.find(".commentPortrait").attr("src",portrait);
	cloneTr.attr("commentNo", data.cno);
	cloneTr.attr("mno", data.mno);
	$(blogDiv).find('table').append(cloneTr);
	commentEffectStyle();
}

var commentEffectStyle = function(){
	$(".blogCommentTr").hover(
			function(){
				$(this).find(".deleteCommentBtn").show(100);
			},
			function(){
				$(this).find(".deleteCommentBtn").hide(100);
			}
	);
};
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
				for(var i = data.blogList.length-1; i >=0 ; i--){
						addBoard(data.blogList[i]);
				}
				for(var i = 0 ; i < data.partnerInfo.length ; i++){
					addPartnerInfo(data.partnerInfo[i]);
				}
				$("#loginUserId").text(data.loginUser.nick);
				for(var i = 0; i < data.favList.length ; i ++){
					if(data.favList[i].mdno == $("#mdno").val()){
						dsnFav(data.favList[i].mdno);
					}
				}
				for(var i = 0; i < data.favList.length ; i ++){
					addFav(data.favList[i].bno);
				}
				partnerInfoEffect();
				contentControlHoverStyle();
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
$(".shopInformation").hover(
		function(){
			$('.shopInformationBanner').animate({
				backgroundColor:"#d00",
				color: "#fff"		
			},150);
			$(".shopInformation").animate({
				"background-color":"#ddd",
			},150);
		},
		function(){
			$('.shopInformationBanner').animate({
				backgroundColor:"black",
				color: "white"		
			},150);
			$(".shopInformation").animate({
				"background-color":"white",
			},150);
		}
)

var partnerInfoEffect = function(){ 
	$(".partnerInfoList").hover(
		function(){
			$(".partnerInformationBanner").animate({
				"background-color":"#d00"
			},150)
		},
		function(){
			$(".partnerInformationBanner").animate({
				"background-color":"black"
			},150)
		}
	);
	$(".partnerGeneralInfo").hover(
		function(){
			$(this).animate({
				"background-color":"#ddd",
			},150);
		},
		function(){
			$(this).animate({
				"background-color":"white",
			},150);
		}	
	);
	$(".partnerDetailInfoDiv").hover(
			function(){
				$(this).find("div").animate({
					"background-color":"#ddd",
				},150);
				$(this).find(".partnerPhoto").animate({
					opacity:"0.75",
				},150);
			},
			function(){
				$(this).find("div").animate({
					"background-color":"white",
				},150);
				$(this).find(".partnerPhoto").animate({
					opacity:"1",
				},150);
			}	
	);
	
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
var blogOwner = "";
var blogOwnerCheck = function(data){
	if(data == false){
		$("#viewRegistFormBtn").remove();
		$(".registForm").remove();
		$(".deleteMainContent").remove();
		$(".updateMainContent").remove();
		blogOwner = false;
	}else{
		$(".bookmark").find("i").remove();
		blogOwner = true;
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
	$("#mdno").val(data.mno);
	$("#hairdresserName").text(data.nick);
	var gender="";
	if(data.gender == "f"){
		gender = "FEMALE";
	}else{
		gender = "MALE";
	}
	blogDsnMno = data.mno;
	$("#hairdresserIntroduce").text(data.email+" | "+gender);
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
	clonePartnerInfo.find(".partnerDetailInfoDiv").attr("mno",data.mno);
	var gender="";
	if(data.gender == "f"){
		gender = "FEMALE";
	}else{
		gender = "MALE";
	}
	clonePartnerInfo.find(".partnerDetailInfoDiv").find(".parnerIntroduce").text(data.email+" | "+gender);
	$(".partnerInfoList").append(clonePartnerInfo);
}
/* 파트너 디자이너 정보 출력 ===============================*/


/* 파트너 디자이너 블로그로 이동 ===============================*/
var moveToPartnerBlog = function(target){
	var mno = $(target).attr("mno");
	var url = contextPath+"/blog/blog.html?mno="+mno;    
	$(location).attr('href',url);
};
/* 파트너 디자이너 블로그로 이동 ===============================*/


/* 파트너 디자이너 상세정보 열기 및 닫기 =============================*/
var viewPartnerDetailInfo = function(target){
	$(target).closest(".partnerInfo").find(".partnerDetailInfoDiv").show('fast');
	$(target).attr("onclick","closePartnerDetailInfo(this)");
}
var closePartnerDetailInfo = function(target){
	$(target).closest(".partnerInfo").find(".partnerDetailInfoDiv").hide('fast');
	$(target).attr("onclick","viewPartnerDetailInfo(this)");
}
/* 파트너 디자이너 상세정보 열기 및 닫기=============================*/




/* 블로그 글삭제 파트 ==================================*/
//확인과정
var deleteMainContentCheck = function(target){
	var blogDiv = $(target).closest(".mainContents");
	var bno = $(blogDiv).attr("blogno");
	$("#deleteMainContentModal").attr("bno",bno);
}
//확인 후 삭제
var deleteMainContent = function(target){
	var blogNo = $("#deleteMainContentModal").attr("bno");
	$.post(
			blogPath+"/blog/delete.do",
			{"bno":blogNo},
			function(){
				$(".blogMainContents").find("[blogno="+blogNo+"]").hide("fast");
				$(".blogMainContents").find("[blogno="+blogNo+"]").remove();
	});
};
/* 블로그 글삭제 파트 ==================================*/


/* 블로그 글 더보기 ===================================*/
var viewMoreMainContentList = function(){
	var lastMainContent = $(".blogMainContents").children().last();
	var bno = $(lastMainContent).attr("blogno");
	console.log(bno);
	var mno = currentViewDsnNo;
	console.log(mno);
	var moreFlag = true;
	$.post(
			blogPath+"/blog/moreList.do",
			{
				mno:mno,
				bno:bno
			},
			function(data){
				console.log(data);
				if(data.length == 0){
					$(".lastMainContentMessage").show("fast");
				}else{
					for(var i = 0 ; i < data.length ; i++){
						addBoard(data[i],moreFlag);
					}
				}
				
			}
	)
}
/* 블로그 글 더보기 ===================================*/


/* 블로그 출력 파트 =================================*/
var addBoard = function(blog, moreFlag){
	var cloneContent = $(".cloneMainContents > .mainContents").clone();
	cloneContent.attr("blogNo", blog.bno);
	var tagArr = blog.tag.split("#");
	//console.log(tagArr);
	for(var i = 0 ; i < tagArr.length; i++){
		if(tagArr[i] == ""){
			continue;
		}
		var cloneTag = $(".cloneTagDiv").find(".tagSpan").clone();
		$(cloneTag).find("a").text("#"+tagArr[i]);
		console.log($(cloneTag).find("a").text());
		cloneContent.find('.tag').append(cloneTag);
	}
	cloneContent.find('.description').html(blog.content);
	//console.log(blog.blogImageList.length);
	for(var i = 0 ; i < blog.blogImageList.length ; i ++){
		var cloneImage = $(".cloneblogImagesDiv .blogImage").clone();
		cloneImage.attr('src',blog.blogImageList[i].path);
		cloneContent.find('.blogImagesDiv').append(cloneImage)
	}
	if(blog.blogImageList.length == 0 ){
		cloneContent.find('.blogImagesDiv').remove();
	}
	if(moreFlag != null && moreFlag == true){
		$(".blogMainContents").append(cloneContent);
		contentControlHoverStyle(blog.bno);
	}else{
		$(".blogMainContents").prepend(cloneContent);
	}
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
		$(".registForm").find(".imageAttachDiv").children().eq(imageAttachStatus++).hide();
		$(".registForm").find(".imageAttachDiv").children().eq(imageAttachStatus).show();
		if(imageAttachStatus >= 5){
			$(".registForm").find(".imageAttachDiv").children().eq(imageAttachStatus).hide()
			$(".registForm").css("border","");
			prevImageOrder = 4;
			imageAttachStatus = 0;
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


/* 블로그 레지스터 ====================================*/
var registBlog = function(){
	var content = $('[name=content]').val().replace(/\n/g, '<br>')
	console.log(content);
	$('[name=content]').val(content);
	var form = $(".registForm")[0];
	var formData = new FormData(form);
	$.ajax({
	   url: blogPath+"/blog/regist.do",
	   processData: false,
	   contentType: false,
	   data: formData,
	   type: 'POST',
	   success: function(data){
		   console.log(data);
		  /* alert("성공");*/
		   addBoard(data.blog);
			$('.registForm').hide('fast');
			$("[name=tag]").val("");
			$("[name=content]").val("");
			$('.imagePreview').attr('src', "");
			$('.imagePreview').hide();
			prevImageOrder = 4;
			imageAttachStatus = 0;
			$(".registForm").find(".imageAttachDiv").remove();
			contentControlHoverStyle(data.blog.bno);
	   }
	});
}
/* 블로그 레지스터 ====================================*/

/* 버튼에 효과 -=================================*/
var contentControlHoverStyle = function(blogno){
	var target = $(".contentControlBtn");
	if(blogno != null){
		target = $("[blogno="+blogno+"]").find(".contentControlBtn");
	}
	$(target).hover(
			function(){
				$(this).animate({
					backgroundColor:"#d00",
					color: "#fff"		
				},150);
			},
			function(){
				$(this).animate({
					backgroundColor:"white",
					color: "black"		
				},150);
			}
	)
	
}

/* 스크롤 페이징  ===================================*/
$(window).scroll(function(){ 
    if($(window).scrollTop() == $(document).height() - $(window).height()){ 
    	viewMoreMainContentList();
    } 
});