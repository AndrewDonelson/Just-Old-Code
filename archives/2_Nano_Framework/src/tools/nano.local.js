/*global this:true, nano:true, gamecore:true, DOC:true, CHK:true, GEI:true, VLD:true, CNT:true, CTX:true, GEN:true, GEC:true, ESA:true, EGA:true, AEA:true, AET:true, PUW:true, $n.ast:true */
/*jslint indent: 4, maxerr: 20, passfail: false, white: true, browser: true, sub: true, nomen: true, plusplus: true, unparam: true */
/**! 
 * <h1>nano framework <small>version 1.0.0</small></h1>
 * <p>Imagine that NANO Framework is the Conductor and Bootstrap, jQuery, Modernizr and Font-Awesome are the musicians - You now have a perfect symphony.</p>
 * http://nanofw.com/?license.txt
 * Copyright 2014 by i2tm Labs - All rights reserved.
 *//*! jQuery v2.1.1pre | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.1pre",o=function(a,b){return new o.fn.init(a,b)},p=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,q=/^-ms-/,r=/-([\da-z])/gi,s=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){return"object"!==o.type(a)||a.nodeType||o.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(q,"ms-").replace(r,s)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=t(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:k&&!k.call("\ufeff\xa0")?function(a){return null==a?"":k.call(a)}:function(a){return null==a?"":(a+"").replace(p,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(t(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=t(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function t(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var u=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t="sizzle"+-new Date,u=a.document,v=0,w=0,x=fb(),y=fb(),z=fb(),A=function(a,b){return a===b&&(k=!0),0},B="undefined",C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=E.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")"+L+"*(?:([*^$|!~]?=)"+L+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+N+")|)|)"+L+"*\\]",P=":("+M+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+O.replace(3,8)+")*)|.*)\\)|)",Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(P),V=new RegExp("^"+N+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,ab=/'|\\/g,bb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),cb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{H.apply(E=I.call(u.childNodes),u.childNodes),E[u.childNodes.length].nodeType}catch(db){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function eb(a,b,d,e){var f,g,i,j,k,n,q,r,v,w;if((b?b.ownerDocument||b:u)!==m&&l(b),b=b||m,d=d||[],!a||"string"!=typeof a)return d;if(1!==(j=b.nodeType)&&9!==j)return[];if(o&&!e){if(f=$.exec(a))if(i=f[1]){if(9===j){if(g=b.getElementById(i),!g||!g.parentNode)return d;if(g.id===i)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(i))&&s(b,g)&&g.id===i)return d.push(g),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((i=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(i)),d}if(c.qsa&&(!p||!p.test(a))){if(r=q=t,v=b,w=9===j&&a,1===j&&"object"!==b.nodeName.toLowerCase()){n=pb(a),(q=b.getAttribute("id"))?r=q.replace(ab,"\\$&"):b.setAttribute("id",r),r="[id='"+r+"'] ",k=n.length;while(k--)n[k]=r+qb(n[k]);v=_.test(a)&&nb(b.parentNode)||b,w=n.join(",")}if(w)try{return H.apply(d,v.querySelectorAll(w)),d}catch(x){}finally{q||b.removeAttribute("id")}}}return h(a.replace(Q,"$1"),b,d,e)}function fb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function gb(a){return a[t]=!0,a}function hb(a){var b=m.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ib(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function jb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function mb(a){return gb(function(b){return b=+b,gb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function nb(a){return a&&typeof a.getElementsByTagName!==B&&a}c=eb.support={},f=eb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},l=eb.setDocument=function(a){var b,e=a?a.ownerDocument||a:u,g=e.defaultView;return e!==m&&9===e.nodeType&&e.documentElement?(m=e,n=e.documentElement,o=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){l()},!1):g.attachEvent&&g.attachEvent("onunload",function(){l()})),c.attributes=hb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=hb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(e.getElementsByClassName)&&hb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=hb(function(a){return n.appendChild(a).id=t,!e.getElementsByName||!e.getElementsByName(t).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==B&&o){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(bb,cb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(bb,cb);return function(a){var c=typeof a.getAttributeNode!==B&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==B?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==B&&o?b.getElementsByClassName(a):void 0},q=[],p=[],(c.qsa=Z.test(e.querySelectorAll))&&(hb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&p.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||p.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll(":checked").length||p.push(":checked")}),hb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&p.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||p.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),p.push(",.*:")})),(c.matchesSelector=Z.test(r=n.webkitMatchesSelector||n.mozMatchesSelector||n.oMatchesSelector||n.msMatchesSelector))&&hb(function(a){c.disconnectedMatch=r.call(a,"div"),r.call(a,"[s!='']:x"),q.push("!=",P)}),p=p.length&&new RegExp(p.join("|")),q=q.length&&new RegExp(q.join("|")),b=Z.test(n.compareDocumentPosition),s=b||Z.test(n.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},A=b?function(a,b){if(a===b)return k=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===u&&s(u,a)?-1:b===e||b.ownerDocument===u&&s(u,b)?1:j?J.call(j,a)-J.call(j,b):0:4&d?-1:1)}:function(a,b){if(a===b)return k=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:j?J.call(j,a)-J.call(j,b):0;if(f===g)return jb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?jb(h[d],i[d]):h[d]===u?-1:i[d]===u?1:0},e):m},eb.matches=function(a,b){return eb(a,null,null,b)},eb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==m&&l(a),b=b.replace(T,"='$1']"),!(!c.matchesSelector||!o||q&&q.test(b)||p&&p.test(b)))try{var d=r.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return eb(b,m,null,[a]).length>0},eb.contains=function(a,b){return(a.ownerDocument||a)!==m&&l(a),s(a,b)},eb.attr=function(a,b){(a.ownerDocument||a)!==m&&l(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!o):void 0;return void 0!==f?f:c.attributes||!o?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},eb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},eb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(k=!c.detectDuplicates,j=!c.sortStable&&a.slice(0),a.sort(A),k){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return j=null,a},e=eb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=eb.selectors={cacheLength:50,createPseudo:gb,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(bb,cb),a[3]=(a[4]||a[5]||"").replace(bb,cb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||eb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&eb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return W.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&U.test(c)&&(b=pb(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(bb,cb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=x[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&x(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==B&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=eb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[t]||(q[t]={}),j=k[a]||[],n=j[0]===v&&j[1],m=j[0]===v&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[v,n,m];break}}else if(s&&(j=(b[t]||(b[t]={}))[a])&&j[0]===v)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[t]||(l[t]={}))[a]=[v,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||eb.error("unsupported pseudo: "+a);return e[t]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?gb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:gb(function(a){var b=[],c=[],d=g(a.replace(Q,"$1"));return d[t]?gb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:gb(function(a){return function(b){return eb(a,b).length>0}}),contains:gb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:gb(function(a){return V.test(a||"")||eb.error("unsupported lang: "+a),a=a.replace(bb,cb).toLowerCase(),function(b){var c;do if(c=o?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===n},focus:function(a){return a===m.activeElement&&(!m.hasFocus||m.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:mb(function(){return[0]}),last:mb(function(a,b){return[b-1]}),eq:mb(function(a,b,c){return[0>c?c+b:c]}),even:mb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:mb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:mb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:mb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=kb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=lb(b);function ob(){}ob.prototype=d.filters=d.pseudos,d.setFilters=new ob;function pb(a,b){var c,e,f,g,h,i,j,k=y[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=R.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?eb.error(a):y(a,i).slice(0)}function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=w++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[v,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[t]||(b[t]={}),(h=i[d])&&h[0]===v&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)eb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[t]&&(d=vb(d)),e&&!e[t]&&(e=vb(e,f)),gb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],j=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return J.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==i)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[t]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return vb(j>1&&sb(m),j>1&&qb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(Q,"$1"),c,e>j&&wb(a.slice(j,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,j,k){var l,n,o,p=0,q="0",r=f&&[],s=[],t=i,u=f||e&&d.find.TAG("*",k),w=v+=null==t?1:Math.random()||.1,x=u.length;for(k&&(i=g!==m&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){n=0;while(o=a[n++])if(o(l,g,h)){j.push(l);break}k&&(v=w)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(j));s=ub(s)}H.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&eb.uniqueSort(j)}return k&&(v=w,i=t),r};return c?gb(f):f}return g=eb.compile=function(a,b){var c,d=[],e=[],f=z[a+" "];if(!f){b||(b=pb(a)),c=b.length;while(c--)f=wb(b[c]),f[t]?d.push(f):e.push(f);f=z(a,xb(e,d)),f.selector=a}return f},h=eb.select=function(a,b,e,f){var h,i,j,k,l,m="function"==typeof a&&a,n=!f&&pb(a=m.selector||a);if(e=e||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&o&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(bb,cb),b)||[])[0],!b)return e;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}h=W.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(bb,cb),_.test(i[0].type)&&nb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&qb(i),!a)return H.apply(e,f),e;break}}}return(m||g(a,n))(f,b,!o,e,_.test(a)&&nb(b.parentNode)||b),e},c.sortStable=t.split("").sort(A).join("")===t,c.detectDuplicates=!!k,l(),c.sortDetached=hb(function(a){return 1&a.compareDocumentPosition(m.createElement("div"))}),hb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ib("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&hb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ib("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),hb(function(a){return null==a.getAttribute("disabled")})||ib(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),eb}(a);o.find=u,o.expr=u.selectors,o.expr[":"]=o.expr.pseudos,o.unique=u.uniqueSort,o.text=u.getText,o.isXMLDoc=u.isXML,o.contains=u.contains;var v=o.expr.match.needsContext,w=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,x=/^.[^:#\[\.,]*$/;function y(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(x.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(y(this,a||[],!1))},not:function(a){return this.pushStack(y(this,a||[],!0))},is:function(a){return!!y(this,"string"==typeof a&&v.test(a)?o(a):a||[],!1).length}});var z,A=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,B=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:A.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||z).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),w.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof z.ready?z.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};B.prototype=o.fn,z=o(m);var C=/^(?:parents|prev(?:Until|All))/,D={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=v.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function E(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return E(a,"nextSibling")},prev:function(a){return E(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(D[a]||o.unique(e),C.test(a)&&e.reverse()),this.pushStack(e)}});var F=/\S+/g,G={};function H(a){var b=G[a]={};return o.each(a.match(F)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?G[a]||H(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var I;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(I.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function J(){m.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1),o.ready()}o.ready.promise=function(b){return I||(I=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1))),I.promise(b)},o.ready.promise();var K=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function L(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}L.uid=1,L.accepts=o.acceptData,L.prototype={key:function(a){if(!L.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=L.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(F)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var M=new L,N=new L,O=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,P=/([A-Z])/g;function Q(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(P,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:O.test(c)?o.parseJSON(c):c}catch(e){}N.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return N.hasData(a)||M.hasData(a)},data:function(a,b,c){return N.access(a,b,c)},removeData:function(a,b){N.remove(a,b)},_data:function(a,b,c){return M.access(a,b,c)
},_removeData:function(a,b){M.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=N.get(f),1===f.nodeType&&!M.get(f,"hasDataAttrs"))){c=g.length;while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),Q(f,d,e[d]));M.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){N.set(this,a)}):K(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=N.get(f,a),void 0!==c)return c;if(c=N.get(f,d),void 0!==c)return c;if(c=Q(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=N.get(this,d);N.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&N.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){N.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=M.get(a,b),c&&(!d||o.isArray(c)?d=M.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return M.get(a,c)||M.access(a,c,{empty:o.Callbacks("once memory").add(function(){M.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=M.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var R=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,S=["Top","Right","Bottom","Left"],T=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},U=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var V="undefined";l.focusinBubbles="onfocusin"in a;var W=/^key/,X=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=/^([^.]*)(?:\.(.+)|)$/;function $(){return!0}function _(){return!1}function ab(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=M.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==V&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(F)||[""],j=b.length;while(j--)h=Z.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=M.hasData(a)&&M.get(a);if(r&&(i=r.events)){b=(b||"").match(F)||[""],j=b.length;while(j--)if(h=Z.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,M.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!Y.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,Y.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(M.get(g,"events")||{})[b.type]&&M.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(M.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=X.test(e)?this.mouseHooks:W.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ab()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ab()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?$:_):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:_,isPropagationStopped:_,isImmediatePropagationStopped:_,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=$,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=$,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=$,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=M.access(d,b);e||d.addEventListener(a,c,!0),M.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=M.access(d,b)-1;e?M.access(d,b,e):(d.removeEventListener(a,c,!0),M.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=_;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=_),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var bb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,cb=/<([\w:]+)/,db=/<|&#?\w+;/,eb=/<(?:script|style|link)/i,fb=/checked\s*(?:[^=]|=\s*.checked.)/i,gb=/^$|\/(?:java|ecma)script/i,hb=/^true\/(.*)/,ib=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,jb={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};jb.optgroup=jb.option,jb.tbody=jb.tfoot=jb.colgroup=jb.caption=jb.thead,jb.th=jb.td;function kb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function lb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function mb(a){var b=hb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function nb(a,b){for(var c=0,d=a.length;d>c;c++)M.set(a[c],"globalEval",!b||M.get(b[c],"globalEval"))}function ob(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(M.hasData(a)&&(f=M.access(a),g=M.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}N.hasData(a)&&(h=N.access(a),i=o.extend({},h),N.set(b,i))}}function pb(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function qb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&U.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=pb(h),f=pb(a),d=0,e=f.length;e>d;d++)qb(f[d],g[d]);if(b)if(c)for(f=f||pb(a),g=g||pb(h),d=0,e=f.length;e>d;d++)ob(f[d],g[d]);else ob(a,h);return g=pb(h,"script"),g.length>0&&nb(g,!i&&pb(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(db.test(e)){f=f||k.appendChild(b.createElement("div")),g=(cb.exec(e)||["",""])[1].toLowerCase(),h=jb[g]||jb._default,f.innerHTML=h[1]+e.replace(bb,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=pb(k.appendChild(e),"script"),i&&nb(f),c)){j=0;while(e=f[j++])gb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[M.expando],f&&(b=M.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);M.cache[f]&&delete M.cache[f]}delete N.cache[c[N.expando]]}}}),o.fn.extend({text:function(a){return K(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=kb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=kb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(pb(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&nb(pb(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(pb(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!eb.test(a)&&!jb[(cb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bb,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(pb(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(pb(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&fb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(pb(c,"script"),lb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,pb(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,mb),j=0;g>j;j++)h=f[j],gb.test(h.type||"")&&!M.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(ib,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var rb,sb={};function tb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function ub(a){var b=m,c=sb[a];return c||(c=tb(a,b),"none"!==c&&c||(rb=(rb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=rb[0].contentDocument,b.write(),b.close(),c=tb(a,b),rb.detach()),sb[a]=c),c}var vb=/^margin/,wb=new RegExp("^("+R+")(?!px)[a-z%]+$","i"),xb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function yb(a,b,c){var d,e,f,g,h=a.style;return c=c||xb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),wb.test(g)&&vb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function zb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Ab=/^(none|table(?!-c[ea]).+)/,Bb=new RegExp("^("+R+")(.*)$","i"),Cb=new RegExp("^([+-])=("+R+")","i"),Db={position:"absolute",visibility:"hidden",display:"block"},Eb={letterSpacing:0,fontWeight:400},Fb=["Webkit","O","Moz","ms"];function Gb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Fb.length;while(e--)if(b=Fb[e]+c,b in a)return b;return d}function Hb(a,b,c){var d=Bb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ib(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+S[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+S[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+S[f]+"Width",!0,e))):(g+=o.css(a,"padding"+S[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+S[f]+"Width",!0,e)));return g}function Jb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=xb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=yb(a,b,f),(0>e||null==e)&&(e=a.style[b]),wb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ib(a,b,c||(g?"border":"content"),d,f)+"px"}function Kb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=M.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&T(d)&&(f[g]=M.access(d,"olddisplay",ub(d.nodeName)))):f[g]||(e=T(d),(c&&"none"!==c||!e)&&M.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=yb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Gb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Cb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Gb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=yb(a,b,d)),"normal"===e&&b in Eb&&(e=Eb[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&Ab.test(o.css(a,"display"))?o.swap(a,Db,function(){return Jb(a,b,d)}):Jb(a,b,d):void 0},set:function(a,c,d){var e=d&&xb(a);return Hb(a,c,d?Ib(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=zb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},yb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+S[d]+b]=f[d]||f[d-2]||f[0];return e}},vb.test(a)||(o.cssHooks[a+b].set=Hb)}),o.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=xb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Kb(this,!0)},hide:function(){return Kb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){T(this)?o(this).show():o(this).hide()})}});function Lb(a,b,c,d,e){return new Lb.prototype.init(a,b,c,d,e)}o.Tween=Lb,Lb.prototype={constructor:Lb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Lb.propHooks[this.prop];return a&&a.get?a.get(this):Lb.propHooks._default.get(this)},run:function(a){var b,c=Lb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Lb.propHooks._default.set(this),this}},Lb.prototype.init.prototype=Lb.prototype,Lb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Lb.propHooks.scrollTop=Lb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Lb.prototype.init,o.fx.step={};var Mb,Nb,Ob=/^(?:toggle|show|hide)$/,Pb=new RegExp("^(?:([+-])=|)("+R+")([a-z%]*)$","i"),Qb=/queueHooks$/,Rb=[Wb],Sb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Pb.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Pb.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Tb(){return setTimeout(function(){Mb=void 0}),Mb=o.now()}function Ub(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=S[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Vb(a,b,c){for(var d,e=(Sb[b]||[]).concat(Sb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Wb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&T(a),p=M.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=ub(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ob.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=M.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;M.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Vb(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Xb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Yb(a,b,c){var d,e,f=0,g=Rb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Mb||Tb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Mb||Tb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Xb(k,j.opts.specialEasing);g>f;f++)if(d=Rb[f].call(j,a,k,j.opts))return d;return o.map(k,Vb,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Yb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Sb[c]=Sb[c]||[],Sb[c].unshift(b)},prefilter:function(a,b){b?Rb.unshift(a):Rb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(T).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Yb(this,o.extend({},a),f);(e||M.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=M.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Qb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=M.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ub(b,!0),a,d,e)}}),o.each({slideDown:Ub("show"),slideUp:Ub("hide"),slideToggle:Ub("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Mb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Mb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Nb||(Nb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Nb),Nb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Zb,$b,_b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return K(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===V?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?$b:Zb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(F);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b
}}}}}),$b={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=_b[b]||o.find.attr;_b[b]=function(a,b,d){var e,f;return d||(f=_b[b],_b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,_b[b]=f),e}});var ac=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return K(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||ac.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var bc=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(F)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(bc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(F)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(bc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(F)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===V||"boolean"===c)&&(this.className&&M.set(this,"__className__",this.className),this.className=this.className||a===!1?"":M.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(bc," ").indexOf(b)>=0)return!0;return!1}});var cc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(cc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var dc=o.now(),ec=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var fc,gc,hc=/#.*$/,ic=/([?&])_=[^&]*/,jc=/^(.*?):[ \t]*([^\r\n]*)$/gm,kc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,lc=/^(?:GET|HEAD)$/,mc=/^\/\//,nc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,oc={},pc={},qc="*/".concat("*");try{gc=location.href}catch(rc){gc=m.createElement("a"),gc.href="",gc=gc.href}fc=nc.exec(gc.toLowerCase())||[];function sc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(F)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function tc(a,b,c,d){var e={},f=a===pc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function uc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function vc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function wc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:gc,type:"GET",isLocal:kc.test(fc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":qc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?uc(uc(a,o.ajaxSettings),b):uc(o.ajaxSettings,a)},ajaxPrefilter:sc(oc),ajaxTransport:sc(pc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=jc.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||gc)+"").replace(hc,"").replace(mc,fc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(F)||[""],null==k.crossDomain&&(h=nc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===fc[1]&&h[2]===fc[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(fc[3]||("http:"===fc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),tc(oc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!lc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(ec.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=ic.test(d)?d.replace(ic,"$1_="+dc++):d+(ec.test(d)?"&":"?")+"_="+dc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+qc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=tc(pc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=vc(k,v,f)),u=wc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var xc=/%20/g,yc=/\[\]$/,zc=/\r?\n/g,Ac=/^(?:submit|button|image|reset|file)$/i,Bc=/^(?:input|select|textarea|keygen)/i;function Cc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||yc.test(a)?d(a,e):Cc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Cc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Cc(c,a[c],b,e);return d.join("&").replace(xc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Bc.test(this.nodeName)&&!Ac.test(a)&&(this.checked||!U.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(zc,"\r\n")}}):{name:b.name,value:c.replace(zc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Dc=0,Ec={},Fc={0:200,1223:204},Gc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Ec)Ec[a]()}),l.cors=!!Gc&&"withCredentials"in Gc,l.ajax=Gc=!!Gc,o.ajaxTransport(function(a){var b;return l.cors||Gc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Dc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Ec[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Fc[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Ec[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Hc=[],Ic=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Hc.pop()||o.expando+"_"+dc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Ic.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ic.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Ic,"$1"+e):b.jsonp!==!1&&(b.url+=(ec.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Hc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=w.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Jc=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Jc)return Jc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Kc=a.document.documentElement;function Lc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==V&&(e=d.getBoundingClientRect()),c=Lc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Kc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Kc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return K(this,function(b,e,f){var g=Lc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=zb(l.pixelPosition,function(a,c){return c?(c=yb(a,b),wb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Mc=a.jQuery,Nc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Nc),b&&a.jQuery===o&&(a.jQuery=Mc),o},typeof b===V&&(a.jQuery=a.$=o),o});
/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.isLoading=!1};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",f.resetText||d.data("resetText",d[e]()),d[e](f[b]||this.options[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},b.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});return this.$element.trigger(j),j.isDefaultPrevented()?void 0:(this.sliding=!0,f&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),f&&this.cycle(),this)};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(a){a&&a.target!=this.$element[0]||(this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse"))};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(a){a&&a.target!=this.$element[0]||(this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse"))};return a.support.transition?void this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);!e&&f.toggle&&"show"==c&&(c=!c),e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle="collapse"][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(jQuery),+function(a){"use strict";function b(b){a(d).remove(),a(e).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e='[data-toggle="dropdown"]',f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown",h),e.trigger("focus")}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=f.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+', [role="menu"], [role="listbox"]',f.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(300):c.$element.trigger("focus").trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());c.is("a")&&b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.trigger("focus")})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this,d=this.tip();this.setContent(),this.options.animation&&d.addClass("fade");var e="function"==typeof this.options.placement?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,g=f.test(e);g&&(e=e.replace(f,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(e),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var h=this.getPosition(),i=d[0].offsetWidth,j=d[0].offsetHeight;if(g){var k=this.$element.parent(),l=e,m=document.documentElement.scrollTop||document.body.scrollTop,n="body"==this.options.container?window.innerWidth:k.outerWidth(),o="body"==this.options.container?window.innerHeight:k.outerHeight(),p="body"==this.options.container?0:k.offset().left;e="bottom"==e&&h.top+h.height+j-m>o?"top":"top"==e&&h.top-m-j<0?"bottom":"right"==e&&h.right+i>n?"left":"left"==e&&h.left-i<p?"right":e,d.removeClass(l).addClass(e)}var q=this.getCalculatedOffset(e,h,i,j);this.applyPlacement(q,e),this.hoverState=null;var r=function(){c.$element.trigger("shown.bs."+c.type)};a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,r).emulateTransitionEnd(150):r()}},b.prototype.applyPlacement=function(b,c){var d,e=this.tip(),f=e[0].offsetWidth,g=e[0].offsetHeight,h=parseInt(e.css("margin-top"),10),i=parseInt(e.css("margin-left"),10);isNaN(h)&&(h=0),isNaN(i)&&(i=0),b.top=b.top+h,b.left=b.left+i,a.offset.setOffset(e[0],a.extend({using:function(a){e.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),e.addClass("in");var j=e[0].offsetWidth,k=e[0].offsetHeight;if("top"==c&&k!=g&&(d=!0,b.top=b.top+g-k),/bottom|top/.test(c)){var l=0;b.left<0&&(l=-2*b.left,b.left=0,e.offset(b),j=e[0].offsetWidth,k=e[0].offsetHeight),this.replaceArrow(l-f+j,j,"left")}else this.replaceArrow(k-g,k,"top");d&&e.offset(b)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(a(c).is("body")?window:c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);{var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})}},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(b.RESET).addClass("affix");var a=this.$window.scrollTop(),c=this.$element.offset();return this.pinnedOffset=c.top-a},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"top"==this.affixed&&(e.top+=d),"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){null!=this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:c-h-this.$element.height()}))}}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery);/*! jQuery v2.1.1pre | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.1pre",o=function(a,b){return new o.fn.init(a,b)},p=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,q=/^-ms-/,r=/-([\da-z])/gi,s=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){return"object"!==o.type(a)||a.nodeType||o.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(q,"ms-").replace(r,s)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=t(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:k&&!k.call("\ufeff\xa0")?function(a){return null==a?"":k.call(a)}:function(a){return null==a?"":(a+"").replace(p,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(t(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=t(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function t(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var u=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t="sizzle"+-new Date,u=a.document,v=0,w=0,x=fb(),y=fb(),z=fb(),A=function(a,b){return a===b&&(k=!0),0},B="undefined",C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=E.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")"+L+"*(?:([*^$|!~]?=)"+L+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+N+")|)|)"+L+"*\\]",P=":("+M+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+O.replace(3,8)+")*)|.*)\\)|)",Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(P),V=new RegExp("^"+N+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,ab=/'|\\/g,bb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),cb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{H.apply(E=I.call(u.childNodes),u.childNodes),E[u.childNodes.length].nodeType}catch(db){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function eb(a,b,d,e){var f,g,i,j,k,n,q,r,v,w;if((b?b.ownerDocument||b:u)!==m&&l(b),b=b||m,d=d||[],!a||"string"!=typeof a)return d;if(1!==(j=b.nodeType)&&9!==j)return[];if(o&&!e){if(f=$.exec(a))if(i=f[1]){if(9===j){if(g=b.getElementById(i),!g||!g.parentNode)return d;if(g.id===i)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(i))&&s(b,g)&&g.id===i)return d.push(g),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((i=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(i)),d}if(c.qsa&&(!p||!p.test(a))){if(r=q=t,v=b,w=9===j&&a,1===j&&"object"!==b.nodeName.toLowerCase()){n=pb(a),(q=b.getAttribute("id"))?r=q.replace(ab,"\\$&"):b.setAttribute("id",r),r="[id='"+r+"'] ",k=n.length;while(k--)n[k]=r+qb(n[k]);v=_.test(a)&&nb(b.parentNode)||b,w=n.join(",")}if(w)try{return H.apply(d,v.querySelectorAll(w)),d}catch(x){}finally{q||b.removeAttribute("id")}}}return h(a.replace(Q,"$1"),b,d,e)}function fb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function gb(a){return a[t]=!0,a}function hb(a){var b=m.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ib(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function jb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function mb(a){return gb(function(b){return b=+b,gb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function nb(a){return a&&typeof a.getElementsByTagName!==B&&a}c=eb.support={},f=eb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},l=eb.setDocument=function(a){var b,e=a?a.ownerDocument||a:u,g=e.defaultView;return e!==m&&9===e.nodeType&&e.documentElement?(m=e,n=e.documentElement,o=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){l()},!1):g.attachEvent&&g.attachEvent("onunload",function(){l()})),c.attributes=hb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=hb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(e.getElementsByClassName)&&hb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=hb(function(a){return n.appendChild(a).id=t,!e.getElementsByName||!e.getElementsByName(t).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==B&&o){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(bb,cb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(bb,cb);return function(a){var c=typeof a.getAttributeNode!==B&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==B?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==B&&o?b.getElementsByClassName(a):void 0},q=[],p=[],(c.qsa=Z.test(e.querySelectorAll))&&(hb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&p.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||p.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll(":checked").length||p.push(":checked")}),hb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&p.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||p.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),p.push(",.*:")})),(c.matchesSelector=Z.test(r=n.webkitMatchesSelector||n.mozMatchesSelector||n.oMatchesSelector||n.msMatchesSelector))&&hb(function(a){c.disconnectedMatch=r.call(a,"div"),r.call(a,"[s!='']:x"),q.push("!=",P)}),p=p.length&&new RegExp(p.join("|")),q=q.length&&new RegExp(q.join("|")),b=Z.test(n.compareDocumentPosition),s=b||Z.test(n.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},A=b?function(a,b){if(a===b)return k=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===u&&s(u,a)?-1:b===e||b.ownerDocument===u&&s(u,b)?1:j?J.call(j,a)-J.call(j,b):0:4&d?-1:1)}:function(a,b){if(a===b)return k=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:j?J.call(j,a)-J.call(j,b):0;if(f===g)return jb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?jb(h[d],i[d]):h[d]===u?-1:i[d]===u?1:0},e):m},eb.matches=function(a,b){return eb(a,null,null,b)},eb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==m&&l(a),b=b.replace(T,"='$1']"),!(!c.matchesSelector||!o||q&&q.test(b)||p&&p.test(b)))try{var d=r.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return eb(b,m,null,[a]).length>0},eb.contains=function(a,b){return(a.ownerDocument||a)!==m&&l(a),s(a,b)},eb.attr=function(a,b){(a.ownerDocument||a)!==m&&l(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!o):void 0;return void 0!==f?f:c.attributes||!o?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},eb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},eb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(k=!c.detectDuplicates,j=!c.sortStable&&a.slice(0),a.sort(A),k){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return j=null,a},e=eb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=eb.selectors={cacheLength:50,createPseudo:gb,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(bb,cb),a[3]=(a[4]||a[5]||"").replace(bb,cb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||eb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&eb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return W.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&U.test(c)&&(b=pb(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(bb,cb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=x[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&x(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==B&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=eb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[t]||(q[t]={}),j=k[a]||[],n=j[0]===v&&j[1],m=j[0]===v&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[v,n,m];break}}else if(s&&(j=(b[t]||(b[t]={}))[a])&&j[0]===v)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[t]||(l[t]={}))[a]=[v,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||eb.error("unsupported pseudo: "+a);return e[t]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?gb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:gb(function(a){var b=[],c=[],d=g(a.replace(Q,"$1"));return d[t]?gb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:gb(function(a){return function(b){return eb(a,b).length>0}}),contains:gb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:gb(function(a){return V.test(a||"")||eb.error("unsupported lang: "+a),a=a.replace(bb,cb).toLowerCase(),function(b){var c;do if(c=o?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===n},focus:function(a){return a===m.activeElement&&(!m.hasFocus||m.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:mb(function(){return[0]}),last:mb(function(a,b){return[b-1]}),eq:mb(function(a,b,c){return[0>c?c+b:c]}),even:mb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:mb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:mb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:mb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=kb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=lb(b);function ob(){}ob.prototype=d.filters=d.pseudos,d.setFilters=new ob;function pb(a,b){var c,e,f,g,h,i,j,k=y[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=R.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?eb.error(a):y(a,i).slice(0)}function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=w++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[v,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[t]||(b[t]={}),(h=i[d])&&h[0]===v&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)eb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[t]&&(d=vb(d)),e&&!e[t]&&(e=vb(e,f)),gb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],j=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return J.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==i)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[t]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return vb(j>1&&sb(m),j>1&&qb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(Q,"$1"),c,e>j&&wb(a.slice(j,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,j,k){var l,n,o,p=0,q="0",r=f&&[],s=[],t=i,u=f||e&&d.find.TAG("*",k),w=v+=null==t?1:Math.random()||.1,x=u.length;for(k&&(i=g!==m&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){n=0;while(o=a[n++])if(o(l,g,h)){j.push(l);break}k&&(v=w)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(j));s=ub(s)}H.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&eb.uniqueSort(j)}return k&&(v=w,i=t),r};return c?gb(f):f}return g=eb.compile=function(a,b){var c,d=[],e=[],f=z[a+" "];if(!f){b||(b=pb(a)),c=b.length;while(c--)f=wb(b[c]),f[t]?d.push(f):e.push(f);f=z(a,xb(e,d)),f.selector=a}return f},h=eb.select=function(a,b,e,f){var h,i,j,k,l,m="function"==typeof a&&a,n=!f&&pb(a=m.selector||a);if(e=e||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&o&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(bb,cb),b)||[])[0],!b)return e;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}h=W.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(bb,cb),_.test(i[0].type)&&nb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&qb(i),!a)return H.apply(e,f),e;break}}}return(m||g(a,n))(f,b,!o,e,_.test(a)&&nb(b.parentNode)||b),e},c.sortStable=t.split("").sort(A).join("")===t,c.detectDuplicates=!!k,l(),c.sortDetached=hb(function(a){return 1&a.compareDocumentPosition(m.createElement("div"))}),hb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ib("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&hb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ib("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),hb(function(a){return null==a.getAttribute("disabled")})||ib(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),eb}(a);o.find=u,o.expr=u.selectors,o.expr[":"]=o.expr.pseudos,o.unique=u.uniqueSort,o.text=u.getText,o.isXMLDoc=u.isXML,o.contains=u.contains;var v=o.expr.match.needsContext,w=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,x=/^.[^:#\[\.,]*$/;function y(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(x.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(y(this,a||[],!1))},not:function(a){return this.pushStack(y(this,a||[],!0))},is:function(a){return!!y(this,"string"==typeof a&&v.test(a)?o(a):a||[],!1).length}});var z,A=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,B=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:A.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||z).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),w.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof z.ready?z.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};B.prototype=o.fn,z=o(m);var C=/^(?:parents|prev(?:Until|All))/,D={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=v.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function E(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return E(a,"nextSibling")},prev:function(a){return E(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(D[a]||o.unique(e),C.test(a)&&e.reverse()),this.pushStack(e)}});var F=/\S+/g,G={};function H(a){var b=G[a]={};return o.each(a.match(F)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?G[a]||H(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var I;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(I.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function J(){m.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1),o.ready()}o.ready.promise=function(b){return I||(I=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1))),I.promise(b)},o.ready.promise();var K=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function L(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}L.uid=1,L.accepts=o.acceptData,L.prototype={key:function(a){if(!L.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=L.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(F)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var M=new L,N=new L,O=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,P=/([A-Z])/g;function Q(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(P,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:O.test(c)?o.parseJSON(c):c}catch(e){}N.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return N.hasData(a)||M.hasData(a)},data:function(a,b,c){return N.access(a,b,c)},removeData:function(a,b){N.remove(a,b)},_data:function(a,b,c){return M.access(a,b,c)
},_removeData:function(a,b){M.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=N.get(f),1===f.nodeType&&!M.get(f,"hasDataAttrs"))){c=g.length;while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),Q(f,d,e[d]));M.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){N.set(this,a)}):K(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=N.get(f,a),void 0!==c)return c;if(c=N.get(f,d),void 0!==c)return c;if(c=Q(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=N.get(this,d);N.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&N.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){N.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=M.get(a,b),c&&(!d||o.isArray(c)?d=M.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return M.get(a,c)||M.access(a,c,{empty:o.Callbacks("once memory").add(function(){M.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=M.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var R=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,S=["Top","Right","Bottom","Left"],T=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},U=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var V="undefined";l.focusinBubbles="onfocusin"in a;var W=/^key/,X=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=/^([^.]*)(?:\.(.+)|)$/;function $(){return!0}function _(){return!1}function ab(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=M.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==V&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(F)||[""],j=b.length;while(j--)h=Z.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=M.hasData(a)&&M.get(a);if(r&&(i=r.events)){b=(b||"").match(F)||[""],j=b.length;while(j--)if(h=Z.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,M.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!Y.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,Y.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(M.get(g,"events")||{})[b.type]&&M.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(M.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=X.test(e)?this.mouseHooks:W.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ab()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ab()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?$:_):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:_,isPropagationStopped:_,isImmediatePropagationStopped:_,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=$,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=$,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=$,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=M.access(d,b);e||d.addEventListener(a,c,!0),M.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=M.access(d,b)-1;e?M.access(d,b,e):(d.removeEventListener(a,c,!0),M.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=_;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=_),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var bb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,cb=/<([\w:]+)/,db=/<|&#?\w+;/,eb=/<(?:script|style|link)/i,fb=/checked\s*(?:[^=]|=\s*.checked.)/i,gb=/^$|\/(?:java|ecma)script/i,hb=/^true\/(.*)/,ib=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,jb={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};jb.optgroup=jb.option,jb.tbody=jb.tfoot=jb.colgroup=jb.caption=jb.thead,jb.th=jb.td;function kb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function lb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function mb(a){var b=hb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function nb(a,b){for(var c=0,d=a.length;d>c;c++)M.set(a[c],"globalEval",!b||M.get(b[c],"globalEval"))}function ob(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(M.hasData(a)&&(f=M.access(a),g=M.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}N.hasData(a)&&(h=N.access(a),i=o.extend({},h),N.set(b,i))}}function pb(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function qb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&U.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=pb(h),f=pb(a),d=0,e=f.length;e>d;d++)qb(f[d],g[d]);if(b)if(c)for(f=f||pb(a),g=g||pb(h),d=0,e=f.length;e>d;d++)ob(f[d],g[d]);else ob(a,h);return g=pb(h,"script"),g.length>0&&nb(g,!i&&pb(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(db.test(e)){f=f||k.appendChild(b.createElement("div")),g=(cb.exec(e)||["",""])[1].toLowerCase(),h=jb[g]||jb._default,f.innerHTML=h[1]+e.replace(bb,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=pb(k.appendChild(e),"script"),i&&nb(f),c)){j=0;while(e=f[j++])gb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[M.expando],f&&(b=M.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);M.cache[f]&&delete M.cache[f]}delete N.cache[c[N.expando]]}}}),o.fn.extend({text:function(a){return K(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=kb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=kb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(pb(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&nb(pb(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(pb(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!eb.test(a)&&!jb[(cb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bb,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(pb(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(pb(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&fb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(pb(c,"script"),lb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,pb(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,mb),j=0;g>j;j++)h=f[j],gb.test(h.type||"")&&!M.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(ib,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var rb,sb={};function tb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function ub(a){var b=m,c=sb[a];return c||(c=tb(a,b),"none"!==c&&c||(rb=(rb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=rb[0].contentDocument,b.write(),b.close(),c=tb(a,b),rb.detach()),sb[a]=c),c}var vb=/^margin/,wb=new RegExp("^("+R+")(?!px)[a-z%]+$","i"),xb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function yb(a,b,c){var d,e,f,g,h=a.style;return c=c||xb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),wb.test(g)&&vb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function zb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Ab=/^(none|table(?!-c[ea]).+)/,Bb=new RegExp("^("+R+")(.*)$","i"),Cb=new RegExp("^([+-])=("+R+")","i"),Db={position:"absolute",visibility:"hidden",display:"block"},Eb={letterSpacing:0,fontWeight:400},Fb=["Webkit","O","Moz","ms"];function Gb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Fb.length;while(e--)if(b=Fb[e]+c,b in a)return b;return d}function Hb(a,b,c){var d=Bb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ib(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+S[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+S[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+S[f]+"Width",!0,e))):(g+=o.css(a,"padding"+S[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+S[f]+"Width",!0,e)));return g}function Jb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=xb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=yb(a,b,f),(0>e||null==e)&&(e=a.style[b]),wb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ib(a,b,c||(g?"border":"content"),d,f)+"px"}function Kb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=M.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&T(d)&&(f[g]=M.access(d,"olddisplay",ub(d.nodeName)))):f[g]||(e=T(d),(c&&"none"!==c||!e)&&M.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=yb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Gb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Cb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Gb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=yb(a,b,d)),"normal"===e&&b in Eb&&(e=Eb[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&Ab.test(o.css(a,"display"))?o.swap(a,Db,function(){return Jb(a,b,d)}):Jb(a,b,d):void 0},set:function(a,c,d){var e=d&&xb(a);return Hb(a,c,d?Ib(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=zb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},yb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+S[d]+b]=f[d]||f[d-2]||f[0];return e}},vb.test(a)||(o.cssHooks[a+b].set=Hb)}),o.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=xb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Kb(this,!0)},hide:function(){return Kb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){T(this)?o(this).show():o(this).hide()})}});function Lb(a,b,c,d,e){return new Lb.prototype.init(a,b,c,d,e)}o.Tween=Lb,Lb.prototype={constructor:Lb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Lb.propHooks[this.prop];return a&&a.get?a.get(this):Lb.propHooks._default.get(this)},run:function(a){var b,c=Lb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Lb.propHooks._default.set(this),this}},Lb.prototype.init.prototype=Lb.prototype,Lb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Lb.propHooks.scrollTop=Lb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Lb.prototype.init,o.fx.step={};var Mb,Nb,Ob=/^(?:toggle|show|hide)$/,Pb=new RegExp("^(?:([+-])=|)("+R+")([a-z%]*)$","i"),Qb=/queueHooks$/,Rb=[Wb],Sb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Pb.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Pb.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Tb(){return setTimeout(function(){Mb=void 0}),Mb=o.now()}function Ub(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=S[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Vb(a,b,c){for(var d,e=(Sb[b]||[]).concat(Sb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Wb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&T(a),p=M.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=ub(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ob.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=M.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;M.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Vb(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Xb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Yb(a,b,c){var d,e,f=0,g=Rb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Mb||Tb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Mb||Tb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Xb(k,j.opts.specialEasing);g>f;f++)if(d=Rb[f].call(j,a,k,j.opts))return d;return o.map(k,Vb,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Yb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Sb[c]=Sb[c]||[],Sb[c].unshift(b)},prefilter:function(a,b){b?Rb.unshift(a):Rb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(T).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Yb(this,o.extend({},a),f);(e||M.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=M.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Qb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=M.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ub(b,!0),a,d,e)}}),o.each({slideDown:Ub("show"),slideUp:Ub("hide"),slideToggle:Ub("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Mb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Mb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Nb||(Nb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Nb),Nb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Zb,$b,_b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return K(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===V?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?$b:Zb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(F);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b
}}}}}),$b={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=_b[b]||o.find.attr;_b[b]=function(a,b,d){var e,f;return d||(f=_b[b],_b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,_b[b]=f),e}});var ac=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return K(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||ac.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var bc=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(F)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(bc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(F)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(bc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(F)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===V||"boolean"===c)&&(this.className&&M.set(this,"__className__",this.className),this.className=this.className||a===!1?"":M.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(bc," ").indexOf(b)>=0)return!0;return!1}});var cc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(cc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var dc=o.now(),ec=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var fc,gc,hc=/#.*$/,ic=/([?&])_=[^&]*/,jc=/^(.*?):[ \t]*([^\r\n]*)$/gm,kc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,lc=/^(?:GET|HEAD)$/,mc=/^\/\//,nc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,oc={},pc={},qc="*/".concat("*");try{gc=location.href}catch(rc){gc=m.createElement("a"),gc.href="",gc=gc.href}fc=nc.exec(gc.toLowerCase())||[];function sc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(F)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function tc(a,b,c,d){var e={},f=a===pc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function uc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function vc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function wc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:gc,type:"GET",isLocal:kc.test(fc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":qc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?uc(uc(a,o.ajaxSettings),b):uc(o.ajaxSettings,a)},ajaxPrefilter:sc(oc),ajaxTransport:sc(pc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=jc.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||gc)+"").replace(hc,"").replace(mc,fc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(F)||[""],null==k.crossDomain&&(h=nc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===fc[1]&&h[2]===fc[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(fc[3]||("http:"===fc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),tc(oc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!lc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(ec.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=ic.test(d)?d.replace(ic,"$1_="+dc++):d+(ec.test(d)?"&":"?")+"_="+dc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+qc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=tc(pc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=vc(k,v,f)),u=wc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var xc=/%20/g,yc=/\[\]$/,zc=/\r?\n/g,Ac=/^(?:submit|button|image|reset|file)$/i,Bc=/^(?:input|select|textarea|keygen)/i;function Cc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||yc.test(a)?d(a,e):Cc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Cc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Cc(c,a[c],b,e);return d.join("&").replace(xc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Bc.test(this.nodeName)&&!Ac.test(a)&&(this.checked||!U.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(zc,"\r\n")}}):{name:b.name,value:c.replace(zc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Dc=0,Ec={},Fc={0:200,1223:204},Gc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Ec)Ec[a]()}),l.cors=!!Gc&&"withCredentials"in Gc,l.ajax=Gc=!!Gc,o.ajaxTransport(function(a){var b;return l.cors||Gc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Dc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Ec[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Fc[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Ec[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Hc=[],Ic=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Hc.pop()||o.expando+"_"+dc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Ic.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ic.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Ic,"$1"+e):b.jsonp!==!1&&(b.url+=(ec.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Hc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=w.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Jc=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Jc)return Jc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Kc=a.document.documentElement;function Lc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==V&&(e=d.getBoundingClientRect()),c=Lc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Kc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Kc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return K(this,function(b,e,f){var g=Lc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=zb(l.pixelPosition,function(a,c){return c?(c=yb(a,b),wb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Mc=a.jQuery,Nc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Nc),b&&a.jQuery===o&&(a.jQuery=Mc),o},typeof b===V&&(a.jQuery=a.$=o),o});
/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.isLoading=!1};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",f.resetText||d.data("resetText",d[e]()),d[e](f[b]||this.options[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},b.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});return this.$element.trigger(j),j.isDefaultPrevented()?void 0:(this.sliding=!0,f&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),f&&this.cycle(),this)};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(a){a&&a.target!=this.$element[0]||(this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse"))};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(a){a&&a.target!=this.$element[0]||(this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse"))};return a.support.transition?void this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);!e&&f.toggle&&"show"==c&&(c=!c),e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle="collapse"][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(jQuery),+function(a){"use strict";function b(b){a(d).remove(),a(e).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e='[data-toggle="dropdown"]',f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown",h),e.trigger("focus")}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=f.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+', [role="menu"], [role="listbox"]',f.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(300):c.$element.trigger("focus").trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());c.is("a")&&b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.trigger("focus")})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this,d=this.tip();this.setContent(),this.options.animation&&d.addClass("fade");var e="function"==typeof this.options.placement?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,g=f.test(e);g&&(e=e.replace(f,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(e),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var h=this.getPosition(),i=d[0].offsetWidth,j=d[0].offsetHeight;if(g){var k=this.$element.parent(),l=e,m=document.documentElement.scrollTop||document.body.scrollTop,n="body"==this.options.container?window.innerWidth:k.outerWidth(),o="body"==this.options.container?window.innerHeight:k.outerHeight(),p="body"==this.options.container?0:k.offset().left;e="bottom"==e&&h.top+h.height+j-m>o?"top":"top"==e&&h.top-m-j<0?"bottom":"right"==e&&h.right+i>n?"left":"left"==e&&h.left-i<p?"right":e,d.removeClass(l).addClass(e)}var q=this.getCalculatedOffset(e,h,i,j);this.applyPlacement(q,e),this.hoverState=null;var r=function(){c.$element.trigger("shown.bs."+c.type)};a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,r).emulateTransitionEnd(150):r()}},b.prototype.applyPlacement=function(b,c){var d,e=this.tip(),f=e[0].offsetWidth,g=e[0].offsetHeight,h=parseInt(e.css("margin-top"),10),i=parseInt(e.css("margin-left"),10);isNaN(h)&&(h=0),isNaN(i)&&(i=0),b.top=b.top+h,b.left=b.left+i,a.offset.setOffset(e[0],a.extend({using:function(a){e.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),e.addClass("in");var j=e[0].offsetWidth,k=e[0].offsetHeight;if("top"==c&&k!=g&&(d=!0,b.top=b.top+g-k),/bottom|top/.test(c)){var l=0;b.left<0&&(l=-2*b.left,b.left=0,e.offset(b),j=e[0].offsetWidth,k=e[0].offsetHeight),this.replaceArrow(l-f+j,j,"left")}else this.replaceArrow(k-g,k,"top");d&&e.offset(b)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(a(c).is("body")?window:c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);{var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})}},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(b.RESET).addClass("affix");var a=this.$window.scrollTop(),c=this.$element.offset();return this.pinnedOffset=c.top-a},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"top"==this.affixed&&(e.top+=d),"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){null!=this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:c-h-this.$element.height()}))}}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery);/**
 * string.js
 * James Padolsey
 * http://james.padolsey.com
 * -
 * Some useful additional methods for String.prototype.
 * - Added Huffamn encoding & decoding.
 */

(function(){
    
    var methods = {
        			
        /**
         * Returns string with all instances of "-word" replaced with "Word", E.g. "background-color" -> "backgroundColor"
		 *
         * @method camelize
         * @return {string}
         */
        camelize: function() {
                        
            return this.replace(/\-(\w)/g, function( $0, $1 ) {
                return $1.toUpperCase();
            });
        
        },
        
        /**
         * Returns boolean indicating whether or not a substring exists within the string
		 *
         * @method contains
         * @param {string} $what
         * @return {boolean}
         */
        contains: function( $what ) {
            
            $what = typeof $what === 'string' ? $what : $what.toString();
            
            return this.indexOf( $what ) > -1;
            
        },
        
        /**
         * Returns a number indicating how many times a substring or regex is matched within the string
		 *
         * @method count
         * @param {string} $what
         * @return {number}
         */
        count: function( $what ) {
            
            if ( Object.prototype.toString.call($what) !== '[object RegExp]' ) {
                $what = $what.toString().replace(/\$\^\[\]\{\}\(\)\?\:\.\+\*/g, '\\$1');
            }
            
            $what = RegExp( $what ? $what.source : '.', 'g' );
            
            return (this.match( what ) || []).length;
        },
        
        /**
         * Returns string with all instances of -w replaced with W, e.g. "background-color" -> "backgroundColor"
		 * TODO: Verifiy this function
         * @method enclose
         * @param {} a
         * @param {} b
         * @return BinaryExpression
         */
        enclose: function( a, b ) {
            
            return (a = a || '') + this + (b ? b : a);
            
        },
        
        /**
		  * Matches the string against the passed regex and the returns the group specified by _n_
		  * 
		  * E.g.
		  *     ('hi #boo and #adam').extract(/#(\w+)/g, 1);
		  *       => ['boo', 'adam']
		  *       
		  * If the regex is global then an array is returned otherwise just the matched group is returned.
		  *
         * @method extract
         * @param {string} regex
         * @param {number} n
         * @return {mixed}
         */
        extract: function( regex, n ) {
            
            n = n === undefined ? 0 : n;
            
            if ( !regex.global ) {
                return this.match(regex)[n] || '';
            }
            
            var match,
                extracted = [];
                
            while ( (match = regex.exec(this)) ) {
                extracted[extracted.length] = match[n] || '';
            }
            
            return extracted;
            
        },
        
        /**
         * Runs the passed function on every character, similar to Array.prototype.forEach
		 *
         * @method forEach
         * @param {function} fn
         * @return Literal
         */
        forEach: function( $fn ) {
            
            var c, i = -1;
            
            while ( (c = this[++i]) ) {
                $fn.call( this, c, i );
            }
            
            return true;
        
        },
        
        /**
         * Runs the passed function on every word, similar to Array.prototype.forEach
		 *
         * @method forEachWord
         * @param {function} fn
         * @return Literal
         */
        forEachWord: function( $fn ) {
            
            var string = this,
                i = -1;
            
            string.replace(/\b([\w\-]+)\b/g, function( match, word ){
                $fn.call( string, word, ++i );
                return match;
            });
            
            return true;
        
        },
        
        /**
         * Returns a string with all URLs replaced with HTML anchor tags.
		 *
         * @method linkify
         * @param {} replacement
         * @return CallExpression
         */
        linkify: function( $replacement ) {
            
            return this.replace(/(^|\s)((?:f|ht)tps?:\/\/[^\s]+)/g, $replacement || '$1<a href="$2">$2</a>');
            
        },
        
        /**
         * Returns a string which is made up of _n_ instances of the original string. E.g. "a".many(3) => "aaa"
		 *
         * @method many
         * @param {number} n
         * @return {string}
         */
        many: function( n ) {
            
            return Array(n ? n + 1 : 2).join(this);
            
        },
        
        /**
         * Randomizes a string; messes up all the characters. E.g. "abcdef".randomize() => "bcfdea"
		 *
         * @method randomize
         * @return CallExpression
         */
        randomize: function() {
            
            return this.split('').sort(function(){
                return Math.random() > 0.5 ? -1 : 1;
            }).join('');
            
        },
        
        /**
         * Returns a string with all matches of $what (regex) removed.
		 *
         * @method remove
         * @param {string} $what
         * @return {string}
         */
        remove: function( $what ) {
            
            return this.replace( $what || /./g, '' );
            
        },
        
        /**
         * Returns the string, reversed.
		 *
         * @method reverse
         * @return {string}
         */
        reverse: function() {
            
            return this.split('').reverse().join('');
            
        },
        
        /**
         * Shortens the string by the specified amount and appends the token.
         * E.g.
         * "this is a long sentance".shorten(10, '...');
         *  => "this is a ..."
         * 
         * @method shorten
         * @param {} $length
         * @param {} token
         * @return BinaryExpression
         */
        shorten: function( $length, $token ) {
            
            var substrd = this.substring( 0, $length || this.length );
            
            return substrd + ( substrd === this ? '' : ($token || '') );
            
        },
        
        /**
         * Runs the Array.sort() method on every character of the string.
		 *
         * @method sort
         * @return CallExpression
         */
        sort: function() {
            
            return Array.prototype.sort.apply( this.split(''), arguments ).join('');
        
        },
        
        /**
         * Returns the DOM representation of the string, in the form of an array of DOM nodes.
		 *
         * @method toDOM
         * @return CallExpression
         */
        toDOM: function() {
            
            var temp = document.createElement('div');
            temp.innerHTML = this;
            
            return Array.prototype.slice.call( div.childNodes );
            
        },
        
        /**
         * Returns the string with leading and trailing spaces removed.
		 *
         * @method trim
         * @return CallExpression
         */
        trim: function() {
            
            return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        
        },
        
        /**
         * Wraps the string.
         * E.g.
         * "the dog realllly wet".wrap(4, '<br/>')
         *  => "the <br/>dog <br/>realllly <br/>wet"
         * 
         * @method wrap
         * @param {number} width
         * @param {string} brk
         * @param {} cut
         * @return {string}
         */
        wrap: function( width, brk, cut ) {
            
            brk = brk || '\n';
            width = width || 75;
            cut = cut || false;
         
            if (!this) { return this; }
         
            var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');
         
            return this.match( RegExp(regex, 'g') ).join( brk );
            
        }
        
    };
    
    /* This is where each method is added to String.prototype
       ( assuming it's not already there ) */
    for (var method in methods) {
        String.prototype[method] = String.prototype[method] || methods[method];
    }
    
})();
/**
 * @project maestro
 * @author Andrew Donelson <andrew@i2tmlabs.com>
 * @license http://i2tmlabs.com/license.html
 * @namespace
 * @name CS2I
 */

/**
 * Runs an applet
 * @function
 * @global
 * @param {string} $applet
 * @memberof CS2I
 */
RUN = function ($applet) {
	if (this['vld'](nldr.bootstrap)) r2wl.applets.use({file:$applet});
}

/**
 * Enhanced function for determining the given parameter in a standard accurate way.
 * @method isa
 * @param {mixed} $e
 * @returns {string} $t
 * @memberof CS2I
 */
ISA=function($e) {
	/**
	 * Figure out what the parameter is
	 * @method what
	 * @param {mixed} $e
	 * @returns {string}
	 * @private
	 * @memberof fn.isa
	 */
	 //replace( '[' || /./g, '' )
	what = function($e) { return Object.prototype.toString.call($e).replace( '[' || /./g, '' ).replace( ']' || /./g, '' ).split(' ').pop(); }
	/**
	 * Determine the kind
	 * @method kind
	 * @param {mixed} $k
	 * @param {mixed} $e
	 * @private
	 * @returns string
	 * @memberof fn.isa
	 */
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
}

/**
 * Static class with lots of device information.
 *
 * @class I$Device
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Device',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
        pixelRatio:0,
        isiPhone:false,
        isiPhone4:false,
        isiPad:false,
        isiPod: false,
        isAndroid:false,
        isTouch:false,
        isFirefox:false,
        isChrome:false,
        isOpera:false,
        isIE:false,
        ieVersion:0,
        requestAnimFrame:null,
        hasMemoryProfiling:false,
        canPlayOgg: false,
        canPlayMP3: false,
        canPlayWav: false,

        /**
         * Description
         * @method init
         * @returns none 
         */
        init:function ()
        {
            this.pixelRatio = window.devicePixelRatio || 1;
            this.isiPhone = navigator.userAgent.toLowerCase().indexOf('iphone') != -1;
            this.isiPod = navigator.userAgent.toLowerCase().indexOf('ipod') != -1;
            this.isiPhone4 = (this.pixelRatio == 2 && this.isiPhone);
            this.isiPad = navigator.userAgent.toLowerCase().indexOf('ipad') != -1;
            this.isAndroid = navigator.userAgent.toLowerCase().indexOf('android') != -1;
            this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
            this.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
            this.isOpera = navigator.userAgent.toLowerCase().indexOf('opera') != -1;
            this.isTouch = window.ontouchstart !== 'undefined';
            this.isiOS = (this.isiPhone || this.iPad || this.isiPod);

            if (window.performance != undefined)
                this.hasMemoryProfiling = (window.performance.memory);

            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
            {
                this.ieVersion = new Number(RegExp.$1);
                this.isIE = true;
            }

            // determine what sound formats we can play
            var check = new Audio();
            if (check.canPlayType('audio/ogg')) this.canPlayOgg = true;
            if (check.canPlayType('audio/mpeg')) this.canPlayMP3 = true;
            if (check.canPlayType('audio/x-wav')) this.canPlayWav = true;

            this.requestAnimFrame = (function ()
            {
                var request =
                    window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function (callback, element)
                        {
                            window.setTimeout(callback, 16, Date.now());
                        };

                // apply to our window global to avoid illegal invocations (it's a native)
                return function (callback, element)
                {
                    request.apply(window, [callback, element]);
                };
            })();

            // todo:
            // highres timer
            // game pads
            // fullscreen api
            // mouse lock
        },

        /**
         * Description
         * @method canPlay
         * @param {} format
         * @returns Literal
         */
        canPlay: function(format)
        {
            if (format.toLowerCase() === 'mp3' && this.canPlayMP3) return true;
            if (format.toLowerCase() === 'ogg' && this.canPlayOgg) return true;
            if (format.toLowerCase() === 'wav' && this.canPlayWav) return true;
            return false;
        },

        /**
         * Description
         * @method getUsedHeap
         * @returns ConditionalExpression
         */
        getUsedHeap:function ()
        {
            return this.hasMemoryProfiling ? window.performance.memory.usedJSHeapSize : 0;
        },

        /**
         * Description
         * @method getTotalHeap
         * @returns ConditionalExpression
         */
        getTotalHeap:function ()
        {
            return this.hasMemoryProfiling ? window.performance.memory.totalJSHeapSize : 0;
        }
	},
	/** @lends I$Interface.prototype */
	{
		// Singleton static class, so nothing required here
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

/**
 * A map of linked lists mapped by a string value
 *
 * @class I$HashList
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$HashList',
	
	/** @lends I$Interface */
	{		
	},
	/** @lends I$Interface.prototype */
	{
        /** Internal hash table of lists */
        hashtable: null,

        /**
         * Constructs a new hash list
         * @constructor init
         * @returns none
         */
        init: function()
        {
            this['hashtable'] = create('I$Hashtable');
        },

        /**
         * Add an object to a list based on the given key. If the list doesn't yet exist it will be constructed.
         * @method add
         * @param {String} key Key
         * @param {Object} object Object to store
         */
        add: function(key, object)
        {
            // find the list associated with this key and add the object to it
            var list = this['hastable']['get'](key);
            if (list == null)
            {
                // no list associated with this key yet, so let's make one
                list = create('LinkedList');
                this['hastable']['put'](key, list);
            }
            list['add'](object);
        },

        /**
         * Removes an object from the list
         * @method remove
         * @param {String} key Key for the list to remove the object from
         * @param {Object} object Object to remove
         */
        remove: function(key, object)
        {
            var list = this['hastable']['get'](key);
            if (list == null) throw "No list for a key in hashlist when removing";
            list['remove'](object);
        },

        /**
         * Get a list associated with a given key
         * @method get
         * @param {String} key The key
         * @returns {LinkedList} The list
         */
        get: function(key)
        {
            return this['hastable']['get'](key);
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
	
/**
 * Copyright 2010 Tim Down.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author: Tim Down <tim@timdown.co.uk>
 * Version: 2.1
 * Build date: 21 March 2010
 * Website: http://www.timdown.co.uk/jshashtable
 *
 * (Slight mod to add to CS2I namespace -- martin@playcraftlabs.com)
 *
 * jshashtable is a JavaScript implementation of a hash table. It creates a single constructor function called Hashtable
 * in the global scope.
 * Example:
 * <code>
 *     var map = new CS2I.Hashtable();
 *     map.put('test1', obj);
 *     var obj = map.get('test1');
 * </code>
 * @class CS2I.Hashtable
 * @memberof CS2I
 */
P$['interfaces']['Classes']['Hashtable'] = (function ()
{
    var FUNCTION = "function";

    var arrayRemoveAt = (typeof Array.prototype.splice == FUNCTION) ?
        function (arr, idx)
        {
            arr.splice(idx, 1);
        } :

        function (arr, idx)
        {
            var itemsAfterDeleted, i, len;
            if (idx === arr.length - 1)
            {
                arr.length = idx;
            } else
            {
                itemsAfterDeleted = arr.slice(idx + 1);
                arr.length = idx;
                for (i = 0, len = itemsAfterDeleted.length; i < len; ++i)
                {
                    arr[idx + i] = itemsAfterDeleted[i];
                }
            }
        };

    /**
     * Description
     * @method hashObject
     * @param {} obj
     * @returns none 
     */
    function hashObject(obj)
    {
        var hashCode;
        if (typeof obj == "string")
        {
            return obj;
        } else if (typeof obj.hashCode == FUNCTION)
        {
            // Check the hashCode method really has returned a string
            hashCode = obj.hashCode();
            return (typeof hashCode == "string") ? hashCode : hashObject(hashCode);
        } else if (typeof obj.toString == FUNCTION)
        {
            return obj.toString();
        } else
        {
            try
            {
                return String(obj);
            }
            catch (ex)
            {
                // For host objects (such as ActiveObjects in IE) that have no toString() method and throw an error when
                // passed to String()
                return Object.prototype.toString.call(obj);
            }
        }
    }

    /**
     * Description
     * @method equals_fixedValueHasEquals
     * @param {} fixedValue
     * @param {} variableValue
     * @returns CallExpression
     */
    function equals_fixedValueHasEquals(fixedValue, variableValue)
    {
        return fixedValue.equals(variableValue);
    }

    /**
     * Description
     * @method equals_fixedValueNoEquals
     * @param {} fixedValue
     * @param {} variableValue
     * @returns ConditionalExpression
     */
    function equals_fixedValueNoEquals(fixedValue, variableValue)
    {
        return (typeof variableValue.equals == FUNCTION) ?
            variableValue.equals(fixedValue) : (fixedValue === variableValue);
    }

    /**
     * Description
     * @method createKeyValCheck
     * @param {} kvStr
     * @returns FunctionExpression
     */
    function createKeyValCheck(kvStr)
    {
        return function (kv)
        {
            if (kv === null)
            {
                throw new Error("null is not a valid " + kvStr);
            } else if (typeof kv == "undefined")
            {
                throw new Error(kvStr + " must not be undefined");
            }
        };
    }

    var checkKey = createKeyValCheck("key"), checkValue = createKeyValCheck("value");

    /**
     * Description
     * @method Bucket
     * @param {} hash
     * @param {} firstKey
     * @param {} firstValue
     * @param {} equalityFunction
     * @returns none
     */
    function Bucket(hash, firstKey, firstValue, equalityFunction)
    {
        this[0] = hash;
        this.entries = [];
        this['add']['Entry'](firstKey, firstValue);

        if (equalityFunction !== null)
        {
            /**
             * Description
             * @method getEqualityFunction
             * @returns equalityFunction
             */
            this.getEqualityFunction = function ()
            {
                return equalityFunction;
            };
        }
    }

    var EXISTENCE = 0, ENTRY = 1, ENTRY_INDEX_AND_VALUE = 2;

    /**
     * Description
     * @method createBucketSearcher
     * @param {} mode
     * @returns FunctionExpression
     */
    function createBucketSearcher(mode)
    {
        return function (key)
        {
            var i = this.entries.length, entry, equals = this.getEqualityFunction(key);
            while (i--)
            {
                entry = this.entries[i];
                if (equals(key, entry[0]))
                {
                    switch (mode)
                    {
                        case EXISTENCE:
                            return true;
                        case ENTRY:
                            return entry;
                        case ENTRY_INDEX_AND_VALUE:
                            return [ i, entry[1] ];
                    }
                }
            }
            return false;
        };
    }

    /**
     * Description
     * @method createBucketLister
     * @param {} entryProperty
     * @returns FunctionExpression
     */
    function createBucketLister(entryProperty)
    {
        return function (aggregatedArr)
        {
            var startIndex = aggregatedArr.length;
            for (var i = 0, len = this.entries.length; i < len; ++i)
            {
                aggregatedArr[startIndex + i] = this.entries[i][entryProperty];
            }
        };
    }

    Bucket.prototype = {
        /**
         * Description
         * @method getEqualityFunction
         * @param {} searchValue
         * @returns ConditionalExpression
         */
        getEqualityFunction:function (searchValue)
        {
            return (typeof searchValue.equals == FUNCTION) ? equals_fixedValueHasEquals : equals_fixedValueNoEquals;
        },

        getEntryForKey:createBucketSearcher(ENTRY),

        getEntryAndIndexForKey:createBucketSearcher(ENTRY_INDEX_AND_VALUE),

        /**
         * Description
         * @method removeEntryForKey
         * @param {} key
         * @returns Literal
         */
        removeEntryForKey:function (key)
        {
            var result = this.getEntryAndIndexForKey(key);
            if (result)
            {
                arrayRemoveAt(this.entries, result[0]);
                return result[1];
            }
            return null;
        },

        /**
         * Description
         * @method addEntry
         * @param {} key
         * @param {} value
         * @returns none 
         */
        addEntry:function (key, value)
        {
            this.entries[this.entries.length] = [key, value];
        },

        keys:createBucketLister(0),

        values:createBucketLister(1),

        /**
         * Description
         * @method getEntries
         * @param {} entries
         * @returns none 
         */
        getEntries:function (entries)
        {
            var startIndex = entries.length;
            for (var i = 0, len = this.entries.length; i < len; ++i)
            {
                // Clone the entry stored in the bucket before adding to array
                entries[startIndex + i] = this.entries[i].slice(0);
            }
        },

        containsKey:createBucketSearcher(EXISTENCE),

        /**
         * Description
         * @method containsValue
         * @param {} value
         * @returns Literal
         */
        containsValue:function (value)
        {
            var i = this.entries.length;
            while (i--)
            {
                if (value === this.entries[i][1])
                {
                    return true;
                }
            }
            return false;
        }
    };

    // Supporting functions for searching hashtable buckets

    /**
     * Description
     * @method searchBuckets
     * @param {} buckets
     * @param {} hash
     * @returns Literal
     */
    function searchBuckets(buckets, hash)
    {
        var i = buckets.length, bucket;
        while (i--)
        {
            bucket = buckets[i];
            if (hash === bucket[0])
            {
                return i;
            }
        }
        return null;
    }

    /**
     * Description
     * @method getBucketForHash
     * @param {} bucketsByHash
     * @param {} hash
     * @returns ConditionalExpression
     */
    function getBucketForHash(bucketsByHash, hash)
    {
        var bucket = bucketsByHash[hash];

        // Check that this is a genuine bucket and not something inherited from the bucketsByHash's prototype
        return ( bucket && (bucket instanceof Bucket) ) ? bucket : null;
    }

    /**
     * Description
     * @method Hashtable
     * @param {} hashingFunctionParam
     * @param {} equalityFunctionParam
     * @returns none   
     */
    function Hashtable(hashingFunctionParam, equalityFunctionParam)
    {
        var that = this;
        var buckets = [];
        var bucketsByHash = {};

        var hashingFunction = (typeof hashingFunctionParam == FUNCTION) ? hashingFunctionParam : hashObject;
        var equalityFunction = (typeof equalityFunctionParam == FUNCTION) ? equalityFunctionParam : null;

        /**
         * Description
         * @method put
         * @param {} key
         * @param {} value
         * @returns oldValue
         */
        this.put = function (key, value)
        {
            checkKey(key);
            checkValue(value);
            var hash = hashingFunction(key), bucket, bucketEntry, oldValue = null;

            // Check if a bucket exists for the bucket key
            bucket = getBucketForHash(bucketsByHash, hash);
            if (bucket)
            {
                // Check this bucket to see if it already contains this key
                bucketEntry = bucket.getEntryForKey(key);
                if (bucketEntry)
                {
                    // This bucket entry is the current mapping of key to value, so replace old value and we're done.
                    oldValue = bucketEntry[1];
                    bucketEntry[1] = value;
                } else
                {
                    // The bucket does not contain an entry for this key, so add one
                    bucket.addEntry(key, value);
                }
            } else
            {
                // No bucket exists for the key, so create one and put our key/value mapping in
                bucket = new Bucket(hash, key, value, equalityFunction);
                buckets[buckets.length] = bucket;
                bucketsByHash[hash] = bucket;
            }
            return oldValue;
        };

        /**
         * Description
         * @method get
         * @param {} key
         * @returns Literal
         */
        this.get = function (key)
        {
            checkKey(key);

            var hash = hashingFunction(key);

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, hash);
            if (bucket)
            {
                // Check this bucket to see if it contains this key
                var bucketEntry = bucket.getEntryForKey(key);
                if (bucketEntry)
                {
                    // This bucket entry is the current mapping of key to value, so return the value.
                    return bucketEntry[1];
                }
            }
            return null;
        };

        /**
         * Description
         * @method containsKey
         * @param {} key
         * @returns ConditionalExpression
         */
        this.containsKey = function (key)
        {
            checkKey(key);
            var bucketKey = hashingFunction(key);

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, bucketKey);

            return bucket ? bucket.containsKey(key) : false;
        };

        /**
         * Description
         * @method containsValue
         * @param {} value
         * @returns Literal
         */
        this.containsValue = function (value)
        {
            checkValue(value);
            var i = buckets.length;
            while (i--)
            {
                if (buckets[i].containsValue(value))
                {
                    return true;
                }
            }
            return false;
        };

        /**
         * Description
         * @method clear
         * @returns none 
         */
        this.clear = function ()
        {
            buckets.length = 0;
            bucketsByHash = {};
        };

        /**
         * Description
         * @method isEmpty
         * @returns {boolean}
         */
        this.isEmpty = function ()
        {
            return !buckets.length;
        };

        /**
         * Description
         * @method createBucketAggregator
         * @param {} bucketFuncName
         * @returns FunctionExpression
         */
        var createBucketAggregator = function (bucketFuncName)
        {
            return function ()
            {
                var aggregated = [], i = buckets.length;
                while (i--)
                {
                    buckets[i][bucketFuncName](aggregated);
                }
                return aggregated;
            };
        };

        this.keys = createBucketAggregator("keys");
        this.values = createBucketAggregator("values");
        this.entries = createBucketAggregator("getEntries");

        /**
         * Description
         * @method remove
         * @param {} key
         * @returns oldValue
         */
        this.remove = function (key)
        {
            checkKey(key);

            var hash = hashingFunction(key), bucketIndex, oldValue = null;

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, hash);

            if (bucket)
            {
                // Remove entry from this bucket for this key
                oldValue = bucket.removeEntryForKey(key);
                if (oldValue !== null)
                {
                    // Entry was removed, so check if bucket is empty
                    if (!bucket.entries.length)
                    {
                        // Bucket is empty, so remove it from the bucket collections
                        bucketIndex = searchBuckets(buckets, hash);
                        arrayRemoveAt(buckets, bucketIndex);
                        delete bucketsByHash[hash];
                    }
                }
            }
            return oldValue;
        };

        /**
         * Description
         * @method size
         * @returns total
         */
        this.size = function ()
        {
            var total = 0, i = buckets.length;
            while (i--)
            {
                total += buckets[i].entries.length;
            }
            return total;
        };

        /**
         * Description
         * @method each
         * @param {} callback
         * @returns none
         */
        this.each = function (callback)
        {
            var entries = that.entries(), i = entries.length, entry;
            while (i--)
            {
                entry = entries[i];
                callback(entry[0], entry[1]);
            }
        };

        /**
         * Description
         * @method putAll
         * @param {} hashtable
         * @param {} conflictCallback
         * @returns none
         */
        this.putAll = function (hashtable, conflictCallback)
        {
            var entries = hashtable.entries();
            var entry, key, value, thisValue, i = entries.length;
            var hasConflictCallback = (typeof conflictCallback == FUNCTION);
            while (i--)
            {
                entry = entries[i];
                key = entry[0];
                value = entry[1];

                // Check for a conflict. The default behaviour is to overwrite the value for an existing key
                if (hasConflictCallback && (thisValue = that.get(key)))
                {
                    value = conflictCallback(key, thisValue, value);
                }
                that.put(key, value);
            }
        };

        /**
         * Description
         * @method clone
         * @returns clone
         */
        this.clone = function ()
        {
            var clone = new Hashtable(hashingFunctionParam, equalityFunctionParam);
            clone.putAll(that);
            return clone;
        };

        /**
         * Description
         * Added by martin@playcratlabs.com to support debug dumping of hash arrays
         * @method toString
         * @returns result
         */
        this.toString = function ()
        {
            var result = '';
            var keys = this.keys();
            for (var i = 0; i < keys.length; i++)
            {
                var obj = this.get(keys[i]);
                result += keys[i].toString() + ' = ' + obj.toString() + '\n';
            }

            return result;
        }
    }

    return Hashtable;
})();


	
/**
 * A high-performance doubly-linked list intended for use in gaming
 *
 * @class I$LinkedListNode
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$LinkedListNode',
	
	/** @lends I$Interface */
	{		
	},
	/** @lends I$Interface.prototype */
	{
        obj:null, // the object reference
        nextLinked:null, // link to next object in the list
        prevLinked:null, // link to previous object in the list
        free:true,

        /**
         * Navigate to the next node in the list
         * @method next
         * @returns {CS2I.LinkedListNode} Next node on the list
		 * @memberof LinkedListNode
         */
        next:function ()
        {
            return this['nextLinked'];
        },

        /**
         * Object this node represents on the list
         * @method object
         * @returns {Object} 
		 * @memberof LinkedListNode
         */
        object:function ()
        {
            return this['obj'];
        },

        /**
         * Navigate to the previous node in the list
         * @method prev
         * @returns {CS2I.LinkedListNode} Prev node on the list
		 * @memberof LinkedListNode
         */
        prev:function ()
        {
            return this['prevLinked'];
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

/**
 * A high-speed doubly linked list of objects. Note that for speed reasons (using a dictionary lookup of
 * cached nodes) there can only be a single instance of an object in the list at the same time. Adding the same
 * object a second time will result in a silent return from the add method.
 * <p>
 * In order to keep a track of node links, an object must be able to identify itself with a getUniqueId() function.
 * <p>
 * To add an item use:
 * <pre><code>
 *   list.add(newItem);
 * </code></pre>
 * <p>
 * You can iterate using the first and next members, such as:
 * <pre><code>
 *   var node = list.first;
 *   while (node)
 *   {
 *       node['obj']ect().DOSOMETHING();
 *       node = node['next']();
 *   }
 * </code></pre>
 *
 * @class I$LinkedList
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$LinkedList',
	
	/** @lends I$Interface */
	{		
	},
	/** @lends I$Interface.prototype */
	{
        first:null,
        last:null,
        count:0,
        objToNodeMap:null, // a quick lookup list to map linked list nodes to objects

        /**
         * Constructs a new linked list
         * @method init
		 * @memberof LinkedList
         */
        init:function ()
        {
            this['_super']();
            this['objToNodeMap'] = P$['create']('Hashtable');
        },

        /**
         * Get the LinkedListNode for this object.
         * @method getNode
         * @param obj The object to get the node for
         * @returns CallExpression
		 * @memberof LinkedList
         */
        getNode:function (obj)
        {
            // objects added to a list must implement a getUniqueId which returns a unique object identifier string
            // or just extend CS2I.Base to get it for free
            return this['objToNodeMap']['get'](obj['getUniqueId']());
        },

        /**
         * Adds a specific node to the list -- typically only used internally unless you're doing something funky
         * Use add() to add an object to the list, not this.
         * @method addNode
         * @param {object} obj
         * @returns node
		 * @memberof LinkedList
         */
        addNode:function (obj)
        {
            var node = new CS2I.LinkedNode();
            node['obj'] = obj;
            node['prevLinked'] = null;
            node['nextLinked'] = null;
            node['free'] = false;
            this['objToNodeMap']['put'](obj['getUniqueId'](), node);
            return node;
        },

        /**
         * Add an item to the list
         * @method add
         * @param obj The object to add
		 * @memberof LinkedList
         */
        add:function (obj)
        {
            var node = this['getNode'](obj);
            if (node == null)
            {
                node = this['addNode'](obj);
            } else
            {
                // if the object is already in the list just throw an (can't add an object more than once)
                // if you want to quickly check if an item is already in a list, then call list.has(obj)
                if (node['free'] == false)
                    throw 'Attempting to add object: ' + obj['getUniqueId']() + ' twice to list ' + this['getUniqueId']();

                // reusing a node, so we clean it up
                // this caching of node/object pairs is the reason an object can only exist
                // once in a list -- which also makes things faster (not always creating new node
                // object every time objects are moving on and off the list
                node['obj'] = obj;
                node['free'] = false;
                node['nextLinked'] = null;
                node['prevLinked'] = null;
            }

            // append this obj to the end of the list
            if (this['first'] == null) // is this the first?
            {
                this['first'] = node;
                this['last'] = node;
                node['nextLinked'] = null; // clear just in case
                node['prevLinked'] = null;
            } else
            {
                if (this['last'] == null)
                    throw "Hmm, no last in the list -- that shouldn't happen here";

                // add this entry to the end of the list
                this['last']['nextLinked'] = node; // current end of list points to the new end
                node['prevLinked'] = this['last'];
                this['last'] = node;            // new object to add becomes last in the list
                node['nextLinked'] = null;      // just in case this was previously set
            }
            this.count++;

            if (this['showDebug']) this['dump']('after add');
        },

        /**
         * Description
         * @method has
         * @param {object} obj
         * @returns {boolean}
		 * @memberof LinkedList
         */
        has:function (obj)
        {
            var node = this['getNode'](obj);
            return !(node == null || node['free'] == true);
        },

        /**
         * Moves this item upwards in the list
         * @method moveUp
         * @param obj
		 * @memberof LinkedList
         */
        moveUp:function (obj)
        {
            this['dump']('before move up');
            var c = this['getNode'](obj);
            if (!c) throw "Oops, trying to move an object that isn't in the list";
            if (c['prevLinked'] == null) return; // already first, ignore

            // This operation makes C swap places with B:
            // A <-> B <-> C <-> D
            // A <-> C <-> B <-> D

            var b = c['prevLinked'];
            var a = b['prevLinked'];

            // fix last
            if (c == this['last'])
                this['last'] = b;

            var oldCNext = c['nextLinked'];

            if (a)
                a['nextLinked'] = c;
            c['nextLinked'] = b;
            c['prevLinked'] = b['prevLinked'];

            b['nextLinked'] = oldCNext;
            b['prevLinked'] = c;

            // check to see if we are now first
            if (this['first'] == b)
                this['first'] = c;
        },

        /**
         * Moves this item downwards in the list
         * @method moveDown
         * @param obj
         * @returns none 
		 * @memberof LinkedList
         */
        moveDown:function (obj)
        {
            var b = this['getNode'](obj);
            if (!b) throw "Oops, trying to move an object that isn't in the list";
            if (b['nextLinked'] == null) return; // already last, ignore

            // This operation makes B swap places with C:
            // A <-> B <-> C <-> D
            // A <-> C <-> B <-> D

            var c = b['nextLinked'];
            this.moveUp(c['obj']);

            // check to see if we are now last
            if (this['last'] == c)
                this['last'] = b;
        },

        /**
         * sort list
         * @method sort
         * @param {} compare
         * @returns none 
		 * @memberof LinkedList
         */
        sort:function (compare)
        {
            // take everything off the list and put it in an array
            var sortArray = [];
            var node = this['first'];
            while (node)
            {
                sortArray.push(node['obj']['ect']());
                node = node['next']();
            }

            this.clear();

            // sort it
            sortArray.sort(compare);

            // then put it back
            for (var i = 0; i < sortArray.length; i++)
                this['add'](sortArray[i]);
        },

        /**
         * Removes an item from the list
         * @method remove
         * @param obj The object to remove
         * @returns boolean true if the item was removed, false if the item was not on the list
		 * @memberof LinkedList
         */
        remove:function (obj)
        {
            if (this['showDebug']) this['dump']('before remove of ' + obj);
            var node = this['getNode'](obj);
            if (node == null || node['free'] == true)
                return false; // ignore this error (trying to remove something not there
            //throw ('Error: trying to remove a node (' + obj + ') that isnt on the list ');

            // pull this object out and tie up the ends
            if (node['prevLinked'] != null)
                node['prevLinked']['nextLinked'] = node['nextLinked'];
            if (node['nextLinked'] != null)
                node['nextLinked']['prevLinked'] = node['prevLinked'];

            // fix first and last
            if (node['prevLinked'] == null) // if this was first on the list
                this['first'] = node['nextLinked']; // make the next on the list first (can be null)
            if (node['nextLinked'] == null) // if this was the last
                this['last'] = node['prevLinked']; // then this nodes previous becomes last

            node['free'] = true;
            node['prevLinked'] = null;
            node['nextLinked'] = null;

            this.count--;
            if (this['showDebug']) this['dump']('after remove');

            return true;
        },

        /**
         * Clears the list out
         * @method clear
		 * @memberof LinkedList
         */
        clear:function ()
        {
            // sweep the list and free all the nodes
            var next = this['first'];
            while (next != null)
            {
                next['free'] = true;
                next = next['nextLinked'];
            }
            this['first'] = null;
            this.count = 0;
        },

        /**
         * Description
         * @method length
         * @returns MemberExpression
		 * @memberof LinkedList
         */
        length:function ()
        {
            return this['count'];
        },

        /**
         * Outputs the contents of the current list. Usually for debugging.
         * @method dump
         * @param {string} msg
         * @returns none 
		 * @memberof LinkedList
         */
        dump:function (msg)
        {
            this['debug']('====================' + msg + '=====================');
            var a = this['first'];
            while (a != null)
            {
                this['debug']("{" + a['obj'].toString() + "} previous=" + ( a['prevLinked'] ? a['prevLinked']['obj'] : "NULL"));
                a = a['next']();
            }
            this['debug']("===================================");
            this['debug']("Last: {" + (this['last'] ? this['last']['obj'] : 'NULL') + "} " + "First: {" + (this['first'] ? this['first']['obj'] : 'NULL') + "}");
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


/**
 * Example:
 * <code>
 * var measure = new CS2I.PerformanceMeasure('A test');
 * // ... do something
 * log(measure.end()); // end returns a string you can easily log
 * </code>
 *
 * The memory count is an idea based on a delta of the useJSHeapSize exposed by Chrome.
 * You will need to restart Chrome with --enable-memory-info to have this exposed.
 * It is however, not very reliable as the value will jump around due to gc runs (I think).
 * So far it seems to produce reliable results that are consistent, however memStart > memEnd
 * cases still occur and it would be good to understand this more (is it limited only to GC
 * runs? if so, why is it so consistent?).
 *
 * @class I$PerformanceMeasure
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$PerformanceMeasure',
	
	/** @lends I$Interface */
	{		
		history: [],

		/**
		 * Clears the performance history
		 * @method clearHistory
		 * @memberof PerformanceMeasure
		 */
		clearHistory: function()
		{
			history['length'] = 0;
		}
	},
	/** @lends I$Interface.prototype */
	{
		timeStart: 0,
		timeEnd: 0,
		timeDelat: 0,
		memStart: 0,
		memEnd: 0,
		memDelta: 0,
		description: null,

		/**
		 * Constructs a new performance measure with description
		 * @method init
		 * @param description
		 * @memberof PerformanceMeasure
		 */
		init: function(description)
		{
			this.description = description;
			this.start();
			this['Class'].history.push(this);
		},

		/**
		 * Starts a performance measure
		 * @method start
		 * @returns none 
		 * @memberof PerformanceMeasure
		 */
		start: function()
		{
			this.timeStart = Date.now();
			this.memStart = CS2I.Device.getUsedHeap();
		},

		/**
		 * Ends a performance measure, and for convenience returns a toString of the measurement
		 * @method end
		 * @returns String representing the measurement
		 * @memberof PerformanceMeasure
		 */
		end: function()
		{
			this.timeEnd = Date.now();
			this.timeDelta = this.timeEnd - this.timeStart;
			this.memEnd = CS2I.Device.getUsedHeap();

			if (this.memEnd < this.memStart)
				this.memDelta = 0;
			else
				this.memDelta = this.memEnd - this.memStart;
			return this.toString();
		},

		/**
		 * Reports the performance measurement in a nice clean way
		 * @method toString
		 * @returns {boolean}
		 * @memberof PerformanceMeasure
		 */
		toString: function()
		{
			return this.description + ' took ' + this.timeDelta + 'ms, ' +
				(this.memDelta == 0 ? 'unknown':this.memDelta) + ' byte(s)';
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

/**
 * Easy (high-performance) object pooling
 *
 * A pool of objects for use in situations where you want to minimize object life cycling (and
 * subsequently garbage collection). It also serves as a very high speed, minimal overhead
 * collection for small numbers of objects.
 * <p>
 * This class maintains mutual an array of objects which are free. If you wish to maintain a list of both
 * free and used then see the CS2I.DualPool.
 * <p>
 * Pools are managed by class type, and will auto-expand as required. You can create a custom initial pool
 * size by deriving from the Pool class and statically overriding INITIAL_POOL_SIZE.
 * <p>
 * Keep in mind that objects that are pooled are not constructed; they are "reset" when handed out.
 * You need to "acquire" one and then reset its state, usually via a static create factory method.
 * <p>
 * Example:
 * <pre><code>
 * Point = CS2I.Pooled('Point',
 * {
 *   // Static constructor
 *   create:function (x, y)
 *   {
 *      var n = this['_super']();
 *      n.x = x;
 *      n.y = y;
 *      return n;
 *   }
 * },
 * {
 *    x:0, y:0,   // instance
 *
 *    init: function(x, y)
 *    {
 *       this.x = x;
 *       this.y = y;
 *    }
 * }
 * </code></pre>
 * To then access the object from the pool, use create, instead of new. Then release it.
 * <pre><code>
 * var p = Point.create(100, 100);
 * // ... do something
 * p.release();
 * </code></pre>
 *
 * @class I$Pool
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Pool',
	
	/** @lends I$Interface */
	{		
        /** Initial size of all object pools */
        INITIAL_POOL_SIZE:1,

        /** Hashtable of ALL the object pools */
        pools:new P$['interfaces']['Classes']['Hashtable'](),
        /** total objects in all pools */
        totalPooled:0,
        /** total objects in use right now */
        totalUsed:0,

        /**
         * Acquire an object from a pool based on the class[name]. Typically this method is
         * automatically called from Pooled.create method and should not be used directly.
         * @method acquire
         * @param {String} classType Class of object to create
         * @returns {CS2I.Pooled} A shiny object you can then configure
		 * @memberof Pool
         */
        acquire:function (classType)
        {
            var pool = this.getPool(classType);
            if (pool == undefined || pool == null)
            {
                // create a pool for this type of class
                //this['info']('Constructing a new pool for ' + classType.fullName + ' objects.');
                pool = new CS2I.Pool(classType, this.INITIAL_POOL_SIZE);
                this.pools.put(classType.fullName, pool);
            }

            return pool.acquire();
        },

        /**
         * Releases an object back into it's corresponding object pool
         * @method release
         * @param {CS2I.Pooled} pooledObj Object to return to the pool
		 * @memberof Pool
         */
        release:function (pooledObj)
        {
            var pool = this.pools.get(pooledObj.Class.fullName);
            if (pool == undefined)
                throw "Oops, trying to release an object of type " + pooledObj.Class.fullName +
                    " but no pool exists. Did you new an object instead of using create.";

            pool.release(pooledObj);
        },

        /**
         * Returns the pool associated with the given classType, or null if no pool currently exists.
         * @method getPool
         * @returns {CS2I.Pool} Object pool associated with the class type
		 * @memberof Pool
         */
        getPool:function (classType)
        {
            return this.pools.get(classType.fullName);
        },

        /**
         * Gets stats on the usage of all pools.
         * @method getStats
         * @returns {String} Stats string
		 * @memberof Pool
         */
        getStats:function ()
        {
            var s = '';

            var keys = this.pools.keys();
            for (var i = 0; i < keys.length; i++)
            {
                var key = keys[i];
                var pool = this.pools.get(key);
                s += key + ': ' + pool.getStats()  + '\n';
            }

            return s;
        }
	},
	/** @lends I$Interface.prototype */
	{
        /** Linked list of currently free objects residing in the pool */
        freeList:null,
        /** Current number of items to expand by: will increase with every expansion */
        expansion: 1,
        /** Array of traces currently active. Tracing must be on. */
        traces: null,

        /**
         * Constructs a pool. Will automatically be called by the static pool method. Generally not called directly.
         * @method init
         * @param {String} classType Class name of the type of objects in the pool
         * @param {Number} initial Starting number of objects in the pool
		 * @memberof Pool
         */
        init:function (classType, initial)
        {
            this['_super']();
            this.classType = classType;
            this.freeList = [];

            // instantiate the initial objects for the pool
            this.expand(initial);
        },

        /**
         * Enables tracing on this pool.
         * @method startTracing
		 * @memberof Pool
         */
        startTracing:function ()
        {
            if (this.tracing) return;
            this.tracing = true;
            if (this.traces)
                this.traces.clear();
            else
                this.traces = new CS2I.Hashtable();
        },

        /**
         * Disables tracing on this pool.
         * @method stopTracing
		 * @memberof Pool
         */
        stopTracing:function ()
        {
            this.tracing = false;
        },

        /**
         * Expand the pool of objects by constructing a bunch of new ones. The pool will
         * automatically expand itself by 10% each time it runs out of space, so generally you
         * shouldn't need to use this.
         * @method expand
         * @param {Number} howMany Number of new objects you want to add
		 * @memberof Pool
         */
        expand:function (howMany)
        {
            CS2I.Pool.totalPooled += howMany;

            //debug: if you want to track expansion
            //this['debug']('expanding ' + this.classType.fullName + ' by ' + howMany + ' total=' + CS2I.Pool.totalPooled);

            for (var i = 0; i < howMany; i++)
                this.freeList.push(new this.classType());
        },

        /**
         * Gets the free count of objects left in the pool
         * @method getFreeCount
         * @returns {Number} Number free
		 * @memberof Pool
         */
        getFreeCount: function()
        {
            return this.freeList.length;
        },

        /**
         * Returns the next free object by moving it from the free pool to the used one. If no free objects are
         * available it will expand the pool
         * @method acquire
         * @returns {CS2I.Pooled} A pooled object
		 * @memberof Pool
         */
        acquire:function ()
        {
            // check if we have anymore to give out
            if (this.freeList.length <= 0)
            {
                // create some more space (expand by 20%, minimum 1)
                this.expansion = Math.round(this.expansion*1.2)+1;
                this.expand(this.expansion);
            }

            // if (this.tracing)
            // {
                // var stack = printStackTrace();
                // var pos = stack.length - 1;
                // while (stack[pos].indexOf('Class.addTo') == 0 && pos > 0)
                    // pos--;
                // var count = this.traces.get(stack[pos]);
                // if (count == null)
                    // this.traces.put(stack[pos], { value:1 });
                // else
                    // count.value++;
            // }

            return this.freeList.pop();
        },

        /**
         * Releases an object by moving it back onto the free pool
         * @method release
         * @param {CS2I.Pooled} obj The obj to release back into the pool
         * @returns none 
		 * @memberof Pool
         */
        release:function (obj)
        {
            this.freeList.push(obj);
        },

        /**
         * Gets stats about the pool
         * @method getStats
         * @returns {String} Stats
		 * @memberof Pool
         */
        getStats:function ()
        {
            var s = this['Class'].fullName + ' stats: ' + this.freeList.length + ' free.';

            if (this.tracing)
            {
                s += 'TRACING\n';
                var traceKeys = this.traces.keys();
                for (var k in traceKeys)
                    s += traceKeys[k] + ' (' + this.traces.get(traceKeys[k]).value + ')\n';
            }
            return s;
        },

        /**
         * Dumps contents of the pool to through info logging (usually console). Mostly used for debugging the pooling
         * system, mostly.
         * @method dump
         * @param {String} msg A string to write before the dump
		 * @memberof Pool
         */
        dump:function (msg)
        {
            this['info']('================== ' + msg + ' ===================');
            this['info']('FREE');
            this.freeList.dump();
        },

        /**
         * Returns the number of objects in the pool
         * @method size
         * @returns {Number} Total objects
		 * @memberof Pool
         */
        size:function ()
        {
            return this.freeList.length;
        },

        /**
         * Returns the LinkedList of currently free objects in the pool
         * @method getFreeList
         * @returns {CS2I.LinkedList} List of free objects
		 * @memberof Pool
         */
        getFreeList:function ()
        {
            return this.freeList;
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

 
/**
 * Easy (high-performance) object pooling
 *
 * A pool of objects for use in situations where you want to minimize object life cycling (and
 * subsequently garbage collection). It also serves as a very high speed, minimal overhead
 * collection for small numbers of objects.
 * <p>
 * This class maintains mutual set of doubly-linked lists in order to differentiate between
 * objects that are in use and those that are unallocated from the pool. This allows for much
 * faster cycling of only the in-use objects.
 * <p>
 * Pools are managed by class type, and will auto-expand as required. You can create a custom initial pool
 * size by deriving from the Pool class and statically overriding INITIAL_POOL_SIZE.
 * <p>
 * Keep in mind that objects that are pooled are not constructed; they are "reset" when handed out.
 * You need to "acquire" one and then reset its state, usually via a static create factory method.
 * <p>
 * Example:
 * <code>
 * Point = CS2I.Pooled('Point',
 * {
 *   // Static constructor
 *   create:function (x, y)
 *   {
 *      var n = this['_super']();
 *      n.x = x;
 *      n.y = y;
 *      return n;
 *   }
 * },
 * {
 *    x:0, y:0,   // instance
 *
 *    init: function(x, y)
 *    {
 *       this.x = x;
 *       this.y = y;
 *    }
 * }
 * </code>
 * To then access the object from the pool, use create, instead of new. Then release it.
 * <code>
 * var p = Point.create(100, 100);
 * // ... do something
 * p.release();
 * </code>
 *
 * @class I$DualPool
 * @extends I$Pool
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Pool',

	//What is the name of your new interface?
	'I$DualPool',
	
	/** @lends I$Pool */
	{		
        /**
         * Acquire an object from a pool based on the class[name]. Typically this method is
         * automatically called from Pooled.create method and should not be used directly.
         * @method acquire
		 * @protected
         * @param {String} classType Class of object to create
         * @returns {CS2I.Pooled} A shiny object you can then configure
		 * @memberof DualPool
         */
        acquire:function (classType)
        {
            var pool = this.getPool(classType);
            if (pool == undefined || pool == null)
            {
                pool = new CS2I.DualPool(classType, this.INITIAL_POOL_SIZE);
                this.pools.put(classType.fullName, pool);
            }

            return pool.acquire();
        },

        /**
         * Gets stats on the usage of all pools.
         * @method getStats
		 * @protected
		 * @memberof DualPool
         * @returns {String} Stats string
         */
        getStats:function ()
        {
            var s = '';

            var keys = this.pools.keys();
            for (var i = 0; i < keys.length; i++)
            {
                var key = keys[i];
                var pool = this.pools.get(key);
                s += key + ' (free: ' + pool.freeList.length() + ' used: ' + pool.usedList.length() + ')\n';
            }
            return s;
        }
	},
	/** @lends I$Pool.prototype */
	{
        /** Linked list of currently free objects residing in the pool */
        freeList:null,
        /** Linked list of currently used objects not in the pool */
        usedList:null,

        /**
         * Constructs a pool. Will automatically be called by the static pool method. Generally not called directly.
         * @method init
		 * @memberof DualPool
         * @param {String} classType Class name of the type of objects in the pool
         * @param {Number} initial Starting number of objects in the pool
         */
        init:function (classType, initial)
        {
            this.classType = classType;
            this.usedList = new CS2I.LinkedList();
            this.freeList = new CS2I.LinkedList();

            // instantiate the initial objects for the pool
            this.expand(initial);
        },

        /**
         * Expand the pool of objects by constructing a bunch of new ones. The pool will
         * automatically expand itself by 10% each time it runs out of space, so generally you
         * shouldn't need to use this.
         * @method expand
		 * @memberof DualPool
         * @param {Number} howMany Number of new objects you want to add
         */
        expand:function (howMany)
        {
            CS2I.Pool.totalPooled += howMany;
            for (var i = 0; i < howMany; i++)
                this.freeList.add(new this.classType());
        },

        returnObj:null,

        /**
         * Returns the next free object by moving it from the free pool to the used one.
         * @method acquire
		 * @memberof DualPool
         * @returns {CS2I.DualPooled} A pooled object you can then configure
         */
        acquire:function ()
        {
            // check if we have anymore to give out
            if (this.freeList.first == null)
            // create some more space (expand by 20%, minimum 1)
                this.expand(Math.round(this.size() / 5) + 1);

            this.returnObj = this.freeList.first.obj;
            this.freeList.remove(this.returnObj);
            this.returnObj.destroyed = false;
            this.usedList.add(this.returnObj);

            // if (this.tracing)
            // {
                // var stack = printStackTrace();
                // var pos = stack.length - 1;
                // while (stack[pos].indexOf('Class.addTo') == 0 && pos > 0)
                    // pos--;
                // var count = this.traces.get(stack[pos]);
                // if (count == null)
                    // this.traces.put(stack[pos], { value:1 });
                // else
                    // count.value++;
            // }

            return this.returnObj;
        },

        /**
         * Releases an object by moving it from the used list back to the free list.
         * @param obj {CS2I.DualPooled} The obj to release back into the pool
		 * @memberof DualPool
         * @method release
         */
        release:function (obj)
        {
            this.freeList.add(obj);
            this.usedList.remove(obj);
        },

        /**
         * Dumps stats about usage to the debug info (generally console)
         * @method dump
		 * @memberof DualPool
         * @param {String} msg Message to display before the dump
         */
        dump:function (msg)
        {
            this['info']('================== ' + msg + ' ===================');
            this['info']('FREE');
            this.freeList.dump();
            this['info']('USED');
            this.usedList.dump();
        },

        /**
         * Returns the number of objects in both the free and used pool
         * @method size
		 * @memberof DualPool
         * @returns {boolean}
         */
        size:function ()
        {
            return this.freeList.count + this.usedList.count;
        },

        /**
         * Returns the LinkedList of current used objects
         * @method getUsedList
		 * @memberof DualPool
         * @returns {CS2I.LinkedList}
         */
        getUsedList:function ()
        {
            return this.usedList;
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


/**
 * Used as a base class for objects which are life cycle managed in an object pool.
 *
 * @class I$Pooled
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Pooled',
	
	/** @lends I$Interface */
	{		
        /**
         * Static factory method for creating a new object based on its class. This method
         * should be called using this['_super'] from the Class.create that derives from this.
         * @method create
		 * @memberof Pooled
         * @returns {CS2I.Pooled} An object from the pool
         */
        create:function ()
        {
            return CS2I.Pool.acquire(this);
        },

        /**
         * Get the object pool associated with this object class
         * @method getPool
		 * @memberof Pooled
         * @returns {CS2I.Pool} The object pool
         */
        getPool:function ()
        {
            return CS2I.Pool.getPool(this);
        }

	},
	/** @lends I$Interface.prototype */
	{
        /** Has the object been destroyed (returned to the pool) */
        destroyed:false,

        /**
         * Constructor for the object (default calls base class init)
		 * @memberof Pooled
         * @method init
         */
        init:function ()
        {
            this['_super']();
        },

        /**
         * Release the object back into the pool
         * @method release
		 * @memberof Pooled
         */
        release:function ()
        {
            this.onRelease();
            CS2I.Pool.release(this);
        },

        /**
         * Template callback when an object is released; gives you a chance to do your own cleanup / releasing
         * @method onRelease
		 * @memberof Pooled
         */
        onRelease:function ()
        {
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


/**
 * Used as a base class for objects which are life cycle managed in an object pool (the DualPool edition)
 *
 * @class I$DualPooled
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$DualPooled',
	
	/** @lends I$Interface */
	{		
        /**
         * Static factory method for creating a new object based on its class. This method
         * should be called using this['_super'] from the Class.create that derives from this.
         * @method create
		 * @memberof DualPooled
         * @returns {CS2I.Pooled} An object from the pool
         */
        create:function ()
        {
            return CS2I.DualPool.acquire(this);
        },

        /**
         * Get the object pool associated with this object class
         * @method getPool
		 * @memberof DualPooled
         * @returns {CS2I.Pool} The object pool
         */
        getPool:function ()
        {
            return CS2I.DualPool.getPool(this);
        }
	},
	/** @lends I$Interface.prototype */
	{
        /** Has the object been destroyed (returned to the pool) */
        destroyed:false,

        /**
         * Constructor for the object (default calls base class init)
         * @method init
		 * @memberof DualPooled
         */
        init:function ()
        {
            this['_super']();
        },

        /**
         * Release the object back into the pool
         * @method release
		 * @memberof DualPooled
         */
        release:function ()
        {
            this.onRelease();
            CS2I.DualPool.release(this);
        },

        /**
         * Template callback when an object is released; gives you a chance to do your own cleanup / releasing
         * @method onRelease
		 * @memberof DualPooled
         */
        onRelease:function ()
        {
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

	
if (!Function.prototype.bind)
{
    Function.prototype.bind = function (oThis)
    {
        if (typeof this !== "function") // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function ()
            {
            },
            fBound = function ()
            {
                return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}

if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function (searchElement /*, fromIndex */)
    {
        "use strict";
        if (this == null)
        {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0)
        {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0)
        {
            n = Number(arguments[1]);
            if (n != n)
            { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity)
            {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len)
        {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++)
        {
            if (k in t && t[k] === searchElement)
            {
                return k;
            }
        }
        return -1;
    }
}

/**
 *  Accurate self adjusting global timer
 * See the example:
 *
 *     @example
 *     // Run for 5 secs @ 10 FPS will fire trigger every 100ms
 *     AccuTimer(5000, 10, function($steps,$count,$fps)
 *     {
 *     		//Add code here for every interval
 *		},
 *		function()
 *		{
 *			//Timer done, add cleanup code here 
 *		});
 *
 * @class I$AccuTimer
 * @extends I$Interface
 * @memberof Maestro
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$AccuTimer', 
    {
		timer:null,
		
		/**
		 * Sets a new timer
		 *
		 * @method set
		 * @access private
		 * @param  {number} $length time in milliseconds to run for
		 * @param  {number} $fps desired FPS, ie 60 $fps = 16.66ms interval
		 * @param  {function} on_instance called each interval
		 * @param  {function} oncomplete called when desired interval reached
		 * @returns none 
		 * @memberof AccuTimer
		 */
		create : function($length, $fps, $oninterval, $ondone)
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
			 * @instance
			 * @access private
			 * @memberof AccuTimer.set
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
					this['timer']=setTimeout(_instance, ($speed - diff));
				}
				
			}
			this['timer']=setTimeout(_instance, $speed);
		},

		/**
		 * Callback function for AccuTimer object
		 * @method CallMebackIn
		 * @access private
		 * @param {number} ms
		 * @param {function} callback
		 * @returns number 
		 * @memberof AccuTimer
		 */
		CallMebackIn : function(ms,callback) {
			if(this['vld'](callback)) return window.setTimeout(callback, ms);
		}
    },
    {
        // Singleton static class, so nothing required here
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
/**
 * Short Description
 *
 * @class I$FactoryWorker
 * @extends I$Pooled
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Pooled',

	//What is the name of your new interface?
	'I$FactoryWorker',
	
	/** @lends I$Pooled */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
		
		//Used by factory to clean house if enabled.
		_lastUsed: 0,

		/**
		 *
		 * @param  
		 * {url} url url to the applet - http://applets.i2tmlabs.com/ + path/to/applet/applet.someAppletName.html
		 * @return {Applet} A Applet if successful, Applet Name if failed.
		 */
		create: function($data)
		{
			var n = this['_super']();

			if (n.parse($data))
				return n
			else
				return n.name;
		}
	},
	/** @lends I$Pooled.prototype */
	{
	},
	{
	},
	[]
);


/**
 * For creating like objects. Just an interface class that allows you extend from to create a factory
 * that allows easy creation, use and removal of like objects, like Entities or Sounds, Layers, ect.
 *
 * @class I$Factory
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Factory',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0		
	},
	/** @lends I$Interface.prototype */
	{
		//called when an object is added or removed
		onChanged:function() {},
		
		/** Object Store **/
		objects: {},

		//Set this to how many seconds an object can sit idle (no use() call before it is discarded.
		//0 is default and indefinite.
		idleLifeSpan: 0,
					
		//the number of objects loaded in factory
		count:	0,
		
		init:function($name,$lifespan)
		{
			this['_super']();
			M$.chk($name,'Undefined Factory');
			M$.chk($lifespan,0);
			this.factoryType = $name;
			this.setLife($lifespan);
			this['debug']($name+' Factory Initialized.');
		},
		
		setLife:function($seconds) {
			var $tmp = ($seconds*1000);
			if (this.idleLifeSpan != $tmp) {
				if ($tmp===0) this['debug']("Life Span is now indefinite."); else this['debug']("Life Span is set to "+this.idleLifeSpan+" seconds.");
				this.idleLifeSpan = $tmp;
			}
		},
		/**
		 * Used to create a new object and add it to the store. You MUST override this method
		 * in your own Object Factory. Look at Template entity.factory.js and sound.factory.js
		 * for a great example of usage.
		 */
		create:function ()
		{},

		/**
		 * Adds a new object to the store
		 *
		 * String name  Name for the object (NO SPACES)
		 * Object obj The actual object to store in this.objects[name]
		 * return Object
		 */
		add:function($name,$obj)
		{
			if (!this['vld']($obj)) {
				this['debug']('You cannot add ['+$name+'] which is null or undefined to the ['+this.factoryType+'] store');
			} else {
				if (typeof this.onChanged === 'function') this.onChanged({name:$name,action:'Added'});
				this.objects[$name] = $obj;
				this['debug'](this.factoryType+' '+$name+' has been added to factory.');
				this.count++;
				return this.objects[$name];
			}
		},

		/**
		 * Removes an object from the store
		 *
		 * String name  Name for the object (NO SPACES)
		 * Object obj The actual object to store in this.objects[name]
		 * return Object
		 */
		remove:function($name)
		{
			if (!this.exists($name)) return;
			
			try {
				if (typeof this.onChanged === 'function') this.onChanged({name:$name,action:'Removed'});
				delete this.objects[$name];
				this['debug'](this.factoryType+' '+$name+' has been removed from the factory.');
				this.count--;
				if (this.count<0) this.count=0;
			} catch (e) {
				this['error']('No object ['+$name+' exists in ['+this.factoryType+'] store to remove.');//debug
				return false;
			}
		},
		
		/**
		 * Checks to see if an object exists in the store
		 *
		 * String name  Name for the object (NO SPACES)
		 * return Boolean
		 */
		exists:function($name)
		{
			var $result;
			
			if (this.objects.hasOwnProperty($name)) {
				$result = true;
			} else {
				$result = true;
			}
			return $result;
		},
		
		/**
		 * Returns the requested object
		 *
		 * @param  String name String type of the object to use
		 * @param  Object options Simple object containing options for the desired entity/sound
		 * @return  {Sound|Entity}
		 */
		use:function($options)
		{
			var result;
			
			if (typeof $options != null && typeof $options === 'object') {
				if (this.exists($options.name)) {
					result = this.objects[$options.name];
				} else {
					result = this.create($options);
					//result = this.create($options);
					
				}
			} else {
				this['info']('Factory::use(object) - No longer takes 2 params, use object format.');
				result = null;
			}
			return result;
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
/**
 * <p>
 * Used to store files and variables on client device for offline use.
 * </p>
 * Client storage structure
 * common.*
 * domain.webapp.*
 * 
 * <pre><code>
 * 
 * </code></pre>
 *
 * @class I$DeviceStorage
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$DeviceStorage',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
		
		/**
		 * @property {boolean} supported
		 * @default false
		 * @memberof LocalStorage
		 */
		supported: null,
		
		config:null,
		
		/**
		 * Description
		 * @method create
		 * @param {} $manifest
		 * @return {boolean}
		 * @constructor 
		 */
		create: function(appcfg,$manifest) {
			this['config']=appcfg;
			this._addMethods(this);
			
			if (this._prepare($manifest))
				return this.prototype;
			else
				return false;
		},	
		
		/**
		 * Description
		 * @method _addMethods
		 * @return 
		 */
		_addMethods:function(self) {
			//Extend the localStorageObject to get/set objects
			/**
			 * Description
			 * @method setObject
			 * @param {} $key
			 * @param {} $value
			 * @return 
			 */
			Storage.prototype.setObject = function($key,$value) {
				var $tmp = JSON.stringify($value);
				this.setItem($key, $tmp);
			}

			//we only need to load once on page load
			/**
			 * Description
			 * @method getObject
			 * @param {} $key
			 * @return $tmp2
			 */
			Storage.prototype.getObject = function($key) {
				var $tmp = this.getItem($key);
				if (!self['vld']($tmp)) return;
				$tmp2 = JSON.parse($tmp);
				return $tmp2;
			}
		},
		
		/**
		 * Description
		 * @method setup
		 * @param {} $what
		 * @return 
		 */
		setup:function($what) {
			if (ISA($what)!=='String') return;
			if (!this['vld'](this.prototype.data[$what])) 
				this.prototype.data[$what] = {};
				
			if (!this['vld'](this.prototype.data[$what]['cfg'])) 
				this.prototype.data[$what]['cfg'] = {};
				
			if (!this['vld'](this.prototype.data[$what]['files'])) 
				this.prototype.data[$what]['files'] = {};
				
			//localStorage.setObject($what,this.prototype.data[$what]);
		},
		
		/**
		 * Description
		 * @method isSupported
		 * @return MemberExpression
		 */
		isSupported:function() {
			if (this.prototype.supported === true || this.prototype.supported === false) return this.prototype.supported; 
			var $msg = "Checking for Local Storage Support...";
			if (typeof(Storage)!=="undefined") {
			  $msg+="Supported.";
			  this.prototype.supported = true;
			} else {
			  $msg+="Not Supported.";
			  this.prototype.supported = false;
			}	
			this['info']($msg);
			return this.prototype.supported;
		},
		
		/**
		 * Description
		 * @method load
		 * @param {} $app
		 * @return 
		 */
		load:function($app) {
			this.prototype.data['global'] = localStorage.getObject('global');
			this.prototype.data[$app] = localStorage.getObject($app);
			this.setup('global');
			this.setup($app);
		},

		/**
		 * Description
		 * @method remove
		 * @param {} $where
		 * @return 
		 */
		remove:function($where) {
			if (this.isSupported()) {
				if ($where===0) $use='global'; else $use=this['config']['name'];
				localStorage.removeItem($use);
				this['debug']('Removed '+$use+'.');
			}
		},

		/**
		 * Description
		 * @method what_where
		 * @param {} $n
		 * @return 
		 */
		what_where:function($n) {
			if ($n===0) return {where:'global',what:'cfg'};
			else if ($n===1) return {where:'global',what:'files'};
			else if ($n===2) return {where:this['config']['name'],what:'cfg'};
			else if ($n===3) return {where:this['config']['name'],what:'files'};
			else return null;
		},
		
		/**
		 * Description
		 * @method get
		 * @param {} $key
		 * @param {} $loc
		 * @return Literal
		 */
		get:function($key,$loc) {
			if (this.isSupported()) {
				$use = this.what_where($loc);
					
				try {
					if ($key in this.prototype.data[$use.where][$use.what])
						return this.prototype.data[$use.where][$use.what][$key];
				} catch (e) {
					var foo='bar';
					// localStorage.removeItem(this.prototype.data[$use.where][$use.what][$key]);
					//this['debug']('Removed corrupted entry '+$use.where+'->'+$use.what+'->'+$key,this);
					//this['debug'](e.stack,this);
				}
			}
			return null;
		},
			
		/**
		 * Save data to localStorage for this domain.
		 * Data can settings that are Global to the domain or local to the cloudapp using (global & app or blank)
		 * data can be files from that are gloabl to the domain or to the cloud app using
		 * 
		 */
		/**
		 * Description
		 * @method set
		 * @param {} $key
		 * @param {} $value
		 * @param {} $loc
		 * @return 
		 */
		set:function($key,$value,$loc) {
			if (this.isSupported()) {
				var $use = this.what_where($loc);
								
				try {
					this.prototype.data[$use.where][$use.what][$key]=$value;
					localStorage.setObject($use.where,this.prototype.data[$use.where]);
					return this.prototype.data[$use.where][$use.what][$key];
				} catch (e) {
					this['debug'](e.stack);
				}
			}
		},

		/**
		 * Description
		 * @method _prepare
		 * @param {} $manifest
		 * @return Literal
		 */
		_prepare:function($manifest) {
			if (this.isSupported()) {
				
				this['config']['name'] = new String(this['config']['name'].split(' ').join('')).toLowerCase();

				//this.remove(0);
				//this.remove(1);
				//localStorage.clear();
				this.load(this['config']['name']);

				//See if core nano object data exist. if not new user? erased?
				if (!('firstVisit' in this.prototype.data.global.cfg))	{			
					//nano Global domain (everything on the actual domain. say devzone.i2tmlabs.com
					this.set('firstVisit', true,0);
					this.set('firstVisitTime', Date.now(),0);
				}
				if (!('firstVisit' in this.prototype.data[this['config']['name']].cfg))	{
					//App Domain
					this.set('firstVisit', true,2);
					this.set('firstVisitTime', Date.now(),2);
				}
			}
			return true;
		}
	},
	/** @lends I$Interface.prototype */
	{
		data:{},
			
		/**
		 * @public
		 * @method
		 * @memberof LocalStorage
		 * @desc
		 * </p>
		 * Handles / manages a the Local Starage system on HTML5 enabled devices
		 * </p>
		 */
		/**
		 * Description
		 * @method init
		 * @return 
		 */
		init: function () {
			this['_super']();
		},
		
		/**
		 * Description
		 * @method removeGlobal
		 * @return 
		 */
		removeGlobal:function() { this['Class'].remove(0); },
		/**
		 * Description
		 * @method removeApp
		 * @return 
		 */
		removeApp:function() { this['Class'].remove(1); },
		
		/**
		 * Description
		 * @method getGlobalCfg
		 * @param {} $key
		 * @return CallExpression
		 */
		getGlobalCfg:function($key) 		{ return this['Class'].get($key,0); },	
		/**
		 * Description
		 * @method setGlobalCfg
		 * @param {} $key
		 * @param {} $value
		 * @return 
		 */
		setGlobalCfg:function($key,$value) 	{ this['Class'].set($key,$value,0); },
		/**
		 * Description
		 * @method getGlobalFile
		 * @param {} $key
		 * @return CallExpression
		 */
		getGlobalFile:function($key) 		{ return this['Class'].get($key,1) },	
		/**
		 * Description
		 * @method setGlobalFile
		 * @param {} $key
		 * @param {} $value
		 * @return 
		 */
		setGlobalFile:function($key,$value)	{ this['Class'].set($key,$value,1); },

		/**
		 * Description
		 * @method getAppCfg
		 * @param {} $key
		 * @return CallExpression
		 */
		getAppCfg:function($key) 			{ return this['Class'].get($key,2) },	
		/**
		 * Description
		 * @method setAppCfg
		 * @param {} $key
		 * @param {} $value
		 * @return 
		 */
		setAppCfg:function($key,$value) 	{ this['Class'].set($key,$value,2); },
		/**
		 * Description
		 * @method getAppFile
		 * @param {} $key
		 * @return CallExpression
		 */
		getAppFile:function($key) 			{ return /*this['Class'].get($key,3)*/ },	
		/**
		 * Description
		 * @method setAppFile
		 * @param {} $key
		 * @param {} $value
		 * @return 
		 */
		setAppFile:function($key,$value) 	{ this['Class'].set($key,$value,3); }
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

 
/**
 * @module R2WL
 *
 * @class I$Launcher
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Launcher',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,
		
		appPaused : false,
		appRunning : false,
		btnPlay: null,
		canvas: null,
		gameClass:null,
		gldlActive:false,
		/**
		 * Description
		 * @method enableFS
		 * @return 
		 */
		enableFS: function() {
			if (this['canvas'] && !this['canvas'].fullScreen) {
				if(this['canvas'].requestFullscreen)
					this['canvas'].requestFullscreen();
				else if(this['canvas'].webkitRequestFullscreen)
					this['canvas'].webkitRequestFullscreen();
				else if(this['canvas'].mozRequestFullScreen)
					this['canvas'].mozRequestFullScreen();
				else if(this['canvas'].msRequestFullscreen)
					this['canvas'].msRequestFullscreen();
			}
		},

		/**
		 * Description
		 * @method disableFS
		 * @return 
		 */
		disableFS: function() {
			if (this['canvas'] && this['canvas'].fullScreen) {
				if (D$.exitFullscreen) {
					D$.exitFullscreen();
				} else if (D$.mozCancelFullScreen) {
					D$.mozCancelFullScreen();
				} else if (D$.webkitCancelFullScreen) {
					D$.webkitCancelFullScreen();
				} else if (D$.msExitFullScreen) {
					D$.msExitFullScreen();
				}
			}
		}
		
	},
	/** @lends I$Interface.prototype */
	{
		/**
		 * Object Initialization
		 * @method init
		 * @return 
		 */
		init: function() {
			this['_super']();
			this.test = create('I$DeviceTest');
			//this.toggle('loader',true,true);
		},
		
		getCanvas:function() { return this['Class'].canvas; },
		
		isActive:function() { return (nldr['config']['modules'].gldl && typeof gldl != "undefined")?true:false; },
		
		//if game running or play button is enabled and orientation 
		//is not approved by game then pause and display warning
		/**
		 * Determine device orientation and respond accordinaly
		 * @method testOrientation
		 * @return 
		 */
		testOrientation: function() {
			if (window.innerWidth > window.innerHeight) {
				//this.toggle('main',true,true);
				//jQuery("#main").show();
				//jQuery("#page_warning").hide();
				this['Class'].appPaused = false;
			} else {
				this['Class'].appPaused = true;
				//this.toggle('warning',true,true);
				//jQuery("#page_warning").show();
				//jQuery("#main").hide();
			}
		},

		/*---/ Load Support Files/--------------------*/
		dependentFiles:function() {
			if (!M$['getDevMode']()) {
				nldr.addFile('i2tm/js/gldl.release.js');
				return ['js/game.min.js'];
			} else {
				nldr.addFile('i2tm/js/gldl.local.js');
				return [
					'src/class.ai.js','src/class.enemy.js','src/class.fighter.js','src/class.weapon.js',
					'src/layer.game.js','src/layer.hud.js','src/layer.stars.js',
					'src/scene.game.js','src/scene.loading.js','src/scene.publisher.js',
					'src/system.prizedropper.js','src/tools.js',
					'src/physics.js','src/game.js'
				];
			}
		},
		
		createGame:function() {
		
			/*---/ Load Game Library Development Layer (GLDL) /-----------------------*/
			if (this['vld'](nldr['config']['modules'].gldl))
				nldr.que(this.dependentFiles(),true);
		},
		
		onLoad:function() {
			gldl = create('I$GLDL');
			this.onLoaded();
			gldl.device.boot(this.getCanvas().id, 'TheGame');
			r2wl.launcher.play();	
		},
		/**
		 * Pause GLDL app
		 * @method pauseGame
		 * @return 
		 */
		pauseGame: function() {
			if (!this.isActive()) return;
			this['Class'].btnPlay.textContent = 'Resume';
			if (typeof(gldl.device.game)!='undefined')
				gldl.device.game.pause();
				
			M$['on']("btnQuit");
			M$['on']("btnReset");
			this.toggle('main',true,true);
			this['Class'].appPaused = true;
		},

		/**
		 * Resume the GLDL app
		 * @method resumeGame
		 * @return 
		 */
		resumeGame: function() {
			if (!this.isActive()) return;
			if (typeof(gldl.device.game)!='undefined')
				gldl.device.game.resume();
				
			this.toggle('game',true,true);
			this['Class'].appPaused = false;
		},
			
		/**
		 * Enter into fullscreen mode
		 * @method enableFullscreen
		 * @return 
		 */
		enableFullscreen: function() {
			this['Class'].enableFS();
		},

		/**
		 * Disable or exit fullscreen mode
		 * @method disableFullscreen
		 * @return 
		 */
		disableFullscreen: function() {
			this['Class'].disableFS();
		},
		
		/**
		 * Reset the GLDL app
		 * @method reset
		 * @return 
		 */
		reset: function() {
			if (!this.isActive()) return;
			gldl.device.game.reset();
			jQuery("#btnQuit").hide();
		},
		
		/**
		 * Quit the GLDL app
		 * @method quit
		 * @return 
		 */
		quit: function() {
			if (!this.isActive()) return;
			if (r2wl.launcher.Class.btnPlay) {
				M$['off']("btnQuit");
				M$['off']("btnReset");
				this['Class'].btnPlay.textContent = 'Play';
			}
			
			this.disableFullscreen();
			this['Class'].appRunning = false;
			this['Class'].appPaused = false;
			
			if ((typeof gldl.device != "undefined") && (typeof gldl.device.game != "undefined"))
				delete gldl.device.game;
				
			this.toggle('main',true,true);
		},

		/**
		 * Start the GLDL App
		 * @method play
		 * @return 
		 */
		play: function() {
			//using HTML5 for fullscreen (only newest Chrome + FF)
			if (!this.isActive()) {this.createGame();return;}
			
			if (!this['vld'](gldl.device.game)) return;
			
			if (!this['Class'].appPaused) {
				this.toggle('game',true,true);
						
				this['Class'].canvas.width = screen.width;
				this['Class'].canvas.height = screen.height;
				this['Class'].canvas.style.width = this['Class'].canvas.width+"px";
				this['Class'].canvas.style.height = this['Class'].canvas.height+"px";
				this['Class'].canvas.style.background = "black";
				
				this.enableFullscreen();
				this['Class'].appRunning = false;
			} else {
				this.enableFullscreen();
				this.resumeGame();
			}
		},

		/**
		 * toggle displaying / hiding sections
		 * @method toggle
		 * @param {string} section
		 * @param {boolean} show
		 * @param {boolean} othersOff
		 * @return 
		 */
		toggle:function(section,show,othersOff) {
			section = section.toLowerCase();

			if (othersOff==true) {
				M$['off']("main");
				M$['off']("page_warning");
				M$['off']("page_game");
				M$['off']("page_loader");
			}
			
			switch (section) {
				case 'body':
					if (show) M$['on']("body"); else M$['off']("body");
					break;
					
				case 'main':
					if (show) M$['on']("main"); else M$['off']("main");
					break;
					
				case 'warning':
					if (show) M$['on']("page_warning"); else M$['off']("page_warning");
					break;
					
				case 'game':
					if (show) M$['on']("page_game"); else M$['off']("page_game");
					break;
					
				case 'loader':
					if (show) {
						//M$['on']("page_loader");
						//get("body")[0].style.visibility="hidden";
					} else {
						//get("body")[0].style.visibility="visible";
						//M$['off']("page_loader");
					}
					break;
			}
		},
		/**
		 * Called after document is loaded
		 * @method onLoaded
		 * @return 
		 */
		onLoaded:function() {
			var $l=r2wl.launcher;
			if (GLDL && nldr['config']['modules'].gldl) {
				this['info']('Game Mode Detected...');
				//Load WEBGAME API			
				
			}
			if (this.isActive()) {
				if (!$l.Class.btnPlay) {
					$l.Class.btnPlay = M$['gei']('btnPlay');
					$l.Class.btnPlay.innerHTML = 'Play';
				}
				
				if (!$l.Class.canvas) {
					$l.Class.canvas = M$['gei']("page_game");
					$l.Class.canvas.allowfullscreen = true;
				}
				$l.quit();
				
				window.addEventListener("orientationchange", function() {
					$l.testOrientation();
				}, false);

				// Listen for resize changes
				window.addEventListener("resize", function() {
					$l.testOrientation();		
				}, false);

				$l.testOrientation();
				
				r2wl.redraw();
				//r2wl.test.init();
				
			}
			//Turn off Page_Loader
			$l.toggle("main",true,false);
			//$l.toggle('loader',false,false);
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


/**
 * Internal Google Class - Google Tracking & adSense 
 *
 * @module MWDL
 * @class  Google
 */
/**
 * Short Description
 *
 * @class I$Google
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$Google',
	
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0		
	},
	/** @lends I$Interface.prototype */
	{
		/**
		 * This property is used to see if tracking is actually performed. It is used for debugging. If H5C3.devMode it true or location.protocol is "file" then this value is false.
		 *
		 * @property String $enabled 
		 * 
		 *  H5C3
		 */
		$enabled:false,
		$loaded:false,
		$analyticsLoaded:false,
		$adSenseLoaded:false,	
		$version:"",	
		$domain: null,
		$gaJsHost: null,
		$resizeTimer:null,
		
		/**
		 * Analytics and AdSense settings from Application Config
		 */
		config:{
			analytics:{
				trackingId:"",
				pageviews:true,
				clicks:true
			},
			ads:{
				clientId:"",
				ads:{}
			}
		},	
		
		/** @expose */
		parent:null,
		
		/**
		 * Initialization
		 *
		 * @constructor
		 */
		init: function(parent,cfg) {
			this['_super']();
			this['parent']=parent;
			this['config']=cfg;
			try {
				var _={};
				if (typeof cfg != "object") {
					this['debug']('No google configuration found in Application Config.');
					return
				} else {
					this['debug']("Preparing Google Analytics...");
					if (this['config']['analytics']['trackingid']==='') 
						this['warn']('You did not set your Google Unique ID in the config file.');
					else this['debug']('Using your Google Unique ID ' + this['config']['analytics']['trackingid']);
					this['enabled']=true;
				}
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},
		/**
		 * Main Google Command Function
		 *
		 * @method
		 */
		ga: function(i,s,o,g,r,a,m) {
			if (!this.$analyticsLoaded) return;
			window.ga(i,s,o,g,r,a,m);		
		},	
		
		push: function() {		
			if (this.$adSenseLoaded) {
				var _={};
				this['info']("Google Push.");
				try {
					(adsbygoogle = window.adsbygoogle || []).push({});
				} catch (e) {
					this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				}
			} else {
				ads = $(".adsbygoogle").css('background','#333');
			}
		},
		
		connect: function () {
			if (!this.$analyticsLoaded) return;
				var _={};
			
				this['debug']("Google Track.");
			try {
				window.ga('_setAccount',this['config']['analytics']['trackingid']); 
				window.ga('_setDomainName',document.location.host);
				window.ga('_addIgnoredOrganic',document.location.host);
				window.ga('_trackPageview');
				
			} catch(e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},
		
		remove:function($fromResize) {
			if (!this.$adSenseLoaded) return;
			var $ads,$slots=gec('adsbygoogle');
			if ($slots.length>0) {
				for (i=0;i<$slots.length-1;i++) {
					$slots[i].style.display='none';
					$slots[i].style.width='initial';
					$slots[i].removeAttribute('data-adsbygoogle-status');
					$slots[i].removeAttribute('data-ad-slot');
					//$slots[i].innerHTML='';
				}
				
				if ($fromResize) setTimeout(this['parent'].google.insert(),1000);
			}
		},
		
		insert:function() {
			getAds=function(config,$theme){
				if (typeof config.ads[$theme]=='object') {
					return $.map(config.ads[$theme], function(value, index) {
						return [value];
					});			
				}
				else this['parent'].google.debug('You have no ad slots designated for '+$theme+' theme.');
			}

			try {
				//All local variables defined in object _
				var _={ads:0,slots:0,abg:M$.gec('adsbygoogle'),result:false};
				
				//Don't do this anymore
				//var $total,$ads,$slots,$abg=gec('adsbygoogle');
				
				_.slots=(this['vld'](_.abg))?_.abg:[];
				
				if (_.slots.length>0) {
					_.ads=getAds(this.config,this['config']['app']['theme']);
					
					//both of these lines are removed in production
					if (_.ads.length<_.slots.length) this['debug'](_.slots.length+' Ad slots where found and only '+_.ads.length+' defined. Plese define '+(_.ads.length-_.slots.length)+' more ads for '+this['parent'].app.header.theme+' theme.');
					else this['debug'](_.slots.length+' Ad slots where found and '+_.ads.length+' defined.');
										
					//this line removed in production
					this['debug']('Inserting '+_.total+' Ads.');
					
					for (i=0;i<_.ads.length;i++) {
						_.slots[i].style.display='block';
						M$['esa'](_.slots[i],'data-ad-client',this.config.ads.clientId);
						M$['esa'](_.slots[i],'data-ad-slot',_.ads[i]);
						M$['esa'](_.slots[i],'data-ad-format','auto');
						this.push();
					}
					this.$adSenseLoaded=false;
					_.result=true;
				} 
				//this line removed in production		
				else {
					this['debug']('No Ad slots where found.');
					this['enabled']=false;
				}
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				this['enabled']=false;
				_.result=false;
			}
			return _.result;
		},
		
		delay:function() {
			//Disable display any more ads for 30 seconds to protect google interests
			this.$adSenseLoaded=false;
			this.resizeTimer=setTimeout(function(){this['parent'].google.$adSenseLoaded=true;window.clearTimeout(this['parent'].google.resizeTimer)},30000);			
		},
		
		load:function() {
			if (this['enabled']) {
				if (this.config.analytics) {
					this['parent']['addFile']('analytics.js','google','vendor');	
					this['debug']('Google Analytics API added to que.');
				}	
				if (this.config.ads) {
					this['parent']['addFile']('adsbygoogle.js','google','vendor');
					this['debug']('Google AdSense API added to que.');
				}
			}
		},
		
		check:function() {
			this.$analyticsLoaded=(M$['gei']('analytics.js')!=null)?true:false;
			this.$adSenseLoaded=(M$['gei']('adsbygoogle.js')!=null)?true:false;
		},
		
		loaded:function() {
			if (this['enabled']) {
				this.check();
				if (this.$analyticsLoaded==true) this.connect();
				if (this.$adSenseLoaded==true) this.insert();
			} 
			else {if (!this['enabled']) this['debug']('Google communication is NOT enabled.');}
		},
		
		onResize:function(){
			//Hide ads
			//this.remove(true);
			//wait a short time (after size change) then redisplay ads
			//setTimeout(this['parent'].google.insert(),250);	
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
/**
 * @namespace 
 * @name R2WL
 * @class  Applet
 * @requires maestro.CS2I
 */
 
/**
 * <p>A Applet resource. You can use this class to acquire Applets (loaded from a URI) and then use them in your CloudApp.</p>
 *
 * @class I$Applet
 * @extends I$Pooled
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Pooled',

	//What is the name of your new interface?
	'I$Applet',
	
	/** @lends I$Pooled */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
		
		/** 
		 * @property {object} 
		 * @memberof Applet
		 * @todo Move to private
		 */
		params: {
			/** 
			 * @property {array} 
			 * @memberof Applet.params
			 */
			required: ['role','name','version','uuid'],
			/** 
			 * @property {array} 
			 * @memberof Applet.params
			 */
			optional: ['author','copyright','shared','scale']
		},
			
		/**
		 * Constructs an Applet by acquiring it from the object pool. An applet had 4 required attributes
		 * ['role','name','version','uuid'] and 3 optional attributes ['author','copyright','scale'].
		 * 
		 * The name must be unique to your Applet Store. The UUID must be a valid and H5C3 Genuine which matches it
		 * to you, company or personal. It is strongly suggested that you use the version. End Users have the option
		 * of Automatically using the latest Applications and Applets, but that usually means stability issues. Using
		 * the version allows for saftey and less issues.
		 *
		 * @contructor
		 * @param  {string} url url to the applet - http://applets.i2tmlabs.com/ + path/to/applet/applet.someAppletName.html
		 * @returns {df.Applet} A df.Applet if successful, Applet Name if failed.
		 * @memberof Applet
		 */
		create: function($data,$active)
		{
			var n = this['_super']();
			if (n.parse(data,$active))
				return n
			else
				return n.name;
		}	
	},
	/** @lends I$Pooled.prototype */
	{
		State:{ QUEUED:0, LOADING:1, READY:2, ACTIVE:3, FAILED:4 },

		/** 
		 * @property {object} Header
		 * @memberof Applet
		 */
		header: {
			/** 
			 * @property {string} Applets Role 
			 * @memberof Applet.header
			 */
			role:		"applet",

			/** 
			 * @property {string} Applets Name 
			 * @memberof Applet.header
			 */
			name:		"default", 

			/** 
			 * @property {string} Applets version 
			 * @memberof Applet.header
			 */
			version:	"0.0.0", 

			/** 
			 * @property {string} Short Description
			 * @memberof Applet.header
			 */
			description:"",
					
			/** 
			 * @property {string} Applets Universally unique identifier 
			 * @memberof Applet.header
			 */
			uuid:		"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",

			/** 
			 * @property {string} Name of Registered Publisher
			 * @memberof Applet.header
			 */
			publisher:		"",

			/** 
			 * @property {string} Applets Author 
			 * @memberof Applet.header
			 */
			author:		"", 

			/** 
			 * @property {string} Applets Copyright 
			 * @memberof Applet.header
			 */
			copyright:	"2014 by {YOU} - All rights reserved.",

			/** 
			* @property {string} the Applets stylesheet-will be added/removed to head automatically 
			* @memberof Applet
			*/
			style:		"",

			/** 
			* @property {string} the Applets javascript-will be added/removed to head automatically 
			* @memberof Applet
			*/
			script:		"",

			/** 
			 * @property {string} the Applets html- place as variable {$applet:someAppletName} 
			 * @memberof Applet
			 */
			html:		"",
			
			/** 
			 * @callback {method} Define in applet JS to execute code when applet 
			 * is loaded but not yet displayed.
			 * @memberof Applet
			 */
			onload:null,

			/** 
			 * @callback {method} Define in applet JS to execute code when applet 
			 * is loaded but not yet displayed.
			 * @memberof Applet
			 */
			onunload:null
		},

		uri:		'',
		
		id:			"{AUTOSET}",		//role + . + name
			
		/** 
		 * @property {number} Current state of this applet
		 * @memberof Applet
		 */
		state: -1,
		
		
		/**
		 * Constructs a new Applet. If the loader has already started then the image will be
		 * immediately loaded, otherwise it will wait for the resource loader to handle the loading.
		 * @instance
		 * @param  String name Name to give the image resource
		 * @param  String src URI for the image
		 * @memberof Applet
		 */
		init:function ($data)
		{
			this['_super']();
			$data=$data[0];
			try {
				//IMPORTANT! if creating this applet fails, you must delete it
				if (this.makeURI($data)) {
					this.setState(0);
				}
			} catch (e) {
				var _={};
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));			}
			},

		setState:function(state){
			if (state<0||state>4) {
				this['warn']('Invalid State [QUEUED:0, LOADING:1, READY:2, FAILED:3]');
			} else {
				if (this.state!=state) {
					this.state=state;
					switch (this.state) {
						case this['State']['QUEUED']:
							this['debug'](this['header'].name+' has been queued.');
							break;
						case this['State']['LOADING']:
							this['debug'](this['header'].name+' is  being loaded.');
							this.fetch();
							break;
						case this['State']['READY']:
							this['debug'](this['header'].name+' is being embeded into the document.');
							this.embed();
							break;
						case this['State']['ACTIVE']:
							this['debug'](this['header'].name+' is now Active.');
							break;
						case this['State']['FAILED']:
							this['debug'](this['header'].name+' has failed.');
							break;
					}
				this['debug'](this['header'].name+' state changed.');				
				}
			}
		},
			
		makeURI:function($data) {
			var _={path:null,fileName:null,ext:null};
			
			try {
				//this['debug']('Processing '+this['header'].name);
				
				//Prepare basic header
				this['header']['name']=(this['vld']($data['dataset']['applet']))?$data['dataset']['applet']:false;
				this['header']['role']=(this['vld']($data['dataset']['role']))?$data['dataset']['role']:'content';
				this['header']['local']=(!this['vld']($data['dataset']['local'])||$data['dataset']['local']=='no')?false:true;
				this['header']['publisher']=(this['vld']($data['dataset']['publisher']))?$data['dataset']['publisher']:'';
				//=-=|if no publisher force local|=-=//
				this['header']['local']=(this['header']['publisher']=='')?1:0;
				this['id']=this['header']['name'];
				if (!this['header']['name']||!this['header']['role']) {
					this['error']('You must provide at least a (Name/role/publisher) properties when using applets.');//debug
					this['setState'](this['state']['FAILED']);
					return false;
				}
				
				//_.ext=($m.devMode)?'.html':'.nfw';
				_.ext='.html';
				_.fileName='applet'+'.'+this['header']['name']+_.ext;

				//Prepare the URI
				if (!this['vld'](_.path=nldr['getPath']('applets','publisher'))){
					this['warn']('Publisher path not found.');
					return false
				}
				this.uri=_.path+_.fileName;
				// } else {
					// if (!this['vld'](_.path=nldr['getPath']('publisher',this['header'].publisher))){
						// this['warn']('Publisher path not found.');
						// return false
					// }
					// this.uri=_.path+'applets/'+_.fileName;
				// }
				
				
				return true;
			} catch (e) {	
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));			}
				return false;
			},
		
		pack:function(){
			getFunc=function($func){
				$func = $func.toString(); 
				var body = $func.slice($func.indexOf("{") + 1, $func.lastIndexOf("}"));
				return body;
			}
			
			var _={
					obj:null,hdr:null};
				
			_.obj=this['header'];
			_.hdr=(_.obj.role==='applet')?'~A|':'~L|';
			
			try {
				this['debug']('Packing '+this['header'].name);
				_.obj = JSON.stringify(this['header']);
				_.obj = $m.pf.lzw.enc(_.obj);
				_.obj = _.hdr+_.obj;
				console.log(_obj.name+'->'+_.obj);
				return _.obj;		
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
			
			return false;
		},
		
		unpack:function($data){
			setFunc=function($func,$body) {
				this[$func]=$body;
			}
			
			var _={obj:null,hdr:''};
			
			try {
				this['debug']('Unpacking '+this['header'].name);
				_.hdr=$data.substring(0,3);
				if (_.hdr=='~A|' || _.hdr=='~L|') {
					_.obj=$data.substring(3,$data.length);
					_.obj=$m.pf.lzw.dec(_.obj);
					this['header']=JSON.parse(_.obj);
					if (_.obj['publisher']&&_.obj['name']&&_.obj['role']&&_.obj['local']) {
						//Insert Functions
						
						return _.obj;
					} else
						this['warn']('Valid object with invalid properies. Discarding.');					
				} else {
					this['warn']('Not a valid compiled Applet or Layout data.');
				}
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}		
			return false;
		},
		
		/**
		 * Insert an applet into the DOM
		 *
		 * @param  {String} $html	HTML Content
		 * @param  {String} $into	ID of Element to insert into
		 * @memberof Applet
		 * @todo insert applet style and javascript
		 */
		embed:function () {
			this['debug']('Embeding '+this['header'].name);
			if (this.onShow) this.onShow();
			if (this['header'].script && this['header'].script.text.length>0) 
				M$['gei']("tail").appendChild(this['header'].script);
				
			if (this['header'].style && this['header'].style.textContent.length>0) 
				M$['get']("head")[0].appendChild(this['header'].style);

			var tmp = $("div[data-applet='"+this['header'].name+"']").append(this['header'].html);
			tmp[0].id=this.id;
			//this.setDraggable();
			this.setState(3);
		},

		/**
		 * Remove an applet from the DOM
		 * @returns	none
		 * @memberof Applet
		 * @todo Dont forget to remove the style and script!!!
		 */
		unbed:function () {
			if (!this.active) return;
			this['debug']('Unembeding '+this['header'].name);
			this.onUnloaded();
			this.active = false;
			if (this.onHide) this.onHide();
			$a=M$['get']('head')[0];
			$a.removeChild(this['header'].name+"_script");
			$a.removeChild(this['header'].name+"_style");
		},
			
		fetch:function(){
			var _={msg:null,fromLocal:false,applet:null};
			try {
				_.msg = "Received request for: "+this['header'].name+'... ';
				_.applet = r2wl['local']['getAppFile'](this['header'].name);
				if (this['vld'](_.applet)) {
					_.msg += "Found in local Storage.";
					this.onLoad(_.applet);
					_.fromlocal=true;
				}
				
				if (!_.fromLocal) {
					//See if the applet we want is in history (cached)
					//var tmp = this['Class']._history[$data.name];
					
					//if (typeof tmp != 'undefined') {
					//	this._tracker.fromCache++;
					//	_.msg += "Found in cache. ";
					//	this['debug']($msg,this);
					//	if (this['vld'](tmp.div)) this.onLoad(tmp.div);
					//	this.checkQue();
					//	return true;
					//} else if (!$fromlocal) {
					//	$msg += "Not cached. ";
				//	}
				}
				//No, We'll have to load it with Ajax				
				try {
					_.msg += "Requesting from via AJAX.";
					M$.xhr(
						this.uri,
						this._onLoad.bind(this),
						this._onError.bind(this),
						'get',
						null,
						false
					)
				} catch (e) { 
					this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				}
				this['debug'](_.msg);

			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},
			
		setDraggable:function() {
			$(function() {
				$('#wrapper').on('mousedown', 'div', function() {
					if(this.draggable===true) {
						$(this).addClass('draggable');
						$(this).addClass('dragging').parents().on('mousemove', function(e) {
							$('.dragging').offset({
								top: e.pageY - $('.dragging').outerHeight() / 2,
								left: e.pageX - $('.dragging').outerWidth() / 2
							}).on('mouseup', function() {
								$(this).removeClass('dragging');
							});
							if (typeof e != 'undefined') e.preventDefault();
						});
					} else {
						$('.draggable').removeClass('draggable');
						$(this).removeClass('dragging');
					}
				}).on('mouseup', function() {
					$('.draggable').removeClass('draggable');
				});
			});
		},
		
		htmlToApplet:function($html){
			var _={div:null};
			try {
				_.div = window.document.createElement('div');
				_.div.innerHTML=$html;
				//Ok we have a Applet DOM Ready
				//Lets return to the factory and add it to our Applet
				return _.div.firstChild;
				
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},
		
		/**
		 * Called after applet is loaded (cache, Remote or Storage)
		 * 
		 * @memberof Applet
		 */
		onLoaded:function(){
			this.loaded = true;
			$evt=this['header'].name+"_onload";
			if (typeof window.$evt === 'function') {
				window.$evt();
			}
		},	

		/**
		 * Called after applet is loaded (cache, Remote or Storage)
		 * 
		 * @memberof Applet
		 */
		onUnLoaded:function(){
			this.unload = true;
			$evt=this['header'].name+"_onload";
			if (typeof window.$evt === 'function') {
				window.$evt();
			}
		},
		
		_onLoad:function($data) {
			if (!this['vld']($data)) {
				this['error']('No data return from Ajax Request.');//debug
				return false
			}
			
			$data = this.htmlToApplet($data);
			if ($data.tagName=='DIV' && $data['dataset']['name']) {
				this['debug']('Received '+this['header'].name);
				//Its a valid DOM Ready Applet, add it to the Mother Applet
				(function(a,d){
					a.onLoaded();
					for (var i=0;i<3;i++) {
						if (d.children[i].tagName=='STYLE') {
							a.header.style=d.children[0];
							a.header.style.id=a.id+"_style";
						} else if (d.children[i].tagName=='SCRIPT') {
							a.header.script=d.children[1];
							a.header.script.id=a.id+"_script";
						} else if (d.children[i].tagName=='DIV')
							a.header.html=d.children[2].innerHTML;						
					}
					for (var property in d.dataset) {
						a.header[property]=d.dataset[property];
					}				
					//a.header.onload=this.onLoaded();
					//a.header.onunload=this.onUnLoaded();
					
					//var b = a.pack();
					//var c = a.unpack(b);
					a.setState(2);
					r2wl.applets.scan($data.innerHTML,false);
					
				})(r2wl.applets.objects[$data['dataset']['name']],$data);			
				
			}
			
			//var level1 = r2wl.applets.getApplets($data.innerHTML,false);
			//for (var i=0;i<level1.length;i++){
			//	this.create(level1[i]);
			//}
			
			//r2wl.applets.scanAnchors($data.innerHTML);
			//Default Applet is now loaded, display it.

			//return $result;
		},
			
		_onError:function(data) {
			this['warn']('Error loading applet resource.');
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
/**
 * For creating entities (mostly just an interface class you extend from to create an entity factory).
 * No need to create an instance yourself...it is created automatically by Game::onReady()
 * entityFactory = new AppletFactory();
 *
 * @class I$AppletFactory
 * @extends I$Factory
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Factory',

	//What is the name of your new interface?
	'I$AppletFactory',
	
	/** @lends I$Factory */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:0,
		
		//Private array that stores elements name if it was scanned for links
		_scanned: [],

		//Private array that stores applets name and attributes if it is currently active
		_active: [],
		
		//Private array that stores a history of applets to keep form reloading. Page Reload wipes this
		_history: [],
		
		//Private array that stores elements name if it is waiting to be loaded 
		_loadQue: []
	},
	/** @lends I$Factory.prototype */
	{

		started: false,
		
		finished: false,
		
		_tracker: {
			failed: 0,
			loading: 0,
			loaded: 0,
			fromConn: 0,
			fromCache: 0,
			loops: 0,
			indexed:false
		},
			
		/**
		 * Initialization Method
		 */	
		init:function() 
		{
			this['_super']('Applet');
		},
			
		/**
		 * Called by the entity loader
		 *
		 * @param  {Object}		$data String type of the entity to create
		 * {Layer} layer Layer the entity should be placed on
		 * @return {Applet}
		 */
		create:function ($data)
		{		

			var _={obj:null,attr:[]};
			try {		
				_.obj=create('I$Applet',[$data]);
				//($data);
				//if (this['Class']._scanned[_.obj.name]){
				if (_.obj['state']===4){
					delete(_.obj);
				} else if (_.obj.state===0) {
					this.add(_.obj.id,_.obj);
					_.obj.setState(1); //changed to queued
				}
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}	
		},
		
		add:function($name,$obj) {
			this['_super']($name,$obj);
			this['Class']._scanned.push($name);
		},
		
		reset:function() {
			this['debug']('Reset load que.');
			this['Class']._loadQue	= [];
			this._tracker	= {failed:0, loading: 0,loaded: 0,fromConn: 0,fromCache: 0,loops: 0};
		},

		stop:function() {
			//pld();
			this['debug']('Loader stopped.');
			this.started	= false;
			this.finished	= true;
			this.reset();
		},
		
		//Start loading all applets in our que
		start:function() {
			if (this.started) return;
			this['debug']('Loader started.');
			this.started = true;
			this.finished = false;
			r2wl.ready = false;
		},
		
		scan:function($html) {
			//Get layouts document
			var level1 = this.getApplets($html,false);
			for (var i=0;i<level1.length;i++){
				div_i=level1[i];
				this.create(level1[i]);
				// var level2 = this.getApplets(level1[i].innerHTML,false);
				// for (var j=0;j<level2.length;j++){
					// div_j=level2[j];
					// this.create(level2[j]);
					// var level3 = this.getApplets(level2[j].innerHTML,false);
					// for (var k=0;k<level3.length;k++){
						// div_k=level3[k];
						// this.create(level3[k]);
					// }
				// }
			}
			//this.requestApplet({name:nldr['config']['app'].layout});		
		},
				
		/**
		 * @method onHREFClick()
		 *
		 * Any Cloud Application links are captured and handled here. It tells the asks to use the
		 * applet detected in onClick event. The applet is aquired from cache or network and then
		 * is scanHTMLned or other applets via static include or links and added to the load que.
		 * 
		 * @param
		 * EVENT	e		onClick event
		 *
		 * @return 
		 * 	None
		 */	
		onHREFClick:function($evt) {
			try {
				r2wl.applets.setpage(this.name);
			} catch (e) {
				ast(null,e.stack);
			}
		},

		onHREFHover:function($evt) {},
		
		/**
		 * @method isActive
		 *
		 * Will return true if the given applet is currently active (should be embeded( otherwise false.
		 * 
		 * @param	{string}	$applet
		 * @return {boolean}
		 * @memberof AppletFactory
		 */	
		isActive:function($applet){
			return (typeof this['Class']._active[$applet] == "object")?true:false;
		},
		
		setpage:function($applet_name) {
			if ($applet_name==="") return;
			try {
				var $applet = r2wl.applets.use({name:$applet_name}), $tmp;
				if (!$applet) return;
					var $DIVs = this.getApplets("self");
					
					for (i=0;i<$DIVs.length;i++) {
						var $name=$($DIVs[i]).attr('data-applet');
						$tmp = r2wl.applets.use({name:$name});
						var tmp = $("div[data-applet='"+this['header'].name+"']").append($html);		
					}
							
				if (nldr['config']['options'].crossfade) {
					if ($("#main").css("opacity")!="0") {
						this.lastContent = M$['gei']("main").innerHTML;
						$("#main").fadeOut(250, function() {
							M$['gei']("main").innerHTML =  $applet.html;
							$("#main").fadeIn(250,"linear");				
						});				
					}
				} else {
					this.lastContent = M$['gei']("main").innerHTML;
					M$['gei']("main").innerHTML =  $applet.html;
				}
				//save current app & page to localstorage for resume
				r2wl['local'].setAppCfg('currentPage',$applet.name);
			} catch (e) {
				ast(null,e.stack);
			}		
		},
		
		/**
		 * @method scanAnchors()
		 *
		 * Scans HTML document (CloudApp) or Loaded Applets for link to other applets and adds them to laod que
		 * 
		 * @param	HTML		$html		optional html (applet) to search for other applets (nested)
		 *
		 * @return 	ARRAY 		All Applets detected in $HTML or BODY if no parameter
		 */	
		scanAnchors:function($html) {
			var _={};
			try {
				var $msg="Scanning ",$elName,total=0,cached=0,load=0;
				if (this['vld']($html)) { $html = $($html); } else { $html = $("body"); }

				if ($html[0].id!="") {
					//Its in history..then we already scanned it.
					$elName=$html[0].id; 
					
					if (this['Class']._scanned.indexOf($elName) != -1) return true;
				} else {
					$elName=$html[0].nodeName;
				}
				
				$msg+=$elName+' for Links...';
				var links = get('a'),$shared=false;
				for (i = 0; i < links.length; i++) {
					//Possible Applet Link?
					if (links[i].hash!="") {
						var n=links[i].hash.split(".");
						if (n[0]=='#applet') {
							if (n[1]!="") {
								//Yep, its a applet link, add handler and pre-cache it
								links[i].addEventListener('click', this.onHREFClick, false);
								links[i].addEventListener('hover', this.onHREFHover, false);
								if (this['Class']._scanned.indexOf(n[1]) === -1) {
									$shared = (links[i].dataset.shared!="") ? true : false;	
									this['Class']._loadQue.push({name:n[1],shared:$shared});
									this['Class']._scanned.push(n[1]);
									load++;
								} else {
									cached++;
								}
									
								links[i].name=n[1];
								
								total++;
							}
						}
					}
					
				}
				this['debug']($msg+'Found '+total+' linked applets. [Cached:'+cached+', Qued:'+load+', Total:'+total+']');
				return total;

			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}	
		},
		
		
		/**
		 * Scans the HTML of an applet for more embedded applets
		 * @param  {String} $html	HTMl Content
		 * @returns	{Array}	array of all applets found (divs)
		 * @memberof Applet
		 */
		getApplets:function($html,$layout) {
			var _={role:null,roleName:null};

			try {
				var $self=false;
				
				_.role=($layout==true||$layout==false)?$layout:false;
				_.roleName=($layout==true)?'layout':'applet';
				
				if ($html==="self") {
					$html = this.$html
					$self=true;
				} else if (this['vld']($html)) { 
					$html = $($html); 
				} else { 
					$html = $("body"); 
				}
				if (!this['vld']($html)) return 0;
				this['debug']('Scanning '+$html[0].nodeName+' for '+_.roleName+'s...');
				
				//Ok we found all applets (if any)
				var $DIVs = $($html).find("div").filter(function(data) {
					return $(this).data(_.roleName) !== undefined;
				});
				
				if ($self && $DIVs.length>0) this.hasChildren=true;
				return $DIVs
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
			return [];
		},

		/**
		 * @method findApplets
		 *
		 * Scans HTML document (CloudApp) for all elements with a [data-applet] tag
		 * and saves them in the HashTable This does not scanHTML a applet for data-tags -
		 * that is handled by the Applet class.
		 * - Scan BODY and add to que - for each applet found:
		 * - scan Applet HTML and add to que
		 * - Scan Applet for Links to Other applets add to que
		 * - make sure que is unique applets
		 * - find MAIN applet and push load que
		 * - find ACTIVE applets and push to load que
		 * - 
		 * @param 	HTML	$html	optional html (applet) to search for other applets (nested)
		 * @return  ARRAY	All Applets detected in $HTML or BODY if no parameter
		 */	
		findApplets:function($html,$setActive) {
			
			//Get Data attributes
			getAttributes=function($self,$where,$id,$active) {
				var _={};
				try {
					var $attr,$foo,$data={};
					$el=M$['gei']($id);
					$attr=M$.gda($id,1); 
					$foo=$($where).find($id);
					if ($attr!=false && $attr.applet!='') {
						$data.name=$id;
						$data.target= (typeof $attr.target==M$.db[0][7])?$html.parentElement:$attr.target;
						if ($data.target==null) $data.target="body";
						$data.shared= (typeof $attr.shared==M$.db[0][7])?'publisher':'shared';
						$data.active= $active;
						$data.path=	nldr['getPath']('applets',$data.shared);
						$self.Class._loadQue.push($data);
						return $data;
					}
				} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				}
			}
			
			var _={};
			try {
				var DIVs,$attr,$data,$shared=false;
				$html=(!this['vld']($html))?$html=get("body")[0]:$html=$($html)[0];
				
				//if we are scanning the body then set all applets to active
				$setActive=(typeof $setActive===M$.db[0][7])?0:1;	
				
				//Set this applets data
				//$data=($html.tagName=="BODY")?null:getAttributes(this,$html,$html.id,$setActive);
				
				//Scan this applet for applets
				DIVs = this.getApplets($html);
				
				//Process any applets we found
				for (i=0;i<DIVs.length;i++) {
					//no id? add it
					if (DIVs[i].id==="") DIVs[i].id=DIVs[i].dataset.applet;
					$data=getAttributes(this,$html,DIVs[i].id,$setActive);	
					this['Class']._active[DIVs[i].dataset.applet] = $data;			
					DIVs[i].style.display = ($setActive) ? 'block' : 'none';
				}
				
				//How many Applets from Static Includes? (In Page)
				this._tracker.loading = this['Class']._loadQue.length;
				
				this['debug']('A total of '+this._tracker.loading+' applets were found.');		

			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
			
		},
		
		checkQue:function() {
			this['debug']('Checking Que...');
			//Are there applets in the que? if so start the loader.
			if (this['Class']._loadQue.length>0&&this.started==false) this.start();
			
			if (this['Class']._loadQue.length<=0) {
				//auto resume
				var $resume = r2wl['local'].getAppCfg('currentPage');
				if (this['vld']($resume)) 
					this.setpage($resume);
				else
					this.setpage(nldr['config']['app'].applet);
				
				return true;
			}
			//No Duplicates		
			if (this['Class']._loadQue.length>2) {
				var $uniqueQue = this['Class']._loadQue.filter(
					function(elem, pos) {
						return r2wl.applets.Class._loadQue.indexOf(elem) == pos;
					});	
				this['Class']._loadQue = $uniqueQue;
			}

			this._tracker.loading=this['Class']._loadQue.length;
			//load one from que.
			this.requestApplet(this['Class']._loadQue.shift());
			this._checkAllDone();
		},
		
		/**
		 * Request an applet. Verified good request data, then tries to load it from device storage.
		 * If not is storage it will check current memory (history) and load it.
		 * If all else fails it is obtained from server via AJAX request.
		 *
		 * @method requestApplet()
		 * 
		 * @param {mixed} $data
		 * @return none
		 */		
		requestApplet:function($data) {
			var _={};
			try {
				if (!this['vld']($data)||(typeof $data.target==M$.db[0][7])) return false;
				
				var $msg = "Received request for: "+$data.name+'... ';
				var $fromlocal=false;
				var $applet = r2wl['local'].getAppFile($data.name);
				if (this['vld']($applet)) {
					$msg += "Found in local Storage.";
					this.onLoad($applet);
					$fromlocal=true;
				}
				
				//See if the applet we want is in history (cached)
				var tmp = this['Class']._history[$data.name];
				
				if (typeof tmp != 'undefined') {
					this._tracker.fromCache++;
					$msg += "Found in cache. ";
					this['debug']($msg);
					if (this['vld'](tmp.div)) this.onLoad(tmp.div);
					this.checkQue();
					return true;
				} else if (!$fromlocal) {
					$msg += "Not cached. ";
				}

				//No, We'll have to load it with Ajax
				if ($data.name=="") return false;
				this['Class']._history[$data.name] = {
					name:$data.name,
					src:nldr['getPath']('applets',$data.shared)+'applet.'+$data.name+'.html',
					div:$data.div
				};
				if (!$fromlocal) {
					try {
						$msg += "Requesting from via AJAX.";
						M$.xhr(this['Class']._history[$data.name].src,bnd(this,this.onLoad),bnd(this,this.onError),'get',null,false);//works
					} catch (e) { 
						ast(e.stack);
					}
				}
				this['debug']($msg);

			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
			}
		},

		_checkAllDone:function() {		
			if (this['Class']._loadQue.length<=0) {
				//All Applets have been loaded
				this['debug']("Load Complete. Cache: "+this._tracker.fromCache+", Remote: "+this._tracker.fromConn+", Failed: "+this._tracker.failed+", Total: "+this._tracker.loaded);
				this.stop();			
				r2wl.ready = true;
				return true;
			} else {
				this.checkQue();
				this._tracker.loops++;
				if (this._tracker.loops > this._tracker.loading) {
					return true;
				}
				return false;
			}	
		},
		
		onLoad:function($data) {
			this._checkAllDone();
			if (!this['vld']($data)) {
				this['error']('No data return from Ajax Request.');
				return false;
			}
			var $fromlocal;
			var a = ISA($data);
			if (ISA($data) ==="Object:Simple") {
				//we got it from localstorage already created.
				$fromlocal = true;
				var $obj = Applet.create($data,this['Class']._active);
				$result = r2wl.applets.add($obj.header.name,$obj)
			} else {
				//Create an applet loaded from net
				$fromlocal = false;
				var $toObj=$($data);
				var $obj = Applet.create($data,this.isActive($toObj[0].dataset.name));
			}
						
			this._tracker.loaded++;
			this._tracker.loading--;
			
			if (typeof $obj === "object") {
				if (!$fromlocal) 
					//r2wl['local'].setAppFile($obj.header.name,$obj);
					$obj=$obj;
				else 
					if ($obj.header.name in this['Class']._history && (typeof this['Class']._history[$obj.header.name].src !== 'undefined')) 
						$obj.src = this['Class']._history[$obj.header.name].src;
					
				this._tracker.fromConn++;
				this.scan($obj.html);		
				this.scanAnchors($obj.html)
				$result = r2wl.applets.add($obj.header.name,$obj);
				//TODO: Fix Applet Events
				//if ($result.onLoaded) $result.onLoaded();

				//Default Applet is now loaded, display it.
				if ($obj.header.name==nldr['config']['app'].applet) 
					r2wl.applets.setpage($obj.header.name);
			} else {
				//Remove Applet we just created. Remove from History as well. Display message
				this._tracker.failed++;
				delete this['Class']._history[$obj];
				this.remove($obj);
				this['warn'](("Unable to identify applet, discarding. [").toString($data)+"]");
				$result = false;
			}

			return $result;
		},
			
		onError:function(data) {
			return null	
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
/**
 * Short Description
 *
 * @class I$ConfigManager
 * @extends I$Interface
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Interface',

	//What is the name of your new interface?
	'I$ConfigManager',
		
	/** @lends I$Interface */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,		
		/** 
		 * Set to true by system after members are exposed. This is read only.
		 * 
		 * @property {boolean} exposed
		 * @expose 
		 */
		exposed:false,

		path: {
			//Landing Page - Primary location
			app: 		window.location.protocol + "//" + window.location.host + window.location.pathname.split("/").slice(0, -1).join("/") + "/",
			shared:		'/content/shared/',			//'http://cdn.i2tmlabs.com/content/shared/',
			
			//Publisher if for registered developers and sharing
			publisher:	'/content/',				//http://cdn.i2tmlabs.com/content/{PUBLISHER NAME FROM JSON}/',
			
			//Vendor is for approved Nano FW 3rd party libraries
			vendor:		'/vendor/'					//'http://cdn.i2tmlabs.com/vendor/',
			
		},
		
		/**
		 * @property {boolean}		ready  [true|false]
		 * 
		 * True 	- Everything was fine, 
		 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
		 */
		ready: false,

		/**
		 * @property {boolean}		filesLoaded  [true|false]
		 * 
		 * True 	- Everything was fine, 
		 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
		 */
		filesLoaded: false,
		
		/**
		 * @property {boolean}		filesLoaded  [true|false]
		 * 
		 * True 	- Everything was fine, 
		 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
		 */
		configLoaded: false,

		_onSuccessCallback:null,
		_onFailedCallback:null,
		
		/**
		 * Return a string name for this interface class
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function (){return 'I$ConfigManager Class';}
	},
	/** @lends I$Interface.prototype */
	{
		
		/**
		 * Configuration Settings
		 *
		 * @property config
		 * @expose
		 */
		config:null,
		
		/**
		 * Populated by parseConfigFiles(). The cloud app will push these into the load que.
		 *
		 * @property filesNeeded
		 * @expose
		 */
		filesNeeded:null,
		
		/**
		 * Interface Initialization method
		 * @constructor init
		 * @expose
		 */
		init:function (onSuccess,onFailed)
		{
			this['_super']();
			this['_onSuccessCallback']=onSuccess;
			this['_onFailedCallback']=onFailed;			
		},
		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * @method setup
		 * @expose
		 */
		setup:function(){
			this['_super']();	
			this['config']=M$['config'];
		},
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$ConfigManager#onReady
		 * @expose
		 */
		onReady:function(){
			if (!this['config']) {
				M$.xhr(
					this['getPath'](null,'app')+'index.json',
					this._onConfigSuccess.bind(this),
					this._onConfigFailed.bind(this),
					'get',
					null,
					false
				)
			} else {
				this._onConfigSuccess(null);
			}		
		},
		
		/**
		 * Use to obtain a path to a resource
		 * @method getPath
		 * @param {string} $entity	
		 * @param {boolean} $app		use cloudapp resources or shared resources	
		 * @expose
		 * @return 
		 */
		getPath:function($what,$where,$appFolder) {
			function textize(s){
				return s.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
			}
			
			var $base=window.location.protocol+M$['db'][2][0];
			//if (window.location.pathname.indexOf('/local/')!=-1) $base=location.origin+'/cdn';			//DEBUG
			
			$appFolder=$appFolder||false;
			
			$where=$where||'nanofw';
				
			//WHERE? APP or CDN?
			switch ($where.toLowerCase()) {
				// i2tm Labs CDN						http://cdn.i2tmlabs.com/
				case 	'home': 	return $base; break;
				// App Folder							http://apps.i2tmlabs.com/{PUBLISHER}/{APPNAME}/
				case 	'app': 		return this['Class']['path']['app']; break;	
				//nano Vendor Location (3rd libraries)	home+vendor/
				case 	'vendor': 	$base+=this['Class']['path']['vendor']; break;		
				
				//nano Public Shared Folder				home+vendor/i2tm/
				case 	'shared': 	$base+=this['Class']['path']['shared']; break;		
				//Publisher Assets Folder				home+content/{PUBLISHER}/assets/
				case 	'publisher':$base+='/content/'+textize(this['config']['app']['publisher'])+'/assets/';break;
			}
			
			$what=$what||'applets';
			
			//WHAT?
			switch ($what.toLowerCase()) {
				case 	'layouts':	$base+='layouts/'; break;		//Layouts folder
				case 	'applets':	$base+='applets/'; break;		//Applets	
				case 	'scripts':	$base+='js/'; break;			//JavaScripts folder
				case 	'styles':	$base+='css/'; break;			//Stylesheets folder
				case 	'images':	$base+='img/'; break;			//images folder
				case 	'sounds':	$base+='snd/'; break;			//sounds folder
				case 	'libraries':$base+='lib/'; break;			//plugins folder
			}
			
			//Publisher?
			if ($where=='publisher'&&$appFolder==true&&$what) $base+=textize(this['config']['app']['name'])+'/';
			
			return $base;			
		},
		
		/** @expose */
		parseConfigFiles:function(){			
			var $where=['publisher','shared','vendor'],
				$what=['styles','scripts','applets','libraries'],
				$files=[],tmp,$w,$e
				self=this,
				$res=this['config']['files'];

				
			try {
				this['debug']('Parsing Application Files...');
				this['filesNeeded']=[];
				
				$what.forEach(function($w){
					if (typeof $res[$w]!="undefined") {
						$where.forEach(function($e){
							tmp=$res[$w][$e];
							if (typeof tmp==="string"&&tmp.length>0) {
								tmp=$res[$w][$e].split(",");
								if (typeof tmp==="object"&&tmp.length>0) {
									$files=$res[$w][$e].split(",");	
									for (i=0;i<$files.length;i++)
										self['filesNeeded'].push(self['getPath']($w,$e)+$files[i]);
								}	
							}
						});			
					}
				});				
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				return false;
			}
			this['debug']('Parsing Complete. '+this['filesNeeded'].length+' files to be queued.');
			return true;
		},
		
		//We have a config file, run cloudapp mode
		/** @expose */
		_onConfigSuccess:function($req){
			if (!this['config']) this['config'] = JSON.parse($req);
			this['Class']['configLoaded']=true;
			this['debug']('Configuration file found, running in CloudApp mode.');
			
			try {
				if (this['parseConfigFiles'](this))
					this['Class']['filesLoaded']=true;
					
				else this['debug']('Error parsing apps files settings.');
			} catch (e) {
				this['error'](e,_,Array.prototype.slice.call(arguments, 0));
				return false;
			}
					
			//Set Application title
			if (M$['isDevMode']()) D$['title']=this['config']['app']['name']+' [DEBUG]';
			this['Class']['ready']=(this['Class']['configLoaded']==true&&this['Class']['filesLoaded']==true);
			if (this['_onSuccessCallback']) this['_onSuccessCallback'](this['filesNeeded']);
		},
		
		//no config file, run normal webpage mode
		/** @expose */
		_onConfigFailed:function() {
			this['debug']('No Configuration file not found, running in normal webpage mode.');
			this['Class']['ready']==false
			if(this['_onFailedCallback']) this['_onFailedCallback']([]);
		},

		/** @expose */
		get:function get(what) {
			what=what||false;
			if (what) {
				what=what.split('.');
				if (what.length>0) {
					// switch (what.length) {
						// 1:	if (this['config'].what[0]) return this['config'].what[0]; break;
						// 2:	if (this['config'].what[0].what[1]) return this['config'].what[0].what[1]; break;
						// 3:	if (this['config'].what[0].what[1].what[2]) return this['config'].what[0].what[2]; break;
						// 4:	if (this['config'].what[0].what[1].what[2].what[3]) return this['config'].what[0].what[2].what[3]; break;
					// }
				}
			} 
		},

		set:function set(what,value){
		
		},

		/**
		 * Return a string name for this interface prototype
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function ()
		{
			return (this['Class']===undefined)?
				'I$ConfigManager':
				this['Class']['fullName'] + ' [id: ' + (this['objectId']||0) + ']';
				
		}
	},
	//=-=|Optional|=-=//
	{
		/** @augments I$ConfigManager */
		/*
		someInterfaceName:I$SomeInterface,
		...
		someInterfaceName:I$SomeInterface
		*/
	},
	//=-=|Optional|=-=//
	[
		/** @export Member */
		/*
		someMethod:I$InterfaceMethod,
		...
		someMethod:I$InterfaceMethod
		*/
	]
);

/**
 * Short Description
 *
 * @class I$CloudApplication
 * @extends I$Alias
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Alias',

	//What is the name of your new interface?
	'I$CloudApplication',
	
	/** @lends I$Alias */
	{		
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,		
		/** 
		 * Set to true by system after members are exposed. This is read only.
		 * 
		 * @property {boolean} exposed
		 * @expose 
		 */
		exposed:false,
	
		/**
		 * Turns off fie Caching
		 * @property {string} 
		 * @private
		 * @noexpose
		 */
		noCacheString: '',
	
		/** @expose */
		predefined:["{!DATE}","{!TIME}","{!DATETIME}","{!APPNAME}",
			"{!APPVERSION}","{!COPYRIGHT}","{!AUTHOR}",
			"{!APPLET|[name,loc[local|nanofw|vendor|publisher]]}"
			],
	
		/** @expose */
		_ATTRIBUTES:[
			'role',				//application||applet||plugin [REQUIRED]
			'name',				//"H5C3 Homepage" [REQUIRED]
			'version',			//0.1.0 [REQUIRED]
			'uuid',				//4473182a-b5e9-4989-aac6-479f2b9ee49a[REQUIRED]
			'layout',			//Any registered layout
			'skin',				//Any skin scheme
			'shared',			//True is nanofw share, false is app and VENDER_ID is vendors url
			'target',			//What element (#) insert into or what position:weight (!) to into
			'cols'				//xs,sm,md,lg column sizes 12,8,6,12
		],
				
				
		/**
		 * Internal timer used for housekeeping, queues, etc. Runs at 2fps.
		 * @expose 
		 */
		timer:null,
		
		/**
		 * Stores the information about the current layout
		 *
		 * @property {object} layout
		 * @expose
		 */					
		layout:{repo:'i2tm',name:'starter'},
		
		/**
		 * Application Configuration Manager
		 *
		 * @property {object}	config	I$ConfigManager
		 * @expose
		 */			
		config:null,
			
		/**
		 * Stores total amount size of all content loaded.
		 *
		 * @property {number}	$totalBytesLoaded	
		 * @expose
		 */			
		$totalBytesLoaded: 0,
		
		/**
		 * Google Analytics & AdSense Interface
		 *
		 * @property {object}	google	I$Google
		 * @expose
		 */			
		google	: null,
		
		/**
		 * Local Client Side storage support Interface
		 *
		 * @property {object}	local	I$DeviceStorage
		 * @expose
		 */			
		local	: null,
		
		/**
		 * Applet Factory - Handles everything to to with applets
		 *
		 * @property {object} applets	I$AppletFactory
		 * @expose
		 */			
		applets	: null,
		
		//=-=| 2D Game Only |=-=//
		/**
		 * Game Engine Object
		 *
		 * @property {object} game	I$GameEngine
		 * @expose
		 */			
		game	: null,
		
		/**
		 * Launcher - Game Launcher
		 *
		 * @property {object} launcher	I$Launcher
		 * @expose
		 */			
		launcher: null,
		
		/**
		 * Device Performance tester
		 *
		 * @property {object} test	I$DeviceTest
		 * @expose
		 */			
		test	: null,
		
		/**
		 * True 	- Everything was fine, we can load the Engine and optionally the framework
		 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
		 *
		 * @property {boolean}	ready  [true|false]
		 * @expose
		 */
		ready: false,
		
		/**
		 * set to true after call tot he nanoREADY() function
		 *
		 * @property {boolean}	readyCalled
		 * @expose
		 */			
		
		readyCalled: false,
						
		/**
		 * Framework has finished loading.
		 *
		 * @property {boolean} finished	
		 * @expose
		 */
		finished: false,
				
		//getPath:function(){},
		
		/**
		 * An array of all scripts
		 *
		 * @property {array} scripts
		 * @expose
		 */
		scripts: [],

		
		/**
		 * Return a string name for this interface class
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function (){return 'I$CloudApplication Class';}
	},
	/** @lends I$Alias.prototype */
	{
		/**
		 * Interface Initialization method
		 * @constructor
		 * @expose
		 */
		init:function ()
		{
			this['_super']();

			this['$loc'] = this['gfn'](document.location.href);

			
			//if (typeof this['config']['config']['google'] === "object")
			//	this['google'] = create('I$Google',this,this['config']['config']['google']);
		
			if (this['clientFS_exists']())
				this['local'] = P$['interfaces']['Store']['I$DeviceStorage'].create(this['config']['config']['app']);    //.create();
			
			
			this['applets'] = create('I$AppletFactory');					

			this.ha();

			this.ready = true;
		},
		/**
		 * Prepare the interfaces object before init is called. Excellent place
		 * to do property and method export and other preparations before init()
		 * is called.
		 * @method
		 * @expose
		 */
		setup:function(){
			this['info']('nano Framework v1.0.0');
			this['_super']();	
			this.initEvents();
			
			//give maestro 15 seconds to get R2WL in ready state otherwise stop timer
			this['timer'] = P$['interfaces']['Store']['I$AccuTimer']['create'](
				-1, 
				2, 
				M$.bnd(this,this._onInterval),
				M$.bnd(this,this._onTimerDone)
			)
			
			//this['scripts'].push(this['getPath']('modernizr','vendor')+'modernizr.min.js');	

			this['config'] = create('I$ConfigManager',
				M$.bnd(this,function(files){
					this['debug'](files.length+' file(s) added to the que - Configuration Complete.');
					this['scripts'] = files;
				}),
				M$.bnd(this,function(files){
					this['debug']('Configuration Failed.')
				})
			);

			this['getPath']=this['config']['getpath'];
		},
		/**
		 * This is triggered by the core after this interface is completely
		 * initialized.
		 *
		 * @event I$CloudApplication#onReady
		 * @expose
		 */
		onReady:function(){
			this['_super']();	
			this['createMeta']();
			this['getlayout']();
			
			this.prepare();
			//if (this.applets.onReady) this.applets.onReady();
			window.APP = this; //Make a global shortcut, i know its messy but look at the rest of this crap LOL

			if (this['google']) this['google']['load']();

			this['autoSizeACE']();

			this['applets']['scan']();		

			if (this['config']['config']['modules']['gldl']) {
				this['launcher'] = create('I$Launcher');
				this['game']= create('I$GameEngine','wrapper');
			}
		},
								
		/**
		 * Called to test if we have client storage access
		 *
		 * @method
		 * @expose 
		 * @return boolean
		 */
		clientFS_exists:function() {
			var mod = 'maestro';
			try {
				localStorage.setItem(mod, mod);
				localStorage.removeItem(mod);
				return true;
			} catch(e) {
				return false;
			}
		},
		
		/**
		 * parses the current document for template tags {%TAG|OPTIONS%}
		 *
		 * @method
		 * @noexpose
		 */		
		template:function() {
			var $el = M$['gei']('wrapper'),$html=$el.innerHTML;
		},
		
		/**
		 * Loads saved options and data from device storage if available
		 *
		 * @method
		 * @noexpose
		 */		
		prepare:function() {
			this.colorOverride = M$.chk(this['local'].getGlobalCfg('colorOverride'),false);
			//Load Skin
			if (this.colorOverride)
				this.skin = M$.chk(this['local'].getGlobalCfg('mySkin'),this.skin);			
			else
				this.skin = M$.chk(this['local'].getAppCfg('skin'),this.skin);					
		},
		
		/**
		 * embeds the loaded layout
		 *
		 * @method
		 * @noexpose
		 */		
		getlayout:function() {
			var tmp=this['config']['config']['app']['layout'];
			if (!this['vld'](tmp) || tmp.indexOf('|')==-1) {
				this['debug']('Invalid format for Layout. use PUBLISHER|LAYOUT with no extention.');
				tmp="i2tm|starter";
			}
			tmp=tmp.split('|');
			this['addFile'](tmp[1]+'.nano','layouts',tmp[0]);
		},
		
		/** @expose */
		getFontSize:function() {
			var $style,$el = M$['gei']('wrapper');
			if (this['vld']($el)) {
				$style = window.getComputedStyle($el, null).getPropertyValue('font-size');
				return parseFloat($style);
			}
			return 16;
		},

		/** @expose */
		reviewResolution:function() {
			//check application attributes for the layout we are using
			if (d = D$.documentElement.dataset) {
			
				if (!this.layout.isValid(d.layout)) {
					this['debug']('Not a valid layout. ['+d.layout+']');
				} else {
					this['debug']('Valid Layout ['+d.layout+'] detected.');
					this.appLayout = d.layout;
					if (this.appLayout==='absolute-all') {
						//subtract sidebars and then calculate
						return this.setResolution((window.innerWidth-400));
					} else {
						return this.setResolution();			
					}
				}
			}
		},
			
		/** @expose */
		initEvents:function() {
			$(window).resize(function(){
				clearTimeout(this.resizeTimer);
				this.resizeTimer = setTimeout(this._onResizeComplete, 200);
			});		
		},
		

		/**
		 * return true if cloudApp is NOT in auto mode for orientation. 
		 * Set in config.options.orientation.
		 * @expose 
		 */
		lockOrientation:function() {
			return (this['config']['config']['options'].orientation=='landscape'||this['config']['config']['options'].orientation=='portrait')?true:false;
		},
		
		/** @expose */
		autoSizeACE:function() {
			var el,h;
			h=window.innerHeight-64;
			if (P$['interfaces']['Core'].isObject(window.ace)) {
				//Auto Size Ace
				el = M$['gei']('ide');
				if (el)	el.style.height=h+'px';
			}
			
			if (P$['interfaces']['Core'].isObject(window.nanofm)) {
				//Auto Size Nano File Manager
				el = M$['gei']('ide_fm');
				if (el)	el.style.height=h+'px';
			}
		},
		
		/**
		 * Determine device orientation and respond accordinaly
		 * @method testOrientation
		 * @expose
		 * @return 
		 */
		testOrientation: function() {
			if (this.lockOrientation()==false) return;
			if (this['config']['config']['options'].orientation=='landscape') {
				if (window.innerWidth > window.innerHeight) {
					M$['pld']();
					M$['off']('page_warning');
					this['Class'].appPaused = false;
				} else {
					this['Class'].appPaused = true;
					M$['gei']('orientation').innerHTML='Landscape';
					M$['ple']();
					M$['on']('page_warning');
				}
			} else if (this['config']['config']['options'].orientation=='portrait') {
				if (window.innerWidth < window.innerHeight) {
					M$['pld']();
					M$['off']('page_warning');
					this['Class'].appPaused = false;
				} else {
					this['Class'].appPaused = true;
					M$['gei']('orientation').innerHTML='Portrait';
					M$['ple']();
					M$['on']('page_warning');
				}		
			}
		},
		
		/** @expose */
		forceRedraw:function() {	
			M$['gei']("wrapper").style.display="none";
			location.reload();
		},
		
		/** @expose */
		forceResize:function() {
			var width, height;

			if (navigator.appName.indexOf("Microsoft") != -1) {
				width  = document.body.offsetWidth;
				height = document.body.offsetHeight;
			} else {
				width  = window.outerWidth;
				height = window.outerHeight;
			}

			window.resizeTo(width - 1, height);
			window.resizeTo(width + 1, height);
		},	
		
		/** @expose */
		checkScreenMode:function() {		// No L/R		 L only     L & R      ALL 
			var current = this.mode;		//0 = <720, 1 = 721-959, 2= 960-1920, 3=1921 >
			if (window.innerWidth < 721 && current != 0) {
				// We changed down to mode 0  = No Sidebars + Mobile menu
				this.mode = 0;
			} else if ((window.innerWidth > 720 && window.innerWidth < 961) && current != 1) {				
				// We changed into mode 1  = No Right Sidebar + Mobile menu
				this.mode = 1;
			} else if ((window.innerWidth > 960 && window.innerWidth < 1921) && current != 2) {				
				// We changed into mode 2	= Both sidebars no mobile menu
				this.mode = 2;
			} else if (window.innerWidth > 1920 && current != 3) {
				// We changed into mode 2   = Both sidebars no mobile menu
				this.mode = 3;
			}

			if (this.mode != current)
				this._onScreenSizeChanged();
		},
		
		save:function() {
			this['local'].setGlobalCfg('colorOverride',this.colorOverride);
			this['local'].setAppCfg('skin',this.skin);
		},
		
		addToHead:function($tag,$id,$content){
			var $s;
			if ($tag=="script") {
				$s = D$.createElement($tag);
				$s.id = $id;
				$s.type = 'application/javascript';
				$s.innerHTML = $content;
			} else if ($tag=="style") {
				$s = D$.createElement($tag);
				$s.id = $id;
				$s.type = 'text/css';
				$s.innerHTML = $content;
			} else {
				this['warn']('Attempting to add unknown element '+$tag+' to DOM.');
			}
			
			$a=get("head")[0];
			$a=get("head")[0].appendChild($s);
		},
		createWindow:function($applet,$opts) {
			if (ISA($applet)==="applet") {
			}
			if (ISA($opts)!=='object') 
				$opts={id:'window',height:'17.14em',width:'22.85em',title:'Unamed Window',statusbar:'',body:'',color:'clr-dark'};
			var window = DOC.createElement('div');
			window.id=$opts.id;
			window.className = 'this_window '+$opts.color;
			$html = '<div class="this_window.this_titleBar">\n';
			$html += '<div class="this_title left"><span id="windowName">'+$title+'</span></div>\n';
			$html += '<div class="icons right">\n';
			$html += '<i class="icon icon-move uiButton"></i>\n';
			$html += '<i class="icon icon-collapse-alt uiButton"></i>\n';
			$html += '<i class="icon icon-expand-alt uiButton"></i>\n';
			$html += '</div>\n';
			$html += '</div>\n';
			$html += '<div id="windowBody" class="this_body">'+$body+'</div>\n';
			$html += '<div class="this_statusBar">\n';
			$html += '<div id="windowStatusBar">'+$status+'</div>\n';
			$html += '</div>\n';
			window.innerHTML=$html;
		},
		
		/**
		 * Tells the resource loader to disable caching in the browser by modifying the resource src by appending the current time
		 * @method setDisableCache
		 * @return 
		 */
		setDisableCache: function () {
			
			this['Class']['noCacheString'] = (M$['isDevMode']()) ? '?nocache=' + Date.now():'';
		},

		/**
		 * Add a script or stylesheet to the que. Do not call directly.
		 * @method addFile
		 * @param {string} $file
		 * @return 
		 */
		addFile: function ($file,$what,$where) {
			this['debug']('Added '+$what+' '+$where+' file '+$file+' to que.');
			this['scripts'].push(this['config']['getPath']($what,$where)+$file);			
		},

		/**
		 * Add multiple scripts to the que. Do not call directly.
		 * @method que
		 * @param {} scripts
		 * @param {} $engineBaseURL
		 * @return 
		 */
		que: function (scripts,$what,$where) {
			var $i = 0;
			for (var $i = 0; $i < scripts.length; $i++) {
				this.addFile(scripts[$i],$what,$where);
			}
			//this._start(); 
		},
		
		compile:function($applet) {
			return lzw.enc(encodeURIComponent($applet));
		},

		decompile:function($applet) {
			return lzw.dec(encodeURIComponent($applet));
		},
		
		validUUID:function($uuid) {
		
			if (this['vld']($uuid) && $uuid!=="") { 
			
				if (( ($uuid.split("-").length - 1) ==4 )?true:false) {
					if ($uuid.charAt(4)=="1" && $uuid.charAt(17)=="9" && $uuid.charAt(22)=="6" && $uuid.charAt(30)=="9") {
						return true;
					} else {
						if (location.protocol==='file:' && M$['getDevMode']()) {
							this['error']('Validation Failed, Bad UUID!');
							return false;		
						}
					} /* Embedded Code Check */
					
				} /* Format Check */
				
			} /* General Valid Check */
			
		},
		
		generateUUID:function() {
			return 'xxxx1xxx-xxxx-4xx9-yxx6-xxxxxx9xxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		},
								
		/**
		 * Called to force document to update itself
		 * @method redraw
		 * @return 
		 */
		redraw:function() {
			var $body = D$.getElementsByTagName("body")[0];
			$body.style.display='none';
			$body.offsetHeight=$body.offsetHeight;
			$body.style.display='block';	
		},
		
		/**
		 * Add a META tag to the head of the document
		 *
		 * @method
		 * @param {string} $name
		 * @param {string} $content
		 */
		addMeta:function($name,$content) {
			try {
				var _={el:null,head:H$};
				
				if (!_.head.contains($name)) {
					_.el=D$.createElement('meta');
					_.el.id=_.el.name=$name;
					_.el.content = $content;
					_.head.appendChild(_.el);
				}
			} catch (e) {
				M$['err'](this,e,_,Array.prototype.slice.call(arguments, 0));
			}
		},

		createMeta:function() {
			/*---/ Add META Tags /------------------------*/
			
			//this.addMeta('viewport','width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
			//this.addMeta('viewport','width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
			//this.addMeta('http-equiv="Cache-control"',this['config']['config']['app'].htmlCacheCtrl);
			this.addMeta('description',this['config']['config']['app']['description']);
			this.addMeta('author',this['config']['config']['app'].author);
			this.addMeta('keywords',this['config']['config']['app'].keywords);
			this.addMeta('copyright',this['config']['config']['app'].copyright);
		},
		
		/**
		 * I2tm Labs Analytics/Error Reports/etc.
		 * http://ipduh.com/ip/?66.249.75.190 IP Address Lookup
		 58.22.17.59 China {Hacker BOT?}
		 192.187.106.210	European Union	
		 157.55.32.149		msn.com
		 66.249.75.190		googlebot.com
		 66.249.73.44		googlebot.com		crawl-66-249-73-44.googlebot.com
		 */
		ha:function(i,s,o,g,r,a,m) {
			//$n({a:'clk',b:'element'});
		},
		/**
		 * Google analytics wrapper.methods, Only send requests when in live mode not developer. MWDL required to enable
		 * @method
		 * @param {} i
		 * @param {} s
		 * @param {} o
		 * @param {} g
		 * @param {} r
		 * @param {} a
		 * @param {} m
		 * @expose 
		 */
		ga:function(i,s,o,g,r,a,m) {if (this.google) this['google']['ga'](i,s,o,g,r,a,m);},

		//===================================================================================================//
		//=-=|EVENTS|=-======================================================================================//
		//===================================================================================================//
		/** @expose */
		_onScreenSizeChanged:function() {
			this['debug']('Window Size has changed.');
			
			if (this.layout !== 'absolute') return;
		},
		/** @expose */
		_onResizeComplete:function() {
			this.debug('Window resize detected.');
			
			//Updated displayed ads if display size has changed.
			if (this.google.$adSenseLoaded)
				this.google.onResize();
				
			//If ACE & NanoFM are loaded set height value
			this.autoSizeACE();
			this.testOrientation();
		},

		/**
		 *  Called when switching in/out of fullscreen mode.
		 * @method _onFullscreenChange
		 * @expose
		 * @return 
		 */
		_onFullscreenChange: function () {
		   var $c = M$['gei']('waCANVAS');
			if (document.mozFullScreen || document.webkitIsFullScreen) {
				$c.style.width = window.screen.width + 'px';
				$c.style.height = window.screen.height + 'px';
			} else {
				$c.style.width = this.config.screen.width + 'px';
				$c.style.height = this.config.screen.height + 'px';
			}
		},

		/** @expose */
		onLayoutLoaded:function(html) {
			this['gei']('wrapper').innerHTML=html;
			this['debug']('Layout loaded and active.');
		},
		
		//Called when each file is loaded
		/** @expose */
		_onLoaded:function($res,$src) {
			var _={};
			//=-=|TODO: Re-write this to use Maestro|=-=//
			if (this['vld']($src)) {	
				_.ext = M$['gex']($src),
				_.path,
				_.fileName = M$['gfn']($src);
				_.parts = $src.split("?"),
				_.size = $res.length;
		
				if (_.fileName==="") {
					this['warn']('Invalid Ajax URI received: '+$src);
					return;
				}
				this.$totalBytesLoaded+=_.size;
				if (_.parts.length==1) {
					_.path = $src.substring($src.lastIndexOf('/') + 1);
				} else {
					_.ext = M$['gex'](_.parts[0]),
					_.path = _.parts[0].substring(0, _.parts[0].lastIndexOf("/"));
				}

				if (_.fileName=="modernizr.min.js") {					
					var a=D$.createElement('script');
					a.id='modernizr'
					a.type='application/javascript';
					a.text='\n\r/* '+_.fileName+' */\n\r'+$res;
					M$['get']("head")[0].appendChild(a);				
				} else if (_.ext==="nano") {
					this['onLayoutLoaded']($res);
				} else if (_.ext==="css") {
					//Create Primary Stylesheet Element
					var $script = D$.createElement("style");
					$script.id=_.fileName;
					$script.rel = "stylesheet";
					$script.type = "text/css";
					$script.media ="all";
					$script.textContent='.define_'+_.fileName+'\n\r'+$res;
					try {
						M$['get']("head")[0].appendChild($script);
					} catch (e) {
						_.args = Array.prototype.slice.call(arguments, 0);
						M$['err'](this,e,_,Array.prototype.slice.call(arguments, 0));
					}				
				} else if (_.ext==="js") {
					//Create Primary Javascript Element
					var $script = D$.createElement("script");
					$script.id=_.fileName;
					$script.type = "application/javascript";
					$script.text=$res;
					try {
						M$['gei']("tail").appendChild($script);
					} catch (e) {
						_.args = Array.prototype.slice.call(arguments, 0);
						M$['err'](this,e,_,Array.prototype.slice.call(arguments, 0));
					}
				}
				
				this['debug']('Loaded: '+_.fileName+" ("+_.size+" bytes)");
			}
		},
		
		//Called when each file has failed
		_onErrored:function($res) {
			this['debug']('Failed: ',this['Class']);
		},
						
		_onInterval:function($steps,$count,$fps){
			if (this['scripts']['length']>0) {
				this['finished']=false;
				this['debug']('Processing que...'+this['scripts']['length']+' files left.');
				var $src = this['scripts'].shift();
				M$.xhr(
					$src,
					this._onLoaded.bind(this),
					this._onErrored.bind(this),
					'get',
					null,
					false
				);
			} else {
				if (!this['finished']) this['debug']('Transfers complete, sleeping...');
				this['finished']=true;
				if (this['google']) this['google']['loaded']();
			}

			if (this['finished']&&this['ready'] && !this['readyCalled']) {
				if (typeof(window.nanoREADY) === "function") {
					this['debug']('nanoREADY found, Invoking...');
					window.nanoREADY();
				}
				this['readyCalled']=true;
				this['debug']('Application is Ready...');
				M$['pld']();				
			} 
		},
		
		_onTimerDone:function(self) {
			if (!this.finished) {
				var $m = 'Unable to load & initialize application within 15 seconds, aborting.';
				this['info']($m);
				alert($m);
			}	
			M$['pld']();
		},
		
		/**
		 * Return a string name for this interface prototype
		 *
		 * @method toString
		 * @expose 
		 * @this {I$Interface}
		 * @returns {string}
		 */
		toString:function ()
		{
			return (this['Class']===undefined)?
				'I$CloudApplication':
				this['Class']['fullName'] + ' [id: ' + (this['objectId']||0) + ']';
				
		}
	},
	//=-=|Optional|=-=//
	{
		/** @augments I$CloudApplication */
		/*
		someInterfaceName:I$SomeInterface,
		...
		someInterfaceName:I$SomeInterface
		*/
	},
	//=-=|Optional|=-=//
	[
		/** @export Member */
		/*
		someMethod:I$InterfaceMethod,
		...
		someMethod:I$InterfaceMethod
		*/
	]
);

