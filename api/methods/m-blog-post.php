<?php
$route = '/blog/';	
$app->post($route, function () use ($app){
	
	$Add = 1;
	$ReturnObject = array();
	
 	$request = $app->request(); 
 	$params = $request->params();	
	
	if(isset($params['post_date'])){ $post_date = mysql_real_escape_string($params['post_date']); } else { $post_date = date('Y-m-d H:i:s'); }
	if(isset($params['title'])){ $title = mysql_real_escape_string($params['title']); } else { $title = 'No Title'; }
	if(isset($params['author'])){ $author = mysql_real_escape_string($params['author']); } else { $author = ''; }
	if(isset($params['summary'])){ $summary = mysql_real_escape_string($params['summary']); } else { $summary = ''; }
	if(isset($params['body'])){ $body = mysql_real_escape_string($params['body']); } else { $body = ''; }
	if(isset($params['footer'])){ $footer = mysql_real_escape_string($params['footer']); } else { $footer = ''; }

  	$Query = "SELECT * FROM blog WHERE Title = '" . $title . "' AND Author = '" . $author . "'";
	//echo $Query . "<br />";
	$Database = mysql_query($Query) or die('Query failed: ' . mysql_error());
	
	if($Database && mysql_num_rows($Database))
		{	
		$ThisBlog = mysql_fetch_assoc($Database);	
		$blog_id = $ThisBlog['ID'];
		}
	else 
		{
		$Query = "INSERT INTO blog(Post_Date,Title,Author,Summary,Body,Footer)";
		$Query .= " VALUES(";
		$Query .= "'" . mysql_real_escape_string($post_date) . "',";
		$Query .= "'" . mysql_real_escape_string($title) . "',";
		$Query .= "'" . mysql_real_escape_string($author) . "',";
		$Query .= "'" . mysql_real_escape_string($summary) . "',";
		$Query .= "'" . mysql_real_escape_string($body) . "',";
		$Query .= "'" . mysql_real_escape_string($footer) . "'";
		$Query .= ")";
		//echo $Query . "<br />";
		mysql_query($Query) or die('Query failed: ' . mysql_error());
		$blog_id = mysql_insert_id();			
		}

	$host = $_SERVER['HTTP_HOST'];
   $blog_id = prepareIdOut($blog_id,$host);

	$ReturnObject['blog_id'] = $blog_id;
	
	$app->response()->header("Content-Type", "application/json");
	echo format_json(json_encode($ReturnObject));

	});
?>