// 왼쪽 정보창 떠다니게 하기
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


// 동료 미용사 정보 
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
	var content = $(target).val();
	if(event.keyCode == 13){
		$.post(
			blogPath+"/blog/registComment.do",
			{no:blogNo, content:content},
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
				{commentNo:commentNo},
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
	$(blogDiv).find(".comment_list").show("fast");
		$.post(
				blogPath+"/blog/listComment.do",
				{no:blogNo},
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
	$(blogDiv).find(".comment_list").hide("slow");
	$(blogDiv).find('table tr').remove();
	$(target).attr('onclick','viewComments(this)');
};
/* 댓글 닫기 ==================================*/


/* 댓글 출력 파트 ===============================*/
var addComment = function(blogDiv, data){
	var cloneTr = $('#commentClone table').find("tr").clone();
	cloneTr.find(".commentContent").html(data.content);
	cloneTr.attr("commentNo", data.commentNo);
	$(blogDiv).find('table').append(cloneTr);
}
/* 댓글 출력 파트 ===============================*/


/* 첫 화면 출력 =================================*/
$(function(){
	$.post(
			blogPath+"/blog/list.do",
			function(data){
				console.log(data);
				for(var i = 0; i < data.length ; i ++){
						addBoard(data[i]);
				}
	});
})
/* 첫 화면 출력 =================================*/

/* 블로그 글삭제 파트 ==================================*/
var deleteMainContent = function(target){
	var blogDiv = $(target).closest(".mainContents");
	var blogNo = $(blogDiv).attr("blogno");
	$.post(
			blogPath+"/blog/delete.do",
			{no:blogNo},
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
		   alert("성공");
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
	cloneContent.attr("blogNo", blog.no);
	cloneContent.find('.tag').text(blog.tag);
	cloneContent.find('.description').text(blog.content);
	//console.log(blog.blogImageList.length);
	for(var i = 0 ; i < blog.blogImageList.length ; i ++){
		var cloneImage = $(".cloneblogImagesDiv .blogImage").clone();
		cloneImage.attr('src',blog.blogImageList[i].fileName);
		cloneContent.find('.blogImagesDiv').append(cloneImage)
	}
	if(blog.blogImageList.length == 0 ){
		cloneContent.find('.blogImagesDiv').remove();
	}
	$(".blogMainContents").prepend(cloneContent);
}
/* 블로그 출력 파트 =================================*/


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

$(".header").load(contextPath+"/header/header.html .header");