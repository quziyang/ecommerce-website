/***********************
 * 日期：2018/06/05
 * 作者：曲子扬
 * 用途：nodejs中间件，提供一些接口
 * other: 因为没有MongoDB，数据依然是写死在接口中的
 */

 var _express = require("express");
 var _app = _express();
 _app.all('*', function(req, res, next) {
    	res.header("Access-Control-Allow-Origin", "*");
    	res.header("Access-Control-Allow-Headers", "X-Requested-With");
    	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    	res.header("X-Powered-By",' 3.2.1')
    	res.header("Content-Type", "application/json;charset=utf-8");
    	next();
	});

// 这是一个接口，用于客户端向此发出请求（get）
// 顶导航条
 _app.get("/top_nav_data", function(req, res){
 	   var _data = {
 		  topNavData: [
			"你好，请登录",
			"免费注册",
			"我的订单",
			"我的京东",
			"企业采购",
			"客户服务"
					  ]
 		           }
// 向客户端，传送http响应
 	res.send( _data );
 	res.end();
 });

// 左侧子导航条
  _app.get("/left_sub_nav_data", function(req, res){
 	    var _data = {
 		  leftSubNavData: [
			{
				liname: "手机x",
				lis: ["手机111", "手机222", "手机333"]
			},{
				liname: "家电x",
				lis: ["家电111", "家电222", "家电333", "家电444"]
			},{
				liname: "电脑x",
				lis: ["电脑111", "电脑222", "电脑333"]
			}
					     ]
 		            }
// 向客户端，传送http响应
 	res.send( _data );
 	res.end();
 });

// 栏目导航条
  _app.get("/column_nav_data", function(req, res){
 	   var _data = {
 		  columnNavData: [
			"秒杀",
			"优惠券",
			"闪购",
			"京东超市",
			"拍卖",
			"秒杀",
			"优惠",
			"闪购",
			"拍卖"
					 ]
 		           }
// 向客户端，传送http响应
 	res.send( _data );
 	res.end();
 });

 // 首页轮播图
  _app.get("/slider_image_data", function(req, res){
 	   var _data = {
			 		  sliderImgUrl:[
					 	"image/temp/1.jpg",
					 	"image/temp/2.jpg",
					 	"image/temp/3.jpg",
					 	"image/temp/4.jpg"
			 			]
 		   			}
// 向客户端，传送http响应
 	res.send( _data );
 	res.end();
 });

// 首页-产品列表
  _app.get("/product_list_a", function(req, res){
 	   var _data = {
                      "info_list": [
                          {
                              "dt_txt": "a111",
                              "dd_txt": "b111",
                              "goods_id": "c111",
                              "img": "image/temp/temp1.png"
                          },
                          {
                              "dt_txt": "a222",
                              "dd_txt": "b222",
                              "goods_id": "c222",
                              "img": "image/temp/temp2.png"
                          },
                          {
                              "dt_txt": "a333",
                              "dd_txt": "b333",
                              "goods_id": "c333",
                              "img": "image/temp/temp3.png"
                          }
                      ]
                    }
    // 向客户端，传送http响应
 	res.send( _data );
 	res.end();
 });

 // ================产品详情页，左侧图片链接=================
 // 产品图片列表
  _app.get("/product_imglist", function(req, res){
 	   var _data ={
           "img_links": [
               {
                   "img_url": "http://img.hb.aicdn.com/4e721f2b80dac4db64b8d75345b1de1d40abdfe76df2f-3wEEy8"
               },
               {
                   "img_url": "http://img.hb.aicdn.com/6895ea3cc02010ba6be12ee3c0c1b7cf9ce71ccf209f5-yBZb26"
               },
               {
                   "img_url": "http://img.hb.aicdn.com/8be617cd938a3e111b3e0ca03240c963602be74541ba5-D8UPcT"
               },
               {
                   "img_url": "http://img.hb.aicdn.com/eb5ddd917d44181242ab3ee3b791245d2b246de0204e4-ajaqZn"
               }
           ]
       }
    // 向客户端，传送http响应
 	res.send( _data );
 	res.end();
 });

// =============产品详情页，右侧根据id返回产品信息==================
// 产品图片列表

// req.query即（_ids）是getAjaxFn函数发送至该中间件（后端）接口的参数
// _data是该后端接口返回getAjaxFn函数的值
 _app.get("/product/goods_id", function(req, res){
 	var _ids = req.query.param;
 	// console.log( _ids );

 	var _data = null;
 	if( _ids == "c111"){
 		_data = {
 			"title": "联想(Lenovo)拯救者R720 15.6英寸大屏游戏笔记本电脑(i5-7300HQ 8G 1T+128G SSD GTX1050Ti 4G IPS 黑金)",
    		"ads": [
        		"【京东电脑节开年大促】3月6号0:00-24:00笔记本超级品类日，仅仅24小时",
        		"aaaaa",
        		"cccc"
    		],
    		"ids": "id_xx1"
 		};
 	}else if( _ids == "c222" ){
 		_data = {
 			"title": "荣耀9 全网通 标配版 4GB+64GB 幻夜黑 移动联通电信4G手机 双卡双待",
    		"ads": [
        		"领券立减100！",
				"低至1899！",
				"2000万变焦双摄，",
				"3D曲面极光玻璃"
    		],
    		"ids": "id_xx2"
 		};
 	}else if( _ids == "c333" ){
 		_data = {
 			"title": "大疆（DJI）“御”Mavic Air 便携可折叠4K无人机全能套装（雪域白）超清航拍",
    		"ads": ["【京东自营】便携可折叠，性能不妥协，享白条6期免息"],
    		"ids": "id_xx3"
 		};
 	}
   // 向客户端，传送http响应
 res.send( _data );
 res.end();
});

// 产品详情页，地址信息，省
 _app.get("/product/province", function(req, res){
	var _data = {
		"province": [
			{
				"name": "北京",
				"_id": 1
			},{
				"name": "上海",
				"_id": 2
			},{
				"name": "山东",
				"_id": 3
			},{
				"name": "江苏",
				"_id": 4
			},{
				"name": "浙江",
				"_id": 5
			},{
				"name": "广东",
				"_id": 6
			}
		]
	};
 	
   // 向客户端，传送http响应
 res.send( _data );
 res.end();
});

// 产品详情页，地址信息，市
 _app.get("/product/city", function(req, res){
	var _data = {
		"city": [
			{
				"name": "苏州",
				"_id": 1
			},{
				"name": "无锡",
				"_id": 2
			},{
				"name": "青岛",
				"_id": 3
			},{
				"name": "烟台",
				"_id": 4
			},{
				"name": "南京",
				"_id": 5
			},{
				"name": "杭州",
				"_id": 6
			}
		]
	};
 	
   // 向客户端，传送http响应
 res.send( _data );
 res.end();
});

// 产品详情页，地址信息，区
 _app.get("/product/area", function(req, res){
	var _data = {
		"area": [
			{
				"name": "市南区",
				"_id": 1
			},{
				"name": "市北区",
				"_id": 2
			},{
				"name": "李沧区",
				"_id": 3
			},{
				"name": "城阳区",
				"_id": 4
			},{
				"name": "崂山区",
				"_id": 5
			},{
				"name": "黄岛区",
				"_id": 6
			}
		]
	};
 	
   // 向客户端，传送http响应
 res.send( _data );
 res.end();
});

// 产品详情页-商品数量
// 为了使商品数量可以持续变化，所以将其设置为全局变量
var Goto_car_numVal = {"xx": 6};
_app.get("/product/goto_car_num", function(req, res){
	console.log(req.query.ops);
	// var _data = {"xx": 112};
	if( req.query.ops == "add" ){
		// 每次点击都是从112变成113，_data的值无法保存
		// _data.xx++;
		Goto_car_numVal.xx++;
	}else if( req.query.ops == "minus" ){
		// 每次点击都是从112变成111，_data的值无法保存
		// _data.xx--;
		if( Goto_car_numVal.xx>1 ){
			Goto_car_numVal.xx--;
		}	
	}else if( req.query.ops == "enter" ){
		Goto_car_numVal.xx = req.query._num;
	}
	res.send( Goto_car_numVal );
	res.end();
});

 _app.listen(7890, function(){
 	console.log("7890,jq版本的api列表运行了");
 })