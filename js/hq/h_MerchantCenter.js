//导航栏默认选中
$(document).ready(function(){
	on_Loading()
	$(".nav_cont_a").eq(0).addClass("nav_cont_on");
	$(".main_st_01").click(function(){
		$(this).addClass('main_st_on').siblings('').removeClass('main_st_on')
	})
	$(".main_st_02").click(function(){
		$(this).addClass('main_st_on').siblings('').removeClass('main_st_on')
	})
	var username = $.cookie("user");
	var data = {
		username:username,
	}
	$.ajax({
		type: 'POST',
		url: apiUrl+'merchant/select',
		dataType: 'json',
		data: data,
		success:function(e){
			var merchant = e.merchant;
			$(".main_Avatar_img div img").attr("src",merchant.mLogo);
			$(".main_Avatar_user span").text(merchant.mName)
			down_Loading();
		},
		error:function(){
			down_Loading();
			meg('提示','当前网络不畅通,请检查您的网络','body');
		}
	})
})
