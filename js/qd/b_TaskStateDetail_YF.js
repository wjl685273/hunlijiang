var state=1;
$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");
	var state=1;
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
	var tType = getUrlParam('tType');
	console.log(tid);
	console.log(username);
	var data={username:username,tid:tid};
	//0指代舞美和道具 1指代人员
		//personOrProp('/task/merchantInfo');
		if(!username){
			window.location.href="login.html";
		}else{
			personOrProp('/task/competitiveInfo');
		}
	function personOrProp(ajaxAddr){
		$.ajax({
			type:"post",
			url: apiUrl+ajaxAddr,
			dataType: 'json',
			data: data,
			success:function(e){
				console.log(e);
				var task=e.task;
				var personsName;//推送人员或者商家
				var tSketch=task.tSketch.split(",");//草图
				var htmlLeft="";//预加载需求
				var htmlRight="";//预加载草图
				//判断状态条的状态
				function compState(percent){
					$(".main_header_current").css("width",percent);
				}
				//状态条的状态展示
				var pstates=$(".main_header_cont li p");
				for(var i=0;i<pstates.length;i++){
					if(task.tStatus==pstates[i].innerHTML){
						if(pstates[i].innerHTML=="竞标中"){
							$(".s1").removeClass("main_header_x20").addClass("main_header_x10");
							compState('20%');
							//显示确认和取消按钮
							if(task.acceptuserinfo!=null&&task.acceptuserinfo.search(username)!=-1){
								$(".makeSure").css("display","block");
							}
						}else if(pstates[i].innerHTML=="竞标成功"){
							state=2;
							$(".makeSure").css("display","none");
							$(".s1").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s2").removeClass("main_header_x20").addClass("main_header_x10");
							compState('50%');
						}else if(pstates[i].innerHTML=="缴纳保证金中"){
							$(".makeSure").css("display","none");
							$(".s1").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s2").removeClass("main_header_x20").addClass("main_header_x10");
							$(".s3").removeClass("main_header_x20").addClass("main_header_x10");
							compState('70%');
						}else if(pstates[i].innerHTML=="执行中"){
							$(".makeSure").css("display","none");
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
				//推送人员或者商家，存在哪一个推送哪一个
				if(task.merchantInfo){
					personsName=task.merchantInfo
				}else{
					personsName=task.personsName
				}
				//如果已经竞标成功（已经点击了确定），则不需要执行下面的操作
				//如果有中标人员,若没有确定或者取消就执行下面的操作
				if(state==1){
					state=2;
					//如果存在中标人员包括自己团队
					if(task.acceptuserinfo!=null&&task.acceptuserinfo.search(username)!=-1){
						//显示确认和取消按钮
						//$(".makeSure").css("display","block");
						//若为人员，人员id
						if(!(task.tType=="舞美租赁"||task.tType=="道具租赁")){
							//人员id
							var choosePersonId=task.acceptuserinfo.substring(0,task.acceptuserinfo.length-1).split(",")[1].split(":")[1];
							console.log(choosePersonId);
						}
						$.ajax({
							type:"post",
							url: apiUrl+'task/selectOneself',
							dataType: 'json',
							data: {username:username,tid:tid},
							success:function(e){
								console.log(e);
								var choosingList=e.task.list;
								var Left='';//添加中标人员字符串
								//添加中标人员
								if(task.tType=="舞美租赁"||task.tType=="道具租赁"){
									var merchantId=choosingList[0].mId;//商家id
								}else{
									for(var i=0;i<choosingList.length;i++){
										console.log(choosingList[i]);
										if(choosingList[i].pId==choosePersonId){
											 Left='<p>中标人员：'+choosingList[i].pName+'</p>';
											$(".main_cont_left").append(Left);
										}
									}
								}
								//点击取消
								$(".cancel").click(function(){
									meg2("提示","再次确定是否竞标此任务","body",cancelFunction);
									function cancelFunction(){
										var postTaskData;
										if(task.tType=="舞美租赁"||task.tType=="道具租赁"){
										    postTaskData={username:username,taskid:tid,mid:merchantId}
										}else{
											postTaskData={username:username,taskid:tid,pid:choosePersonId}
										}
										$.ajax({
											type:"post",
											url: apiUrl+'task/giveUpTask',
											dataType: 'json',
											data: postTaskData,
											success:function(e){
												console.log(e);
												if(e.status==200){
													location.reload();
												}else{meg("提示","网络开小差，请检查！","body");}
											},
											error:function(){
												meg("提示","网络开小差，请检查！","body");
											}
										})
									}
								})
								//点击确定
								$(".sureResult").click(function(){
									meg2("提示","再次确定是否竞标此任务","body",makeSureFunction);
									function  makeSureFunction(){
											$.ajax({
												type:"post",
												url: apiUrl+'/task/confirm',
												dataType: 'json',
												data: {username:username,tid:tid},
												success:function(e){
													var task=e.task;
													console.log(e);
													if(e.status==200){
														location.reload();
														// $(".makeSure").css("display","none");
													}else{meg("提示","网络开小差，请检查！","body");}
												},
												error:function(){
													meg("提示","网络开小差，请检查！","body");
												}
											})
										
									}
								})
							},
							error:function(){
								meg("提示","网络开小差，请检查！","body");
							}
						})
					}
				}
				//左边详情
				htmlLeft+='<h1>任务需求</h1>'+
						'<p>任务类型：'+task.tType+'</p>'+
						'<p>推送人员：'+personsName+'</p>'+
						'<p>酒店地址：'+task.hoteladdress.split(",").join("")+'</p>'+
						'<p>价格：'+task.maxprice+'</p>'+
						'<p>入场时间：'+task.entrancetime+'</p>'+
						'<p>入场要求：'+task.tRequire+'</p>'+
						'<p>需求描述：</p>'+
						'<p>'+task.tDesc+'</p>';
				$(".main_cont_left").append(htmlLeft);
				//草图
				for(var i=0;i<tSketch.length;i++){
					htmlRight+='<li><img src="'+tSketch[i]+'" alt=""></li>';
				}
				$(".main_cont_right ul").html(htmlRight);
			},
			error:function(){
				meg("提示","网络开小差，请检查！","body");
			}
		})
	}
		// personOrProp('task/ selectOneself');
		// $.ajax({
		// 	type:"post",
		// 	url: apiUrl+'task/selectOneself',
		// 	dataType: 'json',
		// 	data: {username:username,tid:tid},
		// 	success:function(e){
		// 		console.log(e);
		// 	},
		// 	error:function(){
		// 		meg("提示","网络开小差，请检查！","body");
		// 	}
		// })
		//缴纳押金
	$(".payMoney").click(function(){
		$(".deposit").css("display","block");
		$(".deposit_title span ").click(function(){
			$(".deposit").css("display","none");
		})
		selectAmountByTask(username,tid);
		//点击确定付款按钮
		$(".deposit_but").click(function(){
			createTaskOrder(username,tid);
		})
	})
	//判断缴纳保证金按钮是否显示
	taskStatus(tid,username);
})
//请求交保证金的的接口
function selectAmountByTask(userName,thisTid){
	$.ajax({
		type:"post",
		url: apiUrl+'/order/selectAmountByTask',
		dataType: 'json',
		data:{username:userName,tid:thisTid},
		success:function(e){
			console.log(e);
			var needGive;//需要缴纳的钱是多少
			$(".deposit_info_x10 span").html("￥"+e.Deposit);
			if(e.Amount-e.Deposit>0){
				needGive=e.Amount-e.Deposit;
			}else{
				needGive=0;
			}
			$(".deposit_info_x20 span").html(needGive);
		},
		error:function(){
			meg("提示","网络开小差，请检查！","body");
		}
	})
}
//点击确定付款按钮发送的请求
function createTaskOrder(userName,thisTid){
	if(state==1){
		state=2
		$.ajax({
			type:"post",
			url: apiUrl+'/order/createTaskOrder',
			dataType: 'json',
			data:{username:userName,tid:thisTid},
			success:function(e){
				console.log(e);
			},
			error:function(){
				meg("提示","网络开小差，请检查！","body");
			}
		})
	}
}
//是否付款判断 接口/task/taskStatus  tid, username
function taskStatus(mytid,myusername){
		$.ajax({
			type:"post",
			url: apiUrl+'/task/taskStatus',
			dataType: 'json',
			data:{username:myusername,tid:mytid},
			success:function(e){
				console.log(e);
				if(e.status==200){
					$(".payMoney").css("display","none");
				}else if(e.status==400){
					$(".payMoney").css("display","block");
				}
			},
			error:function(){
				meg("提示","网络开小差，请检查！","body");
			}
		})
}