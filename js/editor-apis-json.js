// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$apicount = 0;  
$propertycount = 0;
	 	
// The Master 
$MasterAPISJSON = "";

function APIJSONShowMe($row)
	{
	$thisrow = $row.id;			
	$thisslug = $thisrow.replace("-icon","");	
	$thisrow = document.getElementById($thisslug).style.display;

	if($thisrow=='none')
		{
		document.getElementById($thisslug).style.display = '';	
		}
	else
		{
		document.getElementById($thisslug).style.display = 'none';	
		}			
	}	
	
function APIJSONViewEdit()
	{
	//console.log(document.getElementById("jsonViewer"));
	if(document.getElementById("jsonViewer").style.display=='')
		{
		//console.log('switching to viewer');
		document.getElementById("jsonViewer").style.display='none';
		document.getElementById("jsonEditor").style.display='';
		}	
	else
		{
		//console.log('switching to editor');		

		$viewer = JSON.stringify($MasterAPISJSON, null, 4);
		document.getElementById("jsonViewerDetails").value = $viewer;		
		
		document.getElementById("jsonViewer").style.display='';
		document.getElementById("jsonEditor").style.display='none';			
		}
	}

// Header

function SaveAPIsJSONHeader()
	{
	$apisJSONName = document.getElementById("apisjsonName").value;
	$apisJSONDescription = document.getElementById("apisjsonDescription").value;
	$apisJSONImage = document.getElementById("apisjsonImage").value;
	$apisJSONUrl = document.getElementById("apisjsonUrl").value;

 	$MasterAPISJSON['name'] = $apisJSONName;
 	$MasterAPISJSON['description'] = $apisJSONDescription;
 	$MasterAPISJSON['image'] = $apisJSONImage;
 	$MasterAPISJSON['url'] = $apisJSONUrl;

 	$html = getHeaderCell($apisJSONName,$apisJSONDescription,$apisJSONUrl,$apisJSONImage);
 	document.getElementById("apisjsonHeaderCell").innerHTML = $html;	
	}

// Localize Templating, making as editable as possible	
function getHeaderCell(name,description,url,image,apijsonurl)
	{		
	html = "";
    html = html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="edit-header-icon" title="Edit APIs.json Header"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    html = html + '<a href="' + url + '" title="' + name + '"><img src="' + image + '" width="175" align="left" style="padding: 15px;" /></a>';
    html = html + '<a href="' + url + '" style="color: #000; font-size: 22px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a><br />' + description;  	
	
	return html; 			
	}

// Localize Templating, making as editable as possible	
function getHeader(name,description,url,image,apijsonurl)
	{		
    html = '<tr>';
    html = html + '<td align="left" valign="top" colspan="2" id="apisjsonHeaderCell">';
    html = html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="edit-header-icon" title="Edit APIs.json Header"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    html = html + '<a href="' + url + '" title="' + name + '"><img src="' + image + '" width="175" align="left" style="padding: 15px;" /></a>';
    html = html + '<a href="' + url + '" style="color: #000; font-size: 22px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a><br />' + description;
    html = html + '</td>';
    html = html + '</tr>';   	
	
	return html; 			
	}
	
function getEditHeader(name,description,url,image,apijsonurl)
	{	
		
	$thisslug = name.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");
	//console.log("-api (get) slug: " + $thisslug);				

	html = '<tr id="edit-header" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Edit APIs.json</strong>';
	html = html + '<form action="" method="get" name="apisjsonHeader">';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;" width="25%"><strong>Name:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apisjsonName" value="' + name + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Description:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apisjsonDescription" value="' + description + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Image:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apisjsonImage" value="' + image + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>URL:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apisjsonUrl" value="' + url + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'   
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="SaveAPIsJSON" value="Save Values" onclick="SaveAPIsJSONHeader();" /></td>';
    html = html + '</tr>'       
        
    html = html + '</table>';
    html = html + '</form>';
    
    html = html + '<br /></td></tr>'; 	
	
	return html; 			
	}		
	
// Filler		

function getAPITitle(title,$apicount)
	{
	html = '<tr>';
	html = html + '<td colspan="2" style="padding-top: 5px; padding-bottom: 5px;">';
	html = html + '<span style="font-size:20px;">';
	html = html + '<strong>' + title + '</strong>';
	html = html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="add-api-listing-icon" title="Toggle APIs.json Editor / Viewer"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
	html = html + '</span>';
	html = html + '</td>';
	html = html + '</tr>';
	return html; 			
	}				
	
// API Level	
	
function getAPIListingCell(name,description,image,url,$apicount)
	{	
		
	$thisslug = name.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");			

	$html = "";
    $html = $html + '<span style="font-size:20px;">';
    $html = $html + '<a href="' + url + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a> - ' + description;
    $html = $html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="edit-' + $thisslug + '-' + $apicount + '-icon" title="Edit API""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    $html = $html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="add-api-property' + $thisslug + '-' + $apicount + '-icon" title="Add API""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
    $html = $html + '</span>';
    	
	return $html; 			
	}		
	
function getAPIListing(name,description,image,url,$apicount)
	{	
		
	$thisslug = name.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");			

    html = '<tr style="background-color:#CCC;">';
    html = html + '<td align="left" style="padding-left: 50px; padding-top: 5px; padding-bottom: 5px;" colspan="2" id="api-cell-' + $apicount + '">';
    
    html = html + '<span style="font-size:20px;">';
    html = html + '<a href="' + url + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a> - ' + description;
    html = html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="edit-' + $thisslug + '-' + $apicount + '-icon" title="Edit API""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    html = html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="add-api-property' + $thisslug + '-' + $apicount + '-icon" title="Add API""><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
    html = html + '</span>';
    
    html = html + '</td>';
    html = html + '</tr>';
    	
	return html; 			
	}	
	
function getAddAPIListing()
	{		
		
	html = '<tr id="add-api-listing" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Add API</strong>';
    html = html + '<table border="0" width="90%">';
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;" width="25%"><strong>Name:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" name="name" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Description:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" name="description" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Image:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" name="image" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>URL:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" name="url" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'    
    html = html + '</table>';
    
    html = html + '<br /></td></tr>';  
    	
	return html; 			
	}	
	
function SaveAPI($apicount)
	{
	$apiName = document.getElementById("apiname"+$apicount).value;
	$apiDesc = document.getElementById("apidescription"+$apicount).value;
	$apiImage = document.getElementById("apiimage"+$apicount).value;
	$apiUrl = document.getElementById("apiurl"+$apicount).value;

 	$MasterAPISJSON['apis'][$apicount]['name'] = $apiName;
 	$MasterAPISJSON['apis'][$apicount]['description'] = $apiDesc;
 	$MasterAPISJSON['apis'][$apicount]['image'] = $apiImage;
 	$MasterAPISJSON['apis'][$apicount]['url'] = $apiUrl;

 	$html = getAPIListingCell($apiName,$apiDesc,$apiImage,$apiUrl,$apicount);
 	document.getElementById("api-cell-"+$apicount).innerHTML = $html;	
	}	
	
function getEditAPIListing(name,description,image,url,$apicount)
	{		

	$thisslug = name.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");

	html = '<tr id="edit-' + $thisslug + '-' + $apicount + '" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Edit API</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;" width="25%"><strong>Name:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apiname' + $apicount + '" value="' + name + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Description:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apidescription' + $apicount + '" value="' + description + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Image:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apiimage' + $apicount + '" value="' + image + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>URL:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apiurl' + $apicount + '" value="' + url + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>' 
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="SaveAPIsJSON" value="Save Changes" onclick="SaveAPI(' + $apicount + ');" /></td>';
    html = html + '</tr>'
     
    html = html + '</table>';
    
    html = html + '<br /></td></tr>';          
    	
	return html; 			
	}		
	
// Properties	
	
	
function getPropertyListingCell1($thistype,$thisurl,$apicount,$propertycount)
	{		
		
	$thistype = $thistype.toLowerCase();
	$thisslug = $thistype.replace(" ", "-");

	$thishtml = "";
    $thishtml = $thishtml + '<a href="' + $thisurl + '" title="' + $thistype + '"><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/building-blocks/' + $thistype + '.png" width="50" align="right" " /></a>';
    	
	return $thishtml; 			
	}	
		
function getPropertyListingCell2($thistype,$thisurl,$apicount,$propertycount)
	{		
		
	$thistype = $thistype.toLowerCase();
	$thisslug = $thistype.replace(" ", "-");

	$thishtml = "";
    $thishtml = $thishtml + '<a href="' + $thisurl + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + $thistype + '"><strong>' + $thistype + '</strong></a>';
    $thishtml = $thishtml + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="edit-' + $thisslug + '-icon" title="Edit Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    	
	return $thishtml; 			
	}	
	
function getPropertyListing($apiName,$thistype,$thisurl,$apicount,$propertycount)
	{		
		
	$thistype = $thistype.toLowerCase();
	$thisslug = $thistype.replace(" ", "-");
	
    html = '<tr>';
    html = html + '<td width="25%" align="right" id="api-' + $apicount + '-property-' + $propertycount + '-1">';
    html = html + '<a href="' + $thisurl + '" title="' + $thistype + '"><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/building-blocks/' + $thistype + '.png" width="50" align="right" " /></a>';
    html = html + '</td>';
    html = html + '<td align="left" id="api-' + $apicount + '-property-' + $propertycount + '-2">';
    html = html + '<a href="' + $thisurl + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + $thistype + '"><strong>' + $thistype + '</strong></a>';
    html = html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="edit-' + $thisslug + '-icon" title="Edit Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    html = html + '</td>';
    html = html + '</tr>';
    	
	return html; 			
	}	
	
function getPropertyAddListing($apiName,$thistype,$apicount,$propertycount)
	{		
		
	$thistype = $thistype.toLowerCase();
	$apiName = $apiName.toLowerCase();
	$thisslug = $apiName.replace(" ", "-");	
		
	html = '<tr id="add-api-property' + $thisslug + '" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Add Property</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Type:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" name="image" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'      
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>URL:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" name="description" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '</table>';
    
    html = html + '<br /></td></tr>'; 
    	
	return html; 			
	}	
	
function SaveAPIProperty($apicount,$propertycount)
	{
	document.getElementById('api-' + $apicount + '-property-' + $propertycount + '-1').innerHTML = "";	
	document.getElementById('api-' + $apicount + '-property-' + $propertycount + '-2').innerHTML = ""; 
	
	$propertyType = document.getElementById("property-type-"+$apicount+"-"+$propertycount).value;
	$propertyUrl = document.getElementById("property-url-"+$apicount+"-"+$propertycount).value;

 	$MasterAPISJSON['apis'][$apicount]['properties'][$propertycount]['type'] = $propertyType;
 	$MasterAPISJSON['apis'][$apicount]['properties'][$propertycount]['url'] = $propertyUrl;

	$html2 = getPropertyListingCell1($propertyType,$propertyUrl,$apicount,$propertycount); 			
	document.getElementById('api-' + $apicount + '-property-' + $propertycount + '-1').innerHTML = $html2;

	$html3 = getPropertyListingCell2($propertyType,$propertyUrl,$apicount,$propertycount); 					
	document.getElementById('api-' + $apicount + '-property-' + $propertycount + '-2').innerHTML = $html3;				
	}	
	
function getPropertyEditListing($apiName,$thistype,$thisurl,$apicount,$propertycount)
	{		
		
	$thisslug = $thistype.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");
	
	$thistype = $thistype.toLowerCase();	
	
	html = '<tr id="edit-' + $thisslug + '" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Edit Property</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Type:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="property-type-' + $apicount + '-' + $propertycount + '" value="' + $thistype + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'      
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>URL:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="property-url-' + $apicount + '-' + $propertycount + '" value="' + $thisurl + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="SaveAPIsJSON" value="Save Changes" onclick="SaveAPIProperty(' + $apicount + ',' + $propertycount + ');" /></td>';
    html = html + '</tr>'    
    
    html = html + '</table>';
    
    html = html + '<br /></td></tr>'; 
    	
	return html; 			
	}								

function loadAPIsJSONEditor()
    {

    $apisjsonURL = '/blogapi/apis.json';

    //console.log($apisjsonURL);
    
	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) { 													

		// Set our Master Store
		$MasterAPISJSON = apisJSON;

		$viewer = JSON.stringify(apisJSON, null, 4);
		document.getElementById("jsonViewerDetails").value = $viewer;
		//$('#jsonViewer').append($viewer); 
		
		//$('#jsonViewer').append(apisJSON); 

	 	$apisJSONName = apisJSON['name'];
	 	//console.log($apisJSONName);
	 	$apisJSONDesc = apisJSON['description'];
	 	$apisJSONLogo = apisJSON['image'];
	 	$apisJSONURL = apisJSON['url'];
	 	
	 	// Header	 	
        $html = getHeader($apisJSONName,$apisJSONDesc,$apisJSONURL,$apisJSONLogo,$apisjsonURL);
        $('#jsonEditorTable').append($html); 
        
        $html = getEditHeader($apisJSONName,$apisJSONDesc,$apisJSONURL,$apisJSONLogo,$apisjsonURL);
        $('#jsonEditorTable').append($html);         
                
        apisJSONTags = apisJSON['tags'];            
        apisJSONAPIs = apisJSON['apis'];
        
	 	$html = getAPITitle('APIs');
	 	$('#jsonEditorTable').append($html);   	 
	
	    $html = getAddAPIListing()
	    $('#jsonEditorTable').append($html);  			 	    

         $.each(apisJSONAPIs, function(apiKey, apiVal) { 

         	 $apiName = apiVal['name']; 
         	 $apiDesc = apiVal['description'];
         	 $apiImage = apiVal['image']; 
         	 $apiHumanURL = apiVal['humanURL']; 
         	 $apiBaseURL = apiVal['baseURL'];               	                         	 
			 $apiTags = apiVal['tags'];			 	 
			 
             $html = getAPIListing($apiName,$apiDesc,$apiDesc,$apiImage,$apicount)
             $('#jsonEditorTable').append($html); 	
             
             $html = getEditAPIListing($apiName,$apiDesc,$apiImage,$apiHumanURL,$apicount)
             $('#jsonEditorTable').append($html);              
             
             console.log('before apicount: ' + $apicount);            			
                         			
			 $apiProperties = apiVal['properties'];
			 $.each($apiProperties, function(propertyKey, propertyVal) { 
			 	
			 	console.log('in apicount: ' + $apicount + ' and ' + $propertycount);
			 	
			 	$propertyType = propertyVal['type'];
			 	$propertyURL = propertyVal['url'];		
			 	
				$Property = getPropertyAddListing($apiName,$propertyType,$apicount,$propertycount); 			
				$('#jsonEditorTable').append($Property); 			 			 							 		 					 	
			 				 	
				$Property = getPropertyListing($apiName,$propertyType,$propertyURL,$apicount,$propertycount); 			
				$('#jsonEditorTable').append($Property); 		
				
				$Property = getPropertyEditListing($apiName,$propertyType,$propertyURL,$apicount,$propertycount); 			
				$('#jsonEditorTable').append($Property); 			 			 							 		 					 	
			 	
			 	$propertycount++;
			 	
			 	}); 				 	                                           
            				 					 				 	 				 					 											
			 $apiContact = apiVal['contact'];
			 $apicount++;										
		});
		
		$apisJSONMaintainers = apisJSON['maintainers'];	

	});	

	// Set another completion function for the request above
	jqxhr.complete(function() {
		
	  	console.log( "show editor" );
	  	document.getElementById("jsonEditor").style.display=''; 
	  	                 
        });		  
         	  	
    } 