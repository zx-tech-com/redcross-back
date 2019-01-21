const protocol="http://"
const domain="192.168.1.177";
const port = "9090";
const project = "/RedCross/";

function urlFactory(url){
	return protocol + domain + ":" + port + project + url;
}