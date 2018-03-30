$(document).ready(function(){
	$(".nav_li").eq(4).find("a").addClass("nav_on");
	$(".Exhibition").css("display","none")
	//图片展示
	$(".Exhibition_bg").click(function(){
		$(".Exhibition").css("display","none")
	})
	$(".main_header_img").click(function(){
		$(".Exhibition").css("display","block")
	})

	$(".main_cont_title li").hover(function(){
		var this_index = $(this).index();
		$(this).addClass('main_cont_title_on').siblings('').removeClass('main_cont_title_on');
		$(".main_cont_box > div").eq(this_index).addClass('main_cont_on').siblings('').removeClass('main_cont_on');
	})
})