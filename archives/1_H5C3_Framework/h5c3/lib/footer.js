/**
+-----------------------------------------------------------+
| File:		footer.js										|
| Version:	0.0.1											|
| Author: Andrew Donelson	andrew@i2tmlabs.com				|
| H5C3 Framework - (c) 2013 <i2tm Labs http://i2tmlabs.com>	|
+-----------------------------------------------------------+
*/
if (!h5c3.lang) h5c3.lang={
	$developer: 'Developer',
	$production: 'Production'
}


//var ctrl = new h5c3.Controller();

/* Make sure core is present and ready then startup */
if (h5c3.init()) {
	h5c3.run();
}