function loadJSONEditor()
	{
	console.log("starting...");	
	
	$APIsJSON_Path = "/blogapi/apis.json"
	
	console.log(data);
	
    $.getJSON($APIsJSON_Path, function(apisjson) {
    	  

    	$("#debugme").val(apisjson);
    	
                                               
        });
        	
	}