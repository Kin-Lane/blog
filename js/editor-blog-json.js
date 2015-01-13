
//$.ajax({   url: 'path.php',   type: 'PUT',   success: function(data) {     //play with data }});

$WorkingResponse = "";

function getBlogs()
	{
	
	$response = "";
	
	$hosturl = 'http://blog.api.kinlane.com';
	$baseurl = '/';
	
	$resource = 'blog/';

	$query = '?appid=5ed48098';
	$query = $query + '&appkey=b6c8c8cba92815a6cdfe6e780bb0d2f5';
	
	$apiurl = $hosturl + $baseurl + $resource + $query;
	console.log($apiurl);
	
	$.ajax({
		url: $apiurl,   
		type: 'GET',   
		success: function(data) {

			$WorkingResponse = data;
			console.log("1) " + $WorkingResponse);			;
			
			}
		});				
		
	}
	
function getBlogListing($blog_name,$blog_description,$blog_url,$blog_tags,$blog_slug,$blogcount)
	{
		
	html = '<tr>';
	html = html + '<td style="padding-top: 5px; padding-bottom: 5px;">';
	html = html + '<span style="font-size:20px;">';
	html = html + '<strong>' + $blog_name + '</strong>';
	html = html + '</span>';

    $html = $html + '<a href="#" onclick="BlogShowme(this); return false;" id="edit-blog-' + $blogcount + '-icon" title="Edit Blog Post"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';
    //$html = $html + '<a href="#" onclick="BlogShowme(this); return false;" id="add-blog-' + $blogcount + '-icon" title="Add Blog Post"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-add-circle.png" width="35" align="right"  /></a>'	
	
	html = html + '</td>';
	html = html + '</tr>';
	
	return html; 
				
	}	

function loadBlogEditor()
    {
    	
	getBlogs();

	console.log("3) " + $WorkingResponse);



	}