#!/bin/bash
echo "-> PRE-BUILD"
uglifyjs stacktrace.js -o dist/stacktrace.js.min -c -m -v --comments
uglifyjs base64.js -o dist/base64.js.min -c -m -v --comments
uglifyjs string.js -o dist/string.js.min -c -m -v --comments
uglifyjs alias.js -o dist/alias.js.min -c -m -v --comments
uglifyjs h5c3.js -o dist/h5c3.js.min -c -m -v --comments
uglifyjs errorhandler.js -o dist/errorhandler.js.min -c -m -v --comments
uglifyjs brand.js -o dist/brand.js.min -c -m -v --comments
uglifyjs lzw.js -o dist/lzw.js.min -c -m -v --comments
uglifyjs bootstrap.js -o dist/bootstrap.js.min -c -m -v --comments
echo "-> Done."