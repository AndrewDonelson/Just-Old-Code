/**
+---------------------------------------------------+
| File:		CloudApp Configuration File				|
| Version:	0.5.2									|
| 													|
| This is this the configuration file. It must be   |
| included as a SCRIPT in the head of your document |
| right before H5C3 SCRIPT include which is present	|
| is the the last script included. See example.		| 
+---------------------------------------------------+

*_REQUIRED_*

>	<script src="./path/to/your/app.config.js" title="h5c3"></script>

*/
CONFIG = {

	/* 
	 The mode is the only Required value. The rest are only needed if your not just loading for Rich RWD in a HTML5 page.
	 
	 Mode 0 - Load Engine, Framework in support of embeded WebApp (part of a HTML page)
	 Mode 1 - Load Complete Engine & Framework, Bootstrap full CloudApp
	 */
	rwdMode: true,
	
	devMode: true,
	
	/* 
	 If app is not defined the engine will be loaded and can be used for a rich responsive webpage only, including plugins. There however will
	 be now canvas support for 2D or 3D rendering.
	 */
	app: {
		name:'H5C3 Page Tour',
		version:'0.1', 
		publisher:'I2TM Software',
		copyright:'2012-2013'
	},

	/*
	 Used to provide credits for your application. Allows easy access.
	 */
	credits: [
			{name:'Andrew Donelson',entity:'i2tm Labs',url:'http://i2tmlabs.com/',desc:'Owner/Sr. Developer'},
			{name:'playcraft',entity:'Playcraft Labs',url:'http://www.playcraftlabs.com',desc:'http://www.playcraftlabs.com'},
			{name:'Font Awesome',entity:'Dave Gandy',url:'http://fortawesome.github.io/Font-Awesome/',desc:'Font Awesome gives you scalable vector icons that can instantly be customized — size, color, drop shadow, and anything that can be done with the power of CSS.'},
			{name:'padolsey',entity:'James Padolsey',url:'https://github.com/padolsey/string/blob/master/string.js',desc:'Used in I2TM Engine extended String API'},
			{name:'marasteanu',entity:'Alexandru Marasteanu',url:'http://www.diveintojavascript.com/projects/javascript-sprintf',desc:'Used in I2TM Engine to add sprintf capability'}
	],

	/*
	 All language files supported at the moment.
	 */
	langs: [
		'english'
	],
	
	/*
	 Set canvas dimensions. Auto will scale to match waDIV. (default is Auto) 
	 */
	screen:{
		/* 
		 This is the resolution in which you designed the app for, ie FullkHD (1920x1080). You may be making a wigdet or something
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
		 * String		path	Allow Fullscreen - Disable to not allow fullscreen mode. (default is true) 
		 */
		path: 'd:/Android_Dev/GitHUB/com.I2TMLabs.h5c3.development/h5c3/',
		
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
	},
	
	/** List all internal javascript files your application will require. (main.js is required) */
	files:[
		'game.main.js',
		'scene.game.js',
		'scene.mainmenu.js',
		'factory.entity.js',
		'factory.sound.js',
		'builder.js'
	],
	
	/** List all external plugins your application will require. */
	plugins:[
		'input',
		'render',
		'layout',
		'expiration',
		'effects'
	],
	
	/** List all resources (images, sounds, ect your application requires. */
	resources: {
		images: [
			{name:'title',file:'img/title.png'},
			{name:'puppy',file:'img/puppy.png'},
			{name:'splash',file:'img/splash.png'}
		],
		sounds: []
	}
}; /* End AppCFG */

if("undefined"===typeof h5c3){
	var s=document.createElement("script");s.type="text/javascript";
	s.src=CONFIG.path+"h5c3."+v=(CONFIG.devMode)?"debug":"release"+".min.js";
	document.getElementsByTagName("head")[0].appendChild(s)
};
