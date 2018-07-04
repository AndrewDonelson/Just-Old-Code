<?php 

if (version_compare(PHP_VERSION, '5.3.1', '<'))
{
	die('Your host needs to use PHP 5.3.1 or higher to run this version of Maestro CmC!');
}

/** 
 * Clean comments of json content and decode it with json_decode(). 
 * Work like the original php json_decode() function with the same params 
 * 
 * @param   string  $json    The json string being decoded 
 * @param   bool    $assoc   When TRUE, returned objects will be converted into associative arrays. 
 * @param   integer $depth   User specified recursion depth. (>=5.3) 
 * @param   integer $options Bitmask of JSON decode options. (>=5.4) 
 * @return  string 
 */ 
function json_clean_decode($json, $assoc = false, $depth = 512, $options = 0) { 

	// search and remove comments like /* */ and // 
	$json = preg_replace("#(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|([\s\t](//).*)#", '', $json); 

	if(version_compare(phpversion(), '5.4.0', '>=')) 
	{ 
		$json = json_decode($json, $assoc, $depth, $options); 
	} 
	elseif(version_compare(phpversion(), '5.3.0', '>=')) 
	{ 
		$json = json_decode($json, $assoc, $depth);
	} 
	else 
	{ 
		$json = json_decode($json, $assoc); 
	} 

	return $json; 
} 	


$cmcdata = trim($_POST["cmcdata"]);

if ($cmc == "")                // if user id is blank
	echo "CmC Data posted was empty."; 
else {
	echo "yeah! user id \"".$userid."\" is available, you are free to use it.d";
	mail('admin@i2tmlabs.com', 'Maestro CmC', json_clean_decode($_POST["cmcdata"],true));
}
?>