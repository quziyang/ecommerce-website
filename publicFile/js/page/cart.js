/***********************
 * 日期：2018/07/04
 * 作者：曲子扬
 * 用途：购物车的js文件
 * version: 1.0
 * other: null
 */

function shoppingCarFn( _config ){
	for(var i in _config){
		this[i] = _config[i];
	}
	this.init();
}

shoppingCarFn.prototype = {
	constructor: shoppingCarFn,
	init: function(){
		var _self = this;
		_self.getData();
	},
	getData: function(){
		var _self = this;
		// 产品正在加载中
		_self.goodsListLoading();
		
		getDataFn(API_LIST.cart_list, function( _d ){
 			// console.log( _d );
 			if(_d.cartList.length==0){
				_self.cartMainId.html("<h1>商品列表为空，请返回商品列表页面</h1>");
				return false;
			}
 			if(_d.error.code!=0){
 				console.log( _d.error.msg );
 				return false;
 			}
 			_self.createDom( _d );
 			// 全选按钮
			_self.allSelectionBtn();
		})	
	},
	// 产品正在加载中
	goodsListLoading: function(){
		var _self = this;
		_self.cartMainId.html("<h1>商品正在加载中，请耐心等待……</h1>");
	},
	// 生成购物车列表
	createDom: function( _d ){
		var _self = this;
		_self.cartMainId.html( tplFn( _d.cartList ) );
		// 因为后面有一个公共方法调用了createDom，所以每次重新createDom之后，都要重新调用事件
		// 增加商品数量
 		_self.eventAddGoods();
 		// 减少商品数量
 		_self.eventMinusGoods();
 		// 商品数量输入
 		_self.eventGoodsNum();
 		// 购物车总共的商品数量
 		_self.totalGoodsNumId.html(_d.total.totalGoodsNum);
 		// 购物车选中的商品总价格
 		_self.selectedGoodsNumId.html(_d.total.selectedGoodsNum); 
 		// 购物车选中的商品数量
 		_self.selectedGoodsMoneyId.html(_d.total.selectedGoodsMoney); 
 		// 选中的商品总数
		_self.isCheckedGoodsNum();
		// 删除商品
		_self.deleteGoods(); 
	},
	// 增加商品数量
	eventAddGoods: function(){
		var _self = this;
		var _addBtn = _self.cartMainId.find("input.addBtn");
		_addBtn.on("click", function(){
			// 获取某项商品的信息
			_self.eventGetGoodsInfo( $(this), "add" );
			/*var $_this = $(this);
			// 这种方式太复杂
			// console.log($(this).prev().val());
			// console.log($(this).parent().parent().prev().html());
			// 这种方式避免了dom节点的查找
			// console.log($(this).parents("div.productItem").find("input.inputCheckBtn"));
			var _inputCheckBtn = $_this.parents("div.productItem").find("input.inputCheckBtn");
			var _num = _inputCheckBtn.attr("data-num");
			var _unit = _inputCheckBtn.attr("data-unit");
			console.log( _num, _unit );
			var _obj = {};
			_obj["num"] = _num;
			_obj["unit"] = _unit;
			getAjaxFn( API_LIST.cart_add, _obj, function( _d ){
				console.log(_d);
				// 更新input中data-num属性的值
				_inputCheckBtn.attr("data-num", _d.num);
				// 更新页面中显示的商品数量和小计
				// val( _d.num )只会让输入框显示为_d.num，不会改变value属性的值；
				// attr("value", _d.num)既会让输入框显示为_d.num，也会改变value属性的值
				// $_this.prev().val( _d.num );
				$_this.prev().attr("value", _d.num);
				$_this.parent().parent().next().html("￥"+_d.result);
			} );*/
		});
	},
	// 减少商品数量
	eventMinusGoods: function(){
		var _self = this;
		var _minBtn = _self.cartMainId.find("input.minBtn");
		_minBtn.on("click", function(){
			// 获取某项商品的信息
			_self.eventGetGoodsInfo( $(this), "minus" );
			/*var $_this = $(this);
			var _inputCheckBtn = $_this.parents("div.productItem").find("input.inputCheckBtn");
			var _num = _inputCheckBtn.attr("data-num");
			var _unit = _inputCheckBtn.attr("data-unit");
			// console.log( _num, _unit );
			var _obj = {};
			_obj["num"] = _num;
			_obj["unit"] = _unit;
			getAjaxFn( API_LIST.cart_minus, _obj, function( _d ){
				// console.log(_d);
				// 更新input中data-num属性的值
				_inputCheckBtn.attr("data-num", _d.num);
				// 更新页面中显示的商品数量和小计
				// $_this.next().val( _d.num );
				$_this.next().attr("value", _d.num);
				$_this.parent().parent().next().html("￥"+_d.result);
			} );*/	
		});
	},
	// 商品数量输入
	eventGoodsNum: function(){
		var _self = this;
		var _inputGoodsNum = _self.cartMainId.find("input.inputGoodsNum");
		$(".inputGoodsNum").on("blur", function(){
			// 获取某项商品的信息
			_self.eventGetGoodsInfo( $(this), "input" );
			/*var $_this = $(this);
			console.log( $_this.val() );
			var _inputCheckBtn = $_this.parents("div.productItem").find("input.inputCheckBtn");
			var _unit = _inputCheckBtn.attr("data-unit");
			var _obj = {};
			_obj["num"] = $_this.val();
			_obj["unit"] = _unit;
			getAjaxFn( API_LIST.cart_input, _obj, function( _d ){
				console.log(_d);
				// 更新input中data-num属性的值
				_inputCheckBtn.attr("data-num", _d.num);
				// 更新页面中显示的商品数量和小计
				// $_this.val(_d.num);
				$_this.attr("value", _d.num);
				$_this.parent().parent().next().html("￥"+_d.result);
			} );*/
		});
	},
	// 商品数量增加、减少、输入的公共方法
	eventGetGoodsInfo: function( _domThis, _action ){
		var _self = this;

		var _inputCheckBtn = _domThis.parents("div.productItem").find("input.inputCheckBtn");
		var _num = _inputCheckBtn.attr("data-num");
		var _unit = _inputCheckBtn.attr("data-unit");
		var _pid = _inputCheckBtn.attr("data-pid");
		// console.log( _pid );

		var _obj = {};
		_obj["num"] = _num;
		_obj["unit"] = _unit;
		_obj["pid"] = _pid;
		_obj["action"] = _action;
		// console.log( _obj );

		/*var _api_url = "";
		if(_action=="add"){
			_api_url = API_LIST.cart_add;
		}else if(_action=="minus"){
			_api_url = API_LIST.cart_minus;
		}else if(_action=="input"){
			_api_url = API_LIST.cart_input;
			if(_domThis.val()<=1){
				_domThis.val(1);
			}
			_obj["num"] = _domThis.val();
		}*/

		//避免快速点击，重复提交
		_domThis.attr("disabled", "disabled"); 

		/*getAjaxFn( _api_url, _obj, function( _d ){
			// 当有返回值时，将disabled属性去掉
			_domThis.removeAttr("disabled");
			// console.log(_d);
			// 更新input中data-num属性的值
			_inputCheckBtn.attr("data-num", _d.num);
			// 更新页面中显示的商品数量和小计
			// _domThis.next().attr("value", _d.num);
			_domThis.parent().parent().next().html("￥"+_d.result);
		});*/

		// 测试数据统一返回的接口（第二种方法）
		_api_url = API_LIST.cart_goods_obj;
		getAjaxFn( _api_url, _obj, function( _d ){
			// 当有返回值时，将disabled属性去掉
			_domThis.removeAttr("disabled");
			// console.log(_d);
			_self.createDom( _d );
			// 更新input中data-num属性的值
			// _inputCheckBtn.attr("data-num", _d.num);
			// 更新页面中显示的商品数量和小计
			// _domThis.next().attr("value", _d.num);
			// _domThis.parent().parent().next().html("￥"+_d.result);
		});
	},
	// 选中的商品总数
	isCheckedGoodsNum: function(){
		var _self = this;
		var _inputCheckBtn = _self.cartMainId.find("input.inputCheckBtn");
		// console.log( _inputCheckBtn );
		_inputCheckBtn.on("click", function(){

			// 判断点击之后的input标签是否存在checked属性
			var _isCheckArr = {
				"arrs":[]
			};
			for(var i=0; i<_inputCheckBtn.length; i++){
				// console.log( _inputCheckBtn.eq(i).is(":checked") );
				_isCheckArr.arrs.push(_inputCheckBtn.eq(i).is(":checked"));
			};
			_api_url = API_LIST.isCheck;
			// 判断点击之后的input标签是否存在checked属性，从而改变整个商品数据中isCheck的值，
			// 从而重新进行tpl的createDom，从而改变data-isCheck的值和是否存在checked属性
			getAjaxFn( _api_url, _isCheckArr, function( _d ){
				_self.createDom( _d );
				// console.log( _d );
				// 用来装载已选中商品的数量、单价
				var _arrObj = {
					"arrs":[]
				};
				// 此处注意要对_d进行操作，不能对_inputCheckBtn进行操作，
				// 因为只有_d是回调之后，重新进行了createDom之后的参数
				for(var i=0; i<_d.cartList.length; i++){

					if(_d.cartList[i].isCheck==1){
						var _temp = {};
						_temp["n"] = _d.cartList[i].num;
						_temp["u"] = _d.cartList[i].unit;
						_arrObj.arrs.push(_temp);
					}
					else{
						var _temp = {};
						_temp["n"] = 0;
						_temp["u"] = 0;
						_arrObj.arrs.push(_temp);
						// 否则_arrObj.arrs将为undefined，从而没有length属性
					}
				};
				// console.log( _arrObj );
				// 计算所有选中商品的数量、总价
				_self.selectedNumMoney(_arrObj);
				// 更新全选按钮状态
				_self.updateAllSelectionBtn( _d );
			});	
		})
	},
	// 计算所有选中商品的数量、总价
	selectedNumMoney: function( _arrObj ){
		var _self = this;
		var _api_url = API_LIST.selected_num_money;
		getAjaxFn( _api_url, _arrObj, function( _d ){
			console.log( _d );
			_self.createDom( _d );
		})
	},
	// 删除商品
	deleteGoods: function(){
		var _self = this;
		var _api_url = API_LIST.goods_delete;
		var _delBtn = _self.cartMainId.find("li.delBtn");
		_delBtn.on("click", function(){
			// console.log("xx del");
			var _inputCheckBtn = $(this).parents("div.productItem").find("input.inputCheckBtn");
			var _pid = _inputCheckBtn.attr("data-pid");
			getAjaxFn( _api_url, {pid: _pid}, function( _d ){
				// console.log( _d );
				_self.createDom( _d );
				// 更新全选按钮状态
				_self.updateAllSelectionBtn( _d );
				if(_d.cartList.length==0){
					_self.cartMainId.html("<h1>商品列表全部被删除，请返回商品列表页面</h1>");
					return false;
				}
			})	
		});
	},
	// 全选按钮
	allSelectionBtn: function(){
		var _self = this;
		var _api_url = API_LIST.all_delete;
		// var _allSelectionBtn = $("input.allSelection");
		_self.allSelection.on("click", function(){
			var _isCheck = "";
			if(_self.allSelectionBtnIsCheck==1){
				_isCheck = _self.allSelectionBtnIsCheck;
				_self.allSelectionBtnIsCheck = 0;
				_self.allSelection.removeAttr("checked");
			}else if(_self.allSelectionBtnIsCheck==0){
				_isCheck = _self.allSelectionBtnIsCheck;
				_self.allSelectionBtnIsCheck = 1;
				// _allSelectionBtn.attr("checked")，此处不能用这种写法，应该使用下面的写法
				_self.allSelection.prop("checked", true);
			}
			getAjaxFn( _api_url, {isCheck:_isCheck}, function( _d ){
				console.log( _d );
				_self.createDom( _d );
			})
		})
	},
	// 更新全选按钮状态
	updateAllSelectionBtn: function( _d ){
		var _self = this;
		var _cartList = _d.cartList;
		// 如果商品全部被删除，取消选中全选按钮
		for(var i=0;i<_cartList.length;i++){
			if(_cartList[i].isCheck==0){
				_self.allSelection.removeAttr("checked");
				break;
			}else{
				_self.allSelection.prop("checked", true);
			}
		}
	}
}

new shoppingCarFn({
	cartMainId: $("#cartMainId"),
	totalGoodsNumId: $("#totalGoodsNumTopId"),
	selectedGoodsNumId: $("#selectGoodsNumId"),
	selectedGoodsMoneyId: $("#allMoneyId"),
	allSelection: $("input.allSelection"),
	allSelectionBtnIsCheck: 1 	
})