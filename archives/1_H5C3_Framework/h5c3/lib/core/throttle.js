/**
 * THROTTLESTYLE is used by the Throttle Class to determine how it will best manage timing and events.
 *  
 *  <strong>AEPS</strong> <i>stands for Average Events Per Second</i>
 *  
 *  <ul>
 *  <li>Will re-evaluate performance every 10 seconds. Will not adjust unless AEPS is over 20</li>
 *  <li>Will re-evaluate performance every 5 seconds. Will not adjust unless AEPS is over 10</li>
 *  <li>Will first event in 1 second; process entire que, then re-evaluate performance every 2.5 seconds. Will not adjust unless AEPS is over 5</li>
 *  <li>Will first event in 100ms; process entire que, then re-evaluate performance every 1.25 seconds. Will not adjust unless AEPS is over 2.5</li>
 *  </ul>
 *
 * For more detail on how throttling works see the h5c3.Throttle class.
 * @property Object SceneID Container for default game states
 * Default: STRICT
 */
h5c3.THROTTLESTYLE = 
{
    RELAXED:	0x0000,		/* STYLE: Re-evaluate every 10 seconds, low priority Que size [<20 AEPS] */
    STRICT:		0x0001,		/* STYLE: Re-evaluate every 5 seconds, Normal priority Que size [<10 AEPS] */
    AGGRESSIVE:	0x0002,		/* STYLE: Re-evaluate every 2.5 seconds, High priority Que size [<5 AEPS] */
    GEEZUS:   	0x0003		/* STYLE: Re-evaluate every 1.25 seconds, Top priority Que size [<2.5 AEPS] */
};

/**
 *
 * @class h5c3.Throttle
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
h5c3.Throttle = h5c3.Base.extend('h5c3.Throttle', { 
	_CLASSNAME: 	'Throttle',
	_CLASSVERSION:	'0.1.0',

    /**
     * @property {THROTTLESTYLE} _style
     * @default THROTTLESTYLE.STRICT
	 * @memberof h5c3.Throttle
     */
    _style: h5c3.THROTTLESTYLE.STRICT,

	_AEPS: 0,
	_current:0,
	_maximum:0,
	_minumum:0,
	_average:0,
    _interval:0,
	
    /**
     * @property {AccuTimer} timer
     * @default null
	 * @memberof h5c3.Throttle
     */
	_throttle: null,			//Throttler

	_que: new h5c3.Hashtable(),
	
	_reset:function($min,$max,$int) {
		this._AEPS= 0; 
		this._current=0; 
		this._maximum=$min; 
		this._minumum=$max;
		this._average=Math.floor( ($min+$max) / 2 );
		this._interval=$int;
	},
	
	_setStyle:function($style) {
		if (this._style === $style) return;
		
		if ($style<h5c3.THROTTLESTYLE.RELAXED) $style=h5c3.THROTTLESTYLE.RELAXED;
		if ($style<h5c3.THROTTLESTYLE.GEEZUS) $style=h5c3.THROTTLESTYLE.GEEZUS;
		
		this._style = $style;
		
		switch ($style) {
			case THROTTLESTYLE.RELAXED:
				this._reset(11,20,10);	
				break;
			case THROTTLESTYLE.STRICT:
				this._reset(6,10,5);				
				break;
			case THROTTLESTYLE.AGGRESSIVE:
				this._reset(2.6,5,2.5);							
				break;
			case THROTTLESTYLE.GEEZUS:
				this._reset(0,2.5,1.25);							
				break;
		}
		this._evOnChanged();
	},
	
	_evOnChanged:function() {
		this._stop();
		if (typeof onChanged === 'function') this.onChanged(this._style);
		this._start();
	},
	
	//Start loading all applets in our que
	_start:function() {
		if (this._running) return;
		
		this._throttle = new h5c3.AccuTimer(
			this._interval, 						//Run for this time and then call re-eval function
			this._average, 							//AEPS
			h5c3.bind(this, this._onProcess),		//Update totals, call end user callback
			h5c3.bind(this, this._onEvaluate)		//re-evaluate
		);

		this._running = true;
	},
	
	_stop:function() {
		if (!this._running) return;
		
		delete this._throttle;	
		
		this._running = false;
	},
	
	_onProcess:function() {
	},
	
	_onEvaluate:function() {
	}
	
},{
	
    /**
	 * @public
	 * @method
	 * @memberof h5c3.Throttle
	 * @param {THROTTLESTYLE} $style THROTTLESTYLE.STRICT
	 * @desc
     * </p>
	 * Initializes a new Throttle object with the Style defined with the onyl parameter.
	 * </p>
     */
    init: function ($style) {
        this._super();
		this._setStyle($style);
    },

	add:function($obj) {
		//Add whatever to que for processing
		var t = Date();
		t.getTime();
		t.toTimeString();
		this.que.put(t, $obj);
	},
	
	onProcess:function() {
		//Override me if you need
	},
	
	onChanged:function() {
		//Override me if you need
	}
	
});