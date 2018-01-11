require(["config"], function(){
	require(["jquery","cookie"],function(){
		//点击登录，获取用户名及密码
		
		
			
			//加载假数据
			$.ajax({
				type: "get",
				url:"../mock/user.json",
				dataType:"json",
				success:function(d){
					console.log(d);
					var user = d.res_body.data;
					console.log(user);
		
					
				//验证用户名
					$("#ord_name").blur(function(){
						var name = $("#ord_name").val();

						console.log(name);
						var flag = -1;
						//遍历判断
						$.each(user, function(){
							if(this.name === name){
//								console.log(this.name);
								flag = 1;
								return false;
							}else if(name===""){
								flag = 0;
							}
						});
						if(flag === 1){
							console.log("正确");
							$("#name_err").css({visibility:"hidden"});
						}else if(flag === 0){
							$("#name_err").css({visibility:"visible"});
							
						}else{
							alert("用户名不存在");
							$("#ord_name").val("");
						}
						
					});
					//验证密码
					$("#ord_pwd").blur(function(){
						var name = $("#ord_name").val();
						var pwd = $("#ord_pwd").val();
						var flag = -1;
						$.each(user, function() {
							if(this.password === pwd&&this.name===name){
								flag = 1;
								return false;
							}else if(pwd === ""){
								flag = 0;
							}
						});
						if(flag === 1){
							console.log("用户名密码正确");
							$("#pwd_err").css({visibility:"hidden"});
							
							//用户名密码都正确则可以登录跳转到首页
							$("#btn").click(function(){
								$.cookie("name",name, {path: "/", expires: 7});
								location.href = "/index.html"
								console.log("dengl")
							});
							
						}else if(flag === 0){
							$("#pwd_err").css({visibility:"visible"});
						}else{
							alert("密码不正确");
							$("#ord_pwd").val("");
						}
						
					});
					
					
				}//success
				
				
			});
			

		
		
		
		
	});
});