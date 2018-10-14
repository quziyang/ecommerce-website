/***********************
 * 日期：2018/05/17
 * 作者：曲子扬
 * 用途：全站的公共js方法
 * other: null
 */

// get方式，url的请求无参数
function getDataFn( _url, callback ){
	 $.ajax({
			url: _url,
			type: "get",
			dataType: "json",
			success: function( _d ){
				// console.log( _d );
				callback( _d );
			}
		});
}

// get方式，url的请求有参数
// getAjaxFn函数向中间件（后端）特定接口：_url接口发送请求，
// 该请求将一个参数：_data发送至后端特定接口，得到回调的值：_d
function getAjaxFn( _url, _data, callback ){
	 $.ajax({
			url: _url,
			type: "get",
			dataType: "json",
			data: _data,
			success: function( _d ){
				// console.log( _d );
				callback( _d );
			}
		});
}

// get方式，加载网站头文件html
function getHeader( _url, callback ){
	 $.ajax({
			url: _url,
			type: "get",
			dataType: "html",
			success: function( _d ){
				// console.log( _d );
				callback( _d );
			}
		});
}

// Ajax方式，加载网页头文件
/*(function (){
	getHeader( HeaderHtmlUrl, function( _d ){
		// console.log( _d );
		// 注意此句的写法
		// $(_d)将html格式转为jQuery格式
		$(_d).prependTo($("body"));
	} ); 
})();*/

// Ajax方式，加载公共的头文件
/*此匿名自执行函数的作用是通过控制语句执行顺序来确保
在公共的头文件加载结束之后再执行topNavFn()和columnNavFn()，否则
执行topNavFn()和columnNavFn()时会找不到dom节点。头部search框同理。*/
(function ajaxHeader(){
	getHeader( HeaderHtmlUrl, function( _d ){
		// console.log( _d );
		// 注意此句的写法
		// $(_d)将html格式转为jQuery格式
		$(_d).prependTo($("body"));
		new topNavFn();
		new columnNavFn();

		// 头部search框的得到、失去焦点
		var _hs = headerSearchFn();
		_hs.setFn( $("#headSearchKeyId") );
		// getFn是一个测试方法
		// _hs.getFn();
	} ); 
})();

// 构造器
function topNavFn(){
	this.topNavId = $("#headTopNavId");
	this.init();
}

topNavFn.prototype = {

	// 初始化方法
	init: function(){
		// console.log("初始化方法");
		// console.log(this);
		this.getData();
	},
	// 获取数据
	getData: function(){
		var _self = this;
		getDataFn( API_LIST.top_nav_data, function( _d ){
			_self.createDom( _d.topNavData );
		});
		// $.ajax({
		// 	url: "js/data/json_data_1.js",
		// 	type: "get",
		// 	dataType: "json",
		// 	success: function( _d ){
		// 		// console.log( _d );
		// 		_self.createDom( _d.topNavData );
		// 	}
		// });
	},
	// 创建Dom节点
	createDom: function( _data ){
		var _self = this;
		for (var i = 0; i < _data.length; i++) {
			$("<li>")
				.html( _data[i] )
				.on("click", function(){
					// console.log(this);
					// console.log($(this));
					_self.liEventFn($(this));
				})
				.appendTo( this.topNavId );
		}
	},
	// 添加事件
	liEventFn: function( _jqObj ){
		console.log( _jqObj.html() )
	}
}

// column导航条
function columnNavFn(){
	this.columnNavId = $("#columnNavId");
	this.init();
}

columnNavFn.prototype = {
	// 初始化方法
	init: function(){
		var _self = this;
		_self.getData();
	},
	// 获取数据
	getData: function(){
		// _self.createDom( TempDataObj.columnNavData );
		var _self = this;
		getDataFn( API_LIST.column_nav_data, function( _d ){
			_self.createDom( _d.columnNavData );
			_self.bindClickLiFn();
		});
		// $.ajax({
		// 	url: "js/data/json_data_2.js",
		// 	type: "get",
		// 	dataType: "json",
		// 	success: function( _d ){
		// 		// console.log( _d );
		// 		_self.createDom( _d.columnNavData );
		// 		_self.bindClickLiFn();
		// 	}
		// });
	},
	// 创建Dom节点
	createDom: function( _data ){
		var _self = this;
		for (var i = 0; i < _data.length; i++) {
			$("<li>")
				.html( _data[i] )
				.appendTo( this.columnNavId );
		}
	},
	//事件
	bindClickLiFn: function(){
		var _self = this;
		var _lis = _self.columnNavId.children();
		// console.log( _lis );
		_lis
			.on("click", function(){
				// console.log( _lis.html() );
				console.log( $(this).html() );
			})
		// console.log( this );
		// console.log( $(this) );
	}
}

// 头部search框的得到、失去焦点；私有模式
function headerSearchFn(){
	// 这是私有的
	var _id = "";
	// 这是私有的
	var getFn = function(){
		console.log( _id );
	}
	function headerSearchFocusEvent( _jqObj ){
		// console.log( _jqObj );
		_jqObj.on({
			focus: function(){
				$(this).val("");
			},
			blur: function(){
				$(this).val("请输入关键字");
			}
		})
	}
	var setFn = function( _jqObj ){
		_id = _jqObj;
		headerSearchFocusEvent( _id );
	}
	// 这是对外公开的
	return {
		getFn: getFn,
		setFn: setFn
	}
}

