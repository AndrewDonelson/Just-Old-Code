/*global H5C3:true, h5c3:true, gamecore:true, DOC:true, CHK:true, GEI:true, VLD:true, CNT:true, CTX:true, GEN:true, GEC:true, ESA:true, EGA:true, AEA:true, AET:true, PUW:true, AST:true */
/*jslint indent: 4, maxerr: 20, passfail: false, white: true, browser: true, sub: true, nomen: true, plusplus: true, unparam: true */
/** 
 * @preserve H5C3 Framework v0.9.9-alpha-Developer
 * Built Fri Sep 20 16:30:45 2013
 * http://h5c3.i2tmlabs.com/?license.txt
 * Copyright 2013 by i2tm labs - all rights reserved.
 */
//"use strict";
/**
 * @fileoverview This is a file where deprecation checks are disabled.
 * @suppress  {suspiciousCode}
 */
/**
 * @namespace 3rd_Party
 * @global
 * @object String
 * @description
 * string.js
 * James Padolsey
 * http://james.padolsey.com
 * -
 * Some useful additional methods for String.prototype.
 */
(function(){
    
    var methods = {
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description pad a string with any character you want to a given length
		 */
		pad: function($str, $totalChars, $padWith) {
			$str = $str + ""; // force num to be string
			$padWith = ($padWith) ? $padWith :" "; // set default pad
			if ( $str.length < $totalChars ) {
				while ( $str.length < $totalChars ) {
					$str += $padWith;
				}
			}
			return $str;
		},
		
		/**        
		 * @function
		 * @global
		 * @description Converts an object into a string.
		 * @param {obj} Object to convert
		 * @param {boolean} if true each property is seperated by comma (single line"Default") otherwise new line for each property.
		 * @Return {string} 
		 */
		objToString:function($obj,$inline) {
			if (typeof $obj === 'undefined') return $obj;
			if (typeof $inline==='undefined' || $inline === false) $lf=', '; else $lf='\n';
			var $str = '';
			for (var p in $obj) {
				if ($obj.hasOwnProperty(p)) {
				
					if (typeof $obj[p] === 'object') {
						$str+='\n';
						$obj[p] = this.objToString($obj[p],$inline);
					}
					$str += p + '::' + $obj[p] + $lf;
				}
			}
			$str += $lf;
			return $str;
		},
		
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns string with all instances of
		 * "-word" replaced with "Word", E.g.
		 * "background-color" -> "backgroundColor"
		 */
        camelize: function() {
            
            return this.replace(/\-(\w)/g, function( $0, $1 ) {
                return $1.toUpperCase();
            });
        
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns boolean indicating whether
		 * or not a substring exists within the string
		 */
        contains: function( what ) {
            
            what = typeof what === 'string' ? what : what.toString();
            
            return this.indexOf( what ) > -1;
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns a number indicating how many times
		 * a substring or regex is matched within the string
		 */
        count: function( what ) {
            
            if ( Object.prototype.toString.call(what) !== '[object RegExp]' ) {
                what = what.toString().replace(/\$\^\[\]\{\}\(\)\?\:\.\+\*/g, '\\$1');
            }
            
            what = RegExp( what ? what.source : '.', 'g' );
            
            return (this.match( what ) || []).length;
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns string with all instances
		 * of -w replaced with W, e.g.
		 * "background-color" -> "backgroundColor"
		 */
        enclose: function( a, b ) {
            
            return (a = a || '') + this + (b ? b : a);
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Matches the string against the passed regex
		 * and the returns the group specified by _n_
		 * 
		 * E.g.
		 *     ""('hi @boo and @adam').extract(/@(\w+)/g, 1);""
		 *       => ['boo', 'adam']
		 *       
		 * If the regex is global then an array is returned
		 * otherwise just the matched group is returned.
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
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Runs the passed function on every character,
		 * similar to Array.prototype.forEach
		 */
        forEach: function( fn ) {
        
            var c, i = -1;
            
            while ( (c = this[++i]) ) {
                fn.call( this, c, i );
            }
            
            return true;
        
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Runs the passed function on every word,
		 * similar to Array.prototype.forEach
		 */
        forEachWord: function( fn ) {
            
            var string = this,
                i = -1;
            
            string.replace(/\b([\w\-]+)\b/g, function( match, word ){
                fn.call( string, word, ++i );
                return match;
            });
            
            return true;
        
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns a string with all URLs replaced
		 * with HTML anchor tags.
		 */
        linkify: function( replacement ) {
            
            return this.replace(/(^|\s)((?:f|ht)tps?:\/\/[^\s]+)/g, replacement || '$1<a href="$2">$2</a>');
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns a string which is made up of
		 * _n_ instances of the original string.
		 * E.g. "a".many(3) => "aaa"
		 */
        many: function( n ) {
                        
            return Array(n ? n + 1 : 2).join(this);
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Randomizes a string; messes up all the characters.
		 * E.g. "abcdef".randomize() => "bcfdea"
		 */
        randomize: function() {
                        
            return this.split('').sort(function(){
                return Math.random() > 0.5 ? -1 : 1;
            }).join('');
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns a string with all matches of
         * what (regex) removed.
		 */
        remove: function( what ) {
            
            return this.replace( what || /./g, '' );
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
         * Returns the string, reversed.
		 */
        reverse: function() {
            
            return this.split('').reverse().join('');
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Shortens the string by the specified amount
		 * and appends the token.
		 * E.g.
		 * "this is a long sentance".shorten(10, '...');
		 *  => "this is a ..."
		 */
        shorten: function( length, token ) {
            
            var substrd = this.substring( 0, length || this.length );
            
            return substrd + ( substrd === this ? '' : (token || '') );
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Runs the Array.sort() method on every
		 * character of the string.
		 */
        sort: function() {
            
            return Array.prototype.sort.apply( this.split(''), arguments ).join('');
        
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns the DOM representation of the string,
		 * in the form of an array of DOM nodes.
		 */
        toDOM: function() {
            
            var temp = document.createElement('div');
            temp.innerHTML = this;
            
            return Array.prototype.slice.call( div.childNodes );
            
        },
        
		/**        
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Returns the string with leading and
		 * trailing spaces removed.
		 */
        trim: function() {
            
            return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        
        },
        
		/**
		 * @memberof 3rd_Party
		 * @function
		 * @global
		 * @description
		 * Wraps the string.
		 * E.g.
		 * "the dog realllly wet".wrap(4, '<br/>')
		 *  => "the <br/>dog <br/>realllly <br/>wet"
		 **/
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
// Domain Public by Eric Wendelin http://eriwen.com/ (2008)
//                  Luke Smith http://lucassmith.name/ (2008)
//                  Loic Dachary <loic@dachary.org> (2008)
//                  Johan Euphrosine <proppy@aminche.com> (2008)
//                  Oyvind Sean Kinsey http://kinsey.no/blog (2010)
//                  Victor Homyakov <victor-homyakov@users.sourceforge.net> (2010)
/*global module, exports, define, ActiveXObject*/
(function(global, factory) {

	/** Disabled playing nice since RequireJS is being a dick */
    if (typeof exports === 'object') {
        // Node
        module.exports = factory();
    //} else if (typeof define === 'function' && define.amd) {
        // AMD
     //   define(factory);
    } else {
        // Browser globals
        global.printStackTrace = factory();
    }
}(this, function() {
    /**
     * Main function giving a function stack trace with a forced or passed in Error
     *
     * @cfg {Error} e The error to create a stacktrace from (optional)
     * @cfg {Boolean} guess If we should try to resolve the names of anonymous functions
     * @return {Array} of Strings with functions, lines, files, and arguments where possible
     */
    function printStackTrace(options) {
        options = options || {guess: true};
        var ex = options.e || null, guess = !!options.guess;
        var p = new printStackTrace.implementation(), result = p.run(ex); result.push(ex);
        return (guess) ? p.guessAnonymousFunctions(result) : result;
    }

    printStackTrace.implementation = function() {
    };

    printStackTrace.implementation.prototype = {
        /**
         * @param {Error} ex The error to create a stacktrace from (optional)
         * @param {String} mode Forced mode (optional, mostly for unit tests)
         */
        run: function(ex, mode) {
            ex = ex || this.createException();
            // examine exception properties w/o debugger
            //for (var prop in ex) {alert("Ex['" + prop + "']=" + ex[prop]);}
            mode = mode || this.mode(ex);
            if (mode === 'other') {
                return this.other(arguments.callee);
            } else {
                return this[mode](ex);
            }
        },

        createException: function() {
            try {
                this.undef();
            } catch (e) {
                return e;
            }
        },

        /**
         * Mode could differ for different exception, e.g.
         * exceptions in Chrome may or may not have arguments or stack.
         *
         * @return {String} mode of operation for the exception
         */
        mode: function(e) {
            if (e['arguments'] && e.stack) {
                return 'chrome';
            } else if (e.stack && e.sourceURL) {
                return 'safari';
            } else if (e.stack && e.number) {
                return 'ie';
            } else if (e.stack && e.fileName) {
                return 'firefox';
            } else if (e.message && e['opera#sourceloc']) {
                // e.message.indexOf("Backtrace:") > -1 -> opera9
                // 'opera#sourceloc' in e -> opera9, opera10a
                // !e.stacktrace -> opera9
                if (!e.stacktrace) {
                    return 'opera9'; // use e.message
                }
                if (e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
                    // e.message may have more stack entries than e.stacktrace
                    return 'opera9'; // use e.message
                }
                return 'opera10a'; // use e.stacktrace
            } else if (e.message && e.stack && e.stacktrace) {
                // e.stacktrace && e.stack -> opera10b
                if (e.stacktrace.indexOf("called from line") < 0) {
                    return 'opera10b'; // use e.stacktrace, format differs from 'opera10a'
                }
                // e.stacktrace && e.stack -> opera11
                return 'opera11'; // use e.stacktrace, format differs from 'opera10a', 'opera10b'
            } else if (e.stack && !e.fileName) {
                // Chrome 27 does not have e.arguments as earlier versions,
                // but still does not have e.fileName as Firefox
                return 'chrome';
            }
            return 'other';
        },

        /**
         * Given a context, function name, and callback function, overwrite it so that it calls
         * printStackTrace() first with a callback and then runs the rest of the body.
         *
         * @param {Object} context of execution (e.g. window)
         * @param {String} functionName to instrument
         * @param {Function} callback function to call with a stack trace on invocation
         */
        instrumentFunction: function(context, functionName, callback) {
            context = context || window;
            var original = context[functionName];
            context[functionName] = function instrumented() {
                callback.call(this, printStackTrace().slice(4));
                return context[functionName]._instrumented.apply(this, arguments);
            };
            context[functionName]._instrumented = original;
        },

        /**
         * Given a context and function name of a function that has been
         * instrumented, revert the function to it's original (non-instrumented)
         * state.
         *
         * @param {Object} context of execution (e.g. window)
         * @param {String} functionName to de-instrument
         */
        deinstrumentFunction: function(context, functionName) {
            if (context[functionName].constructor === Function &&
                context[functionName]._instrumented &&
                context[functionName]._instrumented.constructor === Function) {
                context[functionName] = context[functionName]._instrumented;
            }
        },

        /**
         * Given an Error object, return a formatted Array based on Chrome's stack string.
         *
         * @param e - Error object to inspect
         * @return Array<String> of function calls, files and line numbers
         */
        chrome: function(e) {
            return (e.stack + '\n')
                .replace(/^\s+(at eval )?at\s+/gm, '') // remove 'at' and indentation
                .replace(/^([^\(]+?)([\n$])/gm, '{anonymous}() ($1)$2')
                .replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}() ($1)')
                .replace(/^(.+) \((.+)\)$/gm, '$1@$2')
                .split('\n')
                .slice(1, -1);
        },

        /**
         * Given an Error object, return a formatted Array based on Safari's stack string.
         *
         * @param e - Error object to inspect
         * @return Array<String> of function calls, files and line numbers
         */
        safari: function(e) {
            return e.stack.replace(/\[native code\]\n/m, '')
                .replace(/^(?=\w+Error\:).*$\n/m, '')
                .replace(/^@/gm, '{anonymous}()@')
                .split('\n');
        },

        /**
         * Given an Error object, return a formatted Array based on IE's stack string.
         *
         * @param e - Error object to inspect
         * @return Array<String> of function calls, files and line numbers
         */
        ie: function(e) {
            return e.stack
                .replace(/^\s*at\s+(.*)$/gm, '$1')
                .replace(/^Anonymous function\s+/gm, '{anonymous}() ')
                .replace(/^(.+)\s+\((.+)\)$/gm, '$1@$2')
                .split('\n')
                .slice(1);
        },

        /**
         * Given an Error object, return a formatted Array based on Firefox's stack string.
         *
         * @param e - Error object to inspect
         * @return Array<String> of function calls, files and line numbers
         */
        firefox: function(e) {
            return e.stack.replace(/(?:\n@:0)?\s+$/m, '')
                .replace(/^(?:\((\S*)\))?@/gm, '{anonymous}($1)@')
                .split('\n');
        },

        opera11: function(e) {
            var ANON = '{anonymous}', lineRE = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/;
            var lines = e.stacktrace.split('\n'), result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    var location = match[4] + ':' + match[1] + ':' + match[2];
                    var fnName = match[3] || "global code";
                    fnName = fnName.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, ANON);
                    result.push(fnName + '@' + location + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
                }
            }

            return result;
        },

        opera10b: function(e) {
            // "<anonymous function: run>([arguments not available])@file://localhost/G:/js/stacktrace.js:27\n" +
            // "printStackTrace([arguments not available])@file://localhost/G:/js/stacktrace.js:18\n" +
            // "@file://localhost/G:/js/test/functional/testcase1.html:15"
            var lineRE = /^(.*)@(.+):(\d+)$/;
            var lines = e.stacktrace.split('\n'), result = [];

            for (var i = 0, len = lines.length; i < len; i++) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    var fnName = match[1] ? (match[1] + '()') : "global code";
                    result.push(fnName + '@' + match[2] + ':' + match[3]);
                }
            }

            return result;
        },

        /**
         * Given an Error object, return a formatted Array based on Opera 10's stacktrace string.
         *
         * @param e - Error object to inspect
         * @return Array<String> of function calls, files and line numbers
         */
        opera10a: function(e) {
            // "  Line 27 of linked script file://localhost/G:/js/stacktrace.js\n"
            // "  Line 11 of inline#1 script in file://localhost/G:/js/test/functional/testcase1.html: In function foo\n"
            var ANON = '{anonymous}', lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n'), result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    var fnName = match[3] || ANON;
                    result.push(fnName + '()@' + match[2] + ':' + match[1] + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
                }
            }

            return result;
        },

        // Opera 7.x-9.2x only!
        opera9: function(e) {
            // "  Line 43 of linked script file://localhost/G:/js/stacktrace.js\n"
            // "  Line 7 of inline#1 script in file://localhost/G:/js/test/functional/testcase1.html\n"
            var ANON = '{anonymous}', lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n'), result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(ANON + '()@' + match[2] + ':' + match[1] + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
                }
            }

            return result;
        },

        // Safari 5-, IE 9-, and others
        other: function(curr) {
            var ANON = '{anonymous}', fnRE = /function\s*([\w\-$]+)?\s*\(/i, stack = [], fn, args, maxStackSize = 10;
            while (curr && curr['arguments'] && stack.length < maxStackSize) {
                fn = fnRE.test(curr.toString()) ? RegExp.$1 || ANON : ANON;
                args = Array.prototype.slice.call(curr['arguments'] || []);
                stack[stack.length] = fn + '(' + this.stringifyArguments(args) + ')';
                curr = curr.caller;
            }
            return stack;
        },

        /**
         * Given arguments array as a String, substituting type names for non-string types.
         *
         * @param {Arguments,Array} args
         * @return {String} stringified arguments
         */
        stringifyArguments: function(args) {
            var result = [];
            var slice = Array.prototype.slice;
            for (var i = 0; i < args.length; ++i) {
                var arg = args[i];
                if (arg === undefined) {
                    result[i] = 'undefined';
                } else if (arg === null) {
                    result[i] = 'null';
                } else if (arg.constructor) {
                    if (arg.constructor === Array) {
                        if (arg.length < 3) {
                            result[i] = '[' + this.stringifyArguments(arg) + ']';
                        } else {
                            result[i] = '[' + this.stringifyArguments(slice.call(arg, 0, 1)) + '...' + this.stringifyArguments(slice.call(arg, -1)) + ']';
                        }
                    } else if (arg.constructor === Object) {
                        result[i] = '#object';
                    } else if (arg.constructor === Function) {
                        result[i] = '#function';
                    } else if (arg.constructor === String) {
                        result[i] = '"' + arg + '"';
                    } else if (arg.constructor === Number) {
                        result[i] = arg;
                    }
                }
            }
            return result.join(',');
        },

        sourceCache: {},

        /**
         * @return the text from a given URL
         */
        ajax: function(url) {
            var req = this.createXMLHTTPObject();
            if (req) {
                try {
                    req.open('GET', url, false);
                    //req.overrideMimeType('text/plain');
                    //req.overrideMimeType('text/javascript');
                    req.send(null);
                    //return req.status == 200 ? req.responseText : '';
                    return req.responseText;
                } catch (e) {
                }
            }
            return '';
        },

        /**
         * Try XHR methods in order and store XHR factory.
         *
         * @return <Function> XHR function or equivalent
         */
        createXMLHTTPObject: function() {
            var xmlhttp, XMLHttpFactories = [
                function() {
                    return new XMLHttpRequest();
                }, function() {
                    return new ActiveXObject('Msxml2.XMLHTTP');
                }, function() {
                    return new ActiveXObject('Msxml3.XMLHTTP');
                }, function() {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
            ];
            for (var i = 0; i < XMLHttpFactories.length; i++) {
                try {
                    xmlhttp = XMLHttpFactories[i]();
                    // Use memoization to cache the factory
                    this.createXMLHTTPObject = XMLHttpFactories[i];
                    return xmlhttp;
                } catch (e) {
                }
            }
        },

        /**
         * Given a URL, check if it is in the same domain (so we can get the source
         * via Ajax).
         *
         * @param url <String> source url
         * @return <Boolean> False if we need a cross-domain request
         */
        isSameDomain: function(url) {
            return typeof location !== "undefined" && url.indexOf(location.hostname) !== -1; // location may not be defined, e.g. when running from nodejs.
        },

        /**
         * Get source code from given URL if in the same domain.
         *
         * @param url <String> JS source URL
         * @return <Array> Array of source code lines
         */
        getSource: function(url) {
            // TODO reuse source from script tags?
            if (!(url in this.sourceCache)) {
                this.sourceCache[url] = this.ajax(url).split('\n');
            }
            return this.sourceCache[url];
        },

        guessAnonymousFunctions: function(stack) {
            for (var i = 0; i < stack.length; ++i) {
                var reStack = /\{anonymous\}\(.*\)@(.*)/,
                    reRef = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,
                    frame = stack[i], ref = reStack.exec(frame);

                if (ref) {
                    var m = reRef.exec(ref[1]);
                    if (m) { // If falsey, we did not get any file/line information
                        var file = m[1], lineno = m[2], charno = m[3] || 0;
                        if (file && this.isSameDomain(file) && lineno) {
                            var functionName = this.guessAnonymousFunction(file, lineno, charno);
                            stack[i] = frame.replace('{anonymous}', functionName);
                        }
                    }
                }
            }
            return stack;
        },

        guessAnonymousFunction: function(url, lineNo, charNo) {
            var ret;
            try {
                ret = this.findFunctionName(this.getSource(url), lineNo);
            } catch (e) {
                ret = 'getSource failed with url: ' + url + ', exception: ' + e.toString();
            }
            return ret;
        },

        findFunctionName: function(source, lineNo) {
            // FIXME findFunctionName fails for compressed source
            // (more than one function on the same line)
            // function {name}({args}) m[1]=name m[2]=args
            var reFunctionDeclaration = /function\s+([^(]*?)\s*\(([^)]*)\)/;
            // {name} = function ({args}) TODO args capture
            // /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function(?:[^(]*)/
            var reFunctionExpression = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/;
            // {name} = eval()
            var reFunctionEvaluation = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/;
            // Walk backwards in the source lines until we find
            // the line which matches one of the patterns above
            var code = "", line, maxLines = Math.min(lineNo, 20), m, commentPos;
            for (var i = 0; i < maxLines; ++i) {
                // lineNo is 1-based, source[] is 0-based
                line = source[lineNo - i - 1];
                commentPos = line.indexOf('//');
                if (commentPos >= 0) {
                    line = line.substr(0, commentPos);
                }
                // TODO check other types of comments? Commented code may lead to false positive
                if (line) {
                    code = line + code;
                    m = reFunctionExpression.exec(code);
                    if (m && m[1]) {
                        return m[1];
                    }
                    m = reFunctionDeclaration.exec(code);
                    if (m && m[1]) {
                        //return m[1] + "(" + (m[2] || "") + ")";
                        return m[1];
                    }
                    m = reFunctionEvaluation.exec(code);
                    if (m && m[1]) {
                        return m[1];
                    }
                }
            }
            return '(?)';
        }
    };

    return printStackTrace;
}));
/*
    json2.js
    2013-05-26

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
/**
 * @namespace 3rd_Party
 * @global 
 * @object  Base64
 * @description
 *  Base64 encode / decode
 *  Updated _utf8_encode & _utf8_decode - Andrew Donelson 31JAN2013
 *  
 *  See <http://www.webtoolkit.info/>
 */
var Base64 = {
	
	/**
	* @private
	*/
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
    /**
	 * @member Base64
	 * @access public
	 * @description public method for encoding
     * 
	 * @param Mixed	input	Unencoded String
	 *
	 * @return String	Output	Base64 Encoded String
     */	
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// 
    /**
	 * @member Base64
	 * @access public
	 * @description
	 *
	 * public method for decoding
     * 
	 * @param String	Intput	Base64 Encoded String
	 *
	 * @return String	Output	Unencoded String
     */	
	decode : function (input) {
		var output = [];
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output.push(String.fromCharCode(chr1));
 
			if (enc3 != 64) {
				output.push(String.fromCharCode(chr2));
			}
			if (enc4 != 64) {
				output.push(String.fromCharCode(chr3));
			}
 
		}
 
//		output = Base64._utf8_decode(output);

        output.join('');
		return output;
 
	},
 
   /** 
	* @member Base64
	* @access public
    *
	* @link 	<http://kevin.vanzonneveld.net>
	* @link   original by: Webtoolkit.info <http://www.webtoolkit.info/>
	* @link   improved by: Kevin van Zonneveld <http://kevin.vanzonneveld.net>
	*
	* @description
	*   improved by: sowberry
	*   tweaked by: Jack
	*   bugfixed by: Onno Marsman
	*   improved by: Yves Sucaet
	*   bugfixed by: Onno Marsman
	*   bugfixed by: Ulrich
	*   bugfixed by: Rafal Kukawski
	*   improved by: kirilloid
	*
	*   @example  utf8_encode('Kevin van Zonneveld');
	*
	*   @return 1  'Kevin van Zonneveld'
	*/
	_utf8_encode:function(argString) {
	  if (argString === null || typeof argString === "undefined") {
		return "";
	  }

	  var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	  var utftext = '',
		start, end, stringl = 0;

	  start = end = 0;
	  stringl = string.length;
	  for (var n = 0; n < stringl; n++) {
		var c1 = string.charCodeAt(n);
		var enc = null;

		if (c1 < 128) {
		  end++;
		} else if (c1 > 127 && c1 < 2048) {
		  enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
		} else {
		  enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
		}
		if (enc !== null) {
		  if (end > start) {
			utftext += string.slice(start, end);
		  }
		  utftext += enc;
		  start = end = n + 1;
		}
	  }

	  if (end > start) {
		utftext += string.slice(start, stringl);
	  }

	  return utftext;
	},
 
	/**
	 * @member Base64
	 * @access public
	 * @description
	 * http://kevin.vanzonneveld.net
	 * original by: Webtoolkit.info (http://www.webtoolkit.info/)
	 * 	input by: Aman Gupta
	 *	improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	 *	improved by: Norman "zEh" Fuchs
	 *	bugfixed by: hitwork
	 *	bugfixed by: Onno Marsman
	 *	input by: Brett Zamir (http://brett-zamir.me)
	 *	bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	 *
	 *	@example 	1 	utf8_decode('Kevin van Zonneveld');
	 *	@return 	1 	'Kevin van Zonneveld'
	 */
	_utf8_decode:function(str_data) {
	  var tmp_arr = [],
		i = 0,
		ac = 0,
		c1 = 0,
		c2 = 0,
		c3 = 0;

	  str_data += '';

	  while (i < str_data.length) {
		c1 = str_data.charCodeAt(i);
		if (c1 < 128) {
		  tmp_arr[ac++] = String.fromCharCode(c1);
		  i++;
		} else if (c1 > 191 && c1 < 224) {
		  c2 = str_data.charCodeAt(i + 1);
		  tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
		  i += 2;
		} else {
		  c2 = str_data.charCodeAt(i + 1);
		  c3 = str_data.charCodeAt(i + 2);
		  tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
		  i += 3;
		}
	  }

	  return tmp_arr.join('');
	} 
};
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
}/**
 * @object h5c3
 * @author Andrew Donelson  <andrew@i2tmlabs.com>
 * @version 0.9.9-alpha
 * @distro Developer
 * 
 * <h1>H5C3 Framework Developer-0.9.9-alpha</h1>
 *
 * <p>This is the main object for the entire H5C3 Framrwork. Basically the namespace.</p>
 *
 * 	Features
 *	========
 *	<pre>
 *	- 100% HTM5 & CSS3 Compliant
 *	- Easy to use, Rapid Application Development
 *	- Integrated Developer Window w/ Console Logging, Statisical Graphs and Profiler
 *	- Total size of Framework is 94kb!
 *	- Users never have to download & install, Updates are instant & users can use on all platforms.
 *	- Simple efficient way of Creating & Extending Scenes, Layers 
 *	- Super Accurate Timer, it ajusts for drift and gives precise FPS
 *	- Advanced Throttling you can use for whatever you app needs to keep it smooth and balanced.
 *	- Factory / Worker system makes it extremely easy to manage large amounts of grouped (Factory) objects (Worker)
 *	- Simple JSON config file include on your page, reset is done for you.
 *	- Automatic Intro (I2TM Splash, H5C3 Splash)
 *	- Application / Game State Manager
 *	- Full Physics Engine powered by Box2D
 *	- Entity manager for all graphic objects
 *	- Automatic device detection (Touchpad integration)
 *	- Seamless Banner (advertising) Just right the Cloud Application / Applet and get paid.
 *	- Wide range of platforms supported
 *	- Smart AJAX 2 enabled including local filesystem access
 *	- Advanced Event Driven Error Handler with an Attitude wrapped around StackTrace.js
 *	- Intellegent Google adSense and Analytics integration.
 *	</pre>
 */

var h5c3 = {

	_CLASSNAME: 'H5C3',
	_CLASSVERSION:'0.5.1',
	/**
	 * @property String NAME
	 *
	 * Holds the name of this framework
	 */
	NAME: 'H5C3 Framework',
	/**
	 * @property String VERSION 
	 *
	 * Holds the current version of the framework
	 */
	VERSION: '0.9.9-alpha',
	/**
	 * @property String DISTRO 
	 *
	 * Holds the distrobution tag of the framework
	 */
	DISTRO: 'Developer',
	/**
	 * @property String DISTRO 
	 *
	 * Holds the distrobution tag of the framework
	 */
	BUILT: 'Fri Sep 20 16:30:45 2013',
	//Developers Collaborative 
	/**
	 * @property {object} 	path 		
	 * Holds pre-set paths
	 */
	path: {
		//Landing Page - Primary location
		home:		'http://h5c3.i2tmlabs.com/',
		//file base path
		base:		'public/sandbox/',
		applets:	'public/applets/',
		scripts:	'public/shared/js/',
		styles:		'public/shared/css/',
		images:		'public/shared/img/',
		plugins:	'public/shared/plugins/',
		user:		'public/users/',
		app: window.location.protocol + "//" + window.location.host + window.location.pathname.split("/").slice(0, -1).join("/") + "/"
	},
				
	/**
	 * @property String DISTRO 
	 *
	 * Holds the distrobution tag of the framework
	 */
	hasOwn:Object.prototype.hasOwnProperty,

	/** 
		@method 
		@param {object}
	*/
	isH5C3:function($obj) {
		return (typeof $obj === 'object' && typeof $obj.isH5C3 === 'function');
	},
	
	/** 
		@method 
		@param {object}
	*/
	isFunction:function ($obj)
	{
	   return !!($obj && $obj.constructor && $obj.call && $obj.apply);
	},

	/** 
		@method 
		@param {object}
	*/
	isWindow:function ($obj)
	{
		return !!($obj && $obj.setInterval);
	},

	/** 
		@method 
		@param {object}
	*/
	isArray:Array.isArray || function ($obj)
	{
		return ($obj.constructor === Array);
	},

	/** 
		@method 
		@param {object}
	*/
	isString:function ($obj)
	{
		return (typeof $obj == 'string');
	},

	/** 
		@method 
		@param {object}
	*/
	isObject:function ($obj)
	{
		return $obj === Object($obj);
	},

	/** 
		@method 
		@param {object}
	*/
	isPlainObject:function ($obj)
	{
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if (!$obj || this.isObject($obj) || $obj.nodeType || this.isWindow($obj))
			return false;

		try
		{
			// Not own constructor property must be Object
			if ($obj.constructor && !this.hasOwn.call($obj, "constructor") && !this.hasOwn.call($obj.constructor.prototype, "isPrototypeOf"))
				return false;

		} catch (e)
		{
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// own properties are enumerated firstly, so to speed up, if last one is own, then all properties are own.
		var $key;
		for ($key in $obj)
		{
		}

		return $key === undefined || this.hasOwn.call($obj, $key);
	},

	/**
	 * @method bind()
	 *
	 * Utility function for wrapping a callback function with its reference
	 * 
	 * @example someobject.addEventListener("click", h5c3.bind(this, this.onclick), false);
	 *
	 * @param scope		the scope you want on other end
	 * @param function	the callback function to call
	 *
	 * @return  function
	 */	
	bind:function($scope, $fn) { 
		return function () {
			$fn.apply($scope, arguments);
		};
	},

	/** @method */
	extend:function ()
	{
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean")
		{
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !h5c3.isFunction(target))
			target = {};

		if (length === i)
		{
			target = this;
			--i;
		}

		for (; i < length; i++)
		{
			// Only deal with non-null/undefined values
			if ((options = arguments[ i ]) != null)
			{
				// Extend the base object
				for (name in options)
				{
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if (target === copy)
					{
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)) ))
					{
						if (copyIsArray)
						{
							copyIsArray = false;
							clone = src && this.isArray(src) ? src : [];

						} else
						{
							clone = src && this.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = this.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined)
					{
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	},

	/**
	 * @property Boolean 	devMode 		
	 * True if we are debugging, False otherwise
	 */
	devMode: false,

	/**
	 * @property Boolean		ready  [true|false]
	 * 
	 * True 	- Everything was fine, we can load the Engine and optionally the framework
	 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
	 */
	ready: false,

	/**
	 * @constructor init()
	 * 
	 * Initialization
	 * @return {boolean}
	 */
	init: function() {
		_DBG_("Initializing...",this);
		var $msg  = 'No Configuration file detected.\n';
			$msg += 'Your very first script tag should be as below. You can change the path/file for the data-config attribute.\n';
			$msg += 'EXAMPLE: <script src="'+this.usePath('script')+'int/h5c3.debug.min.js" data-config="assets/config.js"></script>';
		/* Don't trust config - double check developer mode */
		if (!config || !config.app || !config.options) {
			if(AST(!this.getConfig(),$msg)) return this.ready; 
		} else {
			this.config = config;
			this.ready = true;
		}
		this.devMode = (this.DISTRO==="Developer"||this.DISTRO==="Developer") ? true : false;
		return this.ready;
	},
	usePath:function($path) {
		switch ($path.toLowerCase()) {
			case 	'home': 	return this.path.home; break;
			case 	'base':		return this.path.home+path.base; break;
			case 	'applets':	return this.path.home+path.applets; break;
			case 	'scripts':	return this.path.home+path.scripts; break;
			case 	'styles':	return this.path.home+path.styles; break;
			case 	'images':	return this.path.home+path.images; break;
			case 	'plugins':	return this.path.home+path.plugins; break;
			case 	'user':		return this.path.home+path.user; break;
			case 	'app':		return this.path.app; break;
		}		
	},
	getConfig:function() {
		var $result = true;
		if (location.protocol==='file:') return;
		if("undefined"===typeof this.config) { 
			var s = document.getElementsByTagName("script")[0];
			if (s.children.length===0) {
				if (s.dataset.config) {
					this.path.config = this.path.app+s.dataset.config;
				}
			} else {
				for (i=0;i<s.children.length;i++) {
					if (s.children[i].dataset.config) {
						this.path.config = this.path.app+s.children[i].dataset.config;
					}
				}
			}
			
			if (this.path.config) {
				this.XHR(
					this.path.config
					, function(){_DBG_('Loaded');}, function(){_DBG_('Error');}
				);
			} else
				$result = false;
		}
	},
	/**
	 * @method tag()
	 * 
	 * Returns the Frameworks current Name
	 * 
	 * @return String	Full name and version of the framework.
	 */
	tag: function() { return this.NAME+' v'+this.VERSION+'-'+this.DISTRO; },

	/**
	 * @method XHR()
	 * Given a complete url this function will use AJAX to load a file. It support the latest standards and CORS.
	 *
	 *
	 * @param  {String} url Source URI 	(Required)
	 * @param  {Function} onLoad Callback funtion for Successful load	(Required)
	 * @param  {Function} onError Callback function for Failed load		 
	 * @param  {string} method  HTTP verb ('GET', 'POST', 'DELETE', etc.)
	 * @param  {String} data request body
	 * @param  {boolean} trace (developer) will dump url,status, stae, and text to console.
	 */
	XHR:function($url, $onLoad, $onError, $method, $data,$trace) {

		function _onLoad() {}
		function _onError() {}
		
		function XMLReq($opts) {
			$opts.req = printStackTrace.implementation.prototype.createXMLHTTPObject();
			if('withCredentials' in $opts.req) {
				$opts.req.open($opts.method, $opts.url, true);
				$opts.req.onerror = $opts.onError;
				$opts.req.onreadystatechange = function() {
					if ($opts.trace===true) {
						var tmp = {url:$opts.url,state:this.readyState,status:this.status,text:this.statusText};
						_DBG_(String.prototype.objToString(tmp,false),h5c3);
					}
					if ($opts.req.readyState === 4) {
						if ($opts.req.status >= 200 && $opts.req.status < 400) {
							_DBG_($opts.url+' SUCCESSFUL',h5c3);
							$opts.onLoad($opts.req.responseText);
						} else {
							_DBG_($opts.url+' UNSUCCESSFUL - Check path & Filename.',h5c3);
							$opts.req.abort();
						}
					}
				};
				
				try {
					$opts.req.send($opts.data);
				} catch (e) {
					AST(null,printStackTrace({e:e}));
				}
			}
		} /* END XMLReq() */

		function XDOReq($opts) {
			$opts.req = new XDomainRequest();
			$opts.req.open($opts.method, $opts.url);
			$opts.req.onerror = $opts.onError;
			$opts.req.onload = function() {
				$onLoad($opts.req.responseText);
			};
			$opts.req.send($opts.data);
		} /* END CORReq() */
		
		
		/* BEGIN */
		if (!VLD($url)||$url==="") {
			$onError(new Error('URL provided is invalid ['+$url+']'));						
		} else {
			if (h5c3.devMode && $trace != true) $trace=false; else $trace=true;
			var $opts = {req:'', url:$url,trace:$trace};

			$opts.method 	= CHK($method,'GET');
			$opts.onLoad 	= CHK($onLoad,this._onLoad);		
			$opts.onError 	= CHK($onError,this._onError);
			$opts.data		= CHK($onError,0);
				
			
			var h=$url.indexOf("http");
				a=$url.indexOf("applet.");
			if (a && h === -1) {
				//you can load a applet locally off file system.
				_DBG_("You cannot load Applets off local filesystem. Trying H5C3 Public archive...");
				
			}
			
			try {
				if(XMLHttpRequest) { 			/* Rest of the world */
					return XMLReq($opts);
				}
				if(XDomainRequest) {			/* Microsoft IE */
					return XDOReq($opts);
				}
			} catch (e) {}
		}
	},
	
	/**
	 * @method clientFS_exists()
	 * 
	 * Called to test if we have client storage access
	 *
	 */
	clientFS_exists:function($fileName, $callback) {
		storageRootEntry.getFile($fileName, {create : false}, function() {
			$callback(true);
		}, function() {
			$callback(false);
		});
	},
	
	/**
	 * @method run()
	 * 
	 * Called via the onload event to start execution
	 *
	 */
	run: function() { 
		//if (this.ready && !VLD(this.bootstrap)) this.bootstrap = new h5c3.Bootstrap(); 
		if (!VLD(this.bootstrap)) this.bootstrap = new h5c3.Bootstrap(); 
	}	
};


/** @static */
h5c3.push = Array.prototype.push;

/** @static */
h5c3.merge = function (first, second)
{
    var i = first.length, j = 0;

    if (typeof second.length === "number")
    {
        for (var l = second.length; j < l; j++)
            first[ i++ ] = second[ j ];
    } else
    {
        while (second[j] !== undefined)
            first[ i++ ] = second[ j++ ];
    }
    first.length = i;
    return first;
};

/** @static */
h5c3.makeArray = function (array, results)
{
    var ret = results || [];

    if (array != null)
    {
        // The window, strings (and functions) also have 'length'
        // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
        if (array.length == null || h5c3.isString(array) || h5c3.isFunction(array) || h5c3.isWindow(array))
            h5c3.push.call(ret, array);
        else
            h5c3.merge(ret, array);
    }

    return ret;
};


/**
 @static
 Allows for stepping through the objects
 */
h5c3.each = function (object, callback, args)
{
    var name, i = 0,
        length = object.length,
        isObj = length === undefined || h5c3.isFunction(object);

    if (args)
    {
        if (isObj)
        {
            for (name in object)
            {
                if (callback.apply(object[ name ], args) === false)
                {
                    break;
                }
            }
        } else
        {
            for (; i < length;)
            {
                if (callback.apply(object[ i++ ], args) === false)
                {
                    break;
                }
            }
        }

        // A special, fast, case for the most common use of each
    } else
    {
        if (isObj)
        {
            for (name in object)
            {
                if (callback.call(object[ name ], name, object[ name ]) === false)
                {
                    break;
                }
            }
        } else
        {
            for (; i < length;)
            {
                if (callback.call(object[ i ], i, object[ i++ ]) === false)
                {
                    break;
                }
            }
        }
    }

    return object;
};


/**
 @static
*/
h5c3._flagsCache = {};

/**
 @static
 Allow for flag creation
 */
h5c3.createFlags = function (flags)
{
    var object = h5c3._flagsCache[ flags ] = {}, i, length;
    flags = flags.split(/\s+/);
    for (i = 0, length = flags.length; i < length; i++)
        object[ flags[i] ] = true;
    return object;
};


/**
 @static
 Allow for callback by child classes
 */
h5c3.Callbacks = function (flags)
{
    // Convert flags from String-formatted to Object-formatted
    // (we check in cache first)
    flags = flags ? ( h5c3._flagsCache[ flags ] || h5c3.createFlags(flags) ) : {};

    var // Actual callback list
        list = [],
    // Stack of fire calls for repeatable lists
        stack = [],
    // Last fire value (for non-forgettable lists)
        memory,
    // Flag to know if list is currently firing
        firing,
    // First callback to fire (used internally by add and fireWith)
        firingStart,
    // End of the loop when firing
        firingLength,
    // Index of currently firing callback (modified by remove if needed)
        firingIndex,
    // Add one or several callbacks to the list
        add = function (args)
        {
            var i, length, elem;

            for (i = 0, length = args.length; i < length; i++)
            {
                elem = args[ i ];
                if (h5c3.isArray(elem))
                {
                    // Inspect recursively
                    add(elem);
                } else if (h5c3.isFunction(elem))
                {
                    // Add if not in unique mode and callback is not in
                    if (!flags.unique || !self.has(elem))
                    {
                        list.push(elem);
                    }
                }
            }
        },
    // Fire callbacks
        fire = function (context, args)
        {
            args = args || [];
            memory = !flags.memory || [ context, args ];
            firing = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            for (; list && firingIndex < firingLength; firingIndex++)
            {
                if (list[ firingIndex ].apply(context, args) === false && flags.stopOnFalse)
                {
                    memory = true; // Mark as halted
                    break;
                }
            }
            firing = false;
            if (list)
            {
                if (!flags.once)
                {
                    if (stack && stack.length)
                    {
                        memory = stack.shift();
                        self.fireWith(memory[ 0 ], memory[ 1 ]);
                    }
                } else if (memory === true)
                {
                    self.disable();
                } else
                {
                    list = [];
                }
            }
        },
    // Actual Callbacks object
        self = {
            // Add a callback or a collection of callbacks to the list
            add:function ()
            {
                if (list)
                {
                    var length = list.length;
                    add(arguments);
                    // Do we need to add the callbacks to the
                    // current firing batch?
                    if (firing)
                    {
                        firingLength = list.length;
                        // With memory, if we're not firing then
                        // we should call right away, unless previous
                        // firing was halted (stopOnFalse)
                    } else if (memory && memory !== true)
                    {
                        firingStart = length;
                        fire(memory[ 0 ], memory[ 1 ]);
                    }
                }
                return this;
            },
            // Remove a callback from the list
            remove:function ()
            {
                if (list)
                {
                    var args = arguments,
                        argIndex = 0,
                        argLength = args.length;
                    for (; argIndex < argLength; argIndex++)
                    {
                        for (var i = 0; i < list.length; i++)
                        {
                            if (args[ argIndex ] === list[ i ])
                            {
                                // Handle firingIndex and firingLength
                                if (firing)
                                {
                                    if (i <= firingLength)
                                    {
                                        firingLength--;
                                        if (i <= firingIndex)
                                        {
                                            firingIndex--;
                                        }
                                    }
                                }
                                // Remove the element
                                list.splice(i--, 1);
                                // If we have some unicity property then
                                // we only need to do this once
                                if (flags.unique)
                                {
                                    break;
                                }
                            }
                        }
                    }
                }
                return this;
            },
            // Control if a given callback is in the list
            has:function (fn)
            {
                if (list)
                {
                    var i = 0,
                        length = list.length;
                    for (; i < length; i++)
                    {
                        if (fn === list[ i ])
                        {
                            return true;
                        }
                    }
                }
                return false;
            },
            // Remove all callbacks from the list
            empty:function ()
            {
                list = [];
                return this;
            },
            // Have the list do nothing anymore
            disable:function ()
            {
                list = stack = memory = undefined;
                return this;
            },
            // Is it disabled?
            disabled:function ()
            {
                return !list;
            },
            // Lock the list in its current state
            lock:function ()
            {
                stack = undefined;
                if (!memory || memory === true)
                {
                    self.disable();
                }
                return this;
            },
            // Is it locked?
            locked:function ()
            {
                return !stack;
            },
            // Call all callbacks with the given context and arguments
            fireWith:function (context, args)
            {
                if (stack)
                {
                    if (firing)
                    {
                        if (!flags.once)
                        {
                            stack.push([ context, args ]);
                        }
                    } else if (!( flags.once && memory ))
                    {
                        fire(context, args);
                    }
                }
                return this;
            },
            // Call all the callbacks with the given arguments
            fire:function ()
            {
                self.fireWith(this, arguments);
                return this;
            },
            // To know if the callbacks have already been called at least once
            fired:function ()
            {
                return !!memory;
            }
        };

    return self;
};

/**
 @static
 
 Allows the extending of child classes
*/
h5c3.extend({

	/** @method */
    Deferred:function (func)
    {
        var doneList = h5c3.Callbacks("once memory"),
            failList = h5c3.Callbacks("once memory"),
            progressList = h5c3.Callbacks("memory"),
            state = "pending",
            lists = {
                resolve:doneList,
                reject:failList,
                notify:progressList
            },
            promise = {
                done:doneList.add,
                fail:failList.add,
                progress:progressList.add,

                state:function ()
                {
                    return state;
                },

                // Deprecated
                isResolved:doneList.fired,
                isRejected:failList.fired,

                then:function (doneCallbacks, failCallbacks, progressCallbacks)
                {
                    deferred.done(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);
                    return this;
                },
                always:function ()
                {
                    deferred.done.apply(deferred, arguments).fail.apply(deferred, arguments);
                    return this;
                },
                pipe:function (fnDone, fnFail, fnProgress)
                {
                    return h5c3.Deferred(function (newDefer)
                    {
                        h5c3.each({
                            done:[ fnDone, "resolve" ],
                            fail:[ fnFail, "reject" ],
                            progress:[ fnProgress, "notify" ]
                        }, function (handler, data)
                        {
                            var fn = data[ 0 ],
                                action = data[ 1 ],
                                returned;
                            if (h5c3.isFunction(fn))
                            {
                                deferred[ handler ](function ()
                                {
                                    returned = fn.apply(this, arguments);
                                    if (returned && h5c3.isFunction(returned.promise))
                                    {
                                        returned.promise().then(newDefer.resolve, newDefer.reject, newDefer.notify);
                                    } else
                                    {
                                        newDefer[ action + "With" ](this === deferred ? newDefer : this, [ returned ]);
                                    }
                                });
                            } else
                            {
                                deferred[ handler ](newDefer[ action ]);
                            }
                        });
                    }).promise();
                },

				/** @method 
					Get a promise for this deferred
					If obj is provided, the promise aspect is added to the object
					@param {object}
				*/
                promise:function (obj)
                {
                    if (obj == null)
                    {
                        obj = promise;
                    } else
                    {
                        for (var key in promise)
                        {
                            obj[ key ] = promise[ key ];
                        }
                    }
                    return obj;
                }
            },
            deferred = promise.promise({}),
            key;

        for (key in lists)
        {
            deferred[ key ] = lists[ key ].fire;
            deferred[ key + "With" ] = lists[ key ].fireWith;
        }

		/** @method
            Handle state
		*/
        deferred.done(function ()
        {
            state = "resolved";
        }, failList.disable, progressList.lock).fail(function ()
            {
                state = "rejected";
            }, doneList.disable, progressList.lock);

        // Call given func if any
        if (func)
        {
            func.call(deferred, deferred);
        }

        // All done!
        return deferred;
    },

	/** @method 
        Deferred helper
	*/
    when:function (firstParam)
    {
        var // Static reference to slice
            sliceDeferred = [].slice;
        var args = sliceDeferred.call(arguments, 0),
            i = 0,
            length = args.length,
            pValues = new Array(length),
            count = length,
            deferred = length <= 1 && firstParam && h5c3.isFunction(firstParam.promise) ?
                firstParam :
                h5c3.Deferred(),
            promise = deferred.promise();

        function resolveFunc(i)
        {
            return function (value)
            {
                args[ i ] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                if (!( --count ))
                {
                    deferred.resolveWith(deferred, args);
                }
            };
        }

        function progressFunc(i)
        {
            return function (value)
            {
                pValues[ i ] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                deferred.notifyWith(promise, pValues);
            };
        }

        if (length > 1)
        {
            for (; i < length; i++)
            {
                if (args[ i ] && args[ i ].promise && h5c3.isFunction(args[ i ].promise))
                {
                    args[ i ].promise().then(resolveFunc(i), deferred.reject, progressFunc(i));
                } else
                {
                    --count;
                }
            }
            if (!count)
            {
                deferred.resolveWith(deferred, args);
            }
        } else if (deferred !== firstParam)
        {
            deferred.resolveWith(deferred, length ? [ firstParam ] : []);
        }
        return promise;
    }
});

(function (gc)
{
    var regs = {
            undHash:/_|-/,
            colons:/::/,
            words:/([A-Z]+)([A-Z][a-z])/g,
            lowUp:/([a-z\d])([A-Z])/g,
            dash:/([a-z\d])([A-Z])/g,
            replacer:/\{([^\}]+)\}/g,
            dot:/\./
        },
        getNext = function (current, nextPart, add)
        {
            return current[nextPart] || ( add && (current[nextPart] = {}) );
        },
        isContainer = function (current)
        {
            var type = typeof current;
            return type && (  type == 'function' || type == 'object' );
        },
        getObject = function (objectName, roots, add)
        {
            var parts = objectName ? objectName.split(regs.dot) : [],
                length = parts.length,
                currents = gc.isArray(roots) ? roots : [roots || window],
                current,
                ret,
                i,
                c = 0;

            if (length == 0)
            {
                return currents[0];
            }
            while (current = currents[c++])
            {
                for (i = 0; i < length - 1 && isContainer(current); i++)
                {
                    current = getNext(current, parts[i], add);
                }
                if (isContainer(current))
                {

                    ret = getNext(current, parts[i], add);

                    if (ret !== undefined)
                    {

                        if (add === false)
                        {
                            delete current[parts[i]];
                        }
                        return ret;

                    }

                }
            }
        },

        /**
         * A collection of useful string helpers.
         */
        str = gc.String = {
            /**
             * @function
             * @desc Gets an object from a string.
             * @param {String} name the name of the object to look for
             * @param {Array} [roots] an array of root objects to look for the name
             * @param {Boolean} [add] true to add missing objects to
             *  the path. false to remove found properties. undefined to
             *  not modify the root object
             */
            getObject:getObject,

            /**
             * Capitalizes a string
             * @param {String} s the string.
             * @return {String} a string with the first character capitalized.
             */
            capitalize:function (s)
            {
                return s.charAt(0).toUpperCase() + s.substr(1);
            },
            /**
             * Capitalizes a string from something undercored. Examples:
             * @codestart
             * h5c3.String.camelize("one_two") //-> "oneTwo"
             * "three-four".camelize() //-> threeFour
             * @codeend
             * @param {String} s
             * @return {String} a the camelized string
             */
            camelize:function (s)
            {
                s = str.classize(s);
                return s.charAt(0).toLowerCase() + s.substr(1);
            },
            /**
             * Like camelize, but the first part is also capitalized
             * @param {String} s
             * @return {String} the classized string
             */
            classize:function (s, join)
            {
                var parts = s.split(regs.undHash),
                    i = 0;
                for (; i < parts.length; i++)
                {
                    parts[i] = str.capitalize(parts[i]);
                }

                return parts.join(join || '');
            },
            /**
             * Like [h5c3.String.classize|classize], but a space separates each 'word'
             * @codestart
             * h5c3.String.niceName("one_two") //-> "One Two"
             * @codeend
             * @param {String} s
             * @return {String} the niceName
             */
            niceName:function (s)
            {
                return str.classize(s, ' ');
            },

            /**
             * Underscores a string.
             * @codestart
             * h5c3.String.underscore("OneTwo") //-> "one_two"
             * @codeend
             * @param {String} s
             * @return {String} the underscored string
             */
            underscore:function (s)
            {
                return s.replace(regs.colons, '/').replace(regs.words, '$1_$2').replace(regs.lowUp, '$1_$2').replace(regs.dash, '_').toLowerCase();
            },
            /**
             * Returns a string with {param} replaced values from data.
             *
             *     h5c3.String.sub("foo {bar}",{bar: "far"})
             *     //-> "foo far"
             *
             * @param {String} s The string to replace
             * @param {Object} data The data to be used to look for properties.  If it's an array, multiple
             * objects can be used.
             * @param {Boolean} [remove] if a match is found, remove the property from the object
             */
            sub:function (s, data, remove)
            {
                var obs = [];
                obs.push(s.replace(regs.replacer, function (whole, inside)
                {
                    //convert inside to type
                    var ob = getObject(inside, data, typeof remove == 'boolean' ? !remove : remove),
                        type = typeof ob;
                    if ((type === 'object' || type === 'function') && type !== null)
                    {
                        obs.push(ob);
                        return "";
                    } else
                    {
                        return "" + ob;
                    }
                }));
                return obs.length <= 1 ? obs[0] : obs;
            }
        }

})(h5c3);

(function (gc)
{

    // if we are initializing a new class
    var initializing = false,
        makeArray = gc.makeArray,
        isFunction = gc.isFunction,
        isArray = gc.isArray,
        extend = gc.extend,

        cloneObject = function (object)
        {
            if (!object || typeof(object) != 'object')
                return object;

            // special case handling of array (deep copy them)
            if (object instanceof Array)
            {
                var clone = [];
                for (var c = 0; c < object.length; c++)
                    clone[c] = cloneObject(object[c]);
                return clone;
            }
            else // otherwise, it's a normal object, clone it's properties
            {
                var cloneObj = {};
                for (var prop in object)
                    cloneObj[prop] = cloneObject(object[prop]);
                return cloneObj;
            }
        },

        concatArgs = function (arr, args)
        {
            return arr.concat(makeArray(args));
        },

        // tests if we can get super in .toString()
        fnTest = /xyz/.test(function ()
        {
            xyz;
        }) ? /\b_super\b/ : /.*/,

        inheritProps = function (newProps, oldProps, addTo)
        {
            // overwrites an object with methods, sets up _super
            // newProps - new properties
            // oldProps - where the old properties might be
            // addTo - what we are adding to
            addTo = addTo || newProps
            for (var name in newProps)
            {
                // Check if we're overwriting an existing function
                addTo[name] = isFunction(newProps[name]) &&
                    isFunction(oldProps[name]) &&
                    fnTest.test(newProps[name]) ? (function (name, fn)
                {
                    return function ()
                    {
                        var tmp = this._super, ret;

                        // Add a new ._super() method that is the same method but on the super-class
                        this._super = oldProps[name];

                        // The method only need to be bound temporarily, so we remove it when we're done executing
                        ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, newProps[name]) : newProps[name];
            }
        },

        clss = gc.Class = function ()
        {
            if (arguments.length)
            {
                return clss.extend.apply(clss, arguments);
            }
        };

    /* @Static*/
    extend(clss, {
        callback:function (funcs)
        {
            //args that should be curried
            var args = makeArray(arguments),
                self;

            funcs = args.shift();

            if (!isArray(funcs))
            {
                funcs = [funcs];
            }

            self = this;

            return function class_cb()
            {
                var cur = concatArgs(args, arguments),
                    isString,
                    length = funcs.length,
                    f = 0,
                    func;

                for (; f < length; f++)
                {
                    func = funcs[f];
                    if (!func)
                        continue;

                    isString = typeof func == "string";
                    if (isString && self._set_called)
                        self.called = func;

                    cur = (isString ? self[func] : func).apply(self, cur || []);
                    if (f < length - 1)
                        cur = !isArray(cur) || cur._use_call ? [cur] : cur
                }
                return cur;
            }
        },

        getObject:gc.String.getObject,

        newInstance:function ()
        {
            var inst = this.rawInstance();
            var args;

            if (inst.setup)
                args = inst.setup.apply(inst, arguments);

            // Added by martin@playcraftlabs.com -- fix for deep cloning of properties
           for (var prop in inst.__proto__)
               inst[prop] = cloneObject(inst[prop]);

            if (inst.init)
                inst.init.apply(inst, isArray(args) ? args : arguments);

            return inst;
        },

        setup:function (baseClass, fullName)
        {
            this.defaults = extend(true, {}, baseClass.defaults, this.defaults);
            if (this._types == undefined) this._types = [];
            this._types.push(this.fullName);
            if (this._fullTypeName == undefined) this._fullTypeName = '|';
            this._fullTypeName += this.fullName + '|';
            return arguments;
        },
        rawInstance:function ()
        {
            initializing = true;
            var inst = new this();
            initializing = false;
            return inst;
        },

        extend:function (fullName, klass, proto)
        {
            // figure out what was passed
            if (typeof fullName != 'string')
            {
                proto = klass;
                klass = fullName;
                fullName = null;
            }
            if (!proto)
            {
                proto = klass;
                klass = null;
            }

            proto = proto || {};
            var _super_class = this,
                _super = this.prototype,
                name, shortName, namespace, prototype;

            // append the isA function
            this.isA = function (typeName)
            {
                return this._fullTypeName.indexOf('|' + typeName + '|') != -1;
            };

            // Instantiate a base class (but only create the instance,
            // don't run the init constructor)
            initializing = true;
            prototype = new this();
            initializing = false;
            // Copy the properties over onto the new prototype
            inheritProps(proto, _super, prototype);

            // The dummy class constructor

            function Class()
            {
                // All construction is actually done in the init method
                if (initializing) return;
				try {
					if (this.constructor !== Class && arguments.length)
					{ //we are being called w/o new
						return arguments.callee.extend.apply(arguments.callee, arguments)
					} else
					{ //we are being called w/ new
						// copy objects
						return this.Class.newInstance.apply(this.Class, arguments)
					}
				} catch (e) {
					_DBG_(printStackTrace({e:e}),this.Class);
					return null;
				}
            }

            // Copy old stuff onto class
            for (name in this)
                if (this.hasOwnProperty(name))
                    Class[name] = cloneObject(this[name]);

            // copy new props on class
            inheritProps(klass, this, Class);

            // do namespace stuff
            if (fullName)
            {
                var parts = fullName.split(/\./);
                var shortName = parts.pop();
				var current='';

                // Martin Wells (playcraft): bug fix. Don't add a namespace object if the class name
                // has no namespace elements (i.e. it's just "MyClass", not "MyProject.MyClass")
                if (parts.length > 0)
                {
                    current = clss.getObject(parts.join('.'), window, true),
                    namespace = current;
                }

                current[shortName] = Class;
            }

            // set things that can't be overwritten
            extend(Class, {
                prototype:prototype,
                namespace:namespace,
                shortName:shortName,
                constructor:Class,
                fullName:fullName
            });

            //make sure our prototype looks nice
            Class.prototype.Class = Class.prototype.constructor = Class;

            var args = Class.setup.apply(Class, concatArgs([_super_class], arguments));

            if (Class.init)
                Class.init.apply(Class, args || []);

            /* @Prototype*/

            return Class;
        }
    });

    clss.prototype.callback = clss.callback;

})(h5c3);


/**
 * @class h5c3.Base
 * 
 * A base class providing logging, object counting and unique object id's
 * Examples:
 *
 * Unique ID and total objects:
 * <pre><code>
 * var Fighter = h5c3.Base.extend('Fighter', {}, {});
 * var fighter1 = new Fighter();
 * var fighter2 = new Fighter();
 * fighter1.uniqueId;    // -> 'Fighter:0'
 * fighter2.uniqueId;    // -> 'Fighter:1'
 * Fighter.totalObjects; // -> 2
 * </code></pre>
 *
 * Logging: (log, info, warn, error, debug)
 * <pre><code>
 * fighter1.warn('oops'); // == console.log('Fighter:0 [WARN] oops');
 * </code></pre>
 */
h5c3.Base = h5c3.Class('h5c3.Base',
    /** @lends h5c3.Base */
    {
		_CLASSVERSION:'0.4.3',
        totalObjects:0,
        WARN:'WARN',
        DEBUG:'DEBUG',
        ERROR:'ERROR',
        INFO:'INFO',

		/*
        log:function (id, type, args)
        {
            var idString = '';
            if (id) idString = ':' + id;
            //console.log(this.fullName + idString + ' [' + type + '] ' + message);
            console.log.apply(console, [this.fullName + idString + ' [' + type + '] '].concat(Array.prototype.slice.call(args)));
        },
		*/

		log: function (id, type, args) {
			var $log = GEI("waConsoleLog");
            var idString = '';
            if (id) idString = ':' + id;
			var $msg = [this.fullName + idString + '\t\t [' + type + '] \t\t'].concat(Array.prototype.slice.call(args));

			if (VLD($log)) {
				$log.value += $msg + '\n';
				$log.scrollTop = $log.scrollHeight;
			}
			window.console.log.apply(console, $msg);
		},
        warn:function ($message)
        {
            this.log(null, this.WARN, $message);
        },

        debug:function ($message)
        {
            this.log(null, this.DEBUG, $message);
        },

        error:function ($message)
        {
            this.log(null, this.ERROR, $message);
        },

        info:function ($message)
        {
            this.log(null, this.INFO, $message);
        },

        assert:function ($msg, $condition)
        {
            if (!$condition)
                throw $msg;
        }

    },
    /** @lends h5c3.Base.prototype */
    {
        objectId:0,
        uniqueId:null,

        init:function ()
        {
        },

        setup:function ()
        {
            this.objectId = this.Class.totalObjects++;
            this.uniqueId = this.Class.fullName + ':' + this.objectId;
        },

        /**
         * @return {String} A system-wide unique Id for this object instance
         */
        getUniqueId:function ()
        {
            // if you see a null error here, then likely you have forgotten to call
            // this._super in a subclassed init method.
            return this.uniqueId;
        },

        /**
         * @return {String} A hash matching this object. Override this to implement different
         * kinds of object hashing in derived classes.
         */
        hashCode:function ()
        {
            return this.getUniqueId();
        },

        warn:function ()
        {
            this.Class.log(this.objectId, this.Class.WARN, arguments);
        },
        debug:function ()
        {
            this.Class.log(this.objectId, this.Class.DEBUG, arguments);
        },
        error:function ()
        {
            this.Class.log(this.objectId, this.Class.ERROR, arguments);
        },
        info:function ()
        {
            this.Class.log(this.objectId, this.Class.INFO, arguments);
        },

        toString:function ()
        {
            return this.Class.fullName + ' [id: ' + this.objectId + ']';
        }
    });


/**
 * @class h5c3.Device
 * Staic class with lots of device information.
 */
h5c3.Device = h5c3.Base.extend('h5c3.Device', {
	_CLASSNAME: 'Device',
	_CLASSVERSION:'1.1.0',
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
	 @constructor
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
					//function (callback, element)
					function (callback)
					{
						window.setTimeout(callback, 16, Date.now());
					};

			// apply to our window global to avoid illegal invocations (it's a native)
			return function (callback, element)
			{
				request.apply(window, [callback, element]);
			};
		})();

	},

	/**
	 * @method canPlay()
	 * 
	 * Check to see which media sound formats can be played
	 *
	 * @return {boolean}
	 */
	canPlay: function(format)
	{
		if (format.toLowerCase() === 'mp3' && this.canPlayMP3) return true;
		if (format.toLowerCase() === 'ogg' && this.canPlayOgg) return true;
		if (format.toLowerCase() === 'wav' && this.canPlayWav) return true;
		return false;
	},

	/**
	 * @method canPlay()
	 * 
	 * Return the amount of memory we are using
	 *
	 * @return {number}
	 */
	getUsedHeap:function ()
	{
		return this.hasMemoryProfiling ? window.performance.memory.usedJSHeapSize : 0;
	},

	/**
	 * @method canPlay()
	 * 
	 * Return he total amount of memory available
	 *
	 * @return {number}
	 */
	getTotalHeap:function ()
	{
		return this.hasMemoryProfiling ? window.performance.memory.totalJSHeapSize : 0;
	}
},{
        // Singleton static class, so nothing required here
});


/**
 * @class h5c3.HashList
 * 
 * A map of linked lists mapped by a string value
 */
h5c3.HashList = h5c3.Base.extend('h5c3.HashList', {
	_CLASSNAME: 'HashList',
	_CLASSVERSION:'0.4.4'
	},
    /** @lends h5c3.HashList */
    {
        /** Internal hash table of lists */
        hashtable: null,

        /**
		 * @constructor
         * Constructs a new hash list
         */
        init: function()
        {
            this.hashtable = new h5c3.Hashtable();
        },

        /**
         * Add an object to a list based on the given key. If the list doesn't yet exist it will be constructed.
         * @param {String} key Key
         * @param {Object} object Object to store
         */
        add: function(key, object)
        {
            // find the list associated with this key and add the object to it
            var list = this.hashtable.get(key);
            if (list == null)
            {
                // no list associated with this key yet, so let's make one
                list = new pc.LinkedList();
                this.hashtable.put(key, list);
            }
            list.add(object);
        },

        /**
         * Removes an object from the list
         * @param {String} key Key for the list to remove the object from
         * @param {Object} object Object to remove
         */
        remove: function(key, object)
        {
            var list = this.hashtable.get(key);
            if (list == null) throw "No list for a key in hashlist when removing";
            list.remove(object);
        },

        /**
         * Get a list associated with a given key
         * @param {String} key The key
         * @return {h5c3.LinkedList} The list
         */
        get: function(key)
        {
            return this.hashtable.get(key);
        }
    });
	
	
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
 * (Slight mod to add to h5c3 namespace -- martin@playcraftlabs.com)
 */

/**
 * @class h5c3.Hashtable
 *
 * jshashtable is a JavaScript implementation of a hash table. It creates a single constructor function called Hashtable
 * in the global scope.
 * Example:
 * <code>
 *     var map = new h5c3.Hashtable();
 *     map.put('test1', obj);
 *     var obj = map.get('test1');
 * </code>
 */
h5c3.Hashtable = (function ()
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

    function equals_fixedValueHasEquals(fixedValue, variableValue)
    {
        return fixedValue.equals(variableValue);
    }

    function equals_fixedValueNoEquals(fixedValue, variableValue)
    {
        return (typeof variableValue.equals == FUNCTION) ?
            variableValue.equals(fixedValue) : (fixedValue === variableValue);
    }

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

    /*----------------------------------------------------------------------------------------------------------------*/

    function Bucket(hash, firstKey, firstValue, equalityFunction)
    {
        this[0] = hash;
        this.entries = [];
        this.addEntry(firstKey, firstValue);

        if (equalityFunction !== null)
        {
            this.getEqualityFunction = function ()
            {
                return equalityFunction;
            };
        }
    }

    var EXISTENCE = 0, ENTRY = 1, ENTRY_INDEX_AND_VALUE = 2;

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
        getEqualityFunction:function (searchValue)
        {
            return (typeof searchValue.equals == FUNCTION) ? equals_fixedValueHasEquals : equals_fixedValueNoEquals;
        },

        getEntryForKey:createBucketSearcher(ENTRY),

        getEntryAndIndexForKey:createBucketSearcher(ENTRY_INDEX_AND_VALUE),

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

        addEntry:function (key, value)
        {
            this.entries[this.entries.length] = [key, value];
        },

        keys:createBucketLister(0),

        values:createBucketLister(1),

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

    /*----------------------------------------------------------------------------------------------------------------*/

    // Supporting functions for searching hashtable buckets

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

    function getBucketForHash(bucketsByHash, hash)
    {
        var bucket = bucketsByHash[hash];

        // Check that this is a genuine bucket and not something inherited from the bucketsByHash's prototype
        return ( bucket && (bucket instanceof Bucket) ) ? bucket : null;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    function Hashtable(hashingFunctionParam, equalityFunctionParam)
    {
        var that = this;
        var buckets = [];
        var bucketsByHash = {};

        var hashingFunction = (typeof hashingFunctionParam == FUNCTION) ? hashingFunctionParam : hashObject;
        var equalityFunction = (typeof equalityFunctionParam == FUNCTION) ? equalityFunctionParam : null;

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

        this.containsKey = function (key)
        {
            checkKey(key);
            var bucketKey = hashingFunction(key);

            // Check if a bucket exists for the bucket key
            var bucket = getBucketForHash(bucketsByHash, bucketKey);

            return bucket ? bucket.containsKey(key) : false;
        };

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

        this.clear = function ()
        {
            buckets.length = 0;
            bucketsByHash = {};
        };

        this.isEmpty = function ()
        {
            return !buckets.length;
        };

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

        this.size = function ()
        {
            var total = 0, i = buckets.length;
            while (i--)
            {
                total += buckets[i].entries.length;
            }
            return total;
        };

        this.each = function (callback)
        {
            var entries = that.entries(), i = entries.length, entry;
            while (i--)
            {
                entry = entries[i];
                callback(entry[0], entry[1]);
            }
        };

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

        this.clone = function ()
        {
            var clone = new Hashtable(hashingFunctionParam, equalityFunctionParam);
            clone.putAll(that);
            return clone;
        };

        /**
         * Added by martin@playcratlabs.com to support debug dumping of hash arrays
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
 * @class h5c3.LinkedNode
 * 
 * Represents an item stored in a linked list.
 */
h5c3.LinkedNode = h5c3.Base.extend('h5c3.LinkedNode', {
	_CLASSVERSION:'0.1.0'
	},
    /** @lends h5c3.LinkedNode.prototype */
    {
        obj:null, // the object reference
        nextLinked:null, // link to next object in the list
        prevLinked:null, // link to previous object in the list
        free:true,

        /**
		 * @constructor
         * Constructs a new linked Node
         */
        init:function ()
        {
            this._super();
        },

        /**
		 * @method next()
         * @return {pc.LinkedListNode} Next node on the list
         */
        next:function ()
        {
            return this.nextLinked;
        },

        /**
		 * @method object()
         * @return {Object} Object this node represents on the list
         */
        object:function ()
        {
            return this.obj;
        },

        /**
		 * @method prev()
         * @return {pc.LinkedListNode} Prev node on the list
         */
        prev:function ()
        {
            return this.prevLinked;
        }

    });

/**
 * @class h5c3.LinkedList
 * 
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
 *       node.object().DOSOMETHING();
 *       node = node.next();
 *   }
 * </code></pre>
 */
h5c3.LinkedList = h5c3.Base.extend('h5c3.LinkedList', {
    /** @lends h5c3.LinkedList */
	_CLASSNAME: 'LinkedList',
	_CLASSVERSION:'0.1.0'
    },
    /** @lends h5c3.LinkedList.prototype */
    {
        first:null,
        last:null,
        count:0,
        objToNodeMap:null, // a quick lookup list to map linked list nodes to objects

        /**
		 * @constructor
         * Constructs a new linked list
         */
        init:function ()
        {
            this._super();
            this.objToNodeMap = new h5c3.Hashtable();
        },

        /**
		 * @method getNode()
         * Get the LinkedListNode for this object.
         * @param obj The object to get the node for
         */
        getNode:function (obj)
        {
            // objects added to a list must implement a getUniqueId which returns a unique object identifier string
            // or just extend h5c3.Base to get it for free
            return this.objToNodeMap.get(obj.getUniqueId());
        },

        /**
		 * @method addNode()
         * Adds a specific node to the list -- typically only used internally unless you're doing something funky
         * Use add() to add an object to the list, not this.
         */
        addNode:function (obj)
        {
            var node = new h5c3.LinkedNode();
            node.obj = obj;
            node.prevLinked = null;
            node.nextLinked = null;
            node.free = false;
            this.objToNodeMap.put(obj.getUniqueId(), node);
            return node;
        },

        /**
		 * @method add()
         * Add an item to the list
         * @param obj The object to add
         */
        add:function (obj)
        {
            var node = this.getNode(obj);
            if (node == null)
            {
                node = this.addNode(obj);
            } else
            {
                // if the object is already in the list just throw an (can't add an object more than once)
                // if you want to quickly check if an item is already in a list, then call list.has(obj)
                if (node.free === false)
                    throw 'Attempting to add object: ' + obj.getUniqueId() + ' twice to list ' + this.getUniqueId();

                // reusing a node, so we clean it up
                // this caching of node/object pairs is the reason an object can only exist
                // once in a list -- which also makes things faster (not always creating new node
                // object every time objects are moving on and off the list
                node.obj = obj;
                node.free = false;
                node.nextLinked = null;
                node.prevLinked = null;
            }

            // append this obj to the end of the list
            if (this.first == null) // is this the first?
            {
                this.first = node;
                this.last = node;
                node.nextLinked = null; // clear just in case
                node.prevLinked = null;
            } else
            {
                if (this.last == null)
                    throw "Hmm, no last in the list -- that shouldn't happen here";

                // add this entry to the end of the list
                this.last.nextLinked = node; // current end of list points to the new end
                node.prevLinked = this.last;
                this.last = node;            // new object to add becomes last in the list
                node.nextLinked = null;      // just in case this was previously set
            }
            this.count++;

            if (this.showDebug) this.dump('after add');
        },

		/**
		 * @method has()
		 * @param {object}
		 * @return {boolean}
		 */
        has:function (obj)
        {
            var node = this.getNode(obj);
            return !(node === null || node.free === true);
        },

        /**
         * Moves this item upwards in the list
		 * @method moveUp()
         * @param obj
         */
        moveUp:function (obj)
        {
            this.dump('before move up');
            var c = this.getNode(obj);
            if (!c) throw "Oops, trying to move an object that isn't in the list";
            if (c.prevLinked == null) return; // already first, ignore

            // This operation makes C swap places with B:
            // A <-> B <-> C <-> D
            // A <-> C <-> B <-> D

            var b = c.prevLinked;
            var a = b.prevLinked;

            // fix last
            if (c == this.last)
                this.last = b;

            var oldCNext = c.nextLinked;

            if (a)
                a.nextLinked = c;
            c.nextLinked = b;
            c.prevLinked = b.prevLinked;

            b.nextLinked = oldCNext;
            b.prevLinked = c;

            // check to see if we are now first
            if (this.first == b)
                this.first = c;
        },

        /**
         * Moves this item downwards in the list
		 * @method moveDown()
         * @param obj
         */
        moveDown:function (obj)
        {
            var b = this.getNode(obj);
            if (!b) throw "Oops, trying to move an object that isn't in the list";
            if (b.nextLinked == null) return; // already last, ignore

            // This operation makes B swap places with C:
            // A <-> B <-> C <-> D
            // A <-> C <-> B <-> D

            var c = b.nextLinked;
            this.moveUp(c.obj);

            // check to see if we are now last
            if (this.last == c)
                this.last = b;
        },

        /**
         * Sorts the list
		 * @method sort()
         * @param obj
         */
        sort:function (compare)
        {
            // take everything off the list and put it in an array
            var sortArray = [];
            var node = this.first;
            while (node)
            {
                sortArray.push(node.object());
                node = node.next();
            }

            this.clear();

            // sort it
            sortArray.sort(compare);

            // then put it back
            for (var i = 0; i < sortArray.length; i++)
                this.add(sortArray[i]);
        },

        /**
         * Removes an item from the list
		 * @method remove()
         * @param obj The object to remove
         * @return boolean true if the item was removed, false if the item was not on the list
         */
        remove:function (obj)
        {
            if (this.showDebug) this.dump('before remove of ' + obj);
            var node = this.getNode(obj);
            if (node === null || node.free === true)
                return false; // ignore this error (trying to remove something not there
            //throw ('Error: trying to remove a node (' + obj + ') that isnt on the list ');

            // pull this object out and tie up the ends
            if (node.prevLinked != null)
                node.prevLinked.nextLinked = node.nextLinked;
            if (node.nextLinked != null)
                node.nextLinked.prevLinked = node.prevLinked;

            // fix first and last
            if (node.prevLinked == null) // if this was first on the list
                this.first = node.nextLinked; // make the next on the list first (can be null)
            if (node.nextLinked == null) // if this was the last
                this.last = node.prevLinked; // then this nodes previous becomes last

            node.free = true;
            node.prevLinked = null;
            node.nextLinked = null;

            this.count--;
            if (this.showDebug) this.dump('after remove');

            return true;
        },

        /**
         * Clears the list out
		 * @method clear()
         */
        clear:function ()
        {
            // sweep the list and free all the nodes
            var next = this.first;
            while (next != null)
            {
                next.free = true;
                next = next.nextLinked;
            }
            this.first = null;
            this.count = 0;
        },

        /**
		 * get the total number of nodes
		 * @method sort()
         * @return number of items in the list
         */
        length:function ()
        {
            return this.count;
        },

        /**
		 * @method dump()
         * Outputs the contents of the current list. Usually for debugging.
         */
        dump:function (msg)
        {
           _DBG_('====================' + msg + '=====================',this.Class);
            var a = this.first;
            while (a != null) {
                _DBG_("{" + a.obj.toString() + "} previous=" + ( a.prevLinked ? a.prevLinked.obj : "NULL"),this.Class);
                a = a.next();
            }
			
			var $out = "Last: {" + (this.last ? this.last.obj : 'NULL') + "} First: {" + (this.first ? this.first.obj : 'NULL') + "}";

           _DBG_("===================================",this.Class);
           _DBG_($out,this.Class);
        }

    });

/**
 * @class h5c3.PerformanceMeasure
 * Example:
 * <code>
 * var measure = new h5c3.PerformanceMeasure('A test');
 * // ... do something
 * console.log(measure.end()); // end returns a string you can easily log
 * </code>
 *
 * The memory count is an idea based on a delta of the useJSHeapSize exposed by Chrome.
 * You will need to restart Chrome with --enable-memory-info to have this exposed.
 * It is however, not very reliable as the value will jump around due to gc runs (I think).
 * So far it seems to produce reliable results that are consistent, however memStart > memEnd
 * cases still occur and it would be good to understand this more (is it limited only to GC
 * runs? if so, why is it so consistent?).
 */
h5c3.PerformanceMeasure = h5c3.Base.extend('h5c3.PerformanceMeasure',
    /** @lends h5c3.PerformanceMeasure */
{
	_CLASSNAME: 'PerformanceMeasure',
	_CLASSVERSION:'0.1.0',
    history: [],

    /**
	 * @method clearhistory()
     * Clears the performance history
     */
    clearHistory: function()
    {
        history.length = 0;
    }
},{
	/** @property timeStart */
    timeStart: 0,

	/** @property timeEnd */
    timeEnd: 0,

	/** @property timeDelat */
    timeDelat: 0,

	/** @property memStart */
    memStart: 0,

	/** @property memEnd */
    memEnd: 0,

	/** @property memDelta */
    memDelta: 0,

	/** @property description */
    description: null,

    /**
     * Constructs a new performance measure with description
	 * @constructor
     * @param description
     */
    init: function(description)
    {
        this.description = description;
        this.start();
        this.Class.history.push(this);
    },

    /**
     * Starts a performance measure
	 * @method start()
	 * @return {none}
     */
    start: function()
    {
        this.timeStart = Date.now();
        this.memStart = h5c3.Device.getUsedHeap();
    },

    /**
     * Ends a performance measure, and for convenience returns a toString of the measurement
	 * @method end()
     * @return String representing the measurement
     */
    end: function()
    {
        this.timeEnd = Date.now();
        this.timeDelta = this.timeEnd - this.timeStart;
        this.memEnd = h5c3.Device.getUsedHeap();

        if (this.memEnd < this.memStart)
            this.memDelta = 0;
        else
            this.memDelta = this.memEnd - this.memStart;
        return this.toString();
    },

    /**
     * Reports the performance measurement in a nice clean way
	 * @method toString()
	 * @return {String}
     */
    toString: function()
    {
        return this.description + ' took ' + this.timeDelta + 'ms, ' +
            (this.memDelta == 0 ? 'unknown':this.memDelta) + ' byte(s)';
    }

});

/**
 * @class h5c3.Pool
 * Easy (high-performance) object pooling
 *
 * A pool of objects for use in situations where you want to minimize object life cycling (and
 * subsequently garbage collection). It also serves as a very high speed, minimal overhead
 * collection for small numbers of objects.
 * <p>
 * This class maintains mutual an array of objects which are free. If you wish to maintain a list of both
 * free and used then see the h5c3.DualPool.
 * <p>
 * Pools are managed by class type, and will auto-expand as required. You can create a custom initial pool
 * size by deriving from the Pool class and statically overriding INITIAL_POOL_SIZE.
 * <p>
 * Keep in mind that objects that are pooled are not constructed; they are "reset" when handed out.
 * You need to "acquire" one and then reset its state, usually via a static create factory method.
 * <p>
 * Example:
 * <pre><code>
 * Point = h5c3.Pooled('Point',
 * {
 *   // Static constructor
 *   create:function (x, y)
 *   {
 *      var n = this._super();
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
 */
h5c3.Pool = h5c3.Base.extend('h5c3.Pool',
    /** @lends h5c3.Pool */
    {
		_CLASSNAME:'Pool',
		_CLASSVERSION:'0.1.0',
        /** Initial size of all object pools */
        INITIAL_POOL_SIZE:1,

        /** Hashtable of ALL the object pools */
        pools:new h5c3.Hashtable(),
        /** total objects in all pools */
        totalPooled:0,
        /** total objects in use right now */
        totalUsed:0,

        /**
         * Acquire an object from a pool based on the class[name]. Typically this method is
         * automatically called from Pooled.create method and should not be used directly.
		 * @method acquire()
         * @param {String} classType Class of object to create
         * @return {h5c3.Pooled} A shiny object you can then configure
         */
        acquire:function (classType)
        {
            var pool = this.getPool(classType);
            if (pool == undefined || pool == null)
            {
                // create a pool for this type of class
                //this.info('Constructing a new pool for ' + classType.fullName + ' objects.');
                pool = new h5c3.Pool(classType, this.INITIAL_POOL_SIZE);
                this.pools.put(classType.fullName, pool);
            }

            return pool.acquire();
        },

        /**
         * Releases an object back into it's corresponding object pool
		 * @method release()
         * @param {h5c3.Pooled} pooledObj Object to return to the pool
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
		 * @method getPool()
         * @return {h5c3.Pool} Object pool associated with the class type
         */
        getPool:function (classType)
        {
            return this.pools.get(classType.fullName);
        },

        /**
         * Gets stats on the usage of all pools.
		 * @method getStats()
         * @return {String} Stats string
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
    /** @lends h5c3.Pool.prototype */
    {
        /** Linked list of currently free objects residing in the pool */
        freeList:null,
        /** Current number of items to expand by: will increase with every expansion */
        expansion: 1,
        /** Array of traces currently active. Tracing must be on. */
        traces: null,

        /**
         * Constructs a pool. Will automatically be called by the static pool method. Generally not called directly.
		 * @constructor 
         * @param {String} classType Class name of the type of objects in the pool
         * @param {Number} initial Starting number of objects in the pool
         */
        init:function (classType, initial)
        {
            this._super();
            this.classType = classType;
            this.freeList = [];

            // instantiate the initial objects for the pool
            this.expand(initial);
        },

        /**
         * Enables tracing on this pool.
		 * @method startTracing()
         */
        startTracing:function ()
        {
            if (this.tracing) return;
            this.tracing = true;
            if (this.traces)
                this.traces.clear();
            else
                this.traces = new h5c3.Hashtable();
        },

        /**
         * Disables tracing on this pool.
		 * @method stopTracing()
         */
        stopTracing:function ()
        {
            this.tracing = false;
        },

        /**
         * Expand the pool of objects by constructing a bunch of new ones. The pool will
         * automatically expand itself by 10% each time it runs out of space, so generally you
         * shouldn't need to use this.
		 * @method expand()
         * @param {Number} howMany Number of new objects you want to add
         */
        expand:function (howMany)
        {
            h5c3.Pool.totalPooled += howMany;

            //debug: if you want to track expansion
            //this.debug('expanding ' + this.classType.fullName + ' by ' + howMany + ' total=' + h5c3.Pool.totalPooled);

            for (var i = 0; i < howMany; i++)
                this.freeList.push(new this.classType());
        },

        /**
         * Gets the free count of objects left in the pool
		 * @method getFreeCount()
         * @return {Number} Number free
         */
        getFreeCount: function()
        {
            return this.freeList.length;
        },

        /**
         * Returns the next free object by moving it from the free pool to the used one. If no free objects are
         * available it will expand the pool
		 * @method acquire()
         * @return {h5c3.Pooled} A pooled object
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

            if (this.tracing)
            {
                var stack = printStackTrace();
                var pos = stack.length - 1;
                while (stack[pos].indexOf('Class.addTo') == 0 && pos > 0)
                    pos--;
                var count = this.traces.get(stack[pos]);
                if (count == null)
                    this.traces.put(stack[pos], { value:1 });
                else
                    count.value++;
            }

            return this.freeList.pop();
        },

        /**
         * Releases an object by moving it back onto the free pool
		 * @method release()
         * @param {h5c3.Pooled} obj The obj to release back into the pool
         */
        release:function (obj)
        {
            this.freeList.push(obj);
        },

        /**
         * Gets stats about the pool
		 * @method getStats()
         * @return {String} Stats
         */
        getStats:function ()
        {
            var s = this.Class.fullName + ' stats: ' + this.freeList.length + ' free.';

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
		 * @method dump()
         * @param {String} msg A string to write before the dump
         */
        dump:function (msg)
        {
            this.info('================== ' + msg + ' ===================');
            this.info('FREE');
            this.freeList.dump();
        },

        /**
         * Returns the number of objects in the pool
		 * @method size()
         * @return {Number} Total objects
         */
        size:function ()
        {
            return this.freeList.length;
        },

        /**
         * Returns the LinkedList of currently free objects in the pool
		 * @method getFreeList()
         * @return {h5c3.LinkedList} List of free objects
         */
        getFreeList:function ()
        {
            return this.freeList;
        }

    });

/**
 * @class h5c3.DualPool
 * 
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
 * Point = h5c3.Pooled('Point',
 * {
 *   // Static constructor
 *   create:function (x, y)
 *   {
 *      var n = this._super();
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
 */
h5c3.DualPool = h5c3.Pool.extend('h5c3.DualPool',
    /** @lends h5c3.DualPool */
    {
		_CLASSNAME: 'DualPool',
		_CLASSVERSION:'0.1.0',
        /**
         * Acquire an object from a pool based on the class[name]. Typically this method is
         * automatically called from Pooled.create method and should not be used directly.
		 * @method acquire()
         * @param {String} classType Class of object to create
         * @return {h5c3.Pooled} A shiny object you can then configure
         */
        acquire:function (classType)
        {
            var pool = this.getPool(classType);
            if (pool == undefined || pool == null)
            {
                pool = new h5c3.DualPool(classType, this.INITIAL_POOL_SIZE);
                this.pools.put(classType.fullName, pool);
            }

            return pool.acquire();
        },

        /**
         * Gets stats on the usage of all pools.
		 * @method getStats()
         * @return {String} Stats string
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
    /** @lends h5c3.DualPool.prototype */
    {
        /** Linked list of currently free objects residing in the pool */
        freeList:null,
        /** Linked list of currently used objects not in the pool */
        usedList:null,

        /**
         * Constructs a pool. Will automatically be called by the static pool method. Generally not called directly.
		 * @constructor 
         * @param {String} classType Class name of the type of objects in the pool
         * @param {Number} initial Starting number of objects in the pool
         */
        init:function (classType, initial)
        {
            this.classType = classType;
            this.usedList = new h5c3.LinkedList();
            this.freeList = new h5c3.LinkedList();

            // instantiate the initial objects for the pool
            this.expand(initial);
        },

        /**
         * Expand the pool of objects by constructing a bunch of new ones. The pool will
         * automatically expand itself by 10% each time it runs out of space, so generally you
         * shouldn't need to use this.
		 * @method expand()
         * @param {Number} howMany Number of new objects you want to add
         */
        expand:function (howMany)
        {
            h5c3.Pool.totalPooled += howMany;
            for (var i = 0; i < howMany; i++)
                this.freeList.add(new this.classType());
        },

        returnObj:null,

        /**
         * Returns the next free object by moving it from the free pool to the used one.
		 * @method acquire()
         * @return {h5c3.DualPooled} A pooled object you can then configure
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

            if (this.tracing)
            {
                var stack = printStackTrace();
                var pos = stack.length - 1;
                while (stack[pos].indexOf('Class.addTo') == 0 && pos > 0)
                    pos--;
                var count = this.traces.get(stack[pos]);
                if (count == null)
                    this.traces.put(stack[pos], { value:1 });
                else
                    count.value++;
            }

            return this.returnObj;
        },

        /**
         * Releases an object by moving it from the used list back to the free list.
		 * @method release()
         * @param obj {h5c3.DualPooled} The obj to release back into the pool
         */
        release:function (obj)
        {
            this.freeList.add(obj);
            this.usedList.remove(obj);
        },

        /**
         * Dumps stats about usage to the debug info (generally console)
		 * @method dump()
         * @param {String} msg Message to display before the dump
         */
        dump:function (msg)
        {
            this.info('================== ' + msg + ' ===================');
            this.info('FREE');
            this.freeList.dump();
            this.info('USED');
            this.usedList.dump();
        },

        /**
         * Returns the number of objects in both the free and used pool
         */
        size:function ()
        {
            return this.freeList.count + this.usedList.count;
        },

        /**
         * Returns the LinkedList of current used objects
		 * @method getUsedList()
         * @return {h5c3.LinkedList}
         */
        getUsedList:function ()
        {
            return this.usedList;
        }
    });

/**
 * @class h5c3.Pooled
 * 
 * Used as a base class for objects which are life cycle managed in an object pool.
 */
h5c3.Pooled = h5c3.Base.extend('h5c3.Pooled', {
    /** @lends h5c3.Pooled */ 
		_CLASSNAME: 'Pooled',
		_CLASSVERSION:'0.1.0',
        /**
         * Static factory method for creating a new object based on its class. This method
         * should be called using this._super from the Class.create that derives from this.
         * @return {h5c3.Pooled} An object from the pool
         */
        create:function ()
        {
            return h5c3.Pool.acquire(this);
        },

        /**
         * Get the object pool associated with this object class
		 * @method getPool()
         * @return {h5c3.Pool} The object pool
         */
        getPool:function ()
        {
            return h5c3.Pool.getPool(this);
        }

    },
    /** @lends h5c3.Pooled.prototype */
    {
        /** Has the object been destroyed (returned to the pool) */
        destroyed:false,

        /**
         * Constructor for the object (default calls base class init)
		 * @method init()
         */
        init:function ()
        {
            this._super();
        },

        /**
         * Release the object back into the pool
		 * @method release()
         */
        release:function ()
        {
            this.onRelease();
            h5c3.Pool.release(this);
        },

        /**
         * Template callback when an object is released; gives you a chance to do your own cleanup / releasing
		 * @event acquire()
         */
        onRelease:function ()
        {
        }

    });

/**
 * @class h5c3.DualPooled
 * 
 * Used as a base class for objects which are life cycle managed in an object pool (the DualPool edition)
 */
h5c3.DualPooled = h5c3.Base.extend('h5c3.DualPooled', {
    /** @lends h5c3.DualPool */
		_CLASSNAME: 'DualPooled',
		_CLASSVERSION:'0.1.0',
        /**
         * Static factory method for creating a new object based on its class. This method
         * should be called using this._super from the Class.create that derives from this.
         * @return {h5c3.Pooled} An object from the pool
         */
        create:function ()
        {
            return h5c3.DualPool.acquire(this);
        },

        /**
         * Get the object pool associated with this object class
		 * @method getPool()
         * @return {h5c3.Pool} The object pool
         */
        getPool:function ()
        {
            return h5c3.DualPool.getPool(this);
        }

    },
    /** @lends h5c3.DualPool.prototype */
    {
        /** Has the object been destroyed (returned to the pool) */
        destroyed:false,

        /**
         * Constructor for the object (default calls base class init)
		 * @method init()
         */
        init:function ()
        {
            this._super();
        },

        /**
         * Release the object back into the pool
		 * @method release()
         */
        release:function ()
        {
            this.onRelease();
            h5c3.DualPool.release(this);
        },

        /**
         * Template callback when an object is released; gives you a chance to do your own cleanup / releasing
		 * @event acquire()
         */
        onRelease:function ()
        {
        }

    });
	
/**
 * @property factories	Container
 * Container for all Factory objects.
 */
h5c3.factories = {};
/**
 * @property Array 	plugin	
 * Container for all plugins components.
 */
h5c3.plugin = new h5c3.Hashtable();
/**
 * @property Array systems		
 * Container for all loaded Systems.
 */
h5c3.systems = new h5c3.Hashtable();
/**
 * @property Array components		
 * Container for all loaded components.
 */
h5c3.components = new h5c3.Hashtable();

_DBG_(h5c3.tag() + ' loaded.',h5c3);
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
h5c3.errorhandler = new h5c3.ErrorHandler();/**
 * @namespace Core
 * @class h5c3.LZW
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * <p>
 * 
 * <pre><code>
 * 
 * </code></pre>
 * 
 * </p>
 */
h5c3.LZW = h5c3.Base.extend('h5c3.LZW', {
	/** @lends h5c3.base */
	_CLASSNAME: 'LZW',
	_CLASSVERSION:'1.0.0'
},{
	/** @augments h5c3.Base */
	
    /**
	 * @contructor
	 * @memberof Core
	 * @desc
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function () {
        this._super();
    },
	
    /**
	 * @member
	 * @access public
	 * @memberof Core
	 * @desc
     * </p>
	 * LZW-compress a string
	 * </p>
     */	
	encode:function(s) {
		var dict = {};
		var data = (s + "").split("");
		var out = [];
		var currChar;
		var phrase = data[0];
		var code = 256;
		for (var i=1; i<data.length; i++) {
			currChar=data[i];
			if (dict[phrase + currChar] != null) {
				phrase += currChar;
			}
			else {
				out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
				dict[phrase + currChar] = code;
				code++;
				phrase=currChar;
			}
		}
		out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
		for (var i=0; i<out.length; i++) {
			out[i] = String.fromCharCode(out[i]);
		}
		return out.join("");
	},

	
    /**
	 * @member
	 * @access public
	 * @memberof Core
	 * @desc
     * </p>
	 *  Decompress an LZW-encoded string
	 * </p>
     */
	decode:function(s) {
		var dict = {};
		var data = (s + "").split("");
		var currChar = data[0];
		var oldPhrase = currChar;
		var out = [currChar];
		var code = 256;
		var phrase;
		for (var i=1; i<data.length; i++) {
			var currCode = data[i].charCodeAt(0);
			if (currCode < 256) {
				phrase = data[i];
			}
			else {
			   phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
			}
			out.push(phrase);
			currChar = phrase.charAt(0);
			dict[code] = oldPhrase + currChar;
			code++;
			oldPhrase = phrase;
		}
		return out.join("");
	}	
});
/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 *
 * xmlToJSON function:
 * This work is licensed under Creative Commons GNU LGPL License.
 * License: http://creativecommons.org/licenses/LGPL/2.1/
 * Version: 0.9
 * Author:  Stefan Goessner/2006
 * Web:     http://goessner.net/
 */

/**
 * @class  h5c3.Tools
 * 
 * 
 * 
 * A collection of useful tools. This is a static class, so you can just call methods directly, i.e.
 * 
 * var cleanValue = h5c3.Tools.checked(value, 'default');
 * (end)
 * There are shortcuts for the following common tools functions to make like a little easier:
 * 
 * VLD = h5c3.Tools.isValid;
 * CHK = h5c3.Tools.checked;
 * AST = h5c3.Tools.assert;
 * (end)
 */
h5c3.Tools = h5c3.Base.extend('h5c3.Tools', {
	_CLASSNAME: 'Tools',
	_CLASSVERSION:'0.5.6',
	/**
	 * Removes an element from an array
	 * @param  Array array The array to remove the element from
	 * @param  Mixed e The element to remove
	 */
	arrayRemove:function (array, e)
	{

		//for (var i = 0; i < array.length; i++)
		for (var i = array.length - 1; i >= 0; i--)
		{
			if (array[i] == e)
				array.splice(i, 1);
		}
	},

	/**
	 * Adds an element to an array, but only if it isn't already there
	 * @param  array the array to add to
	 * @param  e the element to add
	 */
	arrayExclusiveAdd:function (array, e)
	{
		if (array.indexOf(e) == -1)
			array.push(e);
	},

	/*
	var initElement = document.getElementsByTagName("html")[0];
	var json = mapDOM(initElement, true);
	console.log(json);

	initElement = "<div><span>text</span>Text2</div>";
	json = mapDOM(initElement, true);
	console.log(json);
	*/
	mapDOM:function(element, json) {
		var treeObject = {};
		
		// If string convert to document Node
		if (typeof element === "string") {
			if (window.DOMParser)
			{
				  parser = new DOMParser();
				  docNode = parser.parseFromString(element,"text/xml");
			}
			else // Microsoft strikes again
			{
				  docNode = new ActiveXObject("Microsoft.XMLDOM");
				  docNode.async = false;
				  docNode.loadXML(element); 
			} 
			element = docNode.firstChild;
		}
		
		//Recursively loop through DOM elements and assign properties to object
		function treeHTML(element, object) {
			object["type"] = element.nodeName;
			var nodeList = element.childNodes;
			if (nodeList != null) {
				if (nodeList.length) {
					object["content"] = [];
					for (var i = 0; i < nodeList.length; i++) {
						if (nodeList[i].nodeType == 3) {
							object["content"].push(nodeList[i].nodeValue);
						} else {
							object["content"].push({});
							treeHTML(nodeList[i], object["content"][object["content"].length -1]);
						}
					}
				}
			}
			if (element.attributes != null) {
				if (element.attributes.length) {
					object["attributes"] = {};
					for (var i = 0; i < element.attributes.length; i++) {
						object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
					}
				}
			}
		}
		treeHTML(element, treeObject);
		
		return (json) ? JSON.stringify(treeObject) : treeObject;
	},
	
	/**
	 * Converts XML to a json string
	 * @param  String xml XML source data as a string
	 * @param  String tab String to use for tabulation
	 * @return String JSON string form of the XML
	 */
	xmlToJson:function (xml, tab)
	{
		var X = {
			toObj:function (xml)
			{
				var o = {};
				if (xml.nodeType == 1)
				{   // element node ..
					if (xml.attributes.length)   // element with attributes  ..
						for (var i = 0; i < xml.attributes.length; i++)
							o[xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
					if (xml.firstChild)
					{ // element has child nodes ..
						var textChild = 0, cdataChild = 0, hasElementChild = false;
						for (var n = xml.firstChild; n; n = n.nextSibling)
						{
							if (n.nodeType == 1) hasElementChild = true;
							else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
							else if (n.nodeType == 4) cdataChild++; // cdata section node
						}
						if (hasElementChild)
						{
							if (textChild < 2 && cdataChild < 2)
							{ // structured element with evtl. a single text or/and cdata node ..
								X.removeWhite(xml);
								for (var n = xml.firstChild; n; n = n.nextSibling)
								{
									if (n.nodeType == 3)  // text node
										o["#text"] = X.escape(n.nodeValue);
									else if (n.nodeType == 4)  // cdata node
										o["#cdata"] = X.escape(n.nodeValue);
									else if (o[n.nodeName])
									{  // multiple occurence of element ..
										if (o[n.nodeName] instanceof Array)
											o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
										else
											o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
									}
									else  // first occurence of element..
										o[n.nodeName] = X.toObj(n);
								}
							}
							else
							{ // mixed content
								if (!xml.attributes.length)
									o = X.escape(X.innerXml(xml));
								else
									o["#text"] = X.escape(X.innerXml(xml));
							}
						}
						else if (textChild)
						{ // pure text
							if (!xml.attributes.length)
								o = X.escape(X.innerXml(xml));
							else
								o["#text"] = X.escape(X.innerXml(xml));
						}
						else if (cdataChild)
						{ // cdata
							if (cdataChild > 1)
								o = X.escape(X.innerXml(xml));
							else
								for (var n = xml.firstChild; n; n = n.nextSibling)
									o["#cdata"] = X.escape(n.nodeValue);
						}
					}
					if (!xml.attributes.length && !xml.firstChild) o = null;
				}
				else if (xml.nodeType == 9)
				{ // document.node
					o = X.toObj(xml.documentElement);
				}
				else
					alert("unhandled node type: " + xml.nodeType);
				return o;
			},
			toJson:function (o, name, ind)
			{
				var json = name ? ("\"" + name + "\"") : "";
				if (o instanceof Array)
				{
					for (var i = 0, n = o.length; i < n; i++)
						o[i] = X.toJson(o[i], "", ind + "\t");
					json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
				}
				else if (o == null)
					json += (name && ":") + "null";
				else if (typeof(o) == "object")
				{
					var arr = [];
					for (var m in o)
						arr[arr.length] = X.toJson(o[m], m, ind + "\t");
					json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
				}
				else if (typeof(o) == "string")
					json += (name && ":") + "\"" + o.toString() + "\"";
				else
					json += (name && ":") + o.toString();
				return json;
			},
			innerXml:function (node)
			{
				var s = ""
				if ("innerHTML" in node)
					s = node.innerHTML;
				else
				{
					var asXml = function (n)
					{
						var s = "";
						if (n.nodeType == 1)
						{
							s += "<" + n.nodeName;
							for (var i = 0; i < n.attributes.length; i++)
								s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
							if (n.firstChild)
							{
								s += ">";
								for (var c = n.firstChild; c; c = c.nextSibling)
									s += asXml(c);
								s += "</" + n.nodeName + ">";
							}
							else
								s += "/>";
						}
						else if (n.nodeType == 3)
							s += n.nodeValue;
						else if (n.nodeType == 4)
							s += "<![CDATA[" + n.nodeValue + "]]>";
						return s;
					};
					for (var c = node.firstChild; c; c = c.nextSibling)
						s += asXml(c);
				}
				return s;
			},
			escape:function (txt)
			{
				return txt.replace(/[\\]/g, "\\\\")
					.replace(/[\"]/g, '\\"')
					.replace(/[\n]/g, '\\n')
					.replace(/[\r]/g, '\\r');
			},
			removeWhite:function (e)
			{
				e.normalize();
				for (var n = e.firstChild; n;)
				{
					if (n.nodeType == 3)
					{  // text node
						if (!n.nodeValue.match(/[^ \f\n\r\t\v]/))
						{ // pure whitespace text node
							var nxt = n.nextSibling;
							e.removeChild(n);
							n = nxt;
						}
						else
							n = n.nextSibling;
					}
					else if (n.nodeType == 1)
					{  // element node
						X.removeWhite(n);
						n = n.nextSibling;
					}
					else                      // any other node
						n = n.nextSibling;
				}
				return e;
			}
		};
		if (xml.nodeType == 9) // document node
			xml = xml.documentElement;
		var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
		return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
	}
},{});

h5c3.tools = new h5c3.Tools();
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
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class  h5c3.Hashmap
 * 
 * An implementation of a simple hashmap you can use to store key value pairs.
 * 
 * (start code)
 * // create a hashmap
 * var map = new h5c3.Hashmap();
 * map.put('key', 'value');
 * map.get('key') === 'value';
 * map.hasKey('key'); // true
 * map.remove('key');
 * (end)
 */
h5c3.Hashmap = h5c3.Base.extend('h5c3.Hashmap', {
	_CLASSNAME: 'Hashmap',
	_CLASSVERSION:'0.5.7'
},{
	/**
	 * @property 
	 * Number	number of items in the map 
	 */
	length: 0,
	/** @property 
	 * Object	contains all the items as properties
	 */
	items: {},

	/** 
	 * @method put(key,value)
	 *
	 * Put a key, value pair into the map
	 *
	 * @param
	 * 	String	key	
	 *	Mixed	Value
	 */
	put: function(key, value)
	{
		if (!VLD(key)) { throw "invaid key"; }
		this.items[key] = value;
		this.length++;
	},

	/**
	 * Get a value using a key
	 * @param  String key The key
	 * @return Object Value mapped to the key
	 */
	get: function(key)
	{
	   return this.items[key];
	},

	/**
	 * Indicates whether a key exists in the map
	 * @param  String key The key
	 * @return Boolean True if the key exists in the map
	 */
	hasKey: function(key)
	{
		return this.items.hasOwnProperty(key);
	},

	/**
	 * Remove an element from the map using the supplied key
	 * @param  String key Key of the item to remove
	 */
	remove: function(key)
	{
		if (this.hasKey(key))
		{
			this.length--;
			delete this.items[key];
		}
	},

	/**
	 * @return Array Returns an array of all the keys in the map
	 */
	keys: function()
	{
		var k, keys = [];
		for (k in this.items) {
			keys.push(k);
		}
		return keys;
	},

	/**
	 * @return Array Returns an array of all the values in the map
	 */
	values: function()
	{
		var k,values = [];
		for (k in this.items) {
			values.push(this.items[k]);
		}
		return values;
	},

	/**
	 * Removes all items in the map
	 */
	clear: function()
	{
		this.items = {};
		this.length = 0;
	}
});
/**
 * @class h5c3.LocalStorage
 * @augments h5c3.Base
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * <p>
 * 
 * <pre><code>
 * 
 * </code></pre>
 * 
 * </p>
 */
h5c3.LocalStorage = h5c3.Base.extend('h5c3.LocalStorage', { 
	_CLASSNAME: 'LocalStorage',
	_CLASSVERSION:'0.1.5',

	create: function($manifest) {
		this._addMethods();
		
		if (this._prepare($manifest))
			return this.prototype;
		else
			return false;
	},	
	
	_addMethods:function() {
		//Extend the localStorageObject to get/set objects
		Storage.prototype.setObject = function($key,$value) {
			//var tmp = h5c3.lzw.encode(Base64.encode(JSON.stringify($value)));
			var $tmp = JSON.stringify($value);
			this.setItem($key, $tmp);
		}

		//we only need to load once on page load
		Storage.prototype.getObject = function($key) {
			var $tmp = this.getItem($key);
			if (!VLD($tmp)) return;
			//var a = h5c3.lzw.decode($tmp)
			//var b = Base64.decode(a)
			$tmp2 = JSON.parse($tmp);

			//$tmp2 = JSON.parse(Base64.decode(h5c3.lzw.decode($tmp)));
			return $tmp2;
		}
	},
	
	setup:function($what) {
		if (ISA($what)!=='String') return;
		if (!VLD(this.prototype.data[$what])) 
			this.prototype.data[$what] = {};
			
		if (!VLD(this.prototype.data[$what]['cfg'])) 
			this.prototype.data[$what]['cfg'] = {};
			
		if (!VLD(this.prototype.data[$what]['files'])) 
			this.prototype.data[$what]['files'] = {};
			
		//localStorage.setObject($what,this.prototype.data[$what]);
	},
	
	isSupported:function() {
		var $msg = "Checking for Local Storage Support...";  //_DBG_  Will delete this line for production
		if (typeof(Storage)!=="undefined") {
		  $msg+="Supported.";
		  this.prototype.supported = true;
		} else {
		  $msg+="Not Supported.";
		  this.prototype.supported = false;
		}	
		_DBG_($msg,this);
		return this.prototype.supported;
	},
	
	load:function($app) {
		this.prototype.data['global'] = localStorage.getObject('global');
		this.prototype.data[$app] = localStorage.getObject($app);
		this.setup('global');
		this.setup($app);
	},

	remove:function($where) {
		if (this.enabled && this.isSupported()) {
			if ($where===0) $use='global'; else $use=this.prototype.appName;
			localStorage.removeItem($use);
			_DBG_('Removed '+$use+'.',this);
		}
	},

	what_where:function($n) {
		if ($n===0) return {where:'global',what:'cfg'};
		else if ($n===1) return {where:'global',what:'files'};
		else if ($n===2) return {where:this.prototype.appName,what:'cfg'};
		else if ($n===3) return {where:this.prototype.appName,what:'files'};
		else return null;
	},
	
	get:function($key,$loc) {
		if (this.enabled && this.isSupported()) {
			$use = this.what_where($loc);
				
			try {
				if ($key in this.prototype.data[$use.where][$use.what])
					return this.prototype.data[$use.where][$use.what][$key];
			} catch (e) {
				 localStorage.removeItem(this.prototype.data[$use.where][$use.what][$key]);
				_DBG_('Removed corrupted entry '+$use.where+'->'+$use.what+'->'+$key,this);
				_DBG_(printStackTrace({e:e}),this);
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
	set:function($key,$value,$loc) {
		if (this.enabled && this.isSupported()) {
			var $use = this.what_where($loc);
							
			try {
				this.prototype.data[$use.where][$use.what][$key]=$value;
				localStorage.setObject($use.where,this.prototype.data[$use.where]);
				return this.prototype.data[$use.where][$use.what][$key];
			} catch (e) {
				_DBG_(printStackTrace({e:e}),this);
			}
		}
	},

	_prepare:function($manifest) {
		if (this.enabled && this.isSupported()) {
			
			this.prototype.appName = new String(config.app.name.split(' ').join('')).camelize();

			//this.remove(0);
			//this.remove(1);
			//localStorage.clear();
			this.load(this.prototype.appName);

			//See if core h5c3 object data exist. if not new user? erased?
			if (!('firstVisit' in this.prototype.data.global.cfg))	{			
				//h5c3 Global domain (everything on the actual domain. say devzone.i2tmlabs.com
				this.set('firstVisit', true,0);
				this.set('firstVisitTime', Date.now(),0);
			}
			if (!('firstVisit' in this.prototype.data[this.prototype.appName].cfg))	{
				//App Domain
				this.set('firstVisit', true,2);
				this.set('firstVisitTime', Date.now(),2);
			}
		}
		return true;
	}
	
}, {
	data:{},
    /**
     * @property {boolean} enabled
     * @default false
	 * @memberof h5c3.LocalStorage
     */
    appName: '',
	
    /**
     * @property {boolean} supported
     * @default false
	 * @memberof h5c3.LocalStorage
     */
	supported: false,
	
	enabled: false,

    /**
	 * @public
	 * @method
	 * @memberof h5c3.LocalStorage
	 * @desc
     * </p>
	 * Handles / manages a the Local Starage system on HTML5 enabled devices
	 * </p>
     */
    init: function () {
        this._super();
    },
	
	removeGlobal:function() { this.Class.remove(0); },
	removeApp:function() { this.Class.remove(1); },
	
	getGlobalCfg:function($key) 		{ return this.Class.get($key,0); },	
	setGlobalCfg:function($key,$value) 	{ this.Class.set($key,$value,0); },
	getGlobalFile:function($key) 		{ return this.Class.get($key,1) },	
	setGlobalFile:function($key,$value)	{ this.Class.set($key,$value,1); },

	getAppCfg:function($key) 			{ return this.Class.get($key,2) },	
	setAppCfg:function($key,$value) 	{ this.Class.set($key,$value,2); },
	getAppFile:function($key) 			{ return this.Class.get($key,3) },	
	setAppFile:function($key,$value) 	{ this.Class.set($key,$value,3); }
});
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

/**
 *  Engine
 *  H5C3 Framework
 *  Accurate self adjusting global timer
 * @usage 
 * //Run for 5 secs @ 10 FPS will fire trigger every 100ms
 * h5c3.AccuTimer(5000, 10, function($steps,$count,$fps)
 * {
 *   //Add code here for every interval
 * },
 * function()
 * {
 *    //Timer done, add cleanup code here 
 * });
 *
 * @param  number $length time in milliseconds to run for
 * @param  number $fps desired FPS, ie 60 $fps = 16.66ms interval
 * @param  event on_instance called each interval
 * @param  event oncomplete called when desired interval reached
 */
h5c3.AccuTimer = function($length, $fps, $oninterval, $ondone)
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
            window.setTimeout(_instance, ($speed - diff));
        }
		
    }
    window.setTimeout(_instance, $speed);
};

h5c3.CallMebackIn = function(ms,callback) {
	if(VLD(callback)) return window.setTimeout(callback, ms);
}
h5c3.FactoryWorker = h5c3.Pooled.extend('h5c3.Applet', {
	_CLASSNAME: 'FactoryWorker',
	_CLASSVERSION:'0.1.3',

	//Used by factory to clean house if enabled.
	_lastUsed: 0,

	/**
	 *
	 * @param  
	 * {h5c3.url} url url to the applet - http://applets.i2tmlabs.com/ + path/to/applet/applet.someAppletName.html
	 * @return {h5c3.Applet} A h5c3.Applet if successful, Applet Name if failed.
	 */
	create: function($data)
	{
		var n = this._super();

		if (n.parse($data))
			return n
		else
			return n.name;
	}
},{

});

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Engine
 * @class  h5c3.Factory
 *  h5c3.Base
 * 
 * For creating like objects. Just an interface class that allows you extend from to create a factory
 * that allows easy creation, use and removal of like objects, like Entities or Sounds, Layers, ect.
 */
h5c3.Factory = h5c3.Base.extend('h5c3.Factory',  {
	_CLASSNAME: 'Factory',
	_CLASSVERSION:'1.3.6'
	
}, {
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
		this._super();
		CHK($name,'Undefined Factory');
		CHK($lifespan,0);
		this.factoryType = $name;
		this.setLife($lifespan);
		_DBG_($name+' Factory Initialized.',this.Class);
	},
	
	setLife:function($seconds) {
		var $tmp = ($seconds*1000);
		if (this.idleLifeSpan != $tmp) {
			if ($tmp===0) _DBG_("Life Span is now indefinite.",this.Class); else _DBG_("Life Span is set to "+this.idleLifeSpan+" seconds.",this.Class);
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
		if (!VLD($obj)) {
			_DBG_('You cannot add ['+$name+'] which is null or undefined to the ['+this.factoryType+'] store',this.Class);
		} else {
			if (typeof this.onChanged === 'function') this.onChanged({name:$name,action:'Added'});
			this.objects[$name] = $obj;
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
			this.count--;
			if (this.count<0) this.count=0;
		} catch (err) {
			AST(null,'No object ['+$name+' exists in ['+this.factoryType+'] store to remove.');
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
			$result = false;
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
			}
		} else {
			this.info('Factory::use(object) - No longer takes 2 params, use object format.');
			result = null;
		}
		return result;
	}
});
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Plugin
 * @class  h5c3.Plugin
 *  h5c3.Plugin
 * 
 * Base class for all plugins 
 */
h5c3.Plugin = h5c3.Base.extend('h5c3.Plugin', {
	_CLASSNAME: 'Plugin',
	_CLASSVERSION:'0.5.9'
},{
	/**
	 * @property String NAME Friendly name for plugin, may have spaces
	 */
	NAME:	'Plugin',
	/**
	 * @property String VERSION Holds the current version of the plugin
	 */
	VERSION:	'0.1.0',
	/**
	 * @property String DESCRIPTION Short description of what this plugin does.
	 */
	DESCRIPTION:	'Base class for all plugins.', 
	/** Folder where files are located */
	srcDir: 'js/',
	/** Plugins required by this plugin */
	requires:[],
	/** List of files that makeup this plugin */
	uses: [],
	
	/**
	* Initializtion method for plugin
	 * 
	 * myPlugin = new SomePlugin({arg1:false,arg2:'String',arg3:1243});
	 * (end)
	*
	* @param  Object args arguments for this plugin
	*/	
	init:function(args) 
	{
		this._super();
		if (typeof args === "object") {
			this.property = args;
		}
		_DBG_("Initializing.",this.Class);
		this._load();
	},
	
	_load:function() 
	{
		_DBG_('Loading Plugin '+this.NAME+' v'+this.VERSION,this.Class);
		if (VLD(this.uses) && this.uses.length>0) {
			var $i=0;
			for ($i=0; $i < $this.uses.length; $i++) {
				this.add($scripts[$i]);
			}
		} 
		else {_DBG_('No external files used by plugin.',this.Class);}
		_DBG_("Complete.",this.Class);
	},
	
	main:function(args)
	{
		args = CHK(args,{});	
	},
	
	done:function()
	{}
});
/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class  h5c3.Loader
 * 
 * 
 * 
 * The Loader takes care of loading resources (downloading) and then notifying you when everything
 * is ready. The loader is a static class that will always be constructed by the engine and accessible through th
 * h5c3.loader member.
 * 
 * Using the loader you can load <a href='h5c3.Image'>h5c3.Image</a>'s, <a href='h5c3.DataResource'>h5c3.DataResources</a>'s,
 * and <a href='h5c3.Sound'>h5c3.Sound</a>'s.
 * 
 * Typically you use the loader from within your game class onReady method (called automatically by the engine).
 * 
 * TheGame = h5c3.Game.extend('TheGame',
 * {},
 * {
 *     onReady:function ()
 *     {
 *         this._super(); // call the base class' onReady
 *
 *         // disable caching when developing
 *         if (h5c3.devMode===true)
 *             h5c3.loader.setDisableCache();
 *
 *         // load up resources
 *         h5c3.loader.add(new h5c3.Image('spaceship', 'images/spaceship.png'));
 *
 *         // fire up the loader (with a callback once done)
 *         h5c3.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
 *     },
 *
 *     onLoading:function (percentageComplete)
 *     {
 *         // display progress, such as a loading bar
 *     },
 *
 *     onLoaded:function ()
 *     {
 *         // we're ready; make the magic happen
 *     }
 * });
 * (end)
 * You can disable caching using setDisableCache. This is the default when in devMode (when the engine has not been
 * packed/minified.
 */

h5c3.Loader = h5c3.Base.extend('h5c3.Loader', {
	_CLASSNAME: 'Loader',
	_CLASSVERSION:'0.6.3'
},{
	State:{ QUEUED:0, LOADING:1, READY:2, FAILED:3 },

	timer:null,
	/** A hashtable of all the resources, keyed by the resource name */
	resources:new h5c3.Hashtable(),
	/** Function called after each new resource has been loaded */
	loadingListener:null,
	/** Function called after all resources have been loaded or errored */
	loadedListener:null,
	/** Progress of the loader (number of items loaded so far) */
	progress:0,
	/** Total number of resources to be loaded */
	totalBeingLoaded:0,
	/** Number of resources that had a problem */
	errored:0,
	/** Optional baseURI prepended to resource URI's */
	baseUrl:'',
	times: {
		start:0,	//when loader started
		end:0,		//when loader ended
		lapsed:0	//total time loading?
	},
	/**
	 * True if loader.start() has been called. Typically resources use this to check
	 * if they should just load immediately (after game start) or hold on loading until the loader calls (triggered
	 * by loader.start()
	 */
	started:false,
	/** True if the resource loader has finished loading everything */
	finished:true,

	_noCacheString:'',

	/**
	 * Constructor -- typically called by the engine to automatically construct h5c3.loader.
	 */
	init:function ()
	{
		this._super();
		_DBG_('Loader timer started.',this.Class);
		this.timer = new h5c3.AccuTimer(-1, .5, 
			function()
			{
			  h5c3.loader.start();
			}
			,function() {_DBG_('Loader timer stopped.',this.Class);}
		);
		
	},

	/**
	 * Tells the resource loader to disable caching in the browser by modifying the resource src
	 * by appending the current date/time
	 */
	setDisableCache:function ()
	{
		this._noCacheString = '?nocache=' + Date.now();
	},

	/**
	 * Sets a base URI to save you type. Applies to all resources added until the next setBaseURL is called.
	 * @param  String url URI to preprend
	 */
	setBaseUrl:function (url)
	{
		this.baseUrl = url;
	},

	/**
	 * Sets an optional listener
	 * @param  {Function} loadingListener Function to call when each resource is loaded
	 * @param  {Function} loadedListener Function to call when all resources have been loaded
	 */
	setListener:function (loadingListener, loadedListener)
	{
		this.loadingListener = loadingListener;
		this.loadedListener = loadedListener;
	},

	/**
	 * Used to dynamically load any file into the head of the document. Mainly used for including 
	 * Javascript or CSS files after the document has already loaded.
	 *
	 * @param  {Function} loadingListener Function to call when each resource is loaded
	 * @param  {Function} loadedListener Function to call when all resources have been loaded
	 */
	loadFile:function (filename) {
	
		var fileref = null,
			ext = filename.substr(filename.lastIndexOf('.') + 1);
		
		if (ext === "js") { 
			//if filename is a external JavaScript file
			fileref=document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.setAttribute("src", filename);
		} else if (ext === "css") { 
			//if filename is an external CSS file
			fileref=document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
		} else if (ext === "html") { 
			//if filename is an external HTML file
			fileref=document.createElement("applet");
			fileref.setAttribute("type", "text/html");
			fileref.setAttribute("href", filename);
		}
		if (fileref !== "undefined") {
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
	},
	
	/**
	 * Add a resource to the loader queue
	 * @param  {h5c3.Image|h5c3.Sound|h5c3.DataResource} resource Resource to load
	 */
	add:function (resource)
	{
		// resource.src already has the baseUrl set by the resource class (i.e. h5c3.Image)
		// so no need to add it here
		resource.name = resource.name.toLowerCase();
		this.resources.put(resource.name.toLowerCase(), { resource:resource, state:this.State.QUEUED });
		_DBG_('Adding resource ' + resource.src + ' to the queue.',this.Class);
	},

	/**
	 * Retrieve a resource from the loader
	 * @param  String name Name of the resource
	 * @return {h5c3.Image|h5c3.Sound|h5c3.DataResource} Resource
	 */
	get:function (name)
	{
		var res = this.resources.get(name.toLowerCase());
		
		if (!VLD(res)) {
			this.error(this.uniqueId + 'Unable to get resource '+name+'. Did you forget to add it to the config?');
			res=null;
		}
		return res;
	},

	/**
	 * Get all the sound resources
	 * @return Array An array of all the sounds
	 */
	getAllSounds:function ()
	{
		var sounds = [],
			keys = this.resources.keys(),
			i,res;

		for (i = 0; i < keys.length; i++)
		{
			res = this.resources.get(keys[i]).resource;
			if (res.Class.isA('h5c3.Sound')) {
				sounds.push(res);
			}
		}
		return sounds;
	},

	/**
	 * Get all the image resources
	 * @return Array An array of all the images
	 */
	getAllImages:function ()
	{
		var images = [],
			keys = this.resources.keys(),
			i,res;

		for (i = 0; i < keys.length; i++)
		{
			res = this.resources.get(keys[i]);
			if (res.isA('h5c3.Image')) {
				images.push(res);
			}
		}

		return images;
	},

	/**
	 * Starts the resource loader
	 * @param  {Function} loadingListener Function to call after each resource is loaded
	 * @param  {Function} loadedListener Function to call after all resources have been loaded or errored.
	 */
	start:function (loadingListener, loadedListener)
	{
		if (this.started) return;
		this.started = true;
		this.times.start = new Date().getTime();
		var i,keys,res;
		this.setListener(loadingListener, loadedListener);

		this.progress = 0;
		this.errored = 0;

		// ask all of the resources to get busy loading
		keys = this.resources.keys();

		for (i = 0; i < keys.length; i++)
		{
			res = this.resources.get(keys[i]);
			if (res.state === this.State.QUEUED)
			{
				res.resource.load(this._onLoad.bind(this), this._onError.bind(this));
				res.state = this.State.LOADING;
				this.totalBeingLoaded++;
			}
		}
		_DBG_('Loading ' + this.totalBeingLoaded + ' resource(s).',this.Class);
	},

	/**
	 * Generates a URL using a src string (by prepending the baseURL and appending the optional no-cache string
	 * @param  String src Source URI
	 * @return String A full resource URI
	 */
	makeUrl:function (src)
	{
		return this.baseUrl + src + this._noCacheString;
	},
	
	/**
	* Andrew: 
	*    fixed minor bug where if you used uppercase characters in key name res would return null
	*    because it did not fins the key in the hashtable. Just displayed and error notice to console.
	*/
	_onLoad:function (resource)
	{
		var res = this.resources.get(resource.name);
		if (!VLD(res)) {
			this.error('Unable to get resource ['+resource.name+'] - Please make sure you are using all lowercase.');
		} else { 
			res.state = this.State.READY;
			this.progress++;

			if (VLD(this.loadingListener)) {
				this.loadingListener(Math.round((this.progress / this.totalBeingLoaded) * 100));
			}

			_DBG_(resource.Class.shortName+' - '+ resource.name + ' loaded (' + Math.round((this.progress / this.totalBeingLoaded) * 100) + '% done)',this.Class);
		}
		this._checkAllDone();
	},

	_onError:function (resource)
	{
		var res = this.resources.get(resource.name);
		res.state = this.State.FAILED;
		this.progress++;
		this.errored++;

		if (VLD(this.loadingListener)) {
			this.loadingListener(this.progress / this.totalBeingLoaded);
		}
		this.warn(resource.name + ' (' + resource.src + ') failed.');

		this._checkAllDone();
	},

	_checkAllDone:function ()
	{
		if (this.progress >= this.totalBeingLoaded)
		{
			this.times.end = new Date().getTime();
			this.times.lapsed = (this.times.start-this.times.end);
			this.finished = true;
			this.started = false;
			if (VLD(this.loadedListener)) this.loadedListener(this.progress, this.errored);
			_DBG_('Resource Loader idle.',this.Class);
			this.progress = 0;
			this.errored = 0;
			this.totalBeingLoaded = 0;
		}

	}
});
/**
 * THROTTLESTYLE is used by the Throttle Class to determine how it will best manage timing and events.
 *  
 *  <strong>AEPS</strong> <i>stands for Average Events Per Second</i>
 *  
 *  <ul>
 *  <li>Will re-evaluate performance every 10 seconds. Will not adjust unless AEPS is over 20</li>
 *  <li>Will re-evaluate performance every 5 seconds. Will not adjust unless AEPS is over 10</li>
 *  <li>Will first event in 1 second; process entire que, then re-evaluate performance every 2.5 seconds. Will not adjust unless AEPS is over 5</li>
 *  <li>Will first event in 100ms; process entire que, then re-evaluate performance every 1.25 seconds. Will not adjust unless AEPS is over 2.5</li>
 *  </ul>
 *
 * For more detail on how throttling works see the h5c3.Throttle class.
 * @property Object SceneID Container for default game states
 * Default: STRICT
 */
h5c3.THROTTLESTYLE = 
{
    RELAXED:	0x0000,		/* STYLE: Re-evaluate every 10 seconds, low priority Que size [<20 AEPS] */
    STRICT:		0x0001,		/* STYLE: Re-evaluate every 5 seconds, Normal priority Que size [<10 AEPS] */
    AGGRESSIVE:	0x0002,		/* STYLE: Re-evaluate every 2.5 seconds, High priority Que size [<5 AEPS] */
    GEEZUS:   	0x0003		/* STYLE: Re-evaluate every 1.25 seconds, Top priority Que size [<2.5 AEPS] */
};

/**
 *
 * @class h5c3.Throttle
 * @augments h5c3.Base
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * <p>
 * 
 * <pre><code>
 * 
 * </code></pre>
 * 
 * </p>
 */
h5c3.Throttle = h5c3.Base.extend('h5c3.Throttle', { 
	_CLASSNAME: 	'Throttle',
	_CLASSVERSION:	'0.1.0',

    /**
     * @property {THROTTLESTYLE} _style
     * @default THROTTLESTYLE.STRICT
	 * @memberof h5c3.Throttle
     */
    _style: h5c3.THROTTLESTYLE.STRICT,

	_AEPS: 0,
	_current:0,
	_maximum:0,
	_minumum:0,
	_average:0,
    _interval:0,
	
    /**
     * @property {AccuTimer} timer
     * @default null
	 * @memberof h5c3.Throttle
     */
	_throttle: null,			//Throttler

	_que: new h5c3.Hashtable(),
	
	_reset:function($min,$max,$int) {
		this._AEPS= 0; 
		this._current=0; 
		this._maximum=$min; 
		this._minumum=$max;
		this._average=Math.floor( ($min+$max) / 2 );
		this._interval=$int;
	},
	
	_setStyle:function($style) {
		if (this._style === $style) return;
		
		if ($style<h5c3.THROTTLESTYLE.RELAXED) $style=h5c3.THROTTLESTYLE.RELAXED;
		if ($style<h5c3.THROTTLESTYLE.GEEZUS) $style=h5c3.THROTTLESTYLE.GEEZUS;
		
		this._style = $style;
		
		switch ($style) {
			case THROTTLESTYLE.RELAXED:
				this._reset(11,20,10);	
				break;
			case THROTTLESTYLE.STRICT:
				this._reset(6,10,5);				
				break;
			case THROTTLESTYLE.AGGRESSIVE:
				this._reset(2.6,5,2.5);							
				break;
			case THROTTLESTYLE.GEEZUS:
				this._reset(0,2.5,1.25);							
				break;
		}
		this._evOnChanged();
	},
	
	_evOnChanged:function() {
		this._stop();
		if (typeof onChanged === 'function') this.onChanged(this._style);
		this._start();
	},
	
	//Start loading all applets in our que
	_start:function() {
		if (this._running) return;
		
		this._throttle = new h5c3.AccuTimer(
			this._interval, 						//Run for this time and then call re-eval function
			this._average, 							//AEPS
			h5c3.bind(this, this._onProcess),		//Update totals, call end user callback
			h5c3.bind(this, this._onEvaluate)		//re-evaluate
		);

		this._running = true;
	},
	
	_stop:function() {
		if (!this._running) return;
		
		delete this._throttle;	
		
		this._running = false;
	},
	
	_onProcess:function() {
	},
	
	_onEvaluate:function() {
	}
	
},{
	
    /**
	 * @public
	 * @method
	 * @memberof h5c3.Throttle
	 * @param {THROTTLESTYLE} $style THROTTLESTYLE.STRICT
	 * @desc
     * </p>
	 * Initializes a new Throttle object with the Style defined with the onyl parameter.
	 * </p>
     */
    init: function ($style) {
        this._super();
		this._setStyle($style);
    },

	add:function($obj) {
		//Add whatever to que for processing
		var t = Date();
		t.getTime();
		t.toTimeString();
		this.que.put(t, $obj);
	},
	
	onProcess:function() {
		//Override me if you need
	},
	
	onChanged:function() {
		//Override me if you need
	}
	
});/**
 * @namespace Core
 * @class  h5c3.bootstrap
 * @augments h5c3.Base
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 *
 * Handles preparing the document, loading resources, and starting webapp.
 * All methods of this class are private. An instance is created upon load.
 *
 */
h5c3.Bootstrap = h5c3.Base.extend('h5c3.Bootstrap', {
	_CLASSNAME: 'Bootstrap',
	_CLASSVERSION:'0.2.2'
},{ 
	/**
	 * @property String $baseUrl
	 * Holds the base URL for resources & scripts
	 */
    $baseUrl: '',
	
	/**
	 * @property Number $current
	 * Internal. Used to count what resource we are on. i.e. Progress Bar on loading.
	 */
    $current: 0,
	
	/**
	 * @property Boolean $finished	
	 * Framework has finished loading.
	 */
    $finished: false,
	
	/**
	 * @property String
	 * Turns off fie Caching
	 */
    $noCacheString: '',
	
	/**
	 * @property Array
	 * An array of all scripts
	 */
    $scripts: [],
	
    /**
	 * @constructor init()
	 *
     * @description main initilaiztion for the Bootstrap object. Makes sure the browser is chrome,
     * and then creates the canvas and inserts into the document. Also sets the fullscreen listener.
     * 
     */
    init: function () {
		_DBG_("Initializing.",this.Class);
		this.$loc = this.getFileName();
		
		this._BrowserIsChrome();		
		
        this.setBaseUrl(h5c3.path.home+h5c3.path.scripts+'ext/');					
				
		if (!VLD(window.Modernizr)) { 
			this.add('modernizr.all.release.js'); 
		}
		
		if (!VLD(window.jQuery)) { 
			this.add('jquery/jquery-1.10.2.min.js'); 
		}				
		
		/* if we are in local file system - then we need to immediately load scripts then continue */
		if (h5c3.devMode) {
			this.handleFiles();
		}				
  
        this._start();
    },
	
	prepareRWD:function() {
		h5c3.loader = new h5c3.Loader();
		h5c3.lzw = new h5c3.LZW();
		h5c3.local = h5c3.LocalStorage.create();
		h5c3.resources = new h5c3.Resources();
		h5c3.r2wl = new h5c3.R2WLCommon();
		
		h5c3.r2wl.start();
		h5c3.loader.start();
				
		$(window).load(function() {
			//window.editor = ace.edit("editor");
			//window.editor.setTheme("ace/theme/ambiance");
			//window.editor.getSession().setMode("ace/mode/javascript");			
		});

		$(document).ready(function() {
		});
	},
	
    /**
	 * @method createCanvas()
     * 
	 * Starts execution.
     * 
	 * @param None
     * 
	 * @return Boolean
     * 
     */
    createCanvas: function () {
		var $waDIVSize = GEI('waDIV'), 
            scrn = { 
                w:$waDIVSize.clientWidth,
                h:$waDIVSize.clientHeight,
                tw:h5c3.config.screen.target.width,
				th:h5c3.config.screen.target.height
            };
        		
		var $c = AET('waDIV', 'canvas', 'waCANVAS');

		$c.style.width = scrn.w + 'px';
		$c.style.height = scrn.h + 'px';
		
		$c.style.minWidth = scrn.w + 'px';
		$c.style.minHeight = scrn.h + 'px';

		$c.style.maxWidth = scrn.w + 'px';
		$c.style.maxHeight = scrn.h + 'px';
		
		$c.width = scrn.tw;
		$c.height = scrn.th;
		$c.style.background = 'Black';

        if (h5c3.config.options.fullscreen) {
			_DBG_('OPTION: Fullscreen mode enabled.',this.Class);
            DOC().addEventListener('webkitfullscreenchange', h5c3.bootstrap._onFullscreenChange);
            $c.webkitRequestFullScreen();
        } 
		else _DBG_('OPTION: Fullscreen mode disabled.',this.Class);
		return true;
    },

    /**
	 * @method handleFiles()
     * 
	 * This feature is only available in-house.
     * 
	 * @param None
     * 
	 * @return Boolean
     * 
     */
	handleFiles:function() {
		if (!VLD(h5c3.config)) {
			_DBG_("h5c3.config is not defined. Cannot load and configure properly.",this.Class);
			return
		}
		
		if (h5c3.config.files.length > 0) {
			_DBG_("Loading application files.",this.Class);
			this.que(h5c3.config.files, 'assets/js/');
		}

		if (h5c3.config.plugins.length > 0) {
			_DBG_("Loading application plugins.",this.Class);
			this.loadPlugins(h5c3.config.plugins, h5c3.path.base+h5c3.path.plugins);
		}
			
		//Full Blown Cloud App
		if (!h5c3.config.rwdOnly)
			this.que(['game.min.js'],'assets/js/');
		
	},
	
    /**
     * Looks at the current page and gets the name of the html file.
	 *
	 * @method getFileName()
	 *
	 * @return  String HTML filename
     */
    getFileName: function () {
        var $url = document.location.href;
        $url = $url.substring(0, ($url.indexOf("#") === -1) ? $url.length : $url.indexOf("#"));
        $url = $url.substring(0, ($url.indexOf("?") === -1) ? $url.length : $url.indexOf("?"));
        $url = $url.substring($url.lastIndexOf("/") + 1, $url.length);
        return $url;
    },

    /**
	 * @method _onFullscreenChange()
     * 
	 * @description  Called when switching in/out of fullscreen mode.
	 *
	 * @param None
	 *
	 * @return None
     */
    _onFullscreenChange: function () {
       var $c = GEI('waCANVAS');
        if (document.mozFullScreen || document.webkitIsFullScreen) {
            $c.style.width = window.screen.width + 'px';
            $c.style.height = window.screen.height + 'px';
        } else {
            $c.style.width = h5c3.config.screen.width + 'px';
            $c.style.height = h5c3.config.screen.height + 'px';
        }
    },

   /**
	 * @method _BrowserIsChrome()
     * 
     * @description Check to see if the browser is chrome and hide or show the play button depending on the outcome.
	 *
	 * @param None
	 *
	 * @return None
     */
	_BrowserIsChrome: function () {
        var $ok = /chrome/.test(window.navigator.userAgent.toLowerCase()),
            $pn = GEI('playnow'),
            $cp = GEI('cantplay');

        if ($pn!=null && $cp!=null) {
            if ($ok) {
                $pn.style.display = 'block';
                $cp.style.display = 'none';
				return true;
            } else {
                $pn.style.display = 'none';
                $cp.style.display = 'block';
				return false;
            }
        }
    },

    /**
	 * @method setDisableCache()
     * 
     * @description Tells the resource loader to disable caching in the browser by modifying the resource src by appending the current time
	 *
	 * @param None
	 *
	 * @return None
     */
    setDisableCache: function () {
		
        this.$noCacheString = (h5c3.config.devMode) ? '?nocache=' + Date.now():'';
    },

	/** 
	 * @method setBaseUrl()
     * 
	 * @description Sets the directory/path to load from. Do not call directly.
	 *
	 * @param String $url desired path.
	 *
     */	 
    setBaseUrl: function ($url) {
        this.$baseUrl = $url;
    },

	/** 
	 * @method _makeUrl()
     * 
	 * @description Given a script name creates and returns a valid URL
	 *
	 * @param  String $src - File to load
     * 
	 * @return  String URL
     */	 
    _makeUrl: function ($src) {
        return this.$baseUrl + $src + this.$noCacheString;
    },

	/** 
	 * @method add()
     * 
	 * @description Add a script to the que. Do not call directly.
	 *
	 * @param  String $src - File to load
     * 
	 * @return None
     */	 
    add: function ($src) {
		_DBG_('Added '+$src+' to download que.',this.Class);
        this.$scripts.push(this._makeUrl($src));
    },

	/** 
	 * Start loading all files in que. Do not call directly.
	 *
	 * @method _start()
     * 
	 * @param None
     * 
	 * @return  None
     */	 
    _start: function () {
      _DBG_('Loading source files...',this.Class);
        this.$current = 0;
        this._loadNextScript();
    },

	loadScript:function ($src,$onloaded,$onerror) {
		if (!VLD($src)||$src==='') return false;
		$src = this._makeUrl($src);
		
        var $script = DOC().createElement("script");

        $script.type = "application/javascript";
        $script.src = $src;
        $script.async = false;
		$script.onloaded=$onloaded;
		$script.onerror=$onerror;
		
		GET("head")[0].appendChild($script);
		//GET(tag) = window.document.getElementsByTagName
	},
	
	/** 
	 * @method _loadNextScript()
     * 
	 * Load the next script in que. Do not call directly.
	 *
	 * @param 
	 * None
     * 
	 * @return  
	 * None
	 */	 
    _loadNextScript: function () {
        var 
			$src = this.$scripts[this.$current],
			$script = window.document.createElement("script");

        $script.type = "application/javascript";
        $script.src = $src;
        $script.async = false;
		if (VLD($src)) {	
			$script.onload = function () {				
				h5c3.bootstrap._checkAllDone();
			};

			$script.onerror = function () {_DBG_('h5c3.Bootstrap::_loadNextScript() - Could not load javascript file: ' + $script.src);};

			window.document.getElementsByTagName("head")[0].appendChild($script);
		}
		//h5c3.bootstrap._checkAllDone();
    },

	/** 
	 * @method finalize()
     * 
	 * This method is called after all files are loaded. It then finalize the engine start up by creating al required objects
	 * before starting the framework and cloud application startup.
	 *
	 * @param 
	 * None
     * 
	 * @return  
	 * None
     */	 
	finalize: function () {
		if (this.createCanvas()) {
			h5c3.device = new h5c3.Device();
			_DBG_('CloudApp Mode Requested...',this.Class);
			h5c3.device.boot();
		} 
		else _DBG_('ERROR: Something went wrong with preparing the canvas. Do you have a DIV with the ID of waCANVAS in your document?',this.Class);
	},
	
	
	/** 
	 * @method _onReady()
     * 
	 * Internal. Called when engine is loaded and ready to go. This includes jQuery and jQueryMobile
	 * It will call the application or Applets onH5C3Ready() event as well as call to a global [CloudApp|Applet]onReady 
	 * event. below is the usage.
	 * this onH5C3Ready() is not the same thing as [main|game]:onReady() which is called much later. You need both if making 
	 * a CloudApp, or just onH5C3Ready() for a R2WL page.
	 *
	 * (start code)
	 * function AppletOnReady(h5c3Ver, jQVer, jQMVer) {
	 * 		.. Your Code here ...
	 * }
	 * (end)
	 *	 
	 or 
	 *
	 * (start code)
	 * function CloudAppOnReady(h5c3Ver, jQVer, jQMVer) {
	 * 		.. Your Code here ...
	 * }
	 * (end)
	 *
	 * @param 
	 * None
     * 
	 * @return  
	 * None
     */	 
	_onReady:function() {	
		//Handle Internal stuff first; then call child events
		this.prepareRWD();		
		
		// if (h5c3.stylesheet.onReady) h5c3.stylesheet.onReady();
		// if (h5c3.layout.onReady) h5c3.layout.onReady();
		// if (h5c3.brand.onReady) h5c3.brand.onReady();
		// if (h5c3.applets.onReady) h5c3.applets.onReady();
		// if (h5c3.google.onReady) h5c3.google.onReady();
		
		if (h5c3.r2wl.onReady) h5c3.r2wl.onReady();
		
		$('#OVERLAY').fadeOut(750,"linear",function(){
			$('#WRAPPER').fadeIn(1500,"ease-in");
		});

		if (typeof(window.H5C3READY) != "undefined") { 
			window.H5C3READY(h5c3.VERSION,window.Modernizr._version,$().jquery);
		}			

	},
	/** 
	 * @method _checkAllDone()
     * 
	 * See if all scripts are loaded. Do not call directly.
	 *
	 * @param 
	 * None
     * 
	 * @return  
	 * None
     */	 
    _checkAllDone: function () {
        if (!this.$finished) {
            if (this.$scripts.length - 1 === this.$current) {
				//Engine is loaded
				if (VLD(window.Modernizr)) { _DBG_('Modernizr v'+window.Modernizr._version+' detected.',this.Class); }
				if (VLD(window.jQuery)) { _DBG_('jQuery v'+$().jquery+' detected.',this.Class); }
				this._onReady();
                this.$finished = true;
				
				//Do we need the 2D/3D/Physics and such or just RWD?
				if (VLD(h5c3.config.rwdOnly) && h5c3.config.rwdOnly===false) this.finalize();
				_DBG_('H5C3 Framework successfully loaded.',this.Class);
            } else {
                this.$current++;
                this._loadNextScript();
            }
        }
    },

	/** 
	 * @method que()
	 *
	 * Add multiple scripts to the que. Do not call directly.
     * 
	 * @param 
	 * Array	$scripts		- Array of scripts to load.
	 * String	$enginebaseURL	- Location of files.
     * 
	 * @return  
	 * None
     */	 
    que: function ($scripts, $engineBaseURL) {
       _DBG_('que(' + $engineBaseURL + ')',this.Class);
        var $i = 0;
        this.setBaseUrl($engineBaseURL);
        for ($i = 0; $i < $scripts.length; $i++) {
            this.add($scripts[$i]);
        }
    },
	 
	/** 
	 * @method loadPlugins()
     * 
	 * Used to load all plugins required by the application. Do not call directly, engine handles automatically.
	 *
	 * @param 
	 * Array	$scripts		- Array of scripts to load.
	 * String	$enginebaseURL	- Location of files.
     * 
	 * @return  
	 * None
	 *
     */	 
	 //<script id="scr1" src="http://www.example.com/some/action?callback=cb" type="text/javascript></script>
    // loadApplets: function ($scripts) {
        // this.debug('loadApplets(' + h5c3.config.options.path + ')');
        // var $i = 0;

        // this.setBaseUrl(h5c3.config.options.path);
        // for ($i = 0; $i < $scripts.length; $i++) {
			// var $script = window.document.createElement("script");
		
			// $script.type = "application/javascript";
			// $script.id=$scripts[$i].name
			// $script.src = $scripts[$i].file;
			// $script.title = "APPLET";
			// $script.async = false;
			// window.document.getElementsByTagName("head")[0].appendChild($script);
        // }
    // },
	
	/** 
	 * @method loadPlugins()
     * 
	 * Used to load all plugins required by the application. Do not call directly, engine handles automatically.
	 *
	 * @param 
	 * Array	$scripts		- Array of scripts to load.
	 * String	$enginebaseURL	- Location of files.
     * 
	 * @return  
	 * None
	 *
     */	 
    loadPlugins: function ($scripts, $engineBaseURL) {
        _DBG_('loadPlugins(' + $engineBaseURL + ')',this.Class);
        var $i = 0;
        this.setBaseUrl($engineBaseURL);
        for ($i = 0; $i < $scripts.length; $i++) {
            this.add($scripts[$i] + '.js');
        }
    }
});
/**
 *
 * @namespace h5c3.R2WL
 * @class h5c3.R2WLCommon
 * @augments h5c3.Base
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * <p>
 * 
 * <pre><code>
 * 
 * </code></pre>
 * 
 * </p>
 */
window.h5c3.R2WLCommon = h5c3.Base.extend('h5c3.R2WLCommon', { 
	_CLASSNAME: 'R2WLCommon',
	_CLASSVERSION:'0.1.0'
}, {
    /**
     * @property {CloudApp object} app
     * @default null
	 * @memberof h5c3.R2WLCommon
     */
    app: null,

    /**
	 * @public
	 * @method
	 * @memberof h5c3.R2WLCommon
	 * @desc
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function () {
        this._super();
		//this.requestCallbacks('start','onready','onresize');
		_DBG_('Rich & Responsive Web Layer (R2WL) Initialized.',this.Class);
    },
	
	start:function() {
		var $h = h5c3.r2wl.parseHeader(DOC().all[0].dataset);
		if (!$h) {
			_DBG_('Invalid Application header.',this);
			return false;
		}
		
		this.brand = new h5c3.Brand();
		this.google = new h5c3.Google('UA-35732532-1');
		this.app = new h5c3.CloudApp($h);
		this.brand.start();
		this.google.start();
		this.app.start();
	},
		
	parseHeader: function($data) {
		
		me = function($h) {
			return $h.role+" : "+$h.name+" v"+$h.version+"("+$h.uuid+")";
		}

		if (ISA($data) !== 'DOMStringMap') {
			return;
			_DBG_('Failed: Method requires a single aprameter of type DOMStringMap.',this);
		} else {
			if (VLD($data.role)&&VLD($data.name)&&VLD($data.version)&&VLD($data.uuid)) {
			$good = this.validUUID($data.uuid);
				if (!$good) {
					_DBG_(me($data)+" Invalid or Not a Genuine UUID.",this);
					return false;
				}
				
				//ok we got enough for a valid applet.
				if ($data.role.toLowerCase()==='application') {
					CHK($data.layout,'absolute-all');
					CHK($data.typo,'default');
					CHK($data.skin,'default');
					CHK($data.applet,'default');					
				}
				_DBG_(me($data)+" Validated.",this);
				return $data
			} else
				return false;
		}
	},
	
	makeHeader:function($role,$name,$version,$uuid) {
		if (!VLD($role)) $role = "applet";
		if (!VLD($name)) $name = "Noname";
		if (!VLD($version)) $version = "0.0.1";
		if (!VLD($uuid) || !$$header.validUUID($uuid)) $uuid = $header.generateUUID();
		
		var html = '<div ';
		html+='	data-role="'+$role+'" ';
		html+='	data-name="'+$name+'" ';
		html+='	data-version="'+$version+'" ';
		html+='	data-uuid="'+$uuid+'" ';
		html+='	data-author="" ';
		html+='	data-copyright="" ';
		html+='	data-scale="1" ';
		html+='/>\n';

		return html;
	},
	
	compile:function($applet) {
		return h5c3.lzw.encode(encodeURIComponent($applet));
	},

	decompile:function($applet) {
		return h5c3.lzw.decode(encodeURIComponent($applet));
	},
	
	validUUID:function($uuid) {
	
		if (VLD($uuid) && $uuid!=="") { 
		
			if (( ($uuid.split("-").length - 1) ==4 )?true:false) {
				//var a=$uuid.charAt(4), b=$uuid.charAt(17), c=$uuid.charAt(22), d=$uuid.charAt(30);
				//if (a && b && c && d) {
				if ($uuid.charAt(4)=="1" && $uuid.charAt(17)=="9" && $uuid.charAt(22)=="6" && $uuid.charAt(30)=="9") {
					return true;
				} else {
					if (location.protocol==='file:' && h5c3.config.devMode) {
						//console.log( 'Thats a bad UUID! Here is a good one '+this.generateUUID() );
						_DBG_('Validation Failed, Bad UUID!',this);
						return false;		
					}
				} /* Embeded Code Check */
				
			} /* Format Check */
			
		} /* General Valid Check */
		
	},
	
	generateUUID:function() {
		return 'xxxx1xxx-xxxx-4xx9-yxx6-xxxxxx9xxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},
	
	onReady:function() {
	}
	
});/**
 *
 * @namespace Core
 * @class h5c3.Brand
 * @augments h5c3.Base
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * <p>
 * 
 * <pre><code>
 * 
 * </code></pre>
 * 
 * </p>
 */
h5c3.Brand = h5c3.Base.extend('h5c3.Brand', {
	_CLASSNAME		:'Brand',
	_CLASSVERSION	:'0.0.2'
},{
    /**
	 * @public
	 * @method
	 * @memberof h5c3.Brand
	 * @desc
     * </p>
	 * Simply creates the I2TM labs / H5C3 Branding object
	 * </p>
     */
    init:function() {
        this._super();
    },
	
	update:function() {
		$("#h5c3built").text(h5c3.BUILT);
		$("#h5c3version").text(h5c3.DISTRO+'-'+h5c3.VERSION);
		if (h5c3.devMode===true)
			$("#h5c3version").css("color","#FF0000");
		else
			$("#h5c3version").css("color","#ddffdd");
	},
	
	populate:function() {
		var $css;
		$css='<style id="h5c3-logo">#h5c3_logo {font-size:1em;display: block;}';
		$css+='#hlmc {position: relative;display:block;top:0px;left:0px;width:100%;height:100%;font-family: Neuropol, sans-serif;text-transform: uppercase;text-align: center;}';   
		$css+='#h5c3_logo .c_H { display:inline; font-size: 100%; color: #e98900; }#h5c3_logo .c_5 { display:inline; font-size: 50%; color: #e98900; }#h5c3_logo .c_C { display:inline; font-size: 100%; color: #000beb; }#h5c3_logo .c_3	{ display:inline; font-size: 50%; color: #000beb; }#h5c3_logo .w_FW { display:block; font-size: 42%; color: #444444;}</style>\n';		
		$css+='#i2tm_logo{font-size:3em;display:block;}#i2tm_logo .w_il{display:inline;font-size:100%;color:#00cc00;}';
		$css+='#ilmc {position:relative;display:block;top:0px;left:0px;width:100%;height:100%;font-family:Neuropol,sans-serif;text-transform:uppercase;text-align:center;padding-top:6.25%;}</style>\n';
		h5c3.r2wl.app.stylesheet.add('brand-logos',$css,'R2WL');
	},
	
	logoI2TM:function($scale) {
		$scale = CHK($scale,4);
		return '<div id="i2tm_logo" data-role="applet" style="font-size:'+$scale+'em"><div id="ilmc"><div class="w_il backlight">i2tm Labs</div></div></div>\n';
	},
	
	logoH5C3:function($scale) {
		$scale = CHK($scale,4);
		return '<div id="h5c3_logo" class="animateIn" data-role="applet" style="font-size:'+$scale+'em"><div id="hlmc"><div class="c_H emboss backlight">H</div><div class="c_5 emboss backlight">5</div><div class="c_C emboss backlight">C</div><div class="c_3 emboss backlight">3</div><div class="w_FW emboss backlight">framework</div></div></div>\n';
	},
	
	youAreRunning:function() {
		var $html='';
		$html+='<h3 style="margin:0">You are running</h3>';
		$html+=this.logoI2TM(4);
		$html+=this.logoH5C3(5);
		$html+='<p id="h5c3version" class="center">version</p>';
		$html+='<p id="h5c3built" class="center">built on</p>';	
		return $html;
	},
	
	poweredBy:function($scale) {
		$scale = CHK($scale,0.5);
		var $clr = (h5c3.devMode) ? 'red' : 'green';
		return '<div style="font-size:'+$scale+'em;color:'+$clr+';width:23%;letter-spacing:0.20em;position: relative;margin:0 auto">Powered By '+h5c3.tag()+'</div>';
	},
	
	start:function() {
		this.populate();
		this.update();
	}

});/**
 * Internal Google Class - Google Tracking & adSense 
 *
 *  h5c3.Google
 * @class  h5c3.Google
 *  h5c3.Base
 */
h5c3.Google = h5c3.Base.extend('h5c3.Google', {
	_CLASSNAME: 'Google',
	_CLASSVERSION:'0.1.2'
},{
	/**
	 * This is your User Account (UA) ID from google
	 *
	 * @property String UID 
	 * 
	 *  H5C3
	 */
	UID: '',
	
	/**
	 * This property is used to see if tracking is actually performed. It is used for debugging. If H5C3.devMode it true or location.protocol is "file" then this value is false.
	 *
	 * @property String enabled 
	 * 
	 *  H5C3
	 */
	enabled: false,
	loaded: false,
	version:"",	
	domain: null,
	
	gaJsHost: null,
	
	/**
	 * Initialization
	 *
	 *  H5C3
	 * @function
	 * 
	 */
	init: function(UID) {
		//this._super();
		this.gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
		this.UID = UID;
		
		if (document.location.protocol!=="file:") {
			this.load(this.gaJsHost + "google-analytics.com/ga.js");
		} 
		else { _DBG_("Google Integration is ready, But your running in developer mode.",this.Class); }
	},
	
	load: function ($src) {
		if (this.enabled!=true) return;
		_DBG_("Requesting Google API.",this.Class);
        var $script = DOC().createElement("script");
        $script.type = "application/javascript";
        $script.src = $src;
        $script.async = true;
		$script.onloaded=h5c3.bind(this, this._onLoaded);
		$script.onerror=h5c3.bind(this, this._onError);

		GET("head")[0].appendChild($script);
		window.setTimeout(function(){
			_DBG_([{msg:"Google API, no loaded event after 5 seconds."}],this.Class);
			h5c3.google._onError();
		},5000);
	},
	
	//Skip pushing google ads if on local file protocol
	push:function() {		
		if (this.enabled===true) {
			_DBG_("Google Push.",this.Class);
			(adsbygoogle = window.adsbygoogle || []).push({});
		} else {
			ads = $(".adsbygoogle").css('background','#333');
		}
	},
	track: function () {
		if (this.enabled!=true) return;
		_DBG_("Google Track.",this.Class);
		try {
			window._gaq.push(['_setAccount',this.UID]); 
			window._gaq.push(['_setDomainName',document.location.host]);
			window._gaq.push(['_addIgnoredOrganic',document.location.host]);
			window._gaq.push(['_trackPageview']);
		} catch(err) {
			_DBG_(printStrackTrace({e:e},this.Class));
		}
	},
	
	getVersion:function() {
		try {
			var pageTracker = _gat._getTrackerByName(); // Gets the default tracker.
			return VLD(this.version = pageTracker._getVersion());
		} catch(err) {
			_DBG_(printStrackTrace({e:e},this.Class));
			return false;
		}
	},
	
	lookForGoogle:function() {
		_DBG_("Determining issue with Google...",this.Class);
		var $scripts = document.getElementsByTagName('script');
		for (var i in $scripts) {
			// go through all the scripts:
			if (typeof($scripts[i].src) !== 'undefined' && $scripts[i].src.split('?')[0].match(/ga\.js$/)) {
				_DBG_("The Google API IS Loaded.",this.Class);
				this.loaded=true;
				if (this.getVersion()) {
					_DBG_("Google API v"+this.version+" is active.",this.Class);
					this.enabled=true;
				}
			}
		}	
	},
	_onLoaded:function(){ 
		_DBG_("Google code received.",this.Class);
		this.google.loaded=true; 
		this.onReady();
	},

	_onError:function(){ 
		_DBG_([{msg:"Google code failed to load."}],this.Class);
		h5c3.google.loaded=false; 
		h5c3.google.enabled=false;

		this.lookForGoogle();
		h5c3.google.onReady();
	},
	
	start:function() {
		if (this.UID==='') _DBG_('You did not set your Google Unique ID in the config file.',this.Class); else _DBG_('Using your Google Unique ID ' + this.UID,this.Class);
		if (!this.enabled) _DBG_('Google communication is NOT enabled.',this.Class); else _DBG_('Google communication is enabled.',this.Class);	
	}
});
/**
+-----------------------------------------------------------+
| File:		style.js										|
| Version:	0.0.1											|
| Author: Andrew Donelson	andrew@i2tmlabs.com				|
| H5C3 Framework - (c) 2013 <i2tm Labs http://i2tmlabs.com>	|
| This file contains an H5C3 core object that creates a 	|
| dynamic stylesheet. This is the basis for every single	|
| H5C3 CloudApp created weather its a Rich Document or Full |
| Applications.												|
|															|
| Requires: css/h5c3.rwd.style.js (loaded after)			|
+-----------------------------------------------------------+
*/
h5c3.StyleSheet = h5c3.Base.extend('h5c3.StyleSheet',  {
	_CLASSNAME: 'Google',
	_CLASSVERSION:'0.1.0',

	//This is the percentange of window width to 12px standard font. Used to calc for EM
	// so 1em = (Screen width / _EMPCT)
	_EMPCT : 85,
	
	_FONTSIZE: 16, //in pixels
	
	_MODES : [
		{w:2560,f:19},
		{w:1920,f:18},
		{w:1600,f:17},
		{w:1440,f:16},
		{w:1366,f:15},
		{w:1280,f:14},
		{w:1024,f:13},
		{w:768,f:12},
		{w:480,f:11},
		{w:320,f:10}]
},{
	r2wl: null,

	useMQ: true,				//false uses dynamic on the fly calculations, otherwise media queries are created and used.d
	
	appLayout:'',
	
	/* Mobile mode is considered any resolution under 720px width with a higher value in height. ie. 720x721 is mobile */
	mode: 2,				//NULL on purpose - triggers for event

	mobile: null,			//The mobile menu button (DIV)
	
	reloadRedraw: false,
	
	resizeTimer:0,
	
	/**
	 * Initialization Method
	 */	
	init:function ($layout,$r2wl) {
        this._super();
		this.r2wl=$r2wl;
		this.createMediaQueries();
		this.checkScreenMode();				//save current orientation
		//this.createLayouts();

		this.initEvents();
		this.mobile = DOC().createElement('div');
	},
	
	start:function() {
		this.reviewResolution();
	},
	
	add:function($id,$style,$type) {
	//add:function($name,$style) {
		if ( $style==="" ||$style.length<40 || !VLD($id) || !VLD($type) ) return;
		//Already present
		if (GEI($id)) return;
		//Remove any tags, just want css
		$style = $($style);
		$($style).data("role",$type);
		var $s = DOC().createElement('style');
		$s.id = $id;
		$s.type = 'text/css';
		//$s.dataset.data("role",$type);
		$s.innerHTML = $($style).text();
		
		//$htmlDiv.innerHTML = '<style></style>\n';
		document.getElementsByTagName('head')[0].appendChild($s);
		
		_DBG_('Added Stylesheet '+$id,this.Class);
	},
	
	remove:function(name) {
		if (VLD(name)) return;
	
	},

	reviewResolution:function() {
		//check application attributes for the layout we are using
		if (d = DOC().documentElement.dataset) {
		
			if (!h5c3.r2wl.app.layout.isValid(d.layout)) {
				_DBG_('Not a valid layout. ['+d.layout+']',this.Class);
			} else {
				_DBG_('Valid Layout ['+d.layout+'] detected.',this.Class);
				this.appLayout = d.layout;
				if (this.appLayout==='absolute-all') {
					//subtract sidebars and then calulate
					return this.setResolution((window.innerWidth-400));
				} else {
					return this.setResolution();			
				}
			}
		}
	},
		
	initEvents:function() {
		$(window).resize(function(){
		  clearTimeout(h5c3.r2wl.app.stylesheet.resizeTimer);
		  h5c3.r2wl.app.stylesheet.resizeTimer = setTimeout(h5c3.r2wl.app.stylesheet._onResizeComplete, 200);
		});		
	},
	
	_onScreenSizeChanged:function() {
		_DBG_('Window Size has changed.',this.Class);
		if (this.layout !== 'absolute') return;
		//721 to 959 Drop Right sidebar
		if (this.mode < 2) {
			$("#RIGHTBAR").css({display:"none",width:"0"});
			$("#CONTENT").css({right:"0"});
		} else {
			$("#RIGHTBAR").css({display:"block",width:"12.5em"});
			$("#CONTENT").css({right:"12.5em"});
		}
		
		//0 to 720 Drop left sidebar
		if (this.mode < 1) {
			$("#LEFTBAR").css({display:"none",width:"0"});
			$("#CONTENT").css({left:"0"});
		} else {
			$("#LEFTBAR").css({display:"block",width:"15em"});
			$("#CONTENT").css({left:"15em"});
		}		
	},

	_onResizeComplete:function() {
		_DBG_('Window resize detected.');
		h5c3.r2wl.app.stylesheet.checkScreenMode();
		if (this.reloadRedraw===true)
			h5c3.r2wl.app.stylesheet.forceRedraw();
		else
			h5c3.r2wl.app.layout.reCalc();
	},

	forceRedraw:function() {	
		GEI("WRAPPER").style.display="none";
		location.reload();
	},
	
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
	
	getFontSize:function() {
		var el = GEI('WRAPPER');
		if (VLD(el)) {
			var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
			return fontSize = parseFloat(style);
		}
		return 14;
	},
	
	/**
	{GUTTER}		1em Default (about 12 px)
	{SWIDTH}		Actual Window With, ie. 1920px	
	{OUTER}			Desired content width. ie. 960px R2WL uses 90% up to full HD then its static at 1920px full width, 100% on mobile
	{INNER}			Actual content width = ({OUTER}-{GUTTER})
	*/
	calcRWDValues:function($width) {
		var $obj 			= {scrn:$width};
			$obj.gutter		= 1;
			$obj.em 		= this.getFontSize();//8-12
	
		if (this.mobile) {
			//We are going to use 90% for out outer window content
			$obj.full=
			$obj.outer= 	
			$obj.cellwidth=	
			$obj.sixth=		
			$obj.fourth=	
			$obj.third=		
			$obj.half=		
			$obj.width		= Math.floor($width / $obj.em);

			$obj.cellheight	= Math.floor( ((window.innerHeight/$obj.em)-$obj.gutter) *.10);		
			$obj.maxHeight	= (window.innerHeight / $obj.em).toFixed(2);
		} else {
			//We are going to use 90% for out outer window content
			$obj.width		= Math.floor($width / $obj.em);
			$obj.full=
			$obj.outer 		= ( ($width * 0.90) / $obj.em).toFixed(2);
			
			$obj.cellwidth	= Math.floor( ($obj.outer-$obj.gutter) *.10);		
			$obj.sixth		= ($obj.outer / 6).toFixed(2);
			$obj.fourth		= ($obj.outer / 4).toFixed(2);
			$obj.third		= ($obj.outer / 3).toFixed(2);
			$obj.half		= ($obj.outer / 2).toFixed(2);
			$obj.cellheight	= Math.floor( ((window.innerHeight/$obj.em)-$obj.gutter) *.10);		
			$obj.maxHeight	= (window.innerHeight / $obj.em).toFixed(2);
		}
		return $obj;
	},
	
	onReady:function() {
		_DBG_('Stylesheet Ready.',this.Class);
	},
	
	//Create media queries for the devices actual dimensions
	createMediaQueries:function() {
		//10 media queries for any resolution
		var fs=14, //0.4 per step
			step = ((window.screen.availWidth-320) / 10).toFixed(2),
			css ='<style data-role="Application">\n';
			
		for (i=window.screen.availWidth;i>319;i=i-step) {
			css+="@media all and (max-width:"+i+"px) {body,#WRAPPER {font-size:"+fs+"px;}}\n";
			fs=(fs-0.4).toFixed(2);
		}		
		css+="</style>\n";

		_DBG_('Dynamic Media Queries for ['+window.screen.availWidth+'x'+window.screen.availHeight+'] created.',this.Class);
		this.add('Media-Queries',css,'R2WL');
	},
	zoom:function($el,$in) {
		//find the window element
		var $t;
		for (i=0;i<9;i++) {
			$el=$el.parentElement;
			if ($el.className.indexOf('r2wl_window ')!==-1) break;
		}
		var $val = $el.dataset.zoom;
		if (!VLD($val)) $val = 1;
		if ($in && $val < 7) {
			$val++;
			if ($val > 1) $val = 7;
		} else if ($val >1) {
			$val--;
			if ($val < 1) $val = 1;
		}
		$el.dataset.zoom = $val;
	},
	
	setResolution:function($width) {
		if (!VLD($width)) { $width = window.innerWidth; }
		
		var $obj = this.calcRWDValues($width),
			css ='<style data-role="Application">';
		
		// css+="body{font-size:"+$obj.em+"px;width: 100%;height: 100%;}";
		// css+=".cell{min-height:"+$obj.cellheight+"em;max-height:"+$obj.cellheight+"em;min-width:"+$obj.cellwidth+"em;max-width:"+$obj.cellwidth+"em;margin:"+$obj.gutter+"em}";
		// css+=".box{margin:"+$obj.gutter+"em}";
		// css+=".lightbox{padding:"+$obj.gutter+"em;margin:"+$obj.gutter+"em}";
		// css+=".full{min-width:"+$obj.width+"em;width:"+$obj.width+"em;margin:"+$obj.gutter+"em;}";
		// css+=".fill{min-width:100%;width:100%;min-width:100%;width:100%;margin:0em;}";
		// css+=".half{min-width:"+$obj.half+"em;width:"+$obj.half+"em;}";
		// css+=".third{min-width:"+$obj.third+"em;width:"+$obj.third+"em;}";
		// css+=".fourth{min-width:"+$obj.fourth+"em;width:"+$obj.fourth+"em;}";
		// css+=".sixth{min-width:"+$obj.sixth+"em;width:"+$obj.sixth+"em;}";	
		
		// if (this.mode!=2) {
			//Individual Column Sizes
			// css+=".pct100 {width:100%;}\n";
			// css+=".pct90 {width:100%;}\n";
			// css+=".pct80 {width:100%;}\n";
			// css+=".pct70 {width:100%;}\n";
			// css+=".pct60 {width:100%;}\n";
			// css+=".pct50 {width:100%;}\n";
			// css+=".pct40 {width:100%;}\n";
			// css+=".pct30 {width:100%;}\n";
			// css+=".pct20 {width:100%;}\n";
			// css+=".pct10 {width:100%;}\n";
		// } else {		
			//Individual Column Sizes
			// css+=".pct100 {width:"+$obj.width+"em;}\n";
			// css+=".pct90 {width:"+(($obj.width)*0.9).toFixed(2)+"em;}\n";
			// css+=".pct80 {width:"+(($obj.width)*0.8).toFixed(2)+"em;}\n";
			// css+=".pct70 {width:"+(($obj.width)*0.7).toFixed(2)+"em;}\n";
			// css+=".pct60 {width:"+(($obj.width)*0.6).toFixed(2)+"em;}\n";
			// css+=".pct50 {width:"+(($obj.width)*0.5).toFixed(2)+"em;}\n";
			// css+=".pct40 {width:"+(($obj.width)*0.4).toFixed(2)+"em;}\n";
			// css+=".pct30 {width:"+(($obj.width)*0.3).toFixed(2)+"em;}\n";
			// css+=".pct20 {width:"+(($obj.width)*0.2).toFixed(2)+"em;}\n";
			// css+=".pct10 {width:"+(($obj.width)*0.1).toFixed(2)+"em;}\n";
		// }
		
		css+="[class*='pct'] {float:left;min-height:3em;min-width:4em}\n";
		css+="#waDIV {width:48em; height:27em;position:relative;}\n";
		css+="#waCanvas {width:100%;height:100%;}\n";
		css+=".h5c3_applet {width:0px;height:0px;display:none;}\n";
		css+="#HEADER.normal,.HEADER,#LEFTBAR.normal,.LEFTBAR,#RIGHTBAR.normal,.RIGHTBAR,#FOOTER.normal,.FOOTER { background: rgba(255, 255, 255, 0.85); color: rgba(60, 100, 190, 0.85); }\n";
		css+="#HEADER.light,.HEADER,#LEFTBAR.light,.LEFTBAR,#RIGHTBAR.light,.RIGHTBAR,#FOOTER.light,.FOOTER { background: rgba(255, 255, 255, 0.85); color: rgba(60, 100, 190, 0.85); }\n";
		css+="#HEADER.dark,.HEADER,#LEFTBAR.dark,.LEFTBAR,#RIGHTBAR.dark,.RIGHTBAR,#FOOTER.dark,.FOOTER { background: rgba(255, 255, 255, 0.85); color: rgba(60, 100, 190, 0.85); }\n";
		css+="</style>\n";
		_DBG_('Dynamic Stylesheet created for '+$width,this.Class);
		this.add('common',css,'R2WL');
	}
});
/**
+-----------------------------------------------------------+
| File:		HEAD.min.js										|
| Version:	0.0.1											|
| Author: Andrew Donelson	andrew@i2tmlabs.com				|
| H5C3 Framework - (c) 2013 <i2tm Labs http://i2tmlabs.com>	|
+-----------------------------------------------------------+
*/

/**
 *
 * @namespace h5c3.Layout
 * @class h5c3.Layout
 * @augments h5c3.Base
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * <p>
 * 
 * <pre><code>
 * 
 * </code></pre>
 * 
 * </p>
 */
h5c3.Layout = h5c3.Base.extend('h5c3.Layout', { 
	_CLASSNAME: 'Layout',
	_CLASSVERSION:'0.1.0',
	
	_layouts: ["standard","landing","absolute"]
}, {
	r2wl: null,
    /**
     * @property {object} resources
     * @default null
	 * @memberof h5c3.Layout
     */
    layout: null,

	header: false,
	leftbar: false,
	rightbar: false,
	footer: false,
	
	dim:{t:5,b:2.5,l:15,r:12.5},
	
    /**
	 * @public
	 * @method
	 * @memberof h5c3.Layout
	 * @desc
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function ($layout,$r2wl) {
        this._super();
		this.r2wl=$r2wl;
		if (this.isValid($layout)) {
			this.layout = $layout;
			_DBG_('Valid layout ['+$layout+'] detected.',this);		
		} else {
			_DBG_('Unknown layout ['+$layout+'] Did you forget to load the plugin that implements is?',this);
		}
    },

	start:function() {
		if (this.isValid(this.layout)) {
			this.setLayout(this.layout);
		} else {
			this.setLayout('standard');			
		}
	},
	
	isValid:function($layout) {
		if (!VLD($layout)) return false;
		$layout.toLowerCase();
		var $t = $layout.split('-');
		return (this.Class._layouts.indexOf($t[0]) > -1);
	},
	
	setLayout:function($name) {
		this.layout = $name;
		//if ($name===this.Class._layouts[2]) { 
			//BEGIN Absolute
			var $t = $name.split('-');
			for (i=0;i<$t.length;i++) {
				if ($t[i]==='all') {
					this.header = true;
					this.leftbar = true;
					this.rightbar = true;
					this.footer = true;
					break;
				}
				else if ($t[i]==='header') this.header = true;
				else if ($t[i]==='left') this.leftbar = true;
				else if ($t[i]==='right') this.rightbar = true;
				else if ($t[i]==='footer') this.footer = true;
			}
			this.absolute();
		//} 	//END Absolute
	},
	
	//Usually called when there was a window resize and the iser does not want the browser reload.
	reCalc:function() {
	
	},

	//absolute
	absolute:function() {
		DOC().body.id='DESKTOP';

		if (document.body.innerHTML.length<11) {
			var $css='',$html='';
			var $top=this.dim.t,
				$bot=this.dim.b,
				$lw=this.dim.l,
				$rw=this.dim.r;
			
			$css+='<style>#WRAPPER {position:absolute;min-height: 100%;min-width: 100%;height: 100% !important;height: 100% !important;overflow:hidden;}\n',
			$html+='<div id="WRAPPER" data-type="application" data-layout="absolute">\n';
					
			if (VLD(this.r2wl.app.header.applet)) {
				$applet='<div data-applet="'+this.r2wl.app.header.applet+'">';
			} else {
				$applet='<div data-applet="none">';
				$applet += this.r2wl.brand.logoI2TM(4);
				$applet += this.r2wl.brand.logoH5C3(12);
				$applet += this.r2wl.brand.poweredBy(1);	
				$applet += '<p style="text-align:center"><br />Negative ghostrider!...You have not assigned a default applet.<br />Documentation can be found <a href="http://devzone.i2tmlabs.com/">HERE</a>.<p>';
				$applet += '</div>';
			}
			
			if (this.layout.header) {
				$css+='#HEADER {position: fixed;z-index: 9999;width: 100% !important;top: 0;height:'+$top+'em !important;}\n';
				$html+='<div id="HEADER" ></div>\n';
				$html+='<div id="CONTENT">\n';		
			} else {
				$top=0;
				$html+='<div id="CONTENT">\n';		
			}
			
			if (this.layout.leftbar) {
				$css+='#LEFTBAR {position:fixed;z-index: 9999;top:'+$top+'em;bottom:'+$bot+'em;left:0px;width:'+$lw+'em;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;}\n';
				$html+='<div id="LEFTBAR"></div>	\n';
				$html+='<div id="VIEWPORT">'+$applet+'</div>\n';
			} else {
				$lw=0;
				$css+='#LEFTBAR {position:fixed;z-index: 9999;top:'+$top+'em;bottom:'+$bot+'em;left:0px;width:'+$lw+'em;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;}\n';
				$html+='<div id="VIEWPORT">'+$applet+'</div>\n';
			}
			
			if (this.layout.rightbar) {
				$css+='#RIGHTBAR {position:fixed;z-index: 9999;top:'+$top+'em;bottom:'+$bot+'em;right:0px;width:'+$rw+'em;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;}\n';
				$html+='<div id="RIGHTBAR"></div>\n';
				$html+='</div><!-- CONTENT -->\n';
			} else {
				$rw=0;
				$html+='</div><!-- CONTENT -->\n';
			}
			
			if (this.layout.footer) {
				$css+='#FOOTER {position: fixed;z-index:9999;width:100%;height:'+$bot+'em !important;bottom:0;}\n';
				$html+='<div id="FOOTER"></div>\n';
				$html+='</div>\n';
			} else {
				$bot=0;
				$html+='</div>\n';
			}
			$css+='#CONTENT {position: absolute;right:'+$rw+'em;left:'+$lw+'em;top:'+$top+'em;bottom:'+$bot+'em;padding:0em;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;-o-box-sizing: border-box;-ms-box-sizing: border-box;box-sizing: border-box;overflow: hidden;}\n';
			$css+='#VIEWPORT {width: 100%;height: 100%;overflow: auto;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;-o-box-sizing: border-box;-ms-box-sizing: border-box;box-sizing: border-box;}</style>\n';
			this.r2wl.app.stylesheet.add(this.layout,$css,'R2WL');
			document.body.innerHTML = $html;
		} else {
			_DBG_('Hand coded '+this.layout+' layout detected, Skipping Dynamic creation.',this);
		}
		
	}
	
});/**
 *
 * @namespace h5c3
 * @class h5c3.SmartMenu
 * @augments h5c3.Base
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * <p>
 * 
 * <pre><code>
 * 
 * </code></pre>
 * 
 * </p>
 */
h5c3.SmartMenu = h5c3.Base.extend('h5c3.SmartMenu', { 
	_CLASSNAME: 'SmartMenu',
	_CLASSVERSION:'0.0.1'
},{
    /**
     * @property {object} resources
     * @default null
	 * @memberof h5c3.SmartMenu
     */
    $_menu: null,

    /**
	 * @public
	 * @method
	 * @memberof h5c3.SmartMenu
	 * @desc
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function () {
        this._super();
		if (typeof h5c3.config.smartmenu === 'object') {
			this.$_menu = h5c3.config.smartmenu;
		}
    }
});/**
 * @class  h5c3.Applet
 * 
 * A Applet resource. You can use this class to acquire Applets (loaded from a URI) and then use them in your CloudApp
 */
h5c3.Applet = h5c3.Pooled.extend('h5c3.Applet', {
	_CLASSNAME: 'Applet',
	_CLASSVERSION:'0.1.0',

	params: {
		required: ['role','name','version','uuid'],
		optional: ['author','copyright','scale']
	},
	
	//True if this applet has 1 or more applets
	hasChildren:false,
	
	children:[],
	
	/**
	 * Constructs an Applet by acquiring it from the object pool. An applet had 4 required attributes
	 * ['role','name','version','uuid'] and 3 optional attributes ['author','copyright','scale'].
	 * 
	 * The name must be unique to your Applet Store. The UUID must be a valid and H5C3 Genuine which matches it
	 * to you, company or personal. It is strongly suggested that you use the version. End Users have the option
	 * of Automatically using the latest Applications and Applets, but that usually means stability issues. Using
	 * the version allows for saftey and less issues.
	 *
	 * @param  
	 * {h5c3.url} url url to the applet - http://applets.i2tmlabs.com/ + path/to/applet/applet.someAppletName.html
	 * @return {h5c3.Applet} A h5c3.Applet if successful, Applet Name if failed.
	 */
	create: function($data)
	{
		var n = this._super();
		if (ISA($data)==="Object:Simple" && $data.header.name!==null) {
			for (var $key in $data) {
				n[$key] = $data[$key];
			}
			
		} 
		
		if (n.parse($data))
			return n
		else
			return n.name;
	}	
},
/** Interface: h5c3.Applet.prototype */
{
	/** the Applets stylesheet-will be added/removed to head automatically */
	style:'',

	/** the Applets javascript-will be added/removed to head automatically */
	script:'',

	/** the Applets html- place as variable {$applet:someAppletName} */
	html:'',
	
	/** Source URI used to load the image */
	src:null,

	header: {
		/** Applets Name */
		name:null,
		
		/** Applets version */
		version:'',
			
		/** Applets Universally unique identifier */
		uuid: '',
		
		role: '',
		
		author: '',
		
		copyright: ''
	},
	
	/** When the this object was created */
	created: 0,				
	
	/** when the this object was last used */
	accessed: 0,

	/** Loaded, parsed, Verified and ready to use? */
	ready: false,

	/** Whether the image has been loaded yet */
	loaded:false,
	
	/** is this applet con the current page? yes make it active otherwise disable it **/
	active: false,
	
	
	/**
	 * Constructs a new h5c3.Applet. If the h5c3.loader has already started then the image will be
	 * immediately loaded, otherwise it will wait for the resource loader to handle the loading.
	 * @param  String name Name to give the image resource
	 * @param  String src URI for the image
	 */
	init:function ()
	{
		this._super();	
	},

	//me:function() {
	//	return this.uniqueId+" : "+this.header.name+" v"+this.header.version+"("+this.header.uuid+")";
	//},
	
	scanForApplets:function($html) {
		var $self=false;
		CHK($html,"");
		if ($html==="self") {
			$html = this.$html
			$self=true;
		} else if (VLD($html)) { 
			$html = $($html); 
		} else { 
			$html = $("body"); 
		}
		if (!VLD($html)) return 0;
		_DBG_('Scanning '+$html[0].nodeName+' for applets...',this.Class);
		
		//Ok we found all applets (if any)
		var $DIVs = $($html).find("div").filter(function(data) {
			return $(this).data("applet") !== undefined;
		});
		if ($self && $DIVs.length>0) this.hasChildren=true;
		return $DIVs
	},
	
	embed:function ($html,$into) {
		//if (this.active) return;	
		var tmp = $("div[data-applet='"+this.header.name+"']").append($html);		
		this.active = true;
		this.setDraggable();
	},

	unbed:function () {
		if (!this.active) return;
		this.active = false;
		// dont forget to remove the style and script!!!
	},
		
	setDraggable:function() {
		$(function() {
			$('#VIEWPORT').on('mousedown', 'div', function() {
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
	parse:function($data) {
		var $result = true, $el=null;

		if (ISA($data)==="Object:Simple" && $data.header.name!==null) 
			$el=$data; 
		else {
			$el=$($data);
			this.header = h5c3.r2wl.parseHeader($el[0].dataset);
			if (!this.header) return false;
			$data = $($data).not("comment").not("text");
		}
		
		for (i=0;i<$data.length;i++) {
			if ($data[i].dataset.role==='applet' && $data[i].dataset.type==='content') {
				this.html = $data[i].outerHTML
			} else if ($data[i].dataset.role==='applet' && $data[i].dataset.type==='style') {
				this.style = $data[i].outerHTML;
			} else if ($data[i].dataset.role==='applet' && $data[i].dataset.type==='script') {
				this.script = $data[i].outerHTML;				
			}
		}
		
		//Hide it initially - it will fade in 
		if (this.style)		h5c3.r2wl.app.stylesheet.add(this.header.name,this.style,'Applet');
		if (this.script)	h5c3.r2wl.app.stylesheet.add(this.header.name,this.script,'Applet');
		if (this.html) {
			this.embed(this.html);
		}	
		return $result;
	},
		
	makeHeader:function($role,$name,$version,$uuid) {
		if (!VLD($role)) $role = "applet";
		if (!VLD($name)) $name = "Noname";
		if (!VLD($version)) $version = "0.0.1";
		if (!VLD($uuid) || !h5c3.r2wl.validUUID($uuid)) $uuid = h5c3.r2wl.generateUUID();
		
		var html = '<div ';
		html+='	data-role="'+$role+'" ';
		html+='	data-name="'+$name+'" ';
		html+='	data-version="'+$version+'" ';
		html+='	data-uuid="'+$uuid+'" ';
		html+='	data-author="" ';
		html+='	data-copyright="" ';
		html+='	data-scale="1" ';
		html+='/>\n';

		return html;
	},
	
	parseStyle:function($data) {
		return $($data).filter("style").each(function(data) {
			h5c3.r2wl.app.stylesheet.add(this.header.name,this.outerHTML,'Applet');
			return this.outerHTML.toString();
		});		
	},
	
	parseScript:function($data) {
		return $($data).filter("script").each(function(data) {
			h5c3.r2wl.app.stylesheet.add(this.header.name,this.outerHTML,'Applet');
			return this.outerHTML.toString();
		});		
	},
	
    /**
	 * @method verify()
	 *
	 * Scans a applet and verifies that it is contructed/configured correctly. All applets need a minimum
	 * of 4 data attributes (role, name, version and uuid)
     * 
	 * @param
	 * None
	 *
	 * @return 
	 * None
     */		
	verify:function($applet,$autofix) {
		var $result,$uuid,$name,$version,$wrapper,$content = false;
		var $msg="Validating->";
		$result=0;

		//Check for applet role
		if (!VLD($applet.dataset.role)) {
			$msg+="Missing data-role->"
			if ($autofix) {
				$applet.dataset.role="applet";
				$msg+="Fixed->"; 
			} else $result++;
		} //End Role
		
		if (!VLD($applet.dataset.name)) {
			$msg+="Missing data-name->";
			if ($autofix) {
				$applet.dataset.name="GIVE_ME_A_NAME";
				$msg+="Fixed->"; 
			} else $result++;

		} else if ($applet.dataset.name==="") {
			$msg+="data-name is empty->";
			if ($autofix) {
				$applet.dataset.name="GIVE_ME_A_NAME";
				$msg+="Fixed->"; 
			} else $result++;
		} //End Name
		
		if (!VLD($applet.dataset.version)) {
			$msg+="Missing data-version->";
			if ($autofix) {
				$applet.dataset.version="0.0.1";
				$msg+="Fixed->"; 
			} else $result++;
		} else if ($applet.dataset.version==="") {
			$msg+="data-version is empty->";
			if ($autofix) {
				$applet.dataset.name="0.0.1";
				$msg+="Fixed->"; 
			} else $result++;
		} //End Version
		
		//Validate/Create UUID
		if (!h5c3.r2wl.validUUID($applet.dataset.uuid)) {
			$msg+="Missing data-uuid->"
			if ($autofix) {
				if ($applet.dataset.uuid = h5c3.r2wl.generateUUID()) {
					$msg+="Created UUID->"; 
				} else {
					$msg+="Aborted: Unable to generateUUID."; 
				}
			} else $result++;
		} //End UUID
			
		if ($result===0 && $autofix!=true) {
			$msg+="PERFECT!->"; 		
		} else {
			$msg+="Failed ("+$result+") issues->"; 		
		}
		$msg+="Done."; 		
		return {result:$result,message:$msg,applet:$applet}		
	}		
});


/**
 * @class  h5c3.AppletFactory
 *
 * For creating entities (mostly just an interface class you extend from to create an entity factory).
 * No need to create an instance yourself...it is created automatically by Game::onReady()
 *
 * 
 *	h5c3.entityFactory = new AppletFactory();
 * (end)
 */
h5c3.AppletFactory = h5c3.Factory.extend('h5c3.AppletFactory',  {
	_CLASSNAME: 'AppletFactory',
	_CLASSVERSION:'0.3.1',
	
	getAppletPath:function($usecfg) {
		if ($usecfg && h5c3.config.options.path!='') 
			return h5c3.config.options.path+'applets/';
		else
			return h5c3.path.home+h5c3.path.applets;
	}
},{
	//Private array that stores elements name if it was scanned for links
	_scanned: [],

	//Private array that stores a history of applets to keeep form reloading. Page Reload wipes this
	_history: [],
	
	//Private array that stores elements name if it is waiting to be loaded
	_loadQue: [],
	
	started: false,
	
	r2wl: null,
	
	style: null,
	
	layout: null,
	
	_tracker: {
		failed: 0,
		loading: 0,
		loaded: 0,
		fromConn: 0,
		fromCache: 0,
		loops: 0,
		indexed:false
	},
		
	throttle: null,			//AJAX/Applet Throttle

	/**
	 * Initialization Method
	 */	
	init:function($r2wl) 
	{
		this._super('Applet');
		this.r2wl = $r2wl;
	},
		
	/**
	 * Called by the entity loader
	 *
	 * @param  {Object}		$data String type of the entity to create
	 * {h5c3.Layer} layer Layer the entity should be placed on
	 * @return {h5c3.Applet}
	 */
	create:function ($data)
	{		
		//load applet
		return this.requestApplet($data);
	},
	
	add:function($name,$obj) {
		this._super($name,$obj);
		
	},
	
	reset:function() {
		this._loadQue	= [];
		this._tracker	= {failed:0, loading: 0,loaded: 0,fromConn: 0,fromCache: 0,loops: 0};
	},

	stop:function() {
		this.started	= false;	
	},
	
	//Start loading all applets in our que
	start:function() {
		if (this.started) return;
		this.reset();
		this.started = true;
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
			h5c3.r2wl.app.applets.setpage(this.name);
		} catch (e) {
			AST(null,printStackTrace({e:e}));
		}
	},

	setpage:function($applet_name) {
		try {
			var $applet = h5c3.r2wl.app.applets.use({name:$applet_name}), $tmp;
			if (!$applet) return;
				var $DIVs = $applet.scanForApplets("self");
				
				for (i=0;i<$DIVs.length;i++) {
					var $name=$($DIVs[i]).attr('data-applet');
					$tmp = h5c3.r2wl.app.applets.use({name:$name});
					var tmp = $("div[data-applet='"+this.header.name+"']").append($html);		
				}
						
			if ($("#VIEWPORT").css("opacity")!="0") {
				this.lastContent = GEI("VIEWPORT").innerHTML;
				$("#VIEWPORT").fadeOut(250, function() {
					GEI("VIEWPORT").innerHTML =  $applet.html;
					$("#VIEWPORT").fadeIn(250,"linear");				
				});				
				//save current app & page to localstorage for resume
				h5c3.local.setAppCfg('currentPage',$applet.name);
			}
		} catch (e) {
			AST(null,printStackTrace({e:e}));
		}		
	},
	
    /**
	 * @method scanAnchors()
	 *
	 * Scans HTML document (CloudApp) or Loaded Applets for link to other applets and adds them to laod que
     * 
	 * @param	HTML		$html		optional html (applet) to seaqrch for other applets (nested)
	 *
	 * @return 	ARRAY 		All Applets detected in $HTML or BODY if no parameter
     */	
	scanAnchors:function($html) {
		var $msg="Scanning ",$elName,total=0,cached=0,load=0;
		if (VLD($html)) { $html = $($html); } else { $html = $("body"); }

		if ($html[0].id!="") {
			//Its in history..then we are ready scanned it.
			$elName=$html[0].id; 
			
			if (this._scanned.indexOf($elName) != -1) return true;
		} else {
			$elName=$html[0].nodeName;
		}
		
		$msg+=$elName+' for Links...';
		var links = GET('a');
		for (i = 0; i < links.length; i++) {
			//Possible Applet Link?
			if (links[i].hash!="") {
				var n=links[i].hash.split(".");
				if (n[0]=='#applet') {
					if (n[1]!="") {
						//Yep, its a applet link, add handler and pre-cache it
						links[i].addEventListener('click', this.onHREFClick, false);
						
						if (this._scanned.indexOf(n[1]) === -1) {
							this._loadQue.push(n[1]);
							this._scanned.push(n[1]);
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
		_DBG_($msg+'Found '+total+' linked applets. [Cached:'+cached+', Qued:'+load+', Total:'+total+']',this.Class);
		return total;
	},
	
    /**
	 * @method scanHTML()
	 *
	 * Scans HTML document (CloudApp) for all elements with a [data-applet] tag and saves them in the HashTable
	 * This does not scanHTML a applet for data-tags - that is handled by the Applet class.
     * 
	 * @param
	 * 	HTML		$html		optional html (applet) to seaqrch for other applets (nested)
	 *
	 * @return 
	 *	ARRAY 		All Applets detected in $HTML or BODY if no parameter
     */	
	scanHTML: function ($html) {
		var $setActive;
		
		if (VLD($html)) { 
		//	$html = $($html); 
			$setActive = false;		//[Not in use] - its in the cache so its not visible
		} else { 
		//	$html = $("body"); 
			$setActive = true;		//[In use] - its inthe app body so its visible
		}
		
		var DIVs = h5c3.Applet.prototype.scanForApplets($html);
		
		for (i=0;i<DIVs.length;i++) {
			if ($setActive === true) 
				DIVs[i].style.display = 'block';
			else 
				DIVs[i].style.display = 'none';
				
			this._loadQue.push(DIVs[i].dataset.applet);
		}
		//How many Applets from Static Includes? (In Page)
		this._tracker.loading = this._loadQue.length;
		
		_DBG_('A total of '+this._tracker.loading+' applets were found.',this.Class);
		
	},

	checkQue:function() {
		_DBG_('Checking Que...',this.Class);
		if (this._loadQue.length<=0) {
			//auto resume
			var $resume = h5c3.local.getAppCfg('currentPage');
			if (VLD($resume)) this.setpage($resume);
			return true;
		}
		//No Duplicates		
		if (this._loadQue.length>2) {
			var $uniqueQue = this._loadQue.filter(
				function(elem, pos) {
					return h5c3.r2wl.app.applets._loadQue.indexOf(elem) == pos;
				});	
			this._loadQue = $uniqueQue;
		}

		this._tracker.loading=this._loadQue.length;
		//load one from que.
		//var $applet = this._loadQue.pop();
		var $applet = this._loadQue.shift();
		this.requestApplet({ name: $applet });
	},
	
    /**
	 * requestApplet()
	 *
	 * Desc
     * 
	 * @param
	 * None
	 *
	 * @return 
	 * None
     */		
	requestApplet:function($data) {
		if (!VLD($data)) return false;
		
		var $msg = "Received request for: "+$data.name+'... ';
		var $fromlocal=false;
		var $applet = h5c3.local.getAppFile($data.name);
		if (VLD($applet)) {
			$msg += "Found in local Storage.";
			this.onLoad($applet);
			$fromlocal=true;
		}
		
		//See if the applet we want is in history (cached)
		var tmp = this._history[$data.name];
		
		if (typeof tmp != 'undefined') {
			this._tracker.fromCache++;
			$msg += "Found in cache. ";
			_DBG_($msg,this.Class);
			if (VLD(tmp.div)) this.onLoad(tmp.div);
			this.checkQue();
			return true;
		} else if (!$fromlocal) {
			$msg += "Not cached. ";
		}

		//No, We'll have to load it with Ajax
		this._history[$data.name] = {name:$data.name,src:this.Class.getAppletPath(1)+'applet.'+$data.name+'.html',div:$data.div};
		if (!$fromlocal) {
			try {
				$msg += "Requesting remote transfer. ";
				h5c3.XHR(this._history[$data.name].src,h5c3.bind(this, this.onLoad),h5c3.bind(this, this.onError));									
			} catch (e) { 
				AST(null,printStackTrace({e:e}));
			}
		}
		_DBG_($msg,this.Class);
	},

	_checkAllDone:function() {		
		if (this._loadQue.length<=0) {
			//All Applets have been loaded
			_DBG_("Load Complete. Cache: "+this._tracker.fromCache+", Remote: "+this._tracker.fromConn+", Failed: "+this._tracker.failed+", Total: "+this._tracker.loaded,this.Class);
			this.stop();			
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
		if ($data==="") return false;
		var $fromlocal;
		var a = ISA($data);
		if (ISA($data) ==="Object:Simple") {
			//we got it from localstorage already created.
			$fromlocal = true;
			//$obj = $data;
			//$data.parse($data);
			var $obj = h5c3.Applet.create($data);
		} else {
			//Create an applet loaded from net
			$fromlocal = false;
			var $obj = h5c3.Applet.create($data);
		}
		
		this._tracker.loaded++;
		this._tracker.loading--;
		
		if (typeof $obj === "object") {
			if (!$fromlocal) 
				h5c3.local.setAppFile($obj.header.name,$obj);
			else 
				if ($obj.header.name in this._history && (typeof this._history[$obj.header.name].src !== 'undefined')) 
					$obj.src = this._history[$obj.header.name].src;
				//if (this._history[$obj.header.name].src) $obj.src = this._history[$obj.header.name].src;
				
			this._tracker.fromConn++;
			this.scanHTML($obj.html);		
			this.scanAnchors($obj.html)
			$result = h5c3.r2wl.app.applets.add($obj.header.name,$obj)
		} else {
			//Remove Applet we just created. Remove from History as well. Display message
			this._tracker.failed++;
			delete this._history[$obj];
			this.remove($obj);
			_DBG_(["Unable to identify applet, discarding.",$data]);
			$result = false;
		}

		this.started = !this._checkAllDone();
		
		return $result;
	},
		
	onError:function(data) {
		return null	
	},
	
	onReady:function() {
		if (this.started) return;
		this.scanHTML();		
		this.scanAnchors();
		this.checkQue();
	}
});
/**
 *
 * @namespace h5c3.CloudApp
 * @class h5c3.CloudApp
 * @augments h5c3.Base
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * <p>
 * 
 * <pre><code>
 * 
 * </code></pre>
 * 
 * </p>
 */
window.h5c3.CloudApp = h5c3.Base.extend('h5c3.CloudApp', { 
	_CLASSNAME: 'CloudApp',
	_CLASSVERSION:'0.0.0'
}, {
	header: null,
	
    /**
     * @property {string} skin
     * @default null
	 * @memberof h5c3.CloudApp
     */
	skin: {
		fg:{ light: "#cccccc", normal: '#808080', dark: "#303030" },
		bg:{ light: "#aaaaaa", normal: "#404040", dark: "#000000" }
	},
	
	colorOverride:false,
	
    /**
	 * @public
	 * @method
	 * @memberof h5c3.CloudApp
	 * @desc
     * </p>
	 * Description of this method
	 * </p>
     */
    init: function ($app) {
        this._super();
		this.header = $app;
		this.prepare();
    },
	
	prepare:function() {
		this.colorOverride = CHK(h5c3.local.getGlobalCfg('colorOverride'),false);
		//Load Skin
		if (this.colorOverride)
			this.skin = CHK(h5c3.local.getGlobalCfg('mySkin'),this.skin);			
		else
			this.skin = CHK(h5c3.local.getAppCfg('skin'),this.skin);			
		
		this.applets = new h5c3.AppletFactory(h5c3.r2wl);				
		this.stylesheet = new h5c3.StyleSheet(this.header.style, h5c3.r2wl);		
		this.layout = new h5c3.Layout(this.header.layout, h5c3.r2wl);		
	},
	
	save:function() {
		h5c3.local.setGlobalCfg('colorOverride',this.colorOverride);
		h5c3.local.setAppCfg('skin',this.skin);
	},
	
	start:function() {
		this.stylesheet.start();
		this.layout.start();
		if (this.applets.onReady) this.applets.onReady();
		window.APP = this; ///Make a global shutcut, i know its messy but look at the rest of this crap LOL
	},

	createWindow:function($applet,$opts) {
		if (ISA($applet)==="applet") {
		}
		if (ISA($opts)!=='object') 
			$opts={id:'window',height:'17.14em',width:'22.85em',title:'Unamed Window',statusbar:'',body:'',color:'clr-dark'};
		var window = DOC.createElement('div');
		window.id=$opts.id;
		window.className = 'r2wl_window '+$opts.color;
		$html = '<div class="r2wl_window.r2wl_titleBar">\n';
		$html += '<div class="r2wl_title left"><span id="windowName">'+$title+'</span></div>\n';
		$html += '<div class="icons right">\n';
		$html += '<i class="icon icon-move uiButton"></i>\n';
		$html += '<i class="icon icon-collapse-alt uiButton"></i>\n';
		$html += '<i class="icon icon-expand-alt uiButton"></i>\n';
		$html += '</div>\n';
		$html += '</div>\n';
		$html += '<div id="windowBody" class="r2wl_body">'+$body+'</div>\n';
		$html += '<div class="r2wl_statusBar">\n';
		$html += '<div id="windowStatusBar">'+$status+'</div>\n';
		$html += '</div>\n';
		window.innerHTML=$html;
	},
	zoomIn:function($el) { 
		return this.stylesheet.zoom($el,1);
	},
	zoomOut:function($el) { 
		return this.stylesheet.zoom($el,0);
	},
	
	onReady:function() {}
});
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class  h5c3.Image
 * 
 * 
 * 
 * A basic image resource. You can use this class to acquire images (loaded from a URI) and then draw them on-screen
 * with effects such as scaling, rotation, compositing and alpha.
 */
h5c3.Image = h5c3.Base.extend('h5c3.Image',
    /** Interface: h5c3.Image */
    {
		_CLASSNAME: 'Image',
		_CLASSVERSION:'0.1.0'
	},
    /** Interface: h5c3.Image.prototype */
    {
        /** Width of the image; set upon loading, can be overridden after load */
        width:0,
        /** Height of the image; set upon loading, can be overridden after load */
        height:0,
        /** Source image element */
        image:null,
        /** Source URI used to load the image */
        src:null,
        /** Resource name */
        name:null,
        /** Whether the image has been loaded yet */
        loaded:false,
        /** Optional function called after this image loads */
        onLoadCallback:null,
        /** Optional function called if this image fails to load */
        onErrorCallback:null,
        /** x-scale to draw the image at */
        scaleX:1,
        /** y-scale to draw the image at */
        scaleY:1,
        /** alpha level to draw the image at (0.5=50% transparent) */
        alpha:1,
        /** Composite operation to draw the image with, e.g. 'lighter' */
        compositeOperation:null,

        /**
         * Constructs a new h5c3.Image. If the h5c3.loader has already started then the image will be
         * immediately loaded, otherwise it will wait for the resource loader to handle the loading.
         * @param  String name Name to give the image resource
         * @param  String src URI for the image
         * @param  {Function} onLoadCallback Function to be called once the image has been loaded
         * @param  {Function} onErrorCallback Function to be called if the image fails to load
         */
        init:function (name, src, onLoadCallback, onErrorCallback)
        {
            this._super();

            this.name = name;
            this.src = h5c3.loader.makeUrl(src);
            this.image = new Image();

            this.onLoadCallback = onLoadCallback;
            this.onErrorCallback = onErrorCallback;

            // setup our own handlers
            this.image.onload = this._onLoad.bind(this);
            this.image.onerror = this._onError.bind(this);
            this.scaleX = 1;
            this.scaleY = 1;
            this.alpha = 1;

            if (h5c3.loader.started) // load now if the loader has already been started
                this.load();
        },

        /**
         * Change the alpha level to draw the image at (0.5 = 50% transparent)
         * @param  Number a Alpha level
         */
        setAlpha:function (a)
        {
            this.alpha = a;
        },

        /**
         * Change the x and/or y scale to draw the image at.
         * @param  Number scaleX x-scale to draw at (2 = 200% wide, -1 = reversed normal on x)
         * @param  Number scaleY y-scale to draw at (2 = 200% high, -1 = reversed normal on y)
         */
        setScale:function (scaleX, scaleY)
        {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
        },

        /**
         * Sets the componsite drawing operation for this image.
         * @param  String o Operation to use (e.g. 'lighter')
         */
        setCompositeOperation:function (o)
        {
            this.compositeOperation = o;
        },

        /**
         * Load an image directly
         * @param  {Function} onLoadCallback Function to be called once the image has been loaded
         * @param  {Function} onErrorCallback Function to be called if the image fails to load
         */
        load:function (onLoadCallback, onErrorCallback)
        {
            this.onLoadCallback = onLoadCallback;
            this.onErrorCallback = onErrorCallback;

            if (this.loaded && onLoadCallback) this.onLoadCallback(this);

            this.image.onload = this._onLoad.bind(this);
            this.image.onerror = this._onError.bind(this);
            this.image.src = this.src;
        },

        /**
         * Force this image to be reloaded
         */
        reload:function ()
        {
            this.loaded = false;
            this.load();
        },

        /**
         * Draw the image onto a context
         * @param  {Context} ctx Context to draw the sprite image on
         * @param  Number sx Source position in the image (or detination x if only 3 params)
         * @param  Number sy Source position in the image (or destination y if only 3 params)
         * @param  Number x x-position destination x position to draw the image at
         * @param  Number y y-position destination y position to draw the image at
         * @param  Number width Width to draw (will clip the image edge)
         * @param  Number height Height to draw (will clip the image edge)
         * @param  Number rotationAngle Angle to draw the image at
         */
        draw:function (ctx, sx, sy, x, y, width, height, rotationAngle)
        {
            // scale testing
            if (this.compositeOperation != null)
                ctx.globalCompositeOperation = this.compositeOperation;

            if (arguments.length == 3)
            {
                ctx.save();
                if (this.alpha != 1)
                    ctx.globalAlpha = this.alpha;
                ctx.translate(sx + (this.width / 2), sy + (this.height / 2));
                ctx.scale(this.scaleX, this.scaleY);
                ctx.drawImage(this.image, 0, 0, this.width, this.height, (-this.width / 2),
                    (-this.height / 2), this.width, this.height);
                ctx.restore();
            }
            else
            {
                if (VLD(rotationAngle))
                {
                    ctx.save();

                    if (this.alpha != 1)
                        ctx.globalAlpha = this.alpha;
                    if (this.scaleX < 0 || this.scaleY < 0)
                    {
                        var yf = this.scaleY == 1 ? 0 : this.scaleY;
                        var xf = this.scaleX == 1 ? 0 : this.scaleX;

                        ctx.translate((x + (width / 2) * xf), (y + (height / 2) * yf));
                    } else
                        ctx.translate(x + (width / 2), y + (height / 2));

                    ctx.rotate(rotationAngle * (Math.PI / 180));
                    ctx.scale(this.scaleX, this.scaleY);
                    ctx.drawImage(this.image, sx, sy, width, height, (-width / 2), (-height / 2), width, height);
                    ctx.restore();
                }
                else
                {
                    ctx.save();

                    if (this.alpha != 1)
                        ctx.globalAlpha = this.alpha;
                    if (this.scaleX < 0 || this.scaleY < 0)
                    {
                        var yf2 = this.scaleY == 1 ? 0 : this.scaleY;
                        var xf2 = this.scaleX == 1 ? 0 : this.scaleX;

                        ctx.translate(x + (-(width / 2) * xf2), y + (-(height / 2) * yf2));
                    } else
                        ctx.translate(x, y);

                    ctx.scale(this.scaleX, this.scaleY);
                    ctx.drawImage(this.image, sx, sy, width, height, 0, 0, width, height);
                    ctx.restore();
                }
            }

            if (this.compositeOperation != null)
                ctx.globalCompositeOperation = 'source-over';
            h5c3.device.elementsDrawn++;

        },

        _onLoad:function ()
        {
            this.loaded = true;

            this.width = this.image.width;
            this.height = this.image.height;

            if (this.onLoadCallback)
                this.onLoadCallback(this);
        },

        _onError:function ()
        {
            if (this.onErrorCallback)
                this.onErrorCallback(this);
        },

        /**
         * Expands the image by adding blank pixels to the bottom and side
         * @param  Number extraWidth Amount of width to add
         * @param  Number extraHeight Amount of height to add
         */
        expand:function (extraWidth, extraHeight)
        {
            this.image.width = this.width + extraWidth;
            this.image.height = this.height + extraHeight;
            this.width = this.image.width;
            this.height = this.image.height;
        },

        resize:function (scaleX, scaleY)
        {
            var sw = this.width * scaleX;
            var sh = this.height * scaleY;

            var startingImage = document.createElement('canvas');
            startingImage.width = this.width;
            startingImage.height = this.height;

            var result = document.createElement('canvas');
            result.width = sw;
            result.height = sh;

            var ctx = result.getContext('2d');
            var resultPixels = ctx.getImageData(0, 0, sw, sh);

            var startingCtx = startingImage.getContext('2d');
            startingCtx.drawImage(this.image, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
            var startingPixels = startingCtx.getImageData(0, 0, this.width, this.height);

            for (var y = 0; y < sh; y++)
            {
                for (var x = 0; x < sw; x++)
                {
                    var i = (Math.floor(y / scaleY) * this.width + Math.floor(x / scaleX)) * 4;
                    var is = (y * sw + x) * 4;
                    for (var j = 0; j < 4; j++)
                        resultPixels.data[is + j] = startingPixels.data[i + j];
                }
            }

            ctx.putImageData(resultPixels, 0, 0);
            this.image = result;
            return this;
        }
    });

// todo: this should be derived from image (or at least a common base -- merge things like scaling factor api)
h5c3.CanvasImage = h5c3.Base.extend('h5c3.CanvasImage', {},
    {
        width:0,
        height:0,
        canvas:null,
        loaded:true,
        scaleX:1,
        scaleY:1,

        init:function (canvas)
        {
            this.canvas = canvas;
            this.width = canvas.width;
            this.height = canvas.height;
        },

        draw:function (ctx, sx, sy, x, y, width, height)
        {
            if (width == undefined || height == undefined || width == 0 || height == 0)
                ctx.drawImage(this.canvas, sx, sy);
            else
                ctx.drawImage(this.canvas, sx, sy, width, height, x * this.scaleX, y * this.scaleY,
                    width * this.scaleX, height * this.scaleY);
        },

        setScale:function (scaleX, scaleY)
        {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
        }

    });


h5c3.ImageTools = h5c3.Base.extend('h5c3.ImageTools',
    {
        /**
         * Rotates an image by the given number of directions
         * @param  image Source image
         * @param  w Width of the image
         * @param  h Height of the image
         * @param  directions Number of directions you want back
         * @return {h5c3.CanvasImage} A new h5c3.CanvasImage with the rotations
         */
        rotate:function (image, w, h, directions)
        {
            // create an destination canvas big enough
            var resultCanvas = document.createElement('canvas');
            resultCanvas.width = w * directions;
            resultCanvas.height = h;

            var ctx = resultCanvas.getContext('2d');

            // find center of the source image
            //var cx = w / 2;
            //var cy = h / 2;

            for (var d = 0; d < directions; d++)
            {
                ctx.save();
                ctx.translate(d * w + (w / 2), h / 2);
                ctx.rotate(((360 / directions) * d) * (Math.PI / 180));
                ctx.drawImage(image, -(w / 2), -(h / 2));
                ctx.restore();
            }

            return new h5c3.CanvasImage(resultCanvas);
        }
    },
    {});/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class  h5c3.Sound
 * 
 * 
 * 
 * A sound resource can be loaded from a URI and played, including support for managing multichannel sound
 * (playing multiple sounds at once) and different formats used by different browsers.
 * 
 * In order to support all modern browsers, sounds need to be provided in both 'ogg' and 'mp3' formats. This is
 * becuase IE supports mp3 (but not ogg), chrome supports ogg and mp3, but safari and firefox only supports ogg. You
 * will need to create sound files into both ogg and mp3 to support all browsers.
 * 
 * To play a sound, you first need to load it from a URI:
 * 
 * // check if sound is enabled
 * if (h5c3.device.soundEnabled)
 * {
 *    // add the sound to the resource loader
 *    h5c3.loader.add(
 *       // construct a new sound named shotgun, loading formats for
 *       // ogg and mp3 (shotgun.mp3 and shotgun.ogg)
 *       // and setup to play up to 5 of these sounds simultaneously
 *       new h5c3.Sound('shotgun', 'sounds/shotgun', ['ogg', 'mp3'], 5));
 * }
 * (end)
 * 
 * Once you have the sound loaded you can play it:
 * 
 * // grab the sound resource from the resource loader
 * var shotgunSound = h5c3.loader.get('shotgun').resource;
 * // play the sound (without looping)
 * shotgunSound.play(false);
 * (end)
 * 
 * If the sound is looping, or it's a long sound you can stop it:
 * 
 * shotgunSound.stop();
 * (end)
 * You can adjust the volume of a sound:
 * 
 * // set the volume to 50%
 * shotgunSound.setVolume(0.5);
 * (end)
 * 
 * You can also change the starting position of sound or music using setPlayPosition:
 * 
 * // start half way through
 * shotgunSound.setPlayPosition( shotgunSound.getDuration() / 2 );
 * (end)
 */
h5c3.Sound = h5c3.Base.extend('h5c3.Sound', {
	_CLASSNAME: 'SoundFactory',
	_CLASSVERSION:'0.1.2'
},{
	/** Array of the sound elements -- multichannel sound requires multiple element copies to play */
	sounds: [],
	/** Source URI for the sound resource */
	src:null,
	/** String name for the sound */
	name: null,
	/** Number of sounds loaded */
	numLoaded: 0,
	/** Whether the sound is loaded */
	loaded:false,
	/** Whether an error occured loading the sound */
	errored:false,
	/** Number of channels for the sound. No more than this number can be played at once */
	channels:1,
	/** Optional call back once the sound is loaded */
	onLoadCallback:null,
	/** Optional call back if the sound errors whilst loading */
	onErrorCallback:null,

	/**
	 * Construct a new sound, if the resource loader has already start the sound will be immediately loaded.
	 * @param  String name Resource name (tag) you want to use
	 * @param  String src URI for the sound
	 * @param  Number channels Number of channels this sound can play at once
	 * @param  {Function} [onLoadCallback] Function to be called once the sound has been loaded (including all channels)
	 * @param  {Function} [onErrorCallback] Function to be called if the sound fails to load (on first error)
	 */
	init:function (name, src, formats, channels, onLoadCallback, onErrorCallback)
	{
		this._super();
		this.name = name;
		this.channels = channels;

		// append an extension to the src attribute that matches the format with what the device can play
		var canplay = false;
		for (var i=0; i < formats.length; i++)
		{
			if (h5c3.device.canPlay(formats[i]))
			{
				this.src = h5c3.loader.makeUrl(src + '.' + formats[i]);
				canplay = true;
				break; // we set the src based on the first type we find (in the order they are provided)
			}
		}

		if (canplay)
		{
			if (h5c3.loader.started) // load now if the loader has already been started
				this.load(onLoadCallback, onErrorCallback);
		} else
			this.errored = true;
		_DBG_('Initializaed.',this.Class);
	},

	/**
	 * Pauses the sound (on all channels)
	 */
	pause: function()
	{
		if (!this.canPlay()) return;
		for (var i=0, len=this.sounds.length; i < len; i++)
			this.sounds[i].pause();
		_DBG_("Paused.",this.Class);
	},

	/**
	 * Stop playing a sound (on all channels) -- actually just a synonym for pause
	 */
	stop: function()
	{
		if (!this.canPlay()) return;
		this.pause();
	},

	/**
	 * Volume to play the sound at for ALL channels
	 * @param  Number volume Volume as a range from 0 to 1 (0.5 is half volume)
	 */
	setVolume: function(volume)
	{
		if (!this.canPlay()) return;
		for (var i=0, len=this.sounds.length; i < len; i++)
			this.sounds[i].volume = volume;
		_DBG_("Volume set to "+volume+" for all channels.",this.Class);
	},

	/**
	 * Volume to play the sound at for ALL channels
	 * @param  Boolean loop Repeat until stopped?
	 */
	setLoop: function(loop)
	{
		if (!this.canPlay()) return;
		for (var i=0, len=this.sounds.length; i < len; i++)
			this.sounds[i].loop = loop;
	},
	
	/**
	 * Gets the duration of the sound in seconds
	 * @return Number The duration in seconds
	 */
	getDuration: function()
	{
		if (!this.canPlay()) return -1;
		return this.sounds[0].duration;
	},

	/**
	 * Sets the playback rate of the sound where 0 is not playing and 2 is double speed. Negative values cause
	 * the sound to play backwards.
	 * WARNING: Only currently supported by Safari and Chrome.
	 * @param  Number r The speed to play the sound at
	 */
	setPlaybackRate:function (r)
	{
		if (!this.canPlay()) return;
		for (var i = 0, len = this.sounds.length; i < len; i++)
			this.sounds[i].playbackRate = r;
	},

	/**
	 * Start playing the sound at the specified time (instead of 0)
	 * @param  Number time time (in seconds to start at)
	 */
	setPlayPosition: function(time)
	{
		if (!this.canPlay()) return;
		for (var i=0, len=this.sounds.length; i < len; i++)
			this.sounds[i].currentTime = time;
	},

	/**
	 * Load a sound. If the game hasn't started then the sound resource
	 * will be added to the resource manager's queue.
	 * @param  {Function} onLoadCallback function to call once the sound is loaded
	 * @param  {Function} onLoadCallback function to call if the sound errors
	 */
	load:function (onLoadCallback, onErrorCallback)
	{
		// user customized callbacks
		this.onLoadCallback = onLoadCallback;
		this.onErrorCallback = onErrorCallback;

		if (this.loaded && onLoadCallback)
		{
			this.onLoadCallback(this);
			return;
		}
		// load up multiple copies of the sound, one for each channel
		for (var i=0; i < this.channels; i++)
		{
			var n = new Audio();
			n.preload = 'auto';

			// setup event handlers for this class -- we'll call the callbacks from there
			n.addEventListener("canplaythrough", this.onLoad.bind(this), false);
			n.addEventListener("error", this.onError.bind(this), false);
			n.onerror = this.onError.bind(this);
			n.onload = this.onLoad.bind(this);
			n.src = this.src;
			n.load();
			this.sounds.push(n);

			if (h5c3.device.isAppMobi)
				// force an onload for appmodi -- since it wont create one and the load is almost instant
				this.onLoad(null);
		}
	},

	/**
	 * Force this sound to be reloaded
	 */
	reload:function ()
	{
		this.loaded = false;
		this.errored = false;
		this.load();
	},

	onLoad:function (ev)
	{
		this.numLoaded++;
		_DBG_('Loaded ('+this.numLoaded+')',this.Class);

		// remove the event listener so we don't get this happening multiple times
		if (!h5c3.device.isAppMobi)
			ev.target.removeEventListener("canplaythrough", this.onLoad.bind(this), false);

		if (this.numLoaded == this.channels)
		{
			this.loaded = true;
			this.errored = false;
			if (this.onLoadCallback)
				this.onLoadCallback(this);
		}
	},

	onError:function ()
	{
		_DBG_('Error on load.',this.Class);
		this.errored = true;
		this.loaded = false;
		if (this.onErrorCallback)
			this.onErrorCallback(this);
	},

	/**
	 * Plays a sound
	 * @param  Boolean loop True if you want the sound to just keep looking.
	 * @return Object Sound element that was played
	 */
	play:function(loop)
	{
		if (!this.canPlay()) return null;

		// find a free channel and play the sound (if there is one free)
		for (var i=0, len=this.sounds.length; i < len; i++)
		{
			if (this.sounds[i].paused || this.sounds[i].ended)
			{
				if (loop)
					this.sounds[i].loop = true;
				this.sounds[i].play();
				return this.sounds[i];
			}
		}

		// no sounds were free, so we just do nothing
		this.warn(this.name + ' - all channels are in use');
		return null;
	},

	/**
	 * @return Boolean true if the sound can be played
	 */
	canPlay: function()
	{
		return (this.loaded && h5c3.device.soundEnabled && !this.errored);
	}
});

/**
 * @class
 * SoundFactory -- for creating sounds (mostly just an interface class you extend from to create an sound factory).
 */
h5c3.SoundFactory = h5c3.Factory.extend('h5c3.SoundFactory', {
	_CLASSNAME: 'SoundFactory',
	_CLASSVERSION:'0.1.2'
},{
	init:function() 
	{
		this._super('Sound');
	},
	
	/**
	 * Called by the sound loader
	 * @param  String name String Name of the sound to create
	 * @param  Object options Properties assigned to the object
	 */
	create:function(name,options)
	{
		CHK(options,{volume:0.5,loop:false});
		var obj = h5c3.loader.get(name).resource;
		obj.setVolume(options.volume);
		obj.setLoop(options.loop);
		return this.add(name,obj);
	},
	
	play:function(name,options)
	{
		this.use(name,options).play(options.loop);
	}		
});
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */
/**
 * @class  h5c3.DataResource
 * 
 * @description 
 * A generic resource you can load data, such as JSON, XML or config files from a URL, just like an image or sound file.
 * 
 * To load a resource, use the h5c3.Loader to add a resource:
 * 
 * >	h5c3.loader.add(new h5c3.DataResource('level1', 'data/level1.tmx'));
 * 
 * Once you have the resource loaded you can access the contents of the resource using the data member:
 * 
 * >	var xmlData = h5c3.loader.get('level1').resource.data;
 * 
 * You can optionally provide a function to be called when the resource has finished loading or has an error.
 * 
 * (start code)
 * function onLevelDataLoaded(dataResource)
 * {
 *    // dataResource.data
 * }
 * h5c3.loader.add(new h5c3.DataResource('level1', 'data/level1.tmx', onLevelDataLoaded));
 * (end)
 */
h5c3.DataResource = h5c3.Base.extend('h5c3.DataResource',
{
	_CLASSNAME: 'DataResource',
	_CLASSVERSION:'0.1.0'
},
{
	/** Data resource that has been loaded */
	data:null,
	/** HTTP request object used to load the data */
	request:null,
	/** src URL */
	src:null,
	/** Short name for this resource */
	name: null,
	/** boolean indicating whether the resource has been loaded yet */
	loaded:false,
	/** current callback when the resource has been loaded */
	onLoadCallback:null,
	/** current callback if an error occurs whilst loading the resource */
	onErrorCallback:null,

	/**
	 * @constructor init(name, src, onLoadCallback, onErrorCallback)
	 *
	 * @return none
	 * Loads data from a remote (URI) resource.
	 *
	 * @param  
	 *	String name Name to give the resource
	 * 	String src URI for the data
	 * 	Function 	onLoadCallback		Function to be called once the resource has been loaded
	 * 	Function 	onErrorCallback		Function to be called if the resource fails to load
	 *
	 * @return
	 * None
	 */
	init:function (name, src, onLoadCallback, onErrorCallback)
	{
		this._super();
		this.src = h5c3.loader.makeUrl(src);
		this.name = name;
		this.onLoadCallback = onLoadCallback;
		this.onErrorCallback = onErrorCallback;
		this.request = new XMLHttpRequest();
		this.request.onreadystatechange = this.onReadyStateChange.bind(this);
		this.request.onload = this.onReadyStateChange.bind(this);
		this.request.onloadend = this.onReadyStateChange.bind(this);
		this.load();
	},

	/**
	 * @method load(onLoadCallback, onErrorCallback)
	 *
	 * @description
	 * Triggers an immediate load of the resource. Use only if you're manually loading a resource, otherwise
	 * the h5c3.Loader will automatically call load when it starts.
	 *
	 * @param  
	 *	Function	onLoadCallback		Optional function called when the resource has finished loading
	 * 	Function	onErrorCallback		Optional function called if the resource fails to load
	 *
	 * @return
	 * None
	 */
	load:function (onLoadCallback, onErrorCallback)
	{
		this.onLoadCallback = onLoadCallback;
		this.onErrorCallback = onErrorCallback;

		try {
			this.request.open('get', this.src);
			this.request.send(null);
		} catch (err) {
		} finally {
		}
	},

    /**
	 * @method reload()
	 *
	 * @description
	 * Force the reloading of a resource (by marking it not loaded and calling load
     * 
	 * @param
	 * None
	 *
	 * @return 
	 * None
     */	
	reload:function ()
	{
		this.loaded = false;
		this.load();
	},

    /**
	 * @method onReadyStateChange()
	 *
	 * @description
	 * Called when the resource is loaded/ready. Generally this is used internally, and you should use the
	 * onLoadCallback function optionally pass to the load method or constructor
     * 
	 * @param
	 * None
	 *
	 * @return 
	 * None
     */	
	onReadyStateChange:function()
	{
		if (this.loaded) {
			return;
		}

		if (this.request.readyState === 4)
		{
			if (this.request.status === 200)
			{
				this.loaded = true;

				this.data = this.request.responseText;

				if (this.onLoadCallback) {
					this.onLoadCallback(this);
				}
			} else
			if (this.request.status === 404)
			{
				this.warn('resource ' + this.src + ' error ' + this.request.status);
				if (this.onErrorCallback) {
					this.onErrorCallback(this);
				}
			}
		}
	}
});
/**
 * @class  h5c3.Resources
 *
 * @descsription 
 * Loading of resources is handled internally. DO NOT CALL THESE FUNCTIONS DIRECTLY.
 */
h5c3.Resources = h5c3.Base.extend('h5c3.Resources', {
	_CLASSNAME: 'Resources',
	_CLASSVERSION:'0.3.3'
},{

    /**
     * @property Object 	resources	
	 * @descsription Holds all resources for the application
     */
    resources: null,

    /**
	 * @constructor Initialization method. 
	 * @descsription Adds Publisher and Framework resources to loading Que. Then processes the Config to get all resources for loading.
     * 
	 * @return none
     */
    init: function () {
        this._super();
        this.loadResources();		
    },

    /**
	 * @method loadResources()
	 * @descsription This method parses the embeded XML resource data into an array
	 * @return none
     */
    loadResources: function () {
       _DBG_("Queing internal resources.",this.Class);
        /** Required Engine images - Loaded automatically **/
        //h5c3.device.loader.add(new h5c3.Image('publisher', 'http://h5c3.i2tmlabs.com/img/logo-i2tmlabs-hd.png'));
        //h5c3.device.loader.add(new h5c3.Image('h5c3', 'http://h5c3.i2tmlabs.com/img/logo-h5c3-hd.png'));
        //h5c3.device.loader.add(new h5c3.Image('btnDebug', 'http://h5c3.i2tmlabs.com/img/buttons_debug.png'));
        //h5c3.device.loader.add(new h5c3.Image('touchpad', 'http://h5c3.i2tmlabs.com/img/touchpad_buttons.png'));
        /** Required Engine sound - Loaded automatically **/
        //h5c3.device.loader.add(new h5c3.Sound('i2tm', 'http://h5c3.i2tmlabs.com/snd/i2tm', ['ogg'], 1));
        this.loadGraphics();
        this.loadAudio();
    },

    /**
	 * @method loadGraphics() 
	 * @descsription Parse array and que all graphics for loading
	 * @return none
     */
    loadGraphics: function () {
		if (VLD(h5c3.config.resources)) {
			_DBG_("Queing images resources.",this.Class);
			var i, data = h5c3.config.resources.images;

			for (i = 0; i < data.length; ++i) {
				h5c3.loader.add(new h5c3.Image(data[i].name, data[i].file));
			}
		} 
		else _DBG_("No graphic resources to que. (Did you forget to add them to the config?)",this.Class);
    },

    /**
	 * @method loadAudio()
	 * @descsription Parse array and que all audio for loading
	 * @return none
     */
    loadAudio: function () {
		if (VLD(h5c3.config.resources)) {
			_DBG_("Queing audio resources.",this.Class);
			var 
				i, f1, f2, data = h5c3.config.resources.sounds;

			for (i = 0; i < data.length; i++) {
				if (data[i].ogg === "true") {
					f1 = "ogg";
				} else {
					f1 = "";
				}
				if (data[i].mp3 === "true") {
					f2 = "mp3";
				} else {
					f2 = "";
				}
				h5c3.loader.add(new h5c3.Sound(data[i].name, data[i].file, [f1, f2], data[i].channels));
			}
		} 
		else _DBG_("No audio resources to que. (Did you forget to add them to the config?)",this.Class);
    }
});
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/*******************************************************************************************
 * Enumeration: h5c3.SCREEN_CELLS
 *
 * Class used to provide better access and easy scaling/placement of entitys using Layout
 * (start code)
 *  GRIDX1:		0x0000, 	0000000 - The screen is the cell
 *  GRIDX2:		0x0001, 	0000001 - The screen is broke up into 2x2 cells
 *  GRIDX3:		0x0002, 	0000010 - The screen is broke up into 3x3 cells
 *  GRIDX4:		0x0004, 	0000100 - The screen is broke up into 4x4 cells
 *  GRIDX5:		0x0008  	0001000 - The screen is broke up into 5x5 cells
 * (end)
 *
 *******************************************************************************************/	
h5c3.SCREEN_CELLS =
{
    GRIDX1:		0x0000, // 0000000 - The screen is the cell
    GRIDX2:		0x0001, // 0000001 - The screen is broke up into 2x2 cells
    GRIDX3:		0x0002, // 0000010 - The screen is broke up into 3x3 cells
    GRIDX4:		0x0004, // 0000100 - The screen is broke up into 4x4 cells
    GRIDX5:		0x0008  // 0001000 - The screen is broke up into 5x5 cells
};

/**
 * @@class  h5c3.Device
 * 
 * @description
 * h5c3.Device is the primary interface between your game and the underlying hardware. It's a singleton instance
 * that will be constructed automatically and is globally accessible at all times as h5c3.device
 * 
 * h5c3.device will automatically be setup once h5c3.JSLoader has completed loading all required javascipt through a call
 * to h5c3.device.boot passing in the Id of the canvas element for your game as well as the name of the game class
 * which h5c3.device will then dynamically construct. Typically you do not need to construct your own h5c3.Device, h5c3.start
 * will take care of it for you.
 */
h5c3.Device = h5c3.Base.extend('h5c3.Device',
    { 
		_CLASSNAME: 'Device',
		_CLASSVERSION:'0.1.0'
	},
    {	
		/** @property device		Game core device object */
		device:h5c3.Device,					
		
		/** @property media			object- browser information */
		media:h5c3.Media,					
        
		/** @property page			h5c3.Page page object */
		page:null,								
        
		/** @property loader		primary resource loader */
		loader:null,							
        
		/** h5c3.Input handler global instance */
		input:null,								
		
		/** Holds a AccuTimer object used for input timing. Default is 6 FPS */
		inputTimer:null,						
		
		/** Holds a AccuTimer object used for process timing. Default is 30 FPS */
		processTimer:null,						
        
		/** used to provide a DOM XML parser */
		xmlParser:null,							
		
		/** hold the state of the application resources **/
		resourcesLoaded:false,					
        
		/** TRUE if the engine is initialized. Different than running */
		started:false,							
        
		/** whether the device is running */
		running:true,							
        
		/** current requested or desired frame rate. */
		fps:30,
        
		/** last render frame rate */
		currentFPS:0,
		
		/** Contains the current average FPS */
		averageFPS:0,							
		
		/** used by render() to calulate the average FPS */		
		totalFPS:0,								
		
		/** used by render() to calulate the average FPS */
		frameCount:0,							
        
		/** used to hold the total number of milliseconds between animation frames */
		tick:0,									
        
		/** Used to define if we are using  pooling or not */
		enablePooling:true,						
        
		/** whether sound is enabled */
		soundEnabled:true,						
        
		/** number of elements drawn in the last render */
		elementsDrawn:0,						
        
		/** how long in ms the last process render took */
		lastProcessMS:0,						
        
		/** how long in ms the last draw render took */
		lastDrawMS:0,							
        
		/** amount of time the last render took in ms */
		elapsed:0,								
        
		/** time the last frame render was started */
		lastFrame:0,							
        
		/** the time now */
		now:Date.now(),							
        
		/** Used by render method for timing */
        startTime:0,							
        
		/** h5c3.Rect of the current screen dimensions */
		screen:null,							
		
		/** pixel ratio of the screen -- typically 1 unless on a retina display where it's 2 */
		pixelRatio:h5c3.Device.pixelRatio,	
        
		/** is this device an iPhone */
		isiPhone:h5c3.Device.isiPhone,		
		
		/** is this device an iPhone 4 */
		isiPhone4:h5c3.Device.isiPhone4,	
        
		/** is this device an iPad*/
		isiPad:h5c3.Device.isiPad,			
        
		/** is this device an Android*/
		isAndroid:h5c3.Device.isAndroid,	
        
		/** is this a touch device */
		isTouch:h5c3.Device.isTouch,		
		
		/** Is touchpad enbale or not? */
		useTouch:h5c3.Device.useTouch,		
        
		/** is this an ios device */
		isiOS: h5c3.Device.isiOS,			
        
		/** is this an iPod device */
		isiPod: h5c3.Device.isiPod,			
        
		/** whether the debug panel should be updated/drawn */
		showDebug:h5c3.devMode,					
        
		/** whether the game is running in development mode; false = production */
		devMode: h5c3.devMode,					
		
		/** Used by layout for determining how many region cells to break canvas into */
		gameScreenCells:1,						

		/**
		 * @constructor init()
		 *
		 * @param
		 * None
		 *
		 * @return 
		 * None
		 */	
		init:function() {
			this._super();
			_DBG_("Initialization started.",this.Class);
			this.loader = h5c3.loader;
            this.input = new h5c3.Input();
		},
		
		/**
		 * @method
		 *
         * Setup the system interface for the game. Typically this will just be automatically called
         * by the game object and you don't need to worry about it.
		 * 
		 * @param
		 * None
		 *
		 * @return 
		 * None
		 */	
        boot:function ()
        {
			_DBG_("boot initiated.",this.Class);
			this.page = new h5c3.Page(this,'H5C3 Unanamed App');
			this.game = this.page.game; //Simple helper / shorten
            this.tick = 1000 / this.fps;
			this.requestAnimFrame = h5c3.Device.requestAnimFrame;
            this.onReady();
			_DBG_("boot complete.",this.Class);
        }, //end boot()
						
		/**
		 * @method 
		 *
		 * Initialize the default layout to a 1x1 grid
		 * 
		 * @param
		 * None
		 *
		 * @return 
		 * None
		 */	
		initLayout:function() 
		{
			this.layout = {
				cells: h5c3.SCREEN_CELLS.GRIDX1
			};
		}, //end initLayout()
				
		/**
		 * @method
		 *
         * Indicates whether a sound format is playable on the current device
		 *
         * @param  
		 *	String 	format 	Sound format to test: 'mp3', 'ogg' or 'wav'
		 *
         * @return 
		 *	Boolean		True is the format can be played
		 */	        canPlay: function(format)
        {
            return h5c3.Device.canPlay(format);
        }, //end canPlay()
				
		/**
         * Automatically called once the device is ready
		 */	
        onReady:function ()
        {
			_DBG_("Dispatching Ready",this.Class);
            if (this.started) { return; }// check we haven't already started
            //this.onResize();
            this.page.onReady();
            this.input._onReady();
			/** Everything is loaded and ready at this point **/
            this.lastFrame = Date.now();
            // start the central game timer
			window.requestAnimationFrame(this.render.bind(this));
			this.handleTimers(true);
            this.started = true;
        }, //end onReady()
			
		/**
		 * @method
         * @desc Automatically called once the device is exiting
		 */	
		onExit:function () 
		{
			this.handleTimers(false);				//Turn off Timers
			window.cancelAnimationFrame(true);		//Cancel Animation frame binding
			_DBG_("Animation frame binding canceled.",this.Class);
		},
		
		/**
		 * @method
		 *
		 * The engine uses timers to monitor and adjust timing on Rendering and Input. This method sets up and starts the timers.
		 * 
		 * @param
		 * Boolean	State	Start/Stop timers
		 *
		 * @return 
		 * None
		 */	
		handleTimers:function(state) 
		{
			if (state===true) {
				_DBG_("Loader timer started.",this.Class);
				this.inputTimer = new h5c3.AccuTimer(0, 6, 
					function(steps,count,fps)
					{
					  h5c3.device.input.process();
					}
					,function() {_DBG_("Loader Timer terminated.",this.Class);}
				);

				//The processes run @ 30FPS - Seperate from the Rendering
				this.processTimer = new h5c3.AccuTimer(0, 30, 
					function(steps,count,fps)
					{
						h5c3.device.running = !h5c3.device.page.game.obj.process();
					}
					,function() {_DBG_("Process Timer terminated.",this.Class);}
				);
			} else {
				_DBG_("Stop all timers.",this.Class);
				this.inputTimer = null;
				this.processTimer = null;
			}
		},
		
		/**
		 * @method
		 *
         * Called once per game cycle
		 * 
		 * @param
		 * Number	time	system time in ms
		 *
		 * @return 
		 * None
		 */	
        render:function (time)
        {
            if (this.running !== false)
            {
				try {
					this.now = this.startTime = Date.now();
					this.elapsed = this.now - this.lastFrame;
					this.lastDrawMS = 0;
					this.elementsDrawn = 0;
					this.currentFPS = 1000.0 / this.elapsed;
					this.totalFPS = this.totalFPS +this.currentFPS;
					this.frameCount++;
					this.lastProcessMS = (Date.now() - this.startTime) - this.lastDrawMS;
					this.lastFrame = this.now;
					this.page.render();
					window.requestAnimationFrame(this.render.bind(this));
				} catch (e) {	
					AST(null,printStackTrace(e));
				}
            } else {
				//We are exiting the game
				
			}
        }, //end render()

        /**
		 * @method
		 *
         * Test whether a given rectangle overlaps any part of the device screen
		 *
         * @param  
		 *	Number 	x 	x position of the top left of the rectangle to test
         * 	Number 	y 	y position of the top left of the rectangle to test
         * 	Number 	w 	width of the rectangle
         * 	Number 	h 	height of the rectangle
         * @return 
		 *	Boolean 	true is it's on screen
         */
        isOnScreen:function (x, y, w, h)
        {
            return h5c3.Math.isRectColliding(x, y, w, h, 0, 0, this.game.dim.w, this.game.dim.h);
        } //end isOnScreen()						
    });
	
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * @class  h5c3.Input
 * 
 * 
 * 
 * This class provides a way of binding and reacting to input in a convenient and device independent way. The
 * engine will automatically construct a single, global input class which is accessible via the global h5c3.device.input.
 * 
 * There are two kinds of inputs that can be handled, actions and states. An action is a single event that occurs
 * as a reaction to an input such as clicking the mouse or pressing a key. Typical actions are having a player jump, or
 * open a door. States are when an input is in an on/off state, such as turning a ship or firing a weapon.
 * 
 * <h5>Actions</h5>
 * Reacting to action involves 'binding' an action, such as 'open door' or 'jump' to an object in the game which will
 * trigger a call to the object's onAction method.
 * 
 * MyGame = h5c3.Game('MyGame',
 * {},
 * {
 *    onLoaded:function (loaded, errored)
 *    {
 *       // bind the jump action to the space key
 *       this.input.bindAction(this, 'jump', 'SPACE');
 *       // as well as a mouse click
 *       this.input.bindAction(this, 'jump', 'MOUSE_LEFT_CLICK');
 *    },
 *
 *    // this onAction method will be called when an action relating to
 *    // this object is triggered
 *    onAction:function(actionName)
 *    {
 *       if (actionName ==== 'jump')
 *       {
 *          // player.jump!
 *       }
 *    }
 *
 * });
 * (end)
 * 
 * <h5>States</h5>
 * States are used to indicate when a key or input control is currently active or not. Typically a state is used
 * when you want to react for the entire time an input is engaged, such as holding down a key to accelerate a car.
 * 
 * To use an input state, bind it to an object the same way you do an action. You will then need to separately check
 * if the state is on at the appropriate time for your game. Most commonly this is done in a process function. See
 * the <a href='h5c3.Game'>game</a>, <a href='h5c3.Layer'>layer</a> or <a href='h5c3.Scene'>scene</a> classes for more
 * information on overriding a process function.
 * 
 * // bind the state to an input and an object
 * this.input.bindState(this, 'moving left', 'LEFT');
 *
 * // check for the state being active in the game, layer or scene process
 * process:function ()
 * {
 *    if (h5c3.device.input.isInputState(this, 'moving left'))
 *       // move the player left
 * }
 * (end)
 * You can see an example of both input actions and states in the Asteroids sample game.
 * 
 * Rather than using this class directly, you can also use the <a href='h5c3.components.Input'>input component</a>
 * and <a href='h5c3.systems.Input'>system</a> which lets you bind input to an entity as a component.
 */
h5c3.Input = h5c3.Base.extend('h5c3.Input',
    /** Interface: h5c3.Input */
    {
		_CLASSNAME: 'Input',
		_CLASSVERSION:'0.1.0',
        _eventPos: null, // cached for speed

        /**
         * Extracts the position from an event (in a cross-browser way),and then sets the passed in pos
         * @param  Object e Event to extract the position from
         * @param  {h5c3.Point} [pos] Position object to set. Leave out to have a new (pooled) point returned
         */
        getEventPosition:function(e, pos)
        {
            if (this._eventPos === null) {
                this._eventPos = h5c3.Point.create(0,0);
			}

            var r = pos;
            if (!VLD(pos)) {
                r = this._eventPos;
			}

            if (e.pageX || e.pageY)
            {
                r.x = e.pageX;
                r.y = e.pageY;
            } else
            {
                r.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                r.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            return r;
        }

    },
    /** Interface: h5c3.Input.prototype */
    {
        /** Current state bindings */
        stateBindings:null,
        /** Currently active states */
        states:null,
        /** Action bindings */
        actionBindings:null,
        /** Current position of the mouse on-screen, updated continuously */
        mousePos: null,
        /** indicates if the left mouse button is currently down */
        mouseLeftButtonDown: false,
        /** indicates if the right mouse button is currently down */
        mouseRightButtonDown: false,
        /** indicates if the middle mouse button is currently down */
        mouseMiddleButtonDown: false,

        init:function ()
        {
            this._super();
            this.stateBindings = new h5c3.Hashtable();
            this.states = new h5c3.Hashtable();
            this.actionBindings = new h5c3.Hashtable();
            this.mousePos = h5c3.Point.create(0,0);
        },

        /**
         * Binds an input state to an object, such as 'turning left' or 'firing' to an input code.
         * You can bind an input to any object, however typically it's to a layer, scene or game. The input will not
         * trigger if the object is not presently active.
         * If you specify a UIElement (optional), the state is only triggered if the event occurs inside
         * the bounds of the element (typically a positional event like a touch start or mouse move)
         * @param  Object obj An object to bind the state to
         * @param  String stateName The name of the state, e.g. "turning left"
         * @param  String input The name of the input, i.e. 'LEFT' (see h5c3.InputType)
         * @param  Object [uiTarget] Optional UI object to bind the input to
         */
        bindState:function (obj, stateName, input, uiTarget)
        {
            if (obj.uniqueId === null) {
                throw "Oops, you can't bind a state to an object if it doesn't have a uniqueId function";
			}

            input = input.toUpperCase();
            // There can be many bindings associated with a particular input, so we see
            // if there is already one, and then append this to the array, otherwise
            // we create the array
            var binding = { stateName:stateName, object:obj, input:input, state:{on:false, event:null}, uiTarget:uiTarget },
				bindingSet = this.stateBindings.get(input);
            if (bindingSet === null) {
                this.stateBindings.put(input, [ binding ]);
			} else {
                // otherwise append a new binding
                bindingSet.push(binding);
			}
            // now setup a state for this object/input combination
            this.states.put(obj.uniqueId + '\\\\' + stateName, {on: false, event: null});

            // if this is a positional type binding, add it to the positional tracking array
            if (h5c3.InputType.isPositional(h5c3.InputType.getCode(input))) {
                this._positionals.push(binding);
			}
        },


        /**
         * Clears any on states related to an object.
         * @param  Object obj The object to clear states for
         */
        clearStates:function (obj)
        {
            var b,i,binding,state,bindingSet,bindings = this.stateBindings.entries();

            for (b=0; b < bindings.length; b++)
            {
                bindingSet = bindings[b];
                for (i = 0; i < bindingSet.length; i++)
                {
                    binding = bindingSet[i];
                    if (binding.object === obj)
                    {
                        state = this.states.get(next.object.uniqueId + '\\\\' + next.stateName);
                        state.on = false;
                        state.event = null;
                        if (h5c3.InputType.isPositional(binding.input)) {
                            h5c3.tools.arrayRemove(this._positionals, binding);
						}
                    }
                }
            }
        },

        /**
         * Returns true if the named state is currently active. If you need anything more than the state boolean
         * use getInputState, which includes the actual event.
         * @param  Object obj Object to check the binding against
         * @param  String stateName A string representing a previously setup state, i.e. 'turning left'
         * @return  Boolean true if the state is currently on (such as a key being down)
         */
        isInputState:function (obj, stateName)
        {
            // lookup is very slow; have to find the state for a certain stateName and object
            // TODO: oops this is creating strings for every check (usually every frame)-- get rid of it
            // add a state property to the bound object and update it when the state changes
            var state = this.states.get(obj.uniqueId + '\\\\' + stateName);
            if (state === null) { throw 'Ooops, unknown state ' + stateName; }
            return state.on;
        },

        /**
         * Gets the present input state object (which includes the event data).
         * @param  Object obj Object to check against (such as a layer, scene or game)
         * @param  String stateName Name of the state to check for
         * @return Object state object containing the state.state and state.event data
         */
        getInputState:function (obj, stateName)
        {
            return this.states.get(obj.uniqueId + '\\\\' + stateName);
        },

        /**
         * Binds an input event to an action and object; e.g. bindAction(playerShip, 'fire', 'CTRL')
         * will trigger an action callback on the playerShip entity when the CTRL key is pressed down.
         * You can bind an input to a layer, scene or entity. The input will not trigger if the object
         * is not presently active.
         * 
         * For positional events (such as a mouse or touch input) the action will only fire if the position
         * of the event is within the bounds of the object (based on a call to getScreenRect). You can optionally
         * provide a uiTarget object to provide a different bounding rectangle. If the object provides no getScreenRect
         * method, then no bounding check will be carried out.
         * 
         * For (start code)
         * var menuLayer = new Layer();                     // a menu layer
         * var menuOption = new TextElement('New Game');    // a menu item
         *
         * // trigger the 'new game' action for the menuLayer, when a mouse click occurs within the menuOption element
         * h5c3.device.input.bindAction(menuLayer, 'new game', 'MOUSE_LEFT_BUTTON', menuOption);
         * (end)
         * Note: If the uiTarget element is not provided, the bounding rectangle of the obj is used (as long as
         * the object provides a getScreenRect() method, otherwise there is no checking
         *
         * @param  {h5c3.Base} obj The entity, layer or scene to bind this action to (must implement onAction)
         * @param  String actionName The name of the action, e.g. 'FIRE' or 'JUMP'
         * @param  String input The input code as a string
         * @param  {h5c3.Base} [uiTarget] An optional element to limit the input to only within the bounds of the element (must
         * implement getScreenRect)
         */
        bindAction:function (obj, actionName, input, uiTarget)
        {
            // There can be many bindings associated with a particular input event, so we see
            // if there is already one, and then append this to the array, otherwise
            // we create the array
            input = input.toUpperCase();

            var bindingSet = this.actionBindings.get(input);
            if (bindingSet === null) {
                this.actionBindings.put(input, [
                    { actionName:actionName, object:obj, input:input, uiTarget:uiTarget }
                ]);
			} else {
                // otherwise append a new binding
                bindingSet.push({ actionName:actionName, input:input, object:obj, uiTarget:uiTarget });
			}
        },

        /**
         * Triggers an action to be fired. Typically this will be fired in response to an input, but it can
         * also be used to simulate an event.
         * @param  Number eventCode event code
         * @param  {Event} event An event object
         */
        fireAction:function (eventCode, event)
        {
            var i,binding,obj,pos,er,bindingSet = this.actionBindings.get(h5c3.InputType.getName(eventCode));
            if (bindingSet === null) { return false; }

            // cycle through all the bindings against this input type and fire the object callbacks
            for (i = 0; i < bindingSet.length; i++)
            {
                binding = bindingSet[i];
                obj = bindingSet[i].object;
                if (!obj.isActive || obj.isActive())
                {
                    // if it's a positional event type (like a mouse down or move, then we only
                    // fire events to objects where the event is within its spatial bounds
                    if (h5c3.InputType.isPositional(eventCode))
                    {
                        pos = this.Class.getEventPosition(event);
                        er = null;
                        if (VLD(binding.uiTarget)) {
                            er = binding.uiTarget.getScreenRect();
						} else {
                            er = obj.getScreenRect ? obj.getScreenRect() : null;
						}

                        if (er && er.containsPoint(pos)) {
                            obj.onAction(binding.actionName, event, pos, binding.uiTarget);
						}
                    } else {
                        obj.onAction(binding.actionName);
					}
                }
            }
            return true;
        },

        /*** INTERNALS **/
        
        _onReady:function ()
        {
			_DBG_("onReady Event.",this.Class);
			/**
			if (h5c3.device.useTouch) {
				h5c3.device.game.canvas.addEventListener('touchstart', this._touchStart.bind(this), true);
				h5c3.device.game.canvas.addEventListener('touchend', this._touchEnd.bind(this), true);
				h5c3.device.game.canvas.addEventListener('touchmove', this._touchMove.bind(this), true);

				h5c3.device.touchpad.canvas.addEventListener('touchstart', this._touchStart.bind(this), true);
				h5c3.device.touchpad.canvas.addEventListener('touchend', this._touchEnd.bind(this), true);
				h5c3.device.touchpad.canvas.addEventListener('touchmove', this._touchMove.bind(this), true);
			} else {		
				// mouse input	
				//fixes a problem where double clicking causes text to get selected on the canvas
				h5c3.device.game.canvas.addEventListener('selectstart', function(event) { event.preventDefault(); return false; }, false);		
				h5c3.device.game.canvas.addEventListener('mouseup', this._mouseUp.bind(this), true);
				h5c3.device.game.canvas.addEventListener('mousedown', this._mouseDown.bind(this), true);
				h5c3.device.game.canvas.addEventListener('mousemove', this._mouseMove.bind(this), true);
				h5c3.device.game.canvas.addEventListener('mousewheel', this._mouseWheel.bind(this), true);
				h5c3.device.game.canvas.addEventListener('contextmenu', this._contextMenu.bind(this), true);
			}
			**/
			h5c3.device.game.obj.attachTouchEvents(this);
            // key input
            window.addEventListener('keydown', this._keyDown.bind(this), true);
            window.addEventListener('keyup', this._keyUp.bind(this), true);
        },

        _positionals: [], // array of bindings that need to be checked against positional events like mouse move and touch

        // Checks the positional event to see if it's a new event INSIDE an on-screen rectangle that has been
        // bound to a state. This is so when a positional event, like a mouse move, 'slides' over an element
        // we can turn the state on, as well as detecting when it slides out of the area of the uiTarget

        _checkPositional: function(moveEvent)
        {
			var i,binding,er,state,state2;
            // check existing tracked states -- did we move out of an element
            for (i=0; i < this._positionals.length; i++)
            {
                binding = this._positionals[i];

                if (moveEvent.type === 'mousemove' && h5c3.InputType.isTouch(h5c3.InputType.getCode(binding.input))) {
                    continue;
				}

                if (moveEvent.type === 'touchmove' && !h5c3.InputType.isTouch(h5c3.InputType.getCode(binding.input))) {
                    continue;
				}

                if (h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_LEFT_UP ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_LEFT_DOWN ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_RIGHT_UP ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_RIGHT_DOWN ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_MIDDLE_UP ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_MIDDLE_DOWN ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_CLICK
                    ) {
                    continue;
				}

                er = null;
                if (VLD(binding.uiTarget)) {
                    er = binding.uiTarget.getScreenRect();
                } else {
                    er = binding.object.getScreenRect ? binding.object.getScreenRect() : null;
				}

                if (er)
                {
                    if (!er.containsPoint( this.Class.getEventPosition(moveEvent) ))
                    {
                        // no longer in the right position, turn state off
                        state = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                        state.on = false;
                        state.event = moveEvent;
                    } else {
                        // moved into position, turn back on
                        state2 = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                        state2.on = true;
                        state2.event = moveEvent;
                    }
                }
            }
        },

        _changeState:function (eventCode, stateOn, event)
        {
            // grab all the bindings to this event code
            var i,bindingSet,binding,pos,er,state,keyName = h5c3.InputType.getName(eventCode);
            if (keyName === null)
            {
                this.warn("Unknown keycode = " + eventCode);
                return false;
            }

            bindingSet = this.stateBindings.get(keyName);
            //this.debug('change state = ' + this.inputType.getName(event.keyCode,+ ' bindings=' + bindingSet));
            if (bindingSet === null) { return false; }

            // cycle through all the bindings against this input type and change the state
            for (i = 0; i < bindingSet.length; i++)
            {
                binding = bindingSet[i];
                if (!binding.object.isActive || binding.object.isActive())
                {
                    if (h5c3.InputType.isPositional(eventCode))
                    {
                        // if binding has a uiElement, then make sure the event hit is within the on-screen
                        // rectangle
                        pos = this.Class.getEventPosition(event);
                        er = null;

                        if (VLD(binding.uiTarget)) {
                            er = binding.uiTarget.getScreenRect();
                        } else {
                            er = binding.object.getScreenRect ? binding.object.getScreenRect() : null;
						}

                        if (er)
                        {
                            if (er.containsPoint(pos))
                            {
                                state = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                                state.on = stateOn;
                                state.event = event;
                            }
                        } else
                        {
                            // positional, but no uiTarget
                            state = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                            state.on = stateOn;
                            state.event = event;
                        }
                    }
                    else
                    {
                        state = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                        state.on = stateOn;
                        state.event = event;
                    }
                }
            }
            return true;
        },

        _lastMouseMove: null,

        /**
         * Called by the h5c3.device main loop to process any move events received. We only handle events
         * here so they are processed once per cycle, not every time we get them (i.e. stop handling
         * a flood of mouse move or touch events
         */
        process: function()
        {
            if (this._lastMouseMove)
            {
                this._checkPositional(this._lastMouseMove);
                this.fireAction(h5c3.InputType.MOUSE_MOVE, this._lastMouseMove);
                this.Class.getEventPosition(this._lastMouseMove, this.mousePos);
                this._lastMouseMove = null;
            }
        },

        ///////////////////////////////////////////////////////////////////////////////////
        //
        //  EVENT HANDLERS
        //
        ///////////////////////////////////////////////////////////////////////////////////

        _keyDown:function (event)
        {
            if (this._changeState(event.keyCode, true, event)) {
                event.preventDefault();
			}

            if (this.fireAction(event.keyCode, event)) {
                event.preventDefault();
			}
        },

        _keyUp:function (event)
        {
            if (this._changeState(event.keyCode, false, event)) {
                event.preventDefault();
			}
        },

        _touchStart:function (event)
        {
			var i;
            for(i=0, len=event.touches.length; i < len; i++)
            {
                this._changeState(h5c3.InputType.TOUCH, true, event.touches[i]);
                this.fireAction(h5c3.InputType.TOUCH, event.touches[i]);
            }
            event.preventDefault();
        },

        _touchEnd:function (event)
        {
			var i;
            for(i=0, len=event.changedTouches.length; i < len; i++) {
                this._changeState(h5c3.InputType.TOUCH, false, event.changedTouches[i]);
			}
            event.preventDefault();
        },

        _touchMove:function (event)
        {
			var i;
            for(i=0, len=event.touches.length; i < len; i++) {
                this._checkPositional(event.touches[i]);
			}
            event.preventDefault();
        },

		_mouseButton:function (event, down) 
		{
           switch (event.button) 
		   {
                case 0: //Left Button
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_LEFT_DOWN, down, event);
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_LEFT_UP, !down, event);
                    this.fireAction(h5c3.InputType.MOUSE_BUTTON_LEFT_DOWN, event);
                    this.mouseLeftButtonDown = true;
                break;
                case 1: //Middle Button
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_MIDDLE_DOWN, down, event);
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_MIDDLE_UP, !down, event);
                    this.fireAction(h5c3.InputType.MOUSE_BUTTON_MIDDLE_DOWN, event);
                    this.mouseMiddleButtonDown = true;
                break;
                case 2: //Right Button
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_RIGHT_DOWN, down, event);
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_RIGHT_UP, !down, event);
                    this.fireAction(h5c3.InputType.MOUSE_BUTTON_RIGHT_DOWN, event);
                    this.mouseRightButtonDown = true;
                break;         
            }

            this.fireAction(h5c3.InputType.MOUSE_CLICK, event);
            // turn off specific states
            event.preventDefault();
		},
		
        _mouseUp:function (event)
        {
			this._mouseButton(event,false);
        },

        _mouseDown:function (event)
        {
			this._mouseButton(event,true);
        },

        _mouseMove:function (event)
        {
            this._lastMouseMove = event;
            event.preventDefault();
        },
				
        _contextMenu: function(event)
        {
            this._changeState(h5c3.InputType.MOUSE_BUTTON_RIGHT_UP, true, event);
            this.fireAction(h5c3.InputType.MOUSE_BUTTON_RIGHT_DOWN, event);
        },

        _mouseWheel:function (event)
        {
            if (event.wheelDelta > 0) {
                this.fireAction(h5c3.InputType.MOUSE_WHEEL_UP, event);
            } else {
                this.fireAction(h5c3.InputType.MOUSE_WHEEL_DOWN, event);
			}	
            event.preventDefault();
        }
    });

h5c3.InputType = h5c3.Base.extend('h5c3.InputType',
    {
        // STATICS
        nameToCode:null,
        codeToName:null,

        POSITIONAL_EVENT_START:     1000,
        MOUSE_MOVE:                 1100, // Basic mouse movement
		MOUSE_CLICK:				1110,
        MOUSE_BUTTON_LEFT_UP:       1200,
        MOUSE_BUTTON_LEFT_DOWN:     1201,
        MOUSE_BUTTON_RIGHT_UP:      1220,
        MOUSE_BUTTON_RIGHT_DOWN:    1221,
        MOUSE_BUTTON_MIDDLE_UP:     1230,
        MOUSE_BUTTON_MIDDLE_DOWN:   1231,
        MOUSE_WHEEL_UP:             1300,
        MOUSE_WHEEL_DOWN:           1301,
		
        TOUCH:                      1000,
        TOUCH_MOVE:                 1001,
        TOUCH_START:                1002,
        TOUCH_END:                  1003,
        TOUCH_CANCEL:               1004,
        TOUCH_LEAVE:                1005,

        init:function ()
        {
			var c,ch;
            this.nameToCode = new h5c3.Hashtable();
            this.codeToName = new h5c3.Hashtable();

            this.addInput(8, 'BACKSPACE');
            this.addInput(9, 'TAB');
            this.addInput(13, 'ENTER');
            this.addInput(16, 'SHIFT');
            this.addInput(17, 'CTRL');
            this.addInput(18, 'ALT');
            this.addInput(19, 'PAUSE');
            this.addInput(20, 'CAPS');
            this.addInput(27, 'ESC');
            this.addInput(32, 'SPACE');
            this.addInput(33, 'PAGE_UP');
            this.addInput(34, 'PAGE_DOWN');
            this.addInput(35, 'END');
            this.addInput(36, 'HOME');
            this.addInput(37, 'LEFT');
            this.addInput(38, 'UP');
            this.addInput(39, 'RIGHT');
            this.addInput(40, 'DOWN');
            this.addInput(45, 'INSERT');
            this.addInput(46, 'DELETE');

            // add alphanumierics
            for (c=48; c < 91; c++)
            {
                ch = String.fromCharCode(c);
                this.addInput(c, ch);
            }

            this.addInput(91, 'WINDOW_LEFT');
            this.addInput(92, 'WINDOW_RIGHT');
            this.addInput(93, 'SELECT');
            this.addInput(96, 'NUM_0');
            this.addInput(97, 'NUM_1');
            this.addInput(98, 'NUM_2');
            this.addInput(99, 'NUM_3');
            this.addInput(100, 'NUM_4');
            this.addInput(101, 'NUM_5');
            this.addInput(102, 'NUM_6');
            this.addInput(103, 'NUM_7');
            this.addInput(104, 'NUM_8');
            this.addInput(105, 'NUM_9');
            this.addInput(106, '*');
            this.addInput(107, '+');
            this.addInput(109, '-');
            this.addInput(110, '.');
            this.addInput(111, '/');
            this.addInput(112, 'F1');
            this.addInput(113, 'F2');
            this.addInput(114, 'F3');
            this.addInput(115, 'F4');
            this.addInput(116, 'F5');
            this.addInput(117, 'F6');
            this.addInput(118, 'F7');
            this.addInput(119, 'F8');
            this.addInput(120, 'F9');
            this.addInput(121, 'F10');
            this.addInput(122, 'F11');
            this.addInput(123, 'F12');
            this.addInput(144, 'NUM_LOCK');
            this.addInput(145, 'SCROLL_LOCK');
            this.addInput(186, ';');
            this.addInput(187, '=');
            this.addInput(188, ',');
            this.addInput(189, '-');
            this.addInput(190, '.');
            this.addInput(191, '/');
            this.addInput(192, '`');
            this.addInput(219, '[');
            this.addInput(220, '\\');
            this.addInput(221, ']');
            this.addInput(222, '\'');

            this.addInput(this.TOUCH, 'TOUCH');
//            this.addInput(this.TOUCH_MOVE, 'touchmove');
//            this.addInput(this.TOUCH_START, 'touchstart'); 
//            this.addInput(this.TOUCH_END, 'touchend');
//            this.addInput(this.TOUCH_CANCEL, 'touchcancel'); 
//            this.addInput(this.TOUCH_LEAVE, 'touchleave'); 

            this.addInput(this.MOUSE_BUTTON_LEFT_DOWN, 'MOUSE_BUTTON_LEFT_DOWN');
            this.addInput(this.MOUSE_BUTTON_LEFT_UP, 'MOUSE_BUTTON_LEFT_UP');
            this.addInput(this.MOUSE_BUTTON_RIGHT_DOWN, 'MOUSE_BUTTON_RIGHT_DOWN');
            this.addInput(this.MOUSE_BUTTON_RIGHT_UP, 'MOUSE_BUTTON_RIGHT_UP');
            this.addInput(this.MOUSE_BUTTON_MIDDLE_DOWN, 'MOUSE_BUTTON_MIDDLE_DOWN');
            this.addInput(this.MOUSE_BUTTON_MIDDLE_UP, 'MOUSE_BUTTON_MIDDLE_UP');
            this.addInput(this.MOUSE_WHEEL_UP, 'MOUSE_WHEEL_UP');
            this.addInput(this.MOUSE_WHEEL_DOWN, 'MOUSE_WHEEL_DOWN');
            this.addInput(this.MOUSE_MOVE, 'MOUSE_MOVE');
            this.addInput(this.MOUSE_CLICK, 'MOUSE_CLICK');
        },

        isTouch:function(inputCode)
        {
            return inputCode === this.TOUCH;
        },

        isPositional:function (inputCode)
        {
            return inputCode >= this.POSITIONAL_EVENT_START;
        },

        /**
         * Private utility method used by the constructor to add the input codes and lookup
         * names to both indexes/hash tables
         * @param  inputCode event input code (i.e. event.keyCode)
         * @param  inputName the human name of the input
         */
        addInput:function (inputCode, inputName)
        {
            this.codeToName.put(inputCode, inputName);
            this.nameToCode.put(inputName, inputCode);
        },

        /**
         * Returns the name of an input based on the event code
         * @param  inputCode
         */
        getName:function (inputCode)
        {
            return this.codeToName.get(inputCode);
        },

        /**
         * Returns the code of an input based on the input name
         * @param  inputName
         */
        getCode:function (inputName)
        {
            return this.nameToCode.get(inputName);
        }

    },
    {}
);

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

 /**
 * Page - this class is used to create & manipulate the document in which the 
 * DIV and Canvas elements reside. It determines the device OS, Screen Dimensions
 * and orientation and reacts accordinaly. There is no need to interact with the
 * object. Everything is internal and automatic to the engine.
 */
h5c3.Page = h5c3.Base.extend('h5c3.Page',
    { 
		_CLASSNAME: 'Page',
		_CLASSVERSION:'0.1.0'
	},
    {
		device: null,
		wrapper:
		{
			div:null,			/** Container DIV for all other elements */
			dim:{w:0,h:0}		/** Actual wrapper div dimensions */
		},
		banner: 
		{
			name: null,			/** the name of the banner class that was constructed */
			obj: null,			/** the banner object constructed at startup */
			id:null,			/** element Id of the banner canvas */
			div:null,			/** div element upon which all banner drawing will occur */
			dim:{w:0,h:0}		/** Actual banner canvas dimensions */
		},	
		game:
		{
			name: null,			/** the name of the game class that was constructed */
			obj: null,			/** the game object constructed at startup */
			id:null,			/** element Id of the game/app canvas */
			canvas:null,		/** canvas element upon which all game/app drawing will occur */
			ctx:null,			/** current Game/App 2D draw context */		
			dim:{w:0,h:0}		/** Actual game/app canvas dimensions */
		},
		touchpad:
		{
			name: null,			/** the name of the touchpad class that was constructed */		        
			obj: null,			/** the tocupad object constructed at startup */
			id:null,			/** element Id of the touch canvas */        
			canvas:null,		/** canvas element upon which all touchpad drawing will occur */
			ctx:null,			/** current Touchpad 2D draw context */
			dim:{w:0,h:0}		/** Actual touchpad canvas dimensions */
		},
		
		options: {
			desktopsuspend:true,		/** Suspend/resume on losing or gaining focus */
			suspend:true,		/** Suspend/resume on losing or gaining focus */
			network:true		/** trigger events for going online or offline */
		},
        
		orientation: {
			event: false,		/** Whether or not we are reacting to the deviceorientation event */
			state: null			/** Orientation of the display/device. Determined by Engine */
		},						/** Landscape is for Desktop/Notebook non touch devices only. **/
								/** ALL touch devices are rendered in Portrait. **/
		devWindow:null,			/** Integrated Developer Window */
		
		init:function(owner,title)
		{
			this._super();
			this.device = owner;
			CHK(title,'Undefined Page');
			DOC().title = title;
			this.wrapper.div = GEI('waDIV');
			//this.waDIV(true); //Save waDIV innerHTML, False restores
			
			this.debug('Initialization started.');
			this.debug('UA='+window.navigator.userAgent);
			this.debug('Detected Device Screen Dimensions are ['+window.screen.availWidth+'x'+window.screen.availHeight+']');
			this.debug('Detected Device Usable Dimensions are ['+window.innerWidth+'x'+window.innerHeight+']');
			/** if touch device create canvas for touchpad **/
			if (this.device.useTouch) { 
				this.debug('Mobile Media Detected '+this.device.media.browser.name+' v'+this.device.media.browser.version+' on '+this.device.media.OS.name);
				this.initBanner();			
				this.initGame();
				this.initTouchPad();
			} else { 
				this.debug('Static Media Detected '+this.device.media.browser.name+' v'+this.device.media.browser.version+' on '+this.device.media.OS.name);
				//if (h5c3.devMode===true) { this.initBanner(); }
				this.initGame();
			}
						
			if (this.options.suspend===true) {
				this.debug('OPTION: Suspened on focus enabled.');
				window.addEventListener('blur', this._onBlur.bind(this), true);
				window.addEventListener('focus', this._onFocus.bind(this), true);
			} else {
				this.debug('OPTION: Suspened on focus disabled.');
			}
			
			if (this.options.network===true) {
				this.debug('OPTION: Network monitoring enabled.');
				window.document.addEventListener('offline', this._onOffline.bind(this), true);
				window.document.addEventListener('online', this._onOnline.bind(this), true);
			} else {
				this.debug('OPTION: Network monitoring disabled.');
			}
            window.onresize = this._onResize.bind(this);
		},
		
		initBanner:function()
		{
			var e = GEI('waDIV');
			this.banner.div = document.createElement("div"); 
			this.banner.div.id = this.banner.id = "waBannerDIV";
			this.banner.div.width = window.innerWidth;
			this.banner.div.height= 32;
			e.appendChild(this.banner.div);
			
			if (!this.banner.div) {	this.debug('Could not get a banner element using the id [' + this.banner.id + ']. '); }

			this.banner.obj = new h5c3.Banners(this.banner.div);
			if (!this.banner.obj) {	this.debug('Invalid Banner class. Must be named [Banners]'); }

			this.banner.dim = {w:this.banner.div.width, h:this.banner.div.height};
			this.debug('Created Banner panel ['+this.banner.dim.w+'x'+this.banner.dim.h+']');
		},
			
		initGame:function()
		{
			this.setOrientation();
			if (!VLD(this.game.canvas = GEI('waCANVAS'))) { 
				this.debug('ERROR: Could not attach to a canvas element using the id [' + this.game.id + ']. ');
			} else {
				this.game.ctx = this.game.canvas.getContext('2d');
				this.game.dim = {w:this.game.canvas.width, h:this.game.canvas.height};
				if (typeof Game === 'function') {
					this.game.obj = new Game(this.game);
				   if (!VLD(this.game.obj)) {
						this.debug('ERROR: Invalid Game class, Must be named [Game]');
					} else {
						this.debug('Created Game panel ['+this.game.dim.w+'x'+this.game.dim.h+']');
					}
				}
			}
		},
		
		initTouchPad:function()
		{
			var e = GEI('waDIV');
			this.touchpad.canvas = document.createElement("canvas"); 
			this.touchpad.canvas.id = this.touchpad.id = "pcTouchCanvas";
			this.touchpad.canvas.width = 1080;
			this.touchpad.canvas.height= 540;
			e.appendChild(this.touchpad.canvas);
			
            if (!this.touchpad.canvas) {
                throw 'device.js::initTouchpad() - Abort! Could not attach to a canvas element using the id [' + this.touchpad.id + ']. ';
			}

            this.touchpad.ctx = this.touchpad.canvas.getContext('2d');
			this.touchpad.dim = {w:this.touchpad.canvas.width, h:this.touchpad.canvas.height};
			this.touchpad.obj = new h5c3.TouchPad(this.touchpad.ctx,this.touchpad.dim);
            if (!this.touchpad.obj) {
                throw "device.js::initTouchpad() - Invalid touchpad class. Must be named [TouchPad]";
			}

			this.debug('Created Touchpad panel ['+this.touchpad.dim.w+'x'+this.touchpad.dim.h+']');
		},
		
		setOrientation:function() 
		{
			if (!this.device.started) {
				return;
			}
			if (window.DeviceOrientationEvent) {
				this.orientation.event = true;
				this.debug("Device Orientation is supported - Event Hooked Added.");
				window.addEventListener('deviceorientation', this.onDeviceMotion, false);
			} else {
				this.orientation.event = false;
				this.debug("Device Orientation not supported");
			}	
			
			if (h5c3.device.useTouch || window.innerHeight > window.innerWidth) {
				this.orientation.state = H5c3.ORIENTATION.PORTRAIT;
			} else {
				this.orientation.state = H5C3.ORIENTATION.LANDSCAPE;
			}
		},
		
		onDeviceMotion:function(event) {
			if (event.alpha===null || event.beta===null || event.gamma===null) {
				if (h5c3.device.page.orientation.event === true) {
					window.removeEventListener('deviceorientation', this.onDeviceMotion, false);
					h5c3.device.page.orientation.event = false;
					h5c3.device.page.debug("This device does not REALLY have orientation capabilities - Event Hooked Removed.");
				}
			}
		},
		
        _calcScreenSize:function ()
        {			
			if (this.orientation.state===H5C3.ORIENTATION.LANDSCAPE)
			{
				this.debug('Orientation set to Landscape.');
				if (!document.fullScreen) {
					GEI('waCANVAS').webkitRequestFullScreen();
				}
				this.wrapper.dim.w = window.innerWidth; this.wrapper.div.width = this.wrapper.dim.w+"px"; this.wrapper.div.style.width = this.wrapper.dim.w+"px";
				this.wrapper.dim.h = window.innerHeight; this.wrapper.div.height = this.wrapper.dim.h+"px"; this.wrapper.div.style.height = this.wrapper.dim.h+"px";
			}
			else
			{
				this.debug('Orientation set to Portrait.');
				this.wrapper.dim.w = window.innerWidth; this.wrapper.div.width = this.wrapper.dim.w+"px"; this.wrapper.div.style.width = this.wrapper.dim.w+"px";
				this.wrapper.dim.h = window.innerHeight; this.wrapper.div.height = this.wrapper.dim.h+"px"; this.wrapper.div.style.height = this.wrapper.dim.h+"px";
			}

			this.debug('Calculated screen space is ['+this.wrapper.dim.w+'x'+this.wrapper.dim.h+']');
			var remainingHeight = this.wrapper.dim.h;

			//Now assign all other dimension based off wrapper
			/** If in Portrait view, render single ad bar at top otherwise	**/
			/** use the extra space on either side of the game canvas		**/
			//if (h5c3.devMode===true) {
			//	this.banner.dim.w = this.wrapper.dim.w; 
			////	this.banner.div.width = this.banner.dim.w; 
			//	this.banner.div.style.width = this.banner.dim.w+"px";
			//	this.banner.dim.h = this.banner.div.height = 32; 
			//	this.banner.div.style.height = "32px";
			//	remainingHeight -= this.banner.dim.h;
			//}
			
			if (h5c3.device.useTouch) {
				this.game.dim.w = this.wrapper.dim.w; 
				this.game.canvas.style.width = this.game.dim.w+"px";
				this.game.dim.h = this.wrapper.dim.w; 
				this.game.canvas.style.height = this.game.dim.h+"px";
				remainingHeight -=this.game.dim.h;

				this.touchpad.dim.w = this.wrapper.dim.w; 
				this.touchpad.canvas.style.width = this.touchpad.dim.w+"px";
				this.touchpad.dim.h = remainingHeight; 
				this.touchpad.canvas.style.height = this.touchpad.dim.h+"px";
				remainingHeight -= this.touchpad.dim.h;
			} else {
				this.game.dim.w = this.wrapper.dim.w; 
				this.game.canvas.style.width = this.game.dim.w+"px";
				this.game.dim.h = this.wrapper.dim.h; 
				this.game.canvas.style.height = remainingHeight+"px";
				remainingHeight -=remainingHeight;
			}


			//if (h5c3.devMode) {
			//	this.debug('Used ['+this.banner.dim.w+'x'+this.banner.dim.h+'] for Banner Panel.');
			//}
			this.debug('Used ['+this.game.dim.w+'x'+this.game.dim.h+'] for Game Panel.');
			this.debug('Used ['+this.touchpad.dim.w+'x'+this.touchpad.dim.h+'] for Touchpad Panel.');
			
			if (remainingHeight !== 0) { this.debug("Layout was not done correctly. "+remainingHeight+'px difference.'); }
		},
		
		render:function()
		{
			//if (h5c3.devMode===true) { this.devWindow.objStats.update(h5c3.device.elapsed);	this.devWindow.objStats.draw();	}
		},
		
		waDIV:function(clear)
		{
			CHK(clear,true);
			this.wrapper.div.display = 'none';
			if (clear===true) {
				this.wrapper.div.innerHTML = '';
			} else {
				document.location.reload();
			}
			this.wrapper.div.display = 'block';
		},
				
		/**
		 * Triggers when the page loses focus
		*/
		_onBlur:function(event)
		{
			this.game.obj.onBlur();
		},
		
		/**
		 * Triggers when the page gets focus
		 */
		_onFocus:function(event)
		{
			this.game.obj.onFocus();
		},
		
		/**
		 * Triggers when the page goes offline
		*/
		_onOffline:function(event)
		{
			this.debug('Lost network connection.');
		},

		/**
		 * Triggers when the page come online
		*/
		_onOnline:function(event)
		{
			this.debug('Gained network connection.');
		},
		
		/**
		 * Triggers when the page is resized
		 */
        _onResize:function (e)
        {
			this.debug('Dimension changed detected.');
            this._calcScreenSize();
            this.game.dim.w = this.game.canvas.width;
            this.game.dim.h = this.game.canvas.height;
            this.game.obj.onResize(this.game.dim.w, this.game.dim.h);
			//if (h5c3.device.showDebug) this.devWindow.onResize();
        }, //end onResize()
		
        /**
         * Automatically called by onReady()
         */
        onReady:function ()
        {
			this.debug('onReady Called.');
			//if (h5c3.devMode) { this.banner.obj.onReady(); this.devWindow.onReady(); }
            this.game.obj.onReady();
            if (h5c3.device.useTouch) {
				this.touchpad.obj.onReady();
			}
			
        } //end onReady()
    });

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

/**
 *  Engine
 *  H5C3 Framework
 *  Engine
 * @class  h5c3.Main
 *  h5c3.Base
 * 
 * 
 * 
 * h5c3.Main is the primary base class for creating a game and drives resources, core processing (cycling) your
 * game, and serves as a placeholder for scenes.
 * <h5>Basic Usage</h5>
 * 
 * Typically a h5c3.Main is constructed by the h5c3.start method call made from within your games index.html:
 * 
 * &ltscript&gt
 *    // h5c3.start will construct an instance of TheGame once the device (browser) is ready
 *    h5c3.start('waCANVAS', 'TheGame', '/mygame/js/', ['mygame.js']);
 * &lt/script&gt
 * (end)
 * When the h5c3.start system has finished preparing everything, it will dynamically construct an instance of
 * the class parameter (in the above example 'TheGame'). You can always gain access to the game from the global
 * h5c3.device:
 * 
 * var myGame = this;
 * (end)
 * 
 * To create a h5c3.Main, extend it and override what you need:
 * 
 * TheGame = h5c3.Main.extend('TheGame',
 * {},
 * {
 *     // onReady is called when the browser DOM is ready
 *     onReady:function ()
 *     {
 *         this._super();
 *
 *         // load resources
 *         // declare a base URL; saves you typing
 *         h5c3.loader.setBaseUrl('images/');
 *
 *         // add an image to the resource loader's queue
 *         h5c3.loader.add(new h5c3.Image('player-ship', 'ship1.png'));
 *
 *         // start the resource loader
 *         h5c3.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
 *     },
 *
 *     onLoading:function (percentageComplete)
 *     {
 *         // draw title screen -- with loading bar
 *     }
 *
 * });
 * (end)
 * See the h5c3.Loader for more information on using the resource loader and the onLoading/onLoaded callbacks.
 * 

 * <h5>Pause/Resume</h5>
 * 
 * You can pause/resume individual scenes, or you can pause/resume all scenes by calling pause on the game:
 * 
 * myGame.pause();
 * myGame.resume();
 * myGame.togglePauseResume();
 * (end)
 *
 * <h5>Debugging</h5>
 * h5c3.Main sets up the following default input keys for debugging:
 * <ul>
 *     <li>F8 to enable/disable showing development window.</li>
 *     <li>F9 to enable/disable physics debugging across all layers.</li>
 *     <li>F10 to dump stats on the object pools.</li>
 *     <li>F11 toggle sound.</li>
 * </ul>
 */
h5c3.Main = h5c3.Base.extend('h5c3.Main', 
	{
		_CLASSNAME: 'Main',
		_CLASSVERSION:'0.1.0'
	},
    /** Interface: h5c3.Main.prototype */
    {
        scenes:			null,	/** (h5c3.LinkedList) List of all scenes in the game */       	
        activeScenes:	null, 	/** (h5c3.LinkedList) List of scenes current active */
        paused:			false,	/** (Boolean) Whether the game is currently paused. You can theGame.paused=true; to suspend all scenes **/
		ctx:			null,	/** current 2D draw context */
		dim:			null,		
		bQuit:			false,
		
        /**
         * Constructs a new WebApp using the supplied 2D Context, Size & optional FPS
         * @param  {Context} 2D Device Context for drawing
         * @param  {h5c3.Point} width and height for inital size
         * @param  Number fps Base frame rate in frames per second (fastest cycle time)
         */
        //init:function (ctx,size)
        init:function (obj)
        {
            this._super();
			_DBG_('Initializing '+this.Class.shortName+' object.',this.Class);
			this.ctx = obj.ctx;
			this.dim = obj.dim;
			this.canvas = obj.canvas;
            this.scenes = new h5c3.LinkedList();
            this.activeScenes = new h5c3.LinkedList();

            if (h5c3.devMode===true)
            {
                // bind some special keys for general debugging use
                h5c3.device.input.bindAction(this, 'developer window', 'F6');
                h5c3.device.input.bindAction(this, 'physics debug', 'F7');
                h5c3.device.input.bindAction(this, 'pool dump', 'F8');
                h5c3.device.input.bindAction(this, 'toggle sound', 'F9');
                h5c3.device.input.bindAction(this, 'reset', 'F10');
                h5c3.device.input.bindAction(this, 'exit', 'F12');
            }
            _DBG_("Initialization completed.",this.Class);
        },

        /**
         * Processes all active scenes (called automatically by h5c3.Device.cycle)
         * @return Boolean false indicates the device should stop running the game loop
         */
        process:function ()
        {
            if (this.paused || this.bQuit) return this.bQuit;

            var scene = this.getFirstActiveScene();
            while (scene)
            {
                scene.object().process();
                scene = scene.next();
            }

            return this.bQuit; // returns true to quit the update loop
        },

        stopAllSounds: function()
        {
            // stop any current sounds from playing
            var sounds = h5c3.loader.getAllSounds();
            for (var i = 0; i < sounds.length; i++)
            {
                if (h5c3.device.soundEnabled)
                    sounds[i].stop();
            }
        },

        /**
         * Base handler for input actions. This gives the game a chance to intercept and act on actions like
         * F9 and F10 for debugging. See h5c3.Input for more information on input handlers
         * @param  String actionName Name of the action to be handled
         */
        onAction:function (actionName)
        {
			switch (actionName) {
				case 'reset': h5c3.device.boot();
					break;
					
				case 'exit': this.quit();
					break;

				case 'developer window':
					if (VLD(h5c3.device.page.devWindow)) {
						_DBG_("Developer Window activated.",this.Class);
						h5c3.device.page.devWindow.toggleShow();
					} 
					else {_DBG_("Developer Window not available. Did you include the Plugin in your config? Are you running the debug.html version of your app?'",this.Class);}
					break;

				case 'toggle sound':
					this.stopAllSounds();
					h5c3.device.soundEnabled = !h5c3.device.soundEnabled;
					if (h5c3.device.soundEnabled) {
						h5c3.device.page.devWindow.send2Console('Sound Enabled.');
					} else {
						h5c3.device.page.devWindow.send2Console('Sound Disabled.');
					}
					break;
					
				case 'pool dump':
					h5c3.device.page.devWindow.send2Console('Object Pool Dump:\n===================');
					h5c3.device.page.devWindow.send2Console(h5c3.Pool.getStats());
					break;
					
				case 'physics debug':
					// find all physics systems, and toggle debug
					var sceneNode = this.getFirstScene();
					while (sceneNode)
					{
						var layerNode = sceneNode.object().getFirstActiveLayer();
						while (layerNode)
						{
							var layer = layerNode.object();
							if (layer.Class.isA('h5c3.EntityLayer'))
							{
								var systemNode = layer.systemManager.systems.first;
								while (systemNode)
								{
									var system = systemNode.object();
									if (system.Class.isA('h5c3.systems.Physics'))
										system.setDebug(!system.debug);
									systemNode = systemNode.next();
								}
							}
							layerNode = layerNode.next();
						}
						sceneNode = sceneNode.next();
					}
					break;
			} //End Switch
        },

        //
        // SCENES
        //
        /**
         * Add a scene to the game. Automatically makes the scene active. Once added, the game's onSceneAdded method
         * will be called.
         * @param  {h5c3.Scene} scene Scene to add
         */
        addScene:function (scene)
        {
			try {
				scene.ctx = this.ctx;
				this.scenes.add(scene);
				this.activeScenes.add(scene);
				this.onSceneAdded(scene);
			} catch (err) {
				AST(null,'Error Adding scene ['+scene+']: '+err);
			}
        },

        /**
         * Called whenever a scene is added to the game. Useful for handling setup or detecting when new scenes are
         * being added.
         * @param  {h5c3.Scene} scene Scene that was added
         */
        onSceneAdded:function (scene)
        {
        },

        /**
         * Removes a scene from the game. Will trigger a notifier call to onSceneRemoved
         * @param  {h5c3.Scene} scene Scene to remove
         */
        removeScene:function (scene)
        {
            this.scenes.remove(scene);
            this.activeScenes.remove(scene);
            this.onSceneRemoved(scene);
        },

        /**
         * Notifier callback when a scene is removed from this game
         * @param  {h5c3.Scene} scene Scene being removed
         */
        onSceneRemoved:function (scene)
        {
        },

        /**
         * Activates a scene (it will be rendered and processed)
         * @param  {h5c3.Scene} scene Scene you want to make active
         */
        activateScene:function (scene)
        {
			if (typeof(scene) !== "undefined") { 
				if (scene.active) return;

				this.activeScenes.add(scene);
				scene.active = true;
				this.onSceneActivated(scene);
				scene.onActivated();
			}
        },

        /**
         * Called when a scene has been activated.
         * @param  {h5c3.Scene} scene Scene that has been activated.
         */
        onSceneActivated:function (scene)
        {
        },

        /**
         * Deactivate a given scene
         * @param  {h5c3.Scene} scene Scene to deactivate
         */
        deactivateScene:function (scene)
        {
            if (!scene.active) return;

            this.activeScenes.remove(scene);
            scene.active = false;
            this.onSceneDeactivated(scene);
            scene.onDeactivated();
        },
		
        /**
         * Called when a scene has been deactviated
         * @param  {h5c3.Scene} scene Scene that was deactivated
         */
        onSceneDeactivated:function (scene)
        {
        },

        /**
         * Get the first active scene from the active scenes linked list
         * @return {h5c3.LinkedNode} Linked list node pointing to the first active scene (use getFirstActiveScene().object())
         * to get the scene.
         */
        getFirstActiveScene:function ()
        {
            return this.activeScenes.first;
        },

        /**
         * Get the first scene from the scene linkedlist
         * @return {h5c3.LinkedNode} Linked node pointing to the first scene
         */
        getFirstScene:function ()
        {
            return this.scenes.first;
        },

        //
        // lifecycle
        //

        /**
         * Pauses all scenes, which means no drawing or updates will occur. If you wish to pause game play and leave a menu
         * still running, then just pause the scene associated with game play, and not the menu scenes.
         */
        pause:function ()
        {
			if (!this.paused) {
				h5c3.device.handleTimers(false);
				this.paused = true;

				var nextScene = this.getFirstScene();
				while (nextScene)
				{
					nextScene.object().pause();
					nextScene = nextScene.next();
				}
			}
        },

        /**
         * @return Boolean True is the game is active (not paused)
         */
        isActive:function ()
        {
            return !this.paused;
        },

        /**
         * Resumes all scenes (after being paused)
         */
        resume:function ()
        {
			if (this.paused) {
				h5c3.device.handleTimers(true);
				this.paused = false;

				var nextScene = this.getFirstScene();
				while (nextScene)
				{
					nextScene.object().resume();
					nextScene = nextScene.next();
				}
			}
        },

        /**
         * Toggles pause/resume of the game
         */
        togglePauseResume:function ()
        {
            if (this.paused)
                this.resume();
            else
                this.pause();
        },

		quit:function($msg) {
			CHK($msg,'Quit Signal Received.');
			_DBG_($msg,this.Class);
			//h5c3.device.page.waDIV(false); //Save waDIV innerHTML, False restores
            this.onExit();			
			this.bQuit = true;
		},
		
		onExit:function()
		{
			_DBG_("CloudApp Exiting...",this.Class);
		},
		
        /**
         * Resets all scenes back to their starting state (by calling reset() on all scenes), then calling
         * clear() on all scenes, before finally calling the game class onReady
         */
        reset:function ()
        {
            // clear all scenes, layers, entities
            var nextScene = this.getFirstScene();
            while (nextScene)
            {
                nextScene.obj.reset();
                nextScene = nextScene.next();
            }

            this.scenes.clear();
            this.activeScenes.clear();

            // then restart the game
            this.onReady();
        },

		attachTouchEvents:function(obj)
		{
			if (h5c3.device.useTouch) {
				_DBG_("Attached Touch Events",this.Class);
				this.canvas.addEventListener('touchstart', obj._touchStart.bind(obj), true);
				this.canvas.addEventListener('touchend', obj._touchEnd.bind(obj), true);
				this.canvas.addEventListener('touchmove', obj._touchMove.bind(obj), true);

				h5c3.device.touchpad.canvas.addEventListener('touchstart', obj._touchStart.bind(obj), true);
				h5c3.device.touchpad.canvas.addEventListener('touchend', obj._touchEnd.bind(obj), true);
				h5c3.device.touchpad.canvas.addEventListener('touchmove', obj._touchMove.bind(obj), true);
			} else {		
				// mouse input	
				//fixes a problem where double clicking causes text to get selected on the canvas
				_DBG_("Attached Mouse & Keyboard Events",this.Class);
				this.canvas.addEventListener('selectstart', function(event) { event.preventDefault(); return false; }, false);		
				this.canvas.addEventListener('mouseup', obj._mouseUp.bind(obj), true);
				this.canvas.addEventListener('mousedown', obj._mouseDown.bind(obj), true);
				this.canvas.addEventListener('mousemove', obj._mouseMove.bind(obj), true);
				this.canvas.addEventListener('mousewheel', obj._mouseWheel.bind(obj), true);
				this.canvas.addEventListener('contextmenu', obj._contextMenu.bind(obj), true);
			}
		},
		
        /**
         * Called by the h5c3.Device when the game is ready to be started (also called when a reset() is done)
         */
        onReady:function ()
        {
			_DBG_("onReady received.",this.Class);
            // disable caching when developing
            if (h5c3.devMode===true) h5c3.loader.setDisableCache();
			if (h5c3.device.resourcesLoaded===false)
			{
				try {
					h5c3.resources.loadResources();
					h5c3.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
					h5c3.device.resourcesLoaded = true;
				} catch (err) {
					console.log('ERROR: '+err);
				}
			}
        },
		
        /**
         * Called when the device canvas changes size (such as when a browser is resized)
         * @param  width Width of the canvas
         * @param  height Height of the canvas
         */
        onResize:function (width, height)
        {
            var nextScene = this.getFirstActiveScene();
            while (nextScene)
            {
                nextScene.obj.onResize(width, height);
                nextScene = nextScene.next();
            }
        },

		/**
		 * Triggers when the page loses focus
		*/
		onBlur:function(event)
		{
			if (!this.paused) {
				this.pause();
				_DBG_("Lost focus - Paused.",this.Class);
			}
		},
		
		/**
		 * Triggers when the page gets focus
		 */
		onFocus:function(event)
		{
			if (this.paused) {
				this.resume();
				_DBG_("Gained focus - Resuming.",this.Class);
			}
		},
		
        onLoading:function (percentageComplete)
        {},

        onLoaded:function (loaded, errored)
        {},

        /**
         * Convenience function to grab the size of the associated device screen
         * @return {h5c3.Rect} Rectangle of the current canvas
         */
        getScreenRect:function ()
        {
            return h5c3.Rect.create(0, 0, h5c3.device.dimGame.w, h5c3.device.dimGame.h);
        }
    });



/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

h5c3.systems = {};

/**
 * @class  h5c3.systems.System
 * 
 * 
 * 
 * The base class for all systems. See the entity systems guide for more information on creating your own systems.
 */

h5c3.systems.System = h5c3.Base.extend('h5c3.System', {
/** Interface: h5c3.systems.System */
	_CLASSNAME: 'Systems',
	_CLASSVERSION:'0.1.0'
},{
/** Interface: h5c3.systems.System.prototype */
	/** layer this system is on */
	layer: null,
	/** array of string component types this system handles */
	componentTypes: null,
	/** reference to the systems system manager (read-only) */
	systemManager: null,
	/** optional delay for running this system, default is 0 (which means run every cycle) */
	delay: 0,

	_lastRun: 0,

	/**
	 * Constructs a new system
	 * @param  Array componentTypes Array of strings representing the component types this system will handle
	 * @param  Number delay Amount of time delay in ms between runs. i.e. systems that don't need to run every.
	 */
	init: function(componentTypes, delay)
	{
		this._super();
		this.delay = CHK(delay, 0);
		if (!componentTypes instanceof Array)
			throw "Invalid component types array. Use a blank array ([]) if there are no components handled by the system.";
		this.componentTypes = componentTypes;
	},

	/**
	 * Called by the system manager to allow this system to take care of business. This default does nothing.
	 */
	processAll: function()
	{
	},

	/**
	 * Called by the system when the layer has changed size
	 */
	onResize: function()
	{
	},

	/**
	 * Called by the system when the origin changes
	 */
	onOriginChange: function(x, y)
	{
	},

	/**
	 * Called when this system instance is added to a layer
	 */
	onAddedToLayer: function(layer)
	{
	},

	/**
	 * Called when this system instance is removed from a layer
	 */
	onRemovedFromLayer:function (layer)
	{
	}
});

/**
 * @class  h5c3.systems.EntitySystem
 * 
 * [Extends <a href='h5c3.Base'>h5c3.System</a>]
 * 
 * A system that processes entities.
 */
h5c3.systems.EntitySystem = h5c3.systems.System.extend('h5c3.systems.EntitySystem', {
/** Interface: h5c3.systems.EntitySystem */
	_CLASSNAME: 'EntitySystem',
	_CLASSVERSION:'0.1.0'
},{
/** Interface: h5c3.systems.EntitySystem.prototype */
	/** list of entities that are to be process by this system */
	entities: null,
	/** holding place for entities that are to be removed at the end of each cycle */
	suicides: null,

	/**
	 * Constructor for a system
	 * @param  Array componentTypes An array of component types this system is interested in. Any entity with
	 * a component matching this type will be sent to this system for processing.
	 * @param  Number delay Amount of time between cycles for this system (default = 0)
	 */
	init: function(componentTypes, delay)
	{
		this._super(componentTypes, delay);
		this.entities = new h5c3.LinkedList();
		this.suicides = new h5c3.LinkedList();
	},

	/**
	 * Adds an entity to this system, but only if the entity has a component type matching one of the types
	 * used by this system (this.componentTypes)
	 * @param  {h5c3.Entity} entity Entity to add (if the entity's component type matches the systems
	 */
	addIfMatched: function(entity)
	{
		// checks the entity to see if it should be added to this system
		for (var i=0; i < this.componentTypes.length; i++)
			if (entity.hasComponentOfType(this.componentTypes[i]))
			{
				this.entities.add(entity);
				this.onEntityAdded(entity);
				return; // we only need to add an entity once
			}
	},

	/**
	 * Adds an entity to the system
	 * @param  {h5c3.Entity} entity Entity to add
	 */
	add: function(entity)
	{
		if (this.entities.has(entity)) return; // already in the list
		this.entities.add(entity);
		this.onEntityAdded(entity);
	},

	/**
	 * Removes an entity from this system -- ignored if the entity isn't there
	 * @param  {h5c3.Entity} entity Entity to remove
	 */
	remove: function(entity)
	{
		if (this.entities.remove(entity)) // return true if one was removed
			this.onEntityRemoved(entity);
	},

	/**
	 * Removes an entity from this system, but checks to see if it still matches first (has a component of
	 * the correct type). This is called by the entity manager when a component is removed
	 * @param  {h5c3.Entity} entity Entity to remove
	 */
	removeIfNotMatched: function(entity)
	{
		// checks the entity to see if it should be added to this system
		for (var i=0; i < this.componentTypes.length; i++)
		{
			if (entity.hasComponentOfType(this.componentTypes[i]))
				return; // still matches, abort removing
		}

		// we got to here, so nothing matched, ok to remove the entity
		this.remove(entity);
	},

	/**
	 * Processes all entities. If you override this method, make sure you call this._super() to give the entity
	 * system a chance to process and clean up all entities.
	 */
	processAll: function()
	{
		var next = this.entities.first;
		while (next)
		{
			this.process(next.obj);
			next = next.next();
		}

		next = this.suicides.first;
		while (next)
		{
			this.remove(next.obj);
			next = next.next();
		}
		this.suicides.clear();

	},

	/**
	 * Override this in your system to handle updating of matching entities
	 * @param  {h5c3.Entity} entity Entity to update
	 */
	process: function(entity) {},

	/**
	 * Adds the entity to the suicide list; it will be removed at the end of the cycle.
	 * @param  entity
	 */
	suicide: function(entity)
	{
		this.suicides.add(entity);
	},

	/**
	 * Called when an entity has been added to this system
	 * @param  {h5c3.Entity} entity Entity that was added
	 */
	onEntityAdded: function(entity) {},

	/**
	 * Called when an entity has been removed from this system
	 * @param  {h5c3.Entity} entity Entity that was removed
	 */
	onEntityRemoved: function(entity) {},

	/**
	 * Called when a component is added to an entity
	 * @param  {h5c3.Entity} entity Entity the component was added to
	 * @param  {h5c3.components.Component} component Component that was added
	 */
	onComponentAdded: function(entity, component) {},

	/**
	 * Called when a component is removed from an entity
	 * @param  {h5c3.Entity} entity Entity the component was removed from
	 * @param  {h5c3.components.Component} component Component that was removed
	 */
	onComponentRemoved: function(entity, component) {}

});

h5c3.components = {};

/**
 * @class  h5c3.components.Component
 * 
 * [Extends <a href='h5c3.Pooled'>h5c3.Pooled</a>]
 * 
 * The base class for components you want to create.
 */
h5c3.components.Component = h5c3.Pooled.extend('h5c3.components.Component',
/** Interface: h5c3.components.Component */
{
	_CLASSNAME: 'Component',
	_CLASSVERSION:'0.1.0',
	/**
	 * Constructor that acquires the component from an object pool.
	 * @return {h5c3.components.Component} A component object
	 */
	create:function ()
	{
		var c = this._super();
		c.active = true;
		return  c;		
	}
},
/** Interface: h5c3.components.Component.prototype */
{
	/** entity I am on, or null if I'm not on an entity */
	_entity: null,

	_type:null,

	/**
	 * Constructs a new component using the given type string
	 * @param  String type The type to assign the component
	 */
	init:function (type)
	{
		this._super();
		this._type = type;
	},

	/**
	 * Get the component type
	 * @return String The type
	 */
	getType:function ()
	{
		return this._type.toLowerCase();
	},

	/**
	 * Get the entity this component is currently in; null if not in an entity
	 * @return {h5c3.Entity} Entity
	 */
	getEntity: function()
	{
		return this._entity;
	},

	/**
	 * Called when the system is about to remove this component, which gives you a chance
	 * to override and do something about it
	 */
	onBeforeRemoved:function ()
	{
	}


});

/**
 * @class  h5c3.SystemManager
 * 
 * 
 * 
 * Manages systems that are within a layer.
 *
 * Unless you are building your own systems in a complex way, you should be using the h5c3.EntityLayer to handle
 * general system management.
 */
h5c3.SystemManager = h5c3.Base.extend('h5c3.SystemManager',
/** Interface: h5c3.SystemManager */
{
	_CLASSNAME: 'SystemManager',
	_CLASSVERSION:'0.1.0'
},
/** Interface: h5c3.SystemManager.prototype */
{
	/** h5c3.LinkedList of systems */
	systems:null,
	/** Index of the systems by component type */
	systemsByComponentType:null,
	/** layer the system is on */
	layer:null,

	/**
	 * Constructs a system manager.
	 */
	init:function (layer)
	{
		this.systems = new h5c3.LinkedList();
		this.systemsByComponentType = new h5c3.Hashtable();
		this.layer = layer;
	},

	/**
	 * Adds a system to the system manager
	 * @param  {h5c3.systems.System} system System to add
	 */
	add:function (system)
	{
		system.layer = this.layer;
		system.systemManager = this;

		this.systems.add(system);

		if (!VLD(system.componentTypes))
			throw 'systemmanager.js::add() - Invalid component types: it can be empty, but not undefined. Did you forget to ' +
				'add an init method to your system and/or not call this._super(componentTypes)';

		for (var i = 0; i < system.componentTypes.length; i++)
		{
			var ctype = system.componentTypes[i].toLowerCase();

			var list = this.systemsByComponentType.get(ctype);
			if (list == null)
			{
				// create a new linked list for systems matching this component type
				list = new h5c3.LinkedList();
				this.systemsByComponentType.put(ctype, list);
			}

			// add this system to the component type map, but only if it hasn't been added already
			if (!list.has(system))
				list.add(system);
		}

		// add all the entities to this system
		var entity = this.layer.entityManager.entities.first;
		while (entity)
		{
			this._handleEntityAdded(entity.object());
			entity = entity.next();
		}

		system.onAddedToLayer(this.layer);
	},

	/**
	 * Removes a system from the system manager
	 * @param  {h5c3.systems.System} system System to remove
	 */
	remove:function (system)
	{
		system.onRemovedFromLayer(system.layer);
		this.systems.remove(system);

		for (var i = 0; i < system.componentTypes; i++)
		{
			var list = this.systemsByComponentType.get(system.componentTypes[i].toLowerCase());
			assert(list != null, "Oops, trying to remove a system and it's not in the by type list");

			system.systemManager = null;
			list.remove(system);
		}
	},

	/**
	 * Gets systems based on a component type
	 * @param  String componentType Component type
	 * @return {h5c3.LinkedList} A linked list of the systems that have the given component type
	 */
	getByComponentType:function (componentType)
	{
		return this.systemsByComponentType.get(componentType);
	},

	/**
	 * Called when the origin of the layer changes
	 * @param  Number x x-position of the origin
	 * @param  Number y y-position of the origin
	 */
	onOriginChange:function (x, y)
	{
		var system = this.systems.first;
		while (system)
		{
			system.object().onOriginChange(x, y);
			system = system.next();
		}
	},

	_handleEntityAdded:function (entity)
	{
		// grab a list of all the component types from the entity
		var componentTypes = entity.getComponentTypes();
		for (var i = 0; i < componentTypes.length; i++)
		{
			// for every type, grab all the systems that use this type and add this entity
			var systems = this.systemsByComponentType.get(componentTypes[i].toLowerCase());
			if (systems)
			{
				var next = systems.first;
				while (next)
				{
					// add will check to make sure this entity isn't in there already
					next.obj.add(entity);
					next = next.next();
				}
			}
		}
	},

	_handleEntityRemoved:function (entity)
	{
		// grab a list of all the component types from the entity
		var componentMap = entity.getAllComponents();
		if (componentMap == null) return;
		var componentTypes = componentMap.keys();

		for (var i = 0; i < componentTypes.length; i++)
		{
			// for every type, grab all the systems that use this type and add this entity
			var systems = this.systemsByComponentType.get(componentTypes[i].toLowerCase());
			if (systems)
			{
				var next = systems.first;
				while (next)
				{
					// just a plain removal, since this entity is going entirely
					next.obj.remove(entity);
					next = next.next();
				}
			}
		}
	},

	_handleComponentAdded:function (entity, component)
	{
		// get a list of all the systems that are processing components of this type
		// then ask that system to add this entity, if it's not already there
		var list = this.systemsByComponentType.get(component.getType());
		if (list == null)
		{
			// this.warn('Entity (' + entity.toString() + ' added component ' + component + ' but no system is ' +
			//    ' handling components of type: ' + component.getType() +'. Did you forget to add a system' +
			//    ' to the system manager (and was it added to the same layer as this entity)?');
			return;
		}

		// todo: the systemsByComponentType map doesn't work well if systems support
		// multiple components; need to take a fresh look at that if multiple component types
		// support is added to systems (probably change the systemsByComponentType map support combinations
		// of components as a compound key (which map to a set of matching systems with no duplicates
		var next = list.first;
		while (next)
		{
			next.obj.add(entity);
			next.obj.onComponentAdded(entity, component);
			next = next.next();
		}
	},

	_handleComponentRemoved:function (entity, component)
	{
		// get a list of all the systems that are processing components of a given type
		var list = this.systemsByComponentType.get(component.getType());
		if (list == null) return;

		var next = list.first;
		while (next)
		{
			// then ask that system to remove this entity, but be careful that it no longer matches
			// another type might still apply to a given system
			next.obj.removeIfNotMatched(entity);
			next.obj.onComponentRemoved(entity, component);
			next = next.next();
		}

	},

	/**
	 * Process all the systems
	 */
	processAll:function ()
	{
		var next = this.systems.first;
		while (next)
		{
			if (next.obj.delay == 0 || (h5c3.device.now - next.obj._lastRun > next.obj.delay))
			{
				next.obj.processAll();
				if (next.obj.delay != 0)
					next.obj._lastRun = h5c3.device.now;
			}
			next = next.next();
		}
	},

	/**
	 * Called when the layer resizes
	 * @param  Number width Width of the layer
	 * @param  Number height Height of the layer
	 */
	onResize:function (width, height)
	{
		var next = this.systems.first;
		while (next)
		{
			next.obj.onResize(width, height);
			next = next.next();
		}
	}



});

/**
 * @class  h5c3.EntityManager
 * 
 * 
 * 
 * Manages entities in a layer. This is the primary entity manager for the entity system. It contains, indexes and
 * handles the lifecycle of all entities.
 *
 * Unless you are building your own systems in a complex way, you should be using the h5c3.EntityLayer to handle
 * general entity management.
 */
h5c3.EntityManager = h5c3.Base.extend('h5c3.EntityManager',
/** Interface: h5c3.EntityManager */
{
	_CLASSNAME: 'EntityManager',
	_CLASSVERSION:'0.1.0'
},
/** Interface: h5c3.EntityManager.prototype */
{
	/** Index of all entities by tag */
	entitiesByTag: null,
	/** All the components indexed by entityID (as a linked list) */
	componentsByEntity: null,
	/** All the components, indexed by entityId and componentType (catted) */
	componentsByEntityPlusType: null,

	/** Linked list of all entities */
	entities: null,
	/** entities to be removed at the end of processing */
	entitySuicides: null,
	/** the layer this entitymanager is within (set by the layer class) */
	layer: null,

	/**
	 * Constructs a new entity manager
	 * @param  {h5c3.EntityLayer} layer The entity layer this entity manager is doing work for
	 */
	init: function(layer)
	{
		this.layer = layer;
		this.entitiesByTag = new h5c3.HashList();
		this.entities = new h5c3.LinkedList();
		this.componentsByEntity = new h5c3.Hashmap();
		this.componentsByEntityPlusType = new h5c3.Hashmap();
		this.entitySuicides = new h5c3.LinkedList();
	},

	/**
	 * Called by the core game loop to give the manager a chance to cleanup
	 */
	cleanup: function()
	{
		var entity = this.entitySuicides.first;
		while (entity)
		{
			this._doRemoveEntity(entity.object());
			entity = entity.next();
		}

		this.entitySuicides.clear();
	},

	/**
	 * Adds an entity to the manager
	 * @param  {h5c3.Entity} entity Entity to add
	 * @param  String [tag] A convenient way to add an entity and tag at the same time
	 */
	add: function(entity, tag)
	{
		// add the entity to our big global map
		this.entities.add(entity);
		if (tag != undefined)
			this.entitiesByTag.add(tag, entity);

		// add this entity to the component type indexes
		var componentMap = entity.getAllComponents();
		if (componentMap != null)
		{
			var components = componentMap.values();
			for (var i=0; i < components.length; i++)
				this._addToComponentMap(entity, components[i]);
		}

		// let the system manager take care of business
		this.layer.systemManager._handleEntityAdded(entity);
	},

	/**
	 * Removes an entity from the manager
	 * @param  {h5c3.Entity} entity Entity to remove
	 */
	remove: function(entity)
	{
		if (!this.entitySuicides.has(entity))
		{
			this.entitySuicides.add(entity);
			entity.active = false;
		}
	},

	/**
	 * Removes a component from an entity, and releases it back to the pool
	 * @param  {h5c3.Entity} entity Entity to remove the component from
	 * @param  {h5c3.components.Component} component Component to remove
	 */
	removeComponent: function(entity, component)
	{
		this._removeFromComponentMap(entity, component);
		this.layer.systemManager._handleComponentRemoved(entity, component);
		entity._handleComponentRemoved(component);
		component._entity = null;
	},

	/**
	 * Adds a tag to an entity
	 * @param  {h5c3.Entity} entity Entity to add the tag to
	 * @param  String tag Tag to assign to the entity
	 */
	addTag: function(entity, tag)
	{
		if (entity.tags.indexOf(tag.toLowerCase()) != -1) return;

		this.entitiesByTag.add(tag.toLowerCase(), entity);
		entity.tags.push(tag.toLowerCase());
	},

	/**
	 * Removes a tag from an entity
	 * @param  {h5c3.Entity} entity Entity to remove the tag from
	 * @param  String tag Tag to remove
	 */
	removeTag: function(entity, tag)
	{
		this.entitiesByTag.remove(tag.toLowerCase(), entity);
		entity.tags.remove(tag.toLowerCase());
	},

	/**
	 * Gets all the entities that have a given tag
	 * @param  String tag Tag to match
	 * @return {h5c3.LinkedList} List of entities
	 */
	getTagged: function(tag)
	{
		return this.entitiesByTag.get(tag.toLowerCase());
	},

	/**
	 * Makes an entity active (processed by systems).
	 * @param  entity {h5c3.Entity} Entity to make active
	 */
	activate: function(entity)
	{
		if (entity.active) return;

		this.layer.systemManager._handleEntityAdded(entity);
		entity.active = true;
	},

	/**
	 * Makes an entity inactive (no longer processed)
	 * @param  {h5c3.Entity} entity Entity to deactivate
	 */
	deactivate: function(entity)
	{
		if (!entity.active) return;

		// remove from the systems - we still keep it in the entitymanager lists, but remove it
		// from the systems so it wont be processed anymore
		this.layer.systemManager._handleEntityRemoved(entity);

		// mark as inactive
		entity.active = false;
	},

	_doRemoveEntity: function(entity)
	{
		this.entities.remove(entity);
		var componentMap = entity.getAllComponents();
		if (componentMap != null)
		{
			var components = componentMap.values();
			for (var i=0; i < components.length; i++)
				this._removeFromComponentMap(entity, components[i]);
		}

		// remove entities from any tag map it exists in
		for (var t=0; t < entity.tags.length; t++)
			this.entitiesByTag.remove(entity.tags[t], entity);

		this.layer.systemManager._handleEntityRemoved(entity);

		entity.release();
	},

	/**
	 * Add a component to an entity
	 * @param  {h5c3.Entity} entity Entity to add the component to
	 * @param  {h5c3.components.Component} component Component to add
	 * @return {h5c3.components.Component} Component that was added (for convience)
	 */
	addComponent: function(entity, component)
	{
		// make sure this entity is in the correct component maps
		this._addToComponentMap(entity, component);
		entity._handleComponentAdded(component);
		this.layer.systemManager._handleComponentAdded(entity, component);
		component._entity = entity;
		return component;
	},

	/**
	 * Get a component of a given class from an entity
	 * @param  {h5c3.Entity} entity Entity that has the component you're looking for
	 * @param  String componentType Class of component to get (e.g. h5c3.component.Position)
	 */
	getComponent: function(entity, componentType)
	{
		return this.componentsByEntityPlusType.get(entity.objectId + ':' + componentType);
	},

	/**
	 * Gets the components in an entity
	 * @param  {h5c3.Entity} entity Entity you want the components of
	 * @return {h5c3.Hashtable} Hashtable of components keyed by component type
	 */
	getComponents: function(entity)
	{
		return this.componentsByEntity.get(entity.objectId);
	},

	/**
	 * Checks if a given entity contains a component of a given type
	 * @param  {h5c3.Entity} entity Entity to check
	 * @param  String componentType Type to check for
	 */
	hasComponentOfType: function(entity, componentType)
	{
		return this.componentsByEntityPlusType.containsKey(entity.objectId + ':' + componentType);
	},

	//
	// INTERNALS
	//
	_addToComponentMap: function(entity, component)
	{
		// Seeing a getType error here? Likely, you didn't call .create on your component? just maybe? hint hint
		if (this.componentsByEntityPlusType.get(entity.objectId + ':' + component.getType()))
		{
			// multiple components of the same type are not supported due to performance reasons
			throw ('entitymanager.js::_addToComponentMap() - adding component ' + component.getType() +
				' to entity ' + entity + ' when it already has one of that type');
		}
		this.componentsByEntityPlusType.put(entity.objectId + ':' + component.getType(), component);
		// seeing a getType error above? -- you forgot to use .create when constructing the component
		this.componentsByEntity.put(entity.objectId, component);
	},

	_removeFromComponentMap: function(entity, component)
	{
		// need to handle removing an entity that has attachments, remove the attached entities as well
		component.onBeforeRemoved();

		this.componentsByEntityPlusType.remove(entity.objectId + ':' + component.getType());
		this.componentsByEntity.remove(entity.objectId);
		component.release();
	}
});/**
+-----------------------------------------------------------+
| File:		footer.js										|
| Version:	0.0.1											|
| Author: Andrew Donelson	andrew@i2tmlabs.com				|
| H5C3 Framework - (c) 2013 <i2tm Labs http://i2tmlabs.com>	|
+-----------------------------------------------------------+
*/
if (!h5c3.lang) h5c3.lang={
	$developer: 'Developer',
	$production: 'Production'
}


//var ctrl = new h5c3.Controller();

/* Make sure core is present and ready then startup */
if (h5c3.init()) {
	h5c3.run();
}