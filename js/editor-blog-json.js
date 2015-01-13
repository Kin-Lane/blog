
//$.ajax({   url: 'path.php',   type: 'PUT',   success: function(data) {     //play with data }});

$WorkingResponse = "";
	
function addBlogPost()
	{
		
	}	
	
function getAddBlogPost()
	{		
		
	html = '<tr id="add-blog-post" style="display: none;"><td align="center" style="font-size: 12px; background-color:#CCC;">';

	html = html + '<strong>Add Blog Post</strong>';
    html = html + '<table border="0" width="90%">';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;" width="25%"><strong>name:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-blog-name" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>description:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><textarea id="add-bog-description" name="Page_Body" rows="10" cols="50" class="mceEditor" style="width: 100%;"></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>url:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-blog-url" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>tags:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-blog-tags" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'  
    
    html = html + '<tr>';
    html = html + '<td align="right" style="background-color:#FFF;"><strong>slug:</strong></td>';
    html = html + '<td align="left" style="background-color:#FFF;"><input type="text" id="add-blog-slug" value="" style="width: 100%; height: 100%; border: 0px solid #FFF;" /></td>';
    html = html + '</tr>'      
    
    html = html + '<tr>';
    html = html + '<td align="center" style="background-color:#FFF;" colspan="2"><input type="button" name="addAPIButton" value="Add" onclick="addBlogPost();" /></td>';
    html = html + '</tr>'         
     
    html = html + '</table>';
    
    html = html + '<br /></td></tr>';  
    	
	return html; 			
	}	
	
function getBlogListing($blog_name,$blog_description,$blog_url,$blog_tags,$blog_slug,$blogcount)
	{
		
	html = '<tr>';
	html = html + '<td style="padding-top: 5px; padding-bottom: 5px;">';	

    html = html + '<a href="#" onclick="BlogShowme(this); return false;" id="edit-blog-' + $blogcount + '-icon" title="Edit Blog Post"><img src="https://s3.amazonaws.com/kinlane-productions/bw-icons/bw-edit-circle.png" width="35" align="right"  /></a>';	
	
	html = html + '<span style="font-size:20px;">';
	html = html + '<strong>' + $blog_name + '</strong>';
	html = html + '</span>';
	
	html = html + '</td>';
	html = html + '</tr>';
	
	return html; 
				
	}	

function loadBlogEditor()
    {

	$response = "";
	
	$html = getAddBlogPost();
	$('#jsonBlogEditorTable').append($html); 
	
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
			console.log("1) " + data);
				
			$blogcount = 0;
			
			$.each(data, function(blogKey, blogValue) {
				
				$blog_name = blogValue['name'];
				$blog_description = blogValue['description'];
				$blog_url = blogValue['url'];
				$blog_tags = blogValue['tags'];
				$blog_slug = blogValue['slug'];
				
				$html = getBlogListing($blog_name,$blog_description,$blog_url,$blog_tags,$blog_slug);
				$('#jsonBlogEditorTable').append($html); 
				
				$blogcount++;
				
				});

			
			}
		});		

	}	