aceideLoaded=function(){
	console.log('aceideLoaded() Called.');
	var ide=document.getElementById('ide');
	var ideTitle=document.getElementById('ideTitle');
	var ideBody=document.getElementById('ideBody');
	var ideEditor=document.getElementById('ideEditor');
	ide.style.height=(window.innerHeight-ide.top-ideTitle.top)+'px';
	alert(ide.style.height);
	ideBody.style.height=(ide.clientHeight-ideTitle-ide.parentElement.clientHeight)+'px';
	alert(ideBody.style.height);
	ideEditor.style.height=(ideBody.clientHeight)+'px';
	alert(ideEditor.style.height);

	ace.config.set("basePath", "/maestro/shared/aceide/js/ace/");
	var oEditor = ace.edit("ideEditor");
	oEditor.setTheme("ace/theme/cobalt");
	oEditor.getSession().setMode("ace/mode/javascript");
};
