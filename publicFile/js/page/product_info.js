/***********************
 * 日期：2018/06/11
 * 作者：曲子扬
 * 用途：产品详情页左侧图片的js文件
 * version: 1.0
 * other: null
 */

 // 产品详情页-左侧的商品图片
 function productImgWrapFn( _obj ){
 	for( var i in _obj ){
 		this[i] = _obj[i];
 	}
 	this.init();
 }

 productImgWrapFn.prototype = {
 	init: function(){
 		var _self = this;
 		_self.getData();
 	},
 	getData: function(){
 		var _self = this;
 		getDataFn(API_LIST.product_imglist, function( _d ){
 			_self.createDom( _d.img_links );
 			_self.mediumImgFn( _d );
 			_self.imgLoading.css("display", "none");

 			_self.smallImgEventFn();
 			_self.leftBtnEventFn();
 			_self.rightBtnEventFn();
 			_self.maskShowFn();
 		})
 	},
 	// 生成小图列表
 	createDom: function( _imgList ){
 		var _self = this;
 		for(var i=0; i<_imgList.length; i++){
 			$("<li>")
 				.attr("data-imgId", _imgList[i].img_url)
 				.html("<img src='"+_imgList[i].img_url+"'>")
 				.appendTo(_self.smallImgUlId);
 		}
 	},
 	// 初始化中等图片和大图
 	mediumImgFn: function( _d ){
 		var _self = this;
 		_self.mediumImgId.attr("src", _d.img_links[0].img_url);
 		// 设置css写法1
 		// _self.localBigImgWrapId.css({
 		// 	"background-image": "url("+_d.img_links[0].img_url+")" 
 		// });
 		// 设置css写法2
 		_self.localBigImgWrapId.css("background-image", "url("+_d.img_links[0].img_url+")");
 	},
 	// 点击小图，切换中等图片和大图
 	smallImgEventFn: function(){
 		var _self = this;
 		var _lis = _self.smallImgUlId.find("li");
 		// console.log( _lis );
 		_lis.on("click", function(){
 			_self.imgLoading.css("display", "block");
 			var _url = $(this).attr("data-imgId");
 			_self.mediumImgId.attr("src", _url);
 			// 因为这种方法得到的大图的尺寸无法放大，因此我们不用这种方法
 			// _self.localBigImgId.attr("src", _url);
 			// 下面我们采用给大图添加背景图片的方式来实现
 			_self.localBigImgWrapId.css({
 			"background-image": "url("+_url+")" 
 		});
 			_self.imgLoading.css("display", "none");
 		})
 	},
 	// 鼠标移动事件
 	mouseMoveFn: function(){
 		var _self = this;
 		_self.productBigImgId.on("mousemove", function( _e ){
 			// console.log( _e.pageX+"--"+_e.pageY );
 			// 方法一
 			// var _eL = _e.offsetX;
 			// var _eT = _e.offsetY;
 			// 方法二
 			var _eL = _e.pageX;
 			var _eT = _e.pageY;

 			var _productBigImgIdXY = _self.productBigImgId.offset();
 			_eL = _eL-_productBigImgIdXY.left-_self.productMaskId.width()/2;
 			_eT = _eT-_productBigImgIdXY.top-_self.productMaskId.width()/2; 

 			// 设置半透明块的左右边界, 减1是为了微调的需要
 			if( _eL<0 ){
 				_eL = 0;
 			}else if( _eL> _self.productBigImgId.width()-_self.productMaskId.width()-1 ){
 				_eL = _self.productBigImgId.width()-_self.productMaskId.width()-1;
 			}
 			// 设置半透明块的上下边界, 减1是为了微调的需要
 			if( _eT<0 ){
 				_eT = 0;
 			}else if( _eT> _self.productBigImgId.height()-_self.productMaskId.height()-1 ){
 				_eT = _self.productBigImgId.height()-_self.productMaskId.height()-1;
 			}

 			_self.productMaskId.css({
 				// 100是半透明块宽高的一半
 				"left": _eL,
 				"top": _eT
 			});

 			// $("#yellowBlock").html( _eL+"--"+_eT );

 			// 大图跟随显示，3和3.3是大图与中等图片尺寸的倍数（3.3为经过微调之后的倍数）
 			// 此处加负号是因为半透明块left和top的值的变化与大图positionX和positionY的变化相反，
 			//  例如：left从10变为100（半透明块向右移动），
 			//  positionX则应从-30变为-300（大图整体向左移动，从而随之显示右侧区域）
	 		_self.localBigImgWrapId.css({
	 			"background-positionX": -(_eL)*3,
	 			"background-positionY": -(_eT)*3.3 
	 		});
 		}); 		
 	},
 	// 左按钮
 	leftBtnEventFn: function(){
 		var _self = this;
 		_self.leftBtnId.on("click", function(){
 			_self._inx++;
 			// 此处省略部分内容
 			_self.smallImgUlId.css("left", _self._inx*65);
 		})
 	},
 	// 右按钮
 	rightBtnEventFn: function(){
 		var _self = this;
 		_self.rightBtnId.on("click", function(){
 			_self._inx--;
 			// 此处省略部分内容
 			_self.smallImgUlId.css("left", _self._inx*65);
 		})
 	},
 	// 半透明遮罩显示、隐藏
 	maskShowFn: function(){
 		var _self = this;
 		_self.productBigImgId.on({
 			mouseover: function(){
 				_self.productMaskId.show();
 				_self.localBigImgWrapId.show();
 				_self.mouseMoveFn();	
 			},
 			mouseout: function(){
 				_self.productMaskId.hide();
 				_self.localBigImgWrapId.hide();	
 			}
 		});
 	},
 }

