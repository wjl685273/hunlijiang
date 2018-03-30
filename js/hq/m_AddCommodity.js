//传输用户名到input框
$(document).ready(function(){
	$(".username").val($.cookie("user"));
	//导航栏默认选中
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
})

//价格必须为正数
$(".input_money").change(function() {
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
				if(imgFile[p].length <= 0){
					meg("提示","上传图片不能为空","body");//限制上传个数
					return false;
				}
			}
		}
		on_Loading()	
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
			url: apiUrl+"/scheme/add",
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				down_Loading()
				if (e.uploadStatus == "200") {
					meg("提示","上传成功","body",dothing);
				}else if(e.uploadStatus == "400"){
					meg("提示","上传失败","body");
				}
			},error : function(e) {
				down_Loading()
				meg("提示","服务器开了小差，请稍后重试","body");
			}
		});	
	}
})

