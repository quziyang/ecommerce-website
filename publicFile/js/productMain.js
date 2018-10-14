/***********************
 * 日期：2018/06/24
 * 作者：曲子扬
 * 用途：产品详情页的入口文件
 * other: null
 */

(function( win, callback ){
	callback();
})( window, function(){
	// 产品详情页-右侧的商品详细信息
	new getGoodsInfo();
	// 产品详情页-右侧的配送地址信息
	new addressMenuFn({
 		provinceId: $("#provinceId"),
 		cityId: $("#cityId"),
 		areaId: $("#areaId"),

 		addressTitleBtnId: $("#addressTitleBtnId"),
 		addressMenuId: $("#addressMenuId"),

 		tabA: $("#tabA"),
 		tabB: $("#tabB"),
 		tabC: $("#tabC")
 	});
 	// 产品详情页-左侧的商品图片
 	new productImgWrapFn({
 		productBigImgId: $("#productBigImgId"),
 		productMaskId: $("#productMaskId"),
 		imgLoading: $("#imgLoading"),
 		mediumImgId: $("#mediumImgId"),

 		localBigImgWrapId: $("#localBigImgWrapId"),
 		// localBigImgId: $("#localBigImgId"),

 		leftBtnId: $("#leftBtnId"),
 		smallImgUlId: $("#smallImgUlId"),
 		rightBtnId: $("#rightBtnId"),
 		_inx: 0
 	});
 	// 产品详情页-右侧的购物车
 	new goodsNum({
		g_btn_a: $("#g_btn_a"),
		g_btn_b: $("#g_btn_b"),
		g_btn_c: $("#g_btn_c"),
		g_btn_d: $("#g_btn_d")
	});
} );