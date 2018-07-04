(function Maestro(window) {
	
	/**
	 * Shorthand version of window
	 *
	 * @export
	 * @property W$
	 * @type {window}
	 * @memberof window
	 */			
	window['W$']=window;

	/**
	 * Shorthand access to window.document
	 *
	 * @export
	 * @property D$
	 * @type {document}
	 * @memberof window
	 */			
	W$['D$']=W$.document;

	/**
	 * Shorthand access to window.document.head[]
	 *
	 * @export
	 * @property H$
	 * @type {DOMElement}
	 * @memberof window
	 */			
	W$['H$']=D$.getElementsByTagName("head")[0];

	/**
	 * Shorthand access to window.document.tail[]
	 *
	 * @export
	 * @property T$
	 * @type {DOMElement}
	 * @memberof window
	 */			
	W$['T$']=D$.getElementById("tail");

	/**
	 * Shorthand access to window.document.body[]
	 *
	 * @export
	 * @property B$
	 * @type {DOMElement}
	 * @memberof window
	 */			
	W$['B$']=D$.getElementsByTagName("body")[0];

	/**
	 * Shorthand access to window.document.stylesheets
	 *
	 * @export
	 * @property C$
	 * @type {DOMEElement}
	 * @memberof window
	 */			
	W$['C$']=D$.styleSheets;

	/**
	 * Shorthand access to window.document.scripts
	 *
	 * @export
	 * @property S$
	 * @type {DOMElement}
	 * @memberof window
	 */			
	W$['S$']=D$.scripts;

	/**
	 * Shorthand version of Maestro
	 *
	 * @global
	 * @export
	 * @property Maestro
	 * @type {Object}
	 * @memberof window
	 */			
	W$['M$']={
		VERSION : '3.0.0',
		LOADED : 0
	};

/**
 * Check if a value is valid (not null, undefined or empty)
 *
 * @example
 * 		if !(vld(foo)) { someFunction(); }
 *
 * @method vld
 * @param {*}	a 	A value
 * @returns {boolean} true if the value is not undefined and not null
 * @memberof Maestro
 * @export
 */
M$['vld'] = function(a){return!(null===a||"undefined"===typeof a||!1===a||""===a)}

/**
 *  Checks if a param is valid (null or undefined) in which case the default value will be returned
 *
 * @example
 * 		if (foo=chk(foo,"bar")) { someFunction(); }
 *
 * @method chk
 * @param 	{*} 	$p			Parameter to check
 * @param 	{*} 	$def		Default value to return if p is either null or undefined
 * @returns {*} 	if valid, otherwise def (default)
 * @memberof Maestro
 * @todo Remove function
 * @export
 */
M$['chk'] = function($p,$def){return (!this['vld']($p))?$def:$p;}

/**
 * Alias for window.document.getElementById
 *
 * @example
 * 		var element = gei("myDIV");
 *
 * @method gei
 * @param {string} $p
 * @returns element
 * @memberof Maestro
 * @export
 */
M$['gei'] = function ($p) {
	return D$.getElementById($p);
}

/**
 * Set, add, remove or replace an elements classes. the second class $c2
 * is only needed when using the replace action.
 *
 * @method cls
 * @param {string} $el  	element id
 * @param {string} $action	action [set|clear|add|remove|replace|toggle]
 * @param {string} $c1		name of class to work with
 * @param {string} $c2 		name of class used in replace of $c1
 * @memberof Maestro
 * @export
 */
M$['cls'] = function($el,$action,$c1,$c2) {
	try {
		$el=(typeof $el != 'string')
		?
		$el
		:
		M$['gei']($el);
		
		if (!$el) return;
		switch ($action.toLowerCase()) {
			case 'set': 
				$el.className=$c1;
				break;
				
			case 'clear': 
				$el.className='';
				break;
				
			case 'add': 
				$el.classList.add($c1);
				break;
				
			case 'remove':
				try{$el.classList.remove($c1)}catch(e){};
				break;
				
			case 'replace': 
				try{$el.classList.remove($c1)}catch(e){};
				try{$el.classList.add($c2)}catch(e){};
				break;
				
			case 'toggle':
				$el.classList.toggle($c1);
				break;
		}
	} catch(e) {
		alert(e)
	}
	
}

/**
 * Returns file extension from a url string
 *
 * @method gex
 * @param {String}	a	
 * @return (String|null) extension
 * @memberof Maestro
 * @export 
 */
M$['gex'] = function(a){
	if (typeof a==='undefined'||a=='') return ''; else return /(?:\.([^.]+))?$/.exec(a)[1].toLowerCase()
}

/**
 * Returns file name from a url string
 *
 * @method gfn
 * @param {String}	a	
 * @return (String|null) filename
 * @memberof Maestro
 * @export 
 */
M$['gfn'] = function(a){
	if (typeof a==='string')return a.substring(a.lastIndexOf("/")+1)
}

/**
 * Utility function for loading JavaScript or Stylesheets.
 * No other file formats are supported.
 *
 * @method lds
 * @param {string} $fileType 	either script or link
 * @param {string} $id 			element ID of this file
 * @param {string} $url 		full path to file, local or remote
 * @param {boolean} $tail		set to true if you want script loaded into tail.
 * @param {string} $after 		make sure loaded file is after this given file
 * @param {function} $onLoad 	optional
 * @param {function} $onError 	optional
 * @memberof Maestro
 * @export
 */
M$['lds'] = function ($filetype, $id, $url, $tail, $after, $onLoad, $onError) {
	
		function _onLoaded() {
			console.log('File load successful.');			
		}

		function _onErrored() {
			console.log('File load failed.');
		}
		
		function insert() {
			//tail or head?
			var c = ($tail===true)?T$:H$;
			
			if (typeof $after!='string') $after='last';
			
			if ($after=='first'){
				//=-=|Insert before all other scripts|=-=//
				c.firstElementChild(a);
				M$.LOADED++;
				return true;
			} else if ($after=='last'){
				//=-=|Insert before all other scripts|=-=//
				c.appendChild(a);
				M$.LOADED++;
				return true;
			} else {
				//=-=|find $after and insert after|=-=//
				c=M$['gei']($after);
				if (typeof c !='undefined' && c !=null){
					if (c.nextElementSibling!=null) {
						c.nextElementSibling.insertBefore(a);
						M$.LOADED++;
						return true;
					}
				}
			}
			return false;
		}
	
		var a,b,c;
				
		//=-=|Prepare required parameters|=-=//
		for (var i = 0;i<3;i++) {
			arguments[i]=M$['chk'](arguments[i],false);
			if (arguments[i]===false) {
				if (console) console.log('Error')
			}
		}
		//M$['chk']($after,'last');	
		if (arguments[0] == 'script'||arguments[0] == 'js') {
			a = D$.createElement('script');
			a.async = 1;
			a.src = $url; 
			a.type = 'application/javascript';
		} else if (arguments[0] == 'link'||arguments[0] == 'css') {
			a= D$.createElement('link');
			a.href = $url;
			a.rel = 'stylesheet';
			a.type = 'text/css';
		} else {
			return false
		}
		
		a.id=arguments[1];
		a.onload = ($onLoad) ? $onLoad : _onLoaded.bind(this);
		a.onerror = ($onError)? $onError : _onErrored.bind(this);
		
		//if (!$tail)
		//	return true;
		//else
			return insert();
	}

	/**
	 * called internally to create to load a script and attach to DOM.
	 *
	 * @param {Array} files	all scripts to be loaded.
	 * @private
	 * @memberof Maestro
	 */			
	M$.loadAllScripts=function(files) {
		
		if(T$&&T$.tagName=="DIV"){
			if(files&&files.constructor.name==="Array"){
				var fn,tail;
				do{
					fn=files.shift();
					M$['lds'](
						M$['gex'](fn),
						M$['gfn'](fn), 
						fn, 
						((M$['gex'](fn)=='js')?true:false),
						'last',
						null, 
						null
					);
				}while(files.length>0);					
			}
		}
	}

	M$['start'] = function (files) {
		M$['cls']('wrapper','add','vanish','');
		M$.loadAllScripts(files);
		M$['cls']('wrapper','replace','vanish','appear');
	}

	M$.lds(
		'js', 
		'jquery', 
		'https://code.jquery.com/jquery-2.2.1.min.js', 
		true, 
		'last', 
		function(){
			M$['start'](['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css','https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css','https://i2tmlabs.com/static/css/maestro-3.0.0.css','https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'])
		}, 
		null
	);
	
	//Load Core Resources
	//M$['start']([
//		'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
//		'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
//		'https://i2tmlabs.com/static/css/maestro-3.0.0.css',
//		'https://code.jquery.com/jquery-2.2.1.min.js',
//		'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'
//	]);
	
})(window);


