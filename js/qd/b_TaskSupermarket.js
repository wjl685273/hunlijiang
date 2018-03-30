var state=1;
$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");
	//	酒店所在地
	$(".main_nav01").click(function(){
		$(".main_nav_bg span").html("酒店所在地");
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_x10 p").removeClass('main_nav_x10_on');
		$(".price_x10 p").removeClass('main_nav_x10_on');
		$(".date_x10 p").removeClass('main_nav_x10_on');
		$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	})
	$(".main_nav_x10 p").click(function(){
		$(".main_nav_bg span").html($(this).text());
		$(".date span").html("日期排序");
		$(".price span").html("价格排序");
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
	
// 日期
	$(".main_nav01").click(function(){
		$(".date span").html("日期排序");
		$(".date").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	})
	$(".date_x10 p").click(function(){
		$(".date span").html($(this).text());
		$(".price span").html("价格排序");
		$(".main_nav_bg span").html("酒店所在地");
		$(".date").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".price").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_x10 p").removeClass('main_nav_x10_on');
		$(".price_x10 p").removeClass('main_nav_x10_on');
		$(this).parent().parent().parent().siblings().removeClass('main_nav_on');
		$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	})
	$(".date").hover(
		function(){
			var main_nav = $(".date_x20").outerHeight();
			$(".date_x10").css("height",main_nav);
		},function(){
			$(".date_x10").css("height","0");
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
		$(".date span").html("日期排序");
		$(".main_nav_bg span").html("酒店所在地");
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
//获取类型
	//获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
})
