function loadJSONEditor()
	{
	
	// Setting some base html formatting values	
	$tr = "<tr>";
	$tr2 = "</tr>";	
	$td = "<td>";
	$td2 = "</td>";
	$st = "<strong>";
	$st2 = "</strong>";
	    			
	console.log("starting...");	
	
	$APIsJSON_Path = "/blogapi/apis.json"
	
	console.log("Pulling APIs.json: " + $APIsJSON_Path);
	
    $.getJSON($APIsJSON_Path, function($apisjson) {    	  
    	  
    	console.log($apisjson);  
    	
    	$html = "";
    	
    	$APIsJSON_Name = $apisjson['name'];
    	$row = '<tr><td><strong>Name:</td><td>' + $APIsJSON_Name + '</td></tr>'
    	$('#jsonEditorTable').append($row);  
    	
    	$APIsJSON_Desc = $apisjson['description'];
    	$row = '<tr><td><strong>Description:</td><td>' + $APIsJSON_Desc + '</td></tr>'
    	$('#jsonEditorTable').append($row);  
    	
    	$APIsJSON_Image = $apisjson['image'];
    	$row = '<tr><td><strong>Image:</td><td>' + $APIsJSON_Image + '</td></tr>'
    	$('#jsonEditorTable').append($row);  
    	
    	$APIsJSON_Tags = $apisjson['tags'];
    	$row = '<tr><td><strong>Tags:</td><td>' + $APIsJSON_Tags + '</td></tr>'
    	$('#jsonEditorTable').append($row);  
    	
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
         		
         		$API_Property_Type = propertyVal['type'];
         		$API_Property_URL = propertyVal['url'];
         		
         		console.log($API_Property_Type + ' - ' + $API_Property_URL);  
         		
             	});         	                
            
             });	          	
                                               
        });
        	
	}