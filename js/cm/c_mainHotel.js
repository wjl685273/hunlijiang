$(document).ready(function(){
	var username=$.cookie('user');
	if(!username){
		// window.location.href="index.html";
	}else{
		$(".h_name").html(username);
	}
})
//点击人员审核 用户基本资料审核
$(".person").click(function(){//点击人员审核
	window.location.href="c_mainCheck.html?choose=0&&Cstatus=0";
})
$(".merchant").click(function(){//点击用户基本资料审核
	window.location.href="c_mainCheck.html?choose=1&&Cstatus=0";
})
//获取地址栏中的数据
function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	//构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);//匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
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