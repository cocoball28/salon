
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
	

	return false;
});

		/* email check */
$("#email_reg").focus(function(){
	$("#email_reg").keyup(function(){
		var email = $("#email_reg").val();
		/*$("#checkP").attr("display", "block")*/
		$.post("/hair2/auth/emailCheck.do",
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

$("#email_reg").blur(function(){
	$("#checkE").html("");
});

		/* radio button */
$("#radio2").click(function(){
	$("#searchShop").show("slow");
	$("#update").show("slow");
});
$("#radio1").click(function(){
	$("#searchShop").hide("slow");
	$("#update").hide("slow");
});

$('#search').keyup(function(){
	var searchField = $('#searchShop').val();
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('/hair2/salon/ajax/shopSearch.do', function(data){
		var output = '<ul class="searchresult">';
		$.each(data, function(key, val){
			if(val.name/*(val.name.search(myExp) != -1) || (val.bio.search(myExp) != -1)*/) {
				output +='<li>';
				output +='<h2>' + val.name + '</h2>';
				/*output +='<img src="images/' + val.shortname + '_tn.jpg" alt="'+ val.name +'" />';
				output +='<p>' + val.bio + '</p>';*/
				output +='</li>';
			}
		});
		output += '</ul>';
		$('#update').html(output);
	});
});

