function loadJSONEditor()
	{
	console.log("starting...");	
	
	$APIsJSON_Path = "/blogapi/apis.json"
	
	console.log(data);
	
    $.getJSON($APIsJSON_Path, function(data) {
    	
    	console.log("herE:"+data);

    	$("#debugme").val(data);
    	
                                               
        });
        	
	}