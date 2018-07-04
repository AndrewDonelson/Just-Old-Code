/**
 * @class  h5c3.Resources
 *
 * @descsription 
 * Loading of resources is handled internally. DO NOT CALL THESE FUNCTIONS DIRECTLY.
 */
h5c3.Resources = h5c3.Base.extend('h5c3.Resources', {
	_CLASSNAME: 'Resources',
	_CLASSVERSION:'0.3.3'
},{

    /**
     * @property Object 	resources	
	 * @descsription Holds all resources for the application
     */
    resources: null,

    /**
	 * @constructor Initialization method. 
	 * @descsription Adds Publisher and Framework resources to loading Que. Then processes the Config to get all resources for loading.
     * 
	 * @return none
     */
    init: function () {
        this._super();
        this.loadResources();		
    },

    /**
	 * @method loadResources()
	 * @descsription This method parses the embeded XML resource data into an array
	 * @return none
     */
    loadResources: function () {
       _DBG_("Queing internal resources.",this.Class);
        /** Required Engine images - Loaded automatically **/
        //h5c3.device.loader.add(new h5c3.Image('publisher', 'http://h5c3.i2tmlabs.com/img/logo-i2tmlabs-hd.png'));
        //h5c3.device.loader.add(new h5c3.Image('h5c3', 'http://h5c3.i2tmlabs.com/img/logo-h5c3-hd.png'));
        //h5c3.device.loader.add(new h5c3.Image('btnDebug', 'http://h5c3.i2tmlabs.com/img/buttons_debug.png'));
        //h5c3.device.loader.add(new h5c3.Image('touchpad', 'http://h5c3.i2tmlabs.com/img/touchpad_buttons.png'));
        /** Required Engine sound - Loaded automatically **/
        //h5c3.device.loader.add(new h5c3.Sound('i2tm', 'http://h5c3.i2tmlabs.com/snd/i2tm', ['ogg'], 1));
        this.loadGraphics();
        this.loadAudio();
    },

    /**
	 * @method loadGraphics() 
	 * @descsription Parse array and que all graphics for loading
	 * @return none
     */
    loadGraphics: function () {
		if (VLD(h5c3.config.resources)) {
			_DBG_("Queing images resources.",this.Class);
			var i, data = h5c3.config.resources.images;

			for (i = 0; i < data.length; ++i) {
				h5c3.loader.add(new h5c3.Image(data[i].name, data[i].file));
			}
		} 
		else _DBG_("No graphic resources to que. (Did you forget to add them to the config?)",this.Class);
    },

    /**
	 * @method loadAudio()
	 * @descsription Parse array and que all audio for loading
	 * @return none
     */
    loadAudio: function () {
		if (VLD(h5c3.config.resources)) {
			_DBG_("Queing audio resources.",this.Class);
			var 
				i, f1, f2, data = h5c3.config.resources.sounds;

			for (i = 0; i < data.length; i++) {
				if (data[i].ogg === "true") {
					f1 = "ogg";
				} else {
					f1 = "";
				}
				if (data[i].mp3 === "true") {
					f2 = "mp3";
				} else {
					f2 = "";
				}
				h5c3.loader.add(new h5c3.Sound(data[i].name, data[i].file, [f1, f2], data[i].channels));
			}
		} 
		else _DBG_("No audio resources to que. (Did you forget to add them to the config?)",this.Class);
    }
});