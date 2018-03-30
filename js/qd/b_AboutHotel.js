var state=1;
$(document).ready(function(){
	$(".nav_li").eq(4).find("a").addClass("nav_on");
	//	酒店所在地
	$(".main_nav01").click(function(){
		//$(".main_nav_bg span").html("地区");
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_x10 p").removeClass('main_nav_x10_on');
		$(".price_x10 p").removeClass('main_nav_x10_on');
		$(".date_x10 p").removeClass('main_nav_x10_on');
		$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	})
	$(".main_nav_x10 p").click(function(){
		$(".main_nav_bg span").html($(this).text());
		//$(".date span").html("日期排序");
		//$(".price span").html("价格排序");
		$(".main_nav_bg").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".datePrice").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav01").removeClass('main_nav_on');
		//$(this).parent().parent().parent().siblings().removeClass('main_nav_on');
		$(".price_x10 p").removeClass('main_nav_x10_on');
		$(".date_x10 p").removeClass('main_nav_x10_on');
		$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	})
	$(".main_nav_bg").hover(
		function(){
			var main_nav = $(".main_nav_x20").outerHeight();
			$(".main_nav_x10").css("height",main_nav);
		},function(){
			$(".main_nav_x10").css("height","0");
		}
	)

	//价格
	$(".main_nav01").click(function(){
		$(".price span").html("价格排序");
		$(".price").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	})
	$(".price_x10 p").click(function(){
		$(".price span").html($(this).text());
		//$(".date span").html("日期排序");
		//$(".main_nav_bg span").html("酒店所在地");
		$(".price").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".date").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_x10 p").removeClass('main_nav_x10_on');
		$(".date_x10 p").removeClass('main_nav_x10_on');
		$(this).parent().parent().parent().siblings().removeClass('main_nav_on');
		$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	})
	$(".price").hover(
		function(){
			var main_nav = $(".price_x20").outerHeight();
			$(".price_x10").css("height",main_nav);
		},function(){
			$(".price_x10").css("height","0");
		}
	)

})


	//获取类型
	//获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}



///hotel/queryAllHotelInfo
	//pageSize:页面容量
	//sort：排序方式 0按照星级排序 1价格升序 2价格降序 
	//address：地区参数
	//pageNo：当前页码
function queryAllHotelInfo(pageSize,sort,address,pageNo){
	on_Loading();
	$.ajax({
			type:"post",
			url: apiUrl+'/hotel/queryAllHotelInfo',
			dataType: 'json',
			data: {pageSize:pageSize,sort:sort,address:address,pageNo:pageNo},
			success:function(e){
				console.log(123);
				console.log(e);
				// $('.main_Pagination').paging({
			 //            initPageNo: 1, // 初始页码
			 //            totalPages: e.totalPage, //总页数
			 //            // totalCount: '合计' + 5 + '条数据', // 条目总数
			 //            slideSpeed: 600, // 缓动速度。单位毫秒
			 //            jump: true, //是否支持跳转
			 //            callback: function(page) {

			 //            }
			 //         })
			 down_Loading();
			 },
			 error:function(){
			 	down_Loading();
			 	meg("提示","请检查网络，稍后再试！","body");
			 }
	})
}
queryAllHotelInfo(6,1,1,1);
	max_text();
	//限制字符个数
	function max_text(){
		$(function(){
			$(".h_base_content").each(function(){
				var maxwidth=95;
				if($(this).text().length>maxwidth){ 
					$(this).text($(this).text().substring(0,maxwidth)); 
					$(this).html($(this).html()+'…');
				}
			});
		});
	}	

