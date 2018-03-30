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
	console.log(tid);
	var taskType="";
	//发送请求
	var postdata={tid:tid} 
	$.ajax({
			type:"post",
			url: apiUrl+'/task/selectById',
			dataType: 'json',
			data: postdata,
			success:function(e){
				var task=e.task;
				console.log(task);
				var hoteladdress=task.hoteladdress.split(",").join('');
				//将方案草图切成数组
				var tSketch=task.tSketch.split(",");
				//任务类型
				taskType=task.tType;
				var detailLeft="";
				var detailRight="";
			//任务声明左边
				detailLeft+='<h1>任务需求</h1>'+
					'<p>任务名称：'+task.tName+'</p>'+
					'<p>任务类型：'+task.tType+'</p>'+
					'<p>竞标数量：'+task.competitivenum+'</p>'+
					'<p>酒店地址：'+hoteladdress+'</p>'+
					'<p>价格：'+task.maxprice+'</p>'+
					'<p>入场时间：'+task.entrancetime+'</p>'+
					'<p>入场要求：'+task.tRequire+'</p>'+
					'<p>需求描述：</p>'+
					'<p>'+task.tDesc+'</p>';
				$(".main_cont_left").html(detailLeft);
			//任务声明右边
				// detailRight+='<li><a href=""><img src="images/index/originality_gathered_pic02.png" alt=""></a></li>';
				for(var i=0;i<tSketch.length;i++){
					detailRight+='<li><img src="'+tSketch[i]+'" alt=""></li>';
				}
				$(".main_cont_right ul").html(detailRight);
			},
			error:function(){
				meg("提示","网络开小差，请检查！","body")
			}
		})
	//页面跳转
	$(".competition").click(function(){
		if(!username){
			window.location.href="login.html";
		}else{
			$.ajax({
				type:"post",
				url: apiUrl+'/task/competitive',
				data:{tid:tid,username:username},
				dataType:'json',
				success:function(e){
					console.log(e);
					if(e.status==200){
						meg("提示","竞标中","body",compitive);
					}else if(e.status==400){
						meg("提示","您不符合竞标要求！","body");
					}else if(e.status==300){
						meg("提示","您已经竞标过该任务！","body",doThing);
						function doThing(){
							window.location.href="b_TaskStateDetail_YF.html?tid="+tid+"";
						}
					}
				},
				error:function(){
					meg("提示","网络开小差，请检查！","body");
				}
			})
		}
		function compitive(){
			if(taskType=="舞美租赁"||taskType=="道具租赁"){
				window.location.href="b_TaskStateDetail_YF.html?tid="+tid+"";
			}else{
				window.location.href="b_TaskChooseOurPostPerson.html?tid="+tid+"";
			}
		}
	})
	merchantInfo(tid,username);
})
// ///task/merchantInfo
// function merchantInfo(tid,username){
// 	$.ajax({
// 				type:"post",
// 				url: apiUrl+'/task/competitive',
// 				data:{tid:tid,username:username},
// 				dataType:'json',
// 				success:function(e){
// 					console.log(e);
// 					window.location.href="b_TaskStateDetail_YF.html?tid="+tid+"";
// 				},
// 				error:function(){
// 					meg("提示","网络开小差，请检查！","body");
// 				}
// 		})
// }