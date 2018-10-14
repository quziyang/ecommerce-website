/***********************
 * 日期：2018/06/15
 * 作者：曲子扬
 * 用途：产品详情页右侧商品的js文件
 * version: 1.0
 * other: null
 */

// 产品详情页-右侧的商品详细信息
function getGoodsInfo(){
	this.productTitleId = $("#productTitleId");
	this.init();
}

getGoodsInfo.prototype = {
	init: function(){
		var _self = this;
		_self.getParam();
	},
	getParam: function(){
		var _self = this;
		var _href = location.href;
 		var _n = _href.indexOf("?");
 		var _param = _href.substring( _n+5 );
		_self.getData( _param );
	},
	getData: function( _param ){
		var _self = this;
		// param名字没有要求，可以随便起；可以写成：{hahah: _param}
		// _param是要传入的参数
		getAjaxFn(API_LIST.goods_id, {param: _param}, function( _data ){
			// console.log( _data );
			// 注意此处createDom函数要写在getAjaxFn函数里面，
			// 写在外面的话createDom函数无法得到_data的值
			_self.createDom( _data );
		});		
	},
	createDom: function( _data ){
		var _self = this;
		var _ads = _data.ads;
		var _len = _ads.length;
		$("<h1>", {})
			.html( _data.title )
			.appendTo( _self.productTitleId );
		for (var i = 0; i < _len; i++) {
			$("<p>", {})
				.html(  _ads[i] )
				.appendTo( _self.productTitleId );
		}
	},
}