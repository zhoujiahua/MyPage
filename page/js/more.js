/*加载更多JS*/
$(function() {

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
	function setParameter() {
		return {
			"showapi_timestamp": formatterDateTime(),
			"showapi_appid": '62439',
			"showapi_sign": '5c01b361fae148a7aad1c6d0eaa84d38',
			"tid": "",
			"keyword": "",
			"page": ""
		}
	}

	$.ajax({
		type: "post",
		url: "http://route.showapi.com/96-109",
		data: setParameter(),
		dataType: "json",
		success: function(res) {
			console.log(res)
			var oArr = res.showapi_res_body.pagebean,
				oNum = oArr.allNum,//总数
				oPages = oArr.allPages,//总分页
				oList = oArr.contentlist,//内容列表
				oCurr = oArr.currentPage,//页码
				oMRes = oArr.maxResult;//每页条数
			
			var str = "";
			$.each(oList,function(i,t){
				console.log(oList[i])
				str += "<li><b>"+t.title+"</b></li>"
			})
			
			$("#js_list").append(str);
		},
		error: function() {
			alert("数据请求错误");
		}

	});

})