/**
 * Cross-Browser Micro Mobile Console (CmC)\
 *
 * @interface
 * @final
 * @expose
 * @param {string} text to add to console
 * @memberof window
 * @preserve Written by Andrew Donelson <@AndrewDonelson> - Copyright 2014 by i2tm Labs - All rights reserved.
 */				
window['dbg'] = (function() {
	Function.prototype.bind = function(scope) {
		var _fn = this;
		return function() {
			return _fn.apply(scope, arguments);
		}
	};	
		
	var 
		db=[
			' v1.0.0\tWritten by Andrew Donelson <@AndrewDonelson> - Copyright 2014 by i2tm Labs - All rights reserved.\n',
			'position:fixed;height:5%;bottom:20px;left:5%;width:90%;z-index:1000000;background-color:rgba(128,128,128, 0.85);color:black;font-family:Ubuntu;font-size:18px',
			'application/x-www-form-urlencoded',
			'Content-Type',
			'Msxml2.XMLHTTP',
			'textarea',
			'cmcdata',
			'http://cdn.i2tmlabs.com/cmc.php',
			'CmC hooked into onError() and Attached to DOM.'
		],
		line=0,
		timer=0,
		log=document.createElement(db[5]);
			
	
	function PostData() {
		// 1. Create XHR instance - Start
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}
		else if (window.ActiveXObject) {
			xhr = new ActiveXObject(db[4]);
		}
		else {
			add('Ajax Error');
		}
		// 1. Create XHR instance - End
		
		// 2. Define what to do when XHR feed you the response from the server - Start
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status == 200 && xhr.status < 300) {
					add(xhr.responseText);
				}
			}
		}
		// 2. Define what to do when XHR feed you the response from the server - Start

		var cmcdata = document.getElementById(db[6]).value;

		// 3. Specify your action, location and Send to the server - Start 
		xhr.open('POST', db[7]);
		xhr.setRequestHeader(db[3], db[2]);
		xhr.send("cmcdata=" + cmcdata);
		// 3. Specify your action, location and Send to the server - End
	}	

	/**
	 * Add the given text to the log.
	 * Parses text:
	 * - if text ends with ... no line feed will be given assuming you want to add more, ie. Starting Task...10%...80%...Complete.
	 * - if text ends with . line feeds are added
	 * - if no ... or . the . is added by default and line feeds added
	 */
	function add(t){
		var 
			/** 
			 * Grabs last character of passed in string	
			 * @type {string|null}
			 */
			last1 = t.slice(-1),	// = '.' add End Of Line
			
			/** 
			 * Grabs last three characters of passed in string	
			 * @type {string|null}
			 */
			last3 = t.slice(-3),	// = '...' no end of line, continuing debug log entry

			/** 
			 * Hold the current line number and time-stamp information
			 * @type {string|null}
			 */
			ts = (line++) + '\t@\t' + (Math.round((new Date()).getTime() / 1000)) + '\t',
			
			/** 
			 * Holds the final modified output text
			 * @type {string|null}
			 */
			text = '',

			/** 
			 * Used to track when continuation is being used to avoid line numbers and time-stamps
			 * @type {boolean}
			 */
			cont = false;
			
		if (last3==='...')
			if (cont===false) {
				text=ts+t+'\n';
				cont=true;
			} else
				text=t;
		else {
			cont=false;
			if (last1==='.')
				text=ts+t+'\n';
			else
				text=ts+t+'.\n';			
		}	
		log.value += text;
		log.scrollTop = log.scrollHeight;
	}
	
	//Function main
	log.id='CmC';
	log.value=log.id+ db[0];
	log.readOnly=true;
	log.spellcheck=false;
	log.setAttribute("style",db[1]);
	log.onfocus=function(){this.style.height="50%"}
	log.onblur=function(){this.style.height="5%"}
	log.onerror=function(e,url,line){dbg('ERROR: '+e+'\nOn line '+line+' of '+url)}
	timer=setTimeout(function(){
		//document.body.addEventListener(
		//	'onerror', 
		//	function(e,url,line){dbg('ERROR: '+e+'\nOn line '+line+' of '+url)},
		//	false
		//);	
		document.body.appendChild(log);clearTimeout(timer);
		add(db[8]);
	},1E3)

	return function() {
	
		if(arguments.length===1&&arguments[0].constructor.name==='String')
			add(arguments[0]);
			
		return log;
	}
}());
