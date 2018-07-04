
/**
 *  Accurate self adjusting global timer
 * See the example:
 *
 *     @example
 *     // Run for 5 secs @ 10 FPS will fire trigger every 100ms
 *     AccuTimer(5000, 10, function($steps,$count,$fps)
 *     {
 *     		//Add code here for every interval
 *		},
 *		function()
 *		{
 *			//Timer done, add cleanup code here 
 *		});
 *
 * @class I$AccuTimer
 * @extends I$Interface
 * @memberof Maestro
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$AccuTimer', 
    {
		timer:null,
		
		/**
		 * Sets a new timer
		 *
		 * @method set
		 * @access private
		 * @param  {number} $length time in milliseconds to run for
		 * @param  {number} $fps desired FPS, ie 60 $fps = 16.66ms interval
		 * @param  {function} on_instance called each interval
		 * @param  {function} oncomplete called when desired interval reached
		 * @returns none 
		 * @memberof AccuTimer
		 */
		create : function($length, $fps, $oninterval, $ondone)
		{
			//86,400,000 ms in a day
			if ($length <=0 ) {
				$length = 86400000;		//No $length? set default to 24hrs
			}
			if ($fps <=0 ) {
				$fps = 1;				//No resolution? set default 1 fps
			}
			
			var $steps = (($length / 100) * ($fps / 10)),		//how many $steps/triggers?
				$speed = ($length / $steps),					//milliseconds between triggers
				$count = 0,									//reset $count
				$start = new Date().getTime();				//get current system time
			
			/**
			 * Create's and $starts a new timer
			 * @instance
			 * @access private
			 * @memberof AccuTimer.set
			 */
			function _instance()
			{
				if ($count++ >= $steps)
				{
					$ondone($steps, $count);
				}
				else
				{
					$oninterval($steps, $count, $fps);
					var diff = ((new Date().getTime() - $start) - ($count * $speed));
					this['timer']=setTimeout(_instance, ($speed - diff));
				}
				
			}
			this['timer']=setTimeout(_instance, $speed);
		},

		/**
		 * Callback function for AccuTimer object
		 * @method CallMebackIn
		 * @access private
		 * @param {number} ms
		 * @param {function} callback
		 * @returns number 
		 * @memberof AccuTimer
		 */
		CallMebackIn : function(ms,callback) {
			if(this['vld'](callback)) return window.setTimeout(callback, ms);
		}
    },
    {
        // Singleton static class, so nothing required here
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
