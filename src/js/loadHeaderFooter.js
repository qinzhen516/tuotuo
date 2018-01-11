//加载头部尾部资源
define(["jquery", "cookie"],function($){
	$.ajax("/html/head.html").done(function(data){
		$(".header").html(data);
	}).done(function(){
		
		var name = $.cookie().name;
		//console.log(name);
		//console.log($.cookie(name));
		if(name){
			$(".top_left").html("您好！"+name+`<span class="out" style="cursor:pointer">[退出登录]</span>`);
			
		}else{
			$(".top_left").html(`<li><span>欢迎光临沱沱工社！</span>|</li>
				<li><a href="html/login.html">登录</a>|</li>
				<li><a href="html/register.html">注册</a>|</li>`);
		}
		$(".out").click(function(){
				$(".top_left").html(`<li><span>欢迎光临沱沱工社！</span>|</li>
				<li><a href="html/login.html">登录</a>|</li>
				<li><a href="html/register.html">注册</a>|</li>`);
			});
		
		
		//如果是首页，加载广告图
		if(window.location.href === "http://localhost:8080/index.html" || window.location.href ==="http://localhost:8080/"){
			$("#guanggao").show("slow");
		}
		
		//点击关闭广告图
		$("#close_g").click(function(){
			$("#guanggao").slideUp("slow");
		});
		
		//吸顶效果
		var top_h =$(".top").offset().top;
			
		$(window).scroll(function(){	
			var win_h = $(window).scrollTop();
				//console.log(win_h,top_h);
			if(win_h>top_h){
				$(".top").css({position:"fixed",zIndex:99});
			}else{
				$(".top").css({position:"static"});
			}
		
		});	
		
		//top划过出现小盒子
		$(".shouji").mouseenter(function(){
			$(".down_m").css({display:"block"});
			//console.log("11")
		});
		$(".down_m").mouseleave(function(){
			//console.log("11")
			$(".down_m").css({display:"none"});
		});
		
		$(".tuotuo_my").mouseenter(function(){
			$(".mytuotuo").css({display:"block"});
			//console.log("11")
		});
		$(".mytuotuo").mouseleave(function(){
			//console.log("11")
			$(".mytuotuo").css({display:"none"});
		});
		
		
		
		
		
	});
	
	
	//$(".footer").load("/html/foot.html");
	
	$.ajax("/html/foot.html").done(function(data){
		$(".footer").html(data);
	}).done(function(){
	
		$(".cart").click(function(){
		window.location.href = "http://localhost:8080/html/cart.html";
	});
	
	});
	
});