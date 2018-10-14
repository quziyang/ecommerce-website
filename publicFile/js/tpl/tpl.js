/***********************
 * 日期：2018/07/05
 * 作者：曲子扬
 * 用途：购物车页面-商品列表template
 * version: 1.0
 * other: null
 */

function tplFn( _data ){
	var _html = "";
	for(var i=0;i<_data.length;i++){
		// 此处要注意：双引号里面不能再出现双引号，应改为单引号
		_html += "<div class='productItem'>";
			_html += "<ul>";
				if(_data[i].isCheck==1){
					_html += "<li class='w_1'>";
						_html += "<input class='inputCheckBtn' data-isCheck="
							+_data[i].isCheck+" data-pid="
						    +_data[i].pid+" data-num="
							+_data[i].num+" data-unit="
							+_data[i].unit+" type='checkbox' checked/>";
					_html += "</li>";
				}else{
					_html += "<li class='w_1'>";
						_html += "<input class='inputCheckBtn' data-isCheck="
							+_data[i].isCheck+" data-pid="
						    +_data[i].pid+" data-num="
							+_data[i].num+" data-unit="
							+_data[i].unit+" type='checkbox'/>";
					_html += "</li>";
				}
				// chrome不允许以html的方式加载网络上的图片，因此我们选择本地图片
				_html += "<li class='w_2'><img src='../../image/temp/temp1.png'/></li>";
				_html += "<li class='w_3'>"+_data[i].introduce+"</li>";
				_html += "<li class='w_4'>￥"+_data[i].unit+"</li>";
				_html += "<li class='w_5'>";
					_html += "<div class='goodsNums'>";
						_html += "<input class='minBtn' type='button' value='-' />";
						_html += "<input class='goodVals inputGoodsNum' type='text' value="+_data[i].num+" />";
						_html += "<input class='addBtn' type='button' value='+' />";
					_html += "</div>";
				_html += "</li>";
				_html += "<li class='w_6'>￥"+_data[i].total+"</li>";
				_html += "<li class='delBtn'>删除</li>";
			_html += "</ul>";
		_html += "</div>";
	}
	return _html;
}

