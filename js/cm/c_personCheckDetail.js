$(document).ready(function(){
	var username=$.cookie('user');
	if(!username){
		// window.location.href="index.html";
	}else{
		$(".h_name").html(username);
	}
	$(".hotel").click(function(){
		window.location.href="c_mainHotel.html";
	})
	//当前页面默认选中
	$(".nav_cont_a").eq(0).addClass("nav_cont_on");
	$(".nav_cont_a").click(function(){
		$(this).addClass("nav_cont_on").parent().siblings().children('.nav_cont_on').removeClass("nav_cont_on");
	})

	//获取pid
	var pid=getUrlParam('pid');
	selectOne(pid);
	//点击通过
	$(".confirm").click(function(){
		confirm(pid);
	})
	//点击取消
	$(".cancel").click(function(){
		cancel(pid);
	})
})
//获取地址栏中的数据
function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	//构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);//匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}
//点击人员审核 用户基本资料审核
$(".person").click(function(){//点击人员审核
	window.location.href="c_mainCheck.html?choose=0&&Cstatus=0";
})
$(".merchant").click(function(){//点击用户基本资料审核
	window.location.href="c_mainCheck.html?choose=1&&Cstatus=0";
})

//根据ID查询人员信息 /person/ selectOne  参数pid
function selectOne(mypid){
	$.ajax({
		type:'post',
		url: apiUrl+'/person/selectOne',
		data:{pid:mypid},
		dataType: 'json',
		success:function(e){
			var user=e.person;
			if(user.pStatus==1||user.pStatus==2){
				$(".p_result").css("display",'none');
			}
			// 名字
			$("input[name=pname]").val(user.pName);
			// 类型
			$("input[name=ptype]").val(user.pType);
			// 身高
			$("input[name=pheight]").val(user.pHight);
			// 风格
			$("input[name=pstyle]").val(user.pStyle);
			// 价格
			$("input[name=pprice]").val(user.pPrice);
			//头像
			$(".logoInfo").html('<img src="'+user.pLogo+'" alt="">');
			//案例图片
			var images=user.pCase.split(",");
			var imgHtml="";
			for(var i=0;i<images.length;i++){
				//imgHtml+='<div class="p_picture"><img src="'+images[i]+'" alt=""></div>';
				imgHtml+='<div class="p_picture img_auto" style="background-image: url('+images[i]+')"></div>';
			}
			$(".pictures").html(imgHtml);
		},
		error:function(){meg("提示","网络开小差，请检查！","body");}
	})
}
//确认   审核通过  /person/confirm  参数pid
function confirm(mypid){
	$.ajax({
		type:'post',
		url: apiUrl+'/person/confirm',
		data:{pid:mypid},
		dataType: 'json',
		success:function(e){
			if(e.status==200){
				meg("提示","操作成功！","body",reload)
			}else{
				meg("提示","操作失败！","body",reload)
			}
		},
		error:function(){meg("提示","网络开小差，请检查！","body");}
	})
}
//取消 审核未通过  /person/cancel   参数pid
function cancel(mypid){
	$.ajax({
		type:'post',
		url: apiUrl+'/person/cancel',
		data:{pid:mypid},
		dataType: 'json',
		success:function(e){
			if(e.status==200){
				meg("提示","操作成功！","body",reload)
			}else{
				meg("提示","操作失败！","body",reload)
			}
		},
		error:function(){meg("提示","网络开小差，请检查！","body");}
	})
}
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
function reload(){
	location.reload();
	window.location.href="c_mainCheck.html?choose=0&&Cstatus=0";
}