var messageOpen = function(){
	$('.messageContents').animate({ scrollTop: 1000 }, 'slow');
	$(".messageBox").show("slow");
};
var messageClose = function(){
	$(".messageBox").hide("slow");
};
var sendMessage = function(target){
	var content = $(target).val();
	if(event.keyCode == 13){
		//alert(content);
		socket.emit('fromclient',{msg:content});
		addMyMessage(content);
		$(target).val("");
		$('.messageContents').animate({ scrollTop: 1000 }, 'slow');
		//$(".messageContents").scrollTop = $(".messageContents").scrollHeight;
	}
};

var addMyMessage = function(data){
	var cloneSendMessage = $(".messageClone").find(".sendMessage").clone();
	$(cloneSendMessage).find(".sendMessageContent").text(data);
	$(".messageContents").append(cloneSendMessage);
	$(cloneSendMessage).show('slow');
};

var socket = io.connect('http://192.168.0.44:3000');
socket.on('toclient',function(data){
    console.log(data.msg);
    //$('#msgs').append(data.msg+'<BR>');
    addReceiveMessage(data.msg);
    $('.messageContents').animate({ scrollTop: 1000 }, 'slow');
});

var addReceiveMessage = function(data){
	var cloneReceiveMessage = $(".messageClone").find(".receiveMessage").clone();
	$(cloneReceiveMessage).find(".reciveMessageContent").text(data);
	$(".messageContents").append(cloneReceiveMessage);
	$(cloneReceiveMessage).show('slow');
}








