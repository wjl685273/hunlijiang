$(document).ready(function(){
	//当前页面默认选中
	$(".nav_li").eq(0).find("a").addClass("nav_on")
	//任务公告
	$.ajax({
		type: 'POST',
		url: apiUrl+'/task/selectAllHome',
		dataType: 'json',
		success:function(e){
			var tasks= e.lists;
			var main01_html="";
			var Fill = "";
			var Fill_index = 6-tasks.length;
			if(tasks != null || tasks != ""){
				for(var i=0;i<tasks.length;i++){
					var task=tasks[i];
					var tsketch=task.t_sketch.split(",")[0];
					main01_html+='<li>'+
						'<a href="b_TaskAnnouncements.html?tid='+task.t_id+'">'+
							'<div class="main01_left_img"><div class="img_auto" style="background-image:url('+tsketch+')"></div></div>'+
							'<div class="main01_left_cont">'+
								'<h1>'+task.t_name+'</h1>'+
								'<p>赏金 ￥'+task.maxPrice+'<span>|</span>竞标 '+task.competitiveNum+'</p>'+
								'<div class="main_left_but">查看更多</div>'+
							'</div>'+
						'</a>'+
					'</li>';
				}
			}
			for(var s=0;s<Fill_index;s++){
				Fill +='<li><a href="b_MissionHall.html"><div class="main01_left_img"><div class="img_auto" style="background-image:url(images/b_Preferred_ZCR/personnel_optimization.png)"></div></div><div class="main01_left_cont"><h1>当前暂无任务</h1><p>赏金 ￥0<span>|</span>竞标 0</p><div class="main_left_but">发布任务</div></div></a></li>'
			}	
			$(".main01_left ul").html(main01_html+Fill);
		}
	})
	//任务公告栏
	$.ajax({
		type: 'POST',
		url: apiUrl+'task/competitiveSuccess',
		dataType: 'json',
		success:function(e){
			if(e.list.lists != null||e.list.lists != ""){
				var rw_html = "";
				for(var i=0;i<e.list.lists.length;i++){
					var list = e.list.lists[i];
					rw_html+='<li class="swiper-slide swiper-no-swiping blue-slide"><span>用户 '+list.contactPhone.substring(0,7)+'**** 成功预约</span><span>"'+list.t_name+'"</span></li>'
				}
				$('.Preparation_cont ul').html(rw_html);
				var mySwiper = new Swiper('.Preparation_cont', {
					direction: 'vertical',
					autoplay: 3000,//可选选项，自动滑动
					autoplayDisableOnInteraction: false,
					loop: true,
					slidesPerView: 'auto',
					loopedSlides: 13,
				})
			}
		}
	})
	//默认人员展示
	showAll("1","主持人");
	//点击人员展示
	$(".main_lnav_x10 span").click(function(){
		var this_type = $(this).text();
		$(this).addClass('main_lnav_on').siblings().removeClass('main_lnav_on')
		showAll("1",this_type);
	})
	//人员展示
	function showAll(currentPage,type){
		$.ajax({
			type: 'POST',
			url: apiUrl+'person/showAll',
			dataType: 'json',
			data: {currentPage:currentPage,type:type},
			success: function(e){
				var str = "";
				$(".main_lcont_box ul").css("left","0");
				for(var i=0;i<e.lists.length;i++){
					var lists = e.lists[i];
					var lists_style = lists.p_style.split(",");
					str+='<li>'+
						'<a href="b_Preferred_ZCR_Case.html?pid='+lists.p_id+'">'+
							'<div class="main_lcont_img"><div class="img_auto" style="background-image:url('+lists.p_logo+')"></div></div>'+
							'<div class="main_lcont_cont">'+
								'<h1>'+type+' '+lists.p_name+'</h1>'+
								'<p>风格<span>|</span>'+lists_style[0]+'</p>'+
							'</div>'+
						'</a>'+
					'</li>'
				}
				$(".main_lcont_box ul").html(str);
				li_cont();
			}
		})
	}
	//人员内容
	function li_cont(){
		var li_length = Math.ceil($(".main_lcont_box ul li").length/3);
		var li_str ="";
		for(var i=0;i<li_length;i++){
			li_str +='<li></li>';
		}
		$(".main_lcont_but").html(li_str);
		$(".main_lcont_but li").eq(0).addClass('main_lcont_but_on')
		$(".main_lcont_but li").hover(function(){
			var this_index = $(this).index();
			$(this).addClass('main_lcont_but_on').siblings('').removeClass('main_lcont_but_on');
			$(".main_lcont_box ul").css("left",-990*this_index+"px");
		})
	}
	//热门人员
	$.ajax({
		type: 'POST',
		url: apiUrl+'person/selectHotPersons',
		dataType: 'json',
		success: function(e){
			var str = "";
			for(var i=0;i<e.lists.length;i++){
				var lists = e.lists[i];
				str+='<div class="personnel_right_cont personnel_right_off">'+
					'<div class="personnel_right_cont01">'+
						'<span>'+(i+1)+'</span>'+lists.p_name+'</div>'+
					'<a href="b_Preferred_ZCR_Case.html?pid='+lists.p_id+'">'+
						'<div class="personnel_right_x10">'+
							'<div class="personnel_right_img"><div class="img_auto" style="background-image:url('+lists.p_logo+')"></div></div>'+
							'<p><span>'+lists.property+'</span><span>￥'+lists.p_price+'</span></p>'+
						'</div>'+
					'</a>'+
				'</div>'
			}
			$(".personnel_right_01").html(str);
			$(".personnel_right_cont").eq(0).addClass('personnel_right_on');
			//广告
			$(".personnel_right_cont").hover(function(){
				$(this).addClass("personnel_right_on").siblings().removeClass("personnel_right_on").addClass("personnel_right_off")
			})
		}
	})
	//案例原稿
	$.ajax({
		type: 'POST',
		url: apiUrl+'scheme/showAllHome',
		dataType: 'json',
		success: function(e){
			if(e!=""||e!=null){
				var str = "";
				var e_length = "";
				if(e.length >= 6){
					e_length = 6;
				}else{
					e_length = e.length;
				}
				for(var i=0;i<e_length;i++){
					var e_cont = e[i];
					str+='<li>'+
						'<div class="main04_time"><span>'+e_cont.updatetime.split("-")[0].substring(2,4)+'</span><i></i><span>'+e_cont.updatetime.split("-")[1]+'月</span></div>'+
						'<a href="b_CaseDetails.html?chid='+e_cont.s_id+'">'+
							'<div class="main04_content">'+
								'<div class="main04_img"><div class="img_auto" style="background-image:url('+e_cont.s_stage.split(",")[0]+')"></div></div>'+
								'<h1>'+e_cont.s_name+'</h1>'+
								'<div class="main04_text">案例介绍：'+e_cont.s_desc+'</div>'+
								'<div class="main04_but">了解详情</div>'+
							'</div>'+
						'</a>'+
					'</li>'
				}
				$(".main04_cont").html(str);
				max_text();
			}
		}
	})
	//限制字符个数
	function max_text(){
		$(function(){
			$(".main04_text").each(function(){
				var maxwidth=40;
				if($(this).text().length>maxwidth){ 
					$(this).text($(this).text().substring(0,maxwidth)); 
					$(this).html($(this).html()+'…');
				}
			});
		});
	}	

})


