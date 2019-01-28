const protocol="http://"
const domain="192.168.1.100";
//const domain="192.168.1.177";
//const domain="39.98.204.123";
const port = "9090";
//const port = "8080";
const project = "/RedCross/";

//默认查找前1000条数据
const defaultPageSize = 1000;

const SUCCESS = "success";
var BASE_URL = "";

function urlFactory(url){
	

	var token = "eyJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjoxLCJleHBpcmVzIjoxNTQ4NjY5MDY4MDAzfQ.ygrewXfbjTWdPts3-94hSv6asgBIT-oHxqYOrMtBN0Y";
    //var  token="eyJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjoxLCJleHBpcmVzIjoxNTQ4NTk4MzkzMjc2fQ.IRuo0Tvrt6dAANwDy3mCUsQZBmZoQv8HUYUSubum5MM";
	
	if(!url){//url为空
		return protocol + domain + ":" + port + project.substring(0,project.length-1) +
		"?token=" + token;

	}else{
		var s = url.indexOf('?') == -1 ? '?' : '&';
		return protocol + domain + ":" + port + project + url + s +
		"token=" + token;
	}
	
}

$(function(){
	if(!getBaseAccessUrl()){
		$.ajax({
			url : urlFactory("common/fileBasePath"),
			success : function(data){
				if(data.status == SUCCESS){
					BASE_URL = data.data;
					sessionStorage.setItem("baseUrl",BASE_URL);
				}
			}
		})
	}
})

function getBaseAccessUrl(){
	if(sessionStorage.getItem("baseUrl"))
		return sessionStorage.getItem("baseUrl");
	else
		return BASE_URL;
}

function populateObjectPropertyIntoFormData(obj,formData){
	if(!formData)
		formData = new FormData();
	if(!obj)
		return formData;
	for(var key in obj){
		if(obj.hasOwnProperty(key) === true){
			formData.append(key,obj[key]);
		}
	}
	return formData;
}

function explainStatus (status){
	
	var statusArr = ['待支付','已完成','已取消'];
	try{
		var res = statusArr[status-1];
	}catch(e){
		res = "";
	}
	
	return res?res : "";
	
}