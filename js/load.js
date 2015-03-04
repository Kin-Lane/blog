var $org = '{{ site.org }}';
var $repo = '{{ site.repo }}';
var $oauthio = '{{ site.oauthio }}';
console.log("oauthio: " + $oauthio);
var $login = getUrlVar('login');

if($login=='1')
	{
	console.log("doing it!");
	function callback(url){
	    return function(){
	        location.href=url;
	    }
	}  

	OAuth.initialize($oauthio);
	
	OAuth.popup('github').done(function(result) {
	
	    $oAuth_Token = result.access_token;
		console.log("oauth2:" + $oAuth_Token);      	         
		});                   			
	
   }	

$apiconfig = {};
$apikeys = {};   

if($oAuth_Token!='')
	{	   
	loadConfig();	
	loadKeys();	
	}

if(document.getElementById("jsonConfigEditor"))
	{			
	loadConfigEditor();			
	}	

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