
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