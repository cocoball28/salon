//var shopPath = 'http://192.168.0.5:8008/salon';

function getContextPath(){
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
    return ctxPath;
}


var contextPath =  getContextPath();