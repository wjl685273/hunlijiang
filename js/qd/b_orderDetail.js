var state=1;
$(document).ready(function(){
	if(!$.cookie("user")){
		window.location.href="login.html";
	}else{
		$(".nav_li").eq(1).find("a").addClass("nav_on");
		//获取url中的参数
		function getUrlParam(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			//构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);//匹配目标参数
			if (r != null) return unescape(r[2]); return null; //返回参数值
		}
		//接收URL中的参数spid
		var oId = getUrlParam('oId');
		var username=$.cookie("user");
		selectOrderById(oId);
	}
})

var username=$.cookie("user");
///订单详情order/ selectOrderById    orderId
function selectOrderById(myorderId){
	$.ajax({
		type:"post",
		url: apiUrl+'/order/selectOrderById',
		data:{orderId:myorderId},
		dataType: 'json',
		success:function(e){
			console.log(e);
			var order=e.order;
			var html='';
			html+='<h1>订单详情</h1>'+
					'<p>订单号：'+order.oOrderid+'</p>'+
					'<p>联系电话：'+order.oPhone+'</p>'+
					'<p>酒店地址：'+order.useaddress.split(",").join("")+'</p>'+
					'<p>价格：'+order.oAmount+'</p>'+
					'<p>执行时间：'+order.starttime+'</p>'+
					'<p>订单描述：</p>'+
					'<p>'+order.oProductdesc+'</p>';
			$(".main_cont_left").html(html);
			var statusPgress='';
			var pstates;
			if(e.status=='acceptDeposit'||e.status=='releaseDeposit'){//接受方保证金,发布方保证金
				statusPgress+='<div class="main_header_jd">'+
									'<div class="main_header_current "></div>'+
								'</div>'+
								'<ul class="main_header_cont">'+
									'<li>'+
										'<div class="main_header_x20 s1"></div>'+
										'<p>待支付</p>'+
									'</li>'+
									'<li>'+
										'<div class="main_header_x20 s2"></div>'+
										'<p>已支付</p>'+
									'</li>'+
									'<li>'+
										'<div class="main_header_x20 s3"></div>'+
										'<p>已退款</p>'+
									'</li>'+
									'<li>'+
										'<div class="main_header_x20 s4"></div>'+
										'<p>完成</p>'+
									'</li>'+
								'</ul>';
				$(".main_header").html(statusPgress);
				pstates=$(".main_header_cont li p");
				for(var i=0;i<pstates.length;i++){
					if(order.oStatus==pstates[i].innerHTML){
						if(pstates[i].innerHTML=="待支付"){
							$(".s1").removeClass("main_header_x20").addClass("main_header_x10");
							compState('20%');
						}else if(pstates[i].innerHTML=="已支付"){
							$(".s1").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s2").removeClass("main_header_x20").addClass("main_header_x10");
							compState('50%');
						}else if(pstates[i].innerHTML=="已退款"){
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
				//确定订单类型
				// var orderTypeBelong=order.oOrdername.indexOf("保证金订单");
				// console.log(orderTypeBelong);
				// if(orderTypeBelong>0){//是保证金订单
				// 	//继续缴纳保证金
				// 	$(".giveMoney").click(function(){
				// 		$(".confirm").css("display","block");
				// 		$(".confirm .deposit_title span").click(function(){$(".confirm").css("display","none");})
				// 		$(".confirm .deposit_info_x20 span").html(order.oAmount);
				// 	})
				// }else{
				// 	//继续缴纳尾款
				// 	$(".giveMoney").click(function(){
				// 		$(".final").css("display","block");
				// 		$(".final .deposit_title span").click(function(){$(".final").css("display","none");})
				// 		$(".final .deposit_info_x20 span").html(order.oAmount);
				// 	})
				// }
				$(".giveMoney").click(function(){
						//继续支付的接口，ajax请求
						continueGiveMon(order.oOrderid,username);
					})
				//退保证金
				$(".returnMoney").click(function(){
					// $(".returnConMon").css("display","block");
					// $(".returnConMon .deposit_title span").click(function(){$(".returnConMon").css("display","none");})					
					// $(".returnConMon .deposit_info_x20 span").html(order.oAmount);
					refund(myorderId);
				})
				//d订单流程中的操作
				if(order.oStatus=="待支付"){
					$(".giveMoney").css("display","block");
				}else if(order.oStatus=="已支付"){
					$(".giveMoney").css("display","none");
					$(".returnMoney").css("display","block");
				}else{
					$(".giveMoney").css("display","none");
					$(".returnMoney").css("display","none");
				}
			}else if(e.status=='finalPayment'){//尾款订单
				statusPgress+='<div class="main_header_jd main_header_jd_t">'+
									'<div class="main_header_current "></div>'+
								'</div>'+
								'<ul class="main_header_cont main_header_cont_t">'+
									'<li>'+
										'<div class="main_header_x20 s1"></div>'+
										'<p>待支付</p>'+
									'</li>'+
									'<li>'+
										'<div class="main_header_x20 s2"></div>'+
										'<p>已支付</p>'+
									'</li>'+
									'<li>'+
										'<div class="main_header_x20 s3"></div>'+
										'<p>完成</p>'+
									'</li>'+
								'</ul>';
				$(".main_header").html(statusPgress);
				pstates=$(".main_header_cont li p");
				for(var i=0;i<pstates.length;i++){
					if(order.oStatus==pstates[i].innerHTML){
						if(pstates[i].innerHTML=="待支付"){
							$(".s1").removeClass("main_header_x20").addClass("main_header_x10");
							compState('27%');
						}else if(pstates[i].innerHTML=="已支付"){
							$(".s1").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s2").removeClass("main_header_x20").addClass("main_header_x10");
							compState('72%');
						}else if(pstates[i].innerHTML=="完成"){
							$(".resultMoney").css('display','none')
							$(".s1").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s2").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s3").removeClass("main_header_x20").addClass("main_header_x10");
							compState('100%');
						}
					}else{
						continue;
					}
				}
				// //确定订单类型
				// var orderTypeBelong=order.oOrdername.indexOf("保证金订单");
				// console.log(orderTypeBelong);
				// if(orderTypeBelong>0){//是保证金订单
				// 	//继续缴纳保证金
				// 	$(".giveMoney").click(function(){
				// 		$(".confirm").css("display","block");
				// 		$(".confirm .deposit_title span").click(function(){$(".confirm").css("display","none");})
				// 		$(".confirm .deposit_info_x20 span").html(order.oAmount);
				// 	})
				// }else{
				// 	//继续缴纳尾款
				// 	$(".giveMoney").click(function(){
				// 		$(".final").css("display","block");
				// 		$(".final .deposit_title span").click(function(){$(".final").css("display","none");})
				// 		$(".final .deposit_info_x20 span").html(order.oAmount);
				// 	})
				// }
				$(".giveMoney").click(function(){
						//继续支付的接口，ajax请求
						continueGiveMon(order.oOrderid,username);
					})
				//退保证金
				$(".returnMoney").click(function(){
					// $(".returnConMon").css("display","block");
					// $(".returnConMon .deposit_title span").click(function(){$(".returnConMon").css("display","none");})					
					// $(".returnConMon .deposit_info_x20 span").html(order.oAmount);
					refund(myorderId);
				})
				//d订单流程中的操作
				if(order.oStatus=="待支付"){
					$(".giveMoney").css("display","block");
				}else{
					$(".giveMoney").css("display","none");
				}
			}
				
		},
		error:function(){
			meg("提示","网络开小差，请检查！","body");
		}
	})
}
//判断状态条的状态
function compState(percent){
	$(".main_header_current").css("width",percent);
}
//退押金接口/order/refund  orderId
function refund(myorderId){
	$.ajax({
		type:"post",
		url: apiUrl+'/order/refund',
		data:{orderId:myorderId},
		dataType: 'json',
		success:function(e){
			console.log(e);
			if(e.status==200){
				//退款成功
			}else if(e.status==300){
				//任务未完成
				meg("提示","任务未完成，不能退押金","body");
			}else if(e.status==400){
				meg("提示","网络开小差，请稍后再试！","body");
			}
		},
		error:function(){
			meg("提示","网络开小差，请检查！","body");
		}
	})
}
//保留的订单继续付款
function continueGiveMon(myorderId,username){
	$.ajax({
		type:"post",
		url: apiUrl+'/order/refund',
		data:{orderId:myorderId,username:username},
		dataType: 'json',
		success:function(e){

		},
		error:function(){
			meg("提示","网络开小差，请检查！","body");
		}
	})
}