
// contextPath
function getContextPath(){
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
    return ctxPath;
}

var contextPath =  getContextPath();

$('.tabs .tab').click(function() {
	if ($(this).hasClass('signin')) {
		$('.tabs .tab').removeClass('active');
		$(this).addClass('active');
		$('.cont').hide();
		$('.signin-cont').show();
		$("h1").show();
		$(".preDiv").hide();
	}
	if ($(this).hasClass('signup')) {
		$('.tabs .tab').removeClass('active');
		$(this).addClass('active');
		$('.cont').hide();
		$('.signup-cont').show();
		$(".preDiv").show();
		$("h1").hide();
	}
});

/* login */
$("#login_frm").submit(function(event){
	event.preventDefault();
	$.ajax({
		type: "POST",
		dataType: 'json',
		url: contextPath+"/auth/login.do",
		data: {
			email: $("#email").val(),
			password: $("#password").val()
		},
		success: function(resultObj){
			console.log(resultObj.ajaxResult)
			if(resultObj.ajaxResult.data != null){
				window.location.href = contextPath+"/main/mainlist.html"
			}else{
				alert("이메일 또는 비밀번호를 확인해 주세요")
				$("#email").val("");
				$("#password").val("");
				return false;
			}
		}
	}
	)
	return false;
});

/* preview */
function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.preImg').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

$("#file").change(function(){
    readURL(this);
});

	
/* check validation */
/* function checkForm(form){
	if(form.name.value == ""){
		alert("Username cannot be blank");
		form.name.focus();
		return false;
	}
	if(form.pwd1.value != form.pwd2.value){
		form.pwd1.focus();
		alert("Password")
		return false;
	}
	return true;
} */

$("#regist_frm").submit(function(event){
	event.preventDefault();
	var form = $("#regist_frm")[0];
	console.log(form);
	var formData = new FormData(form);
	console.log(formData);
	formData.append("files", $("#file")[0].files[0]);
	
	$.ajax({
		   url: contextPath+"/auth/add.do",
		   processData: false,
		   contentType: false,
		   data: formData,
		   method: 'POST',
		   success: function(resultObj){
			   if(resultObj.data == "success"){
				   alert("회원가입을 축하");
				   window.location.href = contextPath+"/auth/login.html"
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

		/* email check */
$("#email_reg").focus(function(){
	$("#email_reg").blur(function(){
		var email = $("#email_reg").val();
		$.post(contextPath+"/auth/emailCheck.do",
				{email : email},
				function(resultObj){
					console.log(resultObj.ajaxResult.data)
					if(resultObj.ajaxResult.data == true){
						$("#checkE").css("color", "blue");
						$("#checkE").html("사용가능한 이메일 입니다");
					}else{
						$("#checkE").css("color", "red");
						$("#checkE").html("사용 불가능한 이메일 입니다");
					}
				}, "json");
		
	});
})

		/* radio button */
$("#radio2").click(function(){
	$("#searchShop").show("slow");
	$(".wrapper-demo").show("slow");
});
$("#radio1").click(function(){
	$("#searchShop").hide("slow");
	$(".wrapper-demo").hide("slow");
});

/*  dropdown  */
/*function DropDown(el) {
	this.dd = el;
	this.initEvents();
}
DropDown.prototype = {
	initEvents : function() {
		var obj = this;

		obj.dd.on('click', function(event){
			$(this).toggleClass('active');
			event.stopPropagation();
		});	
	}
}

$(function() {
	var dd = new DropDown( $('#dd') );
	$(document).click(function() {
		// all dropdowns
		$('.wrapper-dropdown-5').removeClass('active');
	});
});*/

/* 검색창 목록 없애기 */
$(document).on("click",function(event){
	$("#dd").removeClass("active");
});
/* shop search */


$(document).on("keypress",'#searchShop',function(event){
	 var keycode = (event.keyCode ? event.keyCode : event.which);
	    if(keycode == '13'){
	    	event.preventDefault()
	    	var shop = $('#searchShop').val();
	    	console.log("keyup " + shop);
	    	$.post(contextPath+'/auth/getShop.do',{name: shop}, function(data){
	    		console.log(data);
	    		console.log(data.ajaxResult);
	    		var output = '<ul class="searchresult">';
	    		$.each(data.ajaxResult.data, function(key, val){
	    			if(val.name/*(val.name.search(myExp) != -1) || (val.bio.search(myExp) != -1)*/) {
	    				output +='<li>';
	    				output +='<a>' + val.name + '</a>';
	    				output +='<input type="hidden" class="shopNo" value='+val.no+'>';
	    				output +='<input type="hidden" class="shopName" value='+val.name+'>';
	    				output +='</li>';
	    			}
	    		});
	    		output += '</ul>';
	    		$('.dropdown').html(output);
	    		$("#dd").addClass("active");
	    	},"json");
	    }
});

$(document).on("click","li",function(event){
	var resultNo = $(this).find(".shopNo").val()
	var name = $(this).find(".shopName").val()
	$("#searchShop").val(name);
	$("#sano").val(resultNo);
	$(this).closest("#dd").removeClass('active')
	return false;
});
