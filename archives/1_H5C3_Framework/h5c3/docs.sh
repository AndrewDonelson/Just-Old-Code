##############################################
# PROCESS DOCUMENTATION & PUBLISH
##############################################

#H5C3 DEVELOPERS PORTAL (public)
H5C3_DIR=/d/Android_Dev/GitHUB/com.I2TMLabs.h5c3

#NATURALDOC FOLDER
NDROOT=d:/Android_Dev/GitHUB/NaturalDocs
DEV_DIR=/d/Android_Dev/GitHUB/com.I2TMLabs.h5c3.development/
PLG_DIR=${DEV_DIR}/plugins
XTR_DIR=${DEV_DIR}/extras
OUT_DOC=$H5C3_DIR/docs

if [ "$1" == debug ]; then
	echo "-> PROCESS DOCUMENTATION & PUBLISH ${OUT_CAT}"
	rm -rf ${NDROOT}/docs/src
	mkdir -p ${NDROOT}/docs/src
	
	echo "----> Copying ${DEV_DIR} to Natural Docs Working Folder..."
	cp -u -r ../h5c3.js ${NDROOT}/docs/src/
	echo "----> Copying ${DEV_DIR} to Natural Docs Working Folder..."
	cp -u -r ${DEV_DIR} ${NDROOT}/docs/src/
	echo "----> Copying ${PLG_DIR} to Natural Docs Working Folder..."
	cp -u -r  ${PLG_DIR} ${NDROOT}/docs/src/
	echo "----> Copying ${XTR_DIR} to Natural Docs Working Folder..."
	cp -u -r  ${XTR_DIR} ${NDROOT}/docs/src/
	
	echo "----> Changed working folder to ${NDROOT}/"
	cd ${NDROOT}/
	echo "----> Building Documentation..."
	echo "----> BEGIN"
	NaturalDocs -i docs/src/ -o HTML docs/out/ -p docs/prj/ -r
	echo "----> END"
	echo "----> Documentation Generated."
	
	echo "----> Deleting old and Moving new documentation to ${OUT_DOC}/"
	mkdir -p ${OUT_DOC}
	cp --u -r docs/out/ ${H5C3_DIR}
	cd ${H5C3_DIR}
	rm -r docs
	mv out docs
	cd ${H5C3_DIR}.development/h5c3/tools/
	echo "-> Done."
	echo "IMPORTANT: DO NOT forget to change stylesheet to i2tm standard documentation.css..."
fi
