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
			function(data){
				console.log(data);
				addComment(blogDiv, data.comment)
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
		$.getJSON(
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
	$(blogDiv).find(".comment_list").hide("slow");
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
	$.getJSON(
			blogPath+"/blog/list.do",
			function(data){
				console.log( data.blogList);
				for(var i = 0; i < data.blogList.length ; i ++){
						addBoard(data.blogList[i]);
				}
	});
})
/* 첫 화면 출력 =================================*/

/* 보드 글삭제 파트 ==================================*/
var deleteMainContent = function(target){
	var blogDiv = $(target).closest(".mainContents");
	var blogNo = $(blogDiv).attr("blogno");
	$.getJSON(
			blogPath+"/blog/delete.do",
			{no:blogNo},
			function(){
				$(target).closest(".mainContents").hide('slow');
	});
};
/* 보드 글삭제 파트 ==================================*/


/* 보드 글쓰기 파트 ==================================*/
var registBlog = function(){
	var param = $(".registForm").serialize();
	$.getJSON(
			blogPath+"/blog/regist.do",
			param,
			function(data){
				addBoard(data.blog);
				$('.registForm').hide('slow');
				$("[name=tag]").val("");
				$("[name=content]").val("");
	});
}
/* 보드 글쓰기 파트 ==================================*/


/* 보드 출력 파트 =================================*/
var addBoard = function(blog){
	var cloneContent = $(".cloneMainContents > .mainContents").clone();
	cloneContent.attr("blogNo", blog.no);
	cloneContent.find('.tag').text(blog.tag);
	cloneContent.find('.description').text(blog.content);
	//cloneContent.find('.image').attr('src',image);
	$(".blogMainContents").prepend(cloneContent);
}
/* 보드 출력 파트 =================================*/


/* 파일 업로드 파트 ================================*/
$(function(){
    $("#uploadbutton").click(function(){
    	var formData = new FormData();
    	//첫번째 파일태그
    	formData.append("image",$("input[id=uploadImage]")[0].files[0]);
    	formData.append("no","1");
    	console.log(formData);
    	console.log(111);
            $.ajax({
               url: "/hair/blog/fileupload.do",
               processData: false,
               contentType: false,
               data: formData,
               type: 'POST',
               success: function(data){
                   alert("업로드 성공!!");
               }
           });
        });
})

//더미데이터에 임시번호 부여함, 댓글 테스트용
$(".dummyMainContent").attr("blogNo", 1);