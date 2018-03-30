$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");
	//请求数据
	//四大
	var data={
		currentPage:1,
	}
	//四大和道具
	fourProp('task/showByPerson',$(".fourBig"),'ad2.jpg');
	fourProp('task/showByProp',$(".prop"),'ad3.jpg');
	function fourProp(addr,selector,picAddr){
		$.ajax({
			type:"post",
			url:apiUrl+addr,
			data:data,
			dataType:"json",
			success:function(e){
				var objs=e.lists;
				console.log(objs);
				var html="";
				if(objs.length==0){
				}else if(objs.length>=4){
					for(var i=0;i<4;i++){
						var obj=objs[i];
						//console.log(obj);
						var picture=obj.t_sketch.split(',');
						html+='<div class="main02_right_01">'+
									'<a href="b_TaskAnnouncements.html?tid='+obj.t_id+'">'+
										'<div>'+
											'<img src="'+picture[0]+'" alt="">'+
										'</div>'+
										'<p>'+
											'<span>¥'+obj.maxPrice+'</span>'+obj.t_type+' '+obj.hotelName+' '+obj.entranceTime+
										'</p>'+
									'</a>'+
								'</div>';
					}
				}else{
					for(var i=0;i<objs.length;i++){
						var obj=objs[i];
						//console.log(obj);
						var picture=obj.t_sketch.split(',');
						html+='<div class="main02_right_01">'+
									'<a href="b_TaskAnnouncements.html?tid='+obj.t_id+'">'+
										'<div>'+
											'<img src="'+picture[0]+'" alt="">'+
										'</div>'+
										'<p>'+
											'<span>¥'+obj.maxPrice+'</span>'+obj.t_type+' '+obj.hotelName+' '+obj.entranceTime+
										'</p>'+
									'</a>'+
								'</div>';
					}
				}
				html+='<div class="main02_ad_01">'+
								'<a href="#">'+
									'<img src="images/b_MissionHall/'+picAddr+'" alt="">'+
								'</a>'+
							'</div>';
				selector.html(html);
			},
			error:function(){
				meg("提示","网络开小差，请稍后再试！","body");
			}
		})
	}
	//执行和舞美
	actionStage('task/showByExecute',$(".action"));
	actionStage('task/showByStage',$(".stage"));
	function actionStage(addr,selector){
		$.ajax({
			type:"post",
			url:apiUrl+addr,
			data:data,
			dataType:"json",
			success:function(e){
				var objs=e.lists;
				var html="";
				if(objs.length==0){
				}else if(objs.length>=4){
				    html+='<div class="main02_right_02">'+
								'<a href="b_TaskAnnouncements.html?tid='+objs[0].t_id+'">'+
									'<div>'+
										'<img src="'+objs[0].t_sketch.split(',')[0]+'" alt="">'+
									'</div>'+
									'<p class="x10"><span>￥'+objs[0].maxPrice+'</span>'+objs[0].t_type+' '+objs[0].hotelName+' '+objs[0].entranceTime+'</p>'+
								'</a>'+
							'</div>'+
							'<div class="main02_right_04">';
					for(var i=1;i<4;i++){
						var obj=objs[i];
						var picture=obj.t_sketch.split(',');
						html+='<div class="main02_right_03">'+
									'<div>'+
										'<a href="b_TaskAnnouncements.html?tid='+obj.t_id+'">'+
											'<img src="'+picture[i]+'" alt="">'+
											'<p>¥'+obj.maxPrice+' '+obj.t_type+' '+obj.hotelName+' '+obj.entranceTime+'</p>'+
										'</a>'+
									'</div>'+
								'</div>';
					}
					html+='</div>';
				}else if(objs.length==1){
					html+='<div class="main02_right_02">'+
							'<a href="b_TaskAnnouncements.html?tid='+objs[0].t_id+'">'+
								'<div>'+
									'<img src="'+objs[0].t_sketch.split(',')[0]+'" alt="">'+
								'</div>'+
								'<p class="x10"><span>￥'+objs[0].maxPrice+'</span>'+objs[0].t_type+' '+objs[0].hotelName+' '+objs[0].entranceTime+'</p>'+
							'</a>'+
						'</div>'+
						'<div class="main02_right_04"></div>';
				}else{
					//1-3
					html+='<div class="main02_right_02">'+
							'<a href="b_TaskAnnouncements.html?tid='+objs[0].t_id+'">'+
								'<div>'+
									'<img src="'+objs[0].t_sketch.split(',')[0]+'" alt="">'+
								'</div>'+
								'<p class="x10"><span>￥'+objs[0].maxPrice+'</span>'+objs[0].t_type+' '+objs[0].hotelName+' '+objs[0].entranceTime+'</p>'+
							'</a>'+
						'</div>'+
						'<div class="main02_right_04">';
					for(var i=1;i<objs.length;i++){
						var obj=objs[i];
						var picture=obj.t_sketch.split(',');
						html+='<div class="main02_right_03">'+
									'<div>'+
										'<a href="b_TaskAnnouncements.html?tid='+obj.t_id+'">'+
											'<img src="'+picture[i]+'" alt="">'+
											'<p>¥'+obj.maxPrice+' '+obj.t_type+' '+obj.hotelName+' '+obj.entranceTime+'</p>'+
										'</a>'+
									'</div>'+
								'</div>';
					}
					html+='</div>';
				}
				selector.html(html);
			},
			error:function(){
				meg("提示","网络开小差，请稍后再试！","body");
			}
		})
	}
	//控制发布需求按钮
	// $(".main01_right_but").click(function(){
	// 	console.log(username);
	// 	//window.location.href="b_Posttask.html";
	// 	if(username){
	// 		console.log(123);
	// 		console.log(username);
	// 		var data={username:username};
	// 		console.log(data);
	// 		$.ajax({
	// 			type:"post",
	// 			url:apiUrl+'/task/filtrate',
	// 			data:data,
	// 			dataType:"json",
	// 			success:function(e){
	// 				console.log(e);
	// 			},
	// 			error:function(){
	// 				meg("提示","网络开小差，请稍后再试！","body");
	// 			}
	// 		})
	// 	}else{
	// 		window.location.href="login.html";
	// 	}
	// })
	
})
//寻找资源