

$(document).ready(function(){
	
	function getContextPath(){
		var offset=location.href.indexOf(location.host)+location.host.length;
		var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
		return ctxPath;
	}
	
	var contextPath =  getContextPath();
	
	/* drop down box */
	$(document).on("focus", ".wrapper-demo", function(){
		$(this).find("#dd").toggleClass("active");
	});
	$(document).on("blur", ".wrapper-demo", function(){
		$(this).find("#dd").toggleClass("active");
	});
	
	/* log out */
	$(document).on("click","#out",function(){
 		var result = confirm("로그 아웃 하시겠습니까?");
 		if(result){
 			$.get(contextPath+"/auth/logout.do", function(data){
 				if(data == "success"){
 					window.location.href = contextPath+"/auth/login.html";
 				}else{
 					alert("로그아웃 실패");
 				}
 			});
 		}else{
 			return false;
 		}
 	});  
	
	/* my page modify get*/
	 $(document).on("click","#pro",function( ){
			var memberNo = $(this).closest('#dd').find("[type=hidden]").val();			
			$.ajax({
				   url: contextPath+"/salon/ajax/update.do",
				   method: 'get',
				   data: {mno:memberNo},
				   success: function(data){
						   $(".section").load(contextPath+"/header/modify.html .container", function() {
							   $("#nick_reg").val(data.nick);
							   $("#email_reg").val(data.email);
							   $("#email_reg").attr("readonly", "true");
							   if(data.photoPath != null){
								   $('.preImg').attr('src', data.photoPath);
							   }else{
								   $('.preImg').attr('src', "images/placeholder.png");
							   }
						   });
						   console.log(data)
						   console.log(data.photoPath)
				   },
				   error: function(){
					   alert("오류");
				   }
				})

			return false;
		});  
	
	 /* my page modify update */
	 $(document).on("submit", "#update_frm", function(){
			
			var form = $("#update_frm")[0];
			var formData = new FormData(form);
			console.log(form);
			formData.append("files", $("#file")[0].files[0]);
			formData.append("mno", $('#dd').find("[type=hidden]").val())
			
			$.ajax({
				   url: contextPath+"/salon/ajax/update.do",
				   processData: false,
				   contentType: false,
				   data: formData,
				   method: 'POST',
				   success: function(resultObj){
						   alert("회원정보가 수정되었습니다.");
						   window.location.href = contextPath+"/main/mainlist.html"
				   },
				   error: function(){
					   alert("비밀번호를 확인해 주세요");
				   }
				});
			

			return false;
		});
	 
	 $(document).on("change", "#file", function(){
		 readURL(this);
	 });
	 
	 $(document).on("click", "#mainTag", function(){
		$("#mainTag").attr("href", contextPath+"/auth/index.html#signin") 
	 });
	 
	 $(document).on("click", "#mapSearch", function(){
		 window.location.href = contextPath + "/map3/map3.html"; 
	 });
	 
	 $(document).on("click", "#search", function(event){
		 var searchVal = $("#searchBar").val();
//		 searchVal.replace(" ", '%^');
		 console.log(searchVal);
		 event.preventDefault();
		 window.location.href = contextPath + "/main/search.html?" + searchVal ;
		 
	 });
	 
});

