var $org = '{{ site.org }}';
var $repo = '{{ site.repo }}';
var $oauthio = '{{ site.oauthio }}';

$apiconfig = {};
$apikeys = {};

login = getUrlVar('login');

if(login=='1')
	{

	function callback(url){
	    return function(){
	        location.href=url;
	    }
	}  

	OAuth.initialize($oauthio);
	
	OAuth.popup('github').done(function(result) {
	
	    $oAuth_Token = result.access_token;
	        
       	redirectURL = "https://" + $org + ".github.io/" + $repo + "/editor-resource.html?oAuth_Token=" + $oAuth_Token;       
       	setTimeout(callback(redirectURL), 500);  	        
		        	         
		});                   			
	
   }
   
loadConfig();	

if(document.getElementById("jsonConfigEditor"))
	{			
	loadConfigEditor();			
	}	

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