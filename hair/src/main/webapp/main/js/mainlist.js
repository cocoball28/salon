 function getContextPath(){
	    var offset=location.href.indexOf(location.host)+location.host.length;
	    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
	    return ctxPath;
	}

	var contextPath =  getContextPath();
	
	 /* check login */
	$(document).ready(function(){
		 /* check login */
		$.get(contextPath+"/auth/checkLogin.do", function(data){
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
	
	/* header */
	$(".header").load(contextPath+"/header2/header.html .header");
		 
	 
	/* add bookmark */
	$(document).on('click', '.bookmark', function(){
		var bno = $(this).closest('.wf-box').find("[type=hidden]").val();
		var mno = $("#dd").find("#memberNo").val();
		var mdno;
		var sano;
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
		 $.get(contextPath+"/salon/ajax/updateFav.do",
			{mno: mno,
			 bno: bno,
			 from: from,
			 fav: fav})
			.done(function(){
			change.toggleClass("fa-heart fa-heart-o");
		 }); 
		return false; 
	});


/* list ajax */
	$(document).ready(function(){
	  $.getJSON( contextPath+"/salon/ajax/list.do", function(resultObj) {
		   var cnt = 0;
		   console.log(resultObj);
		   $.each(resultObj.mList, function(key, value){
				var html = ""
				html += '<div style="background:white;" class="wf-box '+ value.bno +'">'; 
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
				html += '<a class="bookmark" from="blog">';
				html += '<i class="fa fa-heart-o"></i>'
				html += '</a>';
				html += '</div></div></div>';
				$(".wf-column:eq("+cnt+")").append(html);
				cnt++;
				if(cnt == 5) cnt = 0;
		  });
		   $.each(resultObj.favList, function(key, value){
			   var no = value.bno;
			   $("." + no).find(".fa").toggleClass("fa-heart fa-heart-o");
		   })
		   if(resultObj.member.status == "u"){
			   $("#myHomeLi").css("display", "block")
			   $("#myHomeA").attr("href", contextPath+"/blog/blog.html?no="+resultObj.member.mno)
		   }
	});
	})
	
	/* scroll */
	var page = 1;
	$(window).scroll(function() {
		var maxHeight = $(document).height();
		var currentScroll = $(window).scrollTop() + $(window).height();
		if (maxHeight-30 <= currentScroll) {
			page++;
			$.getJSON( contextPath+"/salon/ajax/list.do",{pageNo : page}, function(resultObj) {
					console.log(resultObj);
				   var cnt = 0;
				   $.each(resultObj.mList, function(key, value){
					   var html = ""
							html += '<div style="background:white;" class="wf-box '+ value.bno +'">'; 
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
							html += '<a class="bookmark" from="blog">';
							html += '<i class="fa fa-heart-o"></i>'
							html += '</a>';
							html += '</div></div></div>';
							$(".wf-column:eq("+cnt+")").append(html);
							cnt++;
							if(cnt == 5) cnt = 0;
				  }) 
				  $.each(resultObj.favList, function(key, value){
					   var no = value.bno;
					   $("." + no).find(".fa").toggleClass("fa-heart fa-heart-o");
				   })
				   
				   if(resultObj.member.status == "u"){
					   $("#myHomeLi").css("display", "block")
					   $("#myHomeA").attr("href", contextPath+"/blog/blog.html?no="+resultObj.member.mno)
				   } 
				 
			});
			
		} 
	});
	
	
	
