##############################################
# DISPERSE TO DEVELOPERS PORTAL
##############################################
echo "-> DISPERSE TO DEVELOPERS PORTAL"
echo "----> Creating new package folder ["$OUT_PKG_DST"]"
mkdir -p ${OUT_JS}
mkdir -p ${OUT_DST}
rm -rf ${OUT_DST_PKG}
mkdir -p ${OUT_DST_PKG}
echo "----> Copying Packages to ["$OUT_DST_PKG"]"
cp -u ${OUT_CAT} ${OUT_DST_PKG}
cp -u ${OUT_MIN} ${OUT_DST_PKG}
cp -u ${OUT_ZIP} ${OUT_DST_PKG}
echo "----> Copying Plugins to Developer folder..."
mkdir -p ${OUT_PLG}
cp --u -r ../plugins ${H5C3_DIR}
echo "-> Done."
