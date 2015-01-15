// Purposely keeping this verbose, and expanded, until I figure out best patterns for config and extensability

$configcount = 0;  
	 	
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
	
function loadConfigEditor()
    {

    var github = new Github({
        token: $oAuth_Token,
        auth: "oauth"
            });
            
	var repo = github.getRepo('Stack-Network','blogapi');  

	repo.read('master', 'api-config.json', function(err, res) {
	    	
	 		//buildConfigEditor(res);
									
		});		  
         	  	
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
	
function buildConfigEditor($Config)

	{

	$.each($Config, function(configGroupKey, $values) { 
		
		console.log(configGroupKey);
		
		$.each($values, function(configKey, configValues) { 
		
			console.log(configKey + ' = ' + configValues);
			
		});		
		
	});
	
	
	
	}
