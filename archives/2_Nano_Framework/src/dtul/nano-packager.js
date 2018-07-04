var applets = [];
var Download = {
	click : function($node) {
		var ev = document.createEvent("MouseEvents");
		ev.initMouseEvent("click", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		return $node.dispatchEvent(ev);
	},
	encode : function($data, $isBin) {
			if ($isBin)
				return 'data:application/octet-stream;base64,' + atob( $data );
			else 
				return 'data:application/octet-stream;base64,' + btoa( $data );
			
	},
	link : function($data, $name){
		var a = document.createElement('a');
		a.download = $name || self.location.pathname.slice(self.location.pathname.lastIndexOf('/')+1);
		a.href = $data || self.location.href;
		return a;
	}
};

Download.save = function($data, $name, $isBin){
	this.click(	this.link( this.encode( $data, $isBin ),$name) );
};
			
function nano_save_applet(a) {
	var 
		fileName = 'applet.'+a.applet.dataset.name+'-'+a.applet.dataset.version,
		srcName = fileName+'.js',
		binName = fileName+'egz.js';
		
		//Send Source back to user to optionally save
		Download.save(a.applet.outerHTML, srcName,false);
		//Send Binary to user to save
		//Download.save($('#comp').val(), binName,true);
}

function nano_applet_validate(help) {
	var uuid,name,version,wrapper,content = false;
	var applet = new $n.df.Applet();
	$("#status").html("Validating...");
	var a = $("iframe#client").contents().find( "div" ).each(function(index,value) {
		if (index===0) {
			var b = applet.verify(value,help);
			if (b.result===0 && ! help) {
				$("#status").css("color","green");
				nano_save_applet(b);
				//Send Source back to user to optionally save
				//Download.save(b.applet.outerHTML, srcName,false);
				//Send Binary to user to save
				//Download.save($('#comp').val(), binName,true);
			} else {
				if (!help) {
					$("#status").css("color","red");
					b.message+="&nbsp;<a href='javascript:nano_applet_validate(1);'>Need Assistance?</a>"
				}
			}

			if(help){
				$("#status").css("color","cyan");
				b.message+="&nbsp;You still need to change GIVE_ME_A_NAME in the Source window. Then you may <a href='javascript:nano_applet_compile(null,1);'>Process Again.</a>";
			}

			var status = $("#status");
			$("#status").html(b.message);
			if (help) {
				$('#orig').val(function(i, text) {return b.applet.outerHTML;});
				$('#enco').val(function(i, text) {return ''});
				$('#comp').val(function(i, text) {return ''});
			}
			updateSizes();					
			return b;
		}
		
	});
}

function nano_applet_compile(s,pass2) {
	if (pass2!=true) {
		$("#btnCompile").hide();
		$('#orig').val(function(i, text) { return s; });									
	}
	var original = $('#orig').val();
	
	if (VLD(original)) {
		var encoded = encodeURIComponent(original);
		var compressed = $n.df.lzw.encode(encoded);
		$('#comp').val(function(i, text) { return compressed; });					
		$('#enco').val(function(i, text) { return encoded; });					
		
		//Now Undo it
		var dst_org = $('#comp').val();
		var uncompressed = $n.df.lzw.decode(dst_org);
		var decoded = decodeURIComponent(uncompressed);
		$('#dest').val(function(i, text) { return decoded; });

		var iframe =  $('iframe#client');
		var idoc = iframe[0].contentDocument;
		idoc.open();
		idoc.write(decoded);
		idoc.close();
		
		return nano_applet_validate();
	}
	updateSizes();
}

function updateSizes() {
	$("#src_len").text($("#orig").val().length);
	$("#lzw_len").text($("#comp").val().length);
	//$("#enc_len").text($("#enco").val().length);
	//$("#dst_len").text($("#dest").val().length);
}

function handleFileSelect(evt) {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}
	
	$("#files").hide();	
	var files = evt.target.files; // FileList object
	if (files.length>1) {
		$("#btnCompile").value="Compile package."
	} else {
		$("#btnCompile").value="Compile applet."
	}
	$("#btnCompile").show();				
	
	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
	  output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
				  f.size, ' bytes, last modified: ',
				  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
				  '</li>');
	}
	GEI('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function readBlob(opt_startByte, opt_stopByte) {
	var files = GEI('files').files;
	if (!files.length) {
	  alert('Please select a file!');
	  return;
	}
	
	for (var i = 0, f; f = files[i]; i++) {
		var file = files[i];
		var start = parseInt(opt_startByte) || 0;
		var stop = parseInt(opt_stopByte) || file.size - 1;

		var reader = new FileReader();
		// If we use onloadend, we need to check the readyState.
		reader.onloadend = function(evt) {
		  if (evt.target.readyState == FileReader.DONE) { // DONE == 2
			var result = nano_applet_compile(evt.currentTarget.result);

		  }
		};

		var blob = file.slice(start, stop + 1);
		reader.readAsBinaryString(blob);
	}
}

function filemanager() {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
		GEI('files').addEventListener('change', handleFileSelect, false);
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}
}
