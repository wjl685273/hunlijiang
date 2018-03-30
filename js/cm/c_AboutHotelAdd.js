$(document).ready(function(){
	$(".main_box_x30 li").click(function(){
		if($(this).hasClass('main_box_x30_on')){
			$(this).removeClass('main_box_x30_on')
		}else{
			$(this).addClass('main_box_x30_on')
		}
	})
})

var HallInfo = [];//所有添加的大厅
Array.prototype.insert = function (index,item) { 
	this.splice(index,1,item); 
};
/*添加大厅*/
$(".main_HallInfo").click(function(){
	$("body").append(
		`<div class="HallInfo_bg">
			<div class="HallInfo_bg_cont">
				<div class="HallInfo_bg_header">
					<h2>添加大厅</h2>
					<div class="HallInfo_bg_Close HallInfo_Close"></div>
				</div>
				<div class="HallInfo_bg_x10">
					<div class="HallInfo_bg_x20">
						<h3>大厅名称：</h3>
						<input type="text" class="HallInfo_bg_x20_input HallInfo_name" maxlength="10" placeholder="名称不超过十个字(必填)">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>大厅尺寸：</h3>
						<input type="text" class="HallInfo_bg_x20_input HallInfo_size" placeholder="建议格式【150m*150m*150m（长*宽*高）】(必填)">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>最大桌数：</h3>
						<input type="text" class="HallInfo_bg_x20_input HallInfo_number" placeholder="(必填)">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>大厅价格：</h3>
						<input type="text" class="HallInfo_bg_x20_input HallInfo_price" placeholder="(必填)">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>大厅描述：</h3>
						<textarea class="HallInfo_bg_x20_textarea HallInfo_describe" placeholder="最大字数不能超过500字,输入内容不支持换行符" maxlength="500"></textarea>
					</div>
					<div class="HallInfo_bg_x20">
						<h3>图片上传：</h3>
						<ul class="HallInfo_bg_images_box">
							<li>
								<div class="HallInfo_imgc_Prompt"><p>(最少选择4张)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
							</li>
							<li>
								<div class="HallInfo_imgc_Prompt"><p>(最少选择4张)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
							</li>
							<li>
								<div class="HallInfo_imgc_Prompt"><p>(最少选择4张)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
							</li>
							<li>
								<div class="HallInfo_imgc_Prompt"><p>(最少选择4张)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
							</li>
						</ul>
					</div>
					<div class="HallInfo_bg_x20">
						<h3>图片描述：</h3>
						<div class="HallInfo_img_describe">
							<input type="text" maxlength="15" placeholder="输入不超过15字">
							<input type="text" maxlength="15" placeholder="输入不超过15字">
							<input type="text" maxlength="15" placeholder="输入不超过15字">
							<input type="text" maxlength="15" placeholder="输入不超过15字">
						</div>
					</div>
					<div class="HallInfo_bg_x30">
						<button class="HallInfo_bg_but01">确定</button>
						<button class="HallInfo_bg_but02 HallInfo_Close">取消</button>
					</div>
				</div>
			</div>
		</div>`
	);//渲染出输入框
	//点击关闭
	$(".HallInfo_Close").click(function(){
		$(".HallInfo_bg").remove();
	})
	//预览图片
	var input_img = ["","","",""];
	$(".myFileUpload").change(function(e){ 
	   	var file = this.files[0];
	   	var i = $(this).parents("li").index();
	   	if (file) {
	   		if (window.FileReader) {    
              	var reader = new FileReader();    
              	reader.readAsDataURL(file);  //将文件读取为DataURL 
              	input_img.insert(i,file);
              	//监听文件读取结束后事件    
            	reader.onloadend = function (e){
            		$(".HallInfo_bg_images_box li").eq(i).find(".HallInfo_imgc_Prompt").css("display","none");
            		$(".HallInfo_bg_images_box li").eq(i).find(".HallInfo_imgc_show").html("<img src='"+e.target.result+"'>");
            		$(".HallInfo_bg_images_box li").eq(i).append(`<div class="HallInfo_imgc_delete">删除</div>`);
            		HallInfo_img_delete();
            	};    
	         } 
	    }else{
	     	$(".show").eq(i).html("")
	    }  	
	});
	//删除图片
	function HallInfo_img_delete(){
		$(".HallInfo_imgc_delete").click(function(){
			var index = $(this).parents("li").index();
			input_img.insert(index,"")
			this_Label = $(".HallInfo_bg_images_box li").eq(index);
			this_Label.find(".HallInfo_imgc_show").html("");
			this_Label.find(".HallInfo_imgc_Prompt").css("display","block");
			this_Label.find('.HallInfo_imgc_delete').remove();
		})
	}
	//点击确定
	$(".HallInfo_bg_but01").click(function(){
		var HallInfo_name = $(".HallInfo_name").val();
		var HallInfo_size = $(".HallInfo_size").val();
		var HallInfo_number = $(".HallInfo_number").val();
		var HallInfo_price = $(".HallInfo_price").val();
		var HallInfo_describe = $(".HallInfo_describe").val();
		var HallInfo_img_describe = [];
		if(!HallInfo_name){
			meg("提示","大厅名称为空","body")
			return false;
		}else if(!HallInfo_size){
			meg("提示","大厅尺寸为空","body")
			return false;
		}else if(!HallInfo_number){
			meg("提示","最大桌数为空","body")
			return false;
		}else if(!HallInfo_price){
			meg("提示","大厅价格为空","body")
			return false;
		}else if(HallInfo_img_describe){
			for(var i = 0;i<4;i++){
				var HallInfo_img_describe_val = $(".HallInfo_img_describe input").eq(i).val();
				HallInfo_img_describe.push(HallInfo_img_describe_val);
				if(input_img[i]==""){
					meg("提示","最少选择4张图片","body")
					return false;
				}else if(HallInfo_img_describe[i]==""){
					meg("提示","请填写所有的图片描述","body")
					return false;
				}
			}
		}
		//获取当前的索引
		var this_index = $(".HallInfo li").length - 1;
		var this_str = {"name":HallInfo_name,"size":HallInfo_size,"number":HallInfo_number,"price":HallInfo_price,"describe":HallInfo_describe,"img_cont":input_img,"img_describe":HallInfo_img_describe}
		HallInfo.push(this_str)
		HallInfo_list_cont();
		//关闭窗口
		$(".HallInfo_bg").remove();	
	})
})

//生成功能
function HallInfo_list_cont(){
	var HallInfo_list_cont = "";
	for(var s=0;s<HallInfo.length;s++){
		HallInfo_list_cont+=`<li>
			<div class="HallInfo_cont">
				<h2>大厅名称：`+HallInfo[s].name+`</h2>
				<div class="HallInfo_but">
					<button class="HallInfo_cont_edit" onclick="HallInfo_cont_edit(`+s+`)">编辑</button>|
					<button class="HallInfo_cont_delete" onclick="HallInfo_cont_delete(`+s+`)">删除</button>
				</div>
			</div>
		</li>`
	}
	$(".HallInfo").html(HallInfo_list_cont);
}

//删除大厅
function HallInfo_cont_delete(index){
	 $(".HallInfo li").eq(index).remove();
	HallInfo.splice(index,1);
	HallInfo_list_cont();
}
//修改大厅
function HallInfo_cont_edit(index){
	$("body").append(
		`<div class="HallInfo_bg">
			<div class="HallInfo_bg_cont">
				<div class="HallInfo_bg_header">
					<h2>添加大厅</h2>
					<div class="HallInfo_bg_Close HallInfo_Close"></div>
				</div>
				<div class="HallInfo_bg_x10">
					<div class="HallInfo_bg_x20">
						<h3>大厅名称：</h3>
						<input type="text" class="HallInfo_bg_x20_input HallInfo_name" maxlength="10" placeholder="名称不超过十个字(必填)" value="`+HallInfo[index].name+`">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>大厅尺寸：</h3>
						<input type="text" class="HallInfo_bg_x20_input HallInfo_size" placeholder="建议格式【150m*150m*150m（长*宽*高）】(必填)" value="`+HallInfo[index].size+`">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>最大桌数：</h3>
						<input type="text" class="HallInfo_bg_x20_input HallInfo_number" placeholder="(必填)" value="`+HallInfo[index].number+`">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>大厅价格：</h3>
						<input type="text" class="HallInfo_bg_x20_input HallInfo_price" placeholder="(必填)" value="`+HallInfo[index].price+`">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>大厅描述：</h3>
						<textarea class="HallInfo_bg_x20_textarea HallInfo_describe" placeholder="最大字数不能超过500字,输入内容不支持换行符" maxlength="500">`+HallInfo[index].describe+`</textarea>
					</div>
					<div class="HallInfo_bg_x20">
						<h3>图片上传：</h3>
						<ul class="HallInfo_bg_images_box">
							<li>
								<div class="HallInfo_imgc_Prompt" style="display:none"><p>(最少选择4张)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"><img src="`+getObjectURL(HallInfo[index].img_cont[0])+`"></img></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
								<div class="HallInfo_imgc_delete">删除</div>
							</li>
							<li>
								<div class="HallInfo_imgc_Prompt" style="display:none"><p>(最少选择4张)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"><img src="`+getObjectURL(HallInfo[index].img_cont[1])+`"></img></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
								<div class="HallInfo_imgc_delete">删除</div>
							</li>
							<li>
								<div class="HallInfo_imgc_Prompt" style="display:none"><p>(最少选择4张)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"><img src="`+getObjectURL(HallInfo[index].img_cont[2])+`"></img></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
								<div class="HallInfo_imgc_delete">删除</div>
							</li>
							<li>
								<div class="HallInfo_imgc_Prompt" style="display:none"><p>(最少选择4张)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"><img src="`+getObjectURL(HallInfo[index].img_cont[3])+`"></img></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
								<div class="HallInfo_imgc_delete">删除</div>
							</li>
						</ul>
					</div>
					<div class="HallInfo_bg_x20">
						<h3>图片描述：</h3>
						<div class="HallInfo_img_describe">
							<input type="text" maxlength="15" placeholder="输入不超过15字" value="`+HallInfo[index].img_describe[0]+`">
							<input type="text" maxlength="15" placeholder="输入不超过15字" value="`+HallInfo[index].img_describe[1]+`">
							<input type="text" maxlength="15" placeholder="输入不超过15字" value="`+HallInfo[index].img_describe[2]+`">
							<input type="text" maxlength="15" placeholder="输入不超过15字" value="`+HallInfo[index].img_describe[3]+`">
						</div>
					</div>
					<div class="HallInfo_bg_x30">
						<button class="HallInfo_bg_but01">确定</button>
						<button class="HallInfo_bg_but02 HallInfo_Close">取消</button>
					</div>
				</div>
			</div>
		</div>`
	);//渲染出输入框
	//点击关闭
	$(".HallInfo_Close").click(function(){
		$(".HallInfo_bg").remove();
	})
	HallInfo_img_delete();
	//预览图片
	var input_img = [];
	for(var c=0;c<HallInfo[index].img_cont.length;c++){
		input_img.push(HallInfo[index].img_cont[c])
	}
	$(".myFileUpload").change(function(e){ 
	   	var file = this.files[0];
	   	var i = $(this).parents("li").index();
	   	if (file) {
	   		if (window.FileReader) {    
              	var reader = new FileReader();    
              	reader.readAsDataURL(file);  //将文件读取为DataURL 
              	input_img.insert(i,file);
              	//监听文件读取结束后事件    
            	reader.onloadend = function (e){
            		$(".HallInfo_bg_images_box li").eq(i).find(".HallInfo_imgc_Prompt").css("display","none");
            		$(".HallInfo_bg_images_box li").eq(i).find(".HallInfo_imgc_show").html("<img src='"+e.target.result+"'>");
            		$(".HallInfo_bg_images_box li").eq(i).append(`<div class="HallInfo_imgc_delete">删除</div>`);
            		HallInfo_img_delete();
            	};    
	         } 
	    }else{
	     	$(".show").eq(i).html("")
	    }  	
	});
	//删除图片
	function HallInfo_img_delete(){
		$(".HallInfo_imgc_delete").click(function(){
			var index = $(this).parents("li").index();
			input_img.insert(index,"")
			this_Label = $(".HallInfo_bg_images_box li").eq(index);
			this_Label.find(".HallInfo_imgc_show").html("");
			this_Label.find(".HallInfo_imgc_Prompt").css("display","block");
			this_Label.find('.HallInfo_imgc_delete').remove();
		})
	}
	//点击确定
	$(".HallInfo_bg_but01").click(function(){
		var HallInfo_name = $(".HallInfo_name").val();
		var HallInfo_size = $(".HallInfo_size").val();
		var HallInfo_number = $(".HallInfo_number").val();
		var HallInfo_price = $(".HallInfo_price").val();
		var HallInfo_describe = $(".HallInfo_describe").val();
		var HallInfo_img_describe = [];
		if(!HallInfo_name){
			meg("提示","大厅名称为空","body")
			return false;
		}else if(!HallInfo_size){
			meg("提示","大厅尺寸为空","body")
			return false;
		}else if(!HallInfo_number){
			meg("提示","最大桌数为空","body")
			return false;
		}else if(!HallInfo_price){
			meg("提示","大厅价格为空","body")
			return false;
		}else if(HallInfo_img_describe){
			for(var i = 0;i<4;i++){
				var HallInfo_img_describe_val = $(".HallInfo_img_describe input").eq(i).val();
				HallInfo_img_describe.push(HallInfo_img_describe_val);
				if(input_img[i]==""){
					meg("提示","最少选择4张图片","body")
					return false;
				}else if(HallInfo_img_describe[i]==""){
					meg("提示","请填写所有的图片描述","body")
					return false;
				}
			}
		}
		//获取当前的索引
		var this_str = {"name":HallInfo_name,"size":HallInfo_size,"number":HallInfo_number,"price":HallInfo_price,"describe":HallInfo_describe,"img_cont":input_img,"img_describe":HallInfo_img_describe}
		HallInfo.insert(index,this_str);
		HallInfo_list_cont();
		//关闭窗口
		$(".HallInfo_bg").remove();	
	})
}
