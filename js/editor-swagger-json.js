// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$apicount = 0;  
$propertycount = 0;
	 	
// The Master 
$MasterSwagger = "";

function SwaggerShowMe($row)
	{
	$thisrow = $row.id;			
	$thisslug = $thisrow.replace("-icon","");
	
	//console.log('viewing: ' + $thisslug);
		
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
	
function SwaggerViewEdit()
	{
	//console.log(document.getElementById("jsonViewer"));
	if(document.getElementById("jsonViewer").style.display=='')
		{
		//console.log('switching to viewer');
		document.getElementById("jsonViewer").style.display='none';
		document.getElementById("swaggerEditor").style.display='';
		}	
	else
		{
		//console.log('switching to editor');		

		$viewer = JSON.stringify($MasterSwagger, null, 4);
		document.getElementById("jsonViewerDetails").value = $viewer;		
		
		document.getElementById("jsonViewer").style.display='';
		document.getElementById("swaggerEditor").style.display='none';			
		}
	}

function SwaggerSave()
	{

  	$WriteAPIsJSON = JSON.stringify($MasterSwagger);
    $WriteAPIsJSON = JSON.stringify(JSON.parse($WriteAPIsJSON),null,2); 	

    var github = new Github({
        token: $oAuth_Token,
        auth: "oauth"
            });
        
	var repo = github.getRepo('Stack-Network','blogapi');  	

	repo.getTree('gh-pages', function(err, tree) {
		
		// This is a workaround hack to get sha, as the github.js getSha doesn't seem to be working and I couldn't fix.
		// I'm looping through the tree to get sha, and then manually passing it to updates, and deletes
		
		$.each(tree, function(treeKey, treeValue) {
			
			$path = treeValue['path'];
			$sha = treeValue['sha'];
			
			if($path=='apis.json')
				{	
				console.log($path + ' - ' + $sha);							
			    repo.writemanual('gh-pages', 'apis.json', $WriteAPIsJSON, 'Save', $sha, function(err) { });									
				}
			});
		});  	    	
	}

// Header
function SwaggerGetHeader($SwaggerVersion,$SwaggerAPITitle,$SwaggerAPIDesc,$SwaggerAPITOS,$SwaggerAPIVersion,$SwaggerAPIHost,$SwaggerAPIBasePath)
	{		
    html = '<tr>';
    html = html + '<td align="left" valign="top" colspan="2" id="apisjsonHeaderCell">';

	html = html + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="edit-header-icon" title="Edit Swagger Header"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';

    html = html + '<table cellpadding="3" cellspacing="2" border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" width="25%"><strong>Swagger Version:</strong></td>';
    html = html + '<td align="left" id="swagger-header-swagger-version-view">' + $SwaggerVersion + '</td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" width="25%"><strong>Title:</strong></td>';
    html = html + '<td align="left" id="swagger-header-title-view">' + $SwaggerAPITitle + '</td>';
    html = html + '</tr>';   
    
    html = html + '<tr>';
    html = html + '<td align="right" width="25%"><strong>Description:</strong></td>';
    html = html + '<td align="left" id="swagger-header-desc-view">' + $SwaggerAPIDesc + '</td>';
    html = html + '</tr>'; 
    
    html = html + '<tr>';
    html = html + '<td align="right" width="25%"><strong>Terms of Service:</strong></td>';
    html = html + '<td align="left" id="swagger-header-tos-view">' + $SwaggerAPITOS + '</td>';
    html = html + '</tr>';    
    
    html = html + '<tr>';
    html = html + '<td align="right" width="25%"><strong>API Version:</strong></td>';
    html = html + '<td align="left" id="swagger-header-api-version-view">' + $SwaggerAPIVersion + '</td>';
    html = html + '</tr>';   
    
    html = html + '<tr>';
    html = html + '<td align="right" width="25%"><strong>Host:</strong></td>';
    html = html + '<td align="left" id="swagger-header-host-view">' + $SwaggerAPIHost + '</td>';
    html = html + '</tr>';    
    
    html = html + '<tr>';
    html = html + '<td align="right" width="25%"><strong>Base Path:</strong></td>';
    html = html + '<td align="left" id="swagger-header-basepath-view">' + $SwaggerAPIBasePath + '</td>';
    html = html + '</tr>';                  

    html = html + '</table>';

    html = html + '</td>';
    html = html + '</tr>';  

	return html; 			
	}
	
function SwaggerSaveHeader()
	{
	$swagger_swagger_version = document.getElementById("swagger-header-swagger-version-edit").value;
	$swagger_title = document.getElementById("swagger-header-title-edit").value;
	$swagger_desc = document.getElementById("swagger-header-desc-edit").value;
	$swagger_tos = document.getElementById("swagger-header-tos-edit").value;
	$swagger_api_version = document.getElementById("swagger-header-api-version-edit").value;
	$swagger_host = document.getElementById("swagger-header-host-edit").value;
	$swagger_basepath = document.getElementById("swagger-header-basepath-edit").value;

 	$MasterSwagger['swagger'] = $swagger_swagger_version;
 	$MasterSwagger['info']['title'] = $swagger_title;
 	$MasterSwagger['info']['description'] = $swagger_desc;
 	$MasterSwagger['info']['termsOfService'] = $swagger_tos;
 	$MasterSwagger['info']['version'] = $swagger_api_version;
 	$MasterSwagger['host'] = $swagger_host;
 	$MasterSwagger['schemes'] = $swagger_basepath;

	document.getElementById("swagger-header-swagger-version-view").innerHTML = $swagger_swagger_version;
	document.getElementById("swagger-header-title-view").innerHTML = $swagger_title;
	document.getElementById("swagger-header-desc-view").innerHTML = $swagger_desc;
	document.getElementById("swagger-header-tos-view").innerHTML = $swagger_tos;
	document.getElementById("swagger-header-api-version-view").innerHTML = $swagger_api_version;
	document.getElementById("swagger-header-host-view").innerHTML = $swagger_host;
	document.getElementById("swagger-header-basepath-view").innerHTML = $swagger_basepath;
	}	
	
function SwaggerGetEditHeader($SwaggerVersion,$SwaggerAPITitle,$SwaggerAPIDesc,$SwaggerAPITOS,$SwaggerAPIVersion,$SwaggerAPIHost,$SwaggerAPIBasePath)
	{	
		
	$thisslug = name.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");
	//console.log("-api (get) slug: " + $thisslug);				

	html = '<tr id="edit-header" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Edit Swagger Header</strong>';
	html = html + '<form action="" method="get" name="apisjsonHeader">';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;" width="25%"><strong>Swagger Version:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="swagger-header-swagger-version-edit" value="' + $SwaggerVersion + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Title:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="swagger-header-title-edit" value="' + $SwaggerAPITitle + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Description:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="swagger-header-desc-edit" value="' + $SwaggerAPIDesc + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Terms of Service:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="swagger-header-tos-edit" value="' + $SwaggerAPITOS + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'  
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>API Version:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="swagger-header-api-version-edit" value="' + $SwaggerAPIVersion + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'  
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Host:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="swagger-header-host-edit" value="' + $SwaggerAPIHost + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'  
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>Base Path:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="swagger-header-basepath-edit" value="' + $SwaggerAPIBasePath + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'               
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="SwaggerSaveSwagger" value="Save Values" onclick="SwaggerSaveHeader();" /></td>';
    html = html + '</tr>'       
        
    html = html + '</table>';
    html = html + '</form>';
    
    html = html + '<br /></td></tr>'; 	
	
	return html; 			
	}		
	
// Filler		

function SwaggerGetAPITitle(title,$apicount)
	{
	html = '<tr>';
	html = html + '<td colspan="2" style="padding-top: 5px; padding-bottom: 5px;">';
	html = html + '<span style="font-size:20px;">';
	html = html + '<strong>' + title + '</strong>';
	html = html + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="add-api-listing-icon" title="Toggle APIs.json Editor / Viewer"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
	html = html + '</span>';
	html = html + '</td>';
	html = html + '</tr>';
	return html; 			
	}				
	
// API Level	
	
function SwaggerGetAPIListingCell(name,description,image,url,$apicount)
	{	
		
	$thisslug = name.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");			

	$html = "";
    $html = $html + '<span style="font-size:20px;">';
    $html = $html + '<a href="' + url + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a> - ' + description;
    $html = $html + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="edit-' + $thisslug + '-' + $apicount + '-icon" title="Edit API"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    $html = $html + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="add-api-property-' + $thisslug + '-' + $apicount + '-icon" title="Add API Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
    $html = $html + '</span>';
    	
	return $html; 			
	}		
	
function SwaggerGetAPIListing(name,description,image,url,$apicount)
	{	
		
	$thisslug = name.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");			

    html = '<tr style="background-color:#CCC;">';
    html = html + '<td align="left" style="padding-left: 50px; padding-top: 5px; padding-bottom: 5px;" colspan="2" id="api-cell-' + $apicount + '">';
    
    html = html + '<span style="font-size:20px;">';
    html = html + '<a href="' + url + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a> - ' + description;
    html = html + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="edit-' + $thisslug + '-' + $apicount + '-icon" title="Edit API"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    html = html + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="add-api-property-' + $thisslug + '-' + $apicount + '-icon" title="Add API Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
    html = html + '</span>';
    
    html = html + '</td>';
    html = html + '</tr>';
    	
	return html; 			
	}	

function SwaggerAddAPI()
	{
	$apiName = document.getElementById("add-api-name").value;
	$apiDesc = document.getElementById("add-api-description").value;
	$apiImage = document.getElementById("add-api-image").value;
	$apiHumanUrl = document.getElementById("add-api-humanurl").value;
	$apiBaseUrl = document.getElementById("add-api-baseurl").value;		
		
	$APIArray = {};
	  
	$APIArray['name'] = $apiName;
	$APIArray['description'] = $apiDesc;
	$APIArray['image'] = $apiImage;
	$APIArray['humanURL'] = $apiHumanUrl;
	$APIArray['baseURL'] = $apiBaseUrl;
	$APIArray['tags'] = new Array();	
	$APIArray['properties'] = new Array();
	$APIArray['contact'] = new Array();

	$MasterSwagger['apis'].push($APIArray);
	
	rebuildSwaggerditor();

	}
	
function SwaggerGetAddAPIListing()
	{		
		
	html = '<tr id="add-api-listing" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Add API</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;" width="25%"><strong>name:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-api-name" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>description:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-api-description" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>image:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-api-image" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>humanURL:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-api-humanurl" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'  
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>baseURL:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-api-baseurl" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'      
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="addAPIButton" value="Add This API" onclick="SwaggerAddAPI();" /></td>';
    html = html + '</tr>'         
     
    html = html + '</table>';
    
    html = html + '<br /></td></tr>';  
    	
	return html; 			
	}	
	
function SwaggerSaveAPI($apicount)
	{
	$apiName = document.getElementById("apiname"+$apicount).value;
	$apiDesc = document.getElementById("apidescription"+$apicount).value;
	$apiImage = document.getElementById("apiimage"+$apicount).value;
	$apiUrl = document.getElementById("apiurl"+$apicount).value;

 	$MasterSwagger['apis'][$apicount]['name'] = $apiName;
 	$MasterSwagger['apis'][$apicount]['description'] = $apiDesc;
 	$MasterSwagger['apis'][$apicount]['image'] = $apiImage;
 	$MasterSwagger['apis'][$apicount]['url'] = $apiUrl;

 	$html = SwaggerGetAPIListingCell($apiName,$apiDesc,$apiImage,$apiUrl,$apicount);
 	document.getElementById("api-cell-"+$apicount).innerHTML = $html;	
	}	
	
function SwaggerGetEditAPIListing($name,$description,$image,$humanUrl,$machineUrl,$apicount)
	{		

	$thisslug = $name.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");

	html = '<tr id="edit-' + $thisslug + '-' + $apicount + '" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Edit API</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;" width="25%"><strong>name:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apiname' + $apicount + '" value="' + $name + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';$
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>description:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apidescription' + $apicount + '" value="' + $description + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>image:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apiimage' + $apicount + '" value="' + $image + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>humanURL:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apiurl' + $apicount + '" value="' + $humanUrl + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>' 
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>machineURL:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="apiurl' + $apicount + '" value="' + $machineUrl + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'     
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="SwaggerSaveAPIsJSON" value="Save Changes" onclick="SwaggerSaveAPI(' + $apicount + ');" /></td>';
    html = html + '</tr>'
     
    html = html + '</table>';
    
    html = html + '<br /></td></tr>';          
    	
	return html; 			
	}		
	
// Properties	
	
	
function SwaggerPropertyListingCell1($thistype,$thisurl,$apicount,$propertycount)
	{		
		
	$thistype = $thistype.toLowerCase();
	$thisslug = $thistype.replace(" ", "-");

	$thishtml = "";
    $thishtml = $thishtml + '<a href="' + $thisurl + '" title="' + $thistype + '"><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/building-blocks/' + $thistype + '.png" width="50" align="right" " /></a>';
    	
	return $thishtml; 			
	}	
		
function SwaggerPropertyListingCell2($thistype,$thisurl,$apicount,$propertycount)
	{		
		
	$thistype = $thistype.toLowerCase();
	$thisslug = $thistype.replace(" ", "-");

	$thishtml = "";
    $thishtml = $thishtml + '<a href="' + $thisurl + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + $thistype + '"><strong>' + $thistype + '</strong></a>';
    $thishtml = $thishtml + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="edit-' + $thisslug + '-icon" title="Edit Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    	
	return $thishtml; 			
	}	
	
function SwaggerPropertyListing($apiName,$thistype,$thisurl,$apicount,$propertycount)
	{		
		
	$thistype = $thistype.toLowerCase();
	$thisslug = $thistype.replace(" ", "-");
	
    html = '<tr>';
    html = html + '<td width="25%" align="right" id="api-' + $apicount + '-property-' + $propertycount + '-1">';
    html = html + '<a href="' + $thisurl + '" title="' + $thistype + '"><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/building-blocks/' + $thistype + '.png" width="50" align="right" " /></a>';
    html = html + '</td>';
    html = html + '<td align="left" id="api-' + $apicount + '-property-' + $propertycount + '-2">';
    html = html + '<a href="' + $thisurl + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + $thistype + '"><strong>' + $thistype + '</strong></a>';
    html = html + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="edit-' + $thisslug + '-icon" title="Edit Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    html = html + '</td>';
    html = html + '</tr>';
    	
	return html; 			
	}	
	
function SwaggerAddAPIProperty($apicount)
	{
		
	console.log("add api property: " + $apicount);	
		
	$apiPropertyType = document.getElementById("api-" + $apicount + "-property-type").value;
	$apiPropertyURL = document.getElementById("api-" + $apicount + "-property-url").value;	
		
	$APIPropertyArray = {};
	  
	$APIPropertyArray['type'] = $apiPropertyType;
	$APIPropertyArray['url'] = $apiPropertyURL;

	$MasterSwagger['apis'][$apicount]['properties'].push($APIPropertyArray);
	
	rebuildSwaggerditor();

	}	
	
function SwaggerPropertyAddListing($apiName,$apicount)
	{		
		
	$apiName = $apiName.toLowerCase();
	$thisslug = $apiName.replace(" ", "-");	
		
	html = '<tr id="add-api-property-' + $thisslug + '-' + $apicount + '" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Add Property</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>type:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><select id="api-' + $apicount + '-property-type">' + $apipropertyoptions + '</select></td>';
    html = html + '</tr>'      
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>url:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="api-' + $apicount + '-property-url" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="addAPIButton" value="Add This Property" onclick="SwaggerAddAPIProperty(' + $apicount + ');" /></td>';
    html = html + '</tr>'     
    
    html = html + '</table>';
    
    html = html + '<br /></td></tr>'; 
    	
	return html; 			
	}	
	
function SwaggerSaveAPIProperty($apicount,$propertycount)
	{
	document.getElementById('api-' + $apicount + '-property-' + $propertycount + '-1').innerHTML = "";	
	document.getElementById('api-' + $apicount + '-property-' + $propertycount + '-2').innerHTML = ""; 
	
	$propertyType = document.getElementById("property-type-"+$apicount+"-"+$propertycount).value;
	$propertyUrl = document.getElementById("property-url-"+$apicount+"-"+$propertycount).value;

 	$MasterSwagger['apis'][$apicount]['properties'][$propertycount]['type'] = $propertyType;
 	$MasterSwagger['apis'][$apicount]['properties'][$propertycount]['url'] = $propertyUrl;

	$html2 = SwaggerPropertyListingCell1($propertyType,$propertyUrl,$apicount,$propertycount); 			
	document.getElementById('api-' + $apicount + '-property-' + $propertycount + '-1').innerHTML = $html2;

	$html3 = SwaggerPropertyListingCell2($propertyType,$propertyUrl,$apicount,$propertycount); 					
	document.getElementById('api-' + $apicount + '-property-' + $propertycount + '-2').innerHTML = $html3;				
	}	
	
function SwaggerGetPropertyEditListing($apiName,$thistype,$thisurl,$apicount,$propertycount)
	{		
		
	$thisslug = $thistype.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");
	
	$thistype = $thistype.toLowerCase();	
	
	html = '<tr id="edit-' + $thisslug + '" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Edit Property</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>type:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="property-type-' + $apicount + '-' + $propertycount + '" value="' + $thistype + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'      
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>url:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="property-url-' + $apicount + '-' + $propertycount + '" value="' + $thisurl + '" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="SwaggerSaveAPIsJSON" value="Save Changes" onclick="SwaggerSaveAPIProperty(' + $apicount + ',' + $propertycount + ');" /></td>';
    html = html + '</tr>'    
    
    html = html + '</table>';
    
    html = html + '<br /></td></tr>'; 
    	
	return html; 			
	}								

function loadPropertyTypes()
    {

    $PropertiesURL = '/blogapi/data/properties.json';

    //console.log($PropertiesURL);
    
	$.getJSON($PropertiesURL, function($propertiesJSON) { 													

       $apipropertyoptions = $apipropertyoptions + '<option value="X-notsure">Not Sure</option>';
       
	    $.each($propertiesJSON, function(propertyKey, propertyValue) { 
	     	
	     	//console.log(propertyKey + ' - ' + propertyValue);
	     	
	     	$apipropertyoptions = $apipropertyoptions + '<option value="' + propertyValue['slug'] + '">' + propertyValue['name'] + ' (' + propertyValue['category'] + ')</option>';
	     	
	    	});              
		});		  
         	  	
    }

function loadSwaggerditor()
    {

    $apisjsonURL = 'definitions/swagger.json';

    //console.log($apisjsonURL);
    
	var jqxhr = $.getJSON($apisjsonURL, function(Swagger) { 													

		// Set our Master Store
		$MasterSwagger = Swagger;
		console.log("Swagger:" + Swagger);
		$viewer = JSON.stringify(Swagger, null, 4);
		document.getElementById("jsonViewerDetails").value = $viewer;

	 	$SwaggerVersion = Swagger['swagger'];	 	
	 	$SwaggerAPITitle = Swagger['info']['title'];
	 	console.log($SwaggerAPITitle);
	 	$SwaggerAPIDesc = Swagger['info']['description'];
	 	$SwaggerAPITOS = Swagger['info']['termsOfService'];
	 	$SwaggerAPIVersion = Swagger['info']['version'];
	 	
	 	$SwaggerAPIHost = Swagger['host'];
	 	$SwaggerAPIBasePath = Swagger['basePath'];
	 	
 		$html = SwaggerGetHeader($SwaggerVersion,$SwaggerAPITitle,$SwaggerAPIDesc,$SwaggerAPITOS,$SwaggerAPIVersion,$SwaggerAPIHost,$SwaggerAPIBasePath)	 	
    	$('#swaggerEditorTable').append($html); 
    	
 		$html = SwaggerGetEditHeader($SwaggerVersion,$SwaggerAPITitle,$SwaggerAPIDesc,$SwaggerAPITOS,$SwaggerAPIVersion,$SwaggerAPIHost,$SwaggerAPIBasePath)	 	
    	$('#swaggerEditorTable').append($html);     		 	
	 	
	 	$SwaggerAPISchemes = Swagger['schemes'];
	 	$SwaggerAPIProduces = Swagger['produces'];
	 	
	 	$SwaggerAPIPaths = Swagger['paths'];
	 	$SwaggerAPIDefinitions = Swagger['definitions'];
	 	
	 	// Paths
     	$.each($SwaggerAPIPaths, function(pathKey, pathValue) { 

     	 	$SwaggerAPIPathName = pathKey;
     	 	
     	 	console.log("path: " + $SwaggerAPIPathName);
     	 	
     	 	console.log("value: " + pathValue);
     	 
		 	// Verbs
	     	$.each(pathValue, function(verbKey, verbValue) { 
	
	     	 	$SwaggerAPIPathVerb = verbKey;
	     	 	console.log("verb: " + $SwaggerAPIPathVerb);	     	 	
	     	 	
				$SwaggerAPIPathVerbSummary = verbValue['summary'];
				$SwaggerAPIPathVerbDesc = verbValue['description'];	     	 	
				$SwaggerAPIPathVerbOperationId = verbValue['operationId'];	     	 					
				$SwaggerAPIPathVerbParameters = verbValue['parameters'];				
				$SwaggerAPIPathVerbResponses = verbValue['responses'];					
				$SwaggerAPIPathVerbTags = verbValue['tags'];		     	 		     	 	
 	 		     	     	 		     	 	
			 	// Parameters
		     	$.each($SwaggerAPIPathVerbParameters, function(parameterKey, parameterValue) { 	     	 		     	 	
		     		
            		$parameter_name = parameterValue['name'];
            		$parameter_in = parameterValue['in']; 
            		$parameter_desc = parameterValue['description']; 
            		$parameter_required = parameterValue['required'];
            		$parameter_type = parameterValue['type'];         	 		
	     	 		
	     	 		console.log("parameter: " + $parameter_name);     	 
    	 
    	 			});
    	 			
			 	// Responses
		     	$.each($SwaggerAPIPathVerbResponses, function(responseKey, responseValue) { 	     	 		     	 	
		     	 		     	 
		     	 	$response_code = responseKey;	 
		     	 	$response_desc = responseValue['description'];    	
		     	 	$ref = '$' + 'ref'; 
		     	 	$response_definition = responseValue['schema']['items'][$ref];
		     	 		     	 	
	     	 		console.log("response: " + $response_code + " - " + $response_desc + " - " + $response_definition); 	 
    	 
    	 			});    
    	 			
			 	// Tags
		     	$.each($SwaggerAPIPathVerbTags, function(tagKey, tagValue) { 	     	 		     	 		 
	 					 				
			     	console.log("tag: " + tagValue);  		    	 				 		    	 			    	 

    	 			});       	 				 			
    	 			
     	 		});     	 
     	 	});	
     	 	
	 	// Definitions
     	$.each($SwaggerAPIDefinitions, function(definitionKey, definitionValue) {      	 	

			console.log("definition: " + definitionKey);
			
		 	// Definition Properties
	     	$.each(definitionValue['properties'], function(definitionProperyKey, definitionPropertyValue) {      	 	

          		$definition_property_desc = definitionPropertyValue['description'];
          		$definition_property_type = definitionPropertyValue['type'];		
					
				console.log("definition property: " + definitionProperyKey + " - " + $definition_property_desc + " - " + $definition_property_type);
	
				});	 			

			});	     	 		 	
	});	

	// Set another completion function for the request above
	jqxhr.complete(function() {
		
	  	document.getElementById("swaggerEditor").style.display=''; 
	  	                 
        });		  
         	  	
    } 
    
function rebuildSwaggerditor()
    {
    	
	$apicount = 0;  
	$propertycount = 0;    	

	document.getElementById("swaggerEditor").innerHTML = '';
	
	document.getElementById("swaggerEditor").innerHTML = '<table cellpadding="3" cellspacing="2" border="0" width="95%" id="swaggerEditorTable" style="margin-left: 15px;"></table>';

	// Pull From our Master Store
	Swagger = $MasterSwagger;

 	$SwaggerName = Swagger['name'];
 	$SwaggerDesc = Swagger['description'];
 	$SwaggerLogo = Swagger['image'];
 	$SwaggerURL = Swagger['url'];
 	
 	// Header	 	
    $html = SwaggerGetHeader($SwaggerName,$SwaggerDesc,$SwaggerURL,$SwaggerLogo,$apisjsonURL);
    $('#swaggerEditorTable').append($html); 
    
    $html = SwaggerGetEditHeader($SwaggerName,$SwaggerDesc,$SwaggerURL,$SwaggerLogo,$apisjsonURL);
    $('#swaggerEditorTable').append($html);         
            
    SwaggerTags = Swagger['tags'];            
    SwaggerAPIs = Swagger['apis'];
    
 	$html = SwaggerGetAPITitle('APIs');
 	$('#swaggerEditorTable').append($html);   	 

    $html = SwaggerGetAddAPIListing()
    $('#swaggerEditorTable').append($html);  			 	    

     $.each(SwaggerAPIs, function(apiKey, apiVal) { 

     	 $apiName = apiVal['name']; 
     	 $apiDesc = apiVal['description'];
     	 $apiImage = apiVal['image']; 
     	 $apiHumanURL = apiVal['humanURL']; 
     	 $apiBaseURL = apiVal['baseURL'];               	                         	 
		 $apiTags = apiVal['tags'];			 	 
		 
         $html = SwaggerGetAPIListing($apiName,$apiDesc,$apiDesc,$apiImage,$apicount)
         $('#swaggerEditorTable').append($html); 	

         $html = SwaggerGetEditAPIListing($apiName,$apiDesc,$apiImage,$apiHumanURL,$apiBaseURL,$apicount)
         $('#swaggerEditorTable').append($html);              
         
		 $Property = SwaggerPropertyAddListing($apiName,$apicount); 			
		 $('#swaggerEditorTable').append($Property); 	               			
                     			
		 $apiProperties = apiVal['properties'];
		 $.each($apiProperties, function(propertyKey, propertyVal) { 
		 	
		 	$propertyType = propertyVal['type'];
		 	$propertyURL = propertyVal['url'];				 			 			 							 		 					 	
		 				 	
			$Property = SwaggerPropertyListing($apiName,$propertyType,$propertyURL,$apicount,$propertycount); 			
			$('#swaggerEditorTable').append($Property); 		
			
			$Property = SwaggerGetPropertyEditListing($apiName,$propertyType,$propertyURL,$apicount,$propertycount); 			
			$('#swaggerEditorTable').append($Property); 			 			 							 		 					 	
		 	
		 	$propertycount++;
		 	
		 	}); 				 	                                           
        				 					 				 	 				 					 											
		 $apiContact = apiVal['contact'];
		 $apicount++;										
	});
	
	$SwaggerMaintainers = Swagger['maintainers'];
		
	}