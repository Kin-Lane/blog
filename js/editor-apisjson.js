function loadJSONEditor()
	{
	console.log("starting...");	
	
	$APIsJSON_Path = "/blogapi/apis.json"
	
	console.log($APIsJSON_Path);
	
    $.getJSON($APIsJSON_Path, function($apisjson) {    	  
    	  
    	console.log($apisjson);  

    	$("#debugme").val($apisjson);
    	
                                               
        });
        	
	}