var state=1;
$(document).ready(function(){
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

	//缴纳保证金的回调函数需要的请求
///task/ selectByMerchantOrderId
	$.ajax({
		type:"post",
		url: apiUrl+'/task/selectByMerchantOrderId',
		dataType: 'json',
		success:function(e){
			var task=e.task;
			console.log(task);
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
		},
		error:function(){
			meg("提示","网络开小差，请检查！","body");
		}
	})
})