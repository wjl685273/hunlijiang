//传输用户名到input框
$(document).ready(function(){
	var username =  $(".h_name").text();
	$("#username").val(username);
	//导航栏默认选中
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
})

//价格必须为正数
$(".input_money").change(function() {
	if($(this).val() > 0 == false){
		$(this).val("");
	}
});

var state = 1;//防止多次点击
function login(){
	if (state == 1) {
		state = 2;
		//判断复选框
		var sp_color = "";
		for(var i = 0;i< $(".input_color input").length;i++){
			if ($(".input_color input").eq(i).is(':checked')) {
				sp_color += $(".input_color input").eq(i).val()
			}
		}
		var Attributes = $(".input_Attributes").val(sp_color).val();//商品颜色
		var pname = $("input[name='pname']").val(); //商品名称
		var height = $("input[name='height']").val(); //商品尺寸
		var width = $("input[name='width']").val(); //商品尺寸
		var length = $("input[name='length']").val(); //商品尺寸
		var price = $("input[name='price']").val(); //商品原价
		var dis_price = $("input[name='dis_price']").val(); //商品折扣价
		var number = $("input[name='number']").val(); //商品数量
		var pdesc = $("textarea[name='pdesc']").val(); //商品描述
		if (!pname) {
			$(".input_Attributes").val("");
			meg('提示','请输入商品名称','body');
			return false;
		}else if (!height || !width || !length){
			$(".input_Attributes").val("");
			meg('提示','请输入商品尺寸','body');
			return false;
		}else if (!Attributes) {
			$(".input_Attributes").val("");
			meg('提示','请输入商品颜色','body');
			return false;
		}else if (!price) {
			$(".input_Attributes").val("");
			meg('提示','请输入商品原价','body');
			return false;
		}else if (Number(price) < Number(dis_price)) {
			$(".input_Attributes").val("");
			meg('提示','折扣价不能大于原价','body');
			return false;
		}else if (!number) {
			$(".input_Attributes").val("");
			meg('提示','请输入库存数量','body');
			return false;
		}else if (!pdesc) {
			$(".input_Attributes").val("");
			meg('提示','请输入商品描述','body');
			return false;
		}else if(imgFile){
			for(var p=0;p<imgFile.length;p++){
				if(imgbox_default[p].length+imgFile[p].length <= 0){
					meg("提示","上传图片不能为空","body");//限制上传个数
					return false;
				}
			}
		}
		on_Loading();
		//用formDate对象上传
		var data = new FormData($('#uploadForm')[0]);
		for(var i=0;i<imgFile.length;i++){
			for(var s=0;s<imgFile[i].length;s++){
				data.append(files_data[i],imgFile[i][s]);	
			}
		}
		
		//刷新页面
		var doThing = function(){
			window.location.reload();
		}

		var hrefing = function(){
			window.location.href  = 'h_management.html'
		}
		
		$.ajax({
			type: 'POST',
			url: apiUrl+'product',
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				down_Loading()
				if (e['productStatus'] == 200) {
					meg2('提示','上传成功,返回商品管理页面','body',hrefing,doThing); 
				}else if(e['productStatus'] == 400){				
					meg('提示','上传失败','body',doThing); 
				}
			},
			error : function(e) {
				down_Loading()
				meg('提示','当前网络不畅通,请检查您的网络','body',doThing); 
			}
		})
	}	
}

//上传商品
$(".Upload").click(function(){
	login()
})

