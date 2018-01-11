function Carousel({imgs, container, width, height, type, duration}){
	this.imgs = imgs; // 待轮播的图片数据(数组的结构[{},{},{}])
	this.container = container;
	this.width = width;
	this.height = height;
	this.type = type || "fade";
	this.len = imgs.length;
	this.ul = null;
	this.lis = null;
	this.circles = null;
	this.currentIndex = 0;
	this.nextIndex = 1;
	this.timer = null;
	this.duration = duration;

	// 初始化
	this.init();
}

Carousel.prototype = {
	constructor : Carousel,
	// 初始化，创建页面中使用到的布局结构
	init : function(){
		// 动态创建HTML结构
		var html = 
			`<div class="xm_carousel_container">
				<ul class="imgs">`;
		// 串连轮播的图片布局
		for (var i = 0; i < this.len; i++){
			html += `<li><a href="${this.imgs[i].href}"><img src="${this.imgs[i].src}"></a></li>`;
		}

		html +=	`</ul>
				<div class="pages">
				</div>
				<div class="prev">&lt;</div>
				<div class="next">&gt;</div>
			</div>`;
		this.container[0].innerHTML = html;

		// 样式
		// 设置容器宽高度
		$(this.container[0].querySelector(".xm_carousel_container")).css({
			width: this.width + "px",
			height: this.height + "px",
			overflow: "hidden"
		});
		// 设置ul样式
		this.ul = this.container[0].querySelector(".imgs");
		$(this.ul).css({
			width: (this.type === "fade" ? this.width : this.width * this.imgs.length) + "px",
			height: this.height + "px",
			position: this.type === "fade" ? "relative" : "absolute"
		});
		// 设置li样式
		this.lis = this.container[0].querySelectorAll("li");
		for(var i = 0; i < this.len; i++) {
			$(this.lis[i]).css({
				width: this.width + "px",
				height: this.height + "px"
			});
			if (this.type === "fade") { // 淡入淡出轮播
				$(this.lis[i]).css({
					position : "absolute",
					top: 0,
					left: 0,
					display: "none"
				});
				if(i === 0)
					$(this.lis[0]).show();
			} else { // 滑动轮播
				$(this.lis[i]).css({
					float: "left"
				});
			}
		}
		// 设置小圆点样式
		$(this.container[0].querySelector(".pages")).css({
			width: this.width + "px"
		});
		// 动态添加小圆点
		html = "";
		for(let i = 0; i < this.len; i++) {
			html += `<i>${i+1}</i>`;
			
		}
		console.log(html);
		this.container[0].querySelector(".pages").innerHTML = html;
		// 查找到所有生成的小圆点DOM对象
		this.circles = this.container[0].querySelector(".pages").querySelectorAll("i");
		// 第一个小圆点默认红色
		this.circles[0].className = "current";

		// 绑定各元素事件处理
		this.bind();
	},
	// 自动轮播
	autoPlay : function(){
		this.timer = setInterval(()=>{
			this.move();
		}, this.duration);
	},
	// 轮播切换图片
	move : function(){
		if (this.type === "fade") {
			this.fade();
		} else {
			this.slide();
		}
	},
	// 淡入淡出轮播
	fade : function(){
		// 当前图片淡出
		$(this.lis[this.currentIndex]).fadeOut(400);
		// 即将显示图片淡入
		$(this.lis[this.nextIndex]).fadeIn(400);
		// 小圆点样式
		this.circles[this.currentIndex].className = "";
		this.circles[this.nextIndex].className = "current";

		this.currentIndex = this.nextIndex;
		this.nextIndex++;
		if(this.nextIndex >= this.len)
			this.nextIndex = 0;
	},
	// 滑动轮播
	slide : function(){
		// 计算滑动定位
		var _left = -1 * this.nextIndex * this.width;
		$(this.ul).animate({left: _left}, 400);
		
		// 小圆点样式
		this.circles[this.currentIndex].className = "";
		this.circles[this.nextIndex].className = "current";

		this.currentIndex = this.nextIndex;
		this.nextIndex++;
		if(this.nextIndex >= this.len)
			this.nextIndex = 0;
	},
	// 绑定轮播图中各元素事件
	bind : function(){
		// 鼠标移入/出容器范围，停止/重启自动轮播效果
		$(this.container[0].querySelector(".xm_carousel_container")).on("mouseenter", ()=>{
			clearInterval(this.timer);
		});
		$(this.container[0].querySelector(".xm_carousel_container")).on("mouseleave", ()=>{
			this.timer = setInterval(()=>{this.move();}, this.duration);
		})
		// 绑定小圆点鼠标移入事件
		for (let i = 0; i < this.len; i++) {
			this.circles[i].onmouseover = ()=>{
				if (this.currentIndex === i)
					return;
				this.nextIndex = i;
				this.move();
			}
		}
		// 向前/后翻页
		$(this.container[0].querySelector(".prev")).on("click", ()=>{
			this.nextIndex = this.currentIndex - 1;
			if (this.nextIndex < 0)
				this.nextIndex = this.len - 1;
			this.move();
		});
		$(this.container[0].querySelector(".next")).on("click", ()=>{this.move();});
	}
}