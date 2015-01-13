
//$.ajax({   url: 'path.php',   type: 'PUT',   success: function(data) {     //play with data }});


function getBlogs()
	{
	
	$apiurl = 'http://blog.api.stack.network/';

	$.ajax({
		url: $apiurl,   
		type: 'GET',   
		success: function(data) {
		
			$response = data;
		
			return $response;
			
			}
		});	
		
	}

function loadBlogEditor()
    {
    	
    console.log('loading blog editor');	

	$response = getBlogs();

	$responseJSON = JSON.stringify($response);	
	console.log($responseJSON);


	}