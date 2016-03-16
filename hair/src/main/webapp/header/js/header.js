$(function(){
	
	/* header focus */
	/* $(document).on("focus", ".header", function(){
		 $("section").css("opacity", "0.5");
		$("header").css("opacity", "0.8");
	 })
	 $(document).on("blur", ".header", function(){
		 $("section").css("opacity", "1");
		$("header").css("opacity", "0.4");
	 })*/
		  
		
	/* My Page */
	function DropDown(el) {
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
	});

});