/**
+---------------------------------------------------+
| File:		CloudApp Configuration File				|
| Version:	0.5.2									|
| 													|
| This is this the configuration file. If you are   |
| not using included as the first script					 |
| right before H5C3 SCRIPT include which is present	|
| is the the last script included. See example.		| 
+---------------------------------------------------+

*_REQUIRED_*

>	<script src="./path/to/your/app.config.js" title="h5c3"></script>

*/
config = {

	/* 
	 The mode is to determine the amount of initialization to preform.
	 
	 Mode 0 - Load Complete Engine & Framework, Bootstrap full CloudApp. 
			  This will embed/prepares canvas, fullscreen support, intgrated debugger, ect.
	 Mode 1 - Load Engine, R2Wl in support of embeded CloudApplets (part of a HTML page)
			  If you want to include the library like say jQuery or Moderinzr (both integrated btw) for having access and API only use this mode.
		      	 
	 */
	rwdOnly: true,		//Required

	
	/* 
	 If app is not defined the engine will be loaded and can be used for a rich responsive webpage only, including plugins. There however will
	 be now canvas support for 2D or 3D rendering.
	 */
	app: {			//Required
		name:		'Absolute Layout Test',
		version:	'0.1.1', 
		publisher:	'i2tm Labs',
		copyright:	'2012-2013',
		uuid: 		'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
	},

	/*
	 Used to provide credits for your application. Allows easy access.
	 */
	credits: [		//Optional
			{name:'Andrew Donelson',entity:'i2tm Labs',url:'http://i2tmlabs.com/',desc:'Owner/Sr. Developer'},
			{name:'Font Awesome',entity:'Dave Gandy',url:'http://fortawesome.github.io/Font-Awesome/',desc:'Font Awesome gives you scalable vector icons that can instantly be customized — size, color, drop shadow, and anything that can be done with the power of CSS.'}
	],

	/*
	 Set canvas dimensions. Auto will scale to match waDIV. (default is Auto) 
	 */
	screen:{	//Required for Mode 0; Not used in Mode 1
		/* 
		 This is the resolution in which you designed the app for, ie FullHD (1920x1080). You may be making a wigdet or something
		 and your target images were designed with 140x280 in mind (say a smart banner). The engine will use hardware to scale from
		 the target to the actual canvas size.
		 */
		target: {
			width:1920,
			height:1080
		},
		
		/*
		 The minimum sizes for your app. If the device is outside these values it will be disabled with and overlay and a message.
		 */
		min: {
			width: 680,
			height:440
		},
		
		/*
		 The maximum sizes for your app. If the device is outside these values it will be disabled with and overlay and a message.
		 */
		max: {
			width: 1920,
			height:1080
		}
	},
	
	options: {	
		/* 
		 * Property: 
		 * String		path to local assets (assets/ [img/css/js/applets]  If blank uses public
		 *	Mode: Both
		 */
		path: 'http://devzone.i2tmlabs.com/assets/',
		
		/** 
		 * The layout/structure to use for this application. (default is absoluteAll) 
		 *	Mode: 1
		 */
		layout:'absolute',	//Required

		/** 
		 * Allow Fullscreen - Disable to not allow fullscreen mode. (default is true) 
		 *	Mode: 0
		 */
		fullscreen:true,

		/** 
		 * Handle Canvas resizing - If false you must handle the canvas resizing. (default is true) 
		 *	Mode: 0
		 */
		resize: true,

		/** 
		 * Suspened on focus - Pause application when no focus (default is true) 
		 *	Mode: 0
		 */
		suspend: true,

		/** 
		 * Network monitoring - Event trigged when device changes states (default is true) 
		 *	Mode: 0
		 */
		network: true,

		/** 
		 * Set/Lock Orientation - Disable to not allow fullscreen mode. (default is true) 
		 *	Mode: 0
		 */
		orientation: 'auto'
	},
	/** 
	 * List all applets you want pre-cached in background for this application.
	 *	Mode: Both
	 */
	applets: [],
	/** 
	 * List all javascript files your application will require.
	 *	Mode: Both
	 */
	files:[],//'require.js'
	
	/** 
	 *	List all plugins your application will require. 
	 *	Mode: Both
	 */
	plugins:[],

	/** 
	 *	List all resources (images & sounds your application requires. 
	 *	Mode: 0
	 */
	resources: {
		images: [],
		sounds: []
	}
}; /* End AppCFG */