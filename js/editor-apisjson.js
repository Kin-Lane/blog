// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$PropertyArray = {};
$PropertyArray['buildingblocks'] = new Array();

// Localize Templating, making as editable as possible	

function getHeader(name,description,url,image,apijsonurl)
	{		
    html = '<tr>';
    html = html + '<td align="left" valign="top" colspan="4">';
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
	
function getBuildingBlockListing(name,url,type)
	{		
		
    html = '<tr>';
    html = html + '<td width="175"></td>';
    html = html + '<td width="150" align="center"><a href="' + url + '" title="' + name + '"><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/building-blocks/' + type.toLowerCase(); + '.png" width="50"" /></a></td>';
    html = html + '<td align="left"">';
    html = html + '<a href="' + url + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a>';
    html = html + '</td>';
    html = html + '</tr>';
    	
	return html; 			
	}		
	
function getOpen()
	{		

    html = '<tr>';
    html = html + '<td align="center" colspan="4">';
    html = html + '<table border="1" id="apilisting">'
    
	return html; 			
	}		
	
	
function getClose()
	{		

    html = '</table>';
    html = html + '</td>';
    html = html + '</tr>';
    	
	return html; 			
	}		
	
function getAPIListing(name,url,machineurl)
	{		

    html = '<tr>';
    html = html + '<td width="50" align="center"><a href="' + url + '" title="Documentation"><img style="padding: 5px;" src="http://kinlane-productions.s3.amazonaws.com/api-evangelist-site/building-blocks/bw-documentation.png" width="50" /></a></td>';
    html = html + '<td width="50" align="center">';
  	if(machineurl!='')
    	{
    	html = html + '<a href="' + machineurl + '" title="Swagger""><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-swagger-round.png" width="50" /></a>';
    	}
    html = html + '</td>';
    html = html + '<td align="left"><a href="' + url + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a></td>';
    html = html + '</tr>';
    	
	return html; 			
	}					

function loadJSONEditor()
    {

    $apisjsonURL = '/blogapi/apis.json';
    //$apisjsonURL = getUrlVar('apisjson');	
    console.log($apisjsonURL);
	var jqxhr = $.getJSON($apisjsonURL, function(company) { 													

	 	companyName = company['name'];
	 	console.log(companyName);
	 	companyDesc = company['description'];
	 	companyLogo = company['image'];
	 	companyURL = company['url'];
	 	
	 	// Build a Header
        html = getHeader(companyName,companyDesc,companyURL,companyLogo,$apisjsonURL);
        $('#jsonEditorTable').append(html); 
        
        companyTags = company['tags'];            
        companyAPIs = company['apis'];
        
		 // Divider Row
	 	 html = getRow();
         $('#jsonEditorTable').append(html);             
        
		 // Open Table
	 	 html = getOpen();
	 	 //alert(html);
         $('#jsonEditorTable').append(html);                                 
        
         $.each(companyAPIs, function(key, val) { 
         	
         	 $apiName = val['name']; 
         	 $apiDesc = val['description'];
         	 $apiImage = val['image']; 
         	 $apiHumanURL = val['humanURL']; 
         	 $apiBaseURL = val['baseURL'];               	
                         	 
			 $apiTags = val['tags'];
			 
			 $apiMachineURL = "";
			
			 // I want to build an array of all properties = building blocks
			 $apiProperties = val['properties'];
			 $.each($apiProperties, function(key2, val2) { 
			 	
			 	$propertyType = val2['type'];
			 	$propertyURL = val2['url'];		
			 	
				$Property = getBuildingBlockListing($propertyType,$propertyURL,$propertyType); 			
				$('#jsonEditorTable').append($Property); 			 			 							 		 					 	
			 	
			 	}); 				 	                                           
            				 					 	
             html = getAPIListing($apiName,$apiHumanURL,$apiMachineURL)
             $('#apilisting').append(html); 				 	 				 					 								
			
			 $apiContact = val['contact'];
			 
			 $companyMaintainers = company['maintainers'];								
		});
		
		 // Close Table
	 	 html = getClose();
	 	 //alert(html);
         $('#jsonEditorTable').append(html);  			
	
		 // Divider Row
	 	 html = getRow();
         $('#jsonEditorTable').append(html);   			
		
	});	

	// Set another completion function for the request above
	jqxhr.complete(function() {
		
	  	console.log( "second complete" );
	  	                 
        });		  
         	  	
    } 