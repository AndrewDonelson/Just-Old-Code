
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
 
/**
 * @class  h5c3.Media
 * 
 * h5c3.Media is used to to accuratly detect the device, browser & version, operating system & version.
 * 
 */
h5c3.Media = h5c3.Base.extend('h5c3.Media', {
	_CLASSNAME: 'Media',
	_CLASSVERSION:'0.7.7',
    /**
	 * @property struct	browser
	 *
	 * Holds detected browser information
     */	
    browser:
   	{
   		name: 'Unknown',
   		version: 'Unknown'
   	},

    /**
	 * @property struct	OS
	 *
	 * Holds detected Operating System information
     */	
    OS:
   	{
   		name: 'Unknown',
   		version: 'Unknown'
   	},
	
    /**
	 * @constructor init()
	 *
	 * @param
	 * None
	 *
	 * @return 
	 * None
     */	
    init: function () {
    	this.browser.name = this.searchString(this.dataBrowser) || "Unknown";
    	this.browser.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    	this.OS.name = this.searchString(this.dataOS) || "Unknown";
    	this.OS.version = this.searchString(this.dataOS) || "Unknown";
		//window.alert('['+navigator.userAgent+'] = '+this.browser+' v'+this.version+' on '+this.OS);
    },
	
    /**
	 * @method searchString($data)
	 *
	 * parse the given UA string fo indentifying information
     * 
	 * @param
	 * String	$data
	 *
	 * @return 
	 * String	Identity
     */	
    searchString: function ($data) {
    	for (var i=0;i<$data.length;i++)	{
    		var dataString = $data[i].string;
    		var dataProp = $data[i].prop;
    		this.versionSearchString = $data[i].versionSearch || $data[i].identity;
    		if (dataString) {
    			if (dataString.indexOf($data[i].subString) != -1)
    				return $data[i].identity;
    		}
    		else if (dataProp)
    			return $data[i].identity;
    	}
    },
    /**
	 * @method searchVersion()
	 *
	 * @param
	 * String	dataString
	 *
	 * @return 
	 * Number
     */	
    searchVersion: function ($dataString) {
    	var index = $dataString.indexOf(this.versionSearchString);
    	if (index == -1) return;
    	return parseFloat($dataString.substring(index+this.versionSearchString.length+1));
    },
    /**
	 * Constant:
	 *	Array	dataBrowser		Array of browsers
     */	
    dataBrowser: [
    	{ string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
    	{ string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb"	},
    	{ string: navigator.vendor, subString: "Apple", identity: "Safari",	versionSearch: "Version" },
    	{ string: navigator.vendor, subString: "iCab", identity: "iCab" },
    	{ string: navigator.vendor,	subString: "KDE", identity: "Konqueror"	},
    	{ string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
    	{ string: navigator.vendor, subString: "Camino", identity: "Camino"	},
    	{ string: navigator.userAgent, subString: "Netscape", identity: "Netscape" }, // for newer Netscapes (6+)
    	{
    		string: navigator.userAgent,
    		subString: "MSIE",
    		identity: "Explorer",
    		versionSearch: "MSIE"
    	},
    	{
    		string: navigator.userAgent,
    		subString: "Gecko",
    		identity: "Mozilla",
    		versionSearch: "rv"
    	},
    	{ 		// for older Netscapes (4-)
    		string: navigator.userAgent,
    		subString: "Mozilla",
    		identity: "Netscape",
    		versionSearch: "Mozilla"
    	},
    	{ 
			prop: window.opera,
			identity: "Opera"
    	}
    ],
    /**
	 * Constant:
	 *	Array	dataOS		Array of operating systems
     */	
    dataOS : [
    	{ string: navigator.platform,	subString: "Win64", identity: "Windows 64Bit" },
    	{ string: navigator.platform,	subString: "WOW64", identity: "Windows 64Bit" },
    	{ string: navigator.platform,	subString: "Win32", identity: "Windows 32Bit" },

    	{ string: navigator.platform,	subString: "x86_64", identity: "Windows 64Bit" },
    	{ string: navigator.platform,	subString: "x86-64", identity: "Windows 64Bit" },
    	{ string: navigator.platform,	subString: "x64;", identity: "Windows 64Bit" },
    	{ string: navigator.platform,	subString: "x64_64", identity: "Windows 64Bit" },
    	{ string: navigator.platform,	subString: "Win64", identity: "Windows 64Bit" },
		
		
    	{ string: navigator.platform,	subString: "Mac", identity: "Macintosh" },
    	{ string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod" },
    	{ string: navigator.platform, subString: "Linux",	identity: "Linux" },
    	{ string: navigator.platform,	subString: "Android", identity: "Android" }
    ]
},
{
// Singleton static class, so nothing required here
});