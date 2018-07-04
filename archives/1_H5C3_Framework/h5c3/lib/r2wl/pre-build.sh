#!/bin/bash
echo "-> PRE-BUILD"
uglifyjs google.js -o dist/google.js.min -c -m -v --comments
uglifyjs style.js -o dist/style.js.min -c -m -v --comments
uglifyjs layout.js -o dist/layout.js.min -c -m -v --comments
uglifyjs applet.js -o dist/applet.js.min -c -m -v --comments
uglifyjs smartmenu.js -o dist/smartmenu.js.min -c -m -v --comments
echo "-> Done."