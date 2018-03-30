//导航栏默认选中
var username=$.cookie("user");
var state=1;
$(document).ready(function(){
	on_Loading();
	$(".nav_cont_a").eq(0).addClass("nav_cont_on");
	// $(".main_Release").click(function(){
	// 	window.open("b_Posttask.html");
	// })
	var username = $.cookie("user");
	$.ajax({
		type: 'POST',
		url: apiUrl+'team/selectOne',
		dataType: 'json',
		data: {username:username},
		success:function(e){
			var merchant = e.team;
			//$(".main_Avatar_img div img").attr("src",merchant.tLogo);
			$(".main_Avatar_img div img").html('<div class="img_auto" style="background-image:url('+merchant.tLogo+')"></div>');
			$(".main_Avatar_user span").text(merchant.tName);
			down_Loading();
		},
		error:function(){
			down_Loading();
			meg('提示','当前网络不畅通,请检查您的网络','body');
		}
	})
	//点击我竞标的任务
	$(".yourTask").click(function(){
		$(this).addClass("main_st_on").siblings().removeClass("main_st_on");
		competitiveOneself(username,"全部");
		console.log(username);
	})
	//点击我发布的任务
	$(".myTask").click(function(){
		$(this).addClass("main_st_on").siblings().removeClass("main_st_on");
		checkedTaskOneself(username,"全部");
	})
	//点击我的订单
	selectOrderByType(username,'全部');//页面刷新
	$(".myOrder").click(function(){
		$(this).addClass("main_st_on").siblings().removeClass("main_st_on");
		selectOrderByType(username,'全部');
	})
	//点击订单类型
	$(".thistype li").click(function(){
		console.log($(this).html());
		$(this).parent().prev().html($(this).html());
	})
})

//竞标的任务：/task/competitiveOneself username
function competitiveOneself(myusername,mystatus){
		on_Loading();
		$.ajax({
			type: 'POST',
			url: apiUrl+'task/competitiveOneself',
			dataType: 'json',
			data: {username:myusername,status:mystatus},
			success:function(e){
				console.log(e);
				var listTask=e.listTask;
				var titleHtml='';
				titleHtml+=''+
					'<p>任务ID</p>|'+
					'<p>对接人</p>|'+
					'<p>联系电话</p>|'+
					'<p>所属公司</p>|'+
					'<p>执行日期</p>|'+
					'<div class="orderStatus">'+
						'<p>任务状态</p>'+
						'<ul class="status status_x10">'+
							'<li>全部</li>'+
							'<li>竞标中</li>'+
							'<li>竞标成功</li>'+
							'<li>缴纳保证金中</li>'+
							'<li>执行中</li>'+
							'<li>尾款结算</li>'+
							'<li>完成</li>'+
						'</ul>'+
					'</div>|'+
					'<p>任务详情</p>';
				$(".main_Attributes").html(titleHtml);
				//选择订单状态
				if(state==1){
					state=2;
					$(".status_x10 li").click(function(){
						console.log($(this).html());
						if($(this).html()=="全部"){
							$(".orderStatus p").html("竞标任务状态");
						}else{
							$(".orderStatus p").html($(this).html());
						}
						competitiveOneselfStatus(username,$(this).html());
					})
				}

				if(listTask.length){
					console.log(listTask);
					var taskDetail="";
					for(var i=0;i<listTask.length;i++){
						//tId
						taskDetail+='<div class="main_Details_cont">'+
							'<div>'+listTask[i].tId+'</div>';
						//判断是否竞标成功，决定是否显示联系人姓名和方式
						if(listTask[i].tStatus=='竞标中'){
							taskDetail+='<div>***</div>'+
								'<div>***********</div>';
						}else{
							taskDetail+='<div>'+listTask[i].contactname+'</div>'+
								'<div>'+listTask[i].contactphone+'</div>';
						}
						taskDetail+='<div>'+listTask[i].cpName+'</div>'+
							'<div>'+listTask[i].entrancetime+'</div>'+
							'<div>'+listTask[i].tStatus+'</div>';
							if(listTask[i].tStatus=='执行中'||listTask[i].tStatus=='尾款结算'||listTask[i].tStatus=='完成'){
								taskDetail+='<div class="main_Details_but"><a href="b_TaskToOrderDetail.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
							}else{
								taskDetail+='<div class="main_Details_but"><a href="b_TaskStateDetail_YF.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
							}
						taskDetail+='</div> ';
					}
					$(".main_Details").html(taskDetail);
				}else{
					$(".main_Details").html('<div class="main_Details_cont">您还没有竞标过的任务</div>')
				}
				down_Loading();
			},
			error:function(){
				down_Loading();
				meg('提示','当前网络不畅通,请检查您的网络','body');
			}
		})
}
//我发布的任务:/task/ checkedTaskOneself
function checkedTaskOneself(myusername,mystatus){
	on_Loading();
	$.ajax({
		type: 'POST',
		url: apiUrl+'/task/checkedTaskOneself',
		dataType: 'json',
		data: {username:myusername,status:mystatus},
		success:function(e){
			console.log(e);
			var listTask=e.listTask;
			var titleHtml='';
				titleHtml+=''+
					'<p>任务ID</p>|'+
					'<p>对接人</p>|'+
					'<p>联系电话</p>|'+
					'<p>所属公司</p>|'+
					'<p>执行日期</p>|'+
					'<div class="orderStatus">'+
						'<p>任务状态</p>'+
						'<ul class="status status_x20">'+
							'<li>全部</li>'+
							'<li>竞标中</li>'+
							'<li>竞标成功</li>'+
							'<li>缴纳保证金中</li>'+
							'<li>执行中</li>'+
							'<li>尾款结算</li>'+
							'<li>完成</li>'+
						'</ul>'+
					'</div>|'+
					'<p>任务详情</p>';
				$(".main_Attributes").html(titleHtml);
			//选择订单状态
			if(state==1){
				state=2;
				$(".status_x20 li").click(function(){
					console.log($(this).html());
					if($(this).html()=="全部"){
						$(".orderStatus p").html("任务状态");
					}else{
						$(".orderStatus p").html($(this).html());
					}
					checkedTaskOneselfStatus(username,$(this).html());
				})
			}
			if(listTask.length){
				console.log(listTask);
				var taskDetail="";
				for(var i=0;i<listTask.length;i++){
					//tId
					taskDetail+='<div class="main_Details_cont">'+
						'<div>'+listTask[i].tId+'</div>';
					//判断是否竞标成功，决定是否显示联系人姓名和方式
					if(listTask[i].tStatus=='竞标中'){
						taskDetail+='<div>***</div>'+
							'<div>***********</div>';
					}else{
						//竞标成功就显示联系人姓名和方式
						taskDetail+='<div>'+listTask[i].contactname+'</div>'+
							'<div>'+listTask[i].contactphone+'</div>';
					}
					taskDetail+='<div>本公司</div>'+
						'<div>'+listTask[i].entrancetime+'</div>'+
						'<div>'+listTask[i].tStatus+'</div>';
						if(listTask[i].tStatus=='执行中'||listTask[i].tStatus=='尾款结算'||listTask[i].tStatus=='完成'){
							taskDetail+='<div class="main_Details_but"><a href="b_TaskToOrderDetail.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
						}else{
							taskDetail+='<div class="main_Details_but"><a href="b_TaskStateDetail.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
						}
					taskDetail+='</div> ';
				}
				$(".main_Details").html(taskDetail);
			}else{
				$(".main_Details").html('<div class="main_Details_cont">您还没有发布的任务</div>')
			}
			down_Loading();
		},
		error:function(){
			down_Loading();
			meg('提示','当前网络不畅通,请检查您的网络','body');
		}
	})
}
//竞标的任务：选择任务状态发送ajax 请求
function competitiveOneselfStatus(myusername,mystatus){
		on_Loading();
		$.ajax({
			type: 'POST',
			url: apiUrl+'/task/competitiveOneself',
			dataType: 'json',
			data: {username:myusername,status:mystatus},
			success:function(e){
				console.log(e);
				var listTask=e.listTask;
				down_Loading();
				if(listTask.length){
					console.log(listTask);
					var taskDetail="";
					for(var i=0;i<listTask.length;i++){
						//tId
						taskDetail+='<div class="main_Details_cont">'+
							'<div>'+listTask[i].tId+'</div>';
						//判断是否竞标成功，决定是否显示联系人姓名和方式
						if(listTask[i].tStatus=='竞标中'){
							taskDetail+='<div>***</div>'+
								'<div>***********</div>';
						}else{
							taskDetail+='<div>'+listTask[i].contactname+'</div>'+
								'<div>'+listTask[i].contactphone+'</div>';
						}
							
						taskDetail+='<div>'+listTask[i].cpName+'</div>'+
							'<div>'+listTask[i].entrancetime+'</div>'+
							'<div>'+listTask[i].tStatus+'</div>';
							if(listTask[i].tStatus=='执行中'||listTask[i].tStatus=='尾款结算'||listTask[i].tStatus=='完成'){
								taskDetail+='<div class="main_Details_but"><a href="b_TaskToOrderDetail.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
							}else{
								taskDetail+='<div class="main_Details_but"><a href="b_TaskStateDetail_YF.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
							}
						taskDetail+='</div> ';
					}
					$(".main_Details").html(taskDetail);
					state=1;
				}else{
					$(".main_Details").html('<div class="main_Details_cont">该区域没有任何竞标任务</div>');
					state=1;
				}
			},
			error:function(){
				down_Loading();
				meg('提示','当前网络不畅通,请检查您的网络','body');
			}
		})
}
//我发布的任务：选择任务状态发送ajax 请求
function checkedTaskOneselfStatus(myusername,mystatus){
	on_Loading();
	$.ajax({
		type: 'POST',
		url: apiUrl+'/task/checkedTaskOneself',
		dataType: 'json',
		data: {username:myusername,status:mystatus},
		success:function(e){
			console.log(e);
			var listTask=e.listTask;
			down_Loading();
			if(listTask.length){
				console.log(listTask);
				var taskDetail="";
				for(var i=0;i<listTask.length;i++){
					//tId
					taskDetail+='<div class="main_Details_cont">'+
						'<div>'+listTask[i].tId+'</div>';
					//判断是否竞标成功，决定是否显示联系人姓名和方式
					if(listTask[i].tStatus=='竞标中'){
						taskDetail+='<div>***</div>'+
							'<div>***********</div>';
					}else{
						taskDetail+='<div>'+listTask[i].contactname+'</div>'+
							'<div>'+listTask[i].contactphone+'</div>';
					}
					taskDetail+='<div>本公司</div>'+
						'<div>'+listTask[i].entrancetime+'</div>'+
						'<div>'+listTask[i].tStatus+'</div>';
						if(listTask[i].tStatus=='执行中'||listTask[i].tStatus=='尾款结算'||listTask[i].tStatus=='完成'){
							taskDetail+='<div class="main_Details_but"><a href="b_TaskToOrderDetail.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
						}else{
							taskDetail+='<div class="main_Details_but"><a href="b_TaskStateDetail.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
						}
					taskDetail+='</div> ';
				}
				$(".main_Details").html(taskDetail);
				state=1;
			}else{
				$(".main_Details").html('<div class="main_Details_cont">该区域没有我发布的任务</div>');
				state=1;
			}
			down_Loading();
		},
		error:function(){
			down_Loading();
			meg('提示','当前网络不畅通,请检查您的网络','body');
		}
	})
}
//我的订单/order/ selectOrderByType username, type//type
function selectOrderByType(myusername,mytype,mystatus){
	on_Loading();
		$.ajax({
			type: 'POST',
			url: apiUrl+'/order/selectOrderByType',
			dataType: 'json',
			data: {username:myusername,type:mytype,status:mystatus},
			success:function(e){
				console.log(e);
				var orderList=e.orderList;
				var titleHtml='';
				var orderDetail="";
				titleHtml+='<p>订单ID</p>|'+
					'<div class="orderStatus">'+
						'<p>订单类型</p>'+
						'<ul class="status thistype">'+
							'<li>全部</li>'+
							'<li>任务订单</li>'+
							'<li>商品订单</li>'+
						'</ul>'+
					'</div>|'+
					'<p>订单金额</p>|'+
					'<p>订单描述</p>|'+
					'<p>执行日期</p>|'+
					'<div class="orderStatus">'+
						'<p>订单状态</p>'+
						'<ul class="status thisstatus">'+
							'<li>全部</li>'+
							'<li>待支付</li>'+
							'<li>已支付</li>'+
							'<li>完成</li>'+
						'</ul>'+
					'</div>|'+
					'<p>详情</p>';
				$(".main_Attributes").html(titleHtml);
				//点击订单类型
				$(".thistype li").click(function(){
					$(this).parent().prev().html($(this).html());
					var orderStatus=$(".thisstatus").prev().html();
					console.log(orderStatus);
					if(orderStatus=="订单状态"||orderStatus=="全部"){
						selectOrderByTypeStatus(myusername,$(this).html(),'全部');
					}else{
						selectOrderByTypeStatus(myusername,$(this).html(),orderStatus);
					}
				})
				//点击订单状态
				$(".thisstatus li").click(function(){
					$(this).parent().prev().html($(this).html());
					var ordertype=$(".thistype").prev().html();
					console.log(ordertype);
					if(ordertype=="订单类型"||ordertype=="全部"){
						selectOrderByTypeStatus(myusername,'全部',$(this).html());
					}else{
						selectOrderByTypeStatus(myusername,ordertype,$(this).html());
					}
				})
				if(orderList.length){
					for(var i=0;i<orderList.length;i++){
						orderDetail+='<div class="main_Details_cont">'+
							'<div>'+orderList[i].oOrderid+'</div>'+
							'<div>'+e.type+'</div>'+
							'<div>'+orderList[i].ordercash+'</div>'+
							'<div>'+orderList[i].oProductdesc+'</div>'+
							'<div>'+orderList[i].starttime+'</div>'+
							'<div>'+orderList[i].oStatus+'</div>'+
							'<div class="main_Details_but"><a href="b_orderDetail.html?oId='+orderList[i].oOrderid+'" target="_blank">查看</a></div>'+
						'</div>';
					}
					$(".main_Details").html(orderDetail);
				}else{
					$(".main_Details").html('<div class="main_Details_cont">没有符合条件的订单</div>');
				}
				down_Loading();
			},
			error:function(){
				down_Loading();
				meg('提示','当前网络不畅通,请检查您的网络','body');
			}
		})

}
//我的订单 选择类型 选择状态
function selectOrderByTypeStatus(myusername,mytype,mystatus){
	on_Loading();
		$.ajax({
			type: 'POST',
			url: apiUrl+'/order/selectOrderByType',
			dataType: 'json',
			data:{username:myusername,type:mytype,status:mystatus},
			success:function(e){
				console.log(e);
				var orderList=e.orderList;
				var orderDetail="";
				if(orderList.length){
					for(var i=0;i<orderList.length;i++){
						orderDetail+='<div class="main_Details_cont">'+
							'<div>'+orderList[i].oOrderid+'</div>'+
							'<div>'+e.type+'</div>'+
							'<div>'+orderList[i].ordercash+'</div>'+
							'<div>'+orderList[i].oProductdesc+'</div>'+
							'<div>'+orderList[i].starttime+'</div>'+
							'<div>'+orderList[i].oStatus+'</div>'+
							'<div class="main_Details_but"><a href="b_orderDetail.html?oId='+orderList[i].oOrderid+'" target="_blank">查看</a></div>'+
						'</div>';
					}
					$(".main_Details").html(orderDetail);
				}else{
					$(".main_Details").html('<div class="main_Details_cont">没有符合条件的订单</div>');
				}
				down_Loading();
			},
			error:function(){
				down_Loading();
				meg('提示','当前网络不畅通,请检查您的网络','body');
			}
		})

}




