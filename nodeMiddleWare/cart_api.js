/***********************
 * 日期：2018/07/04
 * 作者：曲子扬
 * 用途：nodejs中间件，购物车模块的接口
 * other: 购物车模块的nodejs文件
 */

var _express = require("express");
var _app = _express();
_app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

// 整个商品数据
var DataObj = {
		"cartList": [{
			"isCheck": 1,
			"pid": "goods_111",
			"name": "商品名称111",
			"introduce": "商品111就是好就是好",
			"unit": 3698,
			"num": 1,
			"total": 3698,
			"goodsImg": "https://p.upyun.com/docs/cloud/demo.jpg"
		},{
			"isCheck": 1,
			"pid": "goods_222",
			"name": "商品名称222",
			"introduce": "商品222就是好就是好",
			"unit": 342,
			"num": 2,
			"total": 684,
			"goodsImg": "https://cdn.pixabay.com/photo/2015/07/10/17/53/cheers-839865_960_720.jpg"
		},{
			"isCheck": 1,
			"pid": "goods_333",
			"name": "商品名称333",
			"introduce": "商品333就是好就是好",
			"unit": 785,
			"num": 1,
			"total": 785,
			"goodsImg": "https://cdn.pixabay.com/photo/2016/07/23/10/40/upset-1536620_960_720.jpg"
		}],
		"error": {
			"code": 0,
			"msg": "1代表有错误，0代表没有错误"
		},
		"total": {
			"totalGoodsNum": 4,
			"selectedGoodsNum": 4,
			"selectedGoodsMoney": 5167
		}
	};

// 获取整个商品列表
_app.get("/cart/cart_list", function(req, res){
	res.send( DataObj );
	res.end();
});

// 增加商品数量（已停用）
_app.get("/cart/cart_add", function(req, res){
	var _n = req.query.num;
	var _u = req.query.unit;
	// console.log( req.query );
	_n++;
	var _data ={
		"result": _n*_u,
		"num": _n
	}

	res.send( _data );
	res.end();
});

// 减少商品数量（已停用）
_app.get("/cart/cart_minus", function(req, res){
	var _n = req.query.num;
	var _u = req.query.unit;
	// console.log( req.query );
	if(_n>1){
		_n--;
	}else{
		_n = 1;
	}
	var _data ={
		"result": _n*_u,
		"num": _n
	}

	res.send( _data );
	res.end();
});

// 输入商品数量（已停用）
_app.get("/cart/cart_input", function(req, res){
	var _n = req.query.num;
	var _u = req.query.unit;
	// console.log( req.query );
	var _data ={
		"result": _n*_u,
		"num": _n
	}

	res.send( _data );
	res.end();
});

// 返回包含所有商品信息的对象
_app.get("/cart/cart_goods_obj", function(req, res){
	var _n = req.query.num;
	var _pid = req.query.pid;
	var _action = req.query.action;
	var _goodsDataObj = null;
	var _inx = 0;
	var _newSelectedGoodsNum = 0;
	var _newTotalGoodsNum = 0;
	var _newSelectedGoodsMoney =0;
	// console.log( _action );
	
	for(i=0;i<DataObj.cartList.length;i++){
		if( _pid==DataObj.cartList[i].pid ){
			// console.log( DataObj.cartList[i].name, _n );
			_goodsDataObj = DataObj.cartList[i];
			// console.log(_goodsDataObj);
			_inx = i;
			break;
		}
	}

	if(_action=="add"){
		_n++;
		// console.log(typeof _n);
	}else if(_action=="minus"){
		// 此处当_n为1时，_n将会由数字1转为字符1
		if(_n>1){
			_n--;
		}
		// console.log(typeof _n);		
	}else if(_action=="input"){

	}
	/*_goodsDataObj.num = _n;
	_goodsDataObj.total = _n*_goodsDataObj.unit;*/
	DataObj.cartList[_inx].num = Number(_n);
	DataObj.cartList[_inx].total = Number(_n)*DataObj.cartList[_inx].unit;
	// 统计此时所有商品的数量
	for( j=0;j<DataObj.cartList.length;j++){
		// console.log( DataObj.cartList[j].num );
		_newTotalGoodsNum+=DataObj.cartList[j].num;
		if( DataObj.cartList[j].isCheck==1 ){
			_newSelectedGoodsNum+=DataObj.cartList[j].num;
			_newSelectedGoodsMoney+=DataObj.cartList[j].total;
		}	
	}
	// console.log( _newTotalGoodsNum );
	DataObj.total.selectedGoodsNum = _newSelectedGoodsNum;
	DataObj.total.totalGoodsNum = _newTotalGoodsNum;
	DataObj.total.selectedGoodsMoney = _newSelectedGoodsMoney;

	// console.log( _goodsDataObj );
	res.send( DataObj );
	res.end();
});

// 根据商品是否存在checked属性来改变整个商品数据中isCheck的值
_app.get("/cart/isCheck", function(req, res){
	var _isCheckArr = req.query.arrs;
	// console.log( _isCheckArr );
	for(i=0;i<DataObj.cartList.length;i++){
		if(_isCheckArr[i]=="true"){
			DataObj.cartList[i].isCheck = 1;
		}else{
			DataObj.cartList[i].isCheck = 0;
		}
	}
	res.send( DataObj );
	res.end();
});

// 计算所有选中商品的数量、总价
_app.get("/cart/selected_num_money", function(req, res){
	var _selectedGoodsInfo = req.query.arrs;
	console.log( _selectedGoodsInfo );
	var _selectedGoodsNum = 0;
	var _selectedGoodsMoney = 0;
	for(var i=0; i<_selectedGoodsInfo.length; i++){
		_selectedGoodsNum += Number(_selectedGoodsInfo[i].n);
		_selectedGoodsMoney += Number(_selectedGoodsInfo[i].n)*Number(_selectedGoodsInfo[i].u);
	}
	DataObj.total.selectedGoodsNum = _selectedGoodsNum;
	DataObj.total.selectedGoodsMoney = _selectedGoodsMoney;
	res.send( DataObj );
	res.end();
});

// 删除按钮事件
_app.get("/cart/goods_delete", function(req, res){
	var _pid = req.query.pid;
	var _inx = 0;
	for(var i=0;i<DataObj.cartList.length;i++){
		if(_pid==DataObj.cartList[i].pid){
			// console.log(DataObj.cartList[i].name);
			_inx = i;
			// 注意break的位置，如果此时跳出，_inx = i
			break;
		}
		// 如果此时跳出，不论删除第几个商品，_inx的值都为0
		// break;
	};
	if(DataObj.cartList[_inx].isCheck==1){
		DataObj.total.selectedGoodsNum -= DataObj.cartList[_inx].num;
		DataObj.total.selectedGoodsMoney -= DataObj.cartList[_inx].total;
	}
	DataObj.total.totalGoodsNum -= DataObj.cartList[_inx].num;
	DataObj.cartList.splice(_inx, 1);
	res.send( DataObj );
	res.end();
});

// 全选按钮事件
_app.get("/cart/all_delete", function(req, res){
	var _isCheck = req.query.isCheck;
	// console.log( _isCheck );
	if(_isCheck==1){
		for(var i=0;i<DataObj.cartList.length;i++){
			DataObj.cartList[i].isCheck=0;
		}
		DataObj.total.selectedGoodsNum=0;
		DataObj.total.selectedGoodsMoney=0;
	}else{
		for(var i=0;i<DataObj.cartList.length;i++){
			DataObj.cartList[i].isCheck=1;
			DataObj.total.selectedGoodsNum+=DataObj.cartList[i].num;
			DataObj.total.selectedGoodsMoney+=DataObj.cartList[i].num*DataObj.cartList[i].unit;
		}
	};
	res.send( DataObj );
	res.end();
});

_app.listen(7891, function(){
	console.log("7891,购物车模块的nodejs文件运行了");
})