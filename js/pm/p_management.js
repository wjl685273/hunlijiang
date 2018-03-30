
// //防止多次点击
 var state = 1;

//导入信息
$(document).ready(function(){
	on_Loading();//加载
	//导航栏默认选中
	 $(".nav_cont_a").eq(1).addClass("nav_cont_on");
	 //ajax请求添加人员信息
	var username=$.cookie("user");
	var data={
		username:username
	};
	$.ajax({
		type: "post",
		url: apiUrl+'person/selectAll',
		data:data,
		success: function(e) {
			console.log(e);
			for(var i=0;i<e.list.length;i++){
				(e.list[i].pStatus==0)?(e.list[i].pStatus="待审核"):(e.list[i].pStatus="已审核");
				$(".control_total_person").append(
					'<div class="control_total_person_item"><div class="hide">'+e.list[i].pId+'</div><div class="c_check"><input type="checkbox" name="ids"></div><div>'+e.list[i].pName+'</div><div><div class="c_pic"><img src="'+e.list[i].pLogo+'"></div></div><div>'+e.list[i].pPrice+'</div><div>'+e.list[i].pSellnumber+'</div><div>2017.12.12</div><div>'+e.list[i].pStatus+'</div><div class="c_control_cont"><a href="b_Preferred_ZCR_Case.html?pid='+e.list[i].pId+'" target="_blank">详情</a>&nbsp;&nbsp;|&nbsp;<a class="c_control_del">删除</a>&nbsp;&nbsp;|&nbsp;<a href="p_EditPersonNews.html?p_id='+e.list[i].pId+'" class="p_EditPersonNews">编辑</a></div></div>'
				);
			}
			//单独删除人员
				$(".c_control_del").click(function(){
					var thisPerson=$(this);
					meg2("提示","是否确认删除该人员?","body",makesure);
					var p_id=$(".hide").html();
					var str=new Array();
					str.push(p_id);
					console.log(str);
					var data={
						pids:str,
					};
					function makesure(){
						console.log(data);
						$.ajax({
							type: "post",
							crossDomain: true,
							url: apiUrl+'person/delete',
							dataType: 'text',
							data:data,
							async: true,//异步请求
							traditional: true,//阻止ajax深度序列化
							success:function(e){
								meg("提示","删除成功","body");
								thisPerson.parent().parent().remove();
							},
							error:function(){throw Error("网络错误，请稍后再试");}
						})
					};
				})
			//批量删除人员
				$(".p_manage_del").click(function(){
					if (state == 1) {
						state = 2;
						var str = new Array();
						for(var i=0;i<$(".control_total_person_item").length;i++){
							if ($(".control_total_person_item").eq(i).find("input[type='checkbox']").is(':checked')) {
								var s = $(".control_total_person_item").eq(i).find(".hide").text();
								str.push(s);
							}		
						}
						if (str.length !== 0) {
							meg2('提示','确定是否删除','body',ondelete)
						}else(
							meg('提示','请选择商品','body')
						)	
						function ondelete(){
							on_Loading()//加载
							var data = {
								pids:str,
							}
							console.log(data);
							$.ajax({
								type: "post",
								crossDomain: true,
								url: apiUrl+'person/delete',
								dataType: 'text',
								data:data,
								async: true,//异步请求
								traditional: true,//阻止ajax深度序列化
								success:function(e){
									$(".control_total_person_item :checked").parent().parent().remove();
									down_Loading()//加载完成
									meg("提示","批量删除成功","body");
								},
								error:function(){
									down_Loading()//加载完成;
									meg("提示","网络错误，请稍后再试","body");
								}
							})
						}
					}
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
				down_Loading()//加载完成
		},
		error:function(e) {
			down_Loading()//加载完成
			meg("提示","网络错误，请稍后再试","body");
		}
	});	

	})
//添加人员
$(".p_manage_add").click(function(){
	window.location.href="p_AddCommodity.html";
})

