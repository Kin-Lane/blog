
//$.ajax({   url: 'path.php',   type: 'PUT',   success: function(data) {     //play with data }});

$WorkingResponse = "";
	
function addBlogPost(tinyInstance)
	{
	$blog_name = document.getElementById("add-blog-name").value;

	var ed = tinyMCE.get(tinyInstance);
	window.setTimeout(function() {
		$blog_description = ed.getContent();
	}, 3000);


	$blog_url = document.getElementById("add-blog-url").value;
	$blog_tags = document.getElementById("add-blog-tags").value;
	$blog_slug = document.getElementById("add-blog-slug").value;	
	
	$postData = {};
	  
	$postData['appid'] = '5ed48098';
	$postData['appkey'] = 'b6c8c8cba92815a6cdfe6e780bb0d2f5';

	$postData['name'] = $blog_name;
	$postData['description'] = $blog_description;
	$postData['url'] = $blog_url;
	$postData['tags'] = $blog_tags;
	$postData['slug'] = $blog_slug
		
	$hosturl = 'http://blog.api.kinlane.com';
	$baseurl = '/';
	
	$resource = 'blog/';

	$query = '?appid=5ed48098';
	$query = $query + '&appkey=b6c8c8cba92815a6cdfe6e780bb0d2f5';
	
	$apiurl = $hosturl + $baseurl + $resource + $query;
	console.log($apiurl);
	
	$.ajax({
		url: $apiurl,   
		type: 'POST', 
		data: $postData,
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
	
function getAddBlogPost()
	{		
		
	html = '<tr id="add-blog-post" style="display: none;"><td align="center" style="font-size: 12px; background-color:#CCC; padding:5px;">';

	html = html + '<span style="font-size: 18px;"><strong>Add New Blog</span></strong>';
    html = html + '<table border="0" width="90%" id="add-blog-post-table">';
    
    html = html + '<tr>';
    html = html + '<td align="right" width="5%"><strong>name:</strong></td>';
    html = html + '<td align="left"><input type="text" id="add-blog-name" value="" style="width:95%;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right"><strong>description:</strong></td>';
    html = html + '<td align="left"><textarea id="add-blog-description" name="Page_Body" rows="20" cols="50" class="mceEditor"></textarea></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right"><strong>url:</strong></td>';
    html = html + '<td align="left"><input type="text" id="add-blog-url" value="" style="width:95%;" /></td>';
    html = html + '</tr>';
    
    html = html + '<tr>';
    html = html + '<td align="right"><strong>tags:</strong></td>';
    html = html + '<td align="left"><input type="text" id="add-blog-tags" value="" style="width:95%;" /></td>';
    html = html + '</tr>'  
    
    html = html + '<tr>';
    html = html + '<td align="right"><strong>slug:</strong></td>';
    html = html + '<td align="left"><input type="text" id="add-blog-slug" value="" style="width:95%;" /></td>';
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