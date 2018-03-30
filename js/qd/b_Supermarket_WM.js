$(".main_nav01").click(function(){
	$(".main_nav_bg span").html("商家所在地");
	$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
	$(".main_nav_x10 p").removeClass('main_nav_x10_on');
	$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
})
$(".main_nav_x10 p").click(function(){
	$(".main_nav_bg span").html($(this).text());
	$(".main_nav_bg").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
	$(".main_nav01").removeClass('main_nav_on');
	$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
})
$(".main_nav_bg").hover(
	function(){
		var main_nav = $(".main_nav_x20").outerHeight();
		$(".main_nav_x10").css("height",main_nav);
	},function(){
		$(".main_nav_x10").css("height","0");
	}
)

function warning(){
    meg("提示","功能正在升级","body")
}
var state = 1;
var ptype = "";
//页面初始化，导入信息
$(document).ready(function(){
	//当前页面默认选中
	$(".nav_li").eq(2).find("a").addClass("nav_on")
	//获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	//接收URL中的参数fwsid
	var id = getUrlParam('fws');
	if (!id) {
		id = "1";
		ptype = "舞美";
	}else if(id == "1"){
		ptype = "舞美";
	}else if(id == "2"){
		ptype = "道具";
	}

	var data = {
		currentPage:1,
	} 
	if (id == "1") {
		$(".main_left_address span").html("舞美服务商");
		dis(data,'merchant/stageList','merchant/stageCount');
	}else if(id == "2"){
		$(".main_left_address span").html("道具服务商");
		dis(data,'merchant/propList','merchant/propCount');
	}
	//点击综合排行
	$(".main_nav01").eq(0).click(function(){
		var data = {
			currentPage:1,
		} 
		$(this).addClass("main_nav_on").siblings().removeClass("main_nav_on");
		if (id == "1") {
			dis(data,'merchant/stageList','merchant/stageCount');
		}else if(id == "2"){
			dis(data,'merchant/propList','merchant/propCount');
		}
	})
	//点击星级
	$(".main_nav01").eq(1).click(function(){
		var data = {
			currentPage:1,
		} 
		if (id == "1") {
			dis(data,"merchant/stageListStar",'merchant/stageCount');
		}else if(id == "2"){
			dis(data,"merchant/propListStar",'merchant/propCount');
		}
		$(this).addClass("main_nav_on").siblings().removeClass("main_nav_on");
	})
	//点击人气
	$(".main_nav01").eq(2).click(function(){
		var data = {
			currentPage:1,
		} 
		if (id == "1") {
			dis(data,"merchant/stageListSellnumber",'merchant/stageCount');
		}else if(id == "2"){
			dis(data,"merchant/propListSellnumber",'merchant/propCount');
		}
		$(this).addClass("main_nav_on").siblings().removeClass("main_nav_on");
	})

	//点击商家所在地地址
	$(".main_nav_x20 p").click(function(){
		var address = $(this).text();
		if (address == "全部") {
			address = "成都";
		}
		var data = {
			currentPage:1,
			address:address,
		}
		if (id == "1") {
			dis(data,"merchant/stageListAddress","merchant/stageAndAddressCount");
		}else if(id == "2"){
			dis(data,"merchant/propListAddress","merchant/propAndAddressCount");
		}	
	})
})
	

//url:当前访问的地址
function dis(data,url,pageUrl){
	if (state == 1) {
		state = 2;
		on_Loading();
		var address = data.address
		$.ajax({
			type: 'POST',
			url: apiUrl+pageUrl,
			data: data,
			dataType: 'json',
			success: function(e) {
				down_Loading();
				state = 1;
				//分页
				$('.main_Pagination').paging({
		            initPageNo: 1, // 初始页码
		            totalPages: e.totalPage, //总页数
		            slideSpeed: 600, // 缓动速度。单位毫秒
		            jump: true, //是否支持跳转
		            callback: function(page) { // 回调函数
		            	if (state == 1) {
		            		state = 2;
		            		on_Loading();
		            		if (address) {
		            			var data={
									currentPage:page,
									address:address,
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
									console.log(e);
									//获取推荐商家信息
									var red = "";
									for(var i=0;i<3;i++){
										var lists2 = e.lists2[i];
										var lists2_img = new Array;
										lists2_img = lists2.pimage.split(",");
										red += '<div><a href="b_Addorder.html?spid='+lists2.pid+'">'+
											'<div class="main_rcont_x10"><img src="'+lists2_img[0]+'" alt=""></div>'+
											'<div class="main_rcont_x20">'+
											'<h1>'+lists2.pname+'</h1>'+
											'<div class="main_rcont_x30">';
											if(lists2.discountPrice == "-1"){
												red +='<p class="main_rcont_x40">￥<span>'+lists2.price+'</span></p>';
											}else{
												red +='<p class="main_rcont_x40">￥<span>'+lists2.discountPrice+'</span></p>'+
													  '<p class="main_rcont_x50">市场价￥<span>'+lists2.price+'</span></p>';
											};
											red +='</div></div></a></div>'
									}
									$(".main_right_cont").html(red);
									//商家内容
									if(e.lists){
										var str = ""
										for(var i=0;i<e.lists.length;i++){
											var lists = e.lists[i];
											//拼接商家地址
											var m_address = new Array;
											m_address = lists.m_address.split(",");
											var lists_address = "";
											for(var p=0;p<m_address.length;p++){
												lists_address += m_address[p];
											}
											//星级
											var m_star = "";
											for(var o=0;o<lists.m_star;o++){
												m_star += "<i></i>"
											}
											str +='<div class="main_cont_01">'+
												'<div class="mainc_top">'+
													'<div class="mainc_top_box">'+
														'<div class="mainc_top_left">'+
															'<a href="b_Supermarket_FWS.html?fws='+lists.m_id+'">'+
																'<img src="'+lists.m_logo+'">'+
															'</a>'+
														'</div>'+
														'<div class="mainc_top_content">'+
															'<a href="b_Supermarket_FWS.html?fws='+lists.m_id+'">'+
																'<p class="mainc_p10">'+lists.m_name+'</p>'+
															'</a>'+
															'<p class="mainc_p20">'+lists_address+'</p>'+
															'<p class="mainc_p30">'+m_star+'</p>'+
														'</div>'+
													'</div>'+
													'<div class="mainc_top_right">'+
														'<div><a href="b_Pshowcase.html?fwsid='+lists.m_id+'">进入商家</a></div>'+
													'</div>'+
												'</div>'+
												'<div class="mainc_cont">';
												var list1_length = ""; 
												if(lists.list1.length >= 3){
													list1_length = 3;
												}else{
													list1_length = lists.list1.length;
												}
												for(u=0;u<list1_length;u++){
													var lists1 = lists.list1[u];
													//切割商品图片
													var lists1_img = new Array;
													lists1_img = lists1.pimage.split(",");
													//商品现价
													if(lists1.discountPrice != "-1"){
														var lists1_price = lists1.discountPrice;
													}else{
														var lists1_price = lists1.price;
													}
													str +='<div>'+
														'<a href="b_Addorder.html?spid='+lists1.pid+'">'+
															'<div class="mainc_cont_01">'+
																'<img src="'+lists1_img[0]+'" alt="'+lists1.pname+'">'+
															'</div>'+
															'<div class="mainc_cont_title">'+
																'<div class="mainc_cont_x10">'+
																	'<h1>【'+ptype+'】</h1>'+
																	'<p>'+lists1.pname+'</p>'+
																'</div>'+
																'<div class="mainc_cont_x20">'+
																	'<p>￥<span class="mainc_cont_x30">'+lists1_price+'</span></p>'+
																'</div>'+
															'</div>'+
														'</a>'+
													'</div>';
												}
												str += '</div></div>'
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
