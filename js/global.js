const protocol="http://"
//const domain="192.168.1.177";
//const domain="39.98.204.123";
const domain="192.168.1.100";
const port = "9090";
const project = "/RedCross/";

function urlFactory(url){
	return protocol + domain + ":" + port + project + url;
}