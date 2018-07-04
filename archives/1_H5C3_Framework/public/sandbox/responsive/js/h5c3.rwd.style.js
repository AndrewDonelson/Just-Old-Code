
stylesheet = {
	_MODES : [{w:4096,f:40},{w:3200,f:34},{w:2560,f:28},{w:1920,f:26},{w:1600,f:24},{w:1440,f:22},{w:1366,f:20},{w:1280,f:18},{w:1024,f:16},{w:768,f:14},{w:480,f:13},{w:320,f:12}],
	
	useMQ: true,				//false uses dynamic on the fly calculations, otherwise media queries are created and used.d
	
	init: function() {
		this.createMediaQueries();
	},
	
	createMediaQueries: function() {
		var 
			css='',	minHeight, maxheight,margin, offset=0.50;
			//$("#diskamountUnit").val('$' + ($("#disk").slider("value") * 1.60).toFixed(2));
		css+="* {padding:0px;margin:0px;line-height:100%;outline: none;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;}\n";
		for (i = 0; i < 12; ++i) {		
			wwem = ( (this._MODES[i].w * 0.90) / this._MODES[i].f).toFixed(2);
			maxHeight=(window.innerHeight / this._MODES[i].f).toFixed(2);
			margin=(this._MODES[i].f / 40).toFixed(2);
			padding=(margin * 0.85).toFixed(2);			full=( wwem - (margin*2) ).toFixed(2);			half=( (wwem - (margin*4)) / 2).toFixed(2)-offset;
			third=( (wwem - (margin*6)) / 3).toFixed(2)-offset;
			fourth=( (wwem - (margin*8)) / 4).toFixed(2)-offset;
			sixth=( (wwem - (margin*12)) / 6).toFixed(2)-offset;
			eigth=( (wwem - (margin*16)) / 8).toFixed(2)-offset;
			
			css+="@media all and (max-width:"+this._MODES[i].w+"px){";
			css+="body{font-size:"+this._MODES[i].f+"px;border:0px;width: 100%;height: 100%;}";
			css+=".box{min-height:1em;max-height:"+maxHeight+"em;margin:"+margin+"em}";
			css+=".lightbox{margin:"+margin+";padding:"+padding+"em;margin:"+margin+"em}";
			css+=".full{min-width:"+full+"em;width:"+full+"em;margin:"+margin+"em;}";
			css+=".half{min-width:"+half+"em;width:"+half+"em;}";
			css+=".third{min-width:"+third+"em;width:"+third+"em;}";
			css+=".fourth{min-width:"+fourth+"em;width:"+fourth+"em;}";
			css+=".sixth{min-width:"+sixth+"em;width:"+sixth+"em;}";
			css+=".eighth{min-width:"+eigth+"em;width:"+eigth+"em;}";
		
			//Individual Column Sizes
			css+=".pct100 {width:"+full+"em;}";
			css+=".pct90 {width:"+((full)*0.9).toFixed(2)+"em;}";
			css+=".pct80 {width:"+((full)*0.8).toFixed(2)+"em;}";
			css+=".pct70 {width:"+((full)*0.7).toFixed(2)+"em;}";
			css+=".pct60 {width:"+((full)*0.6).toFixed(2)+"em;}";
			css+=".pct50 {width:"+((full)*0.5).toFixed(2)+"em;}";
			css+=".pct40 {width:"+((full)*0.4).toFixed(2)+"em;}";
			css+=".pct30 {width:"+((full)*0.3).toFixed(2)+"em;}";
			css+=".pct20 {width:"+((full)*0.2).toFixed(2)+"em;}";
			css+=".pct10 {width:"+((full)*0.1).toFixed(2)+"em;}";
			css+="[class*='pct'] {float:left;min-height:1em;margin-left:"+margin+"em;}";
			css+="}\n";
		}

		css+="\n";
		css+=".box{float:left;overflow:hidden;}\n";
		css+="#wrapper {min-height: 100%;min-width: 100%;height: 100% !important;height: 100% !important;}\n";
		css+="#header{position: fixed;z-index: 100;width: 100%;top: 0;height: 3em !important;}\n";
		css+="#content {position:relative;z-index: 0;width:100%;height: 100%;padding:3em 0 5em 0;margin:0 auto 0 auto;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;}\n";
		css+="#leftSidebar, #rightSidebar {position:fixed;z-index: 100;top:3em;bottom:5em;width: 10em;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;}\n";
		css+="#leftSidebar {left:0px;}\n";
		css+="#rightSidebar {right: 0px;}\n";
		css+="#scrollable {width: auto;height:100%;padding: 3em 10em 5em 10em;margin: 0.5em;opacity: 1.0;overflow:auto;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;}\n";
		css+="#footer {position: fixed;z-index: 100;width: 100%;height: 5em;bottom: 0;}\n";
		css+="#header,#footer,#leftSidebar,#rightSidebar {opacity: 1.0;}\n";
		css+="#waDIV {width:48em; height:27em;position:relative;}\n";
		css+="#waCanvas {width:100%;height:100%;}\n";
		
		$("<style>").text(css).appendTo("head");			
	},
	
	justTheNumber:function(el,prop) {
		return $(el).css(prop).replace(/[^-\d\.]/g, '');
	},
	
	react: function() {
	if (this.useMQ) return;
		 //var originalFontSize = $('html').css('font-size');
		//	$('html').css('font-size', originalFontSize);
		 // });
  
		var fs = stylesheet.justTheNumber("body","font-size"),
			wwem = (window.innerWidth / fs);
		margin=(fs/20);
		full=( wwem - (margin*2) );
		half=( (wwem - (margin*4)) / 2);
		third=( (wwem - (margin*6)) / 3);
		fourth=( (wwem - (margin*8)) / 4);
		sixth=( (wwem - (margin*12)) / 6);
		eigth=( (wwem - (margin*16)) / 8);
	}
}

function googlePush() {
	//if (location.protocol!='file:') {
		(adsbygoogle = window.adsbygoogle || []).push({});
	//} else {
	//	ads = $(".adsbygoogle").css('background','red');
	//}
};

$(document).ready(function () {
	stylesheet.init();
});

$(window).resize(function() {
	stylesheet.react();
});
