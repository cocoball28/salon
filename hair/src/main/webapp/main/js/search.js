 function getContextPath(){
	    var offset=location.href.indexOf(location.host)+location.host.length;
	    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
	    return ctxPath;
	}

	var contextPath =  getContextPath();
	
	/* header */
	$(".header").load(contextPath+"/header2/header.html .header");
		
	$(document).ready(function(){
		 /* check login */
		$.get("/hair2/auth/checkLogin.do", function(data){
			 if(data.data == null){
				 alert("로그인이 필요한 페이지 입니다.");
				 window.location.href = contextPath+"/auth/login.html#signin";
				 } else{ 
					 $("#dd").append(data.data.nick);
					 $("#dd").append("<input type='hidden' id='memberNo' value="+data.data.mno+" />")
				 return true;
			 }
		});
			
	});
	 
	/* add bookmark */
	$(document).on('click', '.bookmark', function(){
		var bno = $(this).closest('.wf-box').find("[type=hidden]").val();
		var mno = $("#dd").find("#memberNo").val();
		var change = $(this).find(".fa");
		var getClass = $(this).find("i").attr("class");
		console.log("class : "+ getClass)
		var fav;
		if(getClass == "fa fa-heart-o"){
			fav = 1;
		}else{
			fav = 0;
		}
		 $.get("/hair2/salon/ajax/updateFav.do",
			{bno: bno,
			 mno: mno,
			 fav: fav})
			.done(function(){
			change.toggleClass("fa-heart fa-heart-o");
		 }); 
		return false; 
	});
	
	
      /*nextPage(1, pageParam);
        $(window).scroll(function(){
           var scrollHeight = $(window).scrollTop() + $(window).height();
           var documentHeight = $(document).height();
           if(scrollHeight >= documentHeight -150){
              console.log('스크롤 이벤트 발생');
              var pageNo = Number($('#pageNo').text()) +1;
              nextPage(pageNo, pageParam);
           }
        });*/

	
	/* parameter */
	var getParameter = function(url) {
		var paramText = decodeURI(url).split("?")[1];
		return paramText;
	};
	var pageParam = getParameter(document.location.href);
    
	
	/* search list */
      $("#searchBar").val(pageParam);
		$.getJSON(contextPath+"/salon/ajax/search.do",{result:pageParam},function(resultObj){
			var cnt = 0;
			console.log(resultObj);
			   $.each(resultObj.data, function(key, value){
				    var html = ""
					html += '<div style="background:white;" class="wf-box">'; 
					html += '<a class="detail" href="'+ contextPath +'/blog/blog.html?no='+value.mno+'">';
					if(value.blogImageList.length != 0){	
						html += '<image src='+value.blogImageList[0].path+'/></a>';
					}else{
						html += '<image src="images/user.png"/></a>';
					}
					html += '<div class="content">';
					html += '<h3>'+value.tag+'</h3>';
					html += '<hr>';
					html += '<p style="max-height:40px; overflow:hidden;">'+value.content+'</p>';
					html += '<input type="hidden" class="contentNo" value='+value.bno+' />'
					html += '<div class="optionDiv">'
					html += '<a class="bookmark">';
					if(value.fav == 1){
						html += '<i class="fa fa-heart"></i>'
					}else{
						html += '<i class="fa fa-heart-o"></i>'
					}
					html += '</a>';
					html += '</div></div></div>';
					$(".wf-column:eq("+cnt+")").append(html);
					cnt++;
					if(cnt == 5) cnt = 0;
			  });
		})
	
	/* scroll */
	var page = 1;
	$(document).scroll(function() {
		maxHeight = $(document).height();
		currentScroll = $(window).scrollTop() + $(window).height();
		var mno = $("#dd").find("#memberNo").val();
		if (maxHeight <= currentScroll) {
			page++;
			$.getJSON( ""+contextPath+"/salon/ajax/favBlog.do"+"",{mno:mno, pageNo : page}, function(resultObj) {
				   var cnt = 0;
				   $.each(resultObj.favBlog, function(key, value){
					    var html = ""
						html += '<div class="wf-box">'; 
						html += '<a class="detail" href="'+ contextPath +'/blog/blog.html?no='+value.mno+'">';
						if(value.blogImageList.length != 0){	
							html += '<image src='+value.blogImageList[0].path+'/></a>';
						}else{
							html += '<image src="images/user.png"/></a>';
						}
						html += '<div class="content">';
						html += '<h3>'+value.tag+'</h3>';
						html += '<hr>';
						html += '<p style="max-height:40px; overflow:hidden;">'+value.content+'</p>';
						html += '<input type="hidden" class="contentNo" value='+value.no+' />'
						html += '<div class="optionDiv">'
						html += '<a class="bookmark">';
						if(value.fav == 1){
							html += '<i class="fa fa-heart"></i>'
						}else{
							html += '<i class="fa fa-heart-o"></i>'
						}
						html += '</a>';
						html += '</div></div></div>';
						$(".wf-column:eq("+cnt+")").append(html);
						cnt++;
						if(cnt == 5) cnt = 0;
				  }) 
				 
			});
			
		}
	});
