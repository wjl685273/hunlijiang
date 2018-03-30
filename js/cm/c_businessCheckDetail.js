$(document).ready(function(){
	var username=$.cookie('user');
	if(!username){
		//window.location.href="index.html";
	}else{
		$(".h_name").html(username);
	}
	$(".hotel").click(function(){
		window.location.href="c_mainHotel.html";
	})
	//接收URL中的参数id
	var id = getUrlParam('id');
	//当前页面默认选中
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
	$(".nav_cont_a").click(function(){
		$(this).addClass("nav_cont_on").parent().siblings().children('.nav_cont_on').removeClass("nav_cont_on");
	})
	//获取审核数据详情
	selectById(id);
	//点击通过
	$(".confirm").click(function(){
		confirm(id);
	})
	//点击取消
	$(".cancel").click(function(){
		cancel(id);
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
///user/ selectById  根据ID查询用户
function selectById(myid){
	$.ajax({
		type:'post',
		url: apiUrl+'/user/selectById',
		data:{id:myid},
		dataType: 'json',
		async:false,//异步请求
		traditional:true,//阻止ajax深度序列化
		success:function(e){
			var user=e.user;
			if(user.status==2||user.status==3){
				$(".p_result").css("display",'none');
			}
			// 上传图片
			var images=user.photo.split(",");
			images.pop();
			console.log(images);
			var bigPic="";
		    var imgHtml="";
			for(var i=0;i<images.length;i++){
				imgHtml+='<li>'+
							 '<div class="small-img">'+
								'<img src="'+images[i]+'" />'+
							 '</div>'+
						  '</li>';
			}
			$(".animation03").html(imgHtml);
			// 商家名字
			$("input[name=pname]").val(user.cpName);
			// 公司类型
			$("input[name=ptype]").val(user.cpType);
			// 联系电话
			$("input[name=ptel]").val(user.phone);
			// 营业执照名称
			$("input[name=psalecard]").val(user.cpLicensename);
			// 执照编码
			$("input[name=psalecode]").val(user.cpLicensenum);
			// 身份证名称
			$("input[name=ppersonname]").val(user.identityname);
			// 身份证号
			$("input[name=paddress]").val(user.identitynum);
			// 公司地址
			$("input[name=paddress]").val(user.cpAddress);
		},
		error:function(){meg("提示","网络开小差，请检查！","body");}
	})
}
///user/confirm 确认通过
function confirm(myid){
	$.ajax({
		type:'post',
		url: apiUrl+'/user/confirm',
		data:{id:myid},
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
///user/cancel 取消 审核未通过
function cancel(myid){
	$.ajax({
		type:'post',
		url: apiUrl+'/user/cancel',
		data:{id:myid},
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
	window.location.href="c_mainCheck.html?choose=1&&Cstatus=0";
}