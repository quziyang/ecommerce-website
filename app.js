/**************
* 作者：曲子扬
* 日期：2018年6月4日
* 用途：jq版本电商网站启动文件
* others：null
**************/

var _express = require("express");
var _app = _express();

_app.use( _express.static('publicFile') );
_app.get("/", function(){

})

_app.listen(2923, function(){
	console.log("2923 server已经创建完成");
})