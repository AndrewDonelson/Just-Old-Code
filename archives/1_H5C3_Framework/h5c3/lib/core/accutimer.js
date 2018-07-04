
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

/**
 *  Engine
 *  H5C3 Framework
 *  Accurate self adjusting global timer
 * @usage 
 * //Run for 5 secs @ 10 FPS will fire trigger every 100ms
 * h5c3.AccuTimer(5000, 10, function($steps,$count,$fps)
 * {
 *   //Add code here for every interval
 * },
 * function()
 * {
 *    //Timer done, add cleanup code here 
 * });
 *
 * @param  number $length time in milliseconds to run for
 * @param  number $fps desired FPS, ie 60 $fps = 16.66ms interval
 * @param  event on_instance called each interval
 * @param  event oncomplete called when desired interval reached
 */
h5c3.AccuTimer = function($length, $fps, $oninterval, $ondone)
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
            window.setTimeout(_instance, ($speed - diff));
        }
		
    }
    window.setTimeout(_instance, $speed);
};

h5c3.CallMebackIn = function(ms,callback) {
	if(VLD(callback)) return window.setTimeout(callback, ms);
}
