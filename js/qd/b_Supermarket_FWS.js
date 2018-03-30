$(".main_left_nav a").click(function () {
    $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top -40+ "px"}, 500);
    return false;//不要这句会有点卡顿
});

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
	//接收URL中的参数fwsid
	var id = getUrlParam('fws');

	var data = {
		mid:id,
	}

	$.ajax({
		type: 'POST',
		url: apiUrl+'merchant/showMerchant',
		dataType: 'json',
		data: data,
		success:function(e){
			console.log(e);
			$(".info_logo").html('<img src="'+e.mLogo+'" alt="">');//商家logo
			$(".info_user h1").html(e.mName);//商家名称
			//商家星级
			var info_xin = ""
			for(var i=0;i<e.mStar;i++){
				info_xin += "<i></i>"
				$(".info_xin").html(info_xin)
			}
            var mAddress = "";
            var e_mAddress = e.mAddress.split(",");
            for(var q=0;q<e_mAddress.length;q++){
                mAddress +=e_mAddress[q];
            }
            $(".info_contact h2").html(mAddress);//商家地址
			$(".info_phone").html(e.mCpphone);//商家电话
			$(".info_amt p").html(e.mNotice);//店铺公告
			$(".main_left_01 p").html(e.mDesc);//商家简介

			//推荐商品(广告)
            var attr = "" 
            for(var x=0;x<e.list1.length;x++){
            	var ad_list1 = e.list1[x];
                var tpimg = new Array();
                tpimg = ad_list1.pimage.split(",");
                attr += '<div><a href="b_Addorder.html?spid='+ad_list1.pid+'">'+
                '<div class="main_rcont_x10"><img src="'+tpimg[0]+'" alt=""></div>'+
                '<div class="main_rcont_x20">'+
                '<h1>'+ad_list1.pname+'</h1>'+
                '<div class="main_rcont_x30">';
                if(ad_list1.discountPrice == "-1"){
                    attr +='<p class="main_rcont_x40">￥<span>'+ad_list1.price+'</span></p>';
                }else{
                    attr +='<p class="main_rcont_x40">￥<span>'+ad_list1.discountPrice+'</span></p>'+
                          '<p class="main_rcont_x50">市场价￥<span>'+ad_list1.price+'</span></p>';
                };
                attr +='</div></div></a></div>'
            }
            $(".main_right_cont").html(attr);

			//更多商品
            var gdsp = "";
            var gdsp_length = "";
            if ("6" >= e.list.length) {
                gdsp_length = e.list.length;
            }else{
                gdsp_length = "6";
            }
            for(var c=0;c<gdsp_length;c++){
                var gdsp_img = new Array();
                var gd_list = e.list[c];
                gdsp_img = gd_list.pimage.split(",");

                gdsp += '<a href="b_Addorder.html?spid='+gd_list.pid+'">'+
                '<div><div>'+
                '<img src="'+gdsp_img[0]+'" alt="">'+
                '<div>'+
                '<h1>'+gd_list.pname+'</h1>';
                if(gd_list.discountPrice != "-1"){
                    gdsp += '<p>￥'+gd_list.discountPrice+'<span>￥'+gd_list.price+'</span></p>'
                }else{
                    gdsp += '<p>￥'+gd_list.price+'</p>'
                }
                gdsp += '</div></div></div></a>'
            }
            $(".main_left03").html(gdsp);

            //查看更多
            $(".main_left03_but").html('<a href="b_Pshowcase.html?fwsid='+id+'">查看更多</a>')
            down_Loading();
		},
		error:function(){
            down_Loading();
            meg("提示","服务器开了小差，请稍后重试","body");
		}
	})
})