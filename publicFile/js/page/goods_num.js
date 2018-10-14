/***********************
 * 日期：2018/06/23
 * 作者：曲子扬
 * 用途：产品详情页右侧商品数量的js文件
 * version: 1.0
 * other: null
 */

function goodsNum( _config ) {
	for(var i in _config){
		this[i] = _config[i];
	}
	this.init();
}

goodsNum.prototype = {
	init: function(){
		var _self = this;
		_self.getData();
	},
	getData: function(){
		var _self = this;
		getDataFn( API_LIST.goto_car_num, function( _data ){
			// console.log( _data );
			_self.resultNum( _data );
			_self.addBtn();
			_self.minusBtn();
			_self.enterGoodsNum();
			_self.toCatPageBtn();
		} )
		
	},
	// 产品数量输入框，显示产品数量的值
	resultNum: function( _d ){
		var _self = this;
		// 此句的用途是显示输入框中产品数量的值，此处有一个bug：
		// 页面刚加载时点击+和-时输入框中产品数量的值会随之变化，当手动输入商品数量之后再点击+和-，
		// 输入框中产品数量的值不再变化（此时_d.xx和g_btn_a的value的值依然会随之变化）
		_self.g_btn_a.attr("value", _d.xx);
		// console.log("bugTest"+_d.xx);
	},
	// 加法
	addBtn: function(){
		var _self = this;
		_self.g_btn_b.on("click", function(){
			getAjaxFn( API_LIST.goto_car_num, {ops: "add"}, function( _data ){
				// console.log( _data );
				_self.resultNum( _data );
			} )
		})
	},
	// 减法
	minusBtn: function(){
		var _self = this;
		_self.g_btn_c.on("click", function(){
			getAjaxFn( API_LIST.goto_car_num, {ops: "minus"}, function( _data ){
				// console.log( _data );
				_self.resultNum( _data );
			} )
		})
	},
	// 输入商品数量
	enterGoodsNum: function(){
		var _self = this;
		_self.g_btn_a.on("blur", function(){
			// attr("value")和val()都会获得商品数量框中的数量
			// console.log( $(this).val() );
			getAjaxFn( API_LIST.goto_car_num, 
				       {
				       		// 使用val()会获得商品数量框中的数量
				       		_num: $(this).val(),
				       		// _num: $(this).attr("value"),这种写法也可以
				       		ops: "enter"
				       	}, 
				       function( _data ){
					   	   // console.log( _data );
					   	   // 使用attr("value")获得中间件（后端）中Goto_car_numVal的值，并将其在商品数量框中显示
					   	   _self.g_btn_a.attr("value", _data.xx);
			         })
		})
	},
	// 跳转到购物车页面
	toCatPageBtn: function(){
		var _self = this;
		_self.g_btn_d.on("click", function(){
			location.href="shopcar.html";
		})
	}
}