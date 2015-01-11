// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$apicount = 0;  
$propertycount = 0;
	 	
// The Master 
$MasterAPISJSON = "";

$apipropertyoptions = "";

function APIJSONShowMe($row)
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

function APISJSONSave($oAuth_Token)
	{
	console.log("saving: " + $oAuth_Token);
	$WriteAPIsJSON = JSON.stringify($MasterAPISJSON, null, 4);
	console.log("saving: " + $MasterAPISJSON);
	
    var github = new Github({
        token: $oAuth_Token,
        auth: "oauth"
            });
        
	var repo = github.getRepo('Stack-Network','blogapi');  	

  	repo.write('gh-pages','apis.json', $WriteAPIsJSON, 'Saving APIs.json', function(err) {
                                   
    	});    	

	}

// Header

function APIJSONAPIJSONSaveAPIs()
	{
	$apisJSONName = document.getElementById("apisjsonName").value;
	$apisJSONDescription = document.getElementById("apisjsonDescription").value;
	$apisJSONImage = document.getElementById("apisjsonImage").value;
	$apisJSONUrl = document.getElementById("apisjsonUrl").value;

 	$MasterAPISJSON['name'] = $apisJSONName;
 	$MasterAPISJSON['description'] = $apisJSONDescription;
 	$MasterAPISJSON['image'] = $apisJSONImage;
 	$MasterAPISJSON['url'] = $apisJSONUrl;

 	$html = APIJSONGetHeaderCell($apisJSONName,$apisJSONDescription,$apisJSONUrl,$apisJSONImage);
 	document.getElementById("apisjsonHeaderCell").innerHTML = $html;	
	}

// Localize Templating, making as editable as possible	
function APIJSONGetHeaderCell(name,description,url,image,apijsonurl)
	{		
	html = "";
    html = html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="edit-header-icon" title="Edit APIs.json Header"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    html = html + '<a href="' + url + '" title="' + name + '"><img src="' + image + '" width="175" align="left" style="padding: 15px;" /></a>';
    html = html + '<a href="' + url + '" style="color: #000; font-size: 22px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a><br />' + description;  	
	
	return html; 			
	}

// Localize Templating, making as editable as possible	
function APIJSONGetHeader(name,description,url,image,apijsonurl)
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
	
function APIJSONGetEditHeader(name,description,url,image,apijsonurl)
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
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="APIJSONSaveAPIsJSON" value="Save Values" onclick="APIJSONAPIJSONSaveAPIs();" /></td>';
    html = html + '</tr>'       
        
    html = html + '</table>';
    html = html + '</form>';
    
    html = html + '<br /></td></tr>'; 	
	
	return html; 			
	}		
	
// Filler		

function APIJSONGetAPITitle(title,$apicount)
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
	
function APIJSONGetAPIListingCell(name,description,image,url,$apicount)
	{	
		
	$thisslug = name.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");			

	$html = "";
    $html = $html + '<span style="font-size:20px;">';
    $html = $html + '<a href="' + url + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a> - ' + description;
    $html = $html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="edit-' + $thisslug + '-' + $apicount + '-icon" title="Edit API"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    $html = $html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="add-api-property-' + $thisslug + '-' + $apicount + '-icon" title="Add API Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
    $html = $html + '</span>';
    	
	return $html; 			
	}		
	
function APIJSONGetAPIListing(name,description,image,url,$apicount)
	{	
		
	$thisslug = name.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");			

    html = '<tr style="background-color:#CCC;">';
    html = html + '<td align="left" style="padding-left: 50px; padding-top: 5px; padding-bottom: 5px;" colspan="2" id="api-cell-' + $apicount + '">';
    
    html = html + '<span style="font-size:20px;">';
    html = html + '<a href="' + url + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + name + '"><strong>' + name + '</strong></a> - ' + description;
    html = html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="edit-' + $thisslug + '-' + $apicount + '-icon" title="Edit API"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    html = html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="add-api-property-' + $thisslug + '-' + $apicount + '-icon" title="Add API Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
    html = html + '</span>';
    
    html = html + '</td>';
    html = html + '</tr>';
    	
	return html; 			
	}	

function APIJSONAddAPI()
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

	$MasterAPISJSON['apis'].push($APIArray);
	
	rebuildAPIsJSONEditor();

	}
	
function APIJSONGetAddAPIListing()
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
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="addAPIButton" value="Add This API" onclick="APIJSONAddAPI();" /></td>';
    html = html + '</tr>'         
     
    html = html + '</table>';
    
    html = html + '<br /></td></tr>';  
    	
	return html; 			
	}	
	
function APIJSONSaveAPI($apicount)
	{
	$apiName = document.getElementById("apiname"+$apicount).value;
	$apiDesc = document.getElementById("apidescription"+$apicount).value;
	$apiImage = document.getElementById("apiimage"+$apicount).value;
	$apiUrl = document.getElementById("apiurl"+$apicount).value;

 	$MasterAPISJSON['apis'][$apicount]['name'] = $apiName;
 	$MasterAPISJSON['apis'][$apicount]['description'] = $apiDesc;
 	$MasterAPISJSON['apis'][$apicount]['image'] = $apiImage;
 	$MasterAPISJSON['apis'][$apicount]['url'] = $apiUrl;

 	$html = APIJSONGetAPIListingCell($apiName,$apiDesc,$apiImage,$apiUrl,$apicount);
 	document.getElementById("api-cell-"+$apicount).innerHTML = $html;	
	}	
	
function APIJSONGetEditAPIListing($name,$description,$image,$humanUrl,$machineUrl,$apicount)
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
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="APIJSONSaveAPIsJSON" value="Save Changes" onclick="APIJSONSaveAPI(' + $apicount + ');" /></td>';
    html = html + '</tr>'
     
    html = html + '</table>';
    
    html = html + '<br /></td></tr>';          
    	
	return html; 			
	}		
	
// Properties	
	
	
function APIJSONPropertyListingCell1($thistype,$thisurl,$apicount,$propertycount)
	{		
		
	$thistype = $thistype.toLowerCase();
	$thisslug = $thistype.replace(" ", "-");

	$thishtml = "";
    $thishtml = $thishtml + '<a href="' + $thisurl + '" title="' + $thistype + '"><img style="padding: 5px;" src="https://s3.amazonaws.com/kinlane-productions/building-blocks/' + $thistype + '.png" width="50" align="right" " /></a>';
    	
	return $thishtml; 			
	}	
		
function APIJSONPropertyListingCell2($thistype,$thisurl,$apicount,$propertycount)
	{		
		
	$thistype = $thistype.toLowerCase();
	$thisslug = $thistype.replace(" ", "-");

	$thishtml = "";
    $thishtml = $thishtml + '<a href="' + $thisurl + '" style="color: #000; font-size: 16px; text-decoration: none;" title="' + $thistype + '"><strong>' + $thistype + '</strong></a>';
    $thishtml = $thishtml + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="edit-' + $thisslug + '-icon" title="Edit Property"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    	
	return $thishtml; 			
	}	
	
function APIJSONPropertyListing($apiName,$thistype,$thisurl,$apicount,$propertycount)
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
	
function APIJSONAddAPIProperty($apicount)
	{
		
	console.log("add api property: " + $apicount);	
		
	$apiPropertyType = document.getElementById("api-" + $apicount + "-property-type").value;
	$apiPropertyURL = document.getElementById("api-" + $apicount + "-property-url").value;	
		
	$APIPropertyArray = {};
	  
	$APIPropertyArray['type'] = $apiPropertyType;
	$APIPropertyArray['url'] = $apiPropertyURL;

	$MasterAPISJSON['apis'][$apicount]['properties'].push($APIPropertyArray);
	
	rebuildAPIsJSONEditor();

	}	
	
function APIJSONPropertyAddListing($apiName,$apicount)
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
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="addAPIButton" value="Add This Property" onclick="APIJSONAddAPIProperty(' + $apicount + ');" /></td>';
    html = html + '</tr>'     
    
    html = html + '</table>';
    
    html = html + '<br /></td></tr>'; 
    	
	return html; 			
	}	
	
function APIJSONSaveAPIProperty($apicount,$propertycount)
	{
	document.getElementById('api-' + $apicount + '-property-' + $propertycount + '-1').innerHTML = "";	
	document.getElementById('api-' + $apicount + '-property-' + $propertycount + '-2').innerHTML = ""; 
	
	$propertyType = document.getElementById("property-type-"+$apicount+"-"+$propertycount).value;
	$propertyUrl = document.getElementById("property-url-"+$apicount+"-"+$propertycount).value;

 	$MasterAPISJSON['apis'][$apicount]['properties'][$propertycount]['type'] = $propertyType;
 	$MasterAPISJSON['apis'][$apicount]['properties'][$propertycount]['url'] = $propertyUrl;

	$html2 = APIJSONPropertyListingCell1($propertyType,$propertyUrl,$apicount,$propertycount); 			
	document.getElementById('api-' + $apicount + '-property-' + $propertycount + '-1').innerHTML = $html2;

	$html3 = APIJSONPropertyListingCell2($propertyType,$propertyUrl,$apicount,$propertycount); 					
	document.getElementById('api-' + $apicount + '-property-' + $propertycount + '-2').innerHTML = $html3;				
	}	
	
function APIJSONGetPropertyEditListing($apiName,$thistype,$thisurl,$apicount,$propertycount)
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
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="APIJSONSaveAPIsJSON" value="Save Changes" onclick="APIJSONSaveAPIProperty(' + $apicount + ',' + $propertycount + ');" /></td>';
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
        $html = APIJSONGetHeader($apisJSONName,$apisJSONDesc,$apisJSONURL,$apisJSONLogo,$apisjsonURL);
        $('#jsonEditorTable').append($html); 
        
        $html = APIJSONGetEditHeader($apisJSONName,$apisJSONDesc,$apisJSONURL,$apisJSONLogo,$apisjsonURL);
        $('#jsonEditorTable').append($html);         
                
        apisJSONTags = apisJSON['tags'];            
        apisJSONAPIs = apisJSON['apis'];
        
	 	$html = APIJSONGetAPITitle('APIs');
	 	$('#jsonEditorTable').append($html);   	 
	
	    $html = APIJSONGetAddAPIListing()
	    $('#jsonEditorTable').append($html);  			 	    

         $.each(apisJSONAPIs, function(apiKey, apiVal) { 

         	 $apiName = apiVal['name']; 
         	 $apiDesc = apiVal['description'];
         	 $apiImage = apiVal['image']; 
         	 $apiHumanURL = apiVal['humanURL']; 
         	 $apiBaseURL = apiVal['baseURL'];               	                         	 
			 $apiTags = apiVal['tags'];			 	 
			 
             $html = APIJSONGetAPIListing($apiName,$apiDesc,$apiDesc,$apiImage,$apicount)
             $('#jsonEditorTable').append($html); 	
                        
             $html = APIJSONGetEditAPIListing($apiName,$apiDesc,$apiImage,$apiHumanURL,$apiBaseURL,$apicount)
             $('#jsonEditorTable').append($html);              

			 $Property = APIJSONPropertyAddListing($apiName,$apicount); 			
			 $('#jsonEditorTable').append($Property);                        			
                         			
			 $apiProperties = apiVal['properties'];
			 $.each($apiProperties, function(propertyKey, propertyVal) { 

			 	$propertyType = propertyVal['type'];
			 	$propertyURL = propertyVal['url'];					 				 			 							 		 					 	
			 				 	
				$Property = APIJSONPropertyListing($apiName,$propertyType,$propertyURL,$apicount,$propertycount); 			
				$('#jsonEditorTable').append($Property); 		
				
				$Property = APIJSONGetPropertyEditListing($apiName,$propertyType,$propertyURL,$apicount,$propertycount); 			
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
		
	  	document.getElementById("jsonEditor").style.display=''; 
	  	                 
        });		  
         	  	
    } 
    
function rebuildAPIsJSONEditor()
    {
    	
	$apicount = 0;  
	$propertycount = 0;    	

	document.getElementById("jsonEditor").innerHTML = '';
	
	document.getElementById("jsonEditor").innerHTML = '<table cellpadding="3" cellspacing="2" border="0" width="95%" id="jsonEditorTable" style="margin-left: 15px;"></table>';

	// Pull From our Master Store
	apisJSON = $MasterAPISJSON;

 	$apisJSONName = apisJSON['name'];
 	$apisJSONDesc = apisJSON['description'];
 	$apisJSONLogo = apisJSON['image'];
 	$apisJSONURL = apisJSON['url'];
 	
 	// Header	 	
    $html = APIJSONGetHeader($apisJSONName,$apisJSONDesc,$apisJSONURL,$apisJSONLogo,$apisjsonURL);
    $('#jsonEditorTable').append($html); 
    
    $html = APIJSONGetEditHeader($apisJSONName,$apisJSONDesc,$apisJSONURL,$apisJSONLogo,$apisjsonURL);
    $('#jsonEditorTable').append($html);         
            
    apisJSONTags = apisJSON['tags'];            
    apisJSONAPIs = apisJSON['apis'];
    
 	$html = APIJSONGetAPITitle('APIs');
 	$('#jsonEditorTable').append($html);   	 

    $html = APIJSONGetAddAPIListing()
    $('#jsonEditorTable').append($html);  			 	    

     $.each(apisJSONAPIs, function(apiKey, apiVal) { 

     	 $apiName = apiVal['name']; 
     	 $apiDesc = apiVal['description'];
     	 $apiImage = apiVal['image']; 
     	 $apiHumanURL = apiVal['humanURL']; 
     	 $apiBaseURL = apiVal['baseURL'];               	                         	 
		 $apiTags = apiVal['tags'];			 	 
		 
         $html = APIJSONGetAPIListing($apiName,$apiDesc,$apiDesc,$apiImage,$apicount)
         $('#jsonEditorTable').append($html); 	

         $html = APIJSONGetEditAPIListing($apiName,$apiDesc,$apiImage,$apiHumanURL,$apiBaseURL,$apicount)
         $('#jsonEditorTable').append($html);              
         
		 $Property = APIJSONPropertyAddListing($apiName,$apicount); 			
		 $('#jsonEditorTable').append($Property); 	               			
                     			
		 $apiProperties = apiVal['properties'];
		 $.each($apiProperties, function(propertyKey, propertyVal) { 
		 	
		 	$propertyType = propertyVal['type'];
		 	$propertyURL = propertyVal['url'];				 			 			 							 		 					 	
		 				 	
			$Property = APIJSONPropertyListing($apiName,$propertyType,$propertyURL,$apicount,$propertycount); 			
			$('#jsonEditorTable').append($Property); 		
			
			$Property = APIJSONGetPropertyEditListing($apiName,$propertyType,$propertyURL,$apicount,$propertycount); 			
			$('#jsonEditorTable').append($Property); 			 			 							 		 					 	
		 	
		 	$propertycount++;
		 	
		 	}); 				 	                                           
        				 					 				 	 				 					 											
		 $apiContact = apiVal['contact'];
		 $apicount++;										
	});
	
	$apisJSONMaintainers = apisJSON['maintainers'];
		
	}