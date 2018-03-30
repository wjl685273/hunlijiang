var state=1;
$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");
	var username=$.cookie("user");
	//获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	//接收URL中的参数spid
	var tid = getUrlParam('tid');
	if(!username){
		window.location.href="login.html";
	}else{
		$.ajax({
			type:"post",
			url: apiUrl+'/task/pushPersonInfo',
			dataType: 'json',
			data: {username:username,tid:tid},
			success:function(e){
				console.log(e);
				var persons=e.persons;
				var html="";
				for(var i=0;i<persons.length;i++){
					var person=persons[i];
				    var createtime=person.createtime.split("-").join(".");
					(person.pStatus==0)?(person.pStatus="待审核"):(person.pStatus="已审核");
					html+='<div class="control_total_person_item">'+
						'<div class="c_check">'+
							'<input type="checkbox" name="ids" value='+person.pId+'>'+
							'<input class="hide" type="text" value='+person.pId+'>'+
						'</div>'+
						'<div>'+person.pName+'</div>'+
						'<div><div class="c_pic"><img src="'+person.pLogo+'"></div></div>'+
						'<div>'+person.pPrice+'</div>'+
						'<div>'+person.pSellnumber+'</div>'+
						'<div>'+createtime+'</div>'+
						'<div>'+person.pStatus+'</div>'+
					'</div>';
				}
				$(".control_total_person").append(html);
			},
			error:function(){
				meg("提示","网络开小差，请检查！","body");
			}
		})
	}
	//点击推送人员按钮
	$(".p_manage_add").click(function(){
			if(state==1){
				state=2;
				// window.location.href="b_TaskStateDetail_YF.html";
				// 查找被选中的人员
				var pids="";
				var checkedPerson=$(":checkbox[name='ids']:checked");
				for(var s=0;s<checkedPerson.length;s++){
					//pids.push(checkedPerson[s].value);
					pids+=checkedPerson[s].value+",";
				}
				pids=pids.substr(0,pids.length-1);
				console.log(pids);
				console.log(username);
				var pushPersonData={'tid':tid,'username':username,'pids':pids}
				console.log(pushPersonData);
				if(!checkedPerson.length){
					meg("提示","请添加推送商品或者人员","body");
				}else{
					console.log(pushPersonData);
				$.ajax({
					type:"post",
					async:true,
					url: apiUrl+'/task/pushPerson',
					dataType:'json',
					data:pushPersonData,
					success:function(e){
						console.log(e);
						if(e.status==200){
							window.location.href="b_TaskStateDetail_YF.html?tid="+tid+"";
						}else if(e.status==400){
							meg("提示","您已经推送过人员","body", href);
							function href(){
								window.location.href="b_TaskStateDetail_YF.html?tid="+tid+"";
							}
						}
					},
					error:function(){
						meg("提示","网络开小差，请检查！","body");
					}
				})
			}
		}
	})
})
	/*全选*/
$(function(){
	$(".check").click(function(){
		$(":input[name='ids']").prop("checked",this.checked);
	});
	$(":checkbox[name='ids']").click(function(){
		$(".check").prop("checked",$(":checkbox[name='ids']").length==$(":checkbox[name='ids']:checked").length);
	});
})