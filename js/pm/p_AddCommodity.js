//导入信息
$(document).ready(function(){
	//导航栏默认选中
	 $(".nav_cont_a").eq(1).addClass("nav_cont_on");
	 $("input[name=username]").val($.cookie("user"));
	 var username=$.cookie("user");
	 //请求获得团体信息
	 $.ajax({
			type: "post",
			url: apiUrl+'/person/selectOneByTeam',
			data: {username:username},
			dataType:'json',
			success: function(e){
				console.log(e);
				var team=e.team;
				//人员地址===团体地址
				var personAddr=team.tAddress.split(",");
				$("select[name=province]").val(personAddr[0]);
				$("select[name=city]").val(personAddr[1]);
				$("select[name=county]").val(personAddr[2]);
				$("input[name=address]").val(personAddr[3]);
				//根据类型判断是否需要身高的选项
				if(team.tType!=="主持人"){ 
					$(".personHeight").css("display","none");
				}
				//确定风格
				var arr=[]; 
				var html="";
				if(team.tType=="主持人"){
					arr=["风趣","简洁","成熟","大气","稳重","温馨","欢快","控场达人"];
					style(arr);
				}else if(team.tType=="摄影师"){
					arr=["靠谱","效率","省心","沟通达人","创意","艺术","古典","简约"];
					style(arr);
				}else if(team.tType=="摄像师"){
					arr=["靠谱","效率","省心","沟通达人","创意","艺术","古典","简约"];
					style(arr);
				}else if(team.tType=="化妆师"){
					arr=["靠谱","效率","省心","沟通达人","唯美","古典","摩登","清新自然"];
					style(arr);
				}else if(team.tType=="婚礼执行"){
					arr=["靠谱","效率","省心","沟通达人","细致","布场能手","耐心"];
					style(arr);
				}else if(team.tType=="婚礼管家"){
					arr=["靠谱","效率","省心","沟通达人","礼仪专家","有范","贴心"];
					style(arr);
				}else if(team.tType=="花艺师"){
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
			},
			error:function(){
				meg("提示","网络错误，请稍后再试","body");
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
//地址
$("select[name=county]").on("change",function(){
	$("input[name=address]").val("");
})
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

//添加案例视频
	/*添加地址*/
	$(".add_addr_btn").on("click",function(){
		var value=$(this).prev().val();
		var li=$(".upload_addr li").length+1;
		if(!value){
			meg("提示","地址内容不能为空","body",doThing);
		}else{
			$(".upload_addr").append("<li><span>"+value+"</span><input type='button' name='' value='删除' class='addr_delete'></li>");
			$(this).prev().val("");
		}
		if(li>=8){
			$(this).attr("disabled",true);
		}
		/*删除地址*/
		$('.addr_delete').on("click",function(){
			$(this).parent().remove();
			if(li<8){
				$(".add_addr_btn").attr("disabled",false);
			}	
		})
	})

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
		console.log(imgFile);
				console.log(imgFile[0]);
				console.log(imgFile[0].length);
		//表单项不能为空验的证
		if(!$("input[name=pname]").val()){
			meg("提示","名称不能为空","body");
			return false;//名称验证
		}else if(!$("input[name=address]").val()){
			meg("提示","详细地址不能为空","body");
			return false;//地址验证
		}else if($("input[name=height]").css("display")=="block"&&!$("input[name=height]").val()){
			meg("提示","身高不能为空","body");
			return false;//身高验证
		}else if(!$("input[name=style]").val()){
			meg("提示","至少选择一种风格","body");
			return false;//风格验证
		}else if(!$("input[name=price]").val()){
			meg("提示","价格不能为空","body");
			return false;//价格验证
		}else if(!$("div[class=show_head]").html()){
			meg("提示","头像不能为空","body");
			return false;//头像验证
		}else if(imgFile[0].length < 2){
			meg("提示","请至少上传2张案例图片","body");
			return false;
		}else if(!$("textarea[name=desc]").val()){
			meg("提示","请填写人员简介","body");
			return false;//人员简介验证
		}
		// else if(!$("textarea[name=notice]").val()){
		// 	meg("提示","请填写公告","body");
		// 	return false;//人员公告验证
		// }
			
		//用formDate对象上传
		var data = new FormData($('#uploadForm')[0]);
		for(var i=0;i<imgFile.length;i++){
			for(var s=0;s<imgFile[i].length;s++){
				data.append(files_data[i],imgFile[i][s]);	
			}
		}
		$.ajax({
			type: "post",
			url: apiUrl+'person/add',
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				function uploadSuccess(){
					location.href="p_management.html";
				}
				//console.log(e);personStatus:200
				if(e.personStatus==200){
					meg("提示","上传成功","body",uploadSuccess);
				}else if(e.personStatus==400){
					meg("提示","上传失败","body");
				}

			},
			error:function(e) {
				meg("提示","网络错误，请稍后再试","body");
				state = 1
			}
		});	
	}
})
