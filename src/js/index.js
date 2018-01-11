require(["config"], function(){
	require(["template","load"], function(template){
		
		
			//淡入淡出轮播
			new Carousel({
				imgs:[
					{src:"/img/index/banner1.jpg",href:"#"},
					{src:"/img/index/banner2.jpg",href:"#"},
					{src:"/img/index/banner3.jpg",href:"#"},
					{src:"/img/index/banner4.jpg",href:"#"},
					{src:"/img/index/banner5.jpg",href:"#"}
				],
				container :$(".banner1"),
//				width:1180,
				height:315,
				type:"fade",
				duration:5000
			}).autoPlay();
			
			
			//模板假数据
			$.ajax({
				type:'get',
				url:'/mock/products.json',
				dataType:"json",
				success: function(data){
					
					//console.log(data);
					
					
					var len = 0;
					for(var i in data){
						
						len++;
						//console.log(len);
						var html ="";
						var temp ={
							products:data[i]
						};
						html = template(`product${len}`,temp);
						//console.log(html);
						$(`#temp${len}`).html(html);
					}
					
				}
				
			});
			
			
//		$(".Li").mouseenter(function(){
//			$(".chlidmenu1").css({display:"block"});
//			//console.log("11")
//		});
//		$(".chlidmenu1").mouseleave(function(){
//			//console.log("11")
//			$(".chlidmenu1").css({display:"none"});
//		});
		//console.log($(".left_ul li"));
//		
//		var len = $(".left_ul li").length;
//		console.log(len);
//		for(var i=0;i<len ;i++){
//			//console.log(i);
//			$("'.left_ul' li:nth-child(i+1)").mouseenter(function(){
//				console.log($(".left_ul li:nth-child(i+1)"));
//			});
//		}
		
		
		//$(".left_ul li").mouseenter(function(){
			
				//console.log($(".left_ul li"));
			
			
		//});
		
		
		//点击ban2
		$("#prev2").click(function(){
			if($(".ban2_left").css("left") === 0+"px"){
				//.log("左边滑");
				$(".ban2").animate({
					left:"-1100px"
				},3000);
			}
		});
		$("#next2").click(function(){
			if($(".ban2").css("left") < 0+"px"){
				//console.log("右边滑");
				$(".ban2").animate({
					left:"30px"
				},3000);
			}
		});
			
			
	});

});