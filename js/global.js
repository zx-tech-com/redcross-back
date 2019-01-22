const protocol="http://"
const domain="192.168.1.177";
// const domain="39.98.204.123";
const port = "9090";
// const port = "8080";
const project = "/RedCross/";


const SUCCESS = "success";


function urlFactory(url){
	if(!url){//url为空
		return protocol + domain + ":" + port + project.substring(0,project.length-1) +
		"?token=" + "eyJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjo1LCJleHBpcmVzIjoxNTQ4MTc3MjQzNTM2fQ.KQudA_KWnSvYX2oZK9L3ftNwi02rBNT8p3U6Uu0IT7A";

	}else{
		var s = url.indexOf('?') == -1 ? '?' : '&';
		return protocol + domain + ":" + port + project + url + s +
		"token=" + "eyJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjo1LCJleHBpcmVzIjoxNTQ4MTc3MjQzNTM2fQ.KQudA_KWnSvYX2oZK9L3ftNwi02rBNT8p3U6Uu0IT7A";
	}
	
}