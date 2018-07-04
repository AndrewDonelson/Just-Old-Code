/**
 * @namespace Core
 * @class h5c3.ErrorHandler
 * @augments h5c3.Base
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * <p>
 * 
 * <pre><code>
 * _DBG_($a,$b);
 * </code></pre>
 * 
 * </p>
 */
h5c3.ErrorHandler = h5c3.Base.extend('h5c3.ErrorHandler', { 
	_CLASSNAME		:'ErrorHandler',
	_CLASSVERSION	:'0.1.0',
	/**
	 * @method tag()
	 * 
	 * Returns the this classes Full Friendly Name and Current Version Number
	 * 
	 * @return  
	 * String	Full name and version of the ths class
	 */
	tag: function() { return this._CLASSNAME+' v'+this._CLASSVERSION; }
	
},{
	ready:false,
	errArgs: null,
	done: false,
	
	total:0,
	currOurs: false,
	currType: null,
	currMSG: false,
	currStack: false,
	currCaller: false,
	
    /**
     * @property {object} current
     * @default null
	 * @memberof h5c3.ErrorHandler
     */
	whoName		:'',
	whoPath		:'',
		

    /**
	 * @public
	 * @method
	 * @memberof h5c3.ErrorHandler
	 * @desc
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function () {
        this._super();		
		DOC().addEventListener("H5C3Error", h5c3.bind(this, this.onH5C3Error), false);
		_DBG_("Listening.",this.Class);
		this.ready=true;
    },
	
	_handleWhatArray:function($arr) {
		if (ISA($arr) !== 'Array') return;
		this.currType = 1; //stackTrace? no sender [ERROR]
		var $tmp = $arr.pop();
		
		if ($tmp.length>1) var $tmp2=$tmp.pop(); else var $tmp2=$tmp;
		
		if (!VLD($tmp2)) return;
		if (ISA($tmp2.message) === 'undefined') {
			this.currMSG = $tmp.toString();
		} else {
			this.currMSG = $tmp2.__proto__.name+':'+$tmp2.message;
		}
				
		if (ISA($tmp)!=='Array') $tmp = $arr; 
		for (i=0;i<$tmp.length;i++) {
			loc = $tmp[i].contains('@file:');
			if (loc) {
				$tmp3 = $tmp[i].split('@file:');
				$tmp[i]=$tmp3[0];
			}
		}
		this.currStack = $tmp;	
		return $arr;
	},
	
	reset:function() {
		this.total=0;
		this.currOurs= false;
		this.currType= -1;
		this.currMSG= '';
		this.currStack= false;
		this.currCaller= '';
	},
	
	who:function() {
		CHK(this.errArgs,null);   //arguments.callee.name
		CHK(this.whoName,'Unknown');   //arguments.callee.name
		/* Lets see who is bitching shall we? */
		for (i=0;i<this.errArgs.length;i++) {
			if (typeof this.errArgs[i] !== 'string') {
				if (this.errArgs[i]._fullTypeName) {
					this.whoName = this.errArgs[i].fullName+ '-'+this.errArgs[i]._CLASSVERSION;
					this.whoPath = this.errArgs[i]._fullTypeName;
				} else if (this.errArgs[i]._CLASSNAME) {
					this.whoName = this.errArgs[i]._CLASSNAME+ '-'+this.errArgs[i]._CLASSVERSION;
					this.whoPath = 'h5c3';
				} else {
					CHK(this.whoName,'Unknown');
				}
			}
		}
		this.whoName = String.prototype.pad(this.whoName, 30);
		this.whoPath = String.prototype.pad(this.whoPath, 50);
	},
	
	what:function() {
		switch (this.errArgs.length) {
			//Wrong format, test for info/error
			case 1:
				if (h5c3.isString(this.errArgs[0])) {
					this.currType = 0; //msg no sender [INFO]
					this.currMSG = this.errArgs[0];
				} else if (h5c3.isArray(this.errArgs[0])) {
					this._handleWhatArray(this.errArgs[0]);
				} else if (h5c3.isH5C3(this.errArgs[0])) {
					this.currType = 2; //not sure yet? no sender [ERROR ??]					
				} else if (h5c3.isObject(this.errArgs)) {
					this.currType = 3; //not sure yet? no sender [ERROR ??]					
				} else if (h5c3.isFunction(this.errArgs)) {
					this.currType = 4; //not sure yet? no sender [ERROR ??]					
				}
					break;
					
			//srtring/sender (info)  or array/sender (error)
			case 2:
				if (h5c3.isString(this.errArgs[0]) && (h5c3.isH5C3(this.errArgs[1])||h5c3.isObject(this.errArgs[1])||h5c3.isFunction(this.errArgs[1]))) {
					this.currType = 0; //Message/sender
					this.who(this.errArgs[1]);
					this.currMSG=this.errArgs[0];
				} else if (h5c3.isArray(this.errArgs[0]))
					this._handleWhatArray(this.errArgs[0]);				
					break;
			
			case 3:
					break;
		}
	},
	
	when:function() {
		//this.currWhen = new Date().dateFormat('mmm dd, yyyy h:mm TT ss');
	},

	prepEmail:function() {
		return '<a href="mailto:support@i2tmlabs.com?subject=H5C3%20Error%20Report&body='+
		'What:'+this.whoName+'\n'+
		'Error:'+this.currMSG+'\n'+
		'Trace:'+this.currStack.toString()+'\n'+
		'Distro:'+h5c3.tag()+'\n">Is this our fault? Send It!</a>';
	},
	
	display:function() {
		switch (this.currType) {
			case 0: //message
				console.log("411:%c%s %s > %s", "color: green;", this.whoName, this.whoPath, this.currMSG);
				break;
			case 1: //error-stack
				console.error("911:%cOH SNAP! - Sucks to be you right now.\n%s %s > %s\nTrace: %O", "color: red;", this.whoName, this.whoPath, this.currMSG,this.currStack);
				//console.log("%s","color: Blue;",this.prepEmail());
				break;
		}
	},
	
	onH5C3Error:function($event) {
		this.done = false;
		this.reset();
		this.errArgs = $event.arguments;
		//We should have 1 to 3 arguments, a string for a message (optional) a printStack array if error
		//and the caller object
		/*
		message,[stackprace]   or message,{}
		*/
		this.what();
		this.who();
		this.display();
		//TODO: Determine just a Messge or is is was an internal or user created error
		//Display Message
		//console.log("%s %s > %s", this.whoName, this.whoPath, this.currMSG);
		this.done = true;
	}
});
h5c3.errorhandler = new h5c3.ErrorHandler();