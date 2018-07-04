## Change Log
# i2tm Labs - Nano Framework

[Home](https://github.com/NlaakALD/Maestro/wiki) | [Usage](https://github.com/NlaakALD/Maestro/wiki/Usage) | [Features](https://github.com/NlaakALD/Maestro/wiki/Features) | Change Log
######

### Version 1.0.0f
- Received method isa() from Maestro and made it global ISA()
- Rename Bootstrap.js to nldr.js
- Move Applet Loading to Nano Loader (NLDR)
- Removed Throttle Class
- Finalized JSON config format
- Modified footer.js to not run framework unless appMode is Application
- Fixed some bugs with applet loading / embeding
- Added Shared support for applets. you can not load from another accessible repo
- rewrote nldr loading 
- COMMITED

#Nano Framework changelog
=========================
### Version 1.0.0e
TODO: Convert Application Script/Style Loads into AJAX
ACTV: Move GLDL Resource (Sound, Image and Maps) to NLDR
- Configure JSON Files now array of 2 arrays [js and css] are now separate for more efficient loading.
Note: All Loading should be handled by the NLDR object and loaded via AJAX