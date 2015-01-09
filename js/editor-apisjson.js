// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$PropertyArray = {};
$PropertyArray['buildingblocks'] = new Array();

// Localize Templating, making as editable as possible	

function getHeader(name,description,url,image,apijsonurl)
	{		
    html = '<tr>';
    html = html + '<td align="left" valign="top" colspan="3">';
    html = html + '<a href="' + apijsonurl + '" id="apisjsonicon" title="APIs.json"><img src="https://s3.amazonaws.com/kinlane-productions/api-commons/api-commons-icon.png" width="100" align="right" style="padding: 5px;" /></a>';
    html = html + '<a href="' + url + '" title="' + name + '"><img src="' + image + '" width="175" align="left" style="padding: 15px;" /></a>';
    html = html + '<a href="' + url + '" style="color: #000; font-size: 22px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a><br />' + description;
    html = html + '</td>';
    html = html + '</tr>';   	
	
	return html; 			
	}		

function getRow()
	{
	html = '<tr><td colspan="4"><hr style="padding: 5px; margin: 5px;" /></td></tr>';
	return html; 			
	}	

function getTitle(title)
	{
	html = '<tr><td colspan="4" style="padding-left:175px; padding-top: 5px; padding-bottom: 5px;"><span style="font-size:20px;"><strong>' + title + '</strong></span></td></tr>';
	return html; 			
	}
	
function getPropertyListing($thisname,$thisurl,$thistype)
	{		
		
	$thistype = $thistype.toLowerCase();
	
    html = '<tr>';
    html = html + '<td width="175"></td>';
    html = html + '<td width="150" align="center"><a href="' + $thisurl + '" title="' + $thisname + '"><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/building-blocks/' + $thistype + '.png" width="50"" /></a></td>';
    html = html + '<td align="left"">';
    html = html + '<a href="' + $thisurl + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + $thisname + '"><strong>' + $thisname + '</strong></a>';
    html = html + '</td>';
    html = html + '</tr>';
    	
	return html; 			
	}		
	
	
function getAPIListing(name,url,machineurl)
	{		

    html = '<tr>';
    html = html + '<td align="left" colspan="3"><a href="' + url + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a></td>';
    html = html + '</tr>';
    	
	return html; 			
	}					

function loadJSONEditor()
    {

    $apisjsonURL = '/blogapi/apis.json';

    console.log($apisjsonURL);
    
	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) { 													

	 	$apisJSONName = apisJSON['name'];
	 	console.log($apisJSONName);
	 	$apisJSONDesc = apisJSON['description'];
	 	$apisJSONLogo = apisJSON['image'];
	 	$apisJSONURL = apisJSON['url'];
	 	
	 	// Header
        html = getHeader($apisJSONName,$apisJSONDesc,$apisJSONURL,$apisJSONLogo,$apisjsonURL);
        $('#jsonEditorTable').append(html); 
        
        apisJSONTags = apisJSON['tags'];            
        apisJSONAPIs = apisJSON['apis'];
        
         $.each(apisJSONAPIs, function(apiKey, apiVal) { 
         	
         	 $apiName = apiVal['name']; 
         	 $apiDesc = apiVal['description'];
         	 $apiImage = apiVal['image']; 
         	 $apiHumanURL = apiVal['humanURL']; 
         	 $apiBaseURL = apiVal['baseURL'];               	                         	 
			 $apiTags = apiVal['tags'];
			 
             $html = getAPIListing($apiName)
             $('#apilisting').append($html); 	
			
			 $apiProperties = apiVal['properties'];
			 $.each($apiProperties, function(propertyKey, propertyVal) { 
			 	
			 	$propertyType = propertyVal['type'];
			 	$propertyURL = propertyVal['url'];		
			 	
				$Property = getPropertyListing($propertyType,$propertyURL,$propertyType); 			
				$('#jsonEditorTable').append($Property); 			 			 							 		 					 	
			 	
			 	}); 				 	                                           
            				 					 				 	 				 					 								
			
			 $apiContact = apiVal['contact'];
			 										
		});
		
		$apisJSONMaintainers = apisJSON['maintainers'];	

	});	

	// Set another completion function for the request above
	jqxhr.complete(function() {
		
	  	console.log( "second complete" );
	  	                 
        });		  
         	  	
    } 