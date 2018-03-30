$(document).ready(function(){
	$(".username").val($('.h_name').text());//获取用户名
	if($.cookie("h_position") != "" && $.cookie("h_position") != 0){
		//window.location.href = "index.html";
	}
})

//商家地址
$("#s1").focus(function(){
	$("input[name='cp_address']").val("");
})

$("#s2").focus(function(){
	$("input[name='cp_address']").val("");
})

$("#s3").focus(function(){
	$("input[name='cp_address']").val("");
})

//预览图片
$(".file_img01").change(function(e){ 
 	var file = this.files[0];
 	if (file) {
 		$(".blueButton_01").text(file.name)
   }else{
   		$(".blueButton_01").text("")
   }  	
});
$(".file_img02").change(function(e){ 
 	var file = this.files[0];
 	if (file) {
 		$(".blueButton_02").text(file.name)
   }else{
   		$(".blueButton_02").text("")
   }  	
});
$(".file_img03").change(function(e){ 
 	var file = this.files[0];
 	if (file) {
 		$(".blueButton_03").text(file.name)
   }else{
   		$(".blueButton_03").text("")
   }  	
});

//选择有无营业执照按钮
$(".input_SCTP_x20").click(function(){
	$(".input_SCTP_x20 i").html("<span></span>")
	$(".input_SCTP_x10 i").html("")
	$(".off_License").css('display','block');
	$(".on_License").css('display','none');
	$(".on_License input").val("");//清空所有的内容
	$(".blueButton").text("");//清空选择的图片名称
	$(".flag").val("0");
});//有营业执照
$(".input_SCTP_x10").click(function(){
	$(".input_SCTP_x10 i").html("<span></span>")
	$(".input_SCTP_x20 i").html("")
	$(".on_License").css('display','block');
	$(".off_License").css('display','none');
	$(".off_License input").val("");//清空所有的内容
	$(".blueButton").text("");//清空选择的图片名称
	$(".flag").val("1");
});//无营业执照

//上传信息
// url上传地址
var state = 1;
function login(url){
	if (state == 1) {
		state = 2;
		var cp_name = $("input[name='cp_name']").val();//商户名称
		var phone = $("input[name='phone']").val();//联系电话
		var province = $("#s1").val();//城市
		var city = $("#s2").val();//城市
		var county = $("#s3").val();//城市
		var cp_address = $("input[name='cp_address']").val();//详细地址
		var flag = $(".flag").val();//是否有营业执照0为没有，1为有
		var cp_licenseName = $("input[name='cp_licenseName']").val();//营业执照名称
		var cp_licenseNum = $("input[name='cp_licenseNum']").val();//营业执照编号
		var identityName = $("input[name='identityName']").val();//身份证姓名
		var identityNum = $("input[name='identityNum']").val();//身份证号码
		var file_img01 = $(".file_img01").val();//上传执照
		var file_img02 = $(".file_img02").val();//身份证(正面)
		var file_img03 = $(".file_img03").val();//身份证(反面)
	  	if(!cp_name){
	  		meg('提示',"请输入商户名称",'body');
	  		return false;
	  	}else if(province == "省份"){
	  		meg('提示',"请选择省份",'body');
	  		return false;
	  	}else if(city == "地级市"){
	  		meg('提示',"请选择地级市",'body');
	  		return false;
	  	}else if(county == "区县"){
	  		meg('提示',"请选择区县",'body');
	  		return false;
	  	}else if(!cp_address){
	  		meg('提示',"请输入详细地址",'body');
	  		return false;
	  	}else if(!(/^1[34578]\d{9}$/.test(phone))){
	  		meg('提示',"请输入正确的手机号",'body');
	   	 	return false;
	  	}else if(flag == 1){
	  		if (!cp_licenseName){
	  			meg('提示',"请输入营业执照名称",'body');
	  			return false;
	  		}else if(cp_licenseNum.length != 15 && cp_licenseNum.length != 18){
	  			meg('提示',"请输入正确的执照编号",'body');
	  			return false;
	  		}else if(!file_img01){
	  			meg('提示',"请选择上传执照",'body');
	  			return false;
	  		}
	  	}else if(flag == 0){
	  		if(!identityName){
	  			meg('提示',"请输入身份证姓名",'body');
	  			return false;
	  		}else if(!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(identityNum))){
	  			meg('提示',"请输入正确的身份证号码",'body');
	  			return false;
	  		}else if(!file_img02){
	  			meg('提示',"请选择上传的身份证的正面",'body');
	  			return false;
	  		}else if(!file_img03){
	  			meg('提示',"请选择上传的身份证的反面",'body');
	  			return false;
	  		}
	  	}
	  	on_Loading()
		//上传整个form标签
		var form = new FormData($('#uploadForm')[0]);
		
		$.ajax({
			type: 'POST',
			url: apiUrl+url,
			data: form,
			processData: false,
			contentType: false,
			success: function(e) {
				down_Loading();
				function location_href(){
					window.location.href = window_href
				}
				if (e.uploadStatus == 200) {
					$.cookie("h_position",e.uStatus,{ path:'/',secure:false }); //储存商户类型定位
					meg('提示','上传成功','body',location_href);	
				}else if(e.uploadStatus == 400){				
					meg('提示','上传失败','body');
				}
			},
			error : function(e) {
				down_Loading();
				meg('提示','服务器开了小差,请稍后重试','body'); 
			}
		})
	}
}



//获取url中的参数
function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	//构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);//匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}
//接收URL中的参数info
var info = getUrlParam('info');
//var info = 3;
//上传按钮
var info_01 = ["婚庆公司","个人策划"];
var info_02 = ["主持人","摄影师","摄像师","化妆师","花艺师","婚礼执行","婚礼管家"];
var info_03 = ["舞美","道具"];
var cp_type = "";
var window_href= "";
if(info == 1){
	for(var type of info_01){
		cp_type += '<option>'+type+'</option>';
	}
	window_href = "m_MerchantCenter.html";
	$("#cp_type").html(cp_type);
}else if(info == 2){
	for(var type of info_02){
		cp_type += '<option>'+type+'</option>';	
	}
	window_href = "p_MerchantCenter.html";	
	$("#cp_type").html(cp_type);
}else if(info == 3){
	for(var type of info_03){
		cp_type += '<option>'+type+'</option>';
	}
	window_href = "h_MerchantCenter.html";
	$("#cp_type").html(cp_type);
}else if(!info || info == ""){
	window.location.href = "index.html";
}

$(".Upload").click(function(){
	if (info == 1) {
		login("user/weddingInfo");
	}else if (info == 2) {
		login("user/personInfo");
	}else if (info == 3) {
		login("user/merchantInfo");
	}
})




