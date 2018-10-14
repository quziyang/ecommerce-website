/***********************
 * 日期：2018/06/16
 * 作者：曲子扬
 * 用途：产品详情页右侧配送地址的js文件
 * version: 1.0
 * other: null
 */

 // 产品详情页-右侧的配送地址信息
 function addressMenuFn( _config ) {
 	for( var i in _config ){
 		this[i] = _config[i];
 	}
 	this.isShow = 0;
 	this.arrs = [];
 	this.init();
 }

 addressMenuFn.prototype = {
 	init: function(){
 		var _self = this;
 		_self.getData();
 		_self.eventAddressTitleBtn();
 		// TabA, TabB, TabC 不需加载数据，在页面加载时就可以执行
 		_self.eventTabA();
 		_self.eventTabB();
 		_self.eventTabC();
 	},
 	getData: function(){
 		var _self = this;
 		// 获取省的数据
 		getDataFn( API_LIST.province, function( _data ){
 			// console.log( _data );
 			_self.createDom( _data.province, _self.provinceId );
 			_self.eventProvince();
 		} )
 		// 获取市的数据
 		getDataFn( API_LIST.city, function( _data ){
 			// console.log( _data );
 			_self.createDom( _data.city, _self.cityId );
 			_self.eventcity();
 		} )
 		// 获取区的数据
 		getDataFn( API_LIST.area, function( _data ){
 			// console.log( _data );
 			_self.createDom( _data.area, _self.areaId );
 			_self.eventarea();
 		} )
 	},
 	// 通用的添加Dom的方法
 	createDom: function( _d, _wrapId ){
 		var _self = this;
 		for( var i=0; i<_d.length; i++){
 			$("<li>", {})
 				.html( _d[i].name )
 				.appendTo( _wrapId );
 		}
 	},
 	// 配送地址显示与隐藏
 	eventAddressTitleBtn: function(){
 		var _self = this;
 		
 		_self.addressTitleBtnId.on("click", function(){
 			if( _self.isShow == 1 ){
 				_self.addressMenuId.css("display", "none");
 				_self.isShow = 0;
 			}else if( _self.isShow == 0 ){
 				_self.addressMenuId.css("display", "block");
 				_self.isShow = 1;
 			}
 			
 		})
 	},
 	// 省的tab菜单
 	eventProvince: function(){
 		var _self = this;
 		_self.provinceId.find("li").on("click", function(){
 			// console.log($(this).html());
 			var _html = $(this).html();
 			_self.tabA
 				.removeClass("yellow")
 				.html( _html );
 			_self.tabB
 				.show()
 				.html("请选择市")
 				.addClass("yellow");
 			// 写法一
 			_self.provinceId.css("display", "none");
 			_self.cityId.css("display", "block");
 			// 写法二
 			// _self.provinceId.hide();
 			// _self.cityId.show();
 			_self.addressArray( _html );
 		})
 	},
 	// 市的tab菜单
 	eventcity: function(){
 		var _self = this;
 		_self.cityId.find("li").on("click", function(){
 			// console.log($(this).html());
 			var _html = $(this).html();
 			_self.tabB
 				.removeClass("yellow")
 				.html( _html );
 			_self.tabC
 				.show()
 				.html("请选择区")
 				.addClass("yellow");
 			_self.cityId.css("display", "none");
 			_self.areaId.css("display", "block");
 			_self.addressArray( _html );
 		})
 	},
 	// 区的tab菜单
 	eventarea: function(){
 		var _self = this;
 		_self.areaId.find("li").on("click", function(){
 			// console.log($(this).html());
 			var _html = $(this).html();
 			_self.tabC
 				.html( _html );
 			_self.addressArray( _html );
 			_self.arrs.splice(2,1);
 			_self.addressMenuId.css("display", "none");
 			_self.isShow = 0;
 		})
 	},
 	// 操作省市区的数组
 	addressArray: function( _n ){
 		var _self = this;
 		if ( _self.arrs.length<3 ) {
 			_self.arrs.push( _n );
 		};
 		_self.addressTitleBtnId.html("");
 		for( var i=0; i<_self.arrs.length; i++ ){
 			$("<li>", {})
 				.html( _self.arrs[i] )
 				.appendTo( _self.addressTitleBtnId );
 		}
 	},
 	// 点击省的tab按钮
 	eventTabA: function(){
 		var _self = this;
 		_self.tabA.on("click", function(){
 			$(this).addClass("yellow");
 			_self.tabB.removeClass("yellow").hide();
 			_self.tabC.removeClass("yellow").hide();
 			_self.provinceId.show();
 			_self.cityId.hide();
 			_self.areaId.hide();
 			// 清空数组
 			_self.arrs.splice(0,3);
 			// console.log( _self.arrs );
 		})
 	},
 	// 点击市的tab按钮
 	eventTabB: function(){
 		var _self = this;
 		_self.tabB.on("click", function(){
 			_self.tabA.removeClass("yellow");
 			$(this).addClass("yellow");
 			_self.tabC.removeClass("yellow").hide();
 			_self.provinceId.hide();
 			_self.cityId.show();
 			_self.areaId.hide();
 			_self.arrs.splice(1,2);
 		})
 	},
 	// 点击区的tab按钮
 	eventTabC: function(){
 		var _self = this;
 		_self.tabC.on("click", function(){
 			_self.tabA.removeClass("yellow");
 			_self.tabB.removeClass("yellow");
 			$(this).addClass("yellow");
 			_self.provinceId.hide();
 			_self.cityId.hide();
 			_self.areaId.show();
 		})
 	}
 }