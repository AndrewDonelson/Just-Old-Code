
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
