#!/bin/bash
#                         
### We are running internal operation...do not show banner again.                                                
if [ "$3" != internal ]; then
	echo "                  __      ___  __              ___       __   __       "
	echo "  |\ |  /\  |\ | /  \ __ |__  |__)  /\   |\/| |__  |  | /  \ |__) |__/ "
	echo "  | \| /~~\ | \| \__/    |    |  \ /~~\  |  | |___ |/\| \__/ |  \ |  \ "
fi
#
### OOPS! Display usage help
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"     
	echo "USAGE: $BUILD [Module] [build]"
	echo "Modules:"
	echo "	nano || nanocss"
	echo "	gldl || dtul"
	echo "Builds:"
	echo "	local || debug || release"
	echo "Note: No Build type will build all three types."
fi
echo "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
BUILD=build.sh
TIMESTAMP=$(date +"%c")
CURRFOLDER=$(pwd)
VERSION="1.0.0"
#

if [ "$3" != internal ]; then
	if [[ -z "$VERSION" ]]; then
		read -p "Please enter current version?" VERSION
	else
		echo "Current Nano Framework Version is ${VERSION}"
	fi
elif [ "$3" == internal ]; then
	VERSION=$4
fi

#
echo "Current Working Folder: $CURRFOLDER"
#
VER_NANOFW='1.0.0';
#
### H5C3 DEVELOPERS FOLDER (local)
HOST=code.nanofw.com	  		#This is the FTP servers host or IP address. 
USER=nlaakald             		#This is the FTP user that has access to the server. 
PASS=yy166027!ALD      			#This is the password for the FTP user. 
#
GIT_DIR=/cygdrive/c/devtools/GitHub
TEST_DIR=/cygdrive/c/devtools/ZendServer/Apache2/htdocs
ROOT_DIR=$GIT_DIR/Nano-Framework
CDN_DIR=$GIT_DIR/cdn/framework/nano
LCL_NFW=/cygdrive/c/devtools/ZendServer/Apache2/htdocs/cdn/framework/nano
mkdir -p $CDN_DIR
SRC_DIR=$ROOT_DIR/src
#
### Third Party Libraries & I2TM Output
TMP_FILE=build.tmp.js
#
### Output Folders
DST_DIR=$ROOT_DIR/dist
mkdir -p $DST_DIR

#
### Determine distribution type
if [ "$1" == nano ]; then
	MODULE=nano
	NAME="Nano Framework"
	SRC_DIR=$SRC_DIR/$MODULE
	#COMBINE="$SRC_DIR/js/string.js $SRC_DIR/js/contextmenu.js $SRC_DIR/js/cs2i.js $SRC_DIR/js/accutimer.js $SRC_DIR/js/r2wl.js $SRC_DIR/js/devicetest.js $SRC_DIR/js/launcher.js $SRC_DIR/js/localstorage.js $SRC_DIR/js/nldr.js $SRC_DIR/js/factory.js $SRC_DIR/js/google.js $SRC_DIR/js/applet.js $SRC_DIR/js/appletfactory.js $SRC_DIR/js/cloudapp.js $SRC_DIR/js/footer.js"
	COMBINE="$SRC_DIR/js/string.js $SRC_DIR/js/cs2i.js $SRC_DIR/js/IAccutimer.js $SRC_DIR/js/IFactory.js $SRC_DIR/js/IDeviceStorage.js $SRC_DIR/js/IDevicetest.js $SRC_DIR/js/ILauncher.js $SRC_DIR/js/IGoogle.js	$SRC_DIR/js/IApplet.js	$SRC_DIR/js/IAppletFactory.js $SRC_DIR/js/IConfigManager.js $SRC_DIR/js/ICloudApplication.js"
elif [ "$1" == nanocss ]; then
	MODULE="nano"
	NAME="Nano framework"
	COMBINE="$SRC_DIR/nano/css/bootstrap.min.css $SRC_DIR/nano/css/font-awesome.min.css $SRC_DIR/nano/css/bootstrap-nano.css"
	OUT_FILE="nano.release.css"
	cat ${COMBINE} > ${TMP_FILE}
	# sed search/replace ../fonts with {FONT_PATH}
	echo "- Performing nano modifications to css ${TMP_FILE}"
	cp -rfu ${TMP_FILE} ${CDN_DIR}/$VERSION/nano.debug.css
	cp -rfu ${TMP_FILE} ${LCL_NFW}/$VERSION/nano.debug.css
	cp -rfu ${TMP_FILE} ${CDN_DIR}/$VERSION/nano.local.css
	cp -rfu ${TMP_FILE} ${LCL_NFW}/$VERSION/nano.local.css
	java -jar yuicompressor-2.4.7.jar --type css ${TMP_FILE} -o ${OUT_FILE}
	cp -rfu ${OUT_FILE} ${CDN_DIR}/$VERSION
	echo "Copying to Local Apache Framework folder"
	cp -rfu ${OUT_FILE} ${LCL_NFW}/$VERSION
	#rm -f ${OUT_FILE}
	exit 0
elif [ "$1" == gldl ]; then
	MODULE=${1}
	NAME="Game Library Development Layer (GLDL)"
	SRC_DIR=$SRC_DIR/$MODULE
	COMBINE="$SRC_DIR/main.js $SRC_DIR/ext/box2dweb.2.1a-pc.js $SRC_DIR/gldl.js $SRC_DIR/loader.js $SRC_DIR/input.js $SRC_DIR/hashmap.js $SRC_DIR/tools.js $SRC_DIR/color.js $SRC_DIR/debug.js $SRC_DIR/device.js $SRC_DIR/sound.js $SRC_DIR/layer.js $SRC_DIR/imagelayer.js $SRC_DIR/entitylayer.js $SRC_DIR/tileset.js $SRC_DIR/tilemap.js $SRC_DIR/tilelayer.js $SRC_DIR/hextilelayer.js $SRC_DIR/isotilelayer.js $SRC_DIR/entity.js $SRC_DIR/sprite.js $SRC_DIR/spritesheet.js $SRC_DIR/math.js $SRC_DIR/image.js $SRC_DIR/scene.js $SRC_DIR/game.js $SRC_DIR/dataresource.js $SRC_DIR/components/component.js $SRC_DIR/components/physics.js $SRC_DIR/components/alpha.js $SRC_DIR/components/joint.js $SRC_DIR/components/expiry.js $SRC_DIR/components/originshifter.js $SRC_DIR/components/spatial.js $SRC_DIR/components/overlay.js $SRC_DIR/components/clip.js $SRC_DIR/components/activator.js $SRC_DIR/components/input.js $SRC_DIR/components/fade.js $SRC_DIR/components/spin.js $SRC_DIR/components/scale.js $SRC_DIR/components/rect.js $SRC_DIR/components/poly.js $SRC_DIR/components/circle.js $SRC_DIR/components/text.js $SRC_DIR/components/sprite.js $SRC_DIR/components/layout.js $SRC_DIR/components/mover.js $SRC_DIR/components/particleemitter.js $SRC_DIR/systems/system.js $SRC_DIR/es/entitymanager.js $SRC_DIR/es/systemmanager.js $SRC_DIR/systems/entitysystem.js $SRC_DIR/systems/physics.js $SRC_DIR/systems/effects.js $SRC_DIR/systems/particles.js $SRC_DIR/systems/mover.js $SRC_DIR/systems/input.js $SRC_DIR/systems/expiry.js $SRC_DIR/systems/activation.js $SRC_DIR/systems/render.js $SRC_DIR/systems/layout.js"
elif [ "$1" == dtul ]; then
	MODULE=${1}
	NAME="Developer Tools & Utilities Layer (DTUL)"
	SRC_DIR=$SRC_DIR/$MODULE
	COMBINE="../layers/layer.js $SRC_DIR/dtul.js handlebars.js"
elif [ "$1" == docs ]; then
	echo Building Documentation...
	jsdoc -c jsdoc.conf.json
	echo Complete.
	exit 0
else
	echo "ERROR: Invalid parameter for Source Module. Use [nano|cs2i|mwdl|gldl|dtul] or [css|docs|hoomla]"
	exit 2
fi
#
#DESC=`cat $ROOT_DIR/$MODULE/header.js`
#
###Determine distribution type
if [ "$2" == debug ]; then
	DISTRO="debug"
elif [ "$2" == release ]; then
	DISTRO="release"
elif [ "$2" == local ]; then
	DISTRO="local"
elif [ "$2" == "" ]; then
	$BUILD $MODULE local internal $VERSION
	$BUILD $MODULE debug internal $VERSION
	$BUILD $MODULE release internal	$VERSION 
	exit
else
	echo "ERROR: Invalid parameter for Distribution type. Use [local|debug|release|all]"
	exit 2
fi
#
echo "$NAME $DISTRO Edition v$VERSION built $TIMESTAMP"
#
### Setup Package names & Folders
PKG_FOLDER=$MODULE.$DISTRO-v$VERSION
OUT_DST=${DST_DIR}/${DISTRO}
mkdir -p ${OUT_DST}
OUT_DST_PKG=${OUT_DST}/${PKG_FOLDER}
mkdir -p ${OUT_DST_PKG}
OUT_FILE=$MODULE.$DISTRO.js

mkdir -p ${CDN_DIR}
mkdir -p ${CDN_DIR}/$VERSION/
mkdir -p ${LCL_NFW}
mkdir -p ${LCL_NFW}/$VERSION/

#
### COMBINING H5C3 CLOUD API (PRIVATE)
echo "- Deleting old ${TMP_FILE}"
echo "/*! $NAME $DISTRO Edition v$VERSION built $TIMESTAMP /*" > ${TMP_FILE}
#chmod 644 ${TMP_FILE}
echo "- COMBINING ${NAME} API into ${TMP_FILE}"
cat ${COMBINE} > ${TMP_FILE}

#makeDocs

#
#> $DOC_FILE
#chmod 644 ${DOC_FILE}
#cp -r -p yuidoc.json ${SRC_DIR}
#
### Insert Framework/Layer Build information into source code
echo "- Inserting distribution, version and build time into ${TMP_FILE}"
sed -i -e "s/{NAME}/${NAME}/" -e "s/{VERSION}/${VERSION}/" -e "s/{DISTRO}/${DISTRO}/" -e "s/{TIMESTAMP}/${TIMESTAMP}/" -e "s/{VER_BOOTSTRAP}/${VER_BOOTSTRAP}/" -e "s/{VER_JQUERY}/${VER_JQUERY}/" -e "s/{VER_FONTAWESOME}/${VER_FONTAWESOME}/" -e "s/{VER_MODERNIZR}/${VER_MODERNIZR}/" -e "s/{VER_NANOFW}/${VER_NANOFW}/" ${TMP_FILE}
if [ "$1" == "nano" ]; then
	cat $SRC_DIR/js/vendor/jquery.min.js $SRC_DIR/js/vendor/bootstrap.min.js ${TMP_FILE} > ${OUT_FILE}
fi
#
if [ "$2" == local ]; then
	echo "- Coping ${TMP_FILE} ${OUT_FILE}"
	cp -rfu ${TMP_FILE} ${OUT_FILE}
	cp -rfu ${OUT_FILE} ${LCL_NFW}/$VERSION/$OUT_FILE
	cp -rfu ${OUT_FILE} ${CDN_DIR}/$VERSION/$OUT_FILE
fi
#
### REMOVE ALL LINES OF CODE WITH "debug" 
if [ "$2" == release ]; then
	echo "- REMOVE ALL LINES OF CODE FOR DEBUGGING FROM ${TMP_FILE}"
	echo "- Setting Attributes for ${TMP_FILE}"
	echo "- Removing any debug calls from ${TMP_FILE}"
	sed -i -e '/debug/Id' ${TMP_FILE} 
fi
#
### MINIMIZE -> COMPRESS
if [ "$2" != local ]; then
	echo "- Minimizing ${TMP_FILE} to ${OUT_FILE}..."
	#java -jar compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js ${TMP_FILE} --js_output_file ${OUT_FILE}
	java -jar compiler.jar --js ${TMP_FILE} --js_output_file ${OUT_FILE}
	
	cp -rfu ${TMP_FILE} ${OUT_DST_PKG}/$OUT_FILE	
fi

if [ "$1" == nano ]; then
	echo "Combine jQuery+Bootstrap+NanoFW Min's into single minimized file"
	cp -rfu ${OUT_FILE} ${TMP_FILE}
	cat $SRC_DIR/js/header.js $SRC_DIR/js/vendor/jquery.min.js $SRC_DIR/js/vendor/bootstrap.min.js ${TMP_FILE} > ${OUT_FILE}
fi
cp -rfu ${OUT_FILE} ${CDN_DIR}/$VERSION/$OUT_FILE
cp -rfu ${OUT_FILE} ${LCL_NFW}/$VERSION/$OUT_FILE

# echo "- Coping ${OUT_FILE} ${DST_DIR}"
# cp -rfu ${OUT_FILE} ${DST_DIR}
# echo "- Coping ${OUT_FILE} ${CDN_DIR}"
# echo "Copying to Live Staging CDN Folder"
# cp -rfu ${OUT_FILE} ${CDN_DIR}
# echo "Copying to Local Apache Framework folder"
# cp -rfu ${OUT_FILE} ${LCL_NFW}/$VERSION/
# echo "- Coping ${OUT_FILE} ${CDN_DIR}/$VERSION/"
# cp -rfu ${OUT_FILE} ${CDN_DIR}/$VERSION/
# echo "- Moving ${OUT_FILE} ${OUT_DST_PKG}"
# mv ${OUT_FILE} ${OUT_DST_PKG}
#
### Move files to server
#echo "Transfering to server."
#ftp -inv $HOST << EOF
#user $USER $PASS
#cd $TEST_DIR
#lcd ../code/i2tm/js
#put $OUT_FILE
#bye
#EOF
#
### All Done
echo "Build Complete."
exit 0