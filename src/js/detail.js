require(["config"], function(){
	require(["template","load","fly"], function(template){
		// 配置 cookie 插件的 json 数据自动转换
	$.cookie.json = true;
		
		///左边的模板
		$.ajax({
			type:'get',
				url:'/mock/products.json',
				dataType:"json",
				success: function(data){
				//console.log(data);
					var html_l ="";
					var temp_l ={
						products:data.tea
					};
					html_l = template("bottom_l",temp_l);
					$("#temp_box").html(html_l);
					
					
					
					
				    
				    var html_r ="";
					for(var i in data){
						
				   		var temp_r;
						temp_r ={
							products:data[i]
						}
						html_r += template("bottom_2",temp_r);
						$("#rightbottom").html(html_r);
						
					}
				
				}
		}).done(function(){
			//利用事件委派，为点击购物车绑定事件
			$(".zhanshi").delegate(".add_cart","click",function(event){
				//console.log(this);
				var _box =$(this).parent().parent();
				//console.log(_box);
				var prod = {
					id:_box.children(".id").text(),
					title:_box.children(".title_host").text(),
					price:_box.children(".price_host").text(),
					amount:1,
					img:_box.children(".img").attr("src")
				};
				//console.log(prod);
				// 查找 cookie 中已有购物车结构
				var _products = $.cookie("products") || [];
				// 判断当前选购商品是否在数组中已有选购
				var index = exist(prod.id, _products);
				if (index === -1) {
					// 将当前选购商品保存到数组中
					_products.push(prod);					
				} else {
					// 将已选购商品的数量自增
					_products[index].amount++;
				}
				// 将数组存回 cookie 中
				$.cookie("products", _products, {expires:7, path:"/"});
				
				
				var offset = $(".cart").offset();
				
				/* 加入购物车成功的抛物线效果 */
				var flyer = $(`<img src="${_box.children(".img").attr("src")}">`);
				flyer.fly({
					start:{
						left : event.clientX,
						top : event.clientY
					},
					end:{
						left : offset.left,
						top : 500,
						width: 0,
						height: 0
					}
					
				});
				
			});
		});
		// 查找 id 所表示的商品在 products 中位置
		function exist(id, products) {
			var idx = -1;
			$.each(products, function(index, elemenet){
				if (elemenet.id == id) {
					idx = index;
					return false;
				}
			});
	
			return idx;
		}
		
		
		//抛物线效果
		//var flyer = $(`<img src="$">`)

	});
});