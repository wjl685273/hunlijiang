//存url地址
var apiUrl = "http://172.16.14.16:8080//";/*测试api地址*/
//var apiUrl = "http://172.16.12.180:8082/";/*测试api地址*/

/*
 *@消息框只帶有確定!
 *@使用该方法需在html中加入<div class="jump"></div>再调用即可
 *@el:meg('警告！','非法用户！','.jump')
 *@消息提示框
 *@消息提示框头部 megHead
 *@消息提示框内容 megcont
 *@消息添加至div  megBox
 *@确定按钮doThing执行函数
 */
 function meg(megHead, megcont, megBox, doThing) {
 	$("#meg").remove();
 	var str = '';
 	str += "<div id='meg'>" +
 	"<div class='megCont'>";
 	if(megHead != '') {
 		str += "<div class='megContHead'>" + megHead + "</div>";
 	}
 	str += "<div class='megContXT'>" + megcont + "</div>" +
 	"<div class='megContType'>" +
 	"<button class='button_ok'>确 定</button>" +
 	"</div>" +
 	"</div></div>";
 	$("" + megBox + "").append(str);
 	$('#meg').css({
 		display: 'block'
 	});
 	setTimeout(se, 10);

 	function se() {
 		$('.megCont').css({
 			transform: 'scale(1)'
 		});
 	}

 	function clear(){
 		state =1;
 		$('#meg').css('display', 'none');
 		$('.megCont').css({
 			transform: 'scale(0)'
 		});

 		$(".megCont").remove();
 		$("#meg").remove();
 		if(doThing) {
 			doThing();
 		}
 	}

 	$('.button_ok').click(function() {
 		clear()
 	})

	//-----点击回车执行登录命令
	$(document).ready(function(e) {
		$(this).keydown(function (e){
			if(e.which == "13"){
				clear()
			}
		})
	});
}



/*
 *@消息框带确定和取消
 *@使用该方法需在html中加入<div class="jump"></div>再调用即可
 *@el:meg('警告！','非法用户！','.jump')
 *@消息提示框
 *@消息提示框头部 megHead
 *@消息提示框内容 megcont
 *@消息添加至div  megBox
 *@确定按钮doThing执行函数
 *@取消按钮offThing执行函数
 */
 function meg2(megHead, megcont, megBox, doThing,offThing) {
 	$("#meg").remove();
 	var str = '';
 	str += "<div id='meg'>" +
 	"<div class='megCont'>";
 	if(megHead != '') {
 		str += "<div class='megContHead'>" + megHead + "</div>";
 	}

 	str += "<div class='megContXT'>" + megcont + "</div>" +
 	"<div class='megContType'>" +
 	"<button class='button_ok01 button_on'>确 定</button>" +
 	"<button class='button_off01 button_on'>取 消</button>" +
 	"</div>" +
 	"</div></div>";
 	$("" + megBox + "").append(str);
 	$('#meg').css({
 		display: 'block'
 	});
 	setTimeout(se, 10);

 	function se() {
 		$('.megCont').css({
 			transform: 'scale(1)'
 		});
 	}

 	$('.button_ok01').click(function() {
 		state =1;
 		$('#meg').css('display', 'none');
 		$('.megCont').css({
 			transform: 'scale(0)'
 		});

 		$(".megCont").remove();
 		$("#meg").remove();
 		if(doThing) {
 			doThing();
 		}
 	})

 	$('.button_off01').click(function() {
 		state =1;
 		$('#meg').css('display', 'none');
 		$('.megCont').css({
 			transform: 'scale(0)'
 		});

 		$(".megCont").remove();
 		$("#meg").remove();
 		if(offThing) {
 			offThing();
 		}
 	})
}

/*
 *加载loading样式插件
 *on_Loading添加
 *down_Loading添加
*/
function on_Loading(data){
	$("body").append('<div id="on_loading"></div>')
}
function down_Loading(){
	$("#on_loading").remove()
}

/*设置input框必须输入正数*/
$(".input_Num").change(function() {
	if($(this).val() > 0 == false){
		$(this).val("");
	}
});


/*多图片上传*/
var imgSrc = []; //图片路径
var imgFile = []; //文件流
var imgName = []; //图片名字 
var uploadBox = ""; //索引大框
var filebox = ""; //添加图片按钮class
var files_data = "";//参数名
// 编辑修改图片时,获取框中默认的元素
var imgbox_default = [];//保存需要修改的图片的整个div
var imgbox_img = [];//保存后台传递的图片名称
var imgbox_name = [];//向后台发送修改图片的名字
//选择图片
function imgUpload(obj) {
 	uploadBox = obj.uploadBox; //索引大框
 	filebox = obj.filebox; //添加图片按钮class
 	files_data = obj.data;
	var oInput = obj.inputId;//input框id
	//var imgBox = obj.imgBox;//图片容器id
	var btn = obj.buttonId;//提交按钮id
	for(var i=0;i<obj.imgBox.length;i++){
	 	imgName.push([]);//图片名字 
	 	imgFile.push([]);//文件流
	 	imgSrc.push([]);//图片路径
	 	imgbox_default.push([]);
	 	imgbox_name.push([]);
	 	imgbox_img.push([]);
	}
	
	$(oInput).on("change", function() {
	 	var iIndex = $(this).parents(obj.uploadBox).index();//当前大框的索引值
	 	
	 	var imgBox = obj.imgBox[iIndex];//当前图片容器id
	 	
		var fileImg = $(oInput)[iIndex];//当前input框id
		var fileList = fileImg.files;//当前input中选中的图片
		for(var i = 0; i < fileList.length; i++) {
			if(fileList[i].type.match(/image.*/)){
				var imgSrcI = getObjectURL(fileList[i]);//图片预览
				imgSrc[iIndex].push(imgSrcI);//存入图片路径数组
				imgName[iIndex].push(fileList[i].name);//存入图片名字数组
				imgFile[iIndex].push(fileList[i]);//存入文件流数组 
				if(obj.num[iIndex] <= imgbox_default[iIndex].length+imgSrc[iIndex].length){
			 		$(this).parents(obj.filebox).css("display","none")
			 		return addNewContent(imgBox,iIndex);
			 	}
			}
				
		}
		addNewContent(imgBox,iIndex);//图片展示
	})
	 
}

//图片展示
function addNewContent(obj,index) {
	$(obj).html("");
	var str_box = "";
	var str = "";
	for(var b=0;b<imgbox_default[index].length;b++){
		str_box += imgbox_default[index][b];
	}
	for(var a = 0; a < imgSrc[index].length; a++) {
		str += '<div class="main_file"><div class="show">'+
		 	'<img title='+imgName[index][a]+' alt='+imgName[index][a]+' src='+imgSrc[index][a]+'>'+
		 	'</div><div onclick="removeImg(this,'+a+','+index+')" class="main_file_hide">删除</div></div>'
	}
	$(obj).html(str_box + str)
}
//删除
function removeImg(obj,index,iIndex) {
	imgSrc[iIndex].splice(index, 1);
	imgFile[iIndex].splice(index, 1);
	imgName[iIndex].splice(index, 1);
	var boxId = "#" + $(obj).parent('.main_file').parent().attr("id");
	addNewContent(boxId,iIndex);
	$(uploadBox).eq(iIndex).find(filebox).css("display","block");
}

//删除默认图片
//index(当前div大框的索引)
function remove_default(obj,index){
	var iIndex = $(obj).parent().index();
	imgbox_default[index].splice(iIndex,1);//图片预览盒子
	var imgbox_imgs = imgbox_img[index][iIndex]//当前图片名称
	imgbox_img[index].splice(iIndex,1);//图片预览盒子
	imgbox_name[index].push(imgbox_imgs);
	var boxId = "#" + $(obj).parent('.main_file').parent().attr("id");
	addNewContent(boxId,index);
	$(uploadBox).eq(index).find(filebox).css("display","block");
}

function getObjectURL(file) {
    var url = null ; 
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}


/*
//上传调用
$(obj).click(function(){
	//用formDate对象上传
	var data = new FormData($('#uploadForm')[0]);
	for(var i=0;i<imgFile.length;i++){
		for(var s=0;s<imgFile[i].length;s++){
			data.append(files_data[i],imgFile[i][s]);	
		}
	}
	$.ajax({
		type: "post",
		url: url,
		data: data,
		processData: false,
		contentType: false,
		success: function(e) {
			console.log(e);
		},error : function(e) {

		}
	});	
})
*/




