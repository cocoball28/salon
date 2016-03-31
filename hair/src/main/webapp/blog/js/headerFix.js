//왼쪽 정보창 떠다니게 하기
$(".header").each(function(){
	var $window = $(window),
		$infoDiv = $(this),
		infoDivOffsetTop = $infoDiv.offset().top;
	$window.on('scroll',function(){
		if($window.scrollTop()> infoDivOffsetTop +283){
			$infoDiv.addClass('headSticky');
			$(".headerSupport").show();
			$(".wrapper-demo").css("top","0px")
		}else{
			$infoDiv.removeClass('headSticky');
			$(".headerSupport").hide();
		}	
	});
	$window.trigger('scroll');
});

