<?php
$route = '/blog/:blog_id/tags/';
$app->get($route, function ($blog_id)  use ($app){

	$host = $_SERVER['HTTP_HOST'];
	$blog_id = prepareIdIn($blog_id,$host);

	$ReturnObject = array();
		
 	$request = $app->request(); 
 	$param = $request->params();	
	
	$Query = "SELECT t.Tag_ID, t.Tag FROM tags t";
	$Query .= " JOIN blog_tag_pivot btp ON t.Tag_ID = btp.Tag_ID";
	$Query .= " WHERE btp.Blog_ID = " . $blog_id;
	//echo $Query;
	$DatabaseResult = mysql_query($Query) or die('Query failed: ' . mysql_error());
		
	while ($Database = mysql_fetch_assoc($DatabaseResult))
		{
			
		$tag_id = $Database['Tag_ID'];
		$Tag_Text = $Database['Tag'];

		$tag_id = prepareIdOut($tag_id,$host);

		$F = array();
		$F['tag_id'] = $tag_id;
		$F['tag'] = $Tag_Text;
		
		array_push($ReturnObject, $F);
		}

		$app->response()->header("Content-Type", "application/json");
		echo format_json(json_encode($ReturnObject));
	});
?>