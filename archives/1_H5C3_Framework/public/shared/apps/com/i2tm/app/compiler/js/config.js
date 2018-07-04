CONFIG = {
	app: {
		name:'H5C3 Page Builder',
		version:'0.1', 
		publisher:'I2TM Software',
		copyright:'2012-2013'
	},

	credits: [
			{name:'Andrew Donelson',entity:'i2tm Labs',url:'http://i2tmlabs.com/',desc:'Owner/Sr. Developer'},
			{name:'playcraft',entity:'Playcraft Labs',url:'http://www.playcraftlabs.com',desc:'http://www.playcraftlabs.com'},
			{name:'padolsey',entity:'James Padolsey',url:'https://github.com/padolsey/string/blob/master/string.js',desc:'Used in I2TM Engine extended String API'},
			{name:'marasteanu',entity:'Alexandru Marasteanu',url:'http://www.diveintojavascript.com/projects/javascript-sprintf',desc:'Used in I2TM Engine to add sprintf capability'}
	],

	langs: [
		'english'
	],
	
	/** Set canvas dimensions. Auto will scale to match waDIV. (default is Auto) */
	screen:{
		/** 
		 * This is the resolution in which you designed the app for, ie FullkHD (1920x1080). You may be making a wigdet or something
		 * and your target images were designed with 140x280 in mind (say a smart banner). The engine will use hardware to scale from
		 * the target to the actual canvas size.
		 */
		target: {
			width:1920,
			height:1080
		},
		
		/**
		 * The minimum and maximum sizes for your app. If the device is outside these values it will be disabled with and overlay and a message.
		 */
		min: {
			width: 680,
			height:440
		},
		
		max: {
			width: 1920,
			height:1080
		}
	},
	
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
