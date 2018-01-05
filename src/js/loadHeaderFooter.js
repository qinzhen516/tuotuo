//加载头部尾部资源
define(["jquery", "cookie"],function($){
	$(".header").load("/html/head.html");
	$(".footer").load("/html/foot.html");
});