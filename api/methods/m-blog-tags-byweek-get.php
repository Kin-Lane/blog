<?php
$route = '/blog/tags/byweek/';
$app->get($route, function ()  use ($app){

	$ReturnObject = array();
	
 	$request = $app->request(); 
 	$params = $request->params();	

	if(isset($_REQUEST['week'])){ $week = $params['week']; } else { $week = date('W'); }
	if(isset($_REQUEST['year'])){ $year = $params['year']; } else { $year = date('Y'); }

	$Query = "SELECT t.Tag_ID, t.Tag, count(*) AS Blog_Count from tags t";
	$Query .= " JOIN blog_tag_pivot btp ON t.Tag_ID = btp.Tag_ID";
	$Query .= " JOIN blog b ON btp.Blog_ID = b.ID";
	$Query .= " WHERE WEEK(b.Post_Date) = " . $week . " AND YEAR(b.Post_Date) = " . $year;
	$Query .= " GROUP BY t.Tag ORDER BY count(*) DESC";

	echo $Query;

	$DatabaseResult = mysql_query($Query) or die('Query failed: ' . mysql_error());
	  
	while ($Database = mysql_fetch_assoc($DatabaseResult))
		{

		$tag_id = $Database['Tag_ID'];
		$tag = $Database['Tag'];
		$blog_count = $Database['Blog_Count'];

		$host = $_SERVER['HTTP_HOST'];
		$tag_id = prepareIdOut($tag_id,$host);

		$F = array();
		$F['tag_id'] = $tag_id;
		$F['tag'] = $tag;
		$F['blog_count'] = $blog_count;
		
		array_push($ReturnObject, $F);
		}

		$app->response()->header("Content-Type", "application/json");
		echo format_json(json_encode($ReturnObject));
	});
?>