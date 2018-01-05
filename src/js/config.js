require.config({
	baseUrl : "/", 
	paths : {
		"jquery" : ["https://code.jquery.com/jquery-1.12.4.min", "lib/jquery/jquery-1.12.4.min"],
		"cookie" : "lib/jquery.cookie",
		"zoom" : "lib/jquery.elevateZoom",
		"template" : "lib/template",
		"load" : "js/loadHeaderFooter"
	},
	shim : {
		"zoom" : {
			deps : ["jquery"]
		}
	}
});