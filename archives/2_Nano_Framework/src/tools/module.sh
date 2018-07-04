#!/bin/bash

ROOT_DIR=/cygdrive/c/devtools/GitHub/H5C3_Framework

modernizr=$(<$ROOT_DIR/code/modernizr/modernizr.min.js)
jquery=$(<$ROOT_DIR/code/jquery/jquery.min.js)
bootstrapjs=$(<$ROOT_DIR/code/bootstrap/js/bootstrap.min.js)
bootstrapcss=$(<$ROOT_DIR/code/bootstrap/css/bootstrap.min.css)
nanojs=$(<$ROOT_DIR/code/i2tm/js/nano.release.js)
nanocss=$(<$ROOT_DIR/code/i2tm/css/nano.css)
json="{\"modernizr\":\""$modernizr"\", \"jquery\":\""$jquery"\", \"bootstrapjs\":\""$bootstrapjs", \"bootstrapcss\":\""$bootstrapcss", \"nanojs\":\""$nanojs"\", \"nanocss\":\""$nanocss"\"\"}"
echo -n -e "{\"modernizr\":\""$modernizr"\", \"jquery\":\""$jquery"\", \"bootstrapjs\":\""$bootstrapjs", \"bootstrapcss\":\""$bootstrapcss", \"nanojs\":\""$nanojs"\", \"nanocss\":\""$nanocss"\"\"}" > module.json
#echo -n -e $(printf '%q' $json) > module.json
base64 module.json > module.b64
gzip -9 module.b64