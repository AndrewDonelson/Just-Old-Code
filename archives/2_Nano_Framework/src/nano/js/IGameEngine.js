/**
 * Short Description
 *
 * @class I$GameEngine
 * @extends I$Alias
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Alias',

	//What is the name of your new interface?
	'I$GameEngine',
	
	/** @lends I$Alias */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1		
		/** 
		 * Set to true by system after members are exposed. This is read only.
		 * 
		 * @property {boolean} exposed
		 * @expose 
		 */
		exposed:false,
		/**
		 * Return a string name for this interface class
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function (){return 'I$GameEngine Class';}
	},
	/** @lends I$Alias.prototype */
	{
		/**
		 * Interface Initialization method
		 * @constructor init
		 * @expose
		 */
		init:function (targetContainer)
		{
			this['_super']();
			//if (nldr['config']['modules'].gldl) {
				//webgame content
				var $common = M$['gei']("common");
				var $warn = M$.aet($common, "div", "page_warning", "<div id=\"msgBox\"><h1 class=\"glyphicon glyphicon-warning-sign\"></h3><h1>PAUSED</h3><h5>Please turn or place your device into <i id=\"orientation\">landscape</i> mode.</h5></div>");
				$warn.className='deadCenter';
				var $canv = M$.aet($common, "canvas", "page_game", "<h1>Device Not Supported</h1><h2>Your browser does not support the Canvas Element.</h2>");
			//}		
			
		},
		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * @method setup
		 * @expose
		 */
		setup:function(){
			this['_super']();	
		},
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$GameEngine#onReady
		 * @expose
		 */
		onReady:function(){
		},
		/**
		 * Return a string name for this interface prototype
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function ()
		{
			return (this['Class']===undefined)?
				'I$GameEngine':
				this['Class']['fullName'] + ' [id: ' + (this['objectId']||0) + ']';
				
		}
	},
	//=-=|Optional|=-=//
	{
		/** @augments I$GameEngine */
		/*
		someInterfaceName:I$SomeInterface,
		...
		someInterfaceName:I$SomeInterface
		*/
	},
	//=-=|Optional|=-=//
	[
		/** @export Member */
		/*
		someMethod:I$InterfaceMethod,
		...
		someMethod:I$InterfaceMethod
		*/
	]
);

