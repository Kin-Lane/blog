
//$.ajax({   url: 'path.php',   type: 'PUT',   success: function(data) {     //play with data }});


function getBlogs()
	{
	
	$hosturl = 'http://blog.api.kinlane.com';
	baseurl = '/';

	$query = '?appid=5ed48098';
	$query = $query + '&appkey=b6c8c8cba92815a6cdfe6e780bb0d2f5';
	
	$apiurl = $hosturl + baseurl + $query;
	
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