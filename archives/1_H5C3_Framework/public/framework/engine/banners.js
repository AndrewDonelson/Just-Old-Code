/*global h5c3: true, document: true, navigator: true, window: true */
/**
 *  H5C3 Framework
 *  Engine
 * @class  h5c3.components.Activator
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Activation'>h5c3.systems.Activation</a>]
 * 
 * Causes an entity to be inactive (no rendering or physics etc) until another entity moves within range of it.
 * Great for autosleeping all your monsters until the player gets close.
 */
h5c3.Banners = h5c3.Base.extend('h5c3.Banners',
{},
{	
	div:null,
	
	init:function(div)
	{
		this._super();
		this.div = div;
	},
	
	onReady:function()
	{
		$_DBG_("onReady received.",this.Class);
		//if (h5c3.devMode===true) {
		//	/** We are in debug mode, so dont display banners, show Debugger Toolbar instead **/
		//	this.div.innerHTML = h5c3.device.page.devWindow.bannerToolbar();
		//} else {
		//	/** We are in production mode, display banners **/			
		//}
	}
});