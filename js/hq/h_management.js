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
					pids:boxIds,
				}
				loading(data,"product/delete")//传输id
				meg("提示","删除成功","body",ready)
			}
		}
	})
}


// 搜索
$(function(){
	$(".but_Inquire").click(function(){
		if (state == 1) {
			on_Loading()//加载
			state = 2;
			$(".see_more").css("display","none");
			var h_name = $(".h_name").text();
			var pname = $("input[name='pname']").val();
			var minPrice = $("input[name='minPrice']").val();
			var maxPrice = $("input[name='maxPrice']").val();
			var data = {
				username:h_name,
				pname:pname,
				minPrice:minPrice,
				maxPrice:maxPrice,
			}

			loading(data,"product/select")//传输id
		}
	})
})




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
			pids:str,
		}
		loading(data,"product/up")//传输id
		meg("提示","上架成功","body",ready)
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
			pids:str,
		}
		loading(data,"product/down")//传输id
		meg("提示","下架成功","body",ready)
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
				pids:str,
			}
			loading(data,"product/delete")//传输id
			meg("提示","删除成功","body",ready)
		}
	}
})
	




//获取最新商品
function ready(){
	on_Loading()//加载
	var h_name = $(".h_name").text();
	var data = {
		username:h_name,
	}
	loading(data,"product/all")
}


//点击进去添加商品页面
$(".Show_Addto").click(function(){
	window.location.href  = 'h_AddCommodity.html'
});

var this_length = 10;//页面刷新展示的商品个数
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
			if(e.length < 10){
				this_length = e.length;
				$(".see_more").css("display","none");
			}else if(this_length != 10){
				this_length = e.length
			}
			var str = ""
			for(var i=0;i<this_length;i++){
				//展示图片
				var img = new Array();
				img = (e[i].pimage).split(",");

				str += "<div class='Show_Order'>"+
				"<div class='Show_01'><input name='chkItem' type='checkbox'></div><div class='Show_02'>"+
				"<i class='Show_img'>";
				if(img[0]){
					str +="<img src='"+img[0]+"'>"
				}
				str +="</i></div><div class='Show_03'>"
				+""+e[i].pname+""+"</div><div class='Show_04'>"+e[i].price+"</div>";
				if (e[i].discountPrice != "-1"){
					str += "<div class='Show_05'>"+e[i].discountPrice+"</div>"
				}else{
					str += "<div class='Show_05'>无</div>"
				};
				str += "<div class='Show_06'>"+e[i].sellnumber+"</div><div class='Show_07'>"+
				+e[i].number+"</div><div class='Show_08'>"+e[i].updatetime+"</div>";
				if(e[i].pstatus == 1){
					str += "<div class='Show_red Show_09'>正常</div>";
				}else{
					str += "<div class='Show_red Show_09'>下架</div>";
				}
				str += "<div class='hide'>"+e[i].pid+"</div><div  class='Show_10'><span><a target='_blank' href='b_Addorder.html?spid="+e[i].pid+"'>详情</a></span> | <span class='Show_cont_delete'>删除</span> | <span><a href='h_management_edit.html?spid="+e[i].pid+"'>编辑</a></span></div></div>"
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
			down_Loading()//加载
		},
		error : function(e) {
			down_Loading()//加载
		}
	})
}

//点击查看全部
$(function(){
	$(".see_more").click(function(){
		this_length = 11;
		$(".see_more").css("display","none");
		ready()
	})
})
	