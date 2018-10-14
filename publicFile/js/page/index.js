/***********************
 * 日期：2018/05/17
 * 作者：曲子扬
 * 用途：首页的js文件，jq实现
 * version: 1.8
 * other: prototype原型模式
 */

// 首页左导航条
function leftSubNavFn(){
	this.leftSubNavId = $("#leftSubNavId");
	this.init();
}

leftSubNavFn.prototype = {
	init: function(){
		var _self = this;
		// console.log("init");
		_self.getData();
	},
	getData: function(){
		var _self = this;
		getDataFn( API_LIST.left_sub_nav_data, function( _d ){
			_self.createDom( _d.leftSubNavData );
			_self.eventMouseEnter();
		    _self.eventMouseOut();  
		});
		// $.ajax({
		// 	url: "js/data/json_data_3.js",
		// 	type: "get",
		// 	dataType: "json",
		// 	success: function( _d ){
		// 		// console.log( _d );
		// 		_self.createDom( _d.leftSubNavData );
		// 		_self.eventMouseEnter();
		//     	_self.eventMouseOut();  
		// 	}
		// });
	},
	createDom: function( _data ){
		var _self = this;
		// console.log( _data )
		for (var i = 0; i < _data.length; i++) {
			$("<li>")
				.html( function(){
					var _that = $(this);
					$("<p>")
						.html( _data[i].liname )
						.appendTo( _that );
					$("<div>", {"class": "popupMenu"})
						.html( function(){
							for (var j = 0; j < _data[i].lis.length; j++) {
								$("<li>")
									.html(_data[i].lis[j])
									.appendTo( $(this) );
							}
						} )
						.appendTo( _that );
				} )
				.appendTo( _self.leftSubNavId )
		}
	},
	getLiDom: function(){
		var _self = this;
		return _self.leftSubNavId.children("li");
	},
	eventMouseEnter: function(){
		var _self = this;
		_self.getLiDom().on("mouseenter", function(){
			$(this).children("div.popupMenu").css("display", "block");	
		});
	},
	eventMouseOut: function(){
		var _self = this;
		_self.getLiDom().on("mouseout", function(){
			$(this).children("div.popupMenu").css("display", "none");	
		});
	}
}

// 轮播图
function sliderWrapFn( _config ){
	
	for ( var i in _config ){
		this[i] = _config[i];
	}
	// console.log( this );
	this.init();
}

sliderWrapFn.prototype = {
	init: function(){
		var _self = this;
		_self.getData();
	},
	getData: function(){
		var _self = this;
		// var _data = TempDataObj.sliderImgUrl;
		getDataFn( API_LIST.slider_image_data, function( _data ){
			// console.log( _d );
			var sliderImgUrl = _data.sliderImgUrl;
			_self.createUlDom( sliderImgUrl );
			_self.createPointerDom( sliderImgUrl );

			_self.setWrapWidth( sliderImgUrl );

			_self.eventLeftBtn( sliderImgUrl.length );
			_self.eventRightBtn( sliderImgUrl.length );
			_self.eventLiBtn();
		})		
	},
	createUlDom: function( _data ){
		var _self = this;
		// console.log( _data );
		for (var i = 0; i < _data.length; i++) {
			$("<li>")
				.html("<img src="+_data[i]+">")
				.appendTo( _self.ulWrapId )
		}	
	},
	createPointerDom: function( _data ){
		var _self = this;
		// console.log( _data );
		for (var i = 0; i < _data.length; i++) {
			// 添加class的第二种方式
			if(i==0){
				$("<li>", {"class": "red"})
					.appendTo( _self.pointerUlId )
			}else{
				$("<li>")
					.appendTo( _self.pointerUlId )
			}
		}
		// 添加class的第一种方式
		// console.log(_self.pointerUlId.children());
		// _self.pointerUlId.children().eq(0).addClass("red");
	},
	setWrapWidth: function( _data ){
		var _self = this;
		var _lis = _self.ulWrapId.children();
		var _width = _lis[0].children[0].width;

		_self.ulWrapId.css("width", _data.length*_width);
		_self.pointerUlId.css("width", _data.length*27);
		// console.log(_self.ulWrapId.children()[0].children[0].width);
	},
	eventLeftBtn: function( _length ){
		var _self = this;
		_self.leftBtnId.on("click", function(){
			if( _self._inx<_length-1 ){
				_self._inx++;
			}else{
				_self._inx = 0;
			}
			_self.styleMethod();
		})
	},
	eventRightBtn: function( _length ){
		var _self = this;
		_self.rightBtnId.on("click", function(){
			if( _self._inx>0 ){
				_self._inx--;
			}else{
				_self._inx = _length-1;
			}
			_self.styleMethod();
		})
	},
	// 小白点方法
	eventLiBtn: function(){
		var _self = this;
		// console.log(_self.pointerUlId.children());
		_self.pointerUlId.children().on("click", function(){
			_self._inx = $(this).index();
			// _self.ulWrapId.css("left", -(_self._inx*996));
			_self.ulWrapId.stop().animate({"left": -(_self._inx*996)}, 500);
			$(this)
				.addClass("red")
				.siblings().removeClass("red");
		})
	},
	// 图片移动、小红点切换
	styleMethod: function(){
		var _self = this;
		// _self.ulWrapId.css("left", -(_self._inx*996));
		_self.ulWrapId.stop().animate({"left": -(_self._inx*996)}, 500);
		_self.pointerUlId.children().eq( _self._inx )
				.addClass("red")
				.siblings().removeClass("red");
	}
}

// productList，产品列表-好品质
function productListFn_a(){
	this.productListId_a_Id = $("#productListId_a"); 
	this.init();
}

productListFn_a.prototype = {
	init: function(){
		var _self = this;
		_self.getData();
	},
	getData: function(){
		var _self = this;
		getDataFn(API_LIST.product_list_a, function( _data ){
			_self.createDom( _data );
			// console.log( _data );
			_self.toUrlEvent();
		});
	},
	createDom: function( _d ){
		var _self = this;
		// console.log( _d );
		var _info_list_arr = _d.info_list;
		var _styObj = null;

		for(var i=0; i<_info_list_arr.length; i++){
			// 每行第三个元素没有mr_10
			if(i%3==2){
				_styObj = {"class": "goodsBlock bg_"+(i+1)}
			}else{
				_styObj = {"class": "goodsBlock mr_10 bg_"+(i+1)};
			}
			
			// 加链接：
			$("<div>", _styObj)
				.html(function(){
					var _that1 = $(this);
					$("<dl>", {"class": "bgColor_"+(i+1)})
					    .html(function(){
					        var _that2 = $(this);
					        $("<dt>")
					            .html( _info_list_arr[i].dt_txt )
					            .appendTo( _that2 );
					        $("<dd>")
					            .html( _info_list_arr[i].dd_txt )
					            .appendTo( _that2 );
					    })
					    .appendTo( _that1 );
				})
				.attr("data-ids", _info_list_arr[i].goods_id)
				.appendTo( _self.productListId_a_Id );	
		}
	},
	toUrlEvent: function(){
		var _self = this;
		var _goodsBlock = _self.productListId_a_Id.find(".goodsBlock");
		// console.log( _goodsBlock );
		_goodsBlock.on("click", function(){
			// console.log($(this).attr("data-ids"));
			var _data_ids = $(this).attr("data-ids");
			location.href = "product.html?ids="+_data_ids;
		})
	}
}
