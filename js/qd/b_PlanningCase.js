var state = 1;
$(document).ready(function(){
	//当前页面默认选中
	$(".nav_li").eq(0).find("a").addClass("nav_on");
	var data = {
		currentPage:1,
	};
	dis(data,"scheme/showAll","scheme/schemeCount");
	//点击导航栏执行命令
	$(".main_nav01").click(function(){
		$(".main_nav_bg span").html("风格类型");
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_x10 p").removeClass('main_nav_x10_on');
		$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
		var this_index = $(this).index();
		if(this_index == 0){
			var data = {
				currentPage:1,
			};
			dis(data,"scheme/showAll","scheme/schemeCount");
		}else if(this_index == 1){
			var data = {
				currentPage:1,
			};
			dis(data,"scheme/showAllAndStar","scheme/schemeCount");
		}else if(this_index == 2){
			var data = {
				currentPage:1,
			};
			dis(data,"scheme/showAllAndStar","scheme/schemeCount");
		}
	})
	$(".main_nav_x10 p").click(function(){
		$(".main_nav_bg span").html($(this).text());
		$(".main_nav_bg").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".main_nav01").removeClass('main_nav_on');
		$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
		var style = "";
		if($(this).text()=="全部"){
			style = "案例"
		}else{
			style = $(this).text()
		}
		var data = {
			currentPage:1,
			style:style,
		}
		dis(data,"scheme/showAllAndStyle","scheme/schemeByStyleCount");
	})

	//下拉框高度
	$(".main_nav_bg").hover(
		function(){
			var main_nav = $(".main_nav_x20").outerHeight();
			$(".main_nav_x10").css("height",main_nav);
		},function(){
			$(".main_nav_x10").css("height","0");
		}
	)
})

//url:当前访问的地址
function dis(data,url,pageUrl){
	if (state == 1) {
		state = 2;
		on_Loading();
		var style = data.style;
		$.ajax({
			type: 'POST',
			url: apiUrl+pageUrl,
			data: data,
			dataType: 'json',
			success: function(x){
				down_Loading();
				state = 1;
				//分页
				$('.main_Pagination').paging({
		            initPageNo: 1, // 初始页码
		            totalPages: x, //总页数
		            slideSpeed: 600, // 缓动速度。单位毫秒
		            jump: true, //是否支持跳转
		            callback: function(page) { // 回调函数
		            	if (state == 1) {
		            		state = 2;
		            		on_Loading();
		            		if (style) {
		            			var data={
									style:style,
									currentPage:page,
								};
		            		}else{
		            			var data={
		            				currentPage:page,
		            			};
		            		}
							//获取商家最新数据
							$.ajax({
								type: 'POST',
								url: apiUrl+url,
								data: data,
								dataType: 'json',
								success: function(e) {
									//商家内容
									if(e.lists){
										var str = ""
										for(var i=0;i<e.lists.length;i++){
											var eLists = e.lists[i];
											var s_stage = eLists.s_stage.split(",");
											str +='<li>'+
												'<a href="b_CaseDetails.html?chid='+eLists.s_id+'">'+
												'<div class="main_img">'+
												'<img src="'+s_stage[0]+'" alt="'+eLists.s_name+'">'+
												'</div>'+
												'<div class="main_cont_x10">'+
												'<h1>'+eLists.s_name+'</h1>'+
												'<p class="main_cont_x20">￥'+eLists.s_price+'</p>'+
												'<p>策划师：'+eLists.s_person+'</p>'+
												'<p>风格分类：'+eLists.s_style+'</p>'+
												'</div></a></li>';
										}
										$(".main_cont").html(str);
										down_Loading();
										state = 1;
									}else if(e.lists == null){
										down_Loading();
										$(".main_cont").html("当前并无数据");
										state = 1;
									}
									
								},
								error : function(e) {
									down_Loading();
									meg("提示","服务器开了小差，请稍后重试","body");
								}
							})
		            	}
		            }
		        })
			        
			},
			error : function(e) {
				down_Loading();
				meg("提示","服务器开了小差，请稍后重试","body");
			}
		})
	}
		
}
