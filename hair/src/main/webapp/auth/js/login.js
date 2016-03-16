
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
		error: function(data){
			alert("error"+ data);
			console.log(data);
		},
		success: function(resultObj){
			window.location.href = contextPath+"/main/MainList.html"
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
	var formData = new FormData(form);
	console.log(form);
	
	$.ajax({
		   url: "/hair2/auth/add.do",
		   processData: false,
		   contentType: false,
		   data: formData,
		   method: 'POST',
		   success: function(resultObj){
			   if(resultObj.data == "success"){
				   alert("회원가입을 축하");
				   window.location.href = "/hair2/auth/login.html"
			   }else{
				   alert("회원가입 실패");
			   }
			   
		   },
		   error: function(){
			   alert("오류");
		   }
		});
	
	/*$.post('/hair2/auth/add.do', formData, function(resultObj) {
		console.dir(resultObj);
		var ajaxResult = resultObj.ajaxResult;
		if (ajaxResult.status == "success") {
			alert("회원가입을 축하합니다")
      		location.href = contextPath+"/auth/login.html";
	    } else {
	        alert("회원가입 실패");
	        return false;
	    }
	}, false);*/

	return false;
});

/*$("#regist_frm").submit(function(event){
	event.preventDefault();
	$.post('/hair2/auth/add.do', {
		nick: $('#nick_reg').val(),
		email: $('#email_reg').val(),
		pwd: $('#pwd_reg').val()
	}, function(resultObj) {
		console.dir(resultObj);
		var ajaxResult = resultObj.ajaxResult;
		if (ajaxResult.status == "success") {
			alert("회원가입을 축하합니다")
			location.href = contextPath+"/auth/login.html";
		} else {
			alert("회원가입 실패");
			return false;
		}
	}, 'json');
	
	console.log("회원가입");
	return false;
});*/