//导入数据
$(document).ready(function(){
	on_Loading()//加载
	//导航栏默认选中
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
	//获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	//接收URL中的参数spid
	var id = getUrlParam('spid');
	
	var pname = $("input[name='pname']"); //商品名称      
	var height = $("input[name='height']"); //商品尺寸      
	var width = $("input[name='width']"); //商品尺寸      
	var length = $("input[name='length']"); //商品尺寸      
	var price = $("input[name='price']"); //商品原价      
	var dis_price = $("input[name='dis_price']"); //商品折扣价      
	var number = $("input[name='number']"); //商品数量      
	var pdesc = $("textarea[name='pdesc']"); //商品描述
	$("#username").val(id);
	var data = {
		pid: id,
	}

	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: apiUrl+'product/selectOne',
		dataType: 'json',
		data: data,
		async: true,//异步请求
		success:function(e){
			//传入当前商品颜色
			var arr = new Array();
			arr = (e.property).split(",");
			for(var i=0;i<$(".input_color input").length;i++){
				for(var a=0;a<arr.length;a++){
					if ($(".input_color input").eq(i).val() == arr[a]) {
						$(".input_color input").eq(i).attr("checked", true);
					}
				}
				
			}
			//展示图片
			var img = new Array();
			img = (e.pimage).split(",");
			if (img != ""){
				for(var s=0;s<img.length;s++){
					if (img[s] != ""){
						$(".main_file").eq(s).find(".show").html('<img src="'+img[s]+'">')
					}
				}
			}
				
			height.val(e.height);//高
			width.val(e.width);//宽
			length.val(e.length);//长
			pname.val(e.pname);//商品名称
			price.val(e.price);//原价
			//折扣价
			if (e.discountPrice == "-1"){
				dis_price.val("")
			}else{
				dis_price.val(e.discountPrice);
			}
			number.val(e.number);//库存
			pdesc.val(e.pdesc);//描述
			//主舞台
			var sStage_img = new Array();
			sStage_img = (e.pimage).split(",");
			if(sStage_img.length >= 5){
				$(".upload_img").eq(0).find(".upload_img_Choice").css("display","none");
			}
			var sStage = "";
			for(var a=0;a<sStage_img.length;a++){
				imgbox_img[0].push(sStage_img[a])
				sStage +='<div class="main_file">'+
					'<div class="show">'+
					'<img src="'+sStage_img[a]+'" alt="">'+
					'</div>'+
					'<div onclick="remove_default(this,\'0\')" class="main_file_hide remove_default">删除</div>'+
					'</div>';
			}
			$("#imgBox01").html(sStage);
			//获取需要修改的图片，存入数组
			for(var j=0;j<$(".upload_img").length;j++){
				var this_box = $(".upload_img").eq(j).find(".main_file");
				for(var k=0;k<this_box.length;k++){
					imgbox_default[j].push('<div class="main_file">'+this_box.eq(k).html()+'</div>')
				}
			}
			down_Loading()//加载
		}
	})
})

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
		}else if (!height || !width || !length) {
			$(".input_Attributes").val("");
			meg('提示','请输入商品尺寸','body');
			return false;
		}else if (!Attributes) {
			$(".input_Attributes").val("");
			meg('提示','请选择商品颜色','body');
			return false;
		}else if (!price) {
			$(".input_Attributes").val("");
			meg('提示','请输入商品价格','body');
			return false;
		}else if (Number(price) < Number(dis_price)) {
			$(".input_Attributes").val("");
			meg('提示','折扣价不能大于原价','body');
			return false;
		}else if (!number) {
			$(".input_Attributes").val("");
			meg('提示','请输入商品数量','body');
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
		on_Loading()//加载
		//修改图片
		for(var r=0;r<imgbox_name.length;r++){
			var img_hide = "";
			for(var t=0;t<imgbox_name[r].length;t++){
				if(imgbox_name[r][t]){
					img_hide += imgbox_name[r][t]+",";
				}	
			}
			$("#productImg").eq(r).val(img_hide);
		}	
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
		//返回商品管理页面
		var hrefing = function(){
			window.location.href  = 'h_management.html'
		}
		
		$.ajax({
			type: 'POST',
			url: apiUrl+'product/edit',
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				down_Loading()//加载
				if (e['updateStatus'] == 200) {
					meg2('提示','修改成功,返回商品管理页面','body',hrefing,doThing); 
				}else if(e['updateStatus'] == 400){				
					meg('提示','修改失败','body',hrefing); 
				}
			},
			error : function(e) {
				down_Loading()//加载
				meg('提示','当前网络不畅通,请检查您的网络','body',doThing); 
			}
		})
	}	
}

//修改商品
$(".Upload").click(function(){
	login()
})

//预览图片
$(".myFileUpload").change(function(e){ 
 	var file = this.files[0];
 	var i = $(this).parent(".main_file").index()
 	if (file) {
 		if (window.FileReader) {    
            var reader = new FileReader();    
            reader.readAsDataURL(file);  //将文件读取为DataURL  
            //监听文件读取结束后事件    
          	reader.onloadend = function (e){
          		$(".show").eq(i).html("<img src='"+e.target.result+"'>")
          };    
       } 
   }else{
   		$(".show").eq(i).html("")
   }
   	
});


/*JQuery 限制文本框只能输入数字和小数点*/  

$("#batch_diff_percent").keyup(function () {
     var reg = $(this).val().match(/\d+\.?\d{0,2}/);
     var txt = '';
    if (reg != null) {
         txt = reg[0];
     }
     $(this).val(txt);
 }).change(function () {
    $(this).keypress();
    var v = $(this).val();
     if (/\.$/.test(v))
     {
        $(this).val(v.substr(0, v.length - 1));
     }
 });
