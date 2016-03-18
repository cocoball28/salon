 function getContextPath(){
	    var offset=location.href.indexOf(location.host)+location.host.length;
	    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
	    return ctxPath;
	}

	var contextPath =  getContextPath();
	 /* check login */
	/*$.get("/hair2/check/checkLogin.do", function(data){
		console.log(data);
	}); 
	*/
	/* header */
	$(".header").load(contextPath+"/header/header.html .header").trigger('pagecreate');
		 
	 
	/* add bookmark */
	$(document).on('click', '.bookmark', function(){
		console.log("in")
		var no = $(this).closest('.wf-box').find("[type=hidden]").val();
		var change = $(this).find(".fa");
		 $.get("/hair2/salon/ajax/updateFav.do",{no: no})
			.done(function(){
			change.toggleClass("fa-heart fa-heart-o");
		 }); 
		return false; 
	});


/* list ajax */
	$(document).ready(function(){
		
	  $.getJSON( ""+contextPath+"/salon/ajax/list.do"+"", function(resultObj) {
		var cnt = 0;
		   $.each(resultObj.mList, function(key, value){
				var html = ""
				html += '<div class="wf-box">'; 
				html += '<a class="detail" href="'+ contextPath +'/blog/blog.html?no='+value.no+'">';
				html += '<image src="images/style-'+value.imageNo+'.jpg"/></a>';
				html += '<div class="content">';
				html += '<h3>'+value.title+'</h3>';
				html += '<hr>';
				html += '<p>'+value.content+'</p>';
				html += '<input type="hidden" class="contentNo" value='+value.no+' />'
				html += '<div class="optionDiv">'
				html += '<a class="bookmark">';
				if(value.favorite == 0){
					html += '<i class="fa fa-heart-o"></i>'
				}else{
					html += '<i class="fa fa-heart"></i>'
				} 
				html += '</a>';
				html += '</div></div></div>';
				$(".wf-column:eq("+cnt+")").append(html);
				cnt++;
				if(cnt == 5) cnt = 0;
		  }) 
		   $("#dd").append(resultObj.member.nick);
		   $("#dd").append("<input type='hidden' id='memberNo' value="+resultObj.member.no+" />")
	});
	})
	
	/* scroll */
	var page = 1;
	$(document).scroll(function() {
		maxHeight = $(document).height();
		currentScroll = $(window).scrollTop() + $(window).height();
		
		if (maxHeight <= currentScroll) {
			page++;
			$.getJSON( ""+contextPath+"/salon/ajax/list.do"+"",{pageNo : page}, function(resultObj) {
				var cnt = 0;
				   $.each(resultObj.mList, function(key, value){
						var html = ""
						html += '<div class="wf-box">'; 
						html += '<a class="detail"><image src="images/style-'+value.imageNo+'.jpg"/></a>';
						html += '<div class="content">';
						html += '<h3>'+value.title+'</h3>';
						html += '<hr>';
						html += '<p>'+value.content+'</p>';
						html += '<input type="hidden" class="no" value='+value.no+' />'
						html += '<div class="optionDiv">'
						html += '<a class="bookmark">';
						if(value.favorite == 0){
							html += '<i class="fa fa-heart-o"></i>'
						}else{
							html += '<i class="fa fa-heart"></i>'
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
	
