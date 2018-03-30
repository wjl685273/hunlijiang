$(document).ready(function(){
	$(".nav_li").eq(3).find("a").addClass("nav_on");
	//获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	//接收URL中的参数spid
	var id = getUrlParam('pid');
	var pid={
		pid:id,
	}
	//请求数据
	$.ajax({
		type:"post",
		url: apiUrl+'person/ selectOne',
		dataType: 'json',
		data: pid,
		success:function(e){
			console.log(e);
			$(".person_perfect_title").text("人员优化 > "+e.team.tType+"详情");
			var person=e.person;
			var team=e.team;
			var pStar='';
			pAddr=person.pAddress.split(",").join("");
			for(var s=0;s<person.pStar;s++){
				pStar+='<i></i>';
			}
			var pCase=person.pCase.split(",");
			var html=''
			var pVideo=person.pVideo.split(",");
			pVideo.pop();
			//人员个人信息pType
			html+='<div class="person_detail">'+
				'<div class="person_pic_left">'+
					'<div class="person_pic_left_bg">'+
						'<!-- 策划师头像 -->'+
						'<div class="person_pic_left_head img_auto" style="background-image:url('+person.pLogo+')">'+
							// '<img src="'+person.pLogo+'">'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="person_detail_right">';
				//判断是否为团体
				if(person.pType=="团体"){
					html+='<div class="p_name">【'+person.pShowname+'】'+person.pName+'</div>';
				}else{
					html+='<div class="p_name">'+person.pName+'</div>';
				}
			html+=	'<div class="p_star">'+pStar+
					'<div class="p_price">￥'+person.pPrice+'<em>起</em></div>'+
					'<div class="p_addr">'+pAddr+'</div>';
					if(person.pNotice){
						html+='<div class="p_sale_content">'+person.pNotice;
					}
			html+=	'</div>'+
					'<input type="button" value="预约TA" class="pre_con">'+
					'<input type="button" value="联系TA" class="ing_con">'+
					'</div>'+
				'</div>'+
			'</div>';
			//判断团队简介
			if(person.pType=="团体"){
				html+='<div class="service_pro person_simple_intr" >'+
							'<div class="service_title">团队简介</div>'+
							'<div class="simple_intr_cont">'+team.tDesc+
								'<hr class="simple_intr_hr"/>'+
							'</div>'+
						'</div>'
			}
			//个人简介
			html+='<div class="service_pro person_simple_intr" >'+
			'<div class="service_title">人员简介</div>'+
			'<div class="simple_intr_cont">	'+person.pInfo+
				'<hr class="simple_intr_hr"/>'+
			'</div>'+
		'</div>';
			//形象展示
			html+='<div class="show_module">'+
				'<div class="service_title">人员展示</div>'+
				'<div class="show_pic">';
				for(var i=0;i<pCase.length;i++){
					// html+='<div>'+
					// 			'<img src="'+pCase[i]+'">'+
					// 	  '</div>';
					html+='<div class="img_auto" style="background-image:url('+pCase[i]+')"></div>'
				}
					// '<div>'+
					// 	'<img src="'+pCase[0]+'">'+
					// '</div>'+
					// '<div>'+
					// 	'<img src="'+pCase[1]+'">'+
					// '</div>'+
					// '<div>'+
					// 	'<img src="'+pCase[2]+'">'+
					// '</div>'+
					// '<div>'+
					// 	'<img src="'+pCase[3]+'">'+
					// '</div>'+
					// '<div>'+
					// 	'<img src="'+pCase[4]+'">'+
					// '</div>'+
					// '<div>'+
					// 	'<img src="'+pCase[5]+'">'+
					// '</div>'+
			html+='</div>'+
				'<hr class="simple_intr_hr"/>'+
			'</div>';
			//作品展示
			if(person.pVideo){
				var img="";
				if(person.pVideo){
					for(var i=0;i<pVideo.length;i++){
						img+='<a href="'+pVideo[i]+'" target="_blank">'+
								'<img src="images/b_Preferred_ZCR_Case/image_show_pic07.png">'+
							'</a>';
					}
				}
				html+='<div class="result_show">'+
					'<div class="service_title">作品展示</div>'+
					'<div class="result_video_show">'+img+'</div>'
				'</div>';
			}
			//服务承诺
			html+='<div class="service_pro">'+
				'<div class="service_title">服务承诺</div>'+
				'<div class="service">'+
					'<!-- first -->'+
					'<div class="service_item">'+
						'<div class="method">1</div>'+
						'<div class="service_content">'+
							'<h2>免费设计方案</h2>'+
							'<p>按照你的要求免费设计<br>方案,不收取费用</p>'+
						'</div>'+
					'</div>'+
					'<div><hr class="service-hr"></div>'+
					'<!-- second -->'+
					'<div class="service_item">'+
						'<div class="method">2</div>'+
						'<div class="service_content">'+
							'<h2>免费设计方案</h2>'+
							'<p>按照你的要求免费设计<br>方案,不收取费用</p>'+
						'</div>'+
					'</div>'+
					'<div><hr class="service-hr"></div>'+
					'<!-- third -->'+
					'<div class="service_item">'+
						'<div class="method">3</div>'+
						'<div class="service_content">'+
							'<h2>免费设计方案</h2>'+
							'<p>按照你的要求免费设计<br>方案,不收取费用</p>'+
						'</div>'+
					'</div>'+
					'<div><hr class="service-hr"></div>'+
					'<!-- fourth -->'+
					'<div class="service_item">'+
						'<div class="method">4</div>'+
						'<div class="service_content">'+
							'<h2>免费设计方案</h2>'+
							'<p>按照你的要求免费设计<br>方案,不收取费用</p>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div><hr class="simple_intr_hr"></div>'+
			'</div>';
			$(".total-container").html(html);

			$("input[type=button]").click(function(){
				meg("提示","功能正在升级","body")
			})

		},
		error:function(e){meg("提示","网络开小差，请检查！","body")}
	})
})