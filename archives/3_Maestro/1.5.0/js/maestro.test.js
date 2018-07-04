
/**
 * Maestro Unit Test Object
 *
 * @augments maestro.df.Base
 * @class  maestro.df.UnitTest
 */
test = {
	
	check_refError:function() {
		var _={s:'tex',n:12345,b:false,a:[],o:{},f:function(){}};
		
		try {
			alert('Hello World!'+booya);
		} catch (e) {
			M$.err(this,e,_,Array.prototype.slice.call(arguments, 0));
		}
	},
	check_typeError:function() {
		var _={s:'tex',n:12345,b:false,a:[],o:{},f:function(){}};
		
		try {
			var num = 234; num.substr(1,1);
		} catch (e) {
			M$.err(this,e,_,Array.prototype.slice.call(arguments, 0));
		}
	},
	
	check_rangeError:function() {
		var _={s:'tex',n:12345,b:false,a:[],o:{},f:function(){}};
		
		try {
			var b = new Array(-1);
		} catch (e) {
			M$.err(this,e,_,Array.prototype.slice.call(arguments, 0));
		}
	},
	
	check_uriError:function() {
		var _={s:'tex',n:12345,b:false,a:[],o:{},f:function(){}};
		
		try {
			decodeURIComponent("%");
		} catch (e) {
			M$.err(this,e,_,Array.prototype.slice.call(arguments, 0));
		}
	},
	
	pass_fail:function(test,expected,call) {
		var result = (call===expected||expected=='')?"Pass":"Fail",
			action="Testing "+test+" ... ";
		if (result==='Pass') clr='green';else clr='red';
		console.log(action+result);
		tests.innerHTML+='<li style="color:'+clr+'">'+action+result+'</li>';
	}
		
	
};

var _={s:'text',n:12345,b0:false,b1:true,a:[3,2,1],o:{value:1},f:function(){},e:null};
	
test.check_refError();
test.check_typeError();
test.check_rangeError();
test.check_uriError();
test.pass_fail('D$','[object HTMLDocument]',D$.toString());
test.pass_fail('m$("gei","wrapper")','[object HTMLDivElement]',M$.gei("wrapper").toString() );
test.pass_fail('m$("gen","wrapper")','[object NodeList]',M$.gen("wrapper").toString() );
test.pass_fail('m$("get","body")','[object HTMLCollection]',M$.get("body").toString() );
test.pass_fail('m$("gec","page-header")','[object HTMLCollection]',M$.gec("page-header").toString() );
test.pass_fail('m$("gda","html")','[object Object]',M$.gda("html").toString() );
//test.pass_fail('m$("esa","html","data-hello","world")','true',M$.esa("html","data-hello","world").toString() );
//test.pass_fail('m$("ega","html","data-hello")','world',M$.ega("html","data-hello").toString() );
test.pass_fail('m$("cnt","tail")','[object HTMLUnknownElement]',M$.cnt("tail").toString() );
test.pass_fail('m$("cnt","tail")','[object HTMLUnknownElement]',M$.cnt("tail").toString() );
test.pass_fail('m$("aea","tail","DIV","newDivID","This is inner HTML")','[object HTMLDivElement]',M$.aea("tail","DIV","newDivID","This is inner HTML").toString() );
test.pass_fail('m$("aet","newDivID","h1","newH1ID","This is inner HTML")','[object HTMLHeadingElement]',M$.aet("newDivID","h1","newH1ID","This is inner HTML").toString() );
test.pass_fail('M$.vld(_.b0)','false',M$.vld(_.b0).toString() );
test.pass_fail('M$.vld(_.b1)','true',M$.vld(_.b1).toString() );
test.pass_fail('M$.vld(_.s)','true',M$.vld(_.s).toString() );
test.pass_fail('M$.vld(_.n)','true',M$.vld(_.n).toString() );
test.pass_fail('M$.vld(_.a)','true',M$.vld(_.a).toString() );
test.pass_fail('M$.vld(_.o)','true',M$.vld(_.o).toString() );
test.pass_fail('M$.vld(_.e)','false',M$.vld(_.e).toString() );
test.pass_fail('M$.vld("undefined")','false',M$.vld("undefined").toString() );
test.pass_fail('chk(_.b0,true)','true',M$.chk(_.b0,true).toString() );
test.pass_fail('chk(_.b1,false)','true',M$.chk(_.b1,false).toString() );
test.pass_fail('chk(_.s,"New String")','text',M$.chk(_.s,"New String").toString() );
test.pass_fail('chk(_.n,2014)','12345',M$.chk(_.n,2014).toString() );
test.pass_fail('chk(_.a,[1,2,3])','3,2,1',M$.chk(_.a,[1,2,3]).toString() );
test.pass_fail('chk(_.o,new Object())','[object Object]',M$.chk(_.o,new Object()).toString() );
test.pass_fail('chk(_.e,true)','true',M$.chk(_.e,true).toString() );
test.pass_fail('chk("undefined","defined")','defined',M$.chk("undefined","defined").toString() );
test.pass_fail('dmp(_.a, false)','true',M$.dmp(_.a, false).toString() );
test.pass_fail('dmp(_.n, true)','12345',M$.dmp(_.n, true).toString() );

test.pass_fail(
	'lds(Local JS)',
	'true',
	M$.lds('script','../../cdn/framework/nano/nano.local.js',null,null).toString() 
);
test.pass_fail(
	'lds((Local CSS)',
	'true',
	M$.lds('../../cdn/framework/nano/nano.local.css',null,null).toString() 
);
test.pass_fail(
	'lds((Remote JS)',
	'true',
	M$.lds('http://cdn.i2tmlabs.com/vendor/modernizr/modernizr.min.js', null,null).toString() 
);
test.pass_fail(
	'lds((Remote CSS)',
	'true',
	M$.lds('http://cdn.i2tmlabs.com/content/i2tm/apps/tutorial/assets/css/default.css',null,null).toString() 
);

test.pass_fail('xhr (Local CSS)','',M$.xhr('file:///C:/devtools/GitHub/Maestro/maestro/css/core_common.css',function(){M$.log('Test','INFO','xhr (Local CSS - Loaded)')},function(){return false},'get','', true) );
test.pass_fail('xhr (Local JS)','',M$.xhr('file:///C:/devtools/GitHub/cdn/framework/nano/gldl.local.js',function(){M$.log('Test','INFO','xhr (Local JS - Loaded)')},function(){return false},'get','', true));
test.pass_fail('xhr (Remote CSS)','',M$.xhr('http://cdn.i2tmlabs.com/vendor/highlighter/themes/twilight.css',function(){M$.log('Test','INFO','xhr (Remote CSS - Loaded)')},function(){return false},'get','', true));
test.pass_fail('xhr (remote JS)','',M$.xhr('http://cdn.i2tmlabs.com/vendor/highlighter/highlighter.js',function(){M$.log('Test','INFO','xhr (Remote JS - Loaded)')},function(){return false},'get','', true));
 
//test.pass_fail(,'',.toString() );
M$.pld();