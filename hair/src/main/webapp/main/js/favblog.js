 function getContextPath(){
	    var offset=location.href.indexOf(location.host)+location.host.length;
	    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
	    return ctxPath;
	}

	var contextPath =  getContextPath();
	
	/* header */
	$(".header").load(contextPath+"/header2/header.html .header");
	 /* check login */
	$.get(contextPath+"/auth/checkLogin.do", function(data){
		 if(data.data == null){
			 alert("로그인이 필요한 페이지 입니다.");
			 window.location.href = contextPath+"/auth/index.html#signin";
			 } else{ 
				 $("#dd").append(data.data.nick);
				 $("#dd").append("<input type='hidden' id='memberNo' value="+data.data.mno+" />")
				 list(data.data.mno);
			 return true;
		 }
	});
			
	 
	/* add bookmark */
	$(document).on('click', '.bookmark', function(){
		var bno = $(this).closest('.wf-box').find("[type=hidden]").val();
		var mno = $("#dd").find("#memberNo").val();
		var change = $(this).find(".fa");
		var getClass = $(this).find("i").attr("class");
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
	
	var getParameter = function(url) {
		var paramText = decodeURI(url).split("?")[1];
		return paramText;
	};
	var pageParam = getParameter(document.location.href);
	
	/* fav blog list */
	function list(mno){
		$.getJSON(contextPath+"/salon/ajax/favBlog.do",{from: pageParam, mno: mno},function(resultObj){
		var cnt = 0;
		console.log(resultObj);
		if(resultObj.status == "favBlog"){
		   $.each(resultObj.data, function(key, value){
			   var clone = $(".cloneClass").clone();
			   	clone.toggleClass("cloneClass wf-box");
			    clone.find("a").attr("href", contextPath +'/blog/blog.html?no='+value.mno);
			    clone.find("img").attr("src", value.blogImageList[0].path);
			    clone.find("h3").text(value.tag);
			    clone.find("p").text(value.content);
				clone.find(".contentNo").val(value.no);
			    
				$(".wf-column:eq("+cnt+")").append(clone);
				cnt++;
				if(cnt == 5) cnt = 0;
		  });
		} else if(resultObj.status == "favMember"){
			console.log(resultObj.data)
			$.each(resultObj.data, function(key, value){
				var clone = $(".cloneClass").clone();
			   	clone.toggleClass("cloneClass wf-box");
			    clone.find("a").attr("href", contextPath +'/blog/blog.html?no='+value.mno);
			    clone.find("img").attr("src", value.photoPath);
			    clone.find("h3").text(value.nick);
			    clone.find("p").text(value.email);
				clone.find(".contentNo").val(value.mno);
			    
				$(".wf-column:eq("+cnt+")").append(clone);
				cnt++;
				if(cnt == 5) cnt = 0;
			});
		}else if(resultObj.status == "favShop"){
			
		}
	})
	}
	/* scroll */
	var page = 1;
	$(document).scroll(function() {
		maxHeight = $(document).height();
		currentScroll = $(window).scrollTop() + $(window).height();
		var mno = $("#dd").find("#memberNo").val();
		if (maxHeight <= currentScroll) {
			page++;
			$.getJSON( contextPath+"/salon/ajax/list.do",{pageNo : page}, function(resultObj) {
				console.log(resultObj);
			   var cnt = 0;
			   $.each(resultObj.mList, function(key, value){
				   var html = ""
						html += '<div class="wf-box '+ value.bno +'">'; 
						html += '<a class="detail" href="'+ contextPath +'/blog/blog.html?no='+value.mno+'">';
						if(value.blogImageList.length != 0){	
							html += '<image src='+value.blogImageList[0].path+'/></a>';
						}else{
							html += '<image src="images/user.png"/></a>';
						}
						html += '<div class="content">';
						html += '<h3>'+value.tag+'</h3>';
						html += '<hr>';
						html += '<p style="max-height:130px; overflow:hidden;">'+value.content+'</p>';
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
