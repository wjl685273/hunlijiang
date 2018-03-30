//防止多次点击
 var state = 1;
 // var lilength;
//导入信息
$(document).ready(function(){
	on_Loading()//加载
	//导航栏默认选中
	 $(".nav_cont_a").eq(1).addClass("nav_cont_on");
	 $("input[name=username]").val($.cookie("user"));
	 //获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	//接收URL中的参数spid
	var p_id = getUrlParam('p_id');
	$("input[name=pid]").val(p_id);
	var p_id_data={
		pid:p_id,
	}
	//请求展示数据
	$.ajax({
		type: 'POST',
		url: apiUrl+'person/selectOne',
		data: p_id_data,
		success:function(e){
			var person=e.person;
			console.log(person);
			//根据类型判断是否需要身高的选项
			if(person.property!=="主持人"){
				$(".personHeight").css("display","none");
			}
			//确定风格
			var arr=[]; 
			var html="";
			if(person.property=="主持人"){
				arr=["风趣","简洁","成熟","大气","稳重","温馨","欢快","控场达人"];
				style(arr);
			}else if(person.property=="摄影师"){
				arr=["靠谱","效率","省心","沟通达人","创意","艺术","古典","简约"];
				style(arr);
			}else if(person.property=="摄像师"){
				arr=["靠谱","效率","省心","沟通达人","创意","艺术","古典","简约"];
				style(arr);
			}else if(person.property=="化妆师"){
				arr=["靠谱","效率","省心","沟通达人","唯美","古典","摩登","清新自然"];
				style(arr);
			}else if(person.property=="婚礼执行"){
				arr=["靠谱","效率","省心","沟通达人","细致","布场能手","耐心"];
				style(arr);
			}else if(person.property=="婚礼管家"){
				arr=["靠谱","效率","省心","沟通达人","礼仪专家","有范","贴心"];
				style(arr);
			}else if(person.property=="花艺师"){
				arr=["靠谱","效率","省心","沟通达人","创意","搭配专家","色彩控"];
				style(arr);
			}
			//选风格,最多只能添加三种风格
			var addStyle=1;//是否可以添加样式
			$(".Posttask_x10 li").click(function(){
				var choosedLi=$(".Posttask_x20_on").length+1;
				 if(choosedLi>3){
				 	if($(this).hasClass("Posttask_x20_on")){
				 		$(this).toggleClass(".Posttask_x20_on");
				 		addStyle=1;
				 	}else{
				 		meg("提示", "风格最多只能选择三个", "body", doThing);
				 		addStyle=0;
				 	}
				 }
				 if(addStyle==1){	
					 $(this).toggleClass("Posttask_x20_on");
				}
			})
			//arr是哪个风格数组
			function style(arr){
				var html="";
				for(var i=0;i<arr.length;i++){
					html+='<li class="Posttask_x20">'+
									'<p>'+arr[i]+'</p>'+
								'</li>';
				}
				$(".Posttask_x10 ul").html(html);
			}

			//加载名称
			$("input[name=pname]").val(person.pName);
			//加载类型
			var personAddr=person.pAddress.split(',');
			$("select[name=province]").val(personAddr[0]);
			$("select[name=city]").val(personAddr[1]);
			$("select[name=county]").val(personAddr[2]);
			$("input[name=address]").val(personAddr[3]);
			//地址
			$("select[name=county]").on("change",function(){
				$("input[name=address]").val("");
			})
			//加载地址
			$("select[name=type]").val(person.pType);
			//加载身高
			$("input[name=height]").val(person.pHight);
			//加载风格
			//$("input[name=style]").val(person.pStyle);
			//console.log($("input[name=style]").val());
			//返回的样式数组
			var personStyle=(person.pStyle).split(",");
			var p=$(".Posttask_x20 p");
			var haveStyle="";
			for(var i=0;i<personStyle.length;i++){
				for(var s=0;s<p.length;s++){
					if(personStyle[i].indexOf(p[s].innerHTML)>-1){
						p.eq(s).parent().addClass("Posttask_x20_on");
					}
				}
			}
			//加载价格
			$("input[name=price]").val(person.pPrice);
			//头像
			//$(".show_head img").attr("src",person.pLogo);
			$(".show_head").addClass("img_auto").css("background-image",'url('+person.pLogo+')');
			//案例图片
			var sStage_img = new Array();
			sStage_img = (person.pCase).split(",");
			if(sStage_img.length>=6){
				$(".upload_img").eq(0).find(".upload_img_Choice").css("display","none");
			}
			var sStage = "";
			for(var a=0;a<sStage_img.length;a++){
				imgbox_img[0].push(sStage_img[a]);
				// sStage +='<div class="main_file">'+
				// 	'<div class="show">'+
				// 	'<img src="'+sStage_img[a]+'" alt="">'+
				// 	'</div>'+
				// 	'<div onclick="remove_default(this,\'0\')" class="main_file_hide remove_default">删除</div>'+
				// 	'</div>';
				 	sStage +='<div class="main_file">'+
					'<div class="show img_auto" style="background-image:url('+sStage_img[a]+')">'+	
					'</div>'+
					'<div onclick="remove_default(this,\'0\')" class="main_file_hide remove_default">删除</div>'+
					'</div>';
			}
			$("#imgBox").html(sStage);
			//获取需要修改的图片，存入数组
			for(var j=0;j<$(".upload_img").length;j++){
				var this_box = $(".upload_img").eq(j).find(".main_file");
				for(var k=0;k<this_box.length;k++){
					imgbox_default[j].push('<div class="main_file">'+this_box.eq(k).html()+'</div>')
				}
			}
			//加载案例视频
			var personVideo=(person.pVideo).split(",");
				//删除数组的最后一个空元素
			personVideo.pop();
			// //服务器传回数据的长度lilength
			// lilength=personVideo.length;
			for(var i=0;i<personVideo.length;i++){
				$(".upload_addr").append("<li><span>"+personVideo[i]+"</span><input type='button' name='' value='删除' class='addr_delete'></li>");
			}
			//操作视频地址
			$(".add_addr_btn").on("click",function(){
					var value=$(this).prev().val();
					if($(".upload_addr li").length<8){
						if(!value){
							meg("提示","添加的地址内容不能为空","body",doThing);
						}else{
							$(".upload_addr").append("<li><span>"+value+"</span><input type='button' name='' value='删除' class='addr_delete'></li>");
							$(this).prev().val("");
						}
					}else{
						$(".add_addr_btn").attr("disabled",true);
					}
					//删除数据库导过来的
					$('.addr_delete').on("click",function(){
						$(".add_addr_btn").attr("disabled",false);
						$(this).parent().remove();
					})
				})
			//删除新添加的
			$('.addr_delete').on("click",function(){
				$(".add_addr_btn").attr("disabled",false);
				$(this).parent().remove();
			})
			//加载人员简介
			$("textarea[name=desc]").val(person.pInfo);
			//加载公告
			$("textarea[name=notice]").val(person.pNotice);
		down_Loading()//加载完成
		},
		error:function(){
			throw Error("网络错误，请稍后再试！");
			down_Loading()//加载完成
		}
	})
})
var doThing=function(){}
// 验证输入的内容位数字的函数
function testNumber(thisSelector){
	thisSelector.blur(function(){
		var result=/^[0-9]*$/.test($(this).val());
		if(!result){
			meg("提示","请输入数字","body",doThing);
			$(this).val("");
		}
	})
}
//身高，价格
testNumber($(".yourHeight"));
testNumber($(".yourPrice"));

//选风格,最多只能添加三种风格
var addStyle=1;//是否可以添加样式
$(".Posttask_x10 li").click(function(){
	var choosedLi=$(".Posttask_x20_on").length+1;
	 if(choosedLi>3){
	 	if($(this).hasClass("Posttask_x20_on")){
	 		$(this).toggleClass(".Posttask_x20_on");
	 		addStyle=1;
	 	}else{
	 		meg("提示", "风格最多只能选择三个", "body", doThing);
	 		addStyle=0;
	 	}
	 }
	 if(addStyle==1){	
		 $(this).toggleClass("Posttask_x20_on");
	}
})

//上传头像
$(".myFileUpload_head").change(function(e){ 
 	var file = this.files[0];
 	// console.log(file);
 	if (file) {
 		$(".blueButton_head").css("display","none");
 		if (window.FileReader) {    
            var reader = new FileReader();  
            // console.log(reader); 
            reader.readAsDataURL(file);  //将文件读取为DataURL  
            //监听文件读取结束后事件 
          	reader.onloadend = function (e){
          		var result=$(this).result;
          		// console.log(e.target.result);
          		var src=e.target.result.substr(22);
          		var base64Img=e.target.result;
          		$(".show_head").html("<img src='"+e.target.result+"'>");
          	};    
       	}else{
	   		$(".blueButton_head").css("display","block");
	   		$(".show_head").html("")
	    }
	}
});

//上传
var state = 1;
$("#btn").on('click', function() {
	if (state == 1) {
		state = 2;

		//风格上传
		var style="";
		for(var i=0;i<$(".Posttask_x20_on").length;i++){
			style += $(".Posttask_x20_on p").eq(i).text() + ",";
		}
		$(".style").val(style);
		//视频地址上传
		var addr="";
		for(var i=0;i<$(".upload_addr li").length;i++){
			addr+=$(".upload_addr li").eq(i).first().text() + ",";
		}
		$("input[name=video]").val(addr);
		//名称验证
			//imgbox_default获取已经有的图片个数
			//imgFile获取添加的图片的个数
		// console.log(imgFile[0].length);
		// console.log(imgbox_default[0].length);
		if(!$("[name=pname]").val()){
			meg("提示","名称不能为空","body");
			return false;
		}else if($("input[name=height]").css("display")=="block"&&!$("input[name=height]").val()){
			meg("提示","身高不能为空","body");
			return false;//身高验证
		}else if(!$("input[name=style]").val()){
			meg("提示","至少选择一种风格","body");
			return false;//风格验证
		}else if(!$("input[name=price]").val()){
			meg("提示","价格不能为空","body");
			return false;//价格验证
		}else if(!$("textarea[name=desc]").val()){
			meg("提示","请填写人员简介","body");
			return false;//人员简介验证
		}else if((imgbox_default[0].length+imgFile[0].length)< 2){
			meg("提示","请至少上传2张案例图片","body");
			return false;
		}else if(!$("textarea[name=desc]").val()){
			meg("提示","请填写人员简介","body");
			return false;//人员简介验证
		}
			
		//修改图片
		for(var r=0;r<imgbox_name.length;r++){
			var img_hide = "";
			for(var t=0;t<imgbox_name[r].length;t++){
				if (imgbox_name[r][t]) {
					img_hide += imgbox_name[r][t]+",";
				}
			}
			$("input[name=imgCase]").val(img_hide);
		}

		//用formDate对象上传
		var data = new FormData($('#uploadForm')[0]);
		for(var i=0;i<imgFile.length;i++){
			for(var s=0;s<imgFile[i].length;s++){
				data.append(files_data[i],imgFile[i][s]);	
			}
		}
		$.ajax({
			type: "post",
			url: apiUrl+'person/personEdit',
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				function uploadSuccess(){
					location.href="p_management.html";
				}
				//console.log(e);personStatus:200
				if(e.updateStatus==200){
					meg("提示","修改成功","body",uploadSuccess);
				}else if(e.updateStatus==400){
					meg("提示","修改失败","body");
				}

			},
			error:function(e) {
				meg("提示","网络错误，请稍后再试","body");
				state = 1
			}
		});	
	}
})
