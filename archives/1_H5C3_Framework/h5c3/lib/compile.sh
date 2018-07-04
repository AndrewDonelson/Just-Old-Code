#!/bin/bash
TOOLS_DIR=/d/Android_Dev/GitHUB/com.I2TMLabs.h5c3/tools/

if [ "$1" == google ]; then
java -jar ../tools/compiler.jar --js "$2" --js_output_file "$3" --compilation_level SIMPLE_OPTIMIZATIONS
elif [ "$1" == uglify ]; then
uglifyjs "$2" -o "$3" -c -m -v --comments --define DEBUG=true
fi
