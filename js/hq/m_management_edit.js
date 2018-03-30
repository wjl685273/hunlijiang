//导入数据
$(document).ready(function(){
	on_Loading()//加载效果
	//导航栏默认选中
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
	//获取用户名
	$(".username").val($.cookie("user"));
	//价格必须为正数
	$(".input_money").change(function(event) {
		if($(this).val() > 0 == false){
			$(this).val("");
		}else if($(this).val().length > 15){
			$(this).val("");
		}
	});
	//点击策划风格
	$(".input_style_cont li").click(function(){
		$(this).addClass('input_style_x10').siblings('').removeClass('input_style_x10');
	})
	//获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	//接收URL中的参数spid
	var id = getUrlParam('spid');
	//保存商品id
	$("input[name=sid]").val(id);
	//获取商品信息，填入页面
	var data = {
		sid:id,
	}
	$.ajax({
		type: "post",
		url: apiUrl+"/scheme/selectOne",
		data: data,
		success:function(e){
			var e_person = e.person;
			$("input[name=sname]").val(e_person.sName);//案例名称
			var style_li = $(".input_style_cont li");//案例风格
			for(var i=0;i<style_li.length;i++){
				if(style_li.eq(i).find("p").text() == e_person.sStyle){
					style_li.eq(i).addClass('input_style_x10').siblings('').removeClass('input_style_x10')
				}
			}
			$("input[name=sperson]").val(e_person.sPerson);//策划师
			$("input[name=price]").val(e_person.sPrice);//价格
			$(".desc").val(e_person.sDesc);//案例介绍
			$(".design").val(e_person.sDesign);//设计思路
			//主舞台
			var sStage_img = new Array();
			sStage_img = (e_person.sStage).split(",");
			if(sStage_img.length >= 5){
				$(".upload_img").eq(0).find(".upload_img_Choice").css("display","none");
			}
			var sStage = "";
			for(var a=0;a<sStage_img.length;a++){
				imgbox_img[0].push(sStage_img[a])
				sStage +='<div class="main_file">'+
					'<div class="show">'+
					'<img src="'+sStage_img[a]+'" alt="">'+
					'</div>'+
					'<div onclick="remove_default(this,\'0\')" class="main_file_hide remove_default">删除</div>'+
					'</div>';
			}
			$("#imgBox01").html(sStage);
			//礼道区
			var sPassage_img = new Array();
			sPassage_img = (e_person.sPassage).split(",");
			if(sPassage_img.length >= 5){
				$(".upload_img").eq(1).find(".upload_img_Choice").css("display","none");
			}
			var sPassage = "";
			for(var a=0;a<sPassage_img.length;a++){
				imgbox_img[1].push(sPassage_img[a])
				sPassage +='<div class="main_file">'+
					'<div class="show">'+
					'<img src="'+sPassage_img[a]+'" alt="">'+
					'</div>'+
					'<div onclick="remove_default(this,\'1\')" class="main_file_hide remove_default">删除</div>'+
					'</div>';
			}
			$("#imgBox02").html(sPassage);
			//签到区
			var sSign_img = new Array();
			sSign_img = (e_person.sSign).split(",");
			if(sSign_img.length >= 5){
				$(".upload_img").eq(2).find(".upload_img_Choice").css("display","none");
			}
			var sSign = "";
			for(var a=0;a<sSign_img.length;a++){
				imgbox_img[2].push(sSign_img[a])
				sSign +='<div class="main_file">'+
					'<div class="show">'+
					'<img src="'+sSign_img[a]+'" alt="">'+
					'</div>'+
					'<div onclick="remove_default(this,\'2\')" class="main_file_hide remove_default">删除</div>'+
					'</div>';
			}
			$("#imgBox03").html(sSign);
			//合影区
			var sPhoto_img = new Array();
			sPhoto_img = (e_person.sPhoto).split(",");
			if(sPhoto_img.length >= 5){
				$(".upload_img").eq(3).find(".upload_img_Choice").css("display","none");
			}
			var sPhoto = "";
			for(var a=0;a<sPhoto_img.length;a++){
				imgbox_img[3].push(sPhoto_img[a])
				sPhoto +='<div class="main_file">'+
					'<div class="show">'+
					'<img src="'+sPhoto_img[a]+'" alt="">'+
					'</div>'+
					'<div onclick="remove_default(this,\'3\')" class="main_file_hide remove_default">删除</div>'+
					'</div>';
			}
			$("#imgBox04").html(sPhoto);
			//甜品区
			var sSweetmeats_img = new Array();
			sSweetmeats_img = (e_person.sSweetmeats).split(",");
			if(sSweetmeats_img.length >= 5){
				$(".upload_img").eq(4).find(".upload_img_Choice").css("display","none");
			}
			var sSweetmeats = "";
			for(var a=0;a<sSweetmeats_img.length;a++){
				imgbox_img[4].push(sSweetmeats_img[a])
				sSweetmeats +='<div class="main_file">'+
					'<div class="show">'+
					'<img src="'+sSweetmeats_img[a]+'" alt="">'+
					'</div>'+
					'<div onclick="remove_default(this,\'4\')" class="main_file_hide remove_default">删除</div>'+
					'</div>';
			}
			$("#imgBox05").html(sSweetmeats);
			//获取需要修改的图片，存入数组
			for(var j=0;j<$(".upload_img").length;j++){
				var this_box = $(".upload_img").eq(j).find(".main_file");
				for(var k=0;k<this_box.length;k++){
					imgbox_default[j].push('<div class="main_file">'+this_box.eq(k).html()+'</div>')
				}
			}
			down_Loading();//清除加载
		},error:function(){

		}
	})
})

var state = 1;
$(".Upload").click(function(){
	if (state == 1) {
		state = 2;
		//策划风格
		$("input[name=style]").val($(".input_style_x10").find("p").text());
		//上传前验证
		if(!$("input[name=sname]").val()){
			meg("提示","案例名称不能为空","body");
			return false;
		}else if(!$("input[name=sperson]").val()){
			meg("提示","策划师名称不能为空","body");
			return false;
		}else if(!$("input[name=price]").val()){
			meg("提示","价格不能为空","body");
			return false;
		}else if(!$(".desc").val()){
			meg("提示","案例介绍不能为空","body");
			return false;
		}else if($(".desc").val().length > 200){
			meg("提示","案例介绍输入字数不能超过200字","body");
			return false;
		}else if(!$(".design").val()){
			meg("提示","设计思路不能为空","body");
			return false;
		}else if($(".design").val().length > 200){
			meg("提示","设计思路输入字数不能超过200字","body");
			return false;
		}else if(imgFile){
			for(var p=0;p<imgFile.length;p++){
				if(imgbox_default[p].length+imgFile[p].length <= 0){
					meg("提示","上传图片不能为空","body");//限制上传个数
					return false;
				}
			}
		}
		on_Loading()//加载	
		//修改图片
		for(var r=0;r<imgbox_name.length;r++){
			var img_hide = "";
			for(var t=0;t<imgbox_name[r].length;t++){
				if(imgbox_name[r][t]){
					img_hide += imgbox_name[r][t]+",";
				}	
			}
			$(".img_hide input").eq(r).val(img_hide);
		}
		//用formDate对象上传
		var data = new FormData($('#uploadForm')[0]);
		for(var i=0;i<imgFile.length;i++){
			for(var s=0;s<imgFile[i].length;s++){
				data.append(files_data[i],imgFile[i][s]);	
			}
		}
		//返回商品管理页面
		function dothing(){
			window.location.href = "m_management.html"
		}
		$.ajax({
			type: "post",
			url: apiUrl+"scheme/schemeEdit",
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				down_Loading()//加载
				if (e.updateStatus == "200") {
					meg("提示","修改成功","body",dothing);
				}else if(e.updateStatus == "400"){
					meg("提示","修改失败","body");
				}
			},error : function(e) {
				state = 1;
				down_Loading()//加载
			}
		});
	}
})
