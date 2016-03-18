$(function(){
	
	 function getContextPath(){
		    var offset=location.href.indexOf(location.host)+location.host.length;
		    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
		    return ctxPath;
		}

	var contextPath =  getContextPath();
	
$(document).ready(function(){
	
	/* Drop down */
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
})	
		
		/* modify profile */
		/*$("#pro").click(function(){
			$(".section").load(contextPath+"/header/modify.html .container")
		})*/
		
	});
	
});


