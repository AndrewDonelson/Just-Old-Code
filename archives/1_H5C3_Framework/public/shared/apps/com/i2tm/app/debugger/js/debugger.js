/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

/**
 * @module H5C3 Framework
 * @submodule Engine
 * @class h5c3.logger
 * @augments h5c3.Base
 * @description
 * Wrapper class for the Internal Integrated Debugger. Not available in the production
 * release, only development.
 */
h5c3.Debugger = h5c3.Base.extend('h5c3.logger',
{ },
/** @lends h5c3.logger.prototype */
{
	webApp:			null,			//webapp to monitor
	divPanel:		null,			//Integrated Debugger Window
	divTitlebar:	null,			//Toolbar 
	objProfiler:	null,			//Profiler object
	divProfiler:	null,			//Profiler Tab
	objConsole:		null,			//Console Object
	divConsole:		null,			//Console Log Tab
	objStats:		null,			//Graphical Statistics Object
	divStats:		null,			//Graphical Stats Tab
	spinner:		null,
	visible:		false,			//Integrated Debugger Window Visible
	
	/**
	 * Constructs a new integrated debugger
	 */
	init:function ()
	{
		this._super();
		this.objProfiler = new h5c3.logger.Profiler();
		this.objConsole = new h5c3.logger.ConsolePanel();
		this.objStats = new h5c3.logger.DebugPanel();
		this.divPanel = $GEI("waDebug");
		this.divTitlebar = $GEI("waDebugTitleBar");
		this.divStats = $GEI("waDebugStats");    
		//this.divStats.width=800;
		//this.divStats.height=400;
		//this.divStats.style.display = 'block';
		//this.divStats.style.width = '800px';
		//this.divStats.style.height = '400px';
		this.onResize();			
	},
	
	button:function(id) 
	{
		switch (id) {
			case 'window': h5c3.device.game.obj.onAction('developer window');
			break;
			
			case 'log': 
				this.objConsole.div.style.display = 'block';
				this.objProfiler.div.style.display = 'none';
				this.divStats.style.display = 'none';
			break;
			
			case 'profiler': 
				this.objConsole.div.style.display = 'none';
				this.objProfiler.div.style.display = 'block';
				this.divStats.style.display = 'none';
			break;
			
			case 'physics': 
				this.objConsole.div.style.display = 'none';
				this.objProfiler.div.style.display = 'none';
				this.divStats.style.display = 'block';
				h5c3.device.game.obj.onAction('physics debug');
			break;
			
			case 'stats': 
				this.objConsole.div.style.display = 'none';
				this.objProfiler.div.style.display = 'none';
				this.divStats.style.display = 'block';
				h5c3.device.game.obj.onAction('physics debug');
			break;
			
			case 'pooldump': 
				this.objConsole.div.style.display = 'block';
				this.objProfiler.div.style.display = 'none';
				this.divStats.style.display = 'none';			
				h5c3.device.game.obj.onAction('pool dump');
			break;
			
			case 'sound': h5c3.device.game.obj.onAction('toggle sound');
				this.objConsole.div.style.display = 'block';
				this.objProfiler.div.style.display = 'none';
				this.divStats.style.display = 'none';
			break;
			
			case 'reset': h5c3.device.game.obj.onAction('reset');
				this.objConsole.div.style.display = 'block';
				this.objProfiler.div.style.display = 'none';
				this.divStats.style.display = 'none';
			break;
			
			case 'exit': h5c3.device.game.obj.onAction('exit');
				this.objConsole.div.style.display = 'block';
				this.objProfiler.div.style.display = 'none';
				this.divStats.style.display = 'none';
			break;
		}	
	},
	
	tabClick:function(id)
	{
		switch (id) {
			case 'log': 
				this.objConsole.div.style.display = 'block';
				this.objProfiler.div.style.display = 'none';
				this.divStats.style.display = 'none';
			break;
			case 'stats': 
				this.objConsole.div.style.display = 'none';
				this.objProfiler.div.style.display = 'none';
				this.divStats.style.display = 'block';
				this.button('physics debug');
			break;
			case 'profiler': 
				this.objConsole.div.style.display = 'none';
				this.objProfiler.div.style.display = 'block';
				this.divStats.style.display = 'none';
			break;
		}	
	},
		
	hyperLink:function(content,href,id,onClick) {
		var a = document.createElement('a');
		a.innerText = content;
		a.textContent = content;
		a.href = href;
		a.id = id;
		a.onclick = this._onClick(id);
		return a;
	},
	
	send2Console:function(msg)
	{
		var log = $GEI("waConsoleLog");
		if (log) {
			log.value += msg+'\n';
			log.scrollTop = log.scrollHeight;
		}
	},
	
	toggleShow:function()
	{
		if (this.visible) {
			this.divPanel.style.display = 'none';
		} else {
			this.divPanel.style.display = 'block';
		}
		this.visible = !this.visible;
	},
	
	onReady:function() 
	{
		this.objConsole.onReady();
		this.objProfiler.onReady();
		this.objStats.onReady();
	},
	
	onResize:function()
	{
		var el = window.$GEI('waDebugStats');
		this.divPanel.style.left = ((el.ownerDocument.width-el.clientWidth)/2)+'px';
		this.divPanel.style.top = ((el.ownerDocument.height-el.clientHeight)/2)+'px';
		this.objStats.onResize();
	}	
});

/**
 * @class h5c3.logger.DebugPanel
 * @description
 * [Extends <a href='h5c3.Base'>h5c3.Base</a>]
 * This class is used to create the real-time debugging panels. An instance of this class is automatically constructed
 * by the h5c3.device system. When onReady is triggered the panel will automatically attach to a canvas element with the
 * id 'debug'.
 * <p>
 * <pre><code>
 * &ltcanvas id="debug"&gt&lt/canvas&gt
 * </code></pre>
 * The debug panel will automatically size to the available space in the canvas element.
 * <p>
 * You can gain access to the debug panel through h5c3.device.debugPanel member.
 */
h5c3.logger.DebugPanel = h5c3.Base('h5c3.logger.DebugPanel',
{},
/** @lends h5c3.logger.DebugPanel.prototype */
{
	x:0,
	y:0,
	panelHeight:0,
	panelWidth:0,
	canvas:null,
	ctx:null,
	statusText:null,
	active:false,
	timeGraph:null,
	memGraph:null,
	entityGraph:null,
	poolGraph:null,
	currentMem:0,
	lastMem:0,

	init:function ()
	{
		this._super();
	},

	onReady:function ()
	{
		this.attach('waDebugStats');
	},

	/**
	 * Attach the debug panel to a canvas element with the supplied id
	 * @param {String} canvasElement Id of a canvas element to attach to
	 */
	attach:function (canvasElement)
	{
		this.canvas = $GEI(canvasElement);
		if (this.canvas === null)
		{
			h5c3.log('Showing debug requires a div with an id of "waDebugStats" to be added to your dom.');
			h5c3.device.showDebug = false;
			return;
		}

		// resize the canvas to be the size of it's parent (containing element)
		this.panelElement = this.canvas.parentNode;
		this.ctx = this.canvas.getContext('2d');
		this.onResize();

		var np = 4;
		// create the graphs
		this.timeGraph = new h5c3.logger.CanvasLineGraph(this.ctx, 'Performance', '', 10,
			[
				{name:'process (ms)', color:'#f55'},
				{ name:'render (ms)', color:'#5f5'}
			], 10, 10, (this.panelWidth / np) - 10, this.panelHeight - 20);

		if (typeof console.memory === 'undefined' || console.memory.totalJSHeapSize === 0)
		{
			this.memGraph = new h5c3.logger.CanvasLineGraph(this.ctx, 'Memory', 'Not available', 0,
				[
					{name:'mem used (mb)', color:'#55f'}
				], (this.panelWidth / np) + 10, 10, (this.panelWidth / np) - 10, this.panelHeight - 20);
		} else
		{
			this.memGraph = new h5c3.logger.CanvasLineGraph(this.ctx, 'Memory', '', ((console.memory.totalJSHeapSize / 1024 / 1024) * 1.2),
				[
					{name:'mem used (mb)', color:'#55f'}
				], (this.panelWidth / np) + 10, 10, (this.panelWidth / np) - 10, this.panelHeight - 20);
		}

		this.poolGraph = new h5c3.logger.CanvasLineGraph(this.ctx, 'Pool Size', '', 100,
			[
				{name:'pooled', color:'#5b1654'}
			], this.panelWidth - ((this.panelWidth / np) * 2) + 10, 10, (this.panelWidth / np) - 20, this.panelHeight - 20);

		this.entityGraph = new h5c3.logger.CanvasLineGraph(this.ctx, 'Entities', '', 100,
			[
				{ name:'drawn (total)', color:'#f9f007'}
			], this.panelWidth - (this.panelWidth / np) + 10, 10, (this.panelWidth / np) - 20, this.panelHeight - 20);

		this.active = true;
	},

	onResize:function ()
	{
		if (this.canvas === null) {
			return;
		}

		this.panelWidth = this.canvas.width;
		this.panelHeight = this.canvas.height;

		// clear the background
		this.ctx.fillStyle = '#111';
		this.ctx.fillRect(0, 0, this.panelWidth, this.panelHeight);

		var np = 4;
		if (this.timeGraph !== null) {
			this.timeGraph.resize(10, 10, this.panelWidth / np - 10, this.panelHeight - 20);
		}
		
		if (this.memGraph !== null) {
			this.memGraph.resize(this.panelWidth / np + 10, 10, this.panelWidth / np - 10, this.panelHeight - 20);
		}
		
		if (this.poolGraph !== null) {
			this.poolGraph.resize(this.panelWidth - ((this.panelWidth / np) * 2) + 20, 10, this.panelWidth / np - 20, this.panelHeight - 20);
		}
		
		if (this.entityGraph !== null) {
			this.entityGraph.resize(this.panelWidth - (this.panelWidth / np) + 10, 10, this.panelWidth / np - 20, this.panelHeight - 20);
		}
	},

	_timeSince:0,

	update:function (delta)
	{
		if (!this.active) {
			return;
		}

		// update the averages
		this._timeSince += delta;
		if (this._timeSince > 30)
		{
			this._timeSince = 0;
			if (this.timeGraph !== null) {
				this.timeGraph.addLine2(h5c3.device.lastProcessMS, h5c3.device.lastDrawMS);
			}
			
			if (this.entityGraph !== null) {
				this.entityGraph.addLine1(h5c3.device.elementsDrawn);
			}
			
			if (this.memGraph !== null) {
				if (typeof console.memory !== 'undefined') {
					if (console.memory.totalJSHeapSize !== 0) {
						this.memGraph.addLine1((window.performance.memory.usedJSHeapSize / 1024 / 1024));
					}
				}
			}
			
			if (this.poolGraph !== null) {
				this.poolGraph.addLine1(gamecore.Pool.totalPooled);
			}
		}
	},

	draw:function ()
	{
		if (!this.active) {
			return;
		}

		if (this.timeGraph !== null) {
			this.timeGraph.draw();
		}
		
		if (this.entityGraph !== null) {
			this.entityGraph.draw();
		}
		
		if (this.memGraph !== null) {
			this.memGraph.draw();
		}
		
		if (this.poolGraph !== null) {
			this.poolGraph.draw();
		}
	}
});

/**
* CanvasLineGraph -- a line bar graph designed to be update quickly (optimized drawing)
* rendered onto a canvas. Used primarily by the debug panel to display pretty graphs
* of performance, memory, entity and network graphs.
*/
h5c3.logger.CanvasLineGraph = h5c3.Base.extend('h5c3.logger.CanvasLineGraph', {
	height:0,
	width:0,
	ctx:null,
	data:null,
	maxY:0, // top most range value
	x:0,
	y:0,
	labels:null,
	graphName:null,
	bgCanvas:null, // off screen canvas for background (grid etc)
	graphCanvas:null, // off screen canvas for graph
	message:null,
	cursor:0, // position in the data array that is the head of the data

	init:function (ctx, graphName, message, maxY, labels, x, y, width, height)
	{
		this._super();

		this.ctx = ctx;
		this.message = message;
		this.graphName = graphName;
		this.maxY = maxY;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.labels = labels;
		this.graphX = this.x + this.graphLeftMargin;
		this.graphY = this.y + 20;
		this.cursor = 0;

		this.graphCanvas = document.createElement('canvas');
		this.bgCanvas = document.createElement('canvas');

		this.resize(x, y, width, height);
	},

	resize:function (x, y, width, height)
	{
		// if the current graph line data is too big we need to resize it down
		if (this.width > width) {
			this.data = this.data.slice(this.width - width, width);
		}

		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;

		// size the graph component
		this.graphHeight = this.height - 40;
		this.graphWidth = this.width - (this.graphLeftMargin + this.graphRightMargin);
		this.graphX = this.graphLeftMargin;
		this.graphY = 20;

		this.bgCanvas.width = this.width;
		this.bgCanvas.height = this.height;
		this.graphCanvas.width = this.graphWidth;
		this.graphCanvas.height = this.graphHeight;

		// resize the data array?
		this.resizeDataArray(this.graphWidth, this.labels.length);
		this.renderBackground();
	},

	resizeDataArray:function (newSize, numDataPoints)
	{
		var i, start = 0;
		if (newSize <= 0) {
			return;
		}

		if (this.data === null) {
			this.data = [];
		} else {
			// resize the array
			if (newSize > this.data.length) // growing?
			{
				start = this.data.length - 1;
			}
			else
			{
				// shrinking -- we cut from the begining
				this.data.splice(0, newSize - this.data.length);
				if (this.cursor > this.data.length - 1) {
					this.cursor = this.data.length - 1;
				}
				return; // job done, no new init needed (it's smaller)
			}
		}

		// add some new data -- the array is expanding
		for (i = start; i < newSize; i++) {
			this.data.push(new Array(numDataPoints));
		}
	},

	_totalAdded:0,
	linesSinceLastPeak:0, // set a new peak every n lines
	lastPeak:0,
	_total:0,

	// we use this to add multiple data items -- saves using variable length arrays (which chew
	// memory, thus we only currently support graphs with up to two data elements to a line.
	// if you want more, add an addLine3 method
	addLine2:function (lineData1, lineData2)
	{
		if (!this.data) {
			return;
		}

		this._totalAdded++;
		this._total = lineData1 + lineData2;
		this.checkMaxRange(this._total);
		this.data[this.cursor][0] = lineData1;
		this.data[this.cursor][1] = lineData2;
		this._updateGraph(this._total);
	},

	addLine1:function (lineData1)
	{
		if (!this.data) {
			return;
		}

		this._totalAdded++;
		this._total = lineData1;
		this.checkMaxRange(this._total);
		this.data[this.cursor][0] = lineData1;
		this._updateGraph(lineData1);
	},

	checkMaxRange:function (max)
	{
		if (max > this.maxY)
		{
			this.maxY = max * 1.4;
			// make sure the absolute smallest number of axis is equal to the height of the graph
			if (this.maxY < this.height / this.gridLineInc) {
				this.maxY = this.height / this.gridLineInc;
			}
			this.renderBackground();
			this.renderGraph(true);
		}
	},

	_updateGraph:function (total)
	{
		this.linesSinceLastPeak++;
		if (this.linesSinceLastPeak > this.width * 1.5)
		{
			this.linesSinceLastPeak++;
			this.maxY = total * 1.4;
			// make sure the absolute smallest number of axis is equal to the height of the graph
			if (this.maxY < this.height / this.gridLineInc) {
				this.maxY = this.height / this.gridLineInc;
			}

			this.lastPeak = total * 1.4;
			this.renderBackground();
			this.linesSinceLastPeak = 0;
		}

		if (total > this.lastPeak) {
			this.lastPeak = total * 1.4;
		}

		this.cursor++;
		if (this.cursor > this.data.length - 1) {
			this.cursor = 0;
		}
	},

	margin:20,
	linePixelSize:0,
	yline:0,
	unit:0,
	gridY:0,
	i:0,
	n:0,
	graphLeftMargin:30,
	graphRightMargin:15,
	graphHeight:0,
	graphWidth:0,
	graphX:0,
	graphY:0,
	gridLineInc:15,

	/**
	 * Renders to an offscreen background canvas, which is only drawn on or resize
	 */
	renderBackground:function ()
	{
		var graphLines = 0, axisInc = 0, axisValue = 0,	lineCount = 0, lineHeight = 0,
			legendY = 0, textX = 0,
			ctx = this.bgCanvas.getContext('2d');

		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, this.width, this.height);

		// graph title
		ctx.fillStyle = '#aaa';
		ctx.font = '10px Arial';
		ctx.fillText(this.graphName, this.graphX, this.graphY - 6);

		// draw the surround rectangle
		ctx.strokeStyle = '#111';
		ctx.strokeRect(this.graphX + 0.5, this.graphY + 0.5, this.graphWidth, this.graphHeight);

		// DRAW GRID AND MARKERS (Y AXIS)
		this.unit = (this.graphHeight) / this.maxY; // figure out the y scale
		graphLines = (this.graphHeight + this.gridLineInc) / this.gridLineInc;
		axisInc = this.maxY / graphLines;

		for (this.gridY = this.graphHeight + this.graphY; this.gridY > this.graphY + 1; this.gridY -= this.gridLineInc)
		{
			lineCount++;
			ctx.textAlign = 'right';
			(lineCount % 2 === 0) ? ctx.fillStyle = '#111' : ctx.fillStyle = '#000';

			lineHeight = this.gridLineInc;
			if (this.gridY - lineHeight < this.graphY)
			{
				lineHeight = (this.gridY - this.graphY);
				ctx.fillRect(this.graphX + 1, this.graphY + 1, this.graphWidth - 2, lineHeight - 1);
			} else {
				ctx.fillRect(this.graphX + 1, this.gridY - lineHeight - 1, this.graphWidth - 2, lineHeight);
			}

			axisValue = Math.round(axisInc * lineCount);
			ctx.fillStyle = '#777';
			ctx.fillText('' + axisValue, this.graphX - 5, this.gridY);
		}

		// DRAW LEGEND
		ctx.globalAlpha = 1;
		ctx.textAlign = 'left';
		legendY = this.height - 13;
		textX = this.graphLeftMargin + 3;

		for (this.n = 0; this.n < this.labels.length; this.n++)
		{
			ctx.fillStyle = this.labels[this.n].color;
			ctx.fillRect(textX, legendY, 5, 5);
			ctx.fillStyle = '#888';
			ctx.fillText(this.labels[this.n].name, textX + 8, legendY + 6);
			textX += ctx.measureText(this.labels[this.n].name).width + 18;
		}

		this.renderGraph(true);
	},

	renderGraph:function (completeRedraw)
	{
		if (!this.data) {
			return;
		}

		var gtx = this.graphCanvas.getContext('2d'), len = 0;
		
		if (completeRedraw)
		{
			gtx.fillStyle = '#000';
			gtx.fillRect(0, 0, this.graphWidth, this.graphHeight);
		} else if (this._totalAdded > this.graphWidth) {
			// we are appending a line
			gtx.drawImage(this.graphCanvas, -1, 0); // so draw the previous graph shift by one
		}

		// now draw a new line on the far right side
		if (completeRedraw)
		{
			len = this.data.length - 1;
			this.dx = 1;

		} else
		{
			// draw the first set of lines across, prior to scrolling
			if (this._totalAdded < this.graphWidth) {
				this.dx = this.cursor;
			} else {
				this.dx = this.graphWidth - 1;
			}
			len = this.dx + 1;
		}

		if (len === 0) {
			return;
		}

		// dx is the count of pixels across the screen
		// dpos is the cursor being drawn pointing inside the array
		var dpos = this.cursor - 1;
		if (dpos < 0) {
			dpos = this.data.length - 1;
		}

		for (; this.dx < len; this.dx++)
		{
			if (dpos > this.data.length - 1) {
				dpos = 0;
			}

			gtx.fillStyle = '#000';
			gtx.fillRect(this.dx, 0, 1, this.graphHeight);

			this.yline = this.graphHeight; // start at the bottom of the graph

			for (this.i = 0; this.i < this.data[dpos].length; this.i++)
			{
				this.linePixelSize = (this.data[dpos][this.i] * this.unit);

				gtx.strokeStyle = this.labels[this.i].color;
				gtx.beginPath();
				gtx.moveTo(this.dx, this.yline);

				var lineY = this.yline - this.linePixelSize;
				if (lineY < 0) {
					lineY = 0;
				}
				gtx.lineTo(this.dx, lineY);
				gtx.closePath();
				gtx.stroke();

				this.yline -= this.linePixelSize;
			}
			dpos++;
		}
	},

	draw:function ()
	{
		this.ctx.save();
		this.ctx.drawImage(this.bgCanvas, this.x, this.y);
		this.renderGraph(false);
		this.ctx.globalAlpha = 0.4;
		this.ctx.drawImage(this.graphCanvas, this.x + this.graphX, this.y + this.graphY);

		// draw the message over the top, if there is one
		if (this.message)
		{
			this.ctx.font = '12px Arial';
			this.ctx.fillStyle = '#333';
			this.ctx.textAlign = 'center';
			this.ctx.fillText(this.message, this.x + this.width / 2, this.y + this.height / 2 - 9);
		}
		this.ctx.restore();
	}
});

/**
 * @module H5C3 Framework
 * @submodule Engine
 * @class h5c3.logger.ConsolePanel
 * @extends h5c3.Base
 * @description
 * Provides a log console to the Integrated debugger. Used by developer.js
 */
h5c3.logger.ConsolePanel = h5c3.Base('h5c3.logger.ConsolePanel',
{},
/** @lends h5c3.logger.ConsolePanel.prototype */
{
	div:		null,
	output:		null,

	/**
	* Initializes debug mode, creating output <div>
	**/
	init:function() {
		this._super();
		this.div = $GEI("waDebugConsole");
		this.div.style.display = 'none';
		this.div.style.width = '100%';
		this.div.style.height = this.div.parentNode.clientHeight-60+'px';
		this.output = $GEI("waConsoleLog");
		this.output.style='';
		this.output.readOnly = true;
	},
	
	onReady:function ()
	{}		
});

/**
 * @module H5C3 Framework
 * @submodule Engine
 * @class h5c3.logger.Profiler
 * @augments pc.Base
 * @description
 * Used internally by the debugger. It shows information on a tab such as Render FPS, 
 * Process FPS among other helpful information.
 */
h5c3.logger.Profiler = h5c3.Base.extend('h5c3.logger.Profiler',
{ },
/** @lends h5c3.logger.Profiler.prototype */
{
	last:		{fps:0,process:0,elapsed:0},
	current:	{fps:0,process:0,elapsed:0},
	fps:		{avg:0,min:999,max:0},
	timer:		null,
	div:		null,
			
	/**
	 * Constructs a new profiler
	 * Timer runs @ 1FPS for updating data
	 */
	init:function ()
	{
		this._super();
		this.div = $GEI("waDebugProfiler");
		this.div.style.display = 'none';

		this.timer = new h5c3.AccuTimer(0, 1, 
			function(steps,count,fps)
			{
				h5c3.dbugger.objProfiler.update(steps,count,fps);
			}
			,
			function()
			{
				h5c3.dbugger.objProfiler.debug('Profiler Terminated.');
			}
		);
	},
		
	update:function(steps,count,fps)
	{
		if ($VLD(h5c3.device)) {
			if (h5c3.device.running !== false) {
				this.current.fps = Math.floor(h5c3.device.currentFPS);
				if (this.current.fps < this.fps.min) this.fps.min = this.current.fps;
				if (this.current.fps > this.fps.max) this.fps.max = this.current.fps;				
				this.fps.avg = Math.floor((h5c3.device.totalFPS / h5c3.device.frameCount));
				this.current.process = Math.floor(h5c3.device.lastProcessMS);
				this.current.elapsed = h5c3.device.elapsed;
				$GEI('pcDebugCurFPS').innerHTML='CUR: '+this.current.fps;
				$GEI('pcDebugAvgFPS').innerHTML='AVG: '+this.fps.avg;
				$GEI('pcDebugMinFPS').innerHTML='MIN: '+this.fps.min;
				$GEI('pcDebugMaxFPS').innerHTML='MAX: '+this.fps.max;
				$GEI('pcDebugFrame').innerHTML='FRM: '+this.current.elapsed+'ms';
			}
		}
	},
	
	onReady:function() 
	{}
});