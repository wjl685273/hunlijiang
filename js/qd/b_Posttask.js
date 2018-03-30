var state = 1;//防止多次点击
var username=$.cookie("user");//username
$(document).ready(function(){
  //导航栏默认选中
  $(".nav_li").eq(1).find("a").addClass("nav_on");
  $("input[name=username]").val(username);
})
if(!username){
  window.location.href="login.html";
}else{
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
  //点击类型
  $(".Posttask_x20").click(function(){
    $(this).addClass("Posttask_x20_on").siblings().removeClass("Posttask_x20_on")
  })
  //限制价格只能输入数字
  $("input[name=minPrice]").blur(function(){
    console.log(123);
    numberLimte($(this).val());
  })
  $("input[name=maxPrice]").blur(function(){
    numberLimte($(this).val());
  })
  function numberLimte(str){
    var result=/^[0-9]*$/.test(str);
    if(!result){
      str=0;
      meg("提示","请用数字表示价格","body");
    }else{
      return;
    }
  }
  //地址
    $("select[name=county]").on("change",function(){
      $("input[name=address]").val("");
    })
  //上传
  $(".Posttask_but").click(function(){
    //确定类型
    $("input[name=type]").val($(".Posttask_x20_on p").html());
    //方案草图的实际上传个数
    var imgFiles=$(".show img");
    //验证任务项目
    if(!$("input[name=taskName]").val()){
      meg("提示","请填写任务名称","body");
      return false;//任务名称验证
    }else if(!$("input[name=name]").val()){
      meg("提示","请填写联系人姓名","body");
      return false;//发布任务的人员姓名验证
    }else if(!$("input[name=phone]").val()){
      meg("提示","请输入手机号","body");
      return false;//发布任务的人员手机号为空验证
    }else if(!(/^1[3|4|5|7|8]\d{9}$/.test($("input[name=phone]").val()))){
      meg("提示","请输入正确的手机号","body");
      return false;//发布任务的人员手机号格式验证
    }else if(!$("input[name=hotelName]").val()){
      meg("提示","请填写酒店名称","body");
      return false;//验证酒店名称
    }else if(!$("input[name=address]").val()){
      meg("提示","请填写酒店地址","body");
      return false;//验证酒店地址
    // }else if(!$("input[name=minPrice]").val()){
    //   meg("提示","请填写最低价格","body");
    //   return false;//验证最低价格
    // }
    }else if(!$("input[name=maxPrice]").val()){
      meg("提示","请填写最高价格","body");
      return false;//验证最高价格
    }else if(!$("input[name=time]").val()){
      meg("提示","请选择入场时间","body");
      return false;//验证入场时间
    }else if(!$("textarea[name=require]").val()){
      meg("提示","请填写入场需求","body");
      return false;//验证入场需求
    }else if(!$("textarea[name=desc]").val()){
      meg("提示","请填写方案描述","body");
      return false;//验证需求描述
     }else if(imgFiles.length<4){
      meg("提示","请上传4张草图","body");
      return false;//验证方案草图的个数
    }
    if (state == 1){
      state = 2;
      on_Loading();
      //获取经纬度
      var map = new BMap.Map("container");
      var localSearch = new BMap.LocalSearch(map);
      var keyword = $("#s1").val()+$("#s2").val()+$("#s3").val()+$("input[name=address]").val();
      console.log(keyword);
      localSearch.setSearchCompleteCallback(function (searchResult) {
          var poi = searchResult.getPoi(0);
          console.log(poi);
          var location = poi.point.lng+","+poi.point.lat; //获取经度和纬度
          $("input[name=location]").val(poi.point.lng+","+poi.point.lat);
          console.log(location);
          nextStep();
      });
      localSearch.search(keyword);
      //获取完经纬度后的操作
      function nextStep(){
     
        //上传整个form标签
        var form = new FormData($('#uploadForm')[0]);
        console.log(form);
        //刷新页面
        var doThing = function(){
          window.location.reload();
        }
        //跳转页面
        var hrefing = function(){
          window.location.href  = 'b_MissionHall.html'
        }
        $.ajax({
          type: 'POST',
          url: apiUrl+'task/releaseTask',
          data: form,
          processData: false,
          contentType: false,
          success: function(e) {
            console.log(e.releaseStatus);
            if(e.releaseStatus==200){
              down_Loading();
              meg("提示","任务发布成功","body",hrefing);
            }else{
               down_Loading();
               meg("提示","任务发布失败","body");
            }
          },
          error : function(e) {
            down_Loading();
            meg('提示','当前网络不畅通,请检查您的网络','body',doThing); 
          }
        })
      }
    }
  })
}
