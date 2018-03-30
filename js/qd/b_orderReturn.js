$(document).ready(function(){
	if($.cookie("user")){
		$(".nav").html('<i class="nav_border"></i>'+
			'<i class="nav_border_x10"></i>'+
			'<div class="nav_cont"><p class="nav_cont_x10">选择退款方式</p></div>'
			);
		GetDateNow();
	}else{
		window.location.href="login.html";
	}
})
function GetDateNow() {
		$.ajax({
					type : 'POST',
					crossDomain : true,//跨域请求
					url : apiUrl + '/pay/refund',
					dataType : 'json',
					async : true,//异步请求
					success : function(e) {
						//console.log(e);
						/*
						 * WIDTRout_trade_no //退款商户订单号 WIDTRtrade_no //支付宝交易号
						 * WIDTRrefund_amount //退款金额 WIDTRrefund_reason //退款原因
						 * WIDTRout_request_no //退款请求号
						 */
						document.getElementById("WIDTRtrade_no").value = e['WIDTRtrade_no'];			//支付宝交易号
						document.getElementById("WIDTRrefund_amount").value = e['WIDTRrefund_amount']; 	//退款金额
						document.getElementById("WIDTRrefund_reason").value = e['WIDTRrefund_reason'];	//退款原因
						document.getElementById("WIDTRout_request_no").value = e['WIDTRout_request_no'];	//退款请求号
						document.getElementById("WIDTRout_trade_no").value = e['WIDTRout_trade_no'];	//商户订单号
					},
					error : function(e) {
						
					}
				})
	}