h5c3.FactoryWorker = h5c3.Pooled.extend('h5c3.Applet', {
	_CLASSNAME: 'FactoryWorker',
	_CLASSVERSION:'0.1.3',

	//Used by factory to clean house if enabled.
	_lastUsed: 0,

	/**
	 *
	 * @param  
	 * {h5c3.url} url url to the applet - http://applets.i2tmlabs.com/ + path/to/applet/applet.someAppletName.html
	 * @return {h5c3.Applet} A h5c3.Applet if successful, Applet Name if failed.
	 */
	create: function($data)
	{
		var n = this._super();

		if (n.parse($data))
			return n
		else
			return n.name;
	}
},{

});

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Engine
 * @class  h5c3.Factory
 *  h5c3.Base
 * 
 * For creating like objects. Just an interface class that allows you extend from to create a factory
 * that allows easy creation, use and removal of like objects, like Entities or Sounds, Layers, ect.
 */
h5c3.Factory = h5c3.Base.extend('h5c3.Factory',  {
	_CLASSNAME: 'Factory',
	_CLASSVERSION:'1.3.6'
	
}, {
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
		this._super();
		CHK($name,'Undefined Factory');
		CHK($lifespan,0);
		this.factoryType = $name;
		this.setLife($lifespan);
		_DBG_($name+' Factory Initialized.',this.Class);
	},
	
	setLife:function($seconds) {
		var $tmp = ($seconds*1000);
		if (this.idleLifeSpan != $tmp) {
			if ($tmp===0) _DBG_("Life Span is now indefinite.",this.Class); else _DBG_("Life Span is set to "+this.idleLifeSpan+" seconds.",this.Class);
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
		if (!VLD($obj)) {
			_DBG_('You cannot add ['+$name+'] which is null or undefined to the ['+this.factoryType+'] store',this.Class);
		} else {
			if (typeof this.onChanged === 'function') this.onChanged({name:$name,action:'Added'});
			this.objects[$name] = $obj;
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
			this.count--;
			if (this.count<0) this.count=0;
		} catch (err) {
			AST(null,'No object ['+$name+' exists in ['+this.factoryType+'] store to remove.');
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
			$result = false;
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
			}
		} else {
			this.info('Factory::use(object) - No longer takes 2 params, use object format.');
			result = null;
		}
		return result;
	}
});