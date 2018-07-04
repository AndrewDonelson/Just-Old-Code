
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Plugin
 * @class  h5c3.Plugin
 *  h5c3.Plugin
 * 
 * Base class for all plugins 
 */
h5c3.Plugin = h5c3.Base.extend('h5c3.Plugin', {
	_CLASSNAME: 'Plugin',
	_CLASSVERSION:'0.5.9'
},{
	/**
	 * @property String NAME Friendly name for plugin, may have spaces
	 */
	NAME:	'Plugin',
	/**
	 * @property String VERSION Holds the current version of the plugin
	 */
	VERSION:	'0.1.0',
	/**
	 * @property String DESCRIPTION Short description of what this plugin does.
	 */
	DESCRIPTION:	'Base class for all plugins.', 
	/** Folder where files are located */
	srcDir: 'js/',
	/** Plugins required by this plugin */
	requires:[],
	/** List of files that makeup this plugin */
	uses: [],
	
	/**
	* Initializtion method for plugin
	 * 
	 * myPlugin = new SomePlugin({arg1:false,arg2:'String',arg3:1243});
	 * (end)
	*
	* @param  Object args arguments for this plugin
	*/	
	init:function(args) 
	{
		this._super();
		if (typeof args === "object") {
			this.property = args;
		}
		_DBG_("Initializing.",this.Class);
		this._load();
	},
	
	_load:function() 
	{
		_DBG_('Loading Plugin '+this.NAME+' v'+this.VERSION,this.Class);
		if (VLD(this.uses) && this.uses.length>0) {
			var $i=0;
			for ($i=0; $i < $this.uses.length; $i++) {
				this.add($scripts[$i]);
			}
		} 
		else {_DBG_('No external files used by plugin.',this.Class);}
		_DBG_("Complete.",this.Class);
	},
	
	main:function(args)
	{
		args = CHK(args,{});	
	},
	
	done:function()
	{}
});