/**
 * CloudApp Configuration File
 * 
 */
/*
if (typeof(h5c3)==='undefined') {
	var $script = document.createElement("script")
	$script.type = "text/javascript";
	$script.src = 'http://h5c3.i2tmlabs.com/js/h5c3.';
	document.getElementsByTagName("head")[0].appendChild($script);
}
*/
CONFIG = {

	/** 
	 * The mode is the only Required value. The rest are only needed if your not just loading for Rich RWD in a HTML5 page.
	 *
	 * Mode 0 - Load Engine, Framework in support of embeded WebApp (part of a HTML page)
	 * Mode 1 - Load Complete Engine & Framework, Bootstrap full CloudApp
	 */
	rwdMode: true,
	
	devMode: true,

	path: 'd:/Android_Dev/GitHUB/com.I2TMLabs.h5c3.development/h5c3/dist/',
	
	options: {
		/** Allow Fullscreen - Disable to not allow fullscreen mode. (default is true) */
		fullscreen:true,

		/** Handle Canvas resizing - If false you must handle the canvas resizing. (default is true) */
		resize: true,

		/** Suspened on focus - Pause application when no focus (default is true) */
		suspend: true,

		/** Network monitoring - Event trigged when device changes states (default is true) */
		network: true,

		/** Set/Lock Orientation - Disable to not allow fullscreen mode. (default is true) */
		orientation: 'auto'
	}
	
}; /* End AppCFG */

if("undefined"===typeof h5c3){
	var s=document.createElement("script");s.type="text/javascript";s.src=CONFIG.path+"h5c3.debug.min.js";document.getElementsByTagName("head")[0].appendChild(s)
};
