
//$.ajax({   url: 'path.php',   type: 'PUT',   success: function(data) {     //play with data }});


function loadBlogEditor()
    {
    console.log('loading blog editor');	

	$.ajax({
		url: 'http://domain.api.stack.network/',   
		type: 'GET',   
		success: function(data) {
		
			$response = data;
			$responseJSON = JSON.stringify(data);
			
			console.log($responseJSON);
		
			}
		});


	}