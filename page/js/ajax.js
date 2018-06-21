$(function() {
	
	(function(){
		
		//页码初始化
		initPage();
		
		//栏目点击
		var oMenu = $(".menu-ul li");
		oMenu.on("click", function() {
			var index = $(this).index();
			oMenu.eq(index).addClass("active").siblings().removeClass("active");
			initPage();
		});
		
	}());
	
	//时间函数
	function formatterDateTime() {
		var date = new Date()
		var month = date.getMonth() + 1
		var datetime = date.getFullYear() +
			"" // "年"
			+
			(month >= 10 ? month : "0" + month) +
			"" // "月"
			+
			(date.getDate() < 10 ? "0" + date.getDate() : date
				.getDate()) +
			"" +
			(date.getHours() < 10 ? "0" + date.getHours() : date
				.getHours()) +
			"" +
			(date.getMinutes() < 10 ? "0" + date.getMinutes() : date
				.getMinutes()) +
			"" +
			(date.getSeconds() < 10 ? "0" + date.getSeconds() : date
				.getSeconds());
		return datetime;
	}

	//构造参数
	function loadData(pageIndex) {
		//var oText = $(".active").data("name");
		var oText = $(".active").text();
		return {
			"showapi_timestamp": formatterDateTime(),
			"showapi_appid": '62439', //这里需要改成自己的appid
			"showapi_sign": '5c01b361fae148a7aad1c6d0eaa84d38', //这里需要改成自己的应用的密钥secret
			"channelId": "",
			"channelName": "",
			"title":oText,
			"page":pageIndex,
			"needContent": "0",
			"needHtml": "0",
			"needAllList": "0",
			"maxResult": "15",
			"id": ""
		}
	}
	
	//页码初始化
	function initPage(){
		var lod = loadData(1);
		getData(lod);
	}
	
	//分页函数
	function parm(d,y,t) {
		$(".page").paging({
			pageNo: d,
			totalPage:y,
			totalSize: t,
			callback: function(num) {
				var lods = loadData(num);
				getData(lods);
			}
		});
	}
	
	
	//数据请求
	function getData(dataNum) {
		$.ajax({
			type: 'post',
			url: 'http://route.showapi.com/109-35',
			dataType: 'json',
			data: dataNum,
			error: function(XmlHttpRequest, textStatus, errorThrown) {
				alert("操作失败!");
			},
			success: function(res) {
				var dataList = res.showapi_res_body.pagebean;
				var countPage = dataList.allNum;
				var pageNumber = dataList.allPages;
				var searchPage = dataList.currentPage;
				var conList = dataList.contentlist;
				
				//分页参数
				parm(searchPage,pageNumber,countPage);
				
				//数据返回
				var listDetail = "";
				$.each(conList, function(Index, Iteam) {
					var oId = Iteam.channelId,
						oCName = Iteam.channelName,
						oDesc = Iteam.desc,
						oImage = Iteam.imageurls,
						oLink = Iteam.link,
						oTime = Iteam.pubDate,
						oSource = Iteam.source,
						oTitle = Iteam.title;

					listDetail += '<li><b> · </b><a href="' + oLink + '" title="'+oDesc+'" target="_black" >' +oTitle+ '</a><span>'+oTime+'</span></li>'

				});
				
				//数据插入页面
				$(".con-ul").empty();
				$(".con-ul").append(listDetail);
			}
		});
	}

})