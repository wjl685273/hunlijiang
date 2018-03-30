var state=1;
$(document).ready(function(){
 if($.cookie("user")){
		$(".nav_li").eq(1).find("a").addClass("nav_on");
		var username=$.cookie("user");
		//获取url中的参数
		function getUrlParam(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			//构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);//匹配目标参数
			if (r != null) return unescape(r[2]); return null; //返回参数值
		}
		//接收URL中的参数spid
		var tid = getUrlParam('tid');
		//订单详情页面
		showFinalPayment(tid,username);
		//确认支付尾款
		$(".cancel").click(function(){
			meg2("提示","确定线下付款？","body",offline);
			function offline(){
				updateOffline(tid);
			}
		})
		//确定收到尾款
		$(".payMoney").click(function(){
			meg2("提示","确定已经线下收款？","body",confirm);
			function confirm(){
				confirmOffline(tid);
			}
		})
		//点击了线上付款--缴纳尾款
		$(".deposit_but").click(function(){
			finalPayment(tid,username)
		})
	}else{
		window.location.href="login.html";
	}
})
//判断状态条的状态
function compState(percent){
	$(".main_header_current").css("width",percent);
}
//订单详情页面/task/ showFinalPayment tid, username
function showFinalPayment(mytid,myusername){
	$.ajax({
		type:"post",
		url: apiUrl+'/task/showFinalPayment',
		data:{tid:mytid,username:myusername},
		dataType: 'json',
		success:function(e){
			console.log(e);
			var task=e.task;
				//状态条的状态展示
				var pstates=$(".main_header_cont li p");
				for(var i=0;i<pstates.length;i++){
					if(task.tStatus==pstates[i].innerHTML){
						if(pstates[i].innerHTML=="对接成功"){
							$(".s1").removeClass("main_header_x20").addClass("main_header_x10");
							compState('20%');
						}else if(pstates[i].innerHTML=="执行中"){
							$(".s1").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s2").removeClass("main_header_x20").addClass("main_header_x10");
							compState('50%');
						}else if(pstates[i].innerHTML=="尾款结算"){
							$(".resultMoney").css('display','none')
							$(".s1").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s2").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s3").removeClass("main_header_x20").addClass("main_header_x10");
							compState('80%');
						}else if(pstates[i].innerHTML=="完成"){
							$(".resultMoney").css('display','none')
							$(".s1").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s2").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s3").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s4").removeClass("main_header_x20").addClass("main_header_x10");
							compState('100%');
						}
					}else{
						continue;
					}
				}
			//判断是甲方还是乙方null代表甲方没有点击线下付款，0代表点击了线下付款，1代表乙方点击了确定收款，			
			if(e.status=='accept'){
				if(task.offline){
					if(task.offline==0){
						$(".payMoney").css('display','block');
					}else if(task.offline==1){
						$(".payMoney").css('display','none');
					}//确定收款
				}
			}else if(e.status=='release'&&task.tStatus=="执行中"){
				if(task.offline){
					if(task.offline==0){
						$(".resultMoney").css('display','none');//确定线上线下缴纳尾款
					}
				}else{
					$(".resultMoney").css('display','block')
				}
			}
			var htmlLeft="",htmlRight="";
			htmlLeft+='<h1>任务需求</h1>'+
					'<p>任务类型：'+task.tType+'</p>'+
					'<p>酒店地址：'+task.hoteladdress.split(",").join("")+'</p>'+
					'<p>价格：'+task.maxprice+'</p>'+
					'<p>入场时间：'+task.entrancetime+'</p>'+
					'<p>入场要求：'+task.tRequire+'</p>'+
					'<p>需求描述：</p>'+
					'<p>'+task.tDesc+'</p>';
			$(".main_cont_left").html(htmlLeft);
			for(var i=0;i<task.tSketch.split(",").length;i++){
				htmlRight+='<li><a href=""><img src="'+task.tSketch.split(",")[i]+'" alt=""></a></li>';
			}
			$(".main_cont_right ul").html(htmlRight);
			//点击线上or线下付款按钮
			$(".sureResult").click(function(){
				$(".deposit").css("display","block");
				$(".deposit_info_x20 span").html(task.maxprice);
			})
			$(".deposit_title span").click(function(){
				$(".deposit").css("display","none");
			})
		},
		error:function(){
			meg("提示","网络开小差，请检查！","body");
		}
	})
}
//甲方点击线下付款/task/updateOffline 
function updateOffline(mytid){
	$.ajax({
		type:"post",
		url: apiUrl+'/task/updateOffline',
		data:{tid:mytid},
		dataType: 'json',
		success:function(e){
			console.log(e);
			if(e.status==400){
				meg("提示","付款提交失败，请稍后再试！","body",reload);
			}else if(e.status==200){
				meg("提示","付款提交成功！","body",reload);
			}
		},
		error:function(){
			meg("提示","网络开小差，请检查！","body");
		}
	})
}
//乙方 确定收款confirmOffline 
function confirmOffline (mytid){
	$.ajax({
		type:"post",
		url: apiUrl+'/task/confirmOffline',
		data:{tid:mytid},
		dataType: 'json',
		success:function(e){
			console.log(e);
			if(e.status==400){
				meg("提示","确认收款失败，请稍后再试！","body",reload);
			}else if(e.status==200){
				meg("提示","任务已完成！","body",reload);
			}
		},
		error:function(){
			meg("提示","网络开小差，请检查！","body");
		}
	})
}
//刷新页面
function reload(){
	location.reload();
}
//
function finalPayment(mytid,myusername){
	$.ajax({
		type:"post",
		url: apiUrl+'',
		data:{tid:mytid,username:myusername},
		dataType: 'json',
		success:function(e){
			console.log(e);
		},
		error:function(){
			meg("提示","网络开小差，请检查！","body");
		}
	})
}
