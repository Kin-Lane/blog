// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$PropertyArray = {};
$PropertyArray['buildingblocks'] = new Array();

// Localize Templating, making as editable as possible	
function getHeader(name,description,url,image,apijsonurl)
	{		
    html = '<tr>';
    html = html + '<td align="left" valign="top" colspan="2">';
    html = html + '<a href="' + apijsonurl + '" id="apisjsonicon" title="APIs.json"><img src="https://s3.amazonaws.com/kinlane-productions/api-commons/api-commons-icon.png" width="50" align="right" /></a>';
    html = html + '<a href=""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
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

function getAPITitle(title)
	{
	html = '<tr>';
	html = html + '<td colspan="2" style="padding-top: 5px; padding-bottom: 5px;"><span style="font-size:20px;"><strong>' + title + '</strong> <a href=""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a></span></td></tr>';
	return html; 			
	}
	
function getPropertyListing($thisname,$thisurl,$thistype)
	{		
		
	$thistype = $thistype.toLowerCase();
	
	console.log("type:" + $thistype);
	
    html = '<tr>';
    html = html + '<td width="25%" align="right"><a href="' + $thisurl + '" title="' + $thisname + '"><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/building-blocks/' + $thistype + '.png" width="50" align="right" " /></a></td>';
    html = html + '<td align="left"">';
    html = html + '<a href="' + $thisurl + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + $thisname + '"><strong>' + $thisname + '</strong></a> <a href=""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    html = html + '</td>';
    html = html + '</tr>';
    	
	return html; 			
	}	
	
function getPropertyAddListing($thisname,$thisurl,$thistype)
	{		
		
	$thistype = $thistype.toLowerCase();
	
	console.log("type:" + $thistype);
	
    html = '<tr>';
    html = html + '<td width="25%" align="right"><a href="' + $thisurl + '" title="' + $thisname + '"><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/building-blocks/' + $thistype + '.png" width="50" align="right" " /></a></td>';
    html = html + '<td align="left"">';
    html = html + '<a href="' + $thisurl + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + $thisname + '"><strong>' + $thisname + '</strong></a> <a href=""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    html = html + '</td>';
    html = html + '</tr>';
    	
	return html; 			
	}	
	
function getPropertyEditListing($thisname,$thisurl,$thistype)
	{		
		
	$thistype = $thistype.toLowerCase();
	
	console.log("type:" + $thistype);
	
    html = '<tr>';
    html = html + '<td width="25%" align="right"><a href="' + $thisurl + '" title="' + $thisname + '"><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/building-blocks/' + $thistype + '.png" width="50" align="right" " /></a></td>';
    html = html + '<td align="left"">';
    html = html + '<a href="' + $thisurl + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + $thisname + '"><strong>' + $thisname + '</strong></a> <a href=""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    html = html + '</td>';
    html = html + '</tr>';
    	
	return html; 			
	}		
	
	
function getAPIListing(name,url,description,url)
	{		

    html = '<tr>';
    html = html + '<td align="left" style="padding-left: 50px; padding-top: 5px; padding-bottom: 5px;" colspan="2"><span style="font-size:20px;"<a href="' + url + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a> - ' + description + '<a href=""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>  <a href=""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a></span></td>';
    html = html + '</tr>';
    	
	return html; 			
	}	
	
function getAddAPIListing(name,url,description,url)
	{		

    html = '<tr>';
    html = html + '<td align="left" style="padding-left: 50px; padding-top: 5px; padding-bottom: 5px;" colspan="2"><span style="font-size:20px;"<a href="' + url + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a> - ' + description + '<a href=""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>  <a href=""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a></span></td>';
    html = html + '</tr>';
    	
	return html; 			
	}	
	
function getEditAPIListing(name,url,description,image)
	{		

	html = '<tr><td align="center" colspan="2">';

    html = html + '<table border="1" width="100%">';
    html = html + '<tr>';
    html = html + '<td align="right" style="" width="35%"><strong>Name:</strong></td>';
    html = html + '<td align="left" style=""><input type="text" name="name" value="' + name + '" /></td>';
    html = html + '</tr>';
    html = html + '<tr>';
    html = html + '<td align="right" style=""><strong>Description:</strong></td>';
    html = html + '<td align="left" style=""><input type="text" name="description" value="' + description + '" /></td>';
    html = html + '</tr>';
    html = html + '<tr>';
    html = html + '<td align="right" style=""><strong>Image:</strong></td>';
    html = html + '<td align="left" style=""><input type="text" name="image" value="' + image + '" /></td>';
    html = html + '</tr>'
    html = html + '<tr>';
    html = html + '<td align="right" style=""><strong>URL:</strong></td>';
    html = html + '<td align="left" style=""><input type="text" name="url" value="' + url + '" /></td>';
    html = html + '</tr>'    
    html = html + '</table>';
    
    html = html + '</td></tr>';          
    	
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
        $html = getHeader($apisJSONName,$apisJSONDesc,$apisJSONURL,$apisJSONLogo,$apisjsonURL);
        $('#jsonEditorTable').append($html); 
        
        apisJSONTags = apisJSON['tags'];            
        apisJSONAPIs = apisJSON['apis'];
        
	 	$html = getAPITitle('APIs');
	 	$('#jsonEditorTable').append($html);         
        
         $.each(apisJSONAPIs, function(apiKey, apiVal) { 
         	
         	 $apiName = apiVal['name']; 
         	 $apiDesc = apiVal['description'];
         	 $apiImage = apiVal['image']; 
         	 $apiHumanURL = apiVal['humanURL']; 
         	 $apiBaseURL = apiVal['baseURL'];               	                         	 
			 $apiTags = apiVal['tags'];
			 
             $html = getAPIListing($apiName,$apiHumanURL,$apiDesc,$apiImage)
             $('#jsonEditorTable').append($html); 	
             
             $html = getEditAPIListing($apiName,$apiHumanURL,$apiDesc,$apiImage)
             $('#jsonEditorTable').append($html);              
                         			
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