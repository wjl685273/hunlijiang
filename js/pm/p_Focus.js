
//导航栏默认选中
var state=1;//防止多次点击
var username = $.cookie("user");
$(document).ready(function(){
	$(".nav_cont_a").eq(4).addClass("nav_cont_on");
	$(".choose_nav_li").click(function(){
		$(this).addClass("check_on").siblings().removeClass("check_on");
	})
})