$(document).ready(function(){
    on_Loading();
    $(".nav_li").eq(2).find("a").addClass("nav_on");
    //获取url中的参数
    function getUrlParam(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);//匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    //接收URL中的参数spid
    var id = getUrlParam('spid');
    var fwsid = "";
    $.ajax({
        type: 'POST',
        url: apiUrl+"product/one",
        dataType: 'json',
        data: {pid:id},
        success:function(e){
            console.log(e)
            fwsid = e.mid;
            //商品图片
            var pimage = e.product.pimage.split(",");
            var str = "";
            for(var i=0;i<pimage.length;i++){
                str +='<li><img src="'+pimage[i]+'"></li>'
            }
            $(".show_sale_list").html(str);
            //默认选中
            $(".target_pic").html('<img src="'+pimage[0]+'">');
            $(".show_sale_list>li:first-child").addClass("show_img_style");
            //点击其他图片时的样式切换
            $(".show_sale_list>li img").click(function(e){
                var src=$(this).attr("src");
                $("div.target_pic img").attr("src",src);
                $(this).parent().addClass("show_img_style");
                $(this).parent().siblings().removeClass("show_img_style");
            });
            $(".show_sale_part2_tit").text(e.product.pname);//商品名称
            $(".show_sale_part2_intru").text(e.product.pdesc);//商品名称
            //价格
            if(e.product.discountPrice != "-1"){
                $(".show_sale_part2_price").html('<span><span>￥</span>'+e.product.discountPrice+'</span><span>市场价</span><span>￥'+e.product.price+'</span>');           
            }else{
                $(".show_sale_part2_price").html('<span><span>￥</span>'+e.product.price+'</span>');
            }
            //库存,销量
            storage = e.product.number;
            $(".show_sale_part2_right_sale").html('<span>库存：'+e.product.number+'</span><span>销量：'+e.product.sellnumber+'</span>');
            //商品简介
            $(".shop_type").html('商品种类：'+e.product.ptype+'<br>商品尺寸：长：'+e.product.length+'cm  宽：'+e.product.width+'cm  高：'+e.product.height+'cm<br>商品颜色：'+e.product.property)
            //商品描述
            $(".shop_detail").text(e.product.pdesc);          
            calcNumber();
            down_Loading();
        },
        error:function(){
            down_Loading();
            meg("提示","服务器开了小差，请稍后重试","body");
        }
    })
    //添加商品
    $(".submit_sho").click(function(){
        if(!$.cookie("login_on")){
            function dothing(){
                window.open("login.html");
            }
            meg("提示","请先登录","body",dothing);
            return false;
        }else if($(".show_num").val() < 1){
            meg("提示","商品数量不能小于1","body");
            return false;
        }
        on_Loading();
        var data = {
            pid:id,
            num:$(".show_num").val(),
            username:$.cookie("user"),
        }
        $.ajax({
            type:"post",
            url: apiUrl+'cart/add',
            dataType: 'json',
            data: data,
            success:function(e){
                function dothing(){
                    window.open("b_Pshowcase.html?fwsid="+fwsid)
                }
                down_Loading();
                meg("提示","添加成功","body",dothing);
            },
            error:function(){
                down_Loading();
                meg("提示","服务器开了小差，请稍后重试","body");
            }
        })
    });
})
/*限时特惠部分*/
/*显示特惠展示图片*/

// 商品数量加减以及数量输入框的值输入标准判断
var storage="";//库存
function calcNumber(){
    //商品数量加减
    $(".show_sale_part2_num>button").click(function(e){
        var inputNumber=$(".show_sale_part2_num>input").val();
        if($(this).html()=="+"&&inputNumber<storage){
            inputNumber++;
        }
        else if($(this).html()=="—"&&inputNumber>0){
            inputNumber--;
        }
        $(".show_sale_part2_num>input").val(inputNumber);
    })
    // 数量输入框的值输入标准判断
    $(".show_sale_part2_num>input").change(function(e){
        var myInput=$(this).val();
        if(isNaN(myInput)||myInput<0||!myInput){
            $(this).val(0);
        }else if(myInput>storage){
            $(this).val(storage);
        }
    })
}
