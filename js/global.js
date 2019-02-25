
var protocol="http://";
//var domain="localhost";
// var domain="192.168.1.177";
// var port = "9090";
var domain="39.98.204.123";
var port = "80";
var project = "/RedCross/";

//默认查找前1000条数据
var defaultPageSize = 1000;

var SUCCESS = "success";
var BASE_URL = "";

var BACK_END_USER_ID = 18;

function urlFactory(url){

	return protocol + domain + ":" + port + project + url;

}
$(function(){
	if(!getBaseAccessUrl()){
		$.ajax({
			url : urlFactory("common/fileBasePath"),
			xhrFields: {
				withCredentials: true,
			},
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

function heartPack(){
	setInterval(function(){
		$.ajax({
			url : urlFactory("common/fileBasePath"),
			xhrFields: {
				withCredentials: true,
			},
			success : function(data){
				console.log(data);
			}
		})
	},1000*60*5);//每5分钟执行一次
}


function gotoLogin(){
	document.location.href = "login.html";
}

function xlsCustomize(xlsx,colList,rowHeight){
	//styles.xml中新增自定义样式
	var sSh = xlsx.xl['styles.xml'];
	
	//添加边框样式.
	var border = '<border>' +
					'<left style="thin">' +
						'<color indexed="64"/>' +
					'</left>' +
					'<right style="thin">' +
						'<color indexed="64"/>' +
					'</right>' +
					'<top style="thin">' +
						'<color indexed="64"/>' +
					'</top>' +
					'<bottom style="thin">' +
						'<color indexed="64"/>' +
					'</bottom>' +
					'<diagonal/>' +
				'</border>';
				
	var lastBorderIndex = $('borders border', sSh).length - 1;
	sSh.childNodes[0].childNodes[3].innerHTML += border;
	
	
	
	
	var lastXfIndex = $('cellXfs xf', sSh).length - 1;
	
	
	
	//居中并加粗
	var centralBoldAndBorderAround = '<xf numFmtId="0" fontId="2" fillId="0" borderId="' + lastBorderIndex + '" applyFont="1" applyFill="1" applyBorder="1">'+
										'<alignment horizontal="center"  vertical="center"/>'+
									 '</xf>';
	var centralAndBorderAround = '<xf numFmtId="0" fontId="0" fillId="0" borderId="' + lastBorderIndex + '" xfId="0">' +
									'<alignment horizontal="center"  vertical="center"/>'+
								'</xf>';
	
	//添加内置样式
	sSh.childNodes[0].childNodes[5].innerHTML += (centralBoldAndBorderAround + centralAndBorderAround);
	//记录添加新样式所在下标
	var centralBoldAndBorderAroundIndex = lastXfIndex + 1;
	var centralAndBorderAroundIndex = lastXfIndex + 2;
	
	//运用新增样式
	var sheet = xlsx.xl.worksheets['sheet1.xml'];
	$('row c', sheet).attr('s',centralAndBorderAroundIndex);
	$('row:eq(1) c', sheet).attr( 's', centralBoldAndBorderAroundIndex);//居中并加粗
	$('row:eq(0) c', sheet).attr( 's', centralBoldAndBorderAroundIndex);//居中并加粗
	

	//添加宽度.
//	for(var col of colList){
	for(var i = 0; i < colList.length; i++){
		var col = colList[0];
		var width = col.width;
		var i = col.index;
		var selector = 'col[min="' + i + '"]';
		
		$(selector, sheet).attr( 'width', width);//添加宽度
	}

	//添加高度
	$('row', sheet).attr( 'ht', rowHeight).attr('customHeight',"1");//添加高度
	
}