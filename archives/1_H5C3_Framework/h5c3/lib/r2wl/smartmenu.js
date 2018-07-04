/**
 *
 * @namespace h5c3
 * @class h5c3.SmartMenu
 * @augments h5c3.Base
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * <p>
 * 
 * <pre><code>
 * 
 * </code></pre>
 * 
 * </p>
 */
h5c3.SmartMenu = h5c3.Base.extend('h5c3.SmartMenu', { 
	_CLASSNAME: 'SmartMenu',
	_CLASSVERSION:'0.0.1'
},{
    /**
     * @property {object} resources
     * @default null
	 * @memberof h5c3.SmartMenu
     */
    $_menu: null,

    /**
	 * @public
	 * @method
	 * @memberof h5c3.SmartMenu
	 * @desc
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function () {
        this._super();
		if (typeof h5c3.config.smartmenu === 'object') {
			this.$_menu = h5c3.config.smartmenu;
		}
    }
});