$(function(){

	//-----------------------获取验证码事件
	var yzmState = 1;
	$(".login_yzm").click(function(){
		if (yzmState == 1) {
			yzmState = 2;
			var userVal = $(".user").val();//手机号value 
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
				url: apiUrl+'login/register',
				dataType: 'json',
				data: data,
				async: true,//异步请求
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
								obj.css('background','#f85162');
								clearInterval(set);
							}
						},1000);	
					}else if(e['phoneStatus'] == 400){
						yzmState = 1;
						return($(".yz_01").text("账号已注册"));
					}
				},
				error : function(e) {
					yzmState = 1;
					alert("网络错误"); 
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

	//-------------格式化表单内容
	function hide(){
		$(".user").val("");
	  	$(".YZM").val("");
	  	$(".pass").val("");
	  	$(".onpass").val("");
	}

	//电话发生改变
	$(".user").change(function(){
		$(".YZM").val("");
	  	$(".pass").val("");
	  	$(".onpass").val("");
	  	remove();
	})
	//密码发生改变
	$(".pass").change(function() {
		$(".onpass").val("");
		remove();
	});

	//--------------------------点击注册事件
	var state = 1;
	function login(){
		if (state == 1) {
			var userVal = $(".user").val(); 	//手机号value
			var yzmVal = $(".YZM").val();   	//验证码value
			var passVal = $(".pass").val(); 	//密码value
			var onpassVal = $(".onpass").val(); //确认密码value
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

			var regThing = function(){
				location.href = "login.html";
			}

			$.ajax({
				type: 'POST',
				crossDomain: true,
				url: apiUrl+'login/registerYzm',
				dataType: 'json',
				data: data,
				async: true,//异步请求
				success: function(e) {
					if(e.yzmStatus == 200){
						console.log(e);
						meg("提示","注册成功,返回登录页面","body",regThing);	
					}else if(e.yzmStatus == 400){
						$(".yz_02").text("验证码错误");
						$(".YZM").val("");
					}
				},
				error : function(e) {
					hide();
					alert("服务器开了小差，请稍后再试"); 
				}
			})
		}		
	};

		
$(document).ready(function(){
	$(".vehicle").attr("checked",'true');
	$(".login_zc").click(function(){
		login();
	})
	$(".login_zc").css('background','#f85162');
    $(".login_zc").hover(
    	function(){
    		$(".login_zc").css({"opacity":"0.9"});
    	},
    	function(){
    		$(".login_zc").css({"opacity":"1"});
    	}
    )	
})
	//协议
	$(".vehicle:checkbox").click(function () {
	    if($(this).is(':checked')){
	    	$(".login_zc").click(function(){
	    		login();
	    	})
		    $(".login_zc").css('background','#f85162');
		    $(".login_zc").hover(
		    	function(){
		    		$(".login_zc").css({"opacity":"0.9"});
		    	},
		    	function(){
		    		$(".login_zc").css({"opacity":"1"});
		    	}
		    )
	    }else{
	    	remove()
	       $(".login_zc").unbind("click");
	       $(".login_zc").css('background','#999');
	       $(".login_zc").hover(
		    	function(){
		    		$(".login_zc").css({"opacity":"1"});
		    	},
		    	function(){
		    		$(".login_zc").css({"opacity":"1"});
		    	}
		    )
	    }
	});




	//协议开关
	$(".protocol button").click(function(){
		$(".protocol").css('display','none');
	})
	$(".login_protocol span").click(function(){
		$(".protocol").css('display','block');
	})




	//默认用户名获取焦点
	$(document).ready(function(e) {
	  	$(".user").focus();
	})

	//点击获取验证码获取焦点
	$(".login_yzm").click(function(){
		$(".YZM").focus();
	})





})