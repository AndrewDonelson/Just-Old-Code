<?php
/**
* HybridAuth
* http://hybridauth.sourceforge.net | http://github.com/hybridauth/hybridauth
* (c) 2009-2014, HybridAuth authors | http://hybridauth.sourceforge.net/licenses.html
*/

// ----------------------------------------------------------------------------------------
//	HybridAuth Config file: http://hybridauth.sourceforge.net/userguide/Configuration.html
// ----------------------------------------------------------------------------------------

return 
	array(
		"base_url" => "http://apps.i2tmlabs.com/libs/hybridauth/", 

		"providers" => array ( 
			// openid providers
			"OpenID" => array (
				"enabled" => false
			),

			"Yahoo" => array ( 
				"enabled" => false,
				"keys"    => array ( "id" => "", "secret" => "" ),
			),

			"AOL"  => array ( 
				"enabled" => false 
			),

			"Google" => array ( 
				"enabled" => true,
				"keys"    => array ( "id" => "741660725673.apps.googleusercontent.com", "secret" => "2K2LOnet8T-HVQoTf69RAxG7" ), 
			),

			"Facebook" => array ( 
				"enabled" => true,
				"keys"    => array ( "id" => "297407780397608", "secret" => "b1aa59a81496aeb14a0bcc6dcfba1369" ),
				"trustForwarded" => false
			),

			"Twitter" => array ( 
				"enabled" => true,
				"keys"    => array ( "key" => "VWLcFcf8NlMxt9i3uYvSFKEfG", "secret" => "e12YvI6UqVzlQZiJ3jK9yb0FoQPD39eNETn8vpE94qfcoXQWJg" )
			),

			// windows live
			"Live" => array ( 
				"enabled" => false,
				"keys"    => array ( "id" => "", "secret" => "" ) 
			),

			"LinkedIn" => array ( 
				"enabled" => false,
				"keys"    => array ( "key" => "", "secret" => "" ) 
			),

			"Foursquare" => array (
				"enabled" => false,
				"keys"    => array ( "id" => "", "secret" => "" ) 
			),
		),

		
		// If you want to enable logging, set 'debug_mode' to true.
		// You can also set it to
		// - "error" To log only error messages. Useful in production
		// - "info" To log info and error messages (ignore debug messages) 
		"debug_mode" => true,

		// Path to file writable by the web server. Required if 'debug_mode' is not false
		"debug_file" => "hybridauth.log",
	);
