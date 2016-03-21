

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
 			$.get("/hair2/auth/logout.do", function(data){
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
				   url: "/hair2/salon/ajax/update.do",
				   method: 'get',
				   data: {no:memberNo},
				   success: function(data){
						   $(".section").load("/hair2/header/modify.html .container", function() {
							   $("#nick_reg").val(data.nick);
							   $("#email_reg").val(data.email);
							   $('.preImg').attr('src', data.filePath);
						   });
						   console.log(data)
						   console.log(data.filePath)
				   },
				   error: function(){
					   alert("오류");
				   }
				})

			return false;
		});  
	
	 /* my page modify update */
	 $("#update_frm").submit(function(){
			 alert("update");
			
			var form = $("#update_frm")[0];
			var formData = new FormData(form);
			
			formData.append("files", $("#file")[0].files[0]);
			formData.append("no", $('#dd').find("[type=hidden]").val())
			$.ajax({
				   url: "/hair2/auth/update.do",
				   processData: false,
				   contentType: false,
				   data: formData,
				   method: 'POST',
				   success: function(resultObj){
					   if(resultObj.data == "success"){
						   alert("회원정보가 수정되었습니다.");
						   window.location.href = "/hair2/main/mainlist.html"
					   }else{
						   alert("회원가입 실패");
					   }
					   
				   },
				   error: function(){
					   alert("오류");
				   }
				});
			

			return false;
		});
	 
	 
});

