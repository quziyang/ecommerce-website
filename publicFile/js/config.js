/***********************
 * 日期：2018/06/06
 * 作者：曲子扬
 * 用途：全站的配置文件
 * other: null
 */

 // Ajax方式，加载网页头文件
 var HeaderHtmlUrl = "/html_component/header.html";

var port_1 = 7890;
var port_2 = 7891;
// 数据的接口
var SITEURL_1 = "http://localhost:"+port_1+"/";
var SITEURL_2 = "http://localhost:"+port_2+"/";

 // 接口列表
 var API_LIST = {
 	// 首页的接口
 	top_nav_data: SITEURL_1+"top_nav_data",
 	left_sub_nav_data: SITEURL_1+"left_sub_nav_data",
 	column_nav_data: SITEURL_1+"column_nav_data",
 	slider_image_data: SITEURL_1+"slider_image_data",
 	product_list_a: SITEURL_1+"product_list_a",

 	// 产品详情页的接口
 	product_imglist: SITEURL_1+"product_imglist",
 	goods_id: SITEURL_1+"product/goods_id",

 	// 产品详情页-地址信息-省市区的接口
 	province: SITEURL_1+"product/province",
 	city: SITEURL_1+"product/city",
 	area: SITEURL_1+"product/area",

 	// 跳转购物车按钮
 	goto_car_num: SITEURL_1+"product/goto_car_num",

 	// 购物车-产品列表
 	cart_list: SITEURL_2+"cart/cart_list",
 	// 购物车-增加产品（已停用）
 	cart_add: SITEURL_2+"cart/cart_add",
 	// 购物车-减少产品（已停用）
 	cart_minus: SITEURL_2+"cart/cart_minus",
 	// 购物车-输入产品数量（已停用）
 	cart_input: SITEURL_2+"cart/cart_input",
 	// 购物车-返回所有数据
 	cart_goods_obj: SITEURL_2+"cart/cart_goods_obj",
 	// 根据商品是否存在checked属性来返回data-isCheck的值
 	isCheck: SITEURL_2+"cart/isCheck",
 	// 计算所有选中商品的数量、总价
 	selected_num_money: SITEURL_2+"cart/selected_num_money",
 	// 删除商品
 	goods_delete: SITEURL_2+"cart/goods_delete",
 	// 全选商品
 	all_delete: SITEURL_2+"cart/all_delete"
 };