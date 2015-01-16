// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$config_group_count = 0;
$config_count = 0;

	 	
// The Master 
$MasterConfig = "";

function ConfigShowMe($row)
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
	
function ConfigViewEdit()
	{
	//console.log(document.getElementById("jsonConfigViewer"));
	if(document.getElementById("jsonConfigViewer").style.display=='')
		{
		//console.log('switching to viewer');
		document.getElementById("jsonConfigViewer").style.display='none';
		document.getElementById("jsonConfigEditor").style.display='';
		document.getElementById("questionsViewer").style.display='none';
		}	
	else
		{
		//console.log('switching to editor');		

		$viewer = JSON.stringify($MasterConfig, null, 4);
		document.getElementById("jsonConfigViewerDetails").value = $viewer;		
		
		document.getElementById("jsonConfigViewer").style.display='';
		document.getElementById("jsonConfigEditor").style.display='none';	
		document.getElementById("questionsViewer").style.display='none';	
		}
	}
	
function ConfigQuestions()
	{
	if(document.getElementById("questionsViewer").style.display=='')
		{
		document.getElementById("questionsViewer").style.display='none';
		document.getElementById("jsonConfigViewer").style.display='none';
		document.getElementById("jsonConfigEditor").style.display='';
		}	
	else
		{
		$viewer = JSON.stringify($MasterSwagger, null, 4);
		document.getElementById("jsonConfigViewerDetails").value = $viewer;		

		document.getElementById("questionsViewer").style.display='';
		document.getElementById("jsonConfigViewer").style.display='none';
		document.getElementById("jsonConfigEditor").style.display='none';			
		}
	}	
	
// Localize Templating, making as editable as possible	
function getConfigGroup($config_group_name,$config_group_count)
	{		
	html = '<tr>';
	html = html + '<td colspan="2" style="padding-top: 5px; padding-bottom: 5px;">';
	html = html + '<span style="font-size:20px;">';
	html = html + '<strong>' + $config_group_name + '</strong>';
	html = html + '<a href="#" onclick="APIJSONShowMe(this); return false;" id="add-api-listing-icon" title="Toggle Editor / Viewer"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>';
	html = html + '</span>';
	html = html + '</td>';
	html = html + '</tr>';
	return html;   				
	}	
	
function getConfig($config_key,$config_value)
	{	
	console.log("running...");
	$thisslug = $config_key.toLowerCase();	
	$thisslug = $thisslug.replace(" ", "-");			

	html = '<tr id="edit-header" style="display: none;"><td align="center" colspan="2" style="font-size: 12px; background-color:#CCC;">';

    html = html + '<table border="1" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;" width="25%"><strong>' + $config_key + ':</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;">' + $config_value + '</td>';
    html = html + '</tr>';

    html = html + '</table>';
    
    html = html + '<br /></td></tr>'; 	
	
	return html; 			
	}	
	
function loadConfigEditor()
    {

	console.log("1");
    buildConfigEditor();	  
         	  	
    } 	
    
function rebuildConfigEditor()
    {
    	
	$apicount = 0;  
	$propertycount = 0;    	

	document.getElementById("jsonConfigEditor").innerHTML = '';
	
	document.getElementById("jsonConfigEditor").innerHTML = '<table cellpadding="3" cellspacing="2" border="0" width="95%" id="jsonConfigEditorTable" style="margin-left: 15px;"></table>';

	// Pull From our Master Store
 	buildConfigEditor($MasterConfig);
		
	}
	
function buildConfigEditor()
	{
		
    var github = new Github({
        token: $oAuth_Token,
        auth: "oauth"
            });
        
	var repo = github.getRepo('Stack-Network','blogapi'); 		
		
	// go through master branch
	repo.getTree('master', function(err, tree) {
		$.each(tree, function(treeKey, treeValue) {
							
			// not sure why I have to do through the tree, but it is only way that works				
			$path = treeValue['path'];
			$url = treeValue['url'];
			$sha = treeValue['sha'];
			
			//console.log('path: ' + $path);
			
			// Pull in api-config
			if($path=='api-config.json')
				{							
			    repo.manualread('master', $url, $sha, function(err, data) {
			    	
			    	$APIConfig = JSON.parse(data);
			    	
					$.each($APIConfig, function(configGroupKey, $values) { 
						
						console.log(configGroupKey);

						$HTML = getConfigGroup(configGroupKey,$config_group_count)	;			
						$('#jsonConfigEditorTable').append($HTML);    						
										
						$.each($values, function(configKey, configValue) { 
							
							console.log(configKey + ' - ' + configValue);					
							
							$HTML = getConfig(configKey,configValue);		
							$('#jsonConfigEditorTable').append($HTML);   							
								
							$config_count++;	
								
							});						
							
							$config_group_count++;	
																
						});													    	
							    				    	
			    	});							
				}

			});							
		});						
	
	}
