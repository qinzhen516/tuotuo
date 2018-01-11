<?php
	header('Access-Control-Allow-Origin:*');
	
	$name = $_POST["name"];
	$pwd = $_POST["pwd"];
	
	//连接数据库
	mysql_connect("localhost:3306", "root", "");
	// 设置读/写库时的编码
	mysql_query("set character set utf8");
	mysql_query("set names utf8");
	// 选择使用的数据库
	mysql_select_db("qinzhen");
	// 创建sql语句
	$sql = "INSERT INTO users (usename, password) VALUES ('$name', '$pwd')";
	// 执行SQL语句，返回执行结果，如果返回值为true表示执行成功，否则执行失败
	$result = mysql_query($sql);
	// 根据执行结果判断
	if ($result) {
		echo '{"status":1, "message":"success"}';
	} else {
		echo '{"status":0, "message":"failed"}';
	}
	// 关闭数据库连接
	mysql_close();
	
	
	
	
?>