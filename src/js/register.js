require(["config"], function(){
	require(["jquery"],function(){
		
		
		//标志位
		var flag_n =false,
			flag_p = false;
		
		
			// 生成验证码
		function generateCode() {
			$.ajax({
				type : "get",
				url : "http://route.showapi.com/932-2",
				data : {
					showapi_appid : "49968",
					showapi_sign : "15b9fea50e544d90921f9c8eea2062c4"
				},
				dataType : "json",
				success : function(data){
					var val = data.showapi_res_body;
					$("#gen_code").attr("src",val.image);
					//console.log(val.image);
					//console.log(val.sid);
					$("#gen_code").data("sid",val.sid) ;// 添加自定义属性，保存关联标识
					$("#gen_code").data("sid");
					//console.log($("#gen_code").data("sid"));
				}
			});
		}
		generateCode();
		
		//个人用户
		
		$("#per_name").blur(function(){
			
			//获取输入值，判断不为空
			var name = $("#per_name").val();
			//console.log(name);
			if(name === ""){
				$("#name_err").css({visibility:"visible"});
				$("#per_name").css({background:"url('/img/register/tc_tip.png') no-repeat 332px 12px"});
			}else if(!/^1[3|4|5|7|8][0-9]{9}$/.test(name)){
				//手机号正则表达式
				console.log("不是手机号");
				
				$("#name_err").text("手机号格式不正确请重新输入");
				$("#name_err").css({visibility:"visible"});
			}else{
				console.log("手机号输入正确");
				$("#per_name").css({border:"1px solid #81d5b1 ",background:"url('/img/register/cart_tip_img4.jpg') no-repeat 332px 12px"});
				$("#name_err").css({visibility:"hidden"});
				$(".code").css({display:"block"});
				//$(".code").animate({display:'block'},"slow","linear");
			
				//generateCode();

				$("#gen_code").click(function(){
						generateCode();
				});
			
					$("#code").blur(function(){
						$.ajax({
							type : "get",
							url : "http://route.showapi.com/932-1",
							data : {					
								showapi_appid : "49968",
								showapi_sign : "15b9fea50e544d90921f9c8eea2062c4",
								checkcode : $("#code").val(),
								sid : $("#gen_code").data("sid")
							},
							dataType : "json",
							success : function(data){
								console.log(data);
								console.log(data.showapi_res_body.valid);
								if(data.showapi_res_body.valid){
									console.log("验证码正确");
									flag_n = true;
									$("#code_text").css({display:"none"});
									$(".code").css({border:"1px solid #81d5b1"});
								}
									
								else{
									$("#code_text").css({display:"block"});
								}
									
							}
						});
					}); 
						
			}
			
			
		});
		//密码验证
		$("#per_pwd").blur(function(){
			
			//获取输入值，判断不为空
			var pwd = $("#per_pwd").val();
			console.log(pwd);
			if(pwd === ""){
				$("#pwd_err").css({visibility:"visible"});
				$("#per_pwd").css({background:"url('/img/register/tc_tip.png') no-repeat 332px 12px"});
			}else if(!/^[\w]{6,20}$/.test(pwd)){
				//6到20位，数字字母下划线 正则表达式
				console.log("密码不规范");
				
				$("#pwd_err").text("6-20个字符内，使用字母、数字、下划线，区分大小写");
				$("#pwd_err").css({visibility:"visible"});
			}else{
				console.log("密码输入正确");
				$("#per_pwd").css({border:"1px solid #81d5b1 ",background:"url('/img/register/cart_tip_img4.jpg') no-repeat 332px 12px"});
				$("#pwd_err").css({visibility:"hidden"});
			}
			
			
		});
		//再次输入密码
		$("#per_pwd2").blur(function(){
			var pwd = $("#per_pwd").val();
			var pwd2 = $("#per_pwd2").val();
			if(/^[\w]{6,20}$/.test(pwd)){
				console.log("╰(*°▽°*)╯");
				if(pwd === pwd2){
					$("#per_pwd2").css({border:"1px solid #81d5b1 ",background:"url('/img/register/cart_tip_img4.jpg') no-repeat 332px 12px"});
					$("#pwd2_err").css({visibility:"hidden"});
					flag_p = true;
				}else{
					$("#pwd2_err").css({visibility:"visible"});
					$("#per_pwd2").css({background:"url('/img/register/tc_tip.png') no-repeat 332px 12px"});
				}
			}
		});
		
		
		
		//输入改变时，标志位改为false
		$("#per_name").change(function(){
			flag_n = false;
		});
		$("#per_pwd").change(function(){
			flag_p = false;
		});
		
		//console.log($(".company_box"));
		$(".company").click(function(){
			$(".person_box").css({display:"none"});
			$(".company_box").css({display:"block"});
			//console.log("企业yonghu")
			
			$(".company").css({background:"url('/img/register/orange_line.png') no-repeat left 38px"});
			$(".person").css({background:"none"});
		});
		$(".person").click(function(){
			$(".company_box").css({display:"none"});
			$(".person_box").css({display:"block"});
			//console.log("企业yonghu")
			$(".person").css({background:"url('/img/register/orange_line.png') no-repeat left 38px"});
			$(".company").css({background:"none"});
		});
		
		
		//注册
		$("#btn").click(function(e){
			e.preventDefault();
			
			if(flag_n === true && flag_p === true && $(".check").prop("checked")){
				console.log("可以注册");
				$.ajax({
					type:"post",
					url:"http://10.7.187.135/register.php",
					async:true,
					data:{
						name:$("#per_name").val(),
						pwd:$("#per_pwd").val()
					},
					dataType:"json",
					success:function(data){
						if (data.status === 1) { // 注册成功
							location = "/html/success.html";
						} else {
							console.log("注册失败")
						}
					}
				});
			
			
			}
			
			
			
//			
			
		});
		
		

	});
});