$(document).ready(function(){
	var username=$.cookie('user');
	if(!username){
		// window.location.href="index.html";
	}else{
		$(".h_name").html(username);
	}
	$(".hotel").click(function(){
		window.location.href="c_mainHotel.html";
	})
	//获取地址栏中的两个状态参数  Cstatus-0-待审核 Cstatus-1-审核通过 Cstatus-2-审核未通过 choose-0-人员审核 choose-1-用户基本资料认证
	var Cstatus=getUrlParam('Cstatus');
	var choose=getUrlParam('choose');
//地址栏没有传参时候的默认状态
	if(choose == null || Cstatus == null){
		window.location.href="c_mainCheck.html?choose=0&&Cstatus=0";
		personDivideMeg(0)
	}
// 判断审核大类的choose
	if(choose==0){
		$(".nav_cont_a").eq(0).addClass("nav_cont_on");
		if(Cstatus==0){
			$('.one').addClass('stateItem_on');
			personDivideMeg(0)
		}else if(Cstatus==1){
			$('.two').addClass('stateItem_on');
			personDivideMeg(1)
		}else if(Cstatus==2){
			$('.three').addClass('stateItem_on');
			personDivideMeg(2);
		}
	}else if(choose==1){
		$(".nav_cont_a").eq(1).addClass("nav_cont_on");
		if(Cstatus==0){
			$('.one').addClass('stateItem_on');
			merchantDivideMeg(0);
		}else if(Cstatus==1){
			$('.two').addClass('stateItem_on');
			merchantDivideMeg(1);
		}else if(Cstatus==2){
			$('.three').addClass('stateItem_on');
			merchantDivideMeg(2);
		}
	}
	//点击人员审核 用户基本资料审核
	$(".person").click(function(){//点击人员审核
		window.location.href="c_mainCheck.html?choose=0&&Cstatus="+Cstatus+"";
	})
	$(".merchant").click(function(){//点击用户基本资料审核
		window.location.href="c_mainCheck.html?choose=1&&Cstatus="+Cstatus+"";
	})
	// 选择审核状态choose是之前保存好的大类的类型（确定是人员审核还是用户基本资料审核）
	$('.stateItem').click(function(){
		$(this).addClass('stateItem_on');
		var index = $(this).index();
		window.location.href="c_mainCheck.html?choose="+choose+"&&Cstatus="+index+"";
	})
//人员012，用户基本资料审核123
	/*************************************/
	// 用户基本资料审核加渲染分页123
	//myStatus：地址栏中的Cstatus
function merchantDivideMeg(myStatus){
		$.ajax({
		type:'post',
		url: apiUrl+'/user/selectUserInfo',
		data:{status:myStatus+1,currentPage:1},
		dataType: 'json',
		success:function(e){
			console.log(e);
			if(e.list.lists.length!=0){//有数据渲染分页插件
			$('.main_Pagination').paging({
		        initPageNo: 1, // 初始页码
		        totalPages: e.list.totalPage, //总页数
		        // totalCount: '合计' + 10 + '条数据', // 条目总数
		        slideSpeed: 600, // 缓动速度。单位毫秒
		        jump: true, //是否支持跳转
		        callback: function(page) {
		        	selectUserInfo(myStatus+1,page);	
		        }
		    })
			}else{//美有数据不渲染分页插件
				$(".checkList").html('当前区域没有数据');
			}
		},
		error:function(){meg("提示","网络开小差，请检查！","body");}
	})
}
//person 人员审核加渲染分页123
function personDivideMeg(myStatus){
		$.ajax({
		type:'post',
		url: apiUrl+'/person/selectAllByStatus',
		data:{status:myStatus,currentPage:1},
		dataType: 'json',
		success:function(e){
			console.log(e);
			if(e.lists.length!=0){//有数据渲染分页插件
			$('.main_Pagination').paging({
		        initPageNo: 1, // 初始页码
		        totalPages: e.totalPage, //总页数
		        // totalCount: '合计' + 10 + '条数据', // 条目总数
		        slideSpeed: 600, // 缓动速度。单位毫秒
		        jump: true, //是否支持跳转
		        callback: function(page) {
		        	selectAllByStatus(myStatus,page);	
		        }
		    })
			}else{//美有数据不渲染分页插件
				$(".checkList").html('当前区域没有数据');
			}
		},
		error:function(){meg("提示","网络开小差，请检查！","body");}
	})
}
	/***********************************/
	//merchantDivideMeg(2);
})
//获取地址栏中的数据
function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	//构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);//匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}
// --商户审核--/user/ selectUserInfo  status 状态0是未审核  1是已通过审核  2未通过审核 currentPage(当前页)
function selectUserInfo(mystatus,mycurrentPage){
	$(".checkList").html('');//清空之前的数据
	$.ajax({
		type:'post',
		url: apiUrl+'/user/selectUserInfo',
		data:{status:mystatus,currentPage:mycurrentPage},
		dataType: 'json',
		success:function(e){
			console.log(e);
			var lists=e.list.lists;
			var listHtml='';
				for(var i=0;i<lists.length;i++){
					var list=lists[i];
					listHtml+='<div class="checklistItem">'+list.cp_name+'<div class="hide">'+list.id+'</div></div>';
				}
			$(".checkList").html(listHtml);
			//点击列表项
				$(".checklistItem").click(function(){
					//传参数--id
					var id=$(this).children().html();
					window.location.href="c_businessCheckDetail.html?id="+id+"";
				});
		},
		error:function(){meg("提示","网络开小差，请检查！","body");}
	})
}
//展示所有的人员信息 /person/ selectAllByStatus  参数status,当前页currentPage
function selectAllByStatus(mystatus,mycurrentPage){
	$(".checkList").html('');//清空之前的数据
	$.ajax({
		type:'post',
		url: apiUrl+'/person/selectAllByStatus',
		data:{status:mystatus,currentPage:mycurrentPage},
		dataType: 'json',
		success:function(e){
			console.log(e);
			var lists=e.lists;
			var listHtml='';
			if(lists.length){
				for(var i=0;i<lists.length;i++){
					var list=lists[i];
					listHtml+='<div class="checklistItem">'+list.p_name+'<div class="hide">'+list.p_id+'</div></div>';
				}
			}else{
				listHtml+='当前区域没有数据';
			}
			$(".checkList").html(listHtml);
			//点击列表项
				$(".checklistItem").click(function(){
					//传参数--id
					var id=$(this).children().html();
					window.location.href="c_personCheckDetail.html?pid="+id+"";
				});
		},
		error:function(){meg("提示","网络开小差，请检查！","body");}
	})
}
//退出登录
$(".sign_out").click(function(){
	meg2("提示","是否确定退出登录","body",doThing)
	function doThing(){
		$.cookie("login_on","",{ path:'/',secure:false , expires: -1});//清空token
		$.cookie("user","",{ path:'/',secure:false , expires: -1});//清空用户名
		$.cookie("h_position","",{ path:'/',secure:false , expires: -1});//清空用户类型定位信息
		window.location.href = "index.html";
	}
})