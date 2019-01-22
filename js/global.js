const protocol="http://"
// const domain="192.168.1.177";
const domain="39.98.204.123";
// const port = "9090";
const port = "8080";
const project = "/RedCross/";

function urlFactory(url){
	return protocol + domain + ":" + port + project + url + 
	"?token=" + "eyJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjo1LCJleHBpcmVzIjoxNTQ4MDk0OTA0MzU3fQ.iyRGY38-jVBqCvXrxczM8s9B8i0xYUCzDvax9Cn16v4";
}