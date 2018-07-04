/**
 * My computer scores			0.0845
 * Galaxy Note 2 scores			1.25 (4.3 pixel)
 * Carolyns Notebook scores 	0.15
 * @module R2WL
 * @augments Base
 * @class DeviceTest
 */
 
/**
 * Device Performance Benchmark
 *
 * @class I$DeviceTest
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$DeviceTest',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1		
	},
	/** @lends I$Interface.prototype */
	{
		canvas:null,
		startTime:0,
		results:[],
		
		/**
		 * object initialization
		 * @method init
		 * @return Literal
		 */
		init:function() {
			this['_super']();
			this['canvas'] = M$['gei']("testCanvas");
			return true;
		},

		/**
		 * Send text to Game Log
		 * @method log
		 * @param {string} s
		 * @param {boolean} eol
		 * @return 
		 */
		log:function(s,eol) {
			var el = M$['gei']('testLog');
			el.value += s;
			if (eol) el.value += '\n';
			el.scrollTop = el.scrollHeight;
		},
		
		/**
		 * Execute the CloudApp Landing Page
		 * @method run
		 * @return 
		 */
		run:function() {
			var elapsed=0,dateTotal=0,pixelTotal=0,mathTotal=0,memTotal=0;
			
			this.testScreen();
			
			if ( this.testBrowser() ) {
				for (i=0;i<=4;i++) {
					elapsed = this.testDate();
					dateTotal+=elapsed;
				}
				this.results['date'] = (dateTotal/3);
				this.log("Date Test: "+this.results['date']+"sec",true);
				
				for (i=0;i<=4;i++) {
					elapsed = this.testPixels();
					pixelTotal+=elapsed;
				}
				this.results['pixels'] = (pixelTotal/3);
				this.log("Pixel Test: "+this.results['pixels']+"sec",true);			
				
				for (i=0;i<=4;i++) {
					elapsed = this.testMath();
					mathTotal+=elapsed;
				}
				this.results['math'] = (mathTotal/3);
				this.log("Math Test: "+this.results['math']+"sec",true);			
			
				for (i=0;i<=4;i++) {
					elapsed = this.testMemory();
					memTotal+=elapsed;
				}
				this.results['mem'] = (memTotal/3);
				this.log("Memory Test: "+this.results['mem']+"sec",true);			
			}
			
			var avg = (this.results['date']+this.results['pixels']+this.results['math']+this.results['mem']) / 4;
			this.log("Your performance index is: "+avg,true);			
		},
		
		/**
		 * Start a single shot 1 second timer
		 * @method startTimer
		 * @return {number} startTime
		 */
		startTimer:function() {
			this.startTime=new Date();
			this.startTime=this.startTime.getTime();
			return this.startTime;
		},

		/**
		 * Stop timer
		 * @method stopTimer
		 * @return {number} nowTime
		 */
		stopTimer:function() {
			var nowTime=new Date();
			nowTime=nowTime.getTime();
			nowTime=(nowTime-this.startTime)/1000;
			return nowTime;
		},	
		
		/**
		 * Determine the browser and version
		 * @method testBrowser
		 * @return Literal
		 */
		testBrowser:function() {

			var platform = "Unknown OS",
				browserName = "Unknown Browser",	
				UA = navigator.userAgent.toLowerCase(),
				index;

			if (navigator.appVersion.indexOf("Win")!=-1) this.platform="Windows";
			if (navigator.appVersion.indexOf("Mac")!=-1) this.platform="MacOS";
			if (navigator.appVersion.indexOf("X11")!=-1) this.platform="UNIX";
			if (navigator.appVersion.indexOf("Linux")!=-1) this.platform="Linux";		
			if (navigator.appVersion.indexOf("Android")!=-1) this.platform="Android";		
			if (navigator.appVersion.indexOf("iOS")!=-1) this.platform="iOS";		
			this.log("Detected "+this.platform+" OS and ",false);
			
			if (document.documentMode) {
				index = UA.indexOf('msie');
				this.browserCheck = "IE";
				this.browserName = "Internet Explorer";
				this.browserVersion = "" + document.documentMode;
			}
			else if (UA.indexOf('chrome') > -1) {
				index = UA.indexOf('chrome');
				this.browserCheck = "Chrome";
				this.browserName = "Google Chrome";
				this.browserVersion = "" + parseFloat('' + UA.substring(index + 7));
			}
			else if (UA.indexOf('firefox') > -1) {
				index = UA.indexOf('firefox');
				this.browserCheck = "Firefox";
				this.browserName = "Mozilla Firefox";
				this.browserVersion = "" + parseFloat('' + UA.substring(index + 8));
			}
			else if (UA.indexOf('minefield') > -1) {
				index = UA.indexOf('minefield');
				this.browserCheck = "Firefox";
				this.browserName = "Mozilla Firefox Minefield";
				this.browserVersion = "" + parseFloat('' + UA.substring(index + 10));
			}
			else if (UA.indexOf('opera') > -1) {
				this.browserCheck = "Opera";
				this.browserName = "Opera";
				this.browserVersion = "";
			}
			else if (UA.indexOf('safari') > -1) {
				index = UA.indexOf('safari');
				this.browserCheck = "Safari";
				this.browserName = "Apple Safari";
				this.browserVersion = "" + parseFloat('' + UA.substring(index + 7));
			}
		
			this.log(this.browserName+" v"+this.browserVersion+" Browser.",false);
			if (this.browserCheck === "Chrome" || this.browserCheck==="Firefox" || this.browserCheck==="Opera") {
				if (this.browserCheck === "Chrome" && this.browserVersion >= 30) {
					this.log("[Pass]",true);
					return true;
				} else if (this.browserCheck === "Firefox" && this.browserVersion >= 25) {
					this.log("[Pass]",true);
					return true;			
				} else if (this.browserCheck === "Opera" && this.browserVersion >= 18) {
					this.log("[Pass]",true);
					return true;			
				}
			}
			this.log("[Fail]",true);
			return false;
		},
		
		/**
		 * Determine the screen resolution via CSS
		 * @method testScreen
		 * @return 
		 */
		testScreen:function() {
			this.log("Resolution is "+screen.width+"x"+screen.height+" - ",false);
			var dpp = M$['gei']('dpp');
			var style = window.getComputedStyle(dpp, null).getPropertyValue('font-size');
			if (style==="3px") {
			} else if (style==="3px") {
				this.results.dppx=3;
			} else if (style==="2px") {
				this.results.dppx=2;
			} else if (style==="1.5px") {
				this.results.dppx=1.5;
			} else {
				this.results.dppx=1;
			}
			this.log(this.results.dppx+" dppx",true);
		},
		
		/**
		 * Determine the time required to render 100k random color pixels
		 */
		/**
		 * Description
		 * @method testPixels
		 * @return CallExpression
		 */
		testPixels:function() {
			var ctx = this['canvas'].getContext("2d"),
				id = ctx.createImageData(1,1),
				x,y,
				d  = id.data;
			
			this['canvas'].width = this['canvas'].width;
			this.startTimer();
			for (i=0;i<=1000000;i++) {
				d[0]   = Math.floor((Math.random()*255));
				d[1]   = Math.floor((Math.random()*255));
				d[2]   = Math.floor((Math.random()*255));
				d[3]   = 255;
				x = Math.floor(Math.random()*this['canvas'].width);
				y = Math.floor(Math.random()*this['canvas'].height);
				ctx.putImageData( id, x, y );
			}
			return this.stopTimer();	
		},
		
		/**
		 * Calculate what date of the week falls on for the next 1000 years
		 */
		/**
		 * Description
		 * @method testDate
		 * @return CallExpression
		 */
		testDate:function() {

			this.startTimer();		
			for (i=2000;i<=102000;i++) {
				var xmasdate=new Date("Dec 24, "+i)
				var xmas=xmasdate.getDay()
				if (xmas==0) {xmas="Sunday"}
				if (xmas==1) {xmas="Monday"}
				if (xmas==2) {xmas="Tuesday"}
				if (xmas==3) {xmas="Wednesday"}
				if (xmas==4) {xmas="Thursday"}
				if (xmas==5) {xmas="Friday"}
				if (xmas==6) {xmas="Saturday"}
				
			}
			return this.stopTimer();
		},
		
		/**
		 * Perform 400k math problems
		 */
		/**
		 * Description
		 * @method testMath
		 * @return CallExpression
		 */
		testMath:function() {
			var a,b,c,d = 0;
			this.startTimer();		
			for (i=0;i<=100000;i++) {
				a=(Math.random()*screen.availWidth)+(Math.random()*screen.availHeight);
				b=(Math.random()*screen.availWidth)-(Math.random()*screen.availHeight);
				c=(Math.random()*screen.availWidth)*(Math.random()*screen.availHeight);
				d=(Math.random()*screen.availWidth)/(Math.random()*screen.availHeight);
			}
			return this.stopTimer();
		},

		/**
		 * Perform 400k math problems
		 */
		/**
		 * Description
		 * @method testMemory
		 * @return CallExpression
		 */
		testMemory:function() {
			var a = new Array();
			var	b = {bool:false,str:'A String',integer:1234,real:3.14159};
				
			this.startTimer();		
			for (i=0;i<=1000000;i++) {
				a.push(b);
			}
			delete a;
			
			return this.stopTimer();
		}
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

