// executes when complete page is fully loaded, including all frames, objects and images
$(window).load(function () {
	window.editor = ace.edit("editor");
	window.editor.setTheme("ace/theme/ambiance");
	window.editor.getSession().setMode("ace/mode/javascript");
});
