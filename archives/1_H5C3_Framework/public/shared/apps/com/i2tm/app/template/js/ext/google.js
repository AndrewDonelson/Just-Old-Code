/* Google Tracking & adSense */


Google = ({
	/**
	 * Google Analytics for H5C3 Framework
	 *
	 * @property {string} NAME
	 * @protected
	 * @memberof H5C3
	 */
	NAME: 'H5C3 Framework Google Analytics Controller',
	/**
	 * Holds the current version of the class
	 *
	 * @property {string} VERSION 
	 * @protected
	 * @memberof H5C3
	 */
	VERSION: '0.0.1'
	
	},{
	/**
	 * This is your User Account (UA) ID from google
	 *
	 * @property {string} UID 
	 * @protected
	 * @memberof H5C3
	 */
	UID:0,
	
	/**
	 * <p>This property is used to see if tracking is actually performed. It is used for debugging. If H5C3.devMode it true or location.protocol is "file" then this value is false.</p>
	 *
	 * @property {string} enabled 
	 * @protected
	 * @memberof H5C3
	 */
	enabled: false,
	
	domain: null,
	
	gaJsHost: null,
	
	/**
	 * Initialization
	 *
	 * @memberof H5C3
	 * @method
	 * @public
	 */
	init: function(UID) {
		//this._super();
		this.gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
		this.UID = UID;
		
		if (document.location.protocol!=="file:") {
			this.enabled = true;
		}
		document.write(unescape("%3Cscript src='" + this.gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	},
		
	track: function () {
		if (!this.enabled) return;
		try {
			_gaq.push(['_setAccount',this.UID]); 
			_gaq.push(['_setDomainName',document.location.host]);
			_gaq.push(['_addIgnoredOrganic',document.location.host]);
			_gaq.push(['_trackPageview']);
		} catch(err) {}
	}
});

h5c3_GA = new Google.init('UA-35732532-1"');
