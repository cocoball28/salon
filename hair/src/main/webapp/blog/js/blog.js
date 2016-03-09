$(".infoDiv").each(function(){
	var $window = $(window),
		$infoDiv = $(this),
		infoDivOffsetTop = $infoDiv.offset().top;
	$window.on('scroll',function(){
		if($window.scrollTop()+10 > infoDivOffsetTop){
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


var showPartnerInfoStatus = 0;
$(".partnerInfoDiv_1").hover(
		function(){
			if(showPartnerInfoStatus == 0){
				$(".partnerDetailInfoDiv_1").show('slow');
				showPartnerInfoStatus = 1;
			}
		},
		function(){
			if(showPartnerInfoStatus == 1){
				$(".partnerDetailInfoDiv_1").hide('slow');
				showPartnerInfoStatus = 0;
			}
		}
);
$(".partnerInfoDiv_2").hover(
		function(){
			$(".partnerDetailInfoDiv_2").show('slow');
		},
		function(){
			$(".partnerDetailInfoDiv_2").hide('slow');
		}
);
$(".partnerInfoDiv_3").hover(
		function(){
			$(".partnerDetailInfoDiv_3").show('slow');
		},
		function(){
			$(".partnerDetailInfoDiv_3").hide('slow');
		}
);
$(".partnerInfoDiv_4").hover(
		function(){
			$(".partnerDetailInfoDiv_4").show('slow');
		},
		function(){
			$(".partnerDetailInfoDiv_4").hide('slow');
		}
);

$(".showShopIcon").hover(
		function(){
			$('.showShopIcon').animate({opacity:0.5},200)
		},
		function(){
			$('.showShopIcon').animate({opacity:0.8},200)
		}
);

var scrolltotop = function(){
	$('html, body').animate({ scrollTop: 0 }, 'slow');
};

var viewRegistForm = function(){
	$('html, body').animate({ scrollTop: 0 }, 'slow');
	$('.registForm').show('slow');
}
var cancelRegist = function(){
	$('.registForm').hide('slow');
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
	var content = $(target).val();
	var blogDiv = $(target).closest(".mainContents");
	var blogNo = $(blogDiv).attr('blogNo');
	if(event.keyCode == 13){
		$.getJSON(
			blogPath+"/blog/registComment.do",
			{no:blogNo, content:content},
			function(){
				alert(1);
				$(data).val("");
			}
		);
	}
}


/* 댓글 입력 ==================================*/


/* 댓글 삭제 ==================================*/
var removeComment = function(data){
	var commentTr = $(data).closest("tr");
	commentTr.remove();
}
/* 댓글 삭제 ==================================*/


/* 댓글 보기 ==================================*/
var viewComments = function(target){
	var blogDiv = $(target).closest(".mainContents");
	var blogNo = $(blogDiv).attr('blogNo');
	$(blogDiv).find(".comment_list").show("fast");
		$.getJSON(
				blogPath+"/blog/listComment.do",
				{no:blogNo},
				function(data){
					console.log(data);
					for(var i = 0 ; i < data.commentList.length ; i ++){
						addComment(blogDiv, data.commentList[i]);
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
	console.log(data.commentNo);
	var cloneTr = $('#commentClone table').find("tr").clone();
	cloneTr.find(".commentContent").html(data.content);
	cloneTr.attr("commentNo", data.commentNo);
	$(blogDiv).find('table').append(cloneTr);
}
/* 댓글 출력 파트 ===============================*/







/* 첫 화면 출력 =================================*/
$(function(){
	$.getJSON(blogPath+"/blog/list.do",
		function(data){
		console.log( data.blogList);
		for(var i = 0; i < data.blogList.length ; i ++){
				addBoard(data.blogList[i]);
			}
	});
})

/* 첫 화면 출력 =================================*/





/* 글쓰기 파트 ==================================*/
$('.registForm').submit(function(){
	var param = $(this).serialize();
	$.getJSON(blogPath+"/blog/regist.do",
			param,
			function(data){
				addBoard(data.blog);
				$('.registForm').hide('slow');
				$("[name=tag]").val("");
				$("[name=content]").val("");
	});
	return false;
})
/* 글쓰기 파트 ==================================*/



/* 보드 출력 파트 =================================*/
var addBoard = function(blog){
	var cloneContent = $(".cloneMainContents > .mainContents").clone();
	cloneContent.attr("blogNo", blog.no);
	cloneContent.find('.tag').text(blog.tag);
	cloneContent.find('.description').text(blog.content);
	//cloneContent.find('.image').attr('src',image);
	$(".blogMainContents").prepend(cloneContent);
}
/* 출력 파트 =================================*/




function readUploadImage( inputObject ) {
	if ( window.File && window.FileReader ) {
		if ( inputObject.files && inputObject.files[0]) {
			if ( !(/image/i).test(inputObject.files[0].type ) ){
				alert("이미지 파일을 선택해 주세요!");
				return false;
			}
			var reader = new FileReader();
			reader.onload = function (e) {
				$('#imagePreview').attr('src', e.target.result);
			}
			reader.readAsDataURL(inputObject.files[0]);
		}
	} else {

		alert( "미리보기 안되요.~ 브라우저를 업그레이드하세요~");
	}
}

$("#uploadImage").change(function(){
    readUploadImage(this);
});

//더미데이터에 임시번호 부여함, 댓글 테스트용
$(".dummyMainContent").attr("blogNo", 1);