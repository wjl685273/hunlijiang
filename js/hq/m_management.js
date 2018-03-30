//防止多次点击
var state = 1;


//导入信息
$(document).ready(function(){
	//导航栏默认选中
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
	ready();
	$(".see_more_but").html('<div class="see_more">查看全部</div>')
})

//刷新页面
function winreload(){
	window.location.reload();
}

//单独删除事件

function ondelete(){
	$(".Show_cont_delete").click(function(){
		if (state == 1) {
			state = 2;
			var s = $(this).parent().prev().text();
			var boxIds = new Array();
			boxIds.push(s);
			meg2('提示','确定是否删除','body',attrdelete)
			function attrdelete(){
				var data = {
					sids:boxIds,
				}
				loading(data,"scheme/delete")//传输id
				meg('提示','删除成功','body',ready)
			}
		}
	})
}

//上架
$(".Show_offts").click(function(){
	if (state == 1) {
		state = 2;
		var str = new Array();
		for(var i=0;i<$(".Show_Order").length;i++){
			if ($(".Show_Order").eq(i).find("input[type='checkbox']").is(':checked')) {
				var s = $(".Show_Order").eq(i).find(".hide").text();
				str.push(s);
			}		
		}
		var data = {
			sids:str,
		}
		loading(data,"scheme/up")//传输id
		meg('提示','上架成功','body',ready)
	}
})

//下架
$(".Show_onts").click(function(){
	if (state == 1) {
		state = 2;
		var str = new Array();
		for(var i=0;i<$(".Show_Order").length;i++){
			if ($(".Show_Order").eq(i).find("input[type='checkbox']").is(':checked')) {
				var s = $(".Show_Order").eq(i).find(".hide").text();
				str.push(s);
			}		
		}
		var data = {
			sids:str,
		}
		loading(data,"scheme/down")//传输id
		meg('提示','下架成功','body',ready)
	}
})

//批量删除
$(".Show_delete").click(function(){
	if (state == 1) {
		state = 2;
		var str = new Array();
		for(var i=0;i<$(".Show_Order").length;i++){
			if ($(".Show_Order").eq(i).find("input[type='checkbox']").is(':checked')) {
				var s = $(".Show_Order").eq(i).find(".hide").text();
				str.push(s);
			}		
		}
		if (str.length !== 0) {
			meg2('提示','确定是否删除','body',ondelete)
		}else(
			meg('提示','请选择商品','body')
		)	
		function ondelete(){
			var data = {
				sids:str,
			}
			loading(data,"scheme/delete")//传输id
			meg('提示','删除成功','body',ready)
		}
	}
})
	




//获取最新商品
function ready(){
	on_Loading()
	var h_name = $(".h_name").text();
	var data = {
		username:h_name,
	}
	loading(data,"scheme/selectAll")
}


//点击进去添加商品页面
$(".Show_Addto").click(function(){
	window.location.href  = 'm_AddCommodity.html'
});

function loading(data,url){
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: apiUrl+url,
		dataType: 'json',
		data: data,
		async: true,//异步请求
		traditional: true,//阻止ajax深度序列化
		success: function(e){
			
			$(".Show_cont").html("");
			$("#btnCheckAll").attr("checked",false);
			var e_list = e.list
			var str = ""
			for(var i=0;i<e_list.length;i++){
				//展示图片
				var img = new Array();
				img = (e_list[i].s_stage).split(",");

				str += "<div class='Show_Order'>"+
				"<div class='Show_01'><input name='chkItem' type='checkbox'></div>"+
				"<div class='Show_02'><i class='Show_img'><img src='"+img[0]+"'></i></div>"+
				"<div class='Show_03'>"+e_list[i].s_name+"</div>"+
				"<div class='Show_04'>"+e_list[i].s_style+"</div>"+
				"<div class='Show_05'>"+e_list[i].s_person+"</div>"+
				"<div class='Show_06'>"+e_list[i].s_price+"</div>"+
				"<div class='Show_07'>"+e_list[i].s_sellnumber+"</div>"+
				"<div class='Show_08'>"+e_list[i].createtime+"</div>";
				if(e_list[i].s_status == 1){
					str += "<div class='Show_red Show_09'>正常</div>";
				}else{
					str += "<div class='Show_red Show_09'>下架</div>";
				}
				str += "<div class='hide'>"+e_list[i].s_id+"</div>"+
				"<div class='Show_10'>"+
				"<span><a target='_blank' href='b_CaseDetails.html?chid="+e_list[i].s_id+"'>详情</a>"+
				"</span> | <span class='Show_cont_delete'>删除</span> | <span>"+
				"<a href='m_management_edit.html?spid="+e_list[i].s_id+"'>编辑</a></span></div></div>"
			}
			$(".Show_cont").append(str);
			ondelete();
			state = 1;
			//全选按钮事件
			$("#btnCheckAll").click(function(){
				$("input[name='chkItem']").prop("checked",this.checked);
			});
		
			$("input[name='chkItem']").click(function(){
				$("#btnCheckAll").prop("checked",$("input[name='chkItem']").length==$("input[name='chkItem']:checked").length);
			});
			down_Loading()
		},
		error : function(e) {
		}
	})
}
	