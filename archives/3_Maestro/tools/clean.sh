#!/bin/bash
CURRFOLDER=$(pwd)
cd /cygdrive/c/devtools/Github/H5C3_Framework
find ./src/tools -name '*.sh' -exec dos2unix {} \;
cd $CURRFOLDER