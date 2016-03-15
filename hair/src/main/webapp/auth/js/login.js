		$('.tabs .tab').click(function() {
			if ($(this).hasClass('signin')) {
				$('.tabs .tab').removeClass('active');
				$(this).addClass('active');
				$('.cont').hide();
				$('.signin-cont').show();
			}
			if ($(this).hasClass('signup')) {
				$('.tabs .tab').removeClass('active');
				$(this).addClass('active');
				$('.cont').hide();
				$('.signup-cont').show();
			}
		});
		
		/* login */
		$("#login_frm").submit(function(){
			$.ajax({
				type: "POST",
				dataType: 'json',
				url: "/hair2/auth/login.do",
				data: {
					email: $("#email").val(),
					password: $("#password").val()
				},
				error: function(data){
					alert("error"+ data);
					console.log(data);
				},
				success: function(resultObj){
					window.location.href = "/hair2/main/MainList.html"
				}
			}
			)
			return false;
		});
		
			
		/* check validation */
		/* function checkForm(form){
			if(form.name.value == ""){
				alert("Username cannot be black");
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
		$("#regist_frm").submit(function(){
			$.post('/hair2/auth/add.do', {
				nick: $('#nickname').val(),
				email: $('#email').val(),
				pwd: $('#password').val()
			}, function(resultObj) {
				console.dir(resultObj);
				var ajaxResult = resultObj.ajaxResult;
				if (ajaxResult.status == "success") {
					alert("회원가입을 축하합니다")
		      		location.href = "/g2/auth/login.do";
		    } else {
		        alert("회원가입 실패");
		    }
			}, 'json');
		
			console.log("회원가입");
			return false;
		})