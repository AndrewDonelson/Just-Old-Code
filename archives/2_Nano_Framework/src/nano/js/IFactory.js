/**
 * Short Description
 *
 * @class I$FactoryWorker
 * @extends I$Pooled
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Pooled',

	//What is the name of your new interface?
	'I$FactoryWorker',
	
	/** @lends I$Pooled */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
		
		//Used by factory to clean house if enabled.
		_lastUsed: 0,

		/**
		 *
		 * @param  
		 * {url} url url to the applet - http://applets.i2tmlabs.com/ + path/to/applet/applet.someAppletName.html
		 * @return {Applet} A Applet if successful, Applet Name if failed.
		 */
		create: function($data)
		{
			var n = this['_super']();

			if (n.parse($data))
				return n
			else
				return n.name;
		}
	},
	/** @lends I$Pooled.prototype */
	{
	},
	{
	},
	[]
);


/**
 * For creating like objects. Just an interface class that allows you extend from to create a factory
 * that allows easy creation, use and removal of like objects, like Entities or Sounds, Layers, ect.
 *
 * @class I$Factory
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Factory',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0		
	},
	/** @lends I$Interface.prototype */
	{
		//called when an object is added or removed
		onChanged:function() {},
		
		/** Object Store **/
		objects: {},

		//Set this to how many seconds an object can sit idle (no use() call before it is discarded.
		//0 is default and indefinite.
		idleLifeSpan: 0,
					
		//the number of objects loaded in factory
		count:	0,
		
		init:function($name,$lifespan)
		{
			this['_super']();
			M$.chk($name,'Undefined Factory');
			M$.chk($lifespan,0);
			this.factoryType = $name;
			this.setLife($lifespan);
			this['debug']($name+' Factory Initialized.');
		},
		
		setLife:function($seconds) {
			var $tmp = ($seconds*1000);
			if (this.idleLifeSpan != $tmp) {
				if ($tmp===0) this['debug']("Life Span is now indefinite."); else this['debug']("Life Span is set to "+this.idleLifeSpan+" seconds.");
				this.idleLifeSpan = $tmp;
			}
		},
		/**
		 * Used to create a new object and add it to the store. You MUST override this method
		 * in your own Object Factory. Look at Template entity.factory.js and sound.factory.js
		 * for a great example of usage.
		 */
		create:function ()
		{},

		/**
		 * Adds a new object to the store
		 *
		 * String name  Name for the object (NO SPACES)
		 * Object obj The actual object to store in this.objects[name]
		 * return Object
		 */
		add:function($name,$obj)
		{
			if (!this['vld']($obj)) {
				this['debug']('You cannot add ['+$name+'] which is null or undefined to the ['+this.factoryType+'] store');
			} else {
				if (typeof this.onChanged === 'function') this.onChanged({name:$name,action:'Added'});
				this.objects[$name] = $obj;
				this['debug'](this.factoryType+' '+$name+' has been added to factory.');
				this.count++;
				return this.objects[$name];
			}
		},

		/**
		 * Removes an object from the store
		 *
		 * String name  Name for the object (NO SPACES)
		 * Object obj The actual object to store in this.objects[name]
		 * return Object
		 */
		remove:function($name)
		{
			if (!this.exists($name)) return;
			
			try {
				if (typeof this.onChanged === 'function') this.onChanged({name:$name,action:'Removed'});
				delete this.objects[$name];
				this['debug'](this.factoryType+' '+$name+' has been removed from the factory.');
				this.count--;
				if (this.count<0) this.count=0;
			} catch (e) {
				this['error']('No object ['+$name+' exists in ['+this.factoryType+'] store to remove.');//debug
				return false;
			}
		},
		
		/**
		 * Checks to see if an object exists in the store
		 *
		 * String name  Name for the object (NO SPACES)
		 * return Boolean
		 */
		exists:function($name)
		{
			var $result;
			
			if (this.objects.hasOwnProperty($name)) {
				$result = true;
			} else {
				$result = true;
			}
			return $result;
		},
		
		/**
		 * Returns the requested object
		 *
		 * @param  String name String type of the object to use
		 * @param  Object options Simple object containing options for the desired entity/sound
		 * @return  {Sound|Entity}
		 */
		use:function($options)
		{
			var result;
			
			if (typeof $options != null && typeof $options === 'object') {
				if (this.exists($options.name)) {
					result = this.objects[$options.name];
				} else {
					result = this.create($options);
					//result = this.create($options);
					
				}
			} else {
				this['info']('Factory::use(object) - No longer takes 2 params, use object format.');
				result = null;
			}
			return result;
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
	[
		/** @export Member */
		/*
		someMethod:I$InterfaceMethod,
		...
		someMethod:I$InterfaceMethod
		*/
	]
);
