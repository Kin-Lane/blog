function loadJSONEditor()
	{
	console.log("starting...");	
	
	$APIsJSON_Path = "/blogapi/apis.json"
	
	console.log("Pulling APIs.json: " + $APIsJSON_Path);
	
    $.getJSON($APIsJSON_Path, function($apisjson) {    	  
    	  
    	console.log($apisjson);  
    	
    	$APIsJSON_Name = $apisjson['name'];
    	$APIsJSON_Desc = $apisjson['description'];
    	$APIsJSON_Image = $apisjson['image'];
    	$APIsJSON_Tags = $apisjson['tags'];
    	
    	$APIsJSON_APIs = $apisjson['apis'];
    	$APIsJSON_Includes = $apisjson['include'];
    	$APIsJSON_Maintainers = $apisjson['maintainers'];

		console.log("Lets loop through each API...");  
		
         $.each($APIsJSON_APIs, function(apiKey, apiVal) {         	   
           
            $API_Name = apiVal['name'];
            console.log($API_Name);  
            $API_Desc = apiVal['description'];
            $API_Image = apiVal['image'];   
            $API_HumanURL = apiVal['humanURL'];   
            $API_BaseURL = apiVal['baseURL'];   
            $API_Tags = apiVal['tags'];   
            $API_Properties = apiVal['properties'];   
            $API_Contact = apiVal['contact'];    
            
			console.log("Lets loop through each property for this api...");  
		
         	$.each($API_Properties, function(propertyKey, propertyVal) {
         		
         		$API_Property_Type = apiVal['type'];
         		$API_Property_URL = apiVal['url'];
         		
         		console.log($API_Property_Type + ' - ' + $API_Property_URL);  
         		
             	});         	                
            
             });	          	
                                               
        });
        	
	}