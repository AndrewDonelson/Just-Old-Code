/**********************************************************
* @file			filename.ext		
* @version		0.0.0
* @package	 	NAMESPACE
* @subpackage	im under NAMESPACE
* @author		Andrew Donelson		[andrew@i2tmlabs.com]
* @copyright	2013 by i2tm Labs - All rights reserved.
***********************************************************/

/**
 * @class 
 * @extends h5c3.Base
 * @description
 * 
 * @codebegin
 * @codeend
 * 
 */
h5c3.CLASSNAME = h5c3.Base.extend('h5c3.CLASSNAME', { 
	_CLASSNAME: 'CLASSNAME',
	_CLASSVERSION:'0.0.0',
	
	
    /**
	 * @constructor
	 * @private
	 * @description
     */
	create:function() {}
},{
    /**
     * @property 	{object}
     * @default 	null
	 * @access 		[public|protected|private]
     */
    someProperty: null,

    /**
	 * @public
	 * @method
	 * @description
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function () {
        this._super();
    },
	
    /**
	 * @public
	 * @event
	 * @description
     * </p>
	 * Description of this method
	 * </p>
     */
	someEvent:function() {}
});