// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$pathcount = 0;  
$pathverbcount = 0;
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

function SwaggerGetPathTitle($pathTitle)
	{
	html = '<tr style="background-color:#CCC;">';
	html = html + '<td colspan="2" style="padding-top: 5px; padding-bottom: 5px;">';
	html = html + '<span style="font-size:20px;">';
	html = html + '<strong>' + $pathTitle + '</strong>';
	html = html + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="add-path-icon" title="Add a Path"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
	html = html + '</span>';
	html = html + '</td>';
	html = html + '</tr>';
	return html; 			
	}	
	
function SwaggerGetAddPath()
	{		
		
	html = '<tr id="add-path" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Add Path</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;" width="25%"><strong>Path:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-path-name" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';

    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="addPathButton" value="Add This Path" onclick="SwaggerAddPath();" /></td>';
    html = html + '</tr>'

    html = html + '</table>';
    
    html = html + '<br /></td></tr>';  
    	
	return html; 			
	}	
	
function SwaggerGetPath($path,$pathcount)
	{
	html = '<tr>';
	html = html + '<td colspan="2" style="padding-top: 5px; padding-bottom: 5px;">';
	html = html + '<span style="font-size:20px;">';
	html = html + '<strong>' + $path + '</strong>';
	html = html + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="add-path-verb-' + $pathcount + '-icon" title="Add a Verb"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
	//html = html + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="edit-path-' + $pathcount + '-icon" title="Edit Path"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
	html = html + '</span>';
	html = html + '</td>';
	html = html + '</tr>';
	return html; 			
	}					
	
function SwaggerGetPathVerb($SwaggerAPIPathVerb,$pathcount,$pathverbcount)
	{
	html = '<tr>';
	html = html + '<td colspan="2" style="padding-top: 5px; padding-bottom: 5px;" align="center">';
	
	html = html + '<table border="0" width="80%" align="center" style="background-color:#CCC;">';
	
    html = html + '<tr>';
    html = html + '<td>';	
	
	html = html + '<span style="font-size:20px;">';
	html = html + '<strong>' + $SwaggerAPIPathVerb + '</strong>';
	//html = html + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="add-path-icon" title="Add a Path"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
	html = html + '</span>';
	
    html = html + '</tr>';
    html = html + '</td>';		
	
	html = html + '</table>';
	
	html = html + '</td>';
	html = html + '</tr>';
	return html; 			
	}		
	
function SwaggerAddPathVerb()
	{
		
	$path_name = document.getElementById("add-path-name").value;	
		
	var $PathArray = [$path_name];	 

	$MasterSwagger['paths'].push($PathArray);
	
	// Need a Rebuild

	}		
	
function SwaggerGetAddPathVerb($pathcount)
	{		
		
	html = '<tr id="add-path-verb-' + $pathcount + '" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Add a Verb:</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;" width="45%"><strong>Verb:</strong></td>';
	html = html + '<td align="left" style="background-color:#FFF;"><select id="add-path-verb-' + $pathcount + '"><option value="get">get</option><option value="post">post</option><option value="put">put</option><option value="delete">delete</option></select></td>';        
     html = html + '</tr>';

    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="addPathButton" value="Add" onclick="SwaggerAddPathVerb();" /></td>';
    html = html + '</tr>'

    html = html + '</table>';
    
    html = html + '<br /></td></tr>';  
    	
	return html; 			
	}	
	
function SwaggerGetPathVerbDetail($SwaggerAPIPathVerbSummary,$SwaggerAPIPathVerbDesc,$SwaggerAPIPathVerbOperationId,$pathcount,$pathverbcount)
	{		
    html = '<tr>';
    html = html + '<td align="left" valign="top" colspan="2" id="apisjsonHeaderCell">';

	html = html + '<a href="#" onclick="SwaggerShowMe(this); return false;" id="edit-path-verb-summary-icon" title="Edit Swagger Header"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';

    html = html + '<table cellpadding="3" cellspacing="2" border="0" width="80%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" width="25%" style="font-size: 12px;"><strong>Summary:</strong></td>';
    html = html + '<td align="left" id="swagger-header-swagger-version-view" style="font-size: 12px;">>' + $SwaggerAPIPathVerbSummary + '</td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" width="25%" style="font-size: 12px;">><strong>Description:</strong></td>';
    html = html + '<td align="left" id="swagger-header-title-view" style="font-size: 12px;">>' + $SwaggerAPIPathVerbDesc + '</td>';
    html = html + '</tr>';   
    
    html = html + '<tr>';
    html = html + '<td align="right" width="25%" style="font-size: 12px;">><strong>Operation ID:</strong></td>';
    html = html + '<td align="left" id="swagger-header-desc-view" style="font-size: 12px;">>' + $SwaggerAPIPathVerbOperationId + '</td>';
    html = html + '</tr>';                

    html = html + '</table>';

    html = html + '</td>';
    html = html + '</tr>';  

	return html; 			
	}	
	
function SwaggerSavePath($pathcount)
	{
		
	$path_name = document.getElementById("edit-path-' + $pathcount + '").value;	
		
	var $PathArray = [$path_name];	 

	$MasterSwagger['paths'].push($PathArray);
	
	// Need a Rebuild

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
	 	
 		$html = SwaggerGetHeader($SwaggerVersion,$SwaggerAPITitle,$SwaggerAPIDesc,$SwaggerAPITOS,$SwaggerAPIVersion,$SwaggerAPIHost,$SwaggerAPIBasePath);	 	
    	$('#swaggerEditorTable').append($html); 
    	
 		$html = SwaggerGetEditHeader($SwaggerVersion,$SwaggerAPITitle,$SwaggerAPIDesc,$SwaggerAPITOS,$SwaggerAPIVersion,$SwaggerAPIHost,$SwaggerAPIBasePath);	 	
    	$('#swaggerEditorTable').append($html);     		 	
	 	
	 	$SwaggerAPISchemes = Swagger['schemes'];
	 	$SwaggerAPIProduces = Swagger['produces'];
	 	
	 	$SwaggerAPIPaths = Swagger['paths'];
	 	$SwaggerAPIDefinitions = Swagger['definitions'];
	 		 	
	    $pathTitle = "Paths";
 		$html = SwaggerGetPathTitle($pathTitle);
    	$('#swaggerEditorTable').append($html); 
    	    	
 		$html = SwaggerGetAddPath();
    	$('#swaggerEditorTable').append($html);     	

	 	// Paths
     	$.each($SwaggerAPIPaths, function(pathKey, pathValue) { 

     	 	$SwaggerAPIPathName = pathKey;

 			$html = SwaggerGetPath($SwaggerAPIPathName,$pathcount);
    		$('#swaggerEditorTable').append($html);  
    		
 			$html = SwaggerGetAddPathVerb($pathcount);
    		$('#swaggerEditorTable').append($html);       		    		  	 	
     	 	
		 	// Verbs
	     	$.each(pathValue, function(verbKey, verbValue) { 
	
	     	 	$SwaggerAPIPathVerb = verbKey;
	     	 	console.log("verb: " + $SwaggerAPIPathVerb);	
		     	 	
	 			$html = SwaggerGetPathVerb($SwaggerAPIPathVerb,$pathcount,$pathverbcount);
	    		$('#swaggerEditorTable').append($html); 	     	 	     	 	
		     	 	
				$SwaggerAPIPathVerbSummary = verbValue['summary'];
				$SwaggerAPIPathVerbDesc = verbValue['description'];	     	 	
				$SwaggerAPIPathVerbOperationId = verbValue['operationId'];
				
				$html = SwaggerGetPathVerbDetail($SwaggerAPIPathVerbSummary,$SwaggerAPIPathVerbDesc,$SwaggerAPIPathVerbOperationId,$pathcount,$pathverbcount);
				$('#swaggerEditorTable').append($html); 
					     	 					
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
    	 		
    	 		$pathverbcount++;
    	 			
     	 		}); 
     	 		
     	 	$pathcount++;	
     	 		    	 
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
    	
	
		
	}