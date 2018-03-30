$(document).ready(function(){
	$(".nav").html('<i class="nav_border"></i>'+
		'<i class="nav_border_x10"></i>'+
		'<div class="nav_cont"><p class="nav_cont_x10">确定订单信息</p><p>缴纳保证金</p><p>等待卖家确认</p><p>缴纳尾款</p><p>等待确认收款</p><p>退还保证金</p><p>完成</p></div>'
	);

	$(".address_ul li").click(function(){
		$(this).addClass('address_on').siblings('').removeClass('address_on');
		$(".DOrder_right_cont").eq(2).find('span').text($(this).text());
	})
	ShoppingCart()

})

//获取最新商品清单信息
function ShoppingCart(){
    $.ajax({
        type: 'post',
        url: apiUrl+"order/showCartAndOrder",
        dataType: 'json',
        data:{username:$.cookie("user")},
        success:function(e){
            if(e.list != null){
                var str = "";
                var Total = "";//总价
                var Total_num = "";//总数
                for(var i=0;i<e.list.length;i++){
                	for(var p=0;p<e.list[i].list.length;p++){
						var list = e.list[i].list[p];
						//价钱
                        if(list.discountPrice == "-1"){
                            var moeny = list.productNum*list.price;
                        }else{
                            var moeny = list.productNum*list.discountPrice;
                        }
						str +='<li>'+
							'<div class="main03_cont_x10">'+
								'<img src="'+list.pimage.split(',')[0]+'">'+
								'<div class="main03_cont_user">'+
									'<p class="main03_user_x10">'+list.pname+'</p>'+
									'<p class="main03_user_x20">'+
										'<span>库存：'+list.number+'</span>'+
										'<span>销量：'+list.sellnumber+'</span>'+
									'</p>'+
								'</div>'+
							'</div>'+
							'<div class="main03_cont_x20">'+
								'<div class="main03_cont_x30">'+
									'<button class="but_01">—</button'+
									'><input class="main_lcont_amount" maxlength="'+String(list.number).length+'" value="'+list.productNum+'" type="text"><'+
									'button class="but_02">+</button>'+
									'<div class="hide splist_pid">'+list.pid+'</div>'+
                                    '<div class="hide splist_number">'+list.number+'</div>'+
								'</div>'+
								'<div class="main03_cont_x40">￥'+moeny+'</div>'+
							'</div>'+
						'</li>';
						Total = Number(Total)+Number(moeny);
                	}   
                	Total_num = Number(Total_num)+Number(e.list[i].list.length);
                }
                $(".main03_cont").html(str);
                $(".main04_x10 span").html(Total_num);
                $(".main04_x20 span").html("￥"+Total);
                calcNumber();
            }else{
                window.location.href = "b_Supermarket_WM.html";
            }
        },
        error:function(){
            meg("提示","服务器开了小差，请稍后重试","body");
        }
    })
} 

// 商品数量加减以及数量输入框的值输入标准判断
function calcNumber(){
    //商品数量加减
    $(".main03_cont_x30>button").click(function(e){
        var this_pid = $(this).siblings('.splist_pid').html();//获取当前商品id
        var inputNumber= Number($(this).siblings(".main_lcont_amount").val());//当前的数量
        var storage_index = Number($(this).siblings(".splist_number").html());//当前商品的库存
        var this_input = $(this).siblings(".main_lcont_amount");//当前的input
        if($(this).html()=="+"&&inputNumber<storage_index){
            inputNumber++;
            modifyGoods(this_pid,inputNumber);
        }
        else if($(this).html()=="—"&&inputNumber>1){
            inputNumber--;
            modifyGoods(this_pid,inputNumber);
        }
        $(this).siblings(".main_lcont_amount").val(inputNumber);
    })
    // 数量输入框的值输入标准判断
    $(".main03_cont_x30>input").change(function(e){
        var this_pid = $(this).siblings('.splist_pid').html();//获取当前商品id
        var this_index = $(this).parents(".splist_li").index();//当前商品索引
        var this_input = $(this);//当前的input
        var storage_index = $(this).siblings(".splist_number").html()//当前商品的库存
        var myInput=this_input.val();
        if(isNaN(myInput)||Number(myInput)<1||!myInput){
            this_input.val(1);
            modifyGoods(this_pid,1);
        }else if(Number(myInput)>Number(storage_index)){
            this_input.val(storage_index);
            modifyGoods(this_pid,storage_index);
        }else{
            modifyGoods(this_pid,$(this).val());
        }
    })
}

//修改商品
function modifyGoods(spid,num){
    if($.cookie("user")){
        var data = {
            pid:spid,
            num:num,
            username:$.cookie("user"),
        }
        $.ajax({
            type: 'post',
            url: apiUrl+"cart/update",
            dataType: 'json',
            data: data,
            success:function(e){
                if(e.status == "200"){
                    ShoppingCart() 
                }
            },
            error:function(){
                meg("提示","服务器开了小差，请稍后重试","body");
            }
        })
    }else{
        window.location.reload();
    }      
}

//确认交易
$(".main04_but").click(function(){
    if($.cookie("user")){
        var data = {
            username:$.cookie("user"),
        }
        $.ajax({
            type: 'post',
            url: apiUrl+"order/selectAmount",
            dataType: 'json',
            data: data,
            success:function(e){
                $(".deposit").css("display","block");
                var deposit = "";
                if(e.Amount - e.Deposit > 0){
                    deposit = e.Amount - e.Deposit;
                    on_deposit();
                }else if(e.Amount - e.Deposit <= 0){
                    deposit = "0";
                }
                $(".deposit_info_x10 span").html("￥"+e.Deposit);
                $(".deposit_info_x20 span").html(deposit);
            },
            error:function(){
                meg("提示","服务器开了小差，请稍后重试","body");
            }
        })
    }else{
        window.location.reload();
    }
})

function on_deposit(){
    var state = 1;
    $(".deposit_but").click(function(){
        if(state == 1){
            state = 2;
            if($.cookie("user")){
                //地址选择
                var DOrder_user = $(".DOrder_input_x10").val();//姓名
                var address_x10 = $(".address_x10").html();//省
                var address_x20 = $(".address_x20").html();//市
                var address_x30 = $(".address_x30").html();//区
                var DOrder_info = $(".DOrder_input_x20").val();//详细地址
                var DOrder_phone = $(".DOrder_input_x30").val();//联系电话
                //使用时期
                var time_x10 = $("#datetimepicker6 input").val();//开始使用日期
                var time_x20 = $("#datetimepicker7 input").val();//结束使用日期
                var Remarks = $(".main02_Remarks").val();//备注
                
                if(!DOrder_user){
                    meg("提示","收件人不能为空","body");
                    return false;
                }else if(!DOrder_info){
                    meg("提示","详细地址不能为空","body");
                    return false;
                }else if(!DOrder_phone){
                    meg("提示","手机号码不能为空","body");
                    return false;
                }else if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(DOrder_phone))){
                    meg("提示","请输入正确的手机号码","body");
                    return false;
                }else if(!time_x10){
                    meg("提示","开始使用日期不能为空","body");
                    return false;
                }else if(!time_x20){
                    meg("提示","结束使用日期不能为空","body");
                    return false;
                }
                var map = new BMap.Map("container");
                var localSearch = new BMap.LocalSearch(map);
                var keyword = address_x10+address_x20+address_x30+DOrder_info;
                localSearch.setSearchCompleteCallback(function (searchResult) {
                    var poi = searchResult.getPoi(0)
                    var location = poi.point.lng+","+poi.point.lat; //获取经度和纬度
                    map_ajax(location);
                });
                localSearch.search(keyword);
                
                function map_ajax(location){
                    var data = {
                        username:$.cookie("user"),
                        oUsername:DOrder_user,
                        province:address_x10,
                        city:address_x20,
                        county:address_x30,
                        address:DOrder_info,
                        phone:DOrder_phone,
                        startTime:time_x10,
                        endTime:time_x20,
                        remarks:Remarks,
                        location:location,
                    }
                    $.ajax({
                        type: 'post',
                        url: apiUrl+"order/create",
                        dataType: 'json',
                        data:data,
                        success:function(e){
                            if(e.status == "200"){
                                //window.location.href = ""
                            }else if(e.status == "400"){
                                meg("提示","订单已支付","body");
                            }
                        },
                        error:function(){
                            meg("提示","服务器开了小差，请稍后重试","body");
                        }
                    })
                }
                    
            }else{
                window.location.reload();
            }
        }
    })
}

//关闭缴纳押金窗口
$(".deposit_title span").click(function(){
    $(".deposit").css("display","none")
    $(".deposit_but").unbind();
    state = 1;
})