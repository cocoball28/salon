$(".infoDiv").each(function(){
	var $window = $(window),
		$infoDiv = $(this),
		infoDivOffsetTop = $infoDiv.offset().top;
	$window.on('scroll',function(){
		if($window.scrollTop()+10 > infoDivOffsetTop){
			$infoDiv.addClass('sticky');
			$(".infoDivDummy").show();
		}else{
			$infoDiv.removeClass('sticky');
			$(".infoDivDummy").hide();
		}	
	});
	$window.trigger('scroll');
});
$(".repImg").each(function(){
	var $window = $(window),
	$repImg = $(this),
	repImgOffsetTop = $repImg.offset().top;
	$window.on('scroll',function(){
		if($window.scrollTop() > repImgOffsetTop -100){
			$repImg.addClass('stickyElse');
		}else{
			$repImg.removeClass('stickyElse');
		}	
	});
	$window.trigger('scroll');
});
$(".personalInfoEditBtnGroup").each(function(){
	var $window = $(window),
	$personalInfoEditBtnGroup = $(this),
	personalInfoEditBtnGroupOffsetTop = $personalInfoEditBtnGroup.offset().top;
	$window.on('scroll',function(){
		if($window.scrollTop() > personalInfoEditBtnGroupOffsetTop){
			$personalInfoEditBtnGroup.addClass('stickyElse');
			$(".message").addClass('stickyElse');
		}else{
			$personalInfoEditBtnGroup.removeClass('stickyElse');
			$(".message").removeClass('stickyElse');
		}	
	});
	$window.trigger('scroll');
});

var showDetail = function() {
	$("#shopDetail").show("fast");
};
var closeDetail = function() {
	$("#shopDetail").hide("fast");
};
var showMessage = function(){
	$(".message").show("fast");
}