//传输用户名到input框/获取商户名称
$(document).ready(function(){
	on_Loading()
	$(".nav_cont_a").eq(3).addClass("nav_cont_on");//导航栏默认选中
	var username = $("#username").val($.cookie("user")).val();
	var data = {
		username : username,
	};
	$.ajax({
		type: 'POST',
		url: apiUrl+'wedding/select',
		dataType: 'json',
		data: data,
		success: function(e) {
			console.log(e)
			var merchant = e.merchant;
			$(".cp_name").text(merchant.wName);//商户名称
			var wAddress = new Array();
			wAddress = (merchant.wAddress).split(",");
			$("#s1").val(wAddress[0]);
			$("#s1").find("option[text='"+wAddress[0]+"']").attr("selected",true);
			$("#s2").val(wAddress[1]);
			$("#s2").find("option[text='"+wAddress[1]+"']").attr("selected",true);
			$("#s3").val(wAddress[2]);
			$("#s3").find("option[text='"+wAddress[2]+"']").attr("selected",true);
			$("input[name=address]").val(wAddress[3]);
			$("input[name=phone]").val(merchant.wPhone);
			$(".show").html('<img src="'+merchant.wLogo+'">');
			down_Loading();
		},
		error : function(e) {
			down_Loading();
			meg('提示','当前网络不畅通,请检查您的网络','body'); 
		}
	})
})

//预览图片
$(".myFileUpload").change(function(e){   
 	var file = this.files[0];
 	if(file){
 		if (window.FileReader) {    
	        var reader = new FileReader();    
	        reader.readAsDataURL(file);    
	        //监听文件读取结束后事件    
	      	reader.onloadend = function (e) {
	      		$(".show").html("<img src='"+e.target.result+"'>")
	      	};    
	   	} 
	   	}else{
	   		$(".show").html("")
	   	}
   	
});

//商家地址
$("#s1").focus(function(){
	$("input[name='address']").val("");
})

$("#s2").focus(function(){
	$("input[name='address']").val("");
})

$("#s3").focus(function(){
	$("input[name='address']").val("");
})

//上传信息
var state = 1;
function login(){
	if (state == 1) {
		state = 2;
		var address = $("input[name='address']").val();//详细地址
		var mPhone = $("input[name='phone']").val();//负责人电话
		var imgFile = $(".show").html();//商户头像
	  	if(!address){
	  		meg('提示',"请输入详细地址",'body');
	  		return false;
	  	}else if(!mPhone){
	  		meg('提示',"请输入负责人电话",'body');
	  		return false;
	  	}else if(!(/^1[34578]\d{9}$/.test(mPhone))){
	  		meg('提示',"商家手机号码格式错误",'body');
	   	 	return false;
	  	}else if(!imgFile){
	  		meg('提示',"请选择需要上传的头像",'body');
	  		return false;
	  	}
	  	on_Loading()
		//上传整个form标签
		var form = new FormData($('#uploadForm')[0]);
		//刷新页面
		var doThing = function(){
			window.location.reload();
		}

		$.ajax({
			type: 'POST',
			url: apiUrl+'wedding/update',
			data: form,
			async: true,//异步请求
			processData: false,
			contentType: false,
			success: function(e) {
				down_Loading();
				if (e['updateStatus'] == 200) {
					meg('提示','上传成功','body',doThing); 
				}else if(e['updateStatus'] == 400){				
					meg('提示','上传失败','body',doThing); 
				}
			},
			error : function(e) {
				down_Loading();
				meg('提示','服务器开了小差，请稍后重试','body'); 
			}
		})
	}
}

//上传按钮
$(".Upload").click(function(){
	login();
})


