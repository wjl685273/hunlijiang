//-----------------------获取验证码事件
var yzmState = 1;
$(".login_yzm").click(function(){
	if (yzmState == 1) {
		yzmState = 2;
		var userVal = $("input[name='username']").val();//手机号value 
		remove();
	  	if(userVal == ""){
	  		yzmState = 1;
	      	$(".yz_01").text("用户名不能为空");
	      	return false;
	  	}else if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(userVal))){
	  		yzmState = 1;
	  		$(".yz_01").text("请输入正确的手机号");
	   	 	return false;
	  	}
	  	//  @data  获取验证码需要的数据
		//注册需要的参数
		var data = {
			phone: userVal,
		};

		$.ajax({
			type: 'POST',
			crossDomain: true,
			url: apiUrl+'login/forgetPwdSms',
			dataType: 'json',
			data: data,
			async: true,
			success: function(e) {
				if(e['phoneStatus'] == 200){
					remove();
					var  obj = $(".login_yzm");
					obj.text("发送成功");
					obj.css('background','#ccc')

					//验证码倒计时
					var time = 60;

					var set = setInterval(function(){
						obj.text(--time + '' + 's')
						if (time <= 0) {
							yzmState = 1;
							obj.text("重新获取");
							obj.css('background','#ed897e');
							clearInterval(set);
						}
					},1000);	
				}else if(e['phoneStatus'] == 400){
					yzmState = 1;
	      			$(".yz_01").text("手机号未注册");
				}
			},
			error : function(e) {
				yzmState = 1;
				meg('提示','当前网络不畅通,请检查您的网络','body'); 
			}
		})
	}
})

//-------------------------格式化提示框内容
function remove(){
	$(".yz_01").text("");
  	$(".yz_02").text("");
  	$(".yz_03").text("");
  	$(".yz_04").text("");
};
//--------------------------点击注册事件
function forgetPassword(){
	var userVal = $("input[name='username']").val(); 	//手机号value
	var yzmVal = $("input[name='forgetPassword_YZM']").val();   	//验证码value
	var passVal = $("input[name='password']").val(); 	//密码value
	var onpassVal = $("input[name='onpassword']").val(); //确认密码value
	remove();
  	if(userVal == ""){
      	$(".yz_01").text("用户名不能为空");
      	return false;
  	}else if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(userVal))){
  		$(".yz_01").text("请输入正确的手机号");
   	 	return false;
  	}else if(yzmVal == ""){
    	$(".yz_02").text("验证码不能为空");
   	 	return false;
  	}else if(passVal == ""){
    	$(".yz_03").text("密码不能为空");
   	 	return false;
  	}else if(!(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(passVal))){
  		$(".yz_03").text("密码不能包含特殊字符");
   	 	return false;
  	}else if(passVal.length >18||passVal.length <6){
    	$(".yz_03").text("密码必须为6-18位大小写字母或数字");
   	 	return false;
	}else if(onpassVal !== passVal){
		$(".yz_04").text("两次密码输入不一致");
	 	return false;
	}
	//  @data  完成注册需要的数据
	//注册需要的参数
	data = {
		phone : userVal,
		yzm : yzmVal,
		password: hex_md5(passVal),
	}

	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: apiUrl+'login/forgetPwd',
		dataType: 'json',
		data: data,
		async: false,
		success: function(e) {
			if(e['yzmStatus'] == 200 && e['phoneStatus'] == 200){
				location.href = "login.html";
			}else if(e['yzmStatus'] == 400){
				meg('提示','验证码错误','body')
				$(".login_yzm").attr("value","");
			}else if(e['phoneStatus'] == 400){
				$("input[type='text']").attr("value","");
				$("input[type='password']").attr("value","");
				meg('提示','账号已注册','body')
			}
		},
		error : function(e) {
			meg('提示','当前网络不畅通,请检查您的网络','body'); 
		}
	})
};


//键盘事件

$(document).ready(function(e) {
  $(this).keydown(function (e){
    if(e.which == "13"){
      //your code
    forgetPassword()
    }
  })
})


//点击完成按钮执行操作
$('.forgetPassword').click(function(){
	forgetPassword()
})

//默认用户名获取焦点
$(document).ready(function(e) {
  	$("input[name='username']").focus();
})

//点击获取验证码获取焦点
$(".login_yzm").click(function(){
	$("input[name='forgetPassword_YZM']").focus();
})

//电话发生改变
$("input[name='username']").change(function(){
	$("input[name='forgetPassword_YZM']").val("");
  	$("input[name='password']").val("");
  	$("input[name='onpassword']").val("");
  	remove();
})
//密码发生改变
$("input[name='password']").change(function() {
	$("input[name='onpassword']").val("");
	remove();
});
