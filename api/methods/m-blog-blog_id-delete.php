<?php		
$route = '/blog/:blog_id/';	
$app->delete($route, function ($blog_id) use ($app){
	
	$host = $_SERVER['HTTP_HOST'];
	$blog_id = prepareIdIn($blog_id,$host);

	$Add = 1;
	$ReturnObject = array();
	
 	$request = $app->request(); 
 	$_POST = $request->params();	

	$query = "DELETE FROM blog WHERE ID = " . $blog_id;
	//echo $query . "<br />";
	mysql_query($query) or die('Query failed: ' . mysql_error());	

	});			
?>