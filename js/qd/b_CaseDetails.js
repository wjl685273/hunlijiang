$(document).ready(function(){
	$(".nav_li").eq(0).find("a").addClass("nav_on");
	//获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	//接收URL中的参数spid
	var id = getUrlParam('chid');
	var data = {
		sid:id,
	}
	$.ajax({
		type:"post",
		url: apiUrl+"scheme/selectOne",
		dataType: 'json',
		data: data,
		success:function(e){
			console.log(e)
			var person = e.person;
			$(".main_top_logo div img").attr("src",e.wLogo);//头像
			$(".main_top_cont h1").html(person.sName);//策划名
			$(".main_top_x10").html(person.sPerson);//策划师
			$(".main_top_x20").html("案例介绍："+person.sDesc);//案例简介
			$(".main_top_footer p span").html(person.sPrice);//价格
			$(".Design p").html(person.sDesign);//设计思路
			//主舞台
			var main_img01 = new Array;
			var sStage = "";
			main_img01 = person.sStage.split(",");
			for(var i=0;i<main_img01.length;i++){
				sStage +='<div class="swiper-slide swiper-no-swiping">'+
				'<img src="'+main_img01[i]+'" alt=""></div>'
			}
			$(".main_cont_x10").html(sStage)
			//礼道区
			var main_img02 = new Array;
			var sPassage = "";
			main_img02 = person.sPassage.split(",");
			for(var i=0;i<main_img02.length;i++){
				sPassage +='<div class="swiper-slide swiper-no-swiping">'+
				'<img src="'+main_img02[i]+'" alt=""></div>'
			}
			$(".main_cont_x20").html(sPassage)
			//签到区
			var main_img03 = new Array;
			var sSign = "";
			main_img03 = person.sSign.split(",");
			for(var i=0;i<main_img03.length;i++){
				sSign +='<div class="swiper-slide swiper-no-swiping">'+
				'<img src="'+main_img03[i]+'" alt=""></div>'
			}
			$(".main_cont_x30").html(sSign)
			//合影区
			var main_img04 = new Array;
			var sPhoto = "";
			main_img04 = person.sPhoto.split(",");
			for(var i=0;i<main_img04.length;i++){
				sPhoto +='<div class="swiper-slide swiper-no-swiping">'+
				'<img src="'+main_img04[i]+'" alt=""></div>'
			}
			$(".main_cont_x40").html(sPhoto)
			//甜品台
			var main_img05 = new Array;
			var sSweetmeats = "";
			main_img05 = person.sSweetmeats.split(",");
			for(var i=0;i<main_img05.length;i++){
				sSweetmeats +='<div class="swiper-slide swiper-no-swiping">'+
				'<img src="'+main_img05[i]+'" alt=""></div>'
			}
			$(".main_cont_x50").html(sSweetmeats)
			//图片展示
			var mySwiper = new Swiper('.main_Exhibition_cont', {
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
				loop: true,
			})
		},error:function(){
			meg("提示","服务器开了小差，请稍后重试","body")
		}
	})
})

function warning(){
    meg("提示","功能正在升级","body")
}