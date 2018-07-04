/**
 * Sunlight
 *    Intelligent syntax highlighting
 *
 * http://sunlightjs.com/
 *
 * by Tommy Montgomery <http://tmont.com>
 * Licensed under WTFPL <http://sam.zoy.org/wtfpl/>
 */
(function(window, document, undefined){

	var 
		//http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
		//we have to sniff this because IE requires \r
		isIe = !+"\v1", 
		EOL = isIe ? "\r" : "\n",
		EMPTY = function() { return null; },
		HIGHLIGHTED_NODE_COUNT = 0,
		DEFAULT_LANGUAGE = "plaintext",
		DEFAULT_CLASS_PREFIX = "sunlight-",
		
		//global sunlight variables
		defaultAnalyzer,
		getComputedStyle,
		globalOptions = {
			tabWidth: 4,
			classPrefix: DEFAULT_CLASS_PREFIX,
			showWhitespace: false,
			maxHeight: false
		},
		languages = {},
		languageDefaults = {},
		events = {
			beforeHighlightNode: [],
			beforeHighlight: [],
			beforeTokenize: [],
			afterTokenize: [],
			beforeAnalyze: [],
			afterAnalyze: [],
			afterHighlight: [],
			afterHighlightNode: []
		};

	defaultAnalyzer = (function() {
		function defaultHandleToken(suffix) {
			return function(context) {
				var element = document.createElement("span");
				element.className = context.options.classPrefix + suffix;
				element.appendChild(context.createTextNode(context.tokens[context.index]));
				return context.addNode(element) || true;
			};
		}

		return {
			handleToken: function(context) { 
				return defaultHandleToken(context.tokens[context.index].name)(context); 
			},

			//just append default content as a text node
			handle_default: function(context) { 
				return context.addNode(context.createTextNode(context.tokens[context.index])); 
			},

			//this handles the named ident mayhem
			handle_ident: function(context) {
				var evaluate = function(rules, createRule) {
					var i;
					rules = rules || [];
					for (i = 0; i < rules.length; i++) {
						if (typeof(rules[i]) === "function") {
							if (rules[i](context)) {
								return defaultHandleToken("named-ident")(context);
							}
						} else if (createRule && createRule(rules[i])(context.tokens)) {
							return defaultHandleToken("named-ident")(context);
						}
					}

					return false;
				};

				return evaluate(context.language.namedIdentRules.custom)
					|| evaluate(context.language.namedIdentRules.follows, function(ruleData) { return createProceduralRule(context.index - 1, -1, ruleData, context.language.caseInsensitive); })
					|| evaluate(context.language.namedIdentRules.precedes, function(ruleData) { return createProceduralRule(context.index + 1, 1, ruleData, context.language.caseInsensitive); })
					|| evaluate(context.language.namedIdentRules.between, function(ruleData) { return createBetweenRule(context.index, ruleData.opener, ruleData.closer, context.language.caseInsensitive); })
					|| defaultHandleToken("ident")(context);
			}
		};
	}());

	languageDefaults = {
		analyzer: create(defaultAnalyzer),
		customTokens: [],
		namedIdentRules: {},
		punctuation: /[^\w\s]/,
		numberParser: defaultNumberParser,
		caseInsensitive: false,
		doNotParse: /\s/,
		contextItems: {},
		embeddedLanguages: {}
	};
	
	//adapted from http://blargh.tommymontgomery.com/2010/04/get-computed-style-in-javascript/
	getComputedStyle = (function() {
		var func = null;
		if (document.defaultView && document.defaultView.getComputedStyle) {
			func = document.defaultView.getComputedStyle;
		} else {
			func = function(element, anything) {
				return element["currentStyle"] || {};
			};
		}

		return function(element, style) {
			return func(element, null)[style];
		}
	}());
	
	//-----------
	//FUNCTIONS
	//-----------

	function createCodeReader(text) {
		var index = 0,
			line = 1,
			column = 1,
			length,
			EOF = undefined,
			currentChar,
			nextReadBeginsLine;

		text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n"); //normalize line endings to unix

		length = text.length;
		currentChar = length > 0 ? text.charAt(0) : EOF;

		function getCharacters(count) {
			var value;
			if (count === 0) {
				return "";
			}

			count = count || 1;

			value = text.substring(index + 1, index + count + 1);
			return value === "" ? EOF : value;
		}

		return {
			toString: function() {
				return "length: " + length + ", index: " + index + ", line: " + line + ", column: " + column + ", current: [" + currentChar + "]";
			},

			peek: function(count) {
				return getCharacters(count);
			},

			substring: function() {
				return text.substring(index);
			},

			peekSubstring: function() {
				return text.substring(index + 1);
			},

			read: function(count) {
				var value = getCharacters(count),
					newlineCount,
					lastChar;

				if (value === "") {
					//this is a result of reading/peeking/doing nothing
					return value;
				}

				if (value !== EOF) {
					//advance index
					index += value.length;
					column += value.length;

					//update line count
					if (nextReadBeginsLine) {
						line++;
						column = 1;
						nextReadBeginsLine = false;
					}

					newlineCount = value.substring(0, value.length - 1).replace(/[^\n]/g, "").length;
					if (newlineCount > 0) {
						line += newlineCount;
						column = 1;
					}

					lastChar = last(value);
					if (lastChar === "\n") {
						nextReadBeginsLine = true;
					}

					currentChar = lastChar;
				} else {
					index = length;
					currentChar = EOF;
				}

				return value;
			},

			text: function() { return text; },

			getLine: function() { return line; },
			getColumn: function() { return column; },
			isEof: function() { return index >= length; },
			isSol: function() { return column === 1; },
			isSolWs: function() {
				var temp = index,
					c;
				if (column === 1) {
					return true;
				}

				//look backward until we find a newline or a non-whitespace character
				while ((c = text.charAt(--temp)) !== "") {
					if (c === "\n") {
						return true;
					}
					if (!/\s/.test(c)) {
						return false;
					}
				}

				return true;
			},
			isEol: function() { return nextReadBeginsLine; },
			EOF: EOF,
			current: function() { return currentChar; }
		};
	}

	//http://javascript.crockford.com/prototypal.html
	function create(o) {
		function F() {}
		F.prototype = o;
		return new F();
	}
	
	function appendAll(parent, children) {
		var i;
		for (i = 0; i < children.length; i++) {
			parent.appendChild(children[i]);
		}
	}
	
	//gets the last character in a string or the last element in an array
	function last(thing) {
		return thing.charAt ? thing.charAt(thing.length - 1) : thing[thing.length - 1];
	}

	//array.contains()
	function contains(arr, value, caseInsensitive) {
		var i;
		if (arr.indexOf && !caseInsensitive) {
			return arr.indexOf(value) >= 0;
		}
		
		for (i = 0; i < arr.length; i++) {
			if (arr[i] === value) {
				return true;
			}

			if (caseInsensitive && typeof(arr[i]) === "string" && typeof(value) === "string" && arr[i].toUpperCase() === value.toUpperCase()) {
				return true;
			}
		}

		return false;
	}

	//non-recursively merges one object into the other
	function merge(defaultObject, objectToMerge) {
		var key;
		if (!objectToMerge) {
			return defaultObject;
		}

		for (key in objectToMerge) {
			defaultObject[key] = objectToMerge[key];
		}

		return defaultObject;
	}
	
	function clone(object) {
		return merge({}, object);
	}

	//http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
	function regexEscape(s) {
		return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
	}

	function createProceduralRule(startIndex, direction, tokenRequirements, caseInsensitive) {
		tokenRequirements = tokenRequirements.slice(0);
		return function(tokens) {
			var tokenIndexStart = startIndex,
				j,
				expected,
				actual;
				
			if (direction === 1) {
				tokenRequirements.reverse();
			}

			for (j = 0; j < tokenRequirements.length; j++) {
				actual = tokens[tokenIndexStart + (j * direction)];
				expected = tokenRequirements[tokenRequirements.length - 1 - j];

				if (actual === undefined) {
					if (expected["optional"] !== undefined && expected.optional) {
						tokenIndexStart -= direction;
					} else {
						return false;
					}
				} else if (actual.name === expected.token && (expected["values"] === undefined || contains(expected.values, actual.value, caseInsensitive))) {
					//derp
					continue;
				} else if (expected["optional"] !== undefined && expected.optional) {
					tokenIndexStart -= direction; //we need to reevaluate against this token again
				} else {
					return false;
				}
			}

			return true;
		};
	}

	function createBetweenRule(startIndex, opener, closer, caseInsensitive) {
		return function(tokens) {
			var index = startIndex,
				token,
				success = false;

			//check to the left: if we run into a closer or never run into an opener, fail
			while ((token = tokens[--index]) !== undefined) {
				if (token.name === closer.token && contains(closer.values, token.value)) {
					if (token.name === opener.token && contains(opener.values, token.value, caseInsensitive)) {
						//if the closer is the same as the opener that's okay
						success = true;
						break;
					}

					return false;
				}

				if (token.name === opener.token && contains(opener.values, token.value, caseInsensitive)) {
					success = true;
					break;
				}
			}

			if (!success) {
				return false;
			}

			//check to the right for the closer
			index = startIndex;
			while ((token = tokens[++index]) !== undefined) {
				if (token.name === opener.token && contains(opener.values, token.value, caseInsensitive)) {
					if (token.name === closer.token && contains(closer.values, token.value, caseInsensitive)) {
						//if the closer is the same as the opener that's okay
						success = true;
						break;
					}

					return false;
				}

				if (token.name === closer.token && contains(closer.values, token.value, caseInsensitive)) {
					success = true;
					break;
				}
			}

			return success;
		};
	}

	function matchWord(context, wordMap, tokenName, doNotRead) {
		var current = context.reader.current(),
			i,
			word,
			peek,
			line = context.reader.getLine(),
			column = context.reader.getColumn();
			
		wordMap = wordMap || [];
		if (context.language.caseInsensitive) {
			current = current.toUpperCase();
		}

		if (!wordMap[current]) {
			return null;
		}

		wordMap = wordMap[current];
		for (i = 0; i < wordMap.length; i++) {
			word = wordMap[i].value;

			peek = current + context.reader.peek(word.length);
			if (word === peek || wordMap[i].regex.test(peek)) {
				return context.createToken(
					tokenName,
					context.reader.current() + context.reader[doNotRead ? "peek" : "read"](word.length - 1),
					line,
					column
				);
			}
		}

		return null;
	}

	//gets the next token in the specified direction while matcher matches the current token
	function getNextWhile(tokens, index, direction, matcher) {
		var count = 1, 
			token;
		
		direction = direction || 1;
		while (token = tokens[index + (direction * count++)]) {
			if (!matcher(token)) {
				return token;
			}
		}
		
		return undefined;
	}

	//this is crucial for performance
	function createHashMap(wordMap, boundary, caseInsensitive) {
		//creates a hash table where the hash is the first character of the word
		var newMap = { },
			i,
			word,
			firstChar;
		
		for (i = 0; i < wordMap.length; i++) {
			word = caseInsensitive ? wordMap[i].toUpperCase() : wordMap[i];
			firstChar = word.charAt(0);
			if (!newMap[firstChar]) {
				newMap[firstChar] = [];
			}

			newMap[firstChar].push({ value: word, regex: new RegExp("^" + regexEscape(word) + boundary, caseInsensitive ? "i" : "") });
		}

		return newMap;
	}

	function defaultNumberParser(context) {
		var current = context.reader.current(), 
			number, 
			line = context.reader.getLine(), 
			column = context.reader.getColumn(),
			allowDecimal = true,
			peek;

		if (!/\d/.test(current)) {
			//is it a decimal followed by a number?
			if (current !== "." || !/\d/.test(context.reader.peek())) {
				return null;
			}

			//decimal without leading zero
			number = current + context.reader.read();
			allowDecimal = false;
		} else {
			number = current;
			if (current === "0" && context.reader.peek() !== ".") {
				//hex or octal
				allowDecimal = false;
			}
		}

		//easy way out: read until it's not a number or letter
		//this will work for hex (0xef), octal (012), decimal and scientific notation (1e3)
		//anything else and you're on your own

		while ((peek = context.reader.peek()) !== context.reader.EOF) {
			if (!/[A-Za-z0-9]/.test(peek)) {
				if (peek === "." && allowDecimal && /\d$/.test(context.reader.peek(2))) {
					number += context.reader.read();
					allowDecimal = false;
					continue;
				}
				
				break;
			}

			number += context.reader.read();
		}

		return context.createToken("number", number, line, column);
	}

	function fireEvent(eventName, highlighter, eventContext) {
		var delegates = events[eventName] || [],
			i;
		
		for (i = 0; i < delegates.length; i++) {
			delegates[i].call(highlighter, eventContext);
		}
	}
	
	function Highlighter(options) {
		this.options = merge(clone(globalOptions), options);
	}

	Highlighter.prototype = (function() {
		var parseNextToken = (function() {
			function isIdentMatch(context) {
				return context.language.identFirstLetter && context.language.identFirstLetter.test(context.reader.current());
			}

			//token parsing functions
			function parseKeyword(context) {
				return matchWord(context, context.language.keywords, "keyword");
			}

			function parseCustomTokens(context) {
				var tokenName,
					token;
				if (context.language.customTokens === undefined) {
					return null;
				}

				for (tokenName in context.language.customTokens) {
					token = matchWord(context, context.language.customTokens[tokenName], tokenName);
					if (token !== null) {
						return token;
					}
				}

				return null;
			}

			function parseOperator(context) {
				return matchWord(context, context.language.operators, "operator");
			}

			function parsePunctuation(context) {
				var current = context.reader.current();
				if (context.language.punctuation.test(regexEscape(current))) {
					return context.createToken("punctuation", current, context.reader.getLine(), context.reader.getColumn());
				}

				return null;
			}

			function parseIdent(context) {
				var ident,
					peek,
					line = context.reader.getLine(),
					column = context.reader.getColumn();

				if (!isIdentMatch(context)) {
					return null;
				}

				ident = context.reader.current();
				while ((peek = context.reader.peek()) !== context.reader.EOF) {
					if (!context.language.identAfterFirstLetter.test(peek)) {
						break;
					}

					ident += context.reader.read();
				}

				return context.createToken("ident", ident, line, column);
			}

			function parseDefault(context) {
				if (context.defaultData.text === "") {
					//new default token
					context.defaultData.line = context.reader.getLine();
					context.defaultData.column = context.reader.getColumn();
				}

				context.defaultData.text += context.reader.current();
				return null;
			}

			function parseScopes(context) {
				var current = context.reader.current(),
					tokenName,
					specificScopes,
					j,
					opener,
					line,
					column,
					continuation,
					value;

				for (tokenName in context.language.scopes) {
					specificScopes = context.language.scopes[tokenName];
					for (j = 0; j < specificScopes.length; j++) {
						opener = specificScopes[j][0];

						value = current + context.reader.peek(opener.length - 1);

						if (opener !== value && (!context.language.caseInsensitive || value.toUpperCase() !== opener.toUpperCase())) {
							continue;
						}

						line = context.reader.getLine(), column = context.reader.getColumn();
						context.reader.read(opener.length - 1);
						continuation = getScopeReaderFunction(specificScopes[j], tokenName);
						return continuation(context, continuation, value, line, column);
					}
				}

				return null;
			}

			function parseNumber(context) {
				return context.language.numberParser(context);
			}

			function parseCustomRules(context) {
				var customRules = context.language.customParseRules,
					i,
					token;

				if (customRules === undefined) {
					return null;
				}

				for (i = 0; i < customRules.length; i++) {
					token = customRules[i](context);
					if (token) {
						return token;
					}
				}

				return null;
			}

			return function(context) {
				if (context.language.doNotParse.test(context.reader.current())) {
					return parseDefault(context);
				}

				return parseCustomRules(context)
					|| parseCustomTokens(context)
					|| parseKeyword(context)
					|| parseScopes(context)
					|| parseIdent(context)
					|| parseNumber(context)
					|| parseOperator(context)
					|| parsePunctuation(context)
					|| parseDefault(context);
			}
		}());
		
		function getScopeReaderFunction(scope, tokenName) {
			var escapeSequences = scope[2] || [],
				closerLength = scope[1].length,
				closer = typeof(scope[1]) === "string" ? new RegExp(regexEscape(scope[1])) : scope[1].regex,
				zeroWidth = scope[3] || false;

			//processCurrent indicates that this is being called from a continuation
			//which means that we need to process the current char, rather than peeking at the next
			return function(context, continuation, buffer, line, column, processCurrent) {
				var foundCloser = false;
				buffer = buffer || "";
					
				processCurrent = processCurrent ? 1 : 0;

				function process(processCurrent) {
					//check for escape sequences
					var peekValue,
						current = context.reader.current(),
						i;
					
					for (i = 0; i < escapeSequences.length; i++) {
						peekValue = (processCurrent ? current : "") + context.reader.peek(escapeSequences[i].length - processCurrent);
						if (peekValue === escapeSequences[i]) {
							buffer += context.reader.read(peekValue.length - processCurrent);
							return true;
						}
					}

					peekValue = (processCurrent ? current : "") + context.reader.peek(closerLength - processCurrent);
					if (closer.test(peekValue)) {
						foundCloser = true;
						return false;
					}

					buffer += processCurrent ? current : context.reader.read();
					return true;
				};

				if (!processCurrent || process(true)) {
					while (context.reader.peek() !== context.reader.EOF && process(false)) { }
				}

				if (processCurrent) {
					buffer += context.reader.current();
					context.reader.read();
				} else {
					buffer += zeroWidth || context.reader.peek() === context.reader.EOF ? "" : context.reader.read(closerLength);
				}

				if (!foundCloser) {
					//we need to signal to the context that this scope was never properly closed
					//this has significance for partial parses (e.g. for nested languages)
					context.continuation = continuation;
				}

				return context.createToken(tokenName, buffer, line, column);
			};
		}
		
		//called before processing the current
		function switchToEmbeddedLanguageIfNecessary(context) {
			var i,
				embeddedLanguage;
			
			for (i = 0; i < context.language.embeddedLanguages.length; i++) {
				if (!languages[context.language.embeddedLanguages[i].language]) {
					//unregistered language
					continue;
				}
				
				embeddedLanguage = clone(context.language.embeddedLanguages[i]);
				
				if (embeddedLanguage.switchTo(context)) {
					embeddedLanguage.oldItems = clone(context.items);
					context.embeddedLanguageStack.push(embeddedLanguage);
					context.language = languages[embeddedLanguage.language];
					context.items = merge(context.items, clone(context.language.contextItems));
					break;
				}
			}
		}
		
		//called after processing the current
		function switchBackFromEmbeddedLanguageIfNecessary(context) {
			var current = last(context.embeddedLanguageStack),
				lang;
			
			if (current && current.switchBack(context)) {
				context.language = languages[current.parentLanguage];
				lang = context.embeddedLanguageStack.pop();
				
				//restore old items
				context.items = clone(lang.oldItems);
				lang.oldItems = {};
			}
		}
		
		function tokenize(unhighlightedCode, language, partialContext, options) {
			var tokens = [],
				context,
				continuation,
				token;
				
			fireEvent("beforeTokenize", this, { code: unhighlightedCode, language: language });
			context = {
				reader: createCodeReader(unhighlightedCode),
				language: language,
				items: clone(language.contextItems),
				token: function(index) { return tokens[index]; },
				getAllTokens: function() { return tokens.slice(0); },
				count: function() { return tokens.length; },
				options: options,
				embeddedLanguageStack: [],
				
				defaultData: {
					text: "",
					line: 1,
					column: 1
				},
				createToken: function(name, value, line, column) {
					return {
						name: name,
						line: line,
						value: isIe ? value.replace(/\n/g, "\r") : value,
						column: column,
						language: this.language.name
					};
				}
			};

			//if continuation is given, then we need to pick up where we left off from a previous parse
			//basically it indicates that a scope was never closed, so we need to continue that scope
			if (partialContext.continuation) {
				continuation = partialContext.continuation;
				partialContext.continuation = null;
				tokens.push(continuation(context, continuation, "", context.reader.getLine(), context.reader.getColumn(), true));
			}

			while (!context.reader.isEof()) {
				switchToEmbeddedLanguageIfNecessary(context);
				token = parseNextToken(context);

				//flush default data if needed (in pretty much all languages this is just whitespace)
				if (token !== null) {
					if (context.defaultData.text !== "") {
						tokens.push(context.createToken("default", context.defaultData.text, context.defaultData.line, context.defaultData.column));
						context.defaultData.text = "";
					}

					if (token[0] !== undefined) {
						//multiple tokens
						tokens = tokens.concat(token);
					} else {
						//single token
						tokens.push(token);
					}
				}

				switchBackFromEmbeddedLanguageIfNecessary(context);
				context.reader.read();
			}

			//append the last default token, if necessary
			if (context.defaultData.text !== "") {
				tokens.push(context.createToken("default", context.defaultData.text, context.defaultData.line, context.defaultData.column));
			}

			fireEvent("afterTokenize", this, { code: unhighlightedCode, parserContext: context });
			return context;
		}

		function createAnalyzerContext(parserContext, partialContext, options) {
			var nodes = [],
				prepareText = function() {
					var nbsp, tab;
					if (options.showWhitespace) {
						nbsp = String.fromCharCode(0xB7);
						tab = new Array(options.tabWidth).join(String.fromCharCode(0x2014)) + String.fromCharCode(0x2192);
					} else {
						nbsp = String.fromCharCode(0xA0);
						tab = new Array(options.tabWidth + 1).join(nbsp);
					}
					
					return function(token) {
						var value = token.value.split(" ").join(nbsp),
							tabIndex,
							lastNewlineColumn,
							actualColumn,
							tabLength;
						
						//tabstop madness: replace \t with the appropriate number of characters, depending on the tabWidth option and its relative position in the line
						while ((tabIndex = value.indexOf("\t")) >= 0) {
							lastNewlineColumn = value.lastIndexOf(EOL, tabIndex);
							actualColumn = lastNewlineColumn === -1 ? tabIndex : tabIndex - lastNewlineColumn - 1;
							tabLength = options.tabWidth - (actualColumn % options.tabWidth); //actual length of the TAB character
							
							value = value.substring(0, tabIndex) + tab.substring(options.tabWidth - tabLength) + value.substring(tabIndex + 1);
						}
						
						return value;
					};
				}();

			return {
				tokens: (partialContext.tokens || []).concat(parserContext.getAllTokens()),
				index: partialContext.index ? partialContext.index + 1 : 0,
				language: null,
				getAnalyzer: EMPTY,
				options: options,
				continuation: parserContext.continuation,
				addNode: function(node) { nodes.push(node); },
				createTextNode: function(token) { return document.createTextNode(prepareText(token)); },
				getNodes: function() { return nodes; },
				resetNodes: function() { nodes = []; },
				items: parserContext.items
			};
		}

		//partialContext allows us to perform a partial parse, and then pick up where we left off at a later time
		//this functionality enables nested highlights (language within a language, e.g. PHP within HTML followed by more PHP)
		function highlightText(unhighlightedCode, languageId, partialContext) {
			var language = languages[languageId],
				analyzerContext;
			
			partialContext = partialContext || { };
			if (language === undefined) {
				//use default language if one wasn't specified or hasn't been registered
				language = languages[DEFAULT_LANGUAGE];
			}

			fireEvent("beforeHighlight", this, { code: unhighlightedCode, language: language, previousContext: partialContext });
			
			analyzerContext = createAnalyzerContext(
				tokenize.call(this, unhighlightedCode, language, partialContext, this.options),
				partialContext,
				this.options
			);
			
			analyze.call(this, analyzerContext, partialContext.index ? partialContext.index + 1 : 0);
			
			fireEvent("afterHighlight", this, { analyzerContext: analyzerContext });

			return analyzerContext;
		}
		
		function createContainer(ctx) {
			var container = document.createElement("span");
			container.className = ctx.options.classPrefix + ctx.language.name;
			return container;
		}
		
		function analyze(analyzerContext, startIndex) {
			var nodes,
				lastIndex,
				container,
				i,
				tokenName,
				func,
				language,
				analyzer;
			
			fireEvent("beforeAnalyze", this, { analyzerContext: analyzerContext });
			
			if (analyzerContext.tokens.length > 0) {
				analyzerContext.language = languages[analyzerContext.tokens[0].language] || languages[DEFAULT_LANGUAGE];;
				nodes = [];
				lastIndex = 0;
				container = createContainer(analyzerContext);
				
				for (i = startIndex; i < analyzerContext.tokens.length; i++) {
					language = languages[analyzerContext.tokens[i].language] || languages[DEFAULT_LANGUAGE];
					if (language.name !== analyzerContext.language.name) {
						appendAll(container, analyzerContext.getNodes());
						analyzerContext.resetNodes();
						
						nodes.push(container);
						analyzerContext.language = language;
						container = createContainer(analyzerContext);
					}
					
					analyzerContext.index = i;
					tokenName = analyzerContext.tokens[i].name;
					func = "handle_" + tokenName;

					analyzer = analyzerContext.getAnalyzer.call(analyzerContext) || analyzerContext.language.analyzer;
					analyzer[func] ? analyzer[func](analyzerContext) : analyzer.handleToken(analyzerContext);
				}
				
				//append the last nodes, and add the final nodes to the context
				appendAll(container, analyzerContext.getNodes());
				nodes.push(container);
				analyzerContext.resetNodes();
				for (i = 0; i < nodes.length; i++) {
					analyzerContext.addNode(nodes[i]);
				}
			}
			
			fireEvent("afterAnalyze", this, { analyzerContext: analyzerContext });
		}

		return {
			//matches the language of the node to highlight
			matchSunlightNode: function() {
				var regex;
				
				return function(node) {
					if (!regex) {
						regex = new RegExp("(?:\\s|^)" + this.options.classPrefix + "highlight-(\\S+)(?:\\s|$)");
					}
					
					return regex.exec(node.className);
				};
			}(),
			
			//determines if the node has already been highlighted
			isAlreadyHighlighted: function() {
				var regex;
				return function(node) {
					if (!regex) {
						regex = new RegExp("(?:\\s|^)" + this.options.classPrefix + "highlighted(?:\\s|$)");
					}
					
					return regex.test(node.className);
				};
			}(),
			
			//highlights a block of text
			highlight: function(code, languageId) { return highlightText.call(this, code, languageId); },

			//recursively highlights a DOM node
			highlightNode: function highlightRecursive(node) {
				var match,
					languageId,
					currentNodeCount,
					j,
					nodes,
					k,
					partialContext,
					container,
					codeContainer;
				
				if (this.isAlreadyHighlighted(node) || (match = this.matchSunlightNode(node)) === null) {
					return;
				}

				languageId = match[1];
				currentNodeCount = 0;
				fireEvent("beforeHighlightNode", this, { node: node });
				for (j = 0; j < node.childNodes.length; j++) {
					if (node.childNodes[j].nodeType === 3) {
						//text nodes
						partialContext = highlightText.call(this, node.childNodes[j].nodeValue, languageId, partialContext);
						HIGHLIGHTED_NODE_COUNT++;
						currentNodeCount = currentNodeCount || HIGHLIGHTED_NODE_COUNT;
						nodes = partialContext.getNodes();

						node.replaceChild(nodes[0], node.childNodes[j]);
						for (k = 1; k < nodes.length; k++) {
							node.insertBefore(nodes[k], nodes[k - 1].nextSibling);
						}
					} else if (node.childNodes[j].nodeType === 1) {
						//element nodes
						highlightRecursive.call(this, node.childNodes[j]);
					}
				}

				//indicate that this node has been highlighted
				node.className += " " + this.options.classPrefix + "highlighted";
				
				//if the node is block level, we put it in a container, otherwise we just leave it alone
				if (getComputedStyle(node, "display") === "block") {
					container = document.createElement("div");
					container.className = this.options.classPrefix + "container";
					
					codeContainer = document.createElement("div");
					codeContainer.className = this.options.classPrefix + "code-container";

					//apply max height if specified in options
					if (this.options.maxHeight !== false) {
						codeContainer.style.overflowY = "auto";
						codeContainer.style.maxHeight = this.options.maxHeight + (/^\d+$/.test(this.options.maxHeight) ? "px" : "");
					}
					
					container.appendChild(codeContainer);
					
					node.parentNode.insertBefore(codeContainer, node);
					node.parentNode.removeChild(node);
					codeContainer.appendChild(node);
					
					codeContainer.parentNode.insertBefore(container, codeContainer);
					codeContainer.parentNode.removeChild(codeContainer);
					container.appendChild(codeContainer);
				}
				
				fireEvent("afterHighlightNode", this, { 
					container: container,
					codeContainer: codeContainer,
					node: node, 
					count: currentNodeCount
				});
			}
		};
	}());

	//public facing object
	window.Sunlight = {
		version: "1.22.0",
		Highlighter: Highlighter,
		createAnalyzer: function() { return create(defaultAnalyzer); },
		globalOptions: globalOptions,

		highlightAll: function(options) {
			var highlighter = new Highlighter(options),
				tags = document.getElementsByTagName("*"),
				i;
			
			for (i = 0; i < tags.length; i++) {
				highlighter.highlightNode(tags[i]);
			}
		},

		registerLanguage: function(languageId, languageData) {
			var tokenName,
				embeddedLanguages,
				languageName;
			
			if (!languageId) {
				throw "Languages must be registered with an identifier, e.g. \"php\" for PHP";
			}

			languageData = merge(merge({}, languageDefaults), languageData);
			languageData.name = languageId;

			//transform keywords, operators and custom tokens into a hash map
			languageData.keywords = createHashMap(languageData.keywords || [], "\\b", languageData.caseInsensitive);
			languageData.operators = createHashMap(languageData.operators || [], "", languageData.caseInsensitive);
			for (tokenName in languageData.customTokens) {
				languageData.customTokens[tokenName] = createHashMap(
					languageData.customTokens[tokenName].values,
					languageData.customTokens[tokenName].boundary,
					languageData.caseInsensitive
				);
			}
			
			//convert the embedded language object to an easier-to-use array
			embeddedLanguages = [];
			for (languageName in languageData.embeddedLanguages) {
				embeddedLanguages.push({
					parentLanguage: languageData.name,
					language: languageName,
					switchTo: languageData.embeddedLanguages[languageName].switchTo,
					switchBack: languageData.embeddedLanguages[languageName].switchBack
				});
			}
			
			languageData.embeddedLanguages = embeddedLanguages;

			languages[languageData.name] = languageData;
		},
		
		isRegistered: function(languageId) { return languages[languageId] !== undefined; },
		
		bind: function(event, callback) {
			if (!events[event]) {
				throw "Unknown event \"" + event + "\"";
			}
			
			events[event].push(callback);
		},

		util: {
			last: last,
			regexEscape: regexEscape,
			eol: EOL,
			clone: clone,
			escapeSequences: ["\\n", "\\t", "\\r", "\\\\", "\\v", "\\f"],
			contains: contains,
			matchWord: matchWord,
			createHashMap: createHashMap,
			createBetweenRule: createBetweenRule,
			createProceduralRule: createProceduralRule,
			getNextNonWsToken: function(tokens, index) { return getNextWhile(tokens, index, 1, function(token) { return token.name === "default"; }); },
			getPreviousNonWsToken: function(tokens, index) { return getNextWhile(tokens, index, -1, function(token) { return token.name === "default"; }); },
			getNextWhile: function(tokens, index, matcher) { return getNextWhile(tokens, index, 1, matcher); },
			getPreviousWhile: function(tokens, index, matcher) { return getNextWhile(tokens, index, -1, matcher); },
			whitespace: { token: "default", optional: true },
			getComputedStyle: getComputedStyle
		}
	};

	//register the default language
	window.Sunlight.registerLanguage(DEFAULT_LANGUAGE, { punctuation: /(?!x)x/, numberParser: EMPTY });

}(this, document));


/**
 * Sunlight documentation link plugin
 *
 * This plugin generates hyperlinks to language documentation for certain tokens
 * (e.g. links to php.net for functions).
 *
 * Supported languages:
 *	- PHP (functions and language constructs)
 *	- Ruby (functions)
 *	- Python (functions)
 *	- Perl (functions)
 *	- Lua (functions)
 *
 * Options:
 * 	- enableDocLinks: true/false (default is false)
 */
(function(sunlight, document, undefined){
	if (sunlight === undefined) {
		throw "Include sunlight.js before including plugin files";
	}
	
	var supportedLanguages = {
		php: {
			"function": function(word) { return "http://php.net/" + word; },
			languageConstruct: function(word) { return "http://php.net/" + word; }
		},
		
		ruby: {
			"function": function(word) {
				return "http://www.ruby-doc.org/docs/ruby-doc-bundle/Manual/man-1.4/function.html#" 
					+ word.replace(/!/g, "_bang").replace(/\?/g, "_p");
			}
		},
		
		python: {
			"function": function(word) {
				return "http://docs.python.org/py3k/library/functions.html#" + word;
			}
		},
		
		perl: {
			"function": function(word) { return "http://perldoc.perl.org/functions/" + word + ".html"; }
		},
		
		lua: {
			"function": function(word) { return "http://www.lua.org/manual/5.1/manual.html#pdf-" + word; }
		}
	};
	
	function createLink(transformUrl) {
		return function(context) {
			var link = document.createElement("a");
			link.className = context.options.classPrefix + context.tokens[context.index].name;
			link.setAttribute("href", transformUrl(context.tokens[context.index].value));
			link.appendChild(context.createTextNode(context.tokens[context.index]));
			context.addNode(link);
		};
	}
	
	sunlight.bind("beforeAnalyze", function(context) {
		if (!this.options.enableDocLinks) {
			return;
		}
		
		context.analyzerContext.getAnalyzer = function() {
			var language = supportedLanguages[this.language.name],
				analyzer,
				tokenName;
			
			if (!language) {
				return;
			}
			
			analyzer = sunlight.util.clone(context.analyzerContext.language.analyzer);
			
			for (tokenName in language) {
				if (!language.hasOwnProperty(tokenName)) {
					continue;
				}
				
				analyzer["handle_" + tokenName] = createLink(language[tokenName]);
			}
			
			return analyzer;
		};
		
	});
	
	sunlight.globalOptions.enableDocLinks = false;
	
}(this["Sunlight"], document));


/**
 * Sunlight line number/line highlighting plugin
 *
 * This creates the line number gutter in addition to creating the line highlighting
 * overlay (if applicable). It is bundled in sunlight-min.js.
 *
 * Options:
 * 	- lineNumbers: true/false/"automatic" (default is "automatic")
 * 	- lineNumberStart: <number> (line number to start from, default is 1)
 *	- lineHighlight: <array> (array of line numbers to highlight)
 */
(function(sunlight, document, undefined){
	if (sunlight === undefined) {
		throw "Include sunlight.js before including plugin files";
	}
	
	function getLineCount(node) {
		//browsers don't render the last trailing newline, so we make sure that the line numbers reflect that
		//by disregarding the last trailing newline
		
		//get the last text node
		var lastTextNode = function getLastNode(node) {
			if (!node.lastChild) {
				return null;
			}
			
			if (node.lastChild.nodeType === 3) {
				return node.lastChild;
			}
			
			return getLastNode(node.lastChild);
		}(node) || { lastChild: "" };
		
		return node.innerHTML.replace(/[^\n]/g, "").length - /\n$/.test(lastTextNode.nodeValue);
	}
	
	sunlight.bind("afterHighlightNode", function(context) {
		var lineContainer,
			lineCount,
			lineHighlightOverlay,
			currentLineOverlay,
			lineHighlightingEnabled,
			i,
			eol,
			link,
			name;
		
		if (!this.options.lineNumbers) {
			return;
		}
		
		if (this.options.lineNumbers === "automatic" && sunlight.util.getComputedStyle(context.node, "display") !== "block") {
			//if it's not a block level element or the lineNumbers option is not set to "automatic"
			return;
		}
		
		lineContainer = document.createElement("pre");
		lineCount = getLineCount(context.node);
		
		lineHighlightingEnabled = this.options.lineHighlight.length > 0;
		if (lineHighlightingEnabled) {
			lineHighlightOverlay = document.createElement("div");
			lineHighlightOverlay.className = this.options.classPrefix + "line-highlight-overlay";
		}
		
		lineContainer.className = this.options.classPrefix + "line-number-margin";

		eol = document.createTextNode(sunlight.util.eol)
		for (i = this.options.lineNumberStart; i <= this.options.lineNumberStart + lineCount; i++) {
			link = document.createElement("a");
			name = (context.node.id ? context.node.id : this.options.classPrefix + context.count) + "-line-" + i;
			
			link.setAttribute("name", name);
			link.setAttribute("href", "#" + name);
			
			link.appendChild(document.createTextNode(i));
			lineContainer.appendChild(link);
			lineContainer.appendChild(eol.cloneNode(false));
			
			if (lineHighlightingEnabled) {
				currentLineOverlay = document.createElement("div");
				if (sunlight.util.contains(this.options.lineHighlight, i)) {
					currentLineOverlay.className = this.options.classPrefix + "line-highlight-active";
				}
				lineHighlightOverlay.appendChild(currentLineOverlay);
			}
		}

		context.codeContainer.insertBefore(lineContainer, context.codeContainer.firstChild);
		
		if (lineHighlightingEnabled) {
			context.codeContainer.appendChild(lineHighlightOverlay);
		}
		
		//enable the border on the code container
		context.codeContainer.style.borderWidth = "1px";
		context.codeContainer.style.borderStyle = "solid";
	});
	
	sunlight.globalOptions.lineNumbers = "automatic";
	sunlight.globalOptions.lineNumberStart = 1;
	sunlight.globalOptions.lineHighlight = [];
	
}(this["Sunlight"], document));


/**
 * Sunlight menu plugin
 *
 * This creates the menu in the upper right corner for block-level elements.
 * This plugin is not supported for IE6.
 *
 * Options:
 * 	- showMenu: true/false (default is false)
 * 	- autoCollapse: true/false (default is false)
 */
(function(sunlight, document, undefined){
	if (sunlight === undefined) {
		throw "Include sunlight.js before including plugin files";
	}
	
	//http://dean.edwards.name/weblog/2007/03/sniff/#comment83695
	//eval()'d so that it compresses correctly
	var ieVersion = eval("0 /*@cc_on+ScriptEngineMajorVersion()@*/");
	
	function createLink(href, title, text) {
		var link = document.createElement("a");
		link.setAttribute("href", href);
		link.setAttribute("title", title);
		if (text) {
			link.appendChild(document.createTextNode(text));
		}
		return link;
	}
	
	function getTextRecursive(node) {
		var text = "",
			i = 0;
		
		if (node.nodeType === 3) {
			return node.nodeValue;
		}
		
		text = "";
		for (i = 0; i < node.childNodes.length; i++) {
			text += getTextRecursive(node.childNodes[i]);
		}
		
		return text;
	}
	
	sunlight.bind("afterHighlightNode", function(context) {
		var menu,
			sunlightIcon,
			ul,
			collapse,
			mDash,
			collapseLink,
			viewRaw,
			viewRawLink,
			about,
			aboutLink,
			icon;
		
		if ((ieVersion && ieVersion < 7) || !this.options.showMenu || sunlight.util.getComputedStyle(context.node, "display") !== "block") {
			return;
		}
		
		menu = document.createElement("div");
		menu.className = this.options.classPrefix + "menu";
		
		sunlightIcon = 
			"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJ" +
			"cEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAl0lEQVQ4jWP4" +
			"P9n9PyWYgTYGzAr+///Q9P//Ty/HjhfEETDg1oH/YPDgNKbm4wsIuGBO+H84WJJKhhd2dkA0v3tEZhjcPQox4MVN" +
			"7P7fUEHAgM112DX++Qkx+PEFMqPxwSmIAQenkWHAvCicAUucAbCAfX2PQCCCEtDGKkz86RXEgL39BAwAKcAFbh/6" +
			"/39GIL3yAj0NAAB+LQeDCZ9tvgAAAABJRU5ErkJggg==";
		
		ul = document.createElement("ul");
		
		collapse = document.createElement("li");
		mDash = String.fromCharCode(0x2014);
		collapseLink = createLink("#", "collapse code block", mDash);
		
		collapseLink.onclick = function() {
			var originalHeight = sunlight.util.getComputedStyle(context.codeContainer, "height"),
				originalOverflow = sunlight.util.getComputedStyle(context.codeContainer, "overflowY");
			
			return function() {
				var needsToExpand = sunlight.util.getComputedStyle(context.codeContainer, "height") !== originalHeight;
				
				this.replaceChild(document.createTextNode(needsToExpand ? mDash : "+"), this.firstChild);
				this.setAttribute("title", (needsToExpand ? "collapse" : "expand") + " clode block");
				context.codeContainer.style.height = needsToExpand ? originalHeight : "0px";
				context.codeContainer.style.overflowY = needsToExpand ? originalOverflow : "hidden";
				
				return false;
			}
		}();
		
		collapse.appendChild(collapseLink);
		
		viewRaw = document.createElement("li");
		viewRawLink = createLink("#", "view raw code", "raw");
		viewRawLink.onclick = function() {
			var textarea;
			return function() {
				var rawCode;
				
				if (textarea) {
					textarea.parentNode.removeChild(textarea);
					textarea = null;
					context.node.style.display = "block";
					this.replaceChild(document.createTextNode("raw"), this.firstChild);
					this.setAttribute("title", "view raw code");
				} else {
					//hide the codeContainer, flatten all text nodes, create a <textarea>, append it
					rawCode = getTextRecursive(context.node);
					textarea = document.createElement("textarea");
					textarea.value = rawCode;
					textarea.setAttribute("readonly", "readonly");
					textarea.style.width = (parseInt(sunlight.util.getComputedStyle(context.node, "width")) - 5) + "px"; //IE, Safari and Chrome can't handle the actual width
					textarea.style.height = sunlight.util.getComputedStyle(context.node, "height");
					textarea.style.border = "none";
					textarea.style.overflowX = "hidden"; //IE requires this
					textarea.setAttribute("wrap", "off"); //prevent line wrapping lol
					context.codeContainer.insertBefore(textarea, context.node);
					context.node.style.display = "none";
					
					this.replaceChild(document.createTextNode("highlighted"), this.firstChild);
					this.setAttribute("title", "view highlighted code");
					textarea.select(); //highlight everything
				}
				
				return false;
			}
		}();
		
		viewRaw.appendChild(viewRawLink);
		
		about = document.createElement("li");
		aboutLink = createLink("http://sunlightjs.com/", "Sunlight: JavaScript syntax highlighter by Tommy Montgomery");
		
		icon = document.createElement("img");
		icon.setAttribute("src", "data:image/png;base64," + sunlightIcon);
		icon.setAttribute("alt", "about");
		aboutLink.appendChild(icon);
		about.appendChild(aboutLink);
		
		ul.appendChild(about);
		ul.appendChild(viewRaw);
		ul.appendChild(collapse);
		
		menu.appendChild(ul);
		context.container.insertBefore(menu, context.container.firstChild);
		
		if (this.options.autoCollapse) {
			collapseLink.onclick.call(collapseLink);
		}
	});
	
	sunlight.globalOptions.showMenu = false;
	sunlight.globalOptions.autoCollapse = false;
	
}(this["Sunlight"], document));


/**
 * jQuery plugin for Sunlight http://sunlightjs.com/
 *
 * by Tommy Montgomery http://tmont.com/
 * licensed under WTFPL http://sam.zoy.org/wtfpl/
 */
(function($, window){
	
	$.fn.sunlight = function(options) {
		var highlighter = new window.Sunlight.Highlighter(options);
		this.each(function() {
			highlighter.highlightNode(this);
		});
		
		return this;
	};
	
}(jQuery, this));


(function(sunlight, undefined){

	if (sunlight === undefined || sunlight["registerLanguage"] === undefined) {
		throw "Include sunlight.js before including language files";
	}
	
	sunlight.registerLanguage("javascript", {
		keywords: [
			//keywords
			"break", "case", "catch", "continue", "default", "delete", "do", 
			"else",	"finally", "for", "function", "if", "in", "instanceof",
			"new", "return", "switch", "this", "throw", "try", "typeof", 
			"var", "void", "while", "with",
			
			//literals
			"true", "false", "null"
		],
		
		customTokens: {
			reservedWord: {
				values: [
					"abstract", "boolean", "byte", "char", "class", "const", "debugger", "double",
					"enum", "export", "extends", "final", "float", "goto", "implements", "import",
					"int", "interface", "long", "native", "package", "private", "protected", "public",
					"short", "static", "super", "synchronized", "throws", "transient", "volatile"
				],
				boundary: "\\b"
			},
			
			globalVariable: {
				values: ["NaN", "Infinity", "undefined"],
				boundary: "\\b"
			},
			
			globalFunction: {
				values: ["encodeURI", "encodeURIComponent", "decodeURI", "decodeURIComponent", "parseInt", "parseFloat", "isNaN", "isFinite", "eval"],
				boundary: "\\b"
			},
			
			globalObject: {
				values: [
					"Math", "JSON",
					"XMLHttpRequest", "XDomainRequest", "ActiveXObject",
					"Boolean", "Date", "Array", "Image", "Function", "Object", "Number", "RegExp", "String"
				],
				boundary: "\\b"
			}
		},

		scopes: {
			string: [ ["\"", "\"", sunlight.util.escapeSequences.concat(["\\\""])], ["'", "'", sunlight.util.escapeSequences.concat(["\\\'", "\\\\"])] ],
			comment: [ ["//", "\n", null, true], ["/*", "*/"] ]
		},
		
		customParseRules: [
			//regex literal
			function(context) {
				var peek = context.reader.peek(),
					isValid,
					regexLiteral = "/",
					line = context.reader.getLine(),
					column = context.reader.getColumn(),
					charClass = false,
					peek2,
					next;
					
				if (context.reader.current() !== "/" || peek === "/" || peek === "*") {
					//doesn't start with a / or starts with // (comment) or /* (multi line comment)
					return null;
				}
				
				isValid = function() {
					var previousNonWsToken = context.token(context.count() - 1),
						previousToken = null;
					if (context.defaultData.text !== "") {
						previousToken = context.createToken("default", context.defaultData.text); 
					}
					
					if (!previousToken) {
						previousToken = previousNonWsToken;
					}
					
					//first token of the string
					if (previousToken === undefined) {
						return true;
					}
					
					//since JavaScript doesn't require statement terminators, if the previous token was whitespace and contained a newline, then we're good
					if (previousToken.name === "default" && previousToken.value.indexOf("\n") > -1) {
						return true;
					}
					
					if (sunlight.util.contains(["keyword", "ident", "number"], previousNonWsToken.name)) {
						return false;
					}
					if (previousNonWsToken.name === "punctuation" && !sunlight.util.contains(["(", "{", "[", ",", ";"], previousNonWsToken.value)) {
						return false;
					}
					
					return true;
				}();
				
				if (!isValid) {
					return null;
				}
				
				//read the regex literal
				while (context.reader.peek() !== context.reader.EOF) {
					peek2 = context.reader.peek(2);
					if (peek2 === "\\/" || peek2 === "\\\\") {
						//escaped backslash or escaped forward slash
						regexLiteral += context.reader.read(2);
						continue;
					}
					if (peek2 === "\\[" || peek2 === "\\]") {
						regexLiteral += context.reader.read(2);
						continue;
					} else if (next === "[") {
						charClass = true;
					} else if (next === "]") {
						charClass = false;
					}
					
					regexLiteral += (next = context.reader.read());
					if (next === "/" && !charClass) {
						break;
					}
				}
				
				//read the regex modifiers
				//only "g", "i" and "m" are allowed, but for the sake of simplicity we'll just say any alphabetical character is valid
				while (context.reader.peek() !== context.reader.EOF) {
					if (!/[A-Za-z]/.test(context.reader.peek())) {
						break;
					}
					
					regexLiteral += context.reader.read();
				}
				
				return context.createToken("regexLiteral", regexLiteral, line, column);
			}
		],
		
		identFirstLetter: /[$A-Za-z_]/,
		identAfterFirstLetter: /[\w\$]/,
		
		namedIdentRules: {
			follows: [
				[{ token: "keyword", values: ["function"] }, sunlight.util.whitespace]
			]
		},

		operators: [
			//arithmetic
			"++", "+=", "+",
			"--", "-=", "-",
			      "*=", "*",
			      "/=", "/",
			      "%=", "%",

			//boolean
			"&&", "||",

			//bitwise
			"|=",   "|",
			"&=",   "&",
			"^=",   "^",
			">>>=", ">>>", ">>=", ">>",
			"<<=", "<<",

			//inequality
			"<=", "<",
			">=", ">",
			"===", "==", "!==", "!=",

			//unary
			"!", "~",

			//other
			"?", ":", ".", "="
		]
	});
}(this["Sunlight"]));



/*!
 * jQuery.ScrollTo
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @author Ariel Flesler
 * @version 1.4.5
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 *		- A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *		- The string 'max' for go-to-end. 
 * @param {Number, Function} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number, Function} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @desc Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @desc Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */

;(function( $ ){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
		limit:true
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window)._scrollable();
	};

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function(){
		return this.map(function(){
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this._scrollable().each(function(){
			// Null target yields nothing, just like jQuery does
			if (target == null) return;

			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
					if (!targ.length) return;
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					max = $scrollTo.max(elem, axis);

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
				}else{ 
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) == '%' ? 
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if( settings.limit && /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});

			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};

		}).end();
	};
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis ){
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );



/*!
 * jQuery.LocalScroll
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * http://flesler.blogspot.com/2007/10/jquerylocalscroll-10.html
 * @author Ariel Flesler
 * @version 1.2.8
 *
 * @id jQuery.fn.localScroll
 * @param {Object} settings Hash of settings, it is passed in to jQuery.ScrollTo, none is required.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @example $('ul.links').localScroll();
 *
 * @example $('ul.links').localScroll({ filter:'.animated', duration:400, axis:'x' });
 *
 * @example $.localScroll({ target:'#pane', axis:'xy', queue:true, event:'mouseover' });
 *
 * Notes:
 *	- The plugin requires jQuery.ScrollTo.
 *	- The hash of settings, is passed to jQuery.ScrollTo, so the settings are valid for that plugin as well.
 *	- jQuery.localScroll can be used if the desired links, are all over the document, it accepts the same settings.
 *  - If the setting 'lazy' is set to true, then the binding will still work for later added anchors.
 *	- If onBefore returns false, the event is ignored.
 */
;(function( $ ){
	var URI = location.href.replace(/#.*/,''); // local url without hash

	var $localScroll = $.localScroll = function( settings ){
		$('body').localScroll( settings );
	};

	// Many of these defaults, belong to jQuery.ScrollTo, check it's demo for an example of each option.
	// @see http://flesler.demos.com/jquery/scrollTo/
	// The defaults are public and can be overriden.
	$localScroll.defaults = {
		duration:1000, // How long to animate.
		axis:'y', // Which of top and left should be modified.
		event:'click', // On which event to react.
		stop:true, // Avoid queuing animations 
		target: window, // What to scroll (selector or element). The whole window by default.
		reset: true // Used by $.localScroll.hash. If true, elements' scroll is resetted before actual scrolling
		/*
		lock:false, // ignore events if already animating
		lazy:false, // if true, links can be added later, and will still work.
		filter:null, // filter some anchors out of the matched elements.
		hash: false // if true, the hash of the selected link, will appear on the address bar.
		*/
	};

	// If the URL contains a hash, it will scroll to the pointed element
	$localScroll.hash = function( settings ){
		if( location.hash ){
			settings = $.extend( {}, $localScroll.defaults, settings );
			settings.hash = false; // can't be true
			
			if( settings.reset ){
				var d = settings.duration;
				delete settings.duration;
				$(settings.target).scrollTo( 0, settings );
				settings.duration = d;
			}
			scroll( 0, location, settings );
		}
	};

	$.fn.localScroll = function( settings ){
		settings = $.extend( {}, $localScroll.defaults, settings );

		return settings.lazy ?
			// use event delegation, more links can be added later.		
			this.bind( settings.event, function( e ){
				// Could use closest(), but that would leave out jQuery -1.3.x
				var a = $([e.target, e.target.parentNode]).filter(filter)[0];
				// if a valid link was clicked
				if( a )
					scroll( e, a, settings ); // do scroll.
			}) :
			// bind concretely, to each matching link
			this.find('a,area')
				.filter( filter ).bind( settings.event, function(e){
					scroll( e, this, settings );
				}).end()
			.end();

		function filter(){// is this a link that points to an anchor and passes a possible filter ? href is checked to avoid a bug in FF.
			return !!this.href && !!this.hash && this.href.replace(this.hash,'') == URI && (!settings.filter || $(this).is( settings.filter ));
		};
	};

	function scroll( e, link, settings ){
		var id = link.hash.slice(1),
			elem = document.getElementById(id) || document.getElementsByName(id)[0];

		if ( !elem )
			return;

		if( e )
			e.preventDefault();

		var $target = $( settings.target );

		if( settings.lock && $target.is(':animated') ||
			settings.onBefore && settings.onBefore(e, elem, $target) === false ) 
			return;

		if( settings.stop )
			$target._scrollable().stop(true); // remove all its animations

		if( settings.hash ){
			var attr = elem.id == id ? 'id' : 'name',
				$a = $('<a> </a>').attr(attr, id).css({
					position:'absolute',
					top: $(window).scrollTop(),
					left: $(window).scrollLeft()
				});

			elem[attr] = '';
			$('body').prepend($a);
			location = link.hash;
			$a.remove();
			elem[attr] = id;
		}
			
		$target
			.scrollTo( elem, settings ) // do scroll
			.trigger('notify.serialScroll',[elem]); // notify serialScroll about this change
	};

})( jQuery );


(function($) {
$.fn.toc = function(options) {
  var self = this;
  var opts = $.extend({}, jQuery.fn.toc.defaults, options);

  var container = $(opts.container);
  var headings = $(opts.selectors, container);
  var headingOffsets = [];
  var activeClassName = opts.prefix+'-active';

  var scrollTo = function(e) {
    if (opts.smoothScrolling) {
      e.preventDefault();
      var elScrollTo = $(e.target).attr('href');
      var $el = $(elScrollTo);

      $('body,html').animate({ scrollTop: $el.offset().top }, 400, 'swing', function() {
        location.hash = elScrollTo;
      });
    }
    $('li', self).removeClass(activeClassName);
    $(e.target).parent().addClass(activeClassName);
  };

  //highlight on scroll
  var timeout;
  var highlightOnScroll = function(e) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function() {
      var top = $(window).scrollTop(),
        highlighted;
      for (var i = 0, c = headingOffsets.length; i < c; i++) {
        if (headingOffsets[i] >= top) {
          $('li', self).removeClass(activeClassName);
          highlighted = $('li:eq('+(i-1)+')', self).addClass(activeClassName);
          opts.onHighlight(highlighted);
          break;
        }
      }
    }, 50);
  };
  if (opts.highlightOnScroll) {
    $(window).bind('scroll', highlightOnScroll);
    highlightOnScroll();
  }

  //Perform search and hide unmatched elements
  var tocList;
  var treeObject = {};

  //Create the tree
  var createTree = function(ul) {
    var prevLevel = {level: -1, index: -1, parent: -1, val: ''};
    var levelParent = {0: -1};
    tocList = ul.children("li");
    tocList.each(function(i) {
      var me = $(this).removeClass("toc-active");
      var currentLevel = parseInt(me.attr('class').trim().slice(-1));
      if (currentLevel > prevLevel.level) {
        currentParent = prevLevel.index;
      } else if (currentLevel == prevLevel.level) {
        currentParent = prevLevel.parent;
      } else if (currentLevel < prevLevel.level) {
        currentParent = levelParent[currentLevel] || prevLevel.parent;
      }
      levelParent[currentLevel] = currentParent;
      var currentVal = $('a', this).text().trim().toLowerCase();
      treeObject[i] = {
        val: currentVal,
        level: currentLevel,
        parent: currentParent
      }
      prevLevel = {index: i, val: currentVal, level: currentLevel, parent: currentParent};
    });
  }

  //Show the parents recursively
  var showParents = function(key) {
    var me = treeObject[key];
    if (me.parent > -1) {
      $(tocList[me.parent]).show();
      showParents(me.parent);
    }
  };

  //Perform the search
  var search = function(searchVal) {
    searchVal = searchVal.trim().toLowerCase();
    for (var key in treeObject) {
      var me = treeObject[key];
      if (me.val.indexOf(searchVal) !== -1 || searchVal.length == 0) {
        $(tocList[key]).show();
        if ($(tocList[me.parent]).is(":hidden")) {
         showParents(key);
        }
      } else {
        $(tocList[key]).hide();
      }
    }
  }

  return this.each(function() {
    //build TOC
    var el = $(this);
    var searchVal = '';
    var searchForm = $("<form/>", {class: "form-search quick-search"})
      .append($("<input/>", {type: "text", class: "input-medium search-query", placeholder: "Quick Search"}))
      .append($("<i/>", {class: "icon icon-search search-icon"}));
    searchForm.css({'position': 'fixed', 'top': '45px', 'padding-right': '20px'});
    $(".search-icon", searchForm).css({'marginLeft': '-20px', 'marginTop': '3px'});

    var ul = $('<ul/>');
    headings.each(function(i, heading) {
      var $h = $(heading);
      headingOffsets.push($h.offset().top - opts.highlightOffset);

      //add anchor
      var anchor = $('<span/>').attr('id', opts.anchorName(i, heading, opts.prefix)).insertBefore($h);

      //build TOC item
      var a = $('<a/>')
        .text(opts.headerText(i, heading, $h))
        .attr('href', '#' + opts.anchorName(i, heading, opts.prefix))
        .bind('click', function(e) { 
          scrollTo(e);
          el.trigger('selected', $(this).attr('href'));
        });

      var li = $('<li/>')
        .addClass(opts.itemClass(i, heading, $h, opts.prefix))
        .append(a);

      ul.append(li);
    });
    el.html(ul);
    el.parent().prepend(searchForm);
    el.css({'top': '80px'});

    //create the tree
    createTree(ul)
    //set intent timer
    var intentTimer;
    var accumulatedTime = 0;
    //bind quick search
    el.siblings('.quick-search').children('.search-query').bind('keyup', function(e) {
      if (accumulatedTime < 1000) {
        window.clearTimeout(intentTimer);
      }
      var me = $(this);

      if (me.val().length > 0) {
        $(".search-icon").removeClass("icon-search").addClass("icon-remove-circle").css('cursor', 'pointer');
      } else {
        $(".search-icon").removeClass("icon-remove-circle").addClass("icon-search").css('cursor', 'auto');
      }

      var intentTime = 500 - (me.val().length * 10);
      accumulatedTime += intentTime;
      intentTimer = window.setTimeout(function() {
        if (searchVal == me.val()) {
          return false;
        }
        searchVal = me.val();
        search(me.val());
        accumulatedTime = 0;
      }, intentTime);
    });

    // Make text clear icon work
    $(".search-icon").click(function(e) {
      if($(this).hasClass('icon-remove-circle')) {
        $('.search-query').val('').trigger('keyup');
      } else {
        $('.search-query').focus();
      }
    });

    //set positions of search box and TOC
    var navHeight = $(".navbar").height();
    var searchHeight = $(".quick-search").height();
    $(".quick-search").css({'top': navHeight + 10 + 'px', 'position': 'fixed'});
    el.css('top', navHeight + searchHeight + 15 + 'px');
  });
};


jQuery.fn.toc.defaults = {
  container: 'body',
  selectors: 'h1,h2,h3',
  smoothScrolling: true,
  prefix: 'toc',
  onHighlight: function() {},
  highlightOnScroll: true,
  highlightOffset: 100,
  anchorName: function(i, heading, prefix) {
    return prefix+i;
  },
  headerText: function(i, heading, $heading) {
    return $heading.text();
  },
  itemClass: function(i, heading, $heading, prefix) {
    return prefix + '-' + $heading[0].tagName.toLowerCase();
  }

};

})(jQuery);



/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.8.3
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.com/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */
(function(root, factory) {
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof exports === 'object') {
    // Node
    module.exports = factory(require('./punycode'), require('./IPv6'), require('./SecondLevelDomains'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['./punycode', './IPv6', './SecondLevelDomains'], factory);
  } else {
    // Browser globals (root is window)
    root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains);
  }
}(this, function(punycode, IPv6, SLD) {
  "use strict";

  function URI(url, base) {
    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URI)) {
      return new URI(url, base);
    }
    if (url === undefined) {
      if (typeof location !== 'undefined') {
        url = location.href + "";
      } else {
        url = "";
      }
    }
    this.href(url);
    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
    if (base !== undefined) {
      return this.absoluteTo(base);
    }
    return this;
  };
  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;

  function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }

  function isArray(obj) {
    return String(Object.prototype.toString.call(obj)) === "[object Array]";
  }

  function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;
    if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }
    for (i = 0, length = data.length; i < length; i++) {
      if (lookup[data[i]] !== undefined) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }
    return data;
  }
  URI._parts = function() {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      // state
      duplicateQueryParameters: URI.duplicateQueryParameters
    };
  };
  // state: allow duplicate query parameters (a=1&a=1)
  URI.duplicateQueryParameters = false;
  // static properties
  URI.protocol_expression = /^[a-z][a-z0-9-+-]*$/i;
  URI.idn_expression = /[^a-z0-9\.-]/i;
  URI.punycode_expression = /(xn--)/i;
  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  // credits to Rich Brown
  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
  // specification: http://www.ietf.org/rfc/rfc4291.txt
  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  // gruber revised expression - http://rodneyrehm.de/t/url-regex.html
  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  // http://www.iana.org/assignments/uri-schemes.html
  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
  URI.defaultPorts = {
    http: "80",
    https: "443",
    ftp: "21",
    gopher: "70",
    ws: "80",
    wss: "443"
  };
  // allowed hostname characters according to RFC 3986
  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . -
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
  // encoding / decoding according to RFC3986

  function strictEncodeURIComponent(string) {
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string).replace(/[!'()*]/g, escape).replace(/\*/g, "%2A");
  }
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function() {
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function() {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.characters = {
    pathname: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: {
          // -._~!'()*
          "%24": "$",
          "%26": "&",
          "%2B": "+",
          "%2C": ",",
          "%3B": ";",
          "%3D": "=",
          "%3A": ":",
          "%40": "@"
        }
      },
      decode: {
        expression: /[\/\?#]/g,
        map: {
          "/": "%2F",
          "?": "%3F",
          "#": "%23"
        }
      }
    },
    reserved: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: {
          // gen-delims
          "%3A": ":",
          "%2F": "/",
          "%3F": "?",
          "%23": "#",
          "%5B": "[",
          "%5D": "]",
          "%40": "@",
          // sub-delims
          "%21": "!",
          "%24": "$",
          "%26": "&",
          "%27": "'",
          "%28": "(",
          "%29": ")",
          "%2A": "*",
          "%2B": "+",
          "%2C": ",",
          "%3B": ";",
          "%3D": "="
        }
      }
    }
  };
  URI.encodeQuery = function(string) {
    return URI.encode(string + "").replace(/%20/g, '+');
  };
  URI.decodeQuery = function(string) {
    return URI.decode((string + "").replace(/\+/g, '%20'));
  };
  URI.recodePath = function(string) {
    var segments = (string + "").split('/');
    for (var i = 0, length = segments.length; i < length; i++) {
      segments[i] = URI.encodePathSegment(URI.decode(segments[i]));
    }
    return segments.join('/');
  };
  URI.decodePath = function(string) {
    var segments = (string + "").split('/');
    for (var i = 0, length = segments.length; i < length; i++) {
      segments[i] = URI.decodePathSegment(segments[i]);
    }
    return segments.join('/');
  };
  // generate encode/decode path functions
  var _parts = {
    'encode': 'encode',
    'decode': 'decode'
  };
  var _part;
  var generateAccessor = function(_group, _part) {
    return function(string) {
      return URI[_part](string + "").replace(URI.characters[_group][_part].expression, function(c) {
        return URI.characters[_group][_part].map[c];
      });
    };
  };
  for (_part in _parts) {
    URI[_part + "PathSegment"] = generateAccessor("pathname", _parts[_part]);
  }
  URI.encodeReserved = generateAccessor("reserved", "encode");
  URI.parse = function(string, parts) {
    var pos, t;
    if (!parts) {
      parts = {};
    }
    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]
    // extract fragment
    pos = string.indexOf('#');
    if (pos > -1) {
      // escaping?
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }
    // extract query
    pos = string.indexOf('?');
    if (pos > -1) {
      // escaping?
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }
    // extract protocol
    if (string.substring(0, 2) === '//') {
      // relative-scheme
      parts.protocol = '';
      string = string.substring(2);
      // extract "user:pass@host:port"
      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(':');
      if (pos > -1) {
        parts.protocol = string.substring(0, pos);
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          // : may be within the path
          parts.protocol = undefined;
        } else if (parts.protocol === 'file') {
          // the file scheme: does not contain an authority
          string = string.substring(pos + 3);
        } else if (string.substring(pos + 1, pos + 3) === '//') {
          string = string.substring(pos + 3);
          // extract "user:pass@host:port"
          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    }
    // what's left must be the path
    parts.path = string;
    // and we're done
    return parts;
  };
  URI.parseHost = function(string, parts) {
    // extract host:port
    var pos = string.indexOf('/');
    var bracketPos;
    var t;
    if (pos === -1) {
      pos = string.length;
    }
    if (string[0] === "[") {
      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
    } else if (string.indexOf(':') !== string.lastIndexOf(':')) {
      // IPv6 host contains multiple colons - but no port
      // this notation is actually not allowed by RFC 3986, but we're a liberal parser
      parts.hostname = string.substring(0, pos) || null;
      parts.port = null;
    } else {
      t = string.substring(0, pos).split(':');
      parts.hostname = t[0] || null;
      parts.port = t[1] || null;
    }
    if (parts.hostname && string.substring(pos)[0] !== '/') {
      pos++;
      string = "/" + string;
    }
    return string.substring(pos) || '/';
  };
  URI.parseAuthority = function(string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function(string, parts) {
    // extract username:password
    var pos = string.indexOf('@');
    var firstSlash = string.indexOf('/');
    var t;
    // authority@ must come before /path
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }
    return string;
  };
  URI.parseQuery = function(string) {
    if (!string) {
      return {};
    }
    // throw out the funky business - "?"[name"="value"&"]+
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');
    if (!string) {
      return {};
    }
    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;
    for (var i = 0; i < length; i++) {
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift());
      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
      value = v.length ? URI.decodeQuery(v.join('=')) : null;
      if (items[name]) {
        if (typeof items[name] === "string") {
          items[name] = [items[name]];
        }
        items[name].push(value);
      } else {
        items[name] = value;
      }
    }
    return items;
  };
  URI.build = function(parts) {
    var t = "";
    if (parts.protocol) {
      t += parts.protocol + ":";
    }
    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
    }
    t += (URI.buildAuthority(parts) || '');
    if (typeof parts.path === "string") {
      if (parts.path[0] !== '/' && typeof parts.hostname === "string") {
        t += '/';
      }
      t += parts.path;
    }
    if (typeof parts.query === "string" && parts.query) {
      t += '?' + parts.query;
    }
    if (typeof parts.fragment === "string" && parts.fragment) {
      t += '#' + parts.fragment;
    }
    return t;
  };
  URI.buildHost = function(parts) {
    var t = "";
    if (!parts.hostname) {
      return "";
    } else if (URI.ip6_expression.test(parts.hostname)) {
      if (parts.port) {
        t += "[" + parts.hostname + "]:" + parts.port;
      } else {
        // don't know if we should always wrap IPv6 in []
        // the RFC explicitly says SHOULD, not MUST.
        t += parts.hostname;
      }
    } else {
      t += parts.hostname;
      if (parts.port) {
        t += ':' + parts.port;
      }
    }
    return t;
  };
  URI.buildAuthority = function(parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function(parts) {
    var t = "";
    if (parts.username) {
      t += URI.encode(parts.username);
      if (parts.password) {
        t += ':' + URI.encode(parts.password);
      }
      t += "@";
    }
    return t;
  };
  URI.buildQuery = function(data, duplicates) {
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type
    var t = "";
    var unique, key, i, length;
    for (key in data) {
      if (hasOwn.call(data, key) && key) {
        if (isArray(data[key])) {
          unique = {};
          for (i = 0, length = data[key].length; i < length; i++) {
            if (data[key][i] !== undefined && unique[data[key][i] + ""] === undefined) {
              t += "&" + URI.buildQueryParameter(key, data[key][i]);
              if (duplicates !== true) {
                unique[data[key][i] + ""] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += '&' + URI.buildQueryParameter(key, data[key]);
        }
      }
    }
    return t.substring(1);
  };
  URI.buildQueryParameter = function(name, value) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name) + (value !== null ? "=" + URI.encodeQuery(value) : "");
  };
  URI.addQuery = function(data, name, value) {
    if (typeof name === "object") {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === "string") {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === "string") {
        data[name] = [data[name]];
      }
      if (!isArray(value)) {
        value = [value];
      }
      data[name] = data[name].concat(value);
    } else {
      throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
    }
  };
  URI.removeQuery = function(data, name, value) {
    var i, length, key;
    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (typeof name === "object") {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === "string") {
      if (value !== undefined) {
        if (data[name] === value) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError("URI.addQuery() accepts an object, string as the first parameter");
    }
  };
  URI.commonPath = function(one, two) {
    var length = Math.min(one.length, two.length);
    var pos;
    // find first non-matching character
    for (pos = 0; pos < length; pos++) {
      if (one[pos] !== two[pos]) {
        pos--;
        break;
      }
    }
    if (pos < 1) {
      return one[0] === two[0] && one[0] === '/' ? '/' : '';
    }
    // revert to last /
    if (one[pos] !== '/') {
      pos = one.substring(0, pos).lastIndexOf('/');
    }
    return one.substring(0, pos + 1);
  };
  URI.withinString = function(string, callback) {
    // expression used is "gruber revised" (@gruber v2) determined to be the best solution in
    // a regex sprint we did a couple of ages ago at
    // * http://mathiasbynens.be/demo/url-regex
    // * http://rodneyrehm.de/t/url-regex.html
    return string.replace(URI.find_uri_expression, callback);
  };
  URI.ensureValidHostname = function(v) {
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js
    if (v.match(URI.invalid_hostname_characters)) {
      // test punycode
      if (!punycode) {
        throw new TypeError("Hostname '" + v + "' contains characters other than [A-Z0-9.-] and Punycode.js is not available");
      }
      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError("Hostname '" + v + "' contains characters other than [A-Z0-9.-]");
      }
    }
  };
  p.build = function(deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }
    return this;
  };
  p.clone = function() {
    return new URI(this);
  };
  p.valueOf = p.toString = function() {
    return this.build(false)._string;
  };
  // generate simple accessors
  _parts = {
    protocol: 'protocol',
    username: 'username',
    password: 'password',
    hostname: 'hostname',
    port: 'port'
  };
  generateAccessor = function(_part) {
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || "";
      } else {
        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  };
  for (_part in _parts) {
    p[_part] = generateAccessor(_parts[_part]);
  }
  // generate accessors with optionally prefixed input
  _parts = {
    query: '?',
    fragment: '#'
  };
  generateAccessor = function(_part, _key) {
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || "";
      } else {
        if (v !== null) {
          v = v + "";
          if (v[0] === _key) {
            v = v.substring(1);
          }
        }
        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  };
  for (_part in _parts) {
    p[_part] = generateAccessor(_part, _parts[_part]);
  }
  // generate accessors with prefixed output
  _parts = {
    search: ['?', 'query'],
    hash: ['#', 'fragment']
  };
  generateAccessor = function(_part, _key) {
    return function(v, build) {
      var t = this[_part](v, build);
      return typeof t === "string" && t.length ? (_key + t) : t;
    };
  };
  for (_part in _parts) {
    p[_part] = generateAccessor(_parts[_part][1], _parts[_part][0]);
  }
  p.pathname = function(v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.urn ? '' : '/');
      return v ? URI.decodePath(res) : res;
    } else {
      this._parts.path = v ? URI.recodePath(v) : "/";
      this.build(!build);
      return this;
    }
  };
  p.path = p.pathname;
  p.href = function(href, build) {
    var key;
    if (href === undefined) {
      return this.toString();
    }
    this._string = "";
    this._parts = URI._parts();
    var _URI = href instanceof URI;
    var _object = typeof href === "object" && (href.hostname || href.path);
    // window.location is reported to be an object, but it's not the sort
    // of object we're looking for: 
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick 
    // (for location, not for everything...)
    if (!_URI && _object && Object.prototype.toString.call(href) !== "[object Object]") {
      href = href.toString();
    }
    if (typeof href === "string") {
      this._parts = URI.parse(href, this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;
      for (key in src) {
        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }
    } else {
      throw new TypeError("invalid input");
    }
    this.build(!build);
    return this;
  };
  // identification accessors
  p.is = function(what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;
    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }
    switch (what.toLowerCase()) {
    case 'relative':
      return relative;
    case 'absolute':
      return !relative;
      // hostname identification
    case 'domain':
    case 'name':
      return name;
    case 'sld':
      return sld;
    case 'ip':
      return ip;
    case 'ip4':
    case 'ipv4':
    case 'inet4':
      return ip4;
    case 'ip6':
    case 'ipv6':
    case 'inet6':
      return ip6;
    case 'idn':
      return idn;
    case 'url':
      return !this._parts.urn;
    case 'urn':
      return !!this._parts.urn;
    case 'punycode':
      return punycode;
    }
    return null;
  };
  // component specific input validation
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;
  p.protocol = function(v, build) {
    if (v !== undefined) {
      if (v) {
        // accept trailing ://
        v = v.replace(/:(\/\/)?$/, '');
        if (v.match(/[^a-zA-z0-9\.+-]/)) {
          throw new TypeError("Protocol '" + v + "' contains characters other than [A-Z0-9.+-]");
        }
      }
    }
    return _protocol.call(this, v, build);
  };
  p.scheme = p.protocol;
  p.port = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }
      if (v) {
        v += "";
        if (v[0] === ":") {
          v = v.substring(1);
        }
        if (v.match(/[^0-9]/)) {
          throw new TypeError("Port '" + v + "' contains characters other than [0-9]");
        }
      }
    }
    return _port.call(this, v, build);
  };
  p.hostname = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v !== undefined) {
      var x = {};
      URI.parseHost(v, x);
      v = x.hostname;
    }
    return _hostname.call(this, v, build);
  };
  // compound accessors
  p.host = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : "";
    } else {
      URI.parseHost(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.authority = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : "";
    } else {
      URI.parseAuthority(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.userinfo = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined) {
      if (!this._parts.username) {
        return "";
      }
      var t = URI.buildUserinfo(this._parts);
      return t.substring(0, t.length - 1);
    } else {
      if (v[v.length - 1] !== '@') {
        v += '@';
      }
      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function(v, build) {
    var parts;
    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }
    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  };
  // fraction accessors
  p.subdomain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    // convenience, return "www" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return "";
      }
      // grab domain and add another segment
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || "";
    } else {
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(sub));
      if (v && v[v.length - 1] !== '.') {
        v += ".";
      }
      if (v) {
        URI.ensureValidHostname(v);
      }
      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.domain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }
    // convenience, return "example.org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return "";
      }
      // if hostname consists of 1 or 2 segments, it must be the domain
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) {
        return this._parts.hostname;
      }
      // grab tld and add another segment
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end - 1) + 1;
      return this._parts.hostname.substring(end) || "";
    } else {
      if (!v) {
        throw new TypeError("cannot set domain empty");
      }
      URI.ensureValidHostname(v);
      if (!this._parts.hostname || this.is('IP')) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + "$");
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }
      this.build(!build);
      return this;
    }
  };
  p.tld = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }
    // return "org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return "";
      }
      var pos = this._parts.hostname.lastIndexOf('.');
      var tld = this._parts.hostname.substring(pos + 1);
      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }
      return tld;
    } else {
      var replace;
      if (!v) {
        throw new TypeError("cannot set TLD empty");
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + "$");
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError("TLD '" + v + "' contains characters other than [A-Z0-9]");
        }
      } else if (!this._parts.hostname || this.is('IP')) {
        throw new ReferenceError("cannot set TLD on non-domain host");
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + "$");
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }
      this.build(!build);
      return this;
    }
  };
  p.directory = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return '';
      }
      if (this._parts.path === '/') {
        return '/';
      }
      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? "/" : "");
      return v ? URI.decodePath(res) : res;
    } else {
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(directory));
      // fully qualifier directories begin with a slash
      if (!this.is('relative')) {
        if (!v) {
          v = '/';
        }
        if (v[0] !== '/') {
          v = "/" + v;
        }
      }
      // directories always end with a slash
      if (v && v[v.length - 1] !== '/') {
        v += '/';
      }
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.filename = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return "";
      }
      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos + 1);
      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;
      if (v[0] === '/') {
        v = v.substring(1);
      }
      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }
      var replace = new RegExp(escapeRegEx(this.filename()) + "$");
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }
      return this;
    }
  };
  p.suffix = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return "";
      }
      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s, res;
      if (pos === -1) {
        return "";
      }
      // suffix may only contain alnum characters (yup, I made this up.)
      s = filename.substring(pos + 1);
      res = (/^[a-z0-9%]+$/i).test(s) ? s : "";
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v[0] === '.') {
        v = v.substring(1);
      }
      var suffix = this.suffix();
      var replace;
      if (!suffix) {
        if (!v) {
          return this;
        }
        this._parts.path += '.' + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx("." + suffix) + "$");
      } else {
        replace = new RegExp(escapeRegEx(suffix) + "$");
      }
      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }
      this.build(!build);
      return this;
    }
  };
  p.segment = function(segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);
    if (typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }
    if (segment !== undefined && typeof segment !== 'number') {
      throw new Error("Bad segment '" + segment + "', must be 0-based integer");
    }
    if (absolute) {
      segments.shift();
    }
    if (segment < 0) {
      // allow negative indexes to address from the end
      segment = Math.max(segments.length + segment, 0);
    }
    if (v === undefined) {
      return segment === undefined ? segments : segments[segment];
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = v;
      } else if (v || (typeof v === "string" && v.length)) {
        if (segments[segments.length - 1] === "") {
          // empty trailing elements have to be overwritten
          // to prefent results such as /foo//bar
          segments[segments.length - 1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v || (typeof v === "string" && v.length)) {
        segments[segment] = v;
      } else {
        segments.splice(segment, 1);
      }
    }
    if (absolute) {
      segments.unshift("");
    }
    return this.path(segments.join(separator), build);
  };
  // mutating query string
  var q = p.query;
  p.query = function(v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query);
    } else if (v !== undefined && typeof v !== "string") {
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters);
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };
  p.addQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters);
    if (typeof name !== "string") {
      build = value;
    }
    this.build(!build);
    return this;
  };
  p.removeQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters);
    if (typeof name !== "string") {
      build = value;
    }
    this.build(!build);
    return this;
  };
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  // sanitizing URLs
  p.normalize = function() {
    if (this._parts.urn) {
      return this.normalizeProtocol(false).normalizeQuery(false).normalizeFragment(false).build();
    }
    return this.normalizeProtocol(false).normalizeHostname(false).normalizePort(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();
  };
  p.normalizeProtocol = function(build) {
    if (typeof this._parts.protocol === "string") {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }
    return this;
  };
  p.normalizeHostname = function(build) {
    if (this._parts.hostname) {
      if (this.is('IDN') && punycode) {
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      } else if (this.is('IPv6') && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }
      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }
    return this;
  };
  p.normalizePort = function(build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === "string" && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }
    return this;
  };
  p.normalizePath = function(build) {
    if (this._parts.urn) {
      return this;
    }
    if (!this._parts.path || this._parts.path === '/') {
      return this;
    }
    var _was_relative;
    var _was_relative_prefix;
    var _path = this._parts.path;
    var _parent, _pos;
    // handle relative paths
    if (_path[0] !== '/') {
      if (_path[0] === '.') {
        _was_relative_prefix = _path.substring(0, _path.indexOf('/'));
      }
      _was_relative = true;
      _path = '/' + _path;
    }
    // resolve simples
    _path = _path.replace(/(\/(\.\/)+)|\/{2,}/g, '/');
    // resolve parents
    while (true) {
      _parent = _path.indexOf('/../');
      if (_parent === -1) {
        // no more ../ to resolve
        break;
      } else if (_parent === 0) {
        // top level cannot be relative...
        _path = _path.substring(3);
        break;
      }
      _pos = _path.substring(0, _parent).lastIndexOf('/');
      if (_pos === -1) {
        _pos = _parent;
      }
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }
    // revert to relative
    if (_was_relative && this.is('relative')) {
      if (_was_relative_prefix) {
        _path = _was_relative_prefix + _path;
      } else {
        _path = _path.substring(1);
      }
    }
    _path = URI.recodePath(_path);
    this._parts.path = _path;
    this.build(!build);
    return this;
  };
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function(build) {
    if (typeof this._parts.query === "string") {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(URI.parseQuery(this._parts.query));
      }
      this.build(!build);
    }
    return this;
  };
  p.normalizeFragment = function(build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }
    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;
  p.iso8859 = function() {
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;
    URI.encode = escape;
    URI.decode = decodeURIComponent;
    this.normalize();
    URI.encode = e;
    URI.decode = d;
    return this;
  };
  p.unicode = function() {
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;
    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    this.normalize();
    URI.encode = e;
    URI.decode = d;
    return this;
  };
  p.readable = function() {
    var uri = this.clone();
    // removing username, password, because they shouldn't be displayed according to RFC 3986
    uri.username("").password("").normalize();
    var t = '';
    if (uri._parts.protocol) {
      t += uri._parts.protocol + '://';
    }
    if (uri._parts.hostname) {
      if (uri.is('punycode') && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) {
          t += ":" + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }
    if (uri._parts.hostname && uri._parts.path && uri._parts.path[0] !== '/') {
      t += '/';
    }
    t += uri.path(true);
    if (uri._parts.query) {
      var q = '';
      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
        var kv = (qp[i] || "").split('=');
        q += '&' + URI.decodeQuery(kv[0]).replace(/&/g, '%26');
        if (kv[1] !== undefined) {
          q += "=" + URI.decodeQuery(kv[1]).replace(/&/g, '%26');
        }
      }
      t += '?' + q.substring(1);
    }
    t += uri.hash();
    return t;
  };
  // resolving relative and absolute URLs
  p.absoluteTo = function(base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;
    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierachical components');
    }
    if (this._parts.hostname) {
      return resolved;
    }
    if (!(base instanceof URI)) {
      base = new URI(base);
    }
    for (i = 0, p; p = properties[i]; i++) {
      resolved._parts[p] = base._parts[p];
    }
    properties = ['query', 'path'];
    for (i = 0, p; p = properties[i]; i++) {
      if (!resolved._parts[p] && base._parts[p]) {
        resolved._parts[p] = base._parts[p];
      }
    }
    if (resolved.path()[0] !== '/') {
      basedir = base.directory();
      resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
      resolved.normalizePath();
    }
    resolved.build();
    return resolved;
  };
  p.relativeTo = function(base) {
    var relative = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var common, _base, _this, _base_diff, _this_diff;
    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierachical components');
    }
    if (!(base instanceof URI)) {
      base = new URI(base);
    }
    if (this.path()[0] !== '/' || base.path()[0] !== '/') {
      throw new Error('Cannot calculate common path from non-relative URLs');
    }
    // determine common sub path
    common = URI.commonPath(relative.path(), base.path());
    // no relation if there's nothing in common 
    if (!common || common === '/') {
      return relative;
    }
    // relative paths don't have authority
    for (var i = 0, p; p = properties[i]; i++) {
      relative._parts[p] = null;
    }
    _base = base.directory();
    _this = this.directory();
    // base and this are on the same level
    if (_base === _this) {
      relative._parts.path = './' + relative.filename();
      return relative.build();
    }
    _base_diff = _base.substring(common.length);
    _this_diff = _this.substring(common.length);
    // this is a descendant of base
    if (_base + '/' === common) {
      if (_this_diff) {
        _this_diff += '/';
      }
      relative._parts.path = './' + _this_diff + relative.filename();
      return relative.build();
    }
    // this is a descendant of base
    var parents = '../';
    var _common = new RegExp('^' + escapeRegEx(common));
    var _parents = _base.replace(_common, '/').match(/\//g).length - 1;
    while (_parents--) {
      parents += '../';
    }
    relative._parts.path = relative._parts.path.replace(_common, parents);
    return relative.build();
  };
  // comparing URIs
  p.equals = function(uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;
    one.normalize();
    two.normalize();
    // exact match
    if (one.toString() === two.toString()) {
      return true;
    }
    // extract query string
    one_query = one.query();
    two_query = two.query();
    one.query("");
    two.query("");
    // definitely not equal if not even non-query parts match
    if (one.toString() !== two.toString()) {
      return false;
    }
    // query parameters have the same length, even if they're permutated
    if (one_query.length !== two_query.length) {
      return false;
    }
    one_map = URI.parseQuery(one_query);
    two_map = URI.parseQuery(two_query);
    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else {
          if (!isArray(two_map[key])) {
            return false;
          }
          // arrays can't be equal if they have different amount of content
          if (one_map[key].length !== two_map[key].length) {
            return false;
          }
          one_map[key].sort();
          two_map[key].sort();
          for (var i = 0, l = one_map[key].length; i < l; i++) {
            if (one_map[key][i] !== two_map[key][i]) {
              return false;
            }
          }
        }
        checked[key] = true;
      }
    }
    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          // two contains a parameter not present in one
          return false;
        }
      }
    }
    return true;
  };
  // state
  p.duplicateQueryParameters = function(v) {
    this._parts.duplicateQueryParameters = !! v;
    return this;
  };
  return URI;
}));


var q = null;
window.PR_SHOULD_USE_CONTINUATION = !0;
(function() {
  function L(a) {
    function m(a) {
      var f = a.charCodeAt(0);
      if (f !== 92) return f;
      var b = a.charAt(1);
      return (f = r[b]) ? f : "0" <= b && b <= "7" ? parseInt(a.substring(1), 8) : b === "u" || b === "x" ? parseInt(a.substring(2), 16) : a.charCodeAt(1)
    }

    function e(a) {
      if (a < 32) return (a < 16 ? "\\x0" : "\\x") + a.toString(16);
      a = String.fromCharCode(a);
      if (a === "\\" || a === "-" || a === "[" || a === "]") a = "\\" + a;
      return a
    }

    function h(a) {
      for (var f = a.substring(1, a.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g), a = [], b = [], o = f[0] === "^", c = o ? 1 : 0, i = f.length; c < i; ++c) {
        var j = f[c];
        if (/\\[bdsw]/i.test(j)) a.push(j);
        else {
          var j = m(j),
              d;
          c + 2 < i && "-" === f[c + 1] ? (d = m(f[c + 2]), c += 2) : d = j;
          b.push([j, d]);
          d < 65 || j > 122 || (d < 65 || j > 90 || b.push([Math.max(65, j) | 32, Math.min(d, 90) | 32]), d < 97 || j > 122 || b.push([Math.max(97, j) & -33, Math.min(d, 122) & -33]))
        }
      }
      b.sort(function(a, f) {
        return a[0] - f[0] || f[1] - a[1]
      });
      f = [];
      j = [NaN, NaN];
      for (c = 0; c < b.length; ++c) i = b[c], i[0] <= j[1] + 1 ? j[1] = Math.max(j[1], i[1]) : f.push(j = i);
      b = ["["];
      o && b.push("^");
      b.push.apply(b, a);
      for (c = 0; c < f.length; ++c) i = f[c], b.push(e(i[0])), i[1] > i[0] && (i[1] + 1 > i[0] && b.push("-"), b.push(e(i[1])));
      b.push("]");
      return b.join("")
    }

    function y(a) {
      for (var f = a.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), b = f.length, d = [], c = 0, i = 0; c < b; ++c) {
        var j = f[c];
        j === "(" ? ++i : "\\" === j.charAt(0) && (j = +j.substring(1)) && j <= i && (d[j] = -1)
      }
      for (c = 1; c < d.length; ++c) - 1 === d[c] && (d[c] = ++t);
      for (i = c = 0; c < b; ++c) j = f[c], j === "(" ? (++i, d[i] === void 0 && (f[c] = "(?:")) : "\\" === j.charAt(0) && (j = +j.substring(1)) && j <= i && (f[c] = "\\" + d[i]);
      for (i = c = 0; c < b; ++c)"^" === f[c] && "^" !== f[c + 1] && (f[c] = "");
      if (a.ignoreCase && s) for (c = 0; c < b; ++c) j = f[c], a = j.charAt(0), j.length >= 2 && a === "[" ? f[c] = h(j) : a !== "\\" && (f[c] = j.replace(/[A-Za-z]/g, function(a) {
        a = a.charCodeAt(0);
        return "[" + String.fromCharCode(a & -33, a | 32) + "]"
      }));
      return f.join("")
    }
    for (var t = 0, s = !1, l = !1, p = 0, d = a.length; p < d; ++p) {
      var g = a[p];
      if (g.ignoreCase) l = !0;
      else if (/[a-z]/i.test(g.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
        s = !0;
        l = !1;
        break
      }
    }
    for (var r = {
      b: 8,
      t: 9,
      n: 10,
      v: 11,
      f: 12,
      r: 13
    }, n = [], p = 0, d = a.length; p < d; ++p) {
      g = a[p];
      if (g.global || g.multiline) throw Error("" + g);
      n.push("(?:" + y(g) + ")")
    }
    return RegExp(n.join("|"), l ? "gi" : "g")
  }

  function M(a) {
    function m(a) {
      switch (a.nodeType) {
      case 1:
        if (e.test(a.className)) break;
        for (var g = a.firstChild; g; g = g.nextSibling) m(g);
        g = a.nodeName;
        if ("BR" === g || "LI" === g) h[s] = "\n", t[s << 1] = y++, t[s++ << 1 | 1] = a;
        break;
      case 3:
      case 4:
        g = a.nodeValue, g.length && (g = p ? g.replace(/\r\n?/g, "\n") : g.replace(/[\t\n\r ]+/g, " "), h[s] = g, t[s << 1] = y, y += g.length, t[s++ << 1 | 1] = a)
      }
    }
    var e = /(?:^|\s)nocode(?:\s|$)/,
        h = [],
        y = 0,
        t = [],
        s = 0,
        l;
    a.currentStyle ? l = a.currentStyle.whiteSpace : window.getComputedStyle && (l = document.defaultView.getComputedStyle(a, q).getPropertyValue("white-space"));
    var p = l && "pre" === l.substring(0, 3);
    m(a);
    return {
      a: h.join("").replace(/\n$/, ""),
      c: t
    }
  }

  function B(a, m, e, h) {
    m && (a = {
      a: m,
      d: a
    }, e(a), h.push.apply(h, a.e))
  }

  function x(a, m) {
    function e(a) {
      for (var l = a.d, p = [l, "pln"], d = 0, g = a.a.match(y) || [], r = {}, n = 0, z = g.length; n < z; ++n) {
        var f = g[n],
            b = r[f],
            o = void 0,
            c;
        if (typeof b === "string") c = !1;
        else {
          var i = h[f.charAt(0)];
          if (i) o = f.match(i[1]), b = i[0];
          else {
            for (c = 0; c < t; ++c) if (i = m[c], o = f.match(i[1])) {
              b = i[0];
              break
            }
            o || (b = "pln")
          }
          if ((c = b.length >= 5 && "lang-" === b.substring(0, 5)) && !(o && typeof o[1] === "string")) c = !1, b = "src";
          c || (r[f] = b)
        }
        i = d;
        d += f.length;
        if (c) {
          c = o[1];
          var j = f.indexOf(c),
              k = j + c.length;
          o[2] && (k = f.length - o[2].length, j = k - c.length);
          b = b.substring(5);
          B(l + i, f.substring(0, j), e, p);
          B(l + i + j, c, C(b, c), p);
          B(l + i + k, f.substring(k), e, p)
        } else p.push(l + i, b)
      }
      a.e = p
    }
    var h = {},
        y;
    (function() {
      for (var e = a.concat(m), l = [], p = {}, d = 0, g = e.length; d < g; ++d) {
        var r = e[d],
            n = r[3];
        if (n) for (var k = n.length; --k >= 0;) h[n.charAt(k)] = r;
        r = r[1];
        n = "" + r;
        p.hasOwnProperty(n) || (l.push(r), p[n] = q)
      }
      l.push(/[\S\s]/);
      y = L(l)
    })();
    var t = m.length;
    return e
  }

  function u(a) {
    var m = [],
        e = [];
    a.tripleQuotedStrings ? m.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, q, "'\""]) : a.multiLineStrings ? m.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/, q, "'\"`"]) : m.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, q, "\"'"]);
    a.verbatimStrings && e.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, q]);
    var h = a.hashComments;
    h && (a.cStyleComments ? (h > 1 ? m.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#"]) : m.push(["com", /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/, q, "#"]), e.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, q])) : m.push(["com", /^#[^\n\r]*/, q, "#"]));
    a.cStyleComments && (e.push(["com", /^\/\/[^\n\r]*/, q]), e.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, q]));
    a.regexLiterals && e.push(["lang-regex", /^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);
    (h = a.types) && e.push(["typ", h]);
    a = ("" + a.keywords).replace(/^ | $/g, "");
    a.length && e.push(["kwd", RegExp("^(?:" + a.replace(/[\s,]+/g, "|") + ")\\b"), q]);
    m.push(["pln", /^\s+/, q, " \r\n\t\xa0"]);
    e.push(["lit", /^@[$_a-z][\w$@]*/i, q], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q], ["pln", /^[$_a-z][\w$@]*/i, q], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, q, "0123456789"], ["pln", /^\\[\S\s]?/, q], ["pun", /^.[^\s\w"-$'./@\\`]*/, q]);
    return x(m, e)
  }

  function D(a, m) {
    function e(a) {
      switch (a.nodeType) {
      case 1:
        if (k.test(a.className)) break;
        if ("BR" === a.nodeName) h(a), a.parentNode && a.parentNode.removeChild(a);
        else for (a = a.firstChild; a; a = a.nextSibling) e(a);
        break;
      case 3:
      case 4:
        if (p) {
          var b = a.nodeValue,
              d = b.match(t);
          if (d) {
            var c = b.substring(0, d.index);
            a.nodeValue = c;
            (b = b.substring(d.index + d[0].length)) && a.parentNode.insertBefore(s.createTextNode(b), a.nextSibling);
            h(a);
            c || a.parentNode.removeChild(a)
          }
        }
      }
    }

    function h(a) {
      function b(a, d) {
        var e = d ? a.cloneNode(!1) : a,
            f = a.parentNode;
        if (f) {
          var f = b(f, 1),
              g = a.nextSibling;
          f.appendChild(e);
          for (var h = g; h; h = g) g = h.nextSibling, f.appendChild(h)
        }
        return e
      }
      for (; !a.nextSibling;) if (a = a.parentNode, !a) return;
      for (var a = b(a.nextSibling, 0), e;
      (e = a.parentNode) && e.nodeType === 1;) a = e;
      d.push(a)
    }
    var k = /(?:^|\s)nocode(?:\s|$)/,
        t = /\r\n?|\n/,
        s = a.ownerDocument,
        l;
    a.currentStyle ? l = a.currentStyle.whiteSpace : window.getComputedStyle && (l = s.defaultView.getComputedStyle(a, q).getPropertyValue("white-space"));
    var p = l && "pre" === l.substring(0, 3);
    for (l = s.createElement("LI"); a.firstChild;) l.appendChild(a.firstChild);
    for (var d = [l], g = 0; g < d.length; ++g) e(d[g]);
    m === (m | 0) && d[0].setAttribute("value", m);
    var r = s.createElement("OL");
    r.className = "linenums";
    for (var n = Math.max(0, m - 1 | 0) || 0, g = 0, z = d.length; g < z; ++g) l = d[g], l.className = "L" + (g + n) % 10, l.firstChild || l.appendChild(s.createTextNode("\xa0")), r.appendChild(l);
    a.appendChild(r)
  }

  function k(a, m) {
    for (var e = m.length; --e >= 0;) {
      var h = m[e];
      A.hasOwnProperty(h) ? window.console && console.warn("cannot override language handler %s", h) : A[h] = a
    }
  }

  function C(a, m) {
    if (!a || !A.hasOwnProperty(a)) a = /^\s*</.test(m) ? "default-markup" : "default-code";
    return A[a]
  }

  function E(a) {
    var m =
    a.g;
    try {
      var e = M(a.h),
          h = e.a;
      a.a = h;
      a.c = e.c;
      a.d = 0;
      C(m, h)(a);
      var k = /\bMSIE\b/.test(navigator.userAgent),
          m = /\n/g,
          t = a.a,
          s = t.length,
          e = 0,
          l = a.c,
          p = l.length,
          h = 0,
          d = a.e,
          g = d.length,
          a = 0;
      d[g] = s;
      var r, n;
      for (n = r = 0; n < g;) d[n] !== d[n + 2] ? (d[r++] = d[n++], d[r++] = d[n++]) : n += 2;
      g = r;
      for (n = r = 0; n < g;) {
        for (var z = d[n], f = d[n + 1], b = n + 2; b + 2 <= g && d[b + 1] === f;) b += 2;
        d[r++] = z;
        d[r++] = f;
        n = b
      }
      for (d.length = r; h < p;) {
        var o = l[h + 2] || s,
            c = d[a + 2] || s,
            b = Math.min(o, c),
            i = l[h + 1],
            j;
        if (i.nodeType !== 1 && (j = t.substring(e, b))) {
          k && (j = j.replace(m, "\r"));
          i.nodeValue =
          j;
          var u = i.ownerDocument,
              v = u.createElement("SPAN");
          v.className = d[a + 1];
          var x = i.parentNode;
          x.replaceChild(v, i);
          v.appendChild(i);
          e < o && (l[h + 1] = i = u.createTextNode(t.substring(b, o)), x.insertBefore(i, v.nextSibling))
        }
        e = b;
        e >= o && (h += 2);
        e >= c && (a += 2)
      }
    } catch (w) {
      "console" in window && console.log(w && w.stack ? w.stack : w)
    }
  }
  var v = ["break,continue,do,else,for,if,return,while"],
      w = [
      [v, "auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],
      F = [w, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
      G = [w, "abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],
      H = [G, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],
      w = [w, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],
      I = [v, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
      J = [v, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
      v = [v, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
      K = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,
      N = /\S/,
      O = u({
      keywords: [F, H, w, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END" + I, J, v],
      hashComments: !0,
      cStyleComments: !0,
      multiLineStrings: !0,
      regexLiterals: !0
    }),
      A = {};
  k(O, ["default-code"]);
  k(x([], [
    ["pln", /^[^<?]+/],
    ["dec", /^<!\w[^>]*(?:>|$)/],
    ["com", /^<\!--[\S\s]*?(?:--\>|$)/],
    ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/],
    ["lang-", /^<%([\S\s]+?)(?:%>|$)/],
    ["pun", /^(?:<[%?]|[%?]>)/],
    ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],
    ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],
    ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],
    ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
  ]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]);
  k(x([
    ["pln", /^\s+/, q, " \t\r\n"],
    ["atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'"]
  ], [
    ["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],
    ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
    ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],
    ["pun", /^[/<->]+/],
    ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i],
    ["lang-js", /^on\w+\s*=\s*'([^']+)'/i],
    ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i],
    ["lang-css", /^style\s*=\s*"([^"]+)"/i],
    ["lang-css", /^style\s*=\s*'([^']+)'/i],
    ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]
  ]), ["in.tag"]);
  k(x([], [
    ["atv", /^[\S\s]+/]
  ]), ["uq.val"]);
  k(u({
    keywords: F,
    hashComments: !0,
    cStyleComments: !0,
    types: K
  }), ["c", "cc", "cpp", "cxx", "cyc", "m"]);
  k(u({
    keywords: "null,true,false"
  }), ["json"]);
  k(u({
    keywords: H,
    hashComments: !0,
    cStyleComments: !0,
    verbatimStrings: !0,
    types: K
  }), ["cs"]);
  k(u({
    keywords: G,
    cStyleComments: !0
  }), ["java"]);
  k(u({
    keywords: v,
    hashComments: !0,
    multiLineStrings: !0
  }), ["bsh", "csh", "sh"]);
  k(u({
    keywords: I,
    hashComments: !0,
    multiLineStrings: !0,
    tripleQuotedStrings: !0
  }), ["cv", "py"]);
  k(u({
    keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
    hashComments: !0,
    multiLineStrings: !0,
    regexLiterals: !0
  }), ["perl", "pl", "pm"]);
  k(u({
    keywords: J,
    hashComments: !0,
    multiLineStrings: !0,
    regexLiterals: !0
  }), ["rb"]);
  k(u({
    keywords: w,
    cStyleComments: !0,
    regexLiterals: !0
  }), ["js"]);
  k(u({
    keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
    hashComments: 3,
    cStyleComments: !0,
    multilineStrings: !0,
    tripleQuotedStrings: !0,
    regexLiterals: !0
  }), ["coffee"]);
  k(x([], [
    ["str", /^[\S\s]+/]
  ]), ["regex"]);
  window.prettyPrintOne = function(a, m, e) {
    var h = document.createElement("PRE");
    h.innerHTML = a;
    e && D(h, e);
    E({
      g: m,
      i: e,
      h: h
    });
    return h.innerHTML
  };
  window.prettyPrint = function(a) {
    function m() {
      for (var e = window.PR_SHOULD_USE_CONTINUATION ? l.now() + 250 : Infinity; p < h.length && l.now() < e; p++) {
        var n = h[p],
            k = n.className;
        if (k.indexOf("prettyprint") >= 0) {
          var k = k.match(g),
              f, b;
          if (b = !k) {
            b = n;
            for (var o = void 0, c = b.firstChild; c; c = c.nextSibling) var i = c.nodeType,
                o = i === 1 ? o ? b : c : i === 3 ? N.test(c.nodeValue) ? b : o : o;
            b = (f = o === b ? void 0 : o) && "CODE" === f.tagName
          }
          b && (k = f.className.match(g));
          k && (k = k[1]);
          b = !1;
          for (o = n.parentNode; o; o = o.parentNode) if ((o.tagName === "pre" || o.tagName === "code" || o.tagName === "xmp") && o.className && o.className.indexOf("prettyprint") >= 0) {
            b = !0;
            break
          }
          b || ((b = (b = n.className.match(/\blinenums\b(?::(\d+))?/)) ? b[1] && b[1].length ? +b[1] : !0 : !1) && D(n, b), d = {
            g: k,
            h: n,
            i: b
          }, E(d))
        }
      }
      p < h.length ? setTimeout(m, 250) : a && a()
    }
    for (var e = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")], h = [], k = 0; k < e.length; ++k) for (var t = 0, s = e[k].length; t < s; ++t) h.push(e[k][t]);
    var e = q,
        l = Date;
    l.now || (l = {
      now: function() {
        return +new Date
      }
    });
    var p = 0,
        d, g = /\blang(?:uage)?-([\w.]+)(?!\S)/;
    m()
  };
  window.PR = {
    createSimpleLexer: x,
    registerLangHandler: k,
    sourceDecorator: u,
    PR_ATTRIB_NAME: "atn",
    PR_ATTRIB_VALUE: "atv",
    PR_COMMENT: "com",
    PR_DECLARATION: "dec",
    PR_KEYWORD: "kwd",
    PR_LITERAL: "lit",
    PR_NOCODE: "nocode",
    PR_PLAIN: "pln",
    PR_PUNCTUATION: "pun",
    PR_SOURCE: "src",
    PR_STRING: "str",
    PR_TAG: "tag",
    PR_TYPE: "typ"
  }
})();



PR.registerLangHandler(PR.createSimpleLexer([
  ["pln", /^[\t\n\f\r ]+/, null, " \t\r\n"]
], [
  ["str", /^"(?:[^\n\f\r"\\]|\\(?:\r\n?|\n|\f)|\\[\S\s])*"/, null],
  ["str", /^'(?:[^\n\f\r'\\]|\\(?:\r\n?|\n|\f)|\\[\S\s])*'/, null],
  ["lang-css-str", /^url\(([^"')]*)\)/i],
  ["kwd", /^(?:url|rgb|!important|@import|@page|@media|@charset|inherit)(?=[^\w-]|$)/i, null],
  ["lang-css-kw", /^(-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*)\s*:/i],
  ["com", /^\/\*[^*]*\*+(?:[^*/][^*]*\*+)*\//],
  ["com", /^(?:<\!--|--\>)/],
  ["lit", /^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],
  ["lit", /^#[\da-f]{3,6}/i],
  ["pln", /^-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*/i],
  ["pun", /^[^\s\w"']+/]
]), ["css"]);
PR.registerLangHandler(PR.createSimpleLexer([], [
  ["kwd", /^-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*/i]
]), ["css-kw"]);
PR.registerLangHandler(PR.createSimpleLexer([], [
  ["str", /^[^"')]+/]
]), ["css-str"]);


