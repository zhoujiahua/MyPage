/* 
//原生JS写法
window.onload = function(){
    // alert("");
    function fn(data){
        console.log(data);
        var oData = data.s;
        var oList = document.getElementById("js_list");
        if(oData.length){
            oList.style.display = "block";
        }else{
            oList.style.display = "none";
        }
    }
    
    var oBox = document.getElementById("js_box");
   
    oBox.onkeyup = function(){
        var oScr = document.createElement("script");
        oScr.src = "http://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+this.value+"&json=1&cb=fn";
        document.body.appendChild(oScr);

    }
} */

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
			url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + oTx + "&json=1&cb=fn",
			dataType: "jsonp",
			jsonpCallback: "fn",
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