/**
 * @namespace SDAL
 * @description
 * <p>
 * SDAL which stands for Simple DOM Alias layer. With well over 20k lines of javascript you 
 * realize two things very quickly. One, typing "document.getElementById" 5k times sucks! So 
 * I made a global alias DOC(). I was not using jQuery at the time but mine is only 5 characters 
 * verus the original 23...almost 500% smaller, now multiple say just 100 uses by saving 17 
 * characters and you saved 1700 bytes before minimizing or compression. So it grew into about
 * a dozen help functions. 
 * </p>
 
 * <p>
 * SDAL is the first layer of the proprietary i2tm Labs H5C3 Framework. Stacktrace.js, base64.js 
 * and string.js are built first then this layer.
 * </p>
 *
 * 
 * @copyright 2013 by i2tm labs - all rights reserved.
 */
/**
 * @memberof SDAL
 *
 * @function
 * 
 * @description
 * Alias for document - only shortens by 3 characters, but to be standard,
 * plus it adds up when you have 500 calls to document!
 * 
 * @param None
 *
 * @return Document Returns the document
 * 
 * @example  	DOC().addEventListener('webkitfullscreenchange', h5c3.bootstrap._onFullscreenChange);
 * 
 */
DOC = function() { return document; };

/**
 * @memberof SDAL
 *
 * @function
 * 
 * @description
 * Alias for document.querySelector - It's also a help, pass in the data Name and data Value and it builds it for you.
 * You may also pass in a 3rd optional parameter of an element to search instead of document.
 * 
 * @param {string}	dataName	ie data-dataName			required
 * @param {string}	dataValue	ie data-dataName=dataValue	required
 * @param {element}	optEl		optional
 *
 * @return Document Returns the element
 * 
 * @example		this.html = GQS('type','content',$data);
 * 
 */
GQS = function ($dataName,$dataValue,$optEl) { CHK($optEl,DOC()); return $optEl.querySelector('div[data-'+$dataName+'="'+$dataValue+'"]'); };

/**
 * @memberof SDAL
 *
 * @function
 * 
 * @description Alias for document.getElementByID()
 * 
 * @param String id The ID of the element you want returned
 * 
 * @return Element Returns the element uniquely identified by its id identifier.
 * 
 * @example  	var element = GEI("myDIV");
 * 
 */
GEI = function ($id) { return DOC().getElementById($id); };

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Alias for document.getElementsByName()
 * 
 * @param String $name The name of the elements you want returned
 * 
 * @return {collection} Returns the collection of elements with the given name
 * 
 * @example  	var elements = GEN("DIV");
 * 
 */
GEN = function ($name) { return DOC().getElementsByName($name); };

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Alias for document.getElementsByClass()
 * 
 * @param String $class The class name of the elements you want returned
 * 
 * @return Collection Returns the collection of elements with the given classname
 * 
 * @example  	var elements = GEN("red");
 * 
 */
GEC = function ($class) { return DOC().getElementsByClass($class); };

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Alias for window.document.getElementsByTagName()
 * 
 * @param String $tag The tag name of the elements you want returned, ie. HEAD
 * 
 * @return Collection Returns the collection of elements with the given tag name
 * 
 * @example  	GET("head")[0].appendChild($script);
 * 
 */
GET = function ($tag) { return DOC().getElementsByTagName($tag); };

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Checks node parameter. Returns an element no mater if the element is passed in or the name of an element.
 * 
 * @param String|Element $element The name of an element or the actual element to append to
 * 
 * @return Element returns the element
 * 
 * @example  	var $el = CNT($element);
 * 
 */
CNT = function ($element) { var $result; if (typeof $element === "string") { $result = GEI($element); } else { $result = $element; } return $result; };

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Alias for document.getElementByID(canvas).getContext("2d");
 * 
 * @param String|Canvas $element The name of an canvas or the actual canvas
 * 
 * @return {context} Returns the 2D drawing context.
 * 
 * @example  	var myCTX = CTX("myCanvas");
 * 
 */
CTX = function ($element) { return CNT($element).getContext("2d"); };

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Alias for element.setAttribute()
 * 
 * @param 	String|Element	$element 	The name of an element or the actual element
 * @param 	String 			$name 		The name of the attribute you want to set
 * @param 	String|Number 	$value		The value to assign
 * 
 * @return None
 * 
 * @example	ESA("button","color","red");
 * 
 */
ESA = function ($element, $name, $value) { CNT($element).setAttribute($name, $value); };

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Alias for element.getAttribute()
 * 
 * @param 	String|Element	$element 	The name of an element or the actual element
 * @param 	String 			$name		The name of the attrinbute you want to get
 * 
 * @return None
 * 
 * @example var btnColor = EGA("button","color");
 * 
 */
EGA = function ($element, $name) { CNT($element).getAttribute($name); };

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Inserts a new element before a given element
 * 
 * @param 	String|Element 	$element 	The name of an element or the actual element
 * @param  	String 			$tag 		element to insert
 * @param  	String	 		$id 		ID of the new element
 * @param  	String 			$htm 		HTML to insert into new element
 * 
 * @return String $id    Parent nodes id
 *
 * @example  	AEA('someElementID','DIV','newDivID','This is inner HTML');
 * 
 */
AEA = function ($element, $tag, $id, $htm) {
	var $el = CNT($element),
		$ne = DOC().createElement($tag);
	if ($id) {
		$ne.id = $id;
	}
	if ($htm) {
		$ne.innerHTML = $htm;
	}
	$el.parentNode.insertBefore($ne, $element);
	return $el.parentNode.id;
};

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Inserts a new element into a given element
 * 
 * @param 	String|Element 	$element 	The name of an element or the actual element
 * @param  	String 			$tag 		element to insert
 * @param  	String	 		$id 		ID of the new element
 * @param  	String 			$htm 		HTML to insert into new element
 * 
 * @return Element returns the element just created & appended.
 * 
 * @example  	AET('someElementID','DIV','newDivID','This is inner HTML');
 * 
 */
AET = function ($element, $tag, $id, $htm) {
	var $el = CNT($element),
		$ne = DOC().createElement($tag);
	if ($id) {
		$ne.id = $id;
	}
	if ($htm) {
		$ne.innerHTML = $htm;
	}
	$el.appendChild($ne);
	return $ne;
};

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Smart Popup Window, Either Fullscreen or Centered.
 *
 * @param 	String 		$url 		The URL of the document to load in the new window
 * @param 	String 		$title 		The title to use for the new window
 * @param 	Boolean 	$fullscreen True to open in fullscreen mode, false to use $width & $height and center
 * @param 	number 		$width 		The desired width of the new window
 * @param 	number 		$height 	The desired height of the new window
 *
 * @return window returns the new window
 * 
 * @example var $myWindow = PUW('index.html','My Window',false,640,480);
 */
PUW = function ($url, $title, $fullscreen, $width, $height) {
	var $popup,
		$left = (window.screen.availWidth / 2) - ($width / 2),
		$top = (window.screen.availHeight / 2) - ($height / 2);
	if ($fullscreen === true) {
		$popup = window.open($url, $title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no');
		$popup.moveTo(0, 0);
		$popup.resizeTo(window.screen.availWidth, window.screen.availHeight);
	} else {
		$popup = window.open($url, $title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + $width + ', height=' + $height + ', top=' + $top + ', left=' + $left);
	}
	if (!$popup || $popup.closed || $popup.closed === 'undefined' || $popup.screenX === 0) {
		window.alert('Please change your popup settings for this domain.');
	}
	return $popup;
};

/**
Has worked on DOMStringMap
**/
ISA = function($e) {
	what = function($e) { return Object.prototype.toString.call($e).remove('[').remove(']').split(' ').pop(); }
	kind = function($k,$e) {
		if ($e===null) return 'null'; 
		else if ($e==='undefined') return 'undefined'; 
		else if ($k!=='Object' && $k!=='Function') return $k;
		
		if ($k==='Object') {
			//object Object = Class?
			if (typeof ($e.constructor) !== 'undefined') { 	//Simple Object at least
				if (typeof ($e.Class) !== 'undefined') { 	//Child Object at least
					if (typeof ($e.Class._CLASSNAME) !== 'undefined') { 	//Decendent of H5C3 
						return $e.Class._CLASSNAME; 
					} else if (typeof ($e.name) !== 'undefined'&&$e.name!=='') return 'Object:'+$e.name; else return 'Object:Unnamed';
				} else return 'Object:Simple';
			} else if (typeof $e.toString !== 'undefined') {
				return $k;
			} else return 'Object';
		} else if ($k==='Function') {
			//object Object = Class?
			if (typeof ($e.arguments) !== 'undefined') {
				if (typeof ($e.prototype) !== 'undefined')
					if (typeof ($e.name) !== 'undefined'&&$e.name!=='') return 'Method:'+$e.name; else return 'Method:Unnamed';
				else return $k;
			} else {
				var klass=null;
			}
		}
	}
	var $t = kind(what($e),$e);
		return $t;
};

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Check if a value is valid (not null, undefined or empty)
 * 
 * @param Mixed	p 	A value
 * 
 * @return Boolean true if the value is not undefined and not null
 * 
 * @example
 * (start code)
 * if !(VLD(foo)) { someFunction(); }
 * (end)
 * 
 */
VLD = function (p) { return !(p === null || p === 'undefined' || p === undefined || p === ''); };

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Checks if a param is valid (null or undefined) in which case the default value will be returned
 * 
 * @param Mixed 	p 	Parameter to check
 * @param Mixed 	def Default value to return if p is either null or undefined
 * 
 * @example  	if (CHK(foo,"bar")) { someFunction(); }
 * 
 * @return Mixed 	p 	if valid, otherwise def (default)
 */
CHK = function (p, def) { var $result; if (!VLD(p)) { $result = def; } else { $result = p; } return $result; };

/**
 * @memberof SDAL
 *
 * @function
 *
 * @description Tests a boolean evaluation and throws an exception with the error string. (Assert)
 * 
 * @param  	Boolean 	test 	A boolean result test
 * @param 	String 		error 	A string to throw with the exception
 * 
 * @example  	AST(foo,'BOOYA!');
 * 
 * @return None
 */
AST = function ($test, $error) { if (!$test) { throw $error; } };
 

RUN = function ($applet) {
	if (VLD(h5c3.bootstrap)) h5c3.applets.use({file:$applet});
}
 
/**
 * @memberof SDAL
 *
 * @function
 *
 * @description The Debug/Info/Warn/Error/complain/bitch/moan/gripe etc  shortcut to the H5C3 error handler system
 * 
 * @param  mixed	$m 		String message, exception object, printStackTrace array, ect.
 * @param  Object	$who 	if within a created h5c3 class use, this ortherwise use this.Class
 * 
 * @example  	_DBG_(printStackTrace({e:e},this.Class);
 * 
 * @return None
 */
ERR =
_DBG_ = 
		function($m,$who) {
	if (VLD(h5c3) && VLD(h5c3.errorhandler)) {
		//h5c3.errorhandler.process.apply( this, arguments );
		var evt = DOC().createEvent("Event");
		evt.initEvent("H5C3Error",true,true);
		evt.arguments = arguments;
		DOC().dispatchEvent(evt);		
	} else if (VLD(console)) {
		var $tmp;
		if (typeof $who === 'string') {	$tmp=$who; } 
		else if (typeof $who === 'object'||typeof $who === 'function') {
			if ($who.fullName) $tmp=$who.fullName; else if ($who._CLASSNAME) $tmp=$who._CLASSNAME;
			$tmp+='-'+$who._CLASSVERSION;
		} else {
			$tmp = 'Unknown';
		}
		console.log($tmp+':'+$m) 
	}
}