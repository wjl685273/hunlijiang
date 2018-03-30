
$(document).ready(function(){
	//导入地区数据
	setup();
	//传输用户名到input框
	var username =  $(".h_name").text();
	$("#username").val(username);
	//导航栏默认选中
	$(".nav_cont_a").eq(4).addClass("nav_cont_on");
})



//上传图片样式
$(document).ready(function()
{
    $(".myFileUpload").change(function()
    {
        var arrs=$(this).val().split('\\');
        var filename=arrs[arrs.length-1];
        $(".show").html(filename);
    });
});


//上传

var state = 1;
function login(){
	if (state == 1) {
		state = 2;
		var cp_name = $("input[name='cp_name']").val();
		var cp_type = $("#cp_type").val();
		var province = $("#s1").val();
		var city = $("#s2").val();
		var county = $("#s3").val();
		var cp_address = $("input[name='cp_address']").val();
		var cp_licenseName = $("input[name='cp_licenseName']").val();
		var cp_licenseNum = $("input[name='cp_licenseNum']").val();
		var imgFile = $("input[name='imgFile']").val();
		var username = $(".h_name").text();
	  	if (!cp_name) {
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
	  	}else if(!cp_licenseName){
	  		meg('提示',"请输入营业执照名称",'body');
	  		return false;
	  	}else if(!cp_licenseNum){
	  		meg('提示',"请输入执照编号",'body');
	  		return false;
	  	}else if(cp_licenseNum.length != "15" && cp_licenseNum.length != "18"){
	  		meg('提示',"请输入正确的执照编号",'body');
	  		return false;
	  	}else if(!imgFile){
	  		meg('提示',"请选择需要上传的执照",'body');
	  		return false;
	  	}

		//上传整个form标签
		var form = new FormData($('#uploadForm')[0]);

		$.ajax({
			type: 'POST',
			url: apiUrl+'user/InfoUpload',
			data: form,
			async: true,//异步请求
			processData: false,
			contentType: false,
			success: function(e) {
				if (e['uploadStatus'] == 200) {
					meg('提示','上传成功','body'); 
				}else if(e['uploadStatus'] == 400){				
					meg('提示','上传失败','body'); 
				}
			},
			error : function(e) {
				meg('提示','当前网络不畅通,请检查您的网络','body'); 
			}
		})
	}
}

//点击登录按钮执行命令
$('.Upload').click(function(){
	login();
})
