//=-=|BEGIN MAESTRO COMPONENT/ELEMENT CODE|=-=//
registerComponents= function() {
	//if (!M$['Component']) M$['Component'] = new Array();

	/**
	 * Nano Framework Enhanced Search Element
	 *
	 * @example <m-nano component="search"></m-nano>
	 */	
	M$['Component']['search'] = {
		init:function(self,args) {
			var css="",html="";
			
			//Normalize CSS
			css+="m-nano #nav-search{border-radius:2em 0em 0em 2em;background-color:#008000;color:#FFF;width:5em;border:none}";
			css+="m-nano #nav-search:active,#nav-search:focus{width:20em;border:none}";
			css+="m-nano .btn-i2tm-search{height:2.4em;background-color:#008000}";
			
			//Normalize HTML 
			html+='<form class="navbar-form" role="search" action="#" onclick="">';		
			html+='<div class="input-group">';		
			html+='<input type="text" class="form-control" name="nav-search" id="nav-search" x-webkit-speech="">';		
			html+='<input name="siteurl" type="hidden" value="i2tmlabs.com/">';		
			html+='<div class="input-group-btn">';		
			html+='<button class="btn btn-i2tm-search" type="submit"><i class="glyphicon glyphicon-search"></i></button>';		
			html+='</div></div></form>';		
			
			return [css,html]
		}
	}; M$['Component'].length++;


	/**
	 * Nano Framework CloudLett Element
	 *
	 * @example <m-nano data-component="applet"></m-nano>
	 */	
	M$['Component']['applet'] = {
		init:function(self,args) {
			var css="",html="",el;
			if (M$['parseApplet'](M$['gei'](args['id']))===true) 
				return true;
			else 
				return [css,html]
		}
	}; M$['Component'].length++;
	
	/**
	 * Nano Framework Enhanced Auto Awareness Header Element
	 *
	 * @example <m-nano component="header" size="auto|xs|sm|md|lg|xl"></m-nano>
	 * DONE
	 */ 
	M$['Component']['header'] = {
		init:function(self,args) {
			var css="",html="";
			
			//Normalize HTML 		
			self.innerHTML=this.parse(self.innerHTML);		

			//Normalize CSS
			self.children[0].css="font-family:neuropol;color:green;text-transform:uppercase";
			self.children[1].css="color:white;text-trassform:lowercase";
	
			return true;
		},
		
		parse:function(text) {
				
			var res = text.split(" ");
			if (res.length && res.length>1) {
				res1 = res.slice(0, res.length/2);
				res2 = res.slice(res.length/2, res.length);
				return '<h1 class="reflect">'+res1.join(" ")+'&nbsp;<small>'+res2.join(" ")+'</small></h1><hr class="reflect">';
			}
		}
	}; M$['Component'].length++;


	/**
	 * @example <m-nano component="led" 
	 *					shape="round|square|rectangle" 
	 *					color="blue|red|green|yellow" 
	 *					state="on|off"
	 *			></m-nano>
	 * DONE
	 */
	M$['Component']['led'] = {
		init:function(self,args) {
			var html='',css='';
			css+='margin:0.75em;display:inline-block;';			
			css+=this.getShape(args['shape']);	
			css+=this.getColorState(args['color'],args['state']);
			
			return [css,html]
		},
		
		getShape:function(s){
			var css='';
			
			if(s=='square')
				css+='width:1em;height:1em;border-radius:0%;';
			else if (s=='rectangle')
				css+='width:2em;height:1em;border-radius:0%;';
			else
				css+='width:1em;height:1em;border-radius:50%;';
			
			return css;
		},
		
		getColorState:function(c,s){
			var css='';
			
			//=-=|Set to red on/off|=-=//
			if (c=='red'&&s=='on')
				css+='background-color:#F40;box-shadow:#000 0 -1px 7px 1px, inset #600 0 -1px 9px, #F00 0 2px 1em;';
			else if (c=='red'&&s=='off')			
				css+='background-color:#690606;box-shadow:#000 0 -1px 7px 1px, inset #300 0 -1px 9px, #600 0 2px 1em;';
		
			//=-=|Set to green on/off|=-=//
			else if (c=='green'&&s=='on')
				css+='background-color:#393;box-shadow:#000 0 -1px 7px 1px, inset #0F0 0 -1px 9px, #7D0 0 2px 1em;';
			else if  (c=='green'&&s=='off')
				css+='background-color:#250;box-shadow:#000 0 -1px 7px 1px, inset #020 0 -1px 9px, #040 0 2px 1em;';
		
			//=-=|Set to blue on/off|=-=//
			else if (c=='blue'&&s=='on')
				css+='background-color:#0BF;box-shadow:#000 0 -1px 7px 1px, inset #006 0 -1px 9px, #0BF 0 2px 1em;';
			else if (c=='blue'&&s=='off')
				css+='background-color:#060669;box-shadow: #000 0 -1px 7px 1px, inset #003 0 -1px 9px, #006 0 2px 1em;';
				
			//=-=|Set to yellow on/off|=-=//
			else if (c=='yellow'&&s=='on')
				css+='background-color:#FF0;box-shadow:#000 0 -1px 7px 1px, inset #660 0 -1px 9px, #FF0 0 2px 1em;';
			else
				css+='background-color:#A90;box-shadow:#000 0 -1px 7px 1px, inset #220 0 -1px 9px, #440 0 2px 1em;';
			
			return css;
		},		
		onchanged:function(self,args) {
			self.style.cssText=this['init'](self,args)[0];			
			//return this.prototype.init(self,args);
		}
	}; M$['Component'].length++;
	
	
} //end registerComponents()	


M$['Component']=[];		
M$['Element']={};
registerComponents();
//if (typeof M$['Component'][this['component']] === 'undefined') registerComponents();
		
M$['Element'].prototype = Object.create(HTMLModElement.prototype);
/**
 * an instance of the element is created - Normalize HTML & CSS
 */
M$['Element'].prototype.createdCallback = function() {
	var args = this.parseAttributes();
	this['init'](args);
};
/**
 * an instance was inserted into the document
 */
M$['Element'].prototype.attachedCallback = function() {
	if(M$['Component'][this['component']]['oninsert'])
		M$['Component'][this['component']]['oninsert'](this,arguments);
};
/**
 * an instance was removed from the document
 */
M$['Element'].prototype.detachedCallback = function() {
	if(M$['Component'][this['component']]['onremove'])
		M$['Component'][this['component']]['onremove'](this,arguments);
};
/**
 * an attribute was added, removed, or updated
 */
M$['Element'].prototype.attributeChangedCallback = function() {
	if(M$['Component'][this['component']]['onchanged'])
		M$['Component'][this['component']]['onchanged'](this,this.parseAttributes());
};

M$['Element'].prototype.parseAttributes = function() {
	var name,value,args={},
		builtin=['component','data-component'];
		
	for (var i=0;i<this.attributes.length;i++) {
		name=this.attributes[i].name.toLowerCase()||'';
		value=this.attributes[i].value||'';
		if (builtin.indexOf(name)!=-1)
			this['component']=value;
		else
			args[name]=value;
	}
	return args;
};

M$['Element'].prototype.init = function(args) {
	//if (typeof M$['Component'][this['component']] === 'undefined')
	//	registerComponents();
		
	var result = M$['Component'][this['component']]['init'](this,args);
	if (result===true) return; //Component handled applying html and css		
	this.style.css=result[0];
	this.innerHTML=result[1];

};

// 2. Define a property read-only "bar".
Object.defineProperty(M$['Element'].prototype, "css", {value: ''});

// 3. Register m-nano's definition.
if (Boolean(D$.registerElement))
	M$['Element'] = D$['registerElement']('m-nano', {prototype: M$['Element'].prototype});
else {
	alert('Browser not supported.');
}
//=-=|END MAESTRO COMPONENT/ELEMENT CODE|=-=//
