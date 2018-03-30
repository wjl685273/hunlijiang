
//导航栏默认选中
var state=1;//防止多次点击
var username = $.cookie("user");
$("input[name=username]").val(username);
$(document).ready(function(){
	on_Loading();//加载
	var data = {
		username:username,
	}
	$(".nav_cont_a").eq(3).addClass("nav_cont_on");
	$.ajax({
		type:"post",
		url: apiUrl+'team/selectOne',
		dataType: 'json',
		data: data,
		success:function(e){
			var team=e.team;
			//用户名称
			$("p.cp_name").html(team.tName);
			//公司地址
			var teamAddr=team.tAddress.split(",");
			$("select[name=province]").val(teamAddr[0]);
			$("select[name=city]").val(teamAddr[1]);
			$("select[name=county]").val(teamAddr[2]);
			$("input[name=address]").val(teamAddr[3]);
			//人员标签
			// $("input[name=showName]").val(team.tShowname);
			//负责人电话
			$("input[name=phone]").val(team.tPhone);
			//商家logo
			//$(".show_01").html("<img src='"+team.tLogo+"'>");
			//$("#wde").css("background-image":"url(p3.jpg)")
			$(".show_01").addClass("img_auto").css("background-image",'url('+team.tLogo+')');
			//$("input[name=imgFile]").append('<img src='+team.tLogo+'>');
			//商家简介
			$("textarea[name=desc]").val(team.tDesc);
			//预览图片
			$(".myFileUpload_01").change(function(e){   
			 	var file = this.files[0];
			   	if (window.FileReader) {    
			            var reader = new FileReader();    
			            reader.readAsDataURL(file);    
			            //监听文件读取结束后事件    
			          reader.onloadend = function (e) {
			          	$(".show_01").html("<img src='"+e.target.result+"'>")
			          };    
			       } 
			});
			down_Loading();//加载完成
		},
		error:function(){
			throw Error("网络服务故障，请检查！");
			down_Loading();//加载完成
		}
	})
})
//上传按钮
//刷新页面
var doThing = function(){
	window.location.reload();
}
//上传
$(".Upload").click(function(){
	if(state==1){
		state=2;
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
		on_Loading();//加载
		var form=new FormData($('#uploadForm')[0]);
		//上传
			$.ajax({
			type:"post",
			url: apiUrl+'team/update',
			dataType: 'json',
			cache: false,  
	        processData: false,  
	        contentType: false,
			data: form,
			success:function(e){
				if (e['updateStatus'] == 200) {
					meg('提示','上传成功','body',doThing); 
				}else if(e['updateStatus'] == 400){				
					meg('提示','上传失败','body',doThing); 
				}
				down_Loading();//加载完成
			},
			error:function(){
				throw Error("网络服务故障，请检查！");
				down_Loading();//加载完成
			}

		})
	}
	
})

