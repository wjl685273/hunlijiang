$(document).ready(function(){
	//验证是否为登录状态
	// if ($.cookie("login_on") == "" || !$.cookie("login_on")){
	// 	window.location.href = "index.html";
	// }
	//返回首页
	$(".sign_out p").click(function(){
		window.location.href = "index.html"
	})
	//导航栏
	var h_nav = "";
	var h_position = $.cookie("h_position");
	var h_position = 3;
	if (h_position == 1) {
		h_nav = '<div class="nav_top">商家后台</div>'+
		'<ul class="nav_cont">'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="m_MerchantCenter.html">商家中心</a>'+
				'</div>'+
			'</li>'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="m_management.html">商品管理</a>'+
				'</div>'+
			'</li>'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="m_OperationsCenter.html">运营中心</a>'+
				'</div>'+
			'</li>'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="m_Setcenter.html">设置中心</a>'+
				'</div>'+
			'</li>'+
		'</ul>';
	}else if(h_position == 2){
		h_nav = '<div class="nav_top">人员后台</div>'+
		'<ul class="nav_cont">'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="p_MerchantCenter.html">人员中心</a>'+
				'</div>'+
			'</li>'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="p_management.html">人员管理</a>'+
				'</div>'+
			'</li>'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="p_OperationsCenter.html">运营中心</a>'+
				'</div>'+
			'</li>'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="p_Setcenter.html">设置中心</a>'+
				'</div>'+
			'</li>'+
		'</ul>';
	}else if(h_position == 3){
		h_nav = '<div class="nav_top">商家后台</div>'+
		'<ul class="nav_cont">'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="h_MerchantCenter.html">商家中心</a>'+
				'</div>'+
			'</li>'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="h_management.html">商品管理</a>'+
				'</div>'+
			'</li>'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="h_OperationsCenter.html">运营中心</a>'+
				'</div>'+
			'</li>'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="h_Setcenter.html">设置中心</a>'+
				'</div>'+
			'</li>'+
			'<li>'+
				'<i></i>'+
				'<div class="nav_cont_a nav_cont_off">'+
					'<a href="p_Focus.html">我的关注</a>'+
				'</div>'+
			'</li>'+
		'</ul>';
	}
		
	$(".nav").html(h_nav);

	//头部
	var h_header = "";
	h_header = '<div class="header">'+
		'<div class="Return_index">'+
			'<a href="index.html"><p>返回首页</p></a>'+
		'</div>'+
		'<div class="header_name">'+
			'<p>用户名：<span class="h_name">'+$.cookie("user")+'</span></p>'+
		'</div>'+
		'<div class="sign_out">'+
			'<p>退出登录</p>'+
		'</div>'+
	'</div>';
	$("header").html(h_header);

	//退出登录
	$(".sign_out").click(function(){
		meg2("提示","是否确定退出登录","body",doThing)
		function doThing(){
			$.cookie("login_on","",{ path:'/',secure:false , expires: -1});//清空token
			$.cookie("user","",{ path:'/',secure:false , expires: -1});//清空用户名
			$.cookie("h_position","",{ path:'/',secure:false , expires: -1});//清空用户类型定位信息
			window.location.href = "index.html";
		}
	})
})