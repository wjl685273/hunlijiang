//动态添加头部，导航栏，底部
$(document).ready(function(){
	// 返回顶部按钮
	$("body").append('<div id="icon"><a href=".box"><img src="images/icon.png" alt=""></a></div>')
	/*头部*/
	var header = '<div class="logo"><img src="images/logo.png" alt=""></div>'+
		'<div class="header_cont">'+
			'<div class="header_cont_top">'+
				'<div class="header_search">'+
					'<input type="text" class="input_search">'+
					'<div class="but_search"></div>'+
				'</div>'+
				'<div class="header_ht">商家入驻</div>'+
				'<div class="header_user">'+
					'<div class="header_user_img"></div>'+
					'<div class="header_user_cont">'+
						'<a href="login.html">登录</a><span>|</span><a href="register.html">注册</a>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="nav">'+
				'<i class="nav_border"></i>'+
				'<ul>'+
					'<li class="nav_li"><a target="_blank" href="index.html">首页</a></li>'+
					'<li class="nav_li"><a target="_blank" href="b_MissionHall.html">任务大厅</a></li>'+
					'<li class="nav_li"><a target="_blank" href="b_Supermarket_WM.html">服务商超市</a></li>'+
					'<li class="nav_li"><a target="_blank" href="b_Preferred_ZCR.html">人员优选</a></li>'+
					'<li class="nav_li"><a target="_blank" href="b_AboutHotel.html">酒店信息</a></li>'+//20180320加的
				'</ul>'+
			'</div>'+
		'</div>';
	$("header").html(header);

	/*底部*/
	var footer = '<div class="footer">'+
		'<div class="footer_left">'+
			'<div class="footer_logo"><a href="index.html"><img src="images/login_01.png" alt=""></a></div>'+
			'<p>婚庆服务资源共享平台 WWW.WEDHLJ.COM 川ICP备06009520号 </p>'+
			'<p>Coptright ©️ 2017-2018 www.wedhlj.com,All rights reserved. </p>'+
			'<p>成都梭梭木有限公司 荣誉出品</p>'+
		'</div>'+
		'<div class="footer_right">'+
			'<div class="footer_right_01">'+
				'<a href="">关于婚礼匠</a>|'+
				'<a href="">免责声明</a>|'+
				'<a href="">广告与合作</a>|'+
				'<a href="">商业帖申请</a>|'+
				'<a href="">招聘人才</a>|'+
				'<a href="">联系我们</a>'+
			'</div>'+
			'<p>川公安安备 12010002000520号</p>'+
			'<p>中国互联网举报中心</p>'+
		'</div>'+
	'</div>';
	$("footer").html(footer);

	//导航栏二级目录
	$(".nav_cont_01").hover(
		function(){
			var package = $(this).children(".nav_package").height();
			$(this).css('height',package + "px")
		},function(){
			$(this).css('height','40px')
		}
	);
	//验证当前页面是否登录
	if ($.cookie("login_on")){
		var h_position = $.cookie("h_position");//用户类型定位信息
		//商家入驻内容
		if (!h_position || h_position == "") {
			$(".header_ht").text('商家入驻');
		}else if(h_position == 1 || h_position == 2 || h_position == 3){
			$(".header_ht").text('商家后台');
		}

		$(".header_user_img").addClass('header_user_img_on');
		$(".header_ht").addClass('hp_block');
		$(".header_user_cont").html('<span class="hp_block">'+$.cookie("user")+'</span>|<span class="off_login">退出登录</span>');//头部样式
		
		//登录状态点击进入后台||用户名
		$(".hp_block").click(function(){
			if(h_position != $.cookie("h_position")){
				window.location.href = "login.html";
				return false;
			}
			if(h_position == 0){
				var str = "";
				str = '<div id="h_position"><div class="hp_cont"><div class="hp_delete">'+
				'<span><img src="images/hp_delete.png" alt=""></span></div><ul>'+
				'<li class="hp_cont_x10 hpc_01"><a target="_blank" href="h_uploadinfo.html?info=1"><h1>您的定位:</h1><p>婚礼策划</p></a></li>'+
				'<li class="hp_cont_x10 hpc_02"><a target="_blank" href="h_uploadinfo.html?info=2"><h1>您的定位:</h1><p>婚庆人员</p></a></li>'+
				'<li class="hp_cont_x10 hpc_03"><a target="_blank" href="h_uploadinfo.html?info=3"><h1>您的定位:</h1><p>道具舞美</p></a></li>'+
				'</ul></div></div>'
				$("body").append(str);

				//点击退出商户类型选择
				$(".hp_delete span").click(function(){
					$("#h_position").remove();
				})
			}else if(!h_position || h_position == ""){
				window.open("login.html");
			}else if(h_position == 1){
				window.open("m_MerchantCenter.html");
			}else if(h_position == 2){
				window.open("p_MerchantCenter.html");
			}else if(h_position == 3){
				window.open("h_MerchantCenter.html");
			}
		})
	}else if($.cookie("login_on") == "" || !$.cookie("login_on")){
		$(".header_ht").removeClass('hp_block');
		$(".header_user_img").removeClass('header_user_img_on');
		$(".header_user_cont").html('<a href="login.html">登录</a><span>|</span><a href="register.html">注册</a>');//头部样式
		$(".header_ht").click(function(){
			window.location.href = "login.html";
		})
	}

	//点击退出登录
	$(".off_login").click(function(){
		meg2("提示","是否确定退出登录","body",doThing)
		function doThing(){
			$.cookie("login_on","",{ path:'/',secure:false , expires: -1});//清空token
			$.cookie("user","",{ path:'/',secure:false , expires: -1});//清空用户名
			$.cookie("h_position","",{ path:'/',secure:false , expires: -1});//清空用户类型定位信息
			window.location.href = "index.html";
		}	
	})	

	//返回顶部
	$(window).scroll(function(){
		var window_s = $(window).scrollTop();
		var window_h = $(window).height();
		if (window_s >= window_h) {
			$("#icon").css("display","block");
		}else if(window_s < window_h){
			$("#icon").css("display","none");
		}
	})
	$("#icon a").click(function () {
	    $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top}, 500);
	    return false;//不要这句会有点卡顿
	});
})

			
				
				
					
						
						
					
					
						
						
					
					
						
						
					
				
				
					
				
			
		
