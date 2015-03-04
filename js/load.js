$apiconfig = {};
loadConfig();	

if(document.getElementById("jsonConfigEditor"))
	{			
	loadConfigEditor();			
	}	

$apikeys = {};
loadKeys();	

if(document.getElementById("jsonKeysEditor"))
	{			
	loadKeysEditor();			
	}	
	
if(document.getElementById("jsonEditor"))
	{
	loadPropertyTypes();	
	loadAPIsJSONEditor();
	}
	
if(document.getElementById("jsonNavigator"))
	{
	loadAPIsJSONNavigator('apis.json');
	}	
			
if(document.getElementById("swaggerEditor"))
	{			
	loadSwaggerditor();
	}									
	
if(document.getElementById("jsonQuestionEditor"))
	{			
	loadQuestionEditor();			
	}									

if($oAuth_Token!='')
	{			
		
	document.getElementById("home-nav").href = document.getElementById("home-nav").href + '?oAuth_Token=' + $oAuth_Token;
	document.getElementById("resource-editor-nav").href = document.getElementById("resource-editor-nav").href + '?oAuth_Token=' + $oAuth_Token;
	document.getElementById("apis-json-editor-nav").href = document.getElementById("apis-json-editor-nav").href + '?oAuth_Token=' + $oAuth_Token;
	document.getElementById("questions-editor-nav").href = document.getElementById("questions-editor-nav").href + '?oAuth_Token=' + $oAuth_Token;		
	document.getElementById("config-editor-nav").href = document.getElementById("config-editor-nav").href + '?oAuth_Token=' + $oAuth_Token;
	document.getElementById("keys-editor-nav").href = document.getElementById("keys-editor-nav").href + '?oAuth_Token=' + $oAuth_Token;
	
	document.getElementById("resource-editor-nav").style.display = '';
	document.getElementById("config-editor-nav").style.display = '';
	document.getElementById("keys-editor-nav").style.display = '';
	document.getElementById("apis-json-editor-nav").style.display = '';
							    					    	
	}
else
	{
		
	}
	
if(document.getElementById("jsonResourceEditor"))
	{	
	setTimeout(function() { loadResourceEditor(); },1500);			
	}  