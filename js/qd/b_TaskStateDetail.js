var state=1;
$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");
	//获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	//接收URL中的参数spid
	var tid = getUrlParam('tid');
	var username=$.cookie("user");
	taskStatus(tid,username);//是否付款判断
	var postData={username:username,tid:tid}
	console.log(postData);
	//请求
	if(!username){
		window.location.href="login.html";
	}else{
		$.ajax({
			type:"post",
			url: apiUrl+'/task/showBid',
			dataType: 'json',
			data:postData,
			success:function(e){
				console.log(e);
				var task=e.task;
				//是否显示缴纳保证金页面
				// if(task.tStatus=="竞标成功"){
				// 	$(".givingMoney").css("display","block");
				// }
				//商家id或者团队id
				var teamId;
				var tSketch=task.tSketch.split(",");
				var htmlLeft="";
				var htmlRight="";
				//左边详情
				htmlLeft+='<h1>任务需求</h1>'+
						'<p>任务类型：'+task.tType+'</p>'+
						'<p>竞标数量：'+task.competitivenum+'</p>'+
						'<p>酒店地址：'+task.hotelname+'</p>'+
						'<p>价格：'+task.maxprice+'</p>'+
						'<p>入场时间：'+task.entrancetime+'</p>'+
						'<p>入场要求：'+task.tRequire+'</p>'+
						'<p>需求描述：</p>'+
						'<p>'+task.tDesc+'</p>';
				$(".main_cont_left").html(htmlLeft);
				//草图
				for(var i=0;i<tSketch.length;i++){
					htmlRight+='<li><img src="'+tSketch[i]+'" alt=""></li>';
				}
				$(".main_cont_right ul").html(htmlRight);
				//（根据需要）是否显示重新发布按钮
				if(task.tStatus=="已失效"){
					$(".release").css("display","block");
				}else{
					$(".release").css("display","none");
				}
				//点击重新发布任务按钮
				$(".release").click(function(){
					againRelease(tid);
				})
				//重新发布任务的接口 /task/againRelease 参数tid
				function againRelease(mytid){
					$.ajax({
						type:"post",
						url: apiUrl+'/task/againRelease',
						dataType: 'json',
						data:{tid:mytid},
						success:function(e){
							console.log(e);
							if(e.status==200){
								meg("提示","重新发布任务成功！","body",reload);
							}else if(e.status==400){
								meg("提示",",重新发布任务失败！","body",reload);
							}
						},
						error:function(){
							meg("提示","网络开小差，请检查！","body");
						}
					})
				}
				//竞标商家
				// 人员商标和商品商家展示
				var businessesList=task.list//竞标团队集合
				var businessesDetail="";//竞标团体\
				if(task.list){
					if(task.tType=="舞美租赁"||task.tType=="道具租赁"){
						// 舞美和道具竞标商标的数据填充
						console.log(businessesList);
						for(var i=0;i<businessesList.length;i++){
							console.log(businessesList[i]);
							teamId=businessesList[i].mId;
							businessesDetail+='<div>'+
													'<a href="b_Pshowcase.html?fwsid='+teamId+'">'+
														'<img src="'+businessesList[i].mLogo+'" alt="">'+
													'</a>'+
													'<p class="c_name">'+businessesList[i].mName+'</p>';
													if(!businessesList[i].status){
														businessesDetail+='<p class="c_chooseButton" onclick="clickChoosing('+tid+','+teamId+')">选&nbsp;&nbsp;&nbsp;择</p>';
													}else if(businessesList[i].status==1){
														businessesDetail+='<p class="c_chooseButton">中&nbsp;&nbsp;&nbsp;标</p>';
													}else if(businessesList[i].status==0){
														businessesDetail+='<p class="c_chooseButton unbid" >选&nbsp;&nbsp;&nbsp;择</p>';
													}else if(businessesList[i].status==2){
														businessesDetail+='<p class="c_chooseButton unbid" >弃&nbsp;&nbsp;&nbsp;标</p>';
													}
							businessesDetail+='</div>';
						}
						$(".aboutDanceAndTool").html(businessesDetail);
					}else{
						// 人员竞标商标的数据填充
						console.log(businessesList);
						for(var i=0;i<businessesList.length;i++){
							//console.log(businessesList[i].tId);
							teamId=businessesList[i].tId;
							//console.log(businessesList[i]);
							businessesDetail+='<div class="compitiveMerchant_content">'+
													'<h1>'+businessesList[i].tName+'</h1>'+
													'<div class="compitive_introduce_person">';
								//console.log(businessesList[i].list);
								var compitiveList=businessesList[i].list;
								for(var s=0;s<compitiveList.length;s++){
									var compitiveDetailPerson=compitiveList[s];
									console.log(compitiveDetailPerson.status);
									//人员id
									//console.log(compitiveDetailPerson.pId);
									//pId=compitiveDetailPerson.pId;
									var p_star="";
									for(var j=0;j<compitiveDetailPerson.pStar;j++){
										p_star+="<i></i>";
									}
									//console.log(compitiveDetailPerson);
									businessesDetail+='<div>'+
															'<a href="b_Preferred_ZCR_Case.html?pid='+compitiveDetailPerson.pId+'">'+
																'<img src="'+compitiveDetailPerson.pLogo+'" alt="">'+
															'</a>'+
															'<p class="c_name">'+compitiveDetailPerson.pName+'</p>'+
															'<p class="c_star">'+p_star+'</p>'+
															'<p class="c_price">￥'+compitiveDetailPerson.pPrice+' <em>起</em></p>';
															if(!compitiveDetailPerson.status){
																businessesDetail+='<p class="c_chooseButton" onclick="clickChoosing('+tid+','+teamId+','+compitiveDetailPerson.pId+')">选&nbsp;&nbsp;&nbsp;择</p>';
															}else if(compitiveDetailPerson.status==1){
																businessesDetail+='<p class="c_chooseButton">中&nbsp;&nbsp;&nbsp;标</p>';
															}else if(compitiveDetailPerson.status==0){
																businessesDetail+='<p class="c_chooseButton unbid" >选&nbsp;&nbsp;&nbsp;择</p>';
															}else if(compitiveDetailPerson.status==2){
																businessesDetail+='<p class="c_chooseButton unbid" >弃&nbsp;&nbsp;&nbsp;标</p>';
															}
									businessesDetail+='<p class="hide">'+compitiveDetailPerson.pId+'</p>'+
														'</div>';
								}
						    businessesDetail+=      '</div>'+
											   '</div>'+
											   '<div class="hr"></div>';
						}
						$(".aboutPerson").html(businessesDetail);
					}
				}else{
					//若没有人员或商家竞标的处理
					$(".noneList").css("display","block");
				}
		
			},
			error:function(){
				meg("提示","网络开小差，请检查！","body");
			}
		})
	}
	//缴纳押金
	$(".give").click(function(){
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
})
//选择人员或者商家
function clickChoosing(tid,teamId,pId){
		var username=$.cookie("user");
		meg2("提示","是否确定选择该人员或商家？","body",success);
		// console.log($.cookie("user"));//username
		// console.log(teamId);//团队id
		// var pId=$(this).next().html();//人员id
		var choosePersonData;
		if(pId){
			choosePersonData={taskid:tid,username:username,teamid:teamId,pid:pId}
		}else{
			choosePersonData={taskid:tid,username:username,mid:teamId}
		}
		console.log(choosePersonData);
		function success(){
			$.ajax({
				type:"post",
				url: apiUrl+'/task/affirmTask',
				dataType: 'json',
				data:choosePersonData,
				success:function(e){
					console.log(e);
					if(e.status==200){
						window.location.reload()
					}else{
						meg("提示","网络开小差，请检查！","body");
					}
				},
				error:function(){
					meg("提示","网络开小差，请检查！","body");
				}
			})
		}
}
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
					$(".givingMoney").css("display","none");
				}else if(e.status==400){
					$(".givingMoney").css("display","block");
				}
			},
			error:function(){
				meg("提示","网络开小差，请检查！","body");
			}
		})
}
function reload(){
	location.reload();
}