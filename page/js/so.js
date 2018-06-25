/* 跨域访问360搜索智能提示词 */
$(function() {
	var oValo = $("#js_box").val();
	var oList = $("#js_list");

	$("#js_box").keyup(function() {
		getData(oValo);
		// setText(oValo);

	})

	getData(1);

	function getData(oTx) {
		$.ajax({
			type: "get",
			url: "https://sug.so.360.cn/suggest?callback=?&encodein=utf-8&encodeout=utf-8&format=json&fields=word&word="+oTx+"&mid=!UYSSW2!t_aKk1IqT-80zw!Su85JzVXU3TlwHvv4",
			dataType: "jsonp",
			// jsonp:"jsonpcallback",
			jsonpCallback: "suggest_so",
			success: function(res) {
				var oText = res.s;
				console.log(oText);
				var oLi = "";
				$.each(oText, function(index, iteam) {
					console.log(oText[index]);
					oLi += '<li><a href="https://www.baidu.com/s?wd=' + oText[index] + '" target = "_black" >' + oText[index] + '</a></li>'
				})
				$("#js_list").empty();
				$("#js_list").append(oLi);

			}
		})
	}

	/* 
	    //第二种写法
	    function setText(oTxc) {
	        $.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&cb=?", {
	            wd: oTxc,
	        }, function (res) {
	            console.log(res);
	        });
	    } */

})