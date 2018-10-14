/***********************
 * 日期：2018/05/17
 * 作者：曲子扬
 * 用途：整个项目的入口文件
 * version: 1.8
 * other: null
 */

$(function(){

	// 顶导航条
	// new topNavFn();

	// column导航条
	// new columnNavFn();

	// 首页左导航条
	new leftSubNavFn();

	// 轮播图
	new sliderWrapFn({
		leftBtnId: $("#leftBtnId"),
		ulWrapId: $("#ulWrapId"),
		rightBtnId: $("#rightBtnId"),
		pointerWrapId: $("#pointerWrapId"),
		pointerUlId: $("#pointerUlId"),
		pointerWrapBgId: $("#pointerWrapBgId"),
		_inx: 0
	});

	// productList，产品列表-好品质
	new productListFn_a();
})