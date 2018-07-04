/** 
 *  Main Maestro object
 *
 * @project Maestro
 * @module Maestro
 * @file maestro.maestro.js (#2) in combine sequence.
 * @author Andrew Donelson <andrew@i2tmlabs.com> 
 * @copyright Copyright 2012-2014 by i2tm Labs - All rights reserved.
 * @license Private Commercial Software
 * @external M$
 * @external W$
 * @external D$
 * @external H$
 * @external B$
 * @external C$
 * @external S$
 * FINALIZED
 */
 
/**
  <h1>Maestro <small>Object</small></h1>
  <img src="http://code.nanofw.com/i2tm/img/maestro_logo.png" style="display:block;max-width:100%;height:auto;">
  <p>Maestro is the main object or interface for the Nano Framework.</p>
  <p>It is time to take control of your web applications. There are plenty of
  libraries and frameworks out there but none are designed to work together.
  That is where Nano Framework comes in. We decided on Bootstrap for document
  structure and flow and jQuery for JavaScript coding. We have also added
  Modernizr for maximum compatibility and Font-Awesome for even more fonts.
  </p>
  <div>
  <h3>Features</h3>
  <ul>
  <li></li>
  <li>Structured and Modular design for more versatile reuse of assets.</li>
  <li>Prototypal Inheritance with deep Object Cloning</li>
  <li>Uses Extendible Interfaces with Smart Cache</li>
  <li>Fast execution of large amounts of JavaScript Code.</li>
  <li>Integrated Versions Object (Even Bootstrap)</li>
  <li>DOM Alias's for most used tasks. Make coding faster and code footprint smaller.</li>
  <li>Auto Loading and Invocation</li>
  <li>Targeted Script and Stylesheet loading with precise position</li>
  <li>XCORS Ajax with integrated local file support</li>
  <li>Base64 Encoding & Decoding</li>
  <li>Lempel–Ziv–Welch universal lossless compression</li>
  <li>Designed to manage and enhance Bootstrap</li>
  <li>Enhanced Bootstrap:
  <ul>
  <li>Navbar Drop-Up Menu</li>
  <li>Fluid Navbar</li>
  <li>defaultBox with many styles and colors</li>
  <li>Perfect paragraph, All paragraphs are instantly Perfect!</li>
  <li>Cross-Browser Opacity helper classes, 5 steps, 20, 40, 60, 80 and 100%</li> 
  </ul>
  </li> 
  <li>Latest versions of Modernizr, jQuery and Font-Awesome</li> 
  <li>Packager for CloudApps, Applets and Modules.</li>
  </ul>
  </div>
  <div>
  <h3 style="color:red !important">
  Please note that while there is no charge to develop with the Nano Framework the
  software is private commercial code and there are some basic restrictions. It IS
  designed and built for developers. It's purpose is to allow developers to create
  versatile web applications that work on any platform with ease as well as having
  little to no development costs or licensing fees. You can only load the library
  from i2tm Labs CDN - Your ARE NOT authorised to load locally from your web server.
  To learn more please visit the website for complete licensing and detailed information.
  </h3>
  </div>
 
  <p>There are two ways in which you can load and use the the Nano Framework:</p>
 
  <h3>Normal Web Document Mode</h3>
 
  <p>This gives you Modernizr, Bootstrap, jQuery, Font-awesome and the Nano Framework
   but the the Nano framework will just load the libraries efficiently in the order
  and location they belong. It will not parse the CloudApp Configuration JSON so the
  framework will terminate execution, but you have access if you want to use this and
  that. So at the very least you can use ONE line of code to load all popular libraries
  and just start coding.</p>
 
  <h3>Nano CloudApp Mode</h3>
 
  <p>
  This mode will handle just about everything for you. Loading the libraries, creating and
  embedding the correct meta tags including Author, Copyright with auto date update for year,
  etc. It also provides local storage for application, publish, global and user settings and
  information. Applets for Rapid Application development - Applets have their styling and
  JavaScript embedded with them and they are encoded and compressed into a package. Applets
  can be included with a single line of code. You also get access to the Game Library (2DGL)
  Layouts, Skins Smart Color, Dynamic Configurations and more.
  </p>

 ### Fast Alias's
 - W$	Window
 - D$	Document
 - H$	Head
 - B$	Body
 - C$	Stylesheets
 - S$	Scripts
  
  @todo 
  @class Maestro
  @extends I$Console
  @expose 
  @final
 **/
 extend(
	//What name of the interface are you extending?
	'I$Console',

	//What is the name of your new interface?
	'I$Maestro',
	
	/** @lends I$Console */
	{		
		toString:function(){return 'I$Maestro Class'},
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,
		
		readyCalled:false,
		
		/**
		 * @expose
		 */
		loadDone:false,
		
		/**
		 * @property {Object} Module
		 * @expose 
		 */
		Module : {
			/**
              * @property {String} name			
			  * @expose 
			  */
			name:    	"Maestro",
			/**
              * @property {String} version			
			  * @expose 
			  */
			version: 	"1.5.0",
			/**
			  * comma delimited list of interfaces
              * @property {String} imports			
			  * @expose 
			  */
			imports: 	"I$Interface,I$Alias,I$Encoders,I$Db,I$System,I$Console",
			/**
              * @property {String} exports			
			  * @expose 
			  */
			exports:	"$M",
			/**
              * @property {String} namespace
			  * @expose 
			  */
			namespace: "Maestro"
		}		
	},
	/** @lends I$Console.prototype */
	{
		toString:function(){return 'I$Maestro Object';},
		/**
		 * Interface Initialization method
		 * @constructor init
		 * @expose
		 */
		init:function ()
		{
			this['_super']();
		},
		/**
		 * daaa!
		 * @method getMaestroName
		 * @expose
		 * @returns {String}
		 */
		getMaestroName:function(){return this['Class']['Module']['name']},
		/**
		 * daaa!
		 * @method getMaestroVersion
		 * @expose
		 * @returns {String}
		 */
		getMaestroVersion:function(){return this['Class']['Module']['version']},
		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * @method setup
		 * @expose
		 */
		setup:function(){
			console.log('Setup Start');
			this['_super']()
			if (!this['isCloudApp']&&W$['$']) {
				if (W$['jQuery']) {
					alert('Just query is loaded automatically by Maestro.');
				} else {
					alert('3rd party libraries must be loaded from your CloudApp Config.');
				}
			}
			console.log('Setup Done');
		},
		/**
		 * Used by third party applications to make sure Maestro is Loaded, initialized and ready.
		 *
		 * @method isActive
		 * @returns {boolean}
		 * @expose
		 */
		isActive:function isActive(){return this['Class']['readyCalled']},
		me:function(){
			return Module.name+' v'+Module.version;
		},
		/**
		 * Returns a string version of a vendor library.
		 *
		 * @property {Object} versions
		 * @expose
		 */
		versions : function($lib){
			switch ($lib.toLowerCase()) {
				/**
				 * <img src="http://code.nanofw.com/i2tm/img/nano_banner_xs.jpg">
				 * <h4>Nano Framework Version</h4>
				 *
				 * @property {String} nf
				 */
				case 'nf' : return ''; break;
				/**
				 * <img src="http://code.nanofw.com/i2tm/img/bootstrap_sm.png">
				 * <h4>Bootstrap Version</h4>
				 *
				 * @property {String} bs
				 */
				case 'bs' : return '3.1.1'; break;
				/**
				 * <img src="http://code.nanofw.com/i2tm/img/jquery_sm.png">
				 * <h4>jQuery Version</h4>
				 *
				 * @property {String} jq
				 */
				case 'jq' : return '2.1.1pre'; break;
				/**
				 * <img src="http://code.nanofw.com/i2tm/img/modernizr_sm.png">
				 * <h4>Modernizr Version</h4>
				 *
				 * @property {String} mz
				 */
				case 'mz' : return '3.0.0pre'; break;
				/**
				 * <img src="http://code.nanofw.com/i2tm/img/font-awesome_sm.png">
				 * <h4>Font-Awesome Version</h4>
				 *
				 * @property {String} fa
				 */
				case 'fa' : return '4.0.3'; break;
			}
		},
		
		/** 
		 * @method main
		 * @expose 
		 */
		run:function(){
			console.log('Run Invoked');
			if(M$['isCloudApp']()) {
				console.log('Creating Cloud Application');
				this['app'] = create('I$CloudApplication');
			}
		},
			
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$Interface#onReady
		 * @expose
		 */
		onReady:function() {
			console.log('OnReady invoked');
			this['_super']();
						
			if (this['isCloudApp']()) 															/*debug*/
				console.log('Maestro Initialized, Handing off to Nano Framework.');			/*debug*/
			else 																				/*debug*/
				console.log('Maestro Enhanced Web Document Ready.');							/*debug*/		
			
			if ((typeof(window['onReady']) === "function") && !this['Class']['readyCalled']) {	
				console.log('Calling '+this['appMode']+' onMaestroReady event.');
				this['Class']['readyCalled']=true;
				if(W$['onMaestroReady']) W$['onMaestroReady']();
			}
		}
	},
	{
		/** @augments I$NAME */
		/*
		someInterfaceName:I$SomeInterface,
		...
		someInterfaceName:I$SomeInterface
		*/
	},
	['create','get','queryNamespace','add','extend','main','isInterface','ref']	
);
//===| End Maestro Definition |===//
