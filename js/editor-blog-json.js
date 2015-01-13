
//$.ajax({   url: 'path.php',   type: 'PUT',   success: function(data) {     //play with data }});


function getBlogs()
	{
	
	$apiurl = 'http://blog.api.stack.network/';

	$query = '?appid=5ed48098';
	$query = '&appkey=b6c8c8cba92815a6cdfe6e780bb0d2f5';
	
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