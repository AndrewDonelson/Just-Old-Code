(function(cfg) {
	W$[requestAnimFrame] = (function()
	{
	   return  W$.requestAnimationFrame       || 
			   W$.webkitRequestAnimationFrame || 
			   W$.mozRequestAnimationFrame    || 
			   W$.oRequestAnimationFrame      || 
			   W$.msRequestAnimationFrame     || 
			   function(callback)
			   {
				   W$.setTimeout(callback);
			   };
	})();
	
	// remove frame margin and scrollbars when maxing out size of canvas
	B$.style.margin = "0px";
	B$.style.overflow = "hidden";

	// get dimensions of window and resize the canvas to fit
	var width = W$.innerWidth,
		height = W$.innerHeight,
		canvas = D$.getElementById("starfield"),
		mousex = width/2, mousey = height/2;
	canvas.width = width;
	canvas.height = height;

	M$['addEvent'](W$,'resize',  function() {
		var s=M$['gei']("starfield");
		s.width = width = W$.innerWidth;s.style.width=s.width+'px'; 
		s.height = height = W$.innerHeight;s.style.height=s.height+'px';
	});

	// get 2d graphics context and set global alpha
	var G=canvas.getContext("2d");
	G.globalAlpha=0.25;

	// setup aliases
	var Rnd = Math.random,
		Sin = Math.sin,
		Floor = Math.floor;

	// constants and storage for objects that represent star positions
	var warpZ = 12,
		units = 500,
		stars = [],
		cycle = 0,
		Z = 0.025 + (1/25 * 2);

	M$['Starfield']=function(data){
		if (!data) return;
		if (data.speed) this.warpZ=data.speed;
		if (data.x) this.mousex=data.x;
		if (data.y) this.mousey=data.y;
	}
			
	// mouse events
	//Set to to true if you want to use some auto input features
	if (cfg&&cfg.mouse&&cfg.mouse.use==true) {

		if (cfg.mouse.wheelSpeed&&cfg.mouse.wheelSpeed==true) {
			function wheel (e) {
			   var delta = 0;
			   if (e.detail)
			   {
				  delta = -e.detail / 3;
			   }
			   else
			   {
				  delta = e.wheelDelta / 120;
			   }
			   var doff = (delta/25);
			   if (delta > 0 && Z+doff <= 0.5 || delta < 0 && Z+doff >= 0.01)
			   {
				  Z += (delta/25);
				  //console.log(delta +" " +Z);
			   }
			}
			
			M$['addEvent'](canvas,"DOMMouseScroll", wheel);
			M$['addEvent'](canvas,"mousewheel", wheel);
		}
		
		if (cfg.mouse.follow&&cfg.mouse.follow==true) {
			M$['addEvent'](canvas,"mousemove", function(e) {
				mousex = e.clientX;
				mousey = e.clientY;
			});
		}
	}

	// function to reset a star object
	function resetstar(a)
	{
	   a.x = (Rnd() * width - (width * 0.5)) * warpZ;
	   a.y = (Rnd() * height - (height * 0.5)) * warpZ;
	   a.z = warpZ;
	   a.px = 0;
	   a.py = 0;
	}

	// initial start setup
	for (var i=0, n; i<units; i++)
	{
	   n = {};
	   resetstar(n);
	   stars.push(n);
	}

	// start rendering anim function
	var rf = function()
	{
	   // clear background
	   G.fillStyle = "#000";
	   G.fillRect(0, 0, width, height);
	   
	   // mouse position to head towards
	   var cx = (mousex - width / 2) + (width / 2),
		   cy = (mousey - height / 2) + (height / 2);
	   
	   // update all stars
	   var sat = Floor(Z * 500);       // Z range 0.01 -> 0.5
	   if (sat > 100) sat = 100;
	   for (var i=0; i<units; i++)
	   {
		  var n = stars[i],            // the star
			  xx = n.x / n.z,          // star position
			  yy = n.y / n.z,
			  e = (1.0 / n.z + 1) * 2;   // size i.e. z
		  
		  if (n.px !== 0)
		  {
			 // hsl colour from a sine wave
			 //G.strokeStyle = "hsl(" + ((cycle * i) % 360) + "," + sat + "%,80%)";
			 G.strokeStyle = "rgba(255,255,255,1)";
			 G.lineWidth = e;
			 G.beginPath();
			 G.moveTo(xx + cx, yy + cy);
			 G.lineTo(n.px + cx, n.py + cy);
			 G.stroke();
		  }
		  
		  // update star position values with new settings
		  n.px = xx;
		  n.py = yy;
		  n.z -= Z;
		  
		  // reset when star is out of the view field
		  if (n.z < Z || n.px > width || n.py > height)
		  {
			 // reset star
			 resetstar(n);
		  }
	   }
	   
	   // colour cycle sinewave rotation
	   cycle += 0.01;
	   
	   requestAnimFrame(rf);
	};
	requestAnimFrame(rf);
})({
	mouse:{
		use:true,
		follow:true
	}
});