## Change Log
# i2tm Labs - Maestro!

[Home](https://github.com/NlaakALD/Maestro/wiki) | [Usage](https://github.com/NlaakALD/Maestro/wiki/Usage) | [Features](https://github.com/NlaakALD/Maestro/wiki/Features) | Change Log
######

### Updated to 1.9.0
- merged Maestro, nanofw as well as resources
- theme system, apps/index.php will get upadted to have header and footer templates

### Updated to 1.8.5
-  Server code now stored in same revision folder as client HTML/JS/CSS
- Added HybridAuth and as base for Maestro authentication (no working correctly atm)
- updated index.php initialization process. pub/app now default to maestro store
- incorporated more devmode logs and errors
- paths now react to build type. ie localhost vs production domain server

### Updated to 1.8.0
- Font-Awesome updated to 4.1.0
- Bootstrap updated to 3.2.0
- Resource collaboration mode is online.
- Applet linking is fixed
- added asset() method to get reference to resources

### Updated to v1.7.5
- moved maestro js & css folder into a maestro folder
- updated server apps (index.php) to reflect structure change
- diet change -> maestro primary crates document and environment and loads maestro intermediate and any other framework.
- moved google code from maestro primary to maestro.google.js
- added mobilecheck
- removed all console js&css
- changed loading screen, streamlined and neat
- updated, optimized loading

### Updated to v1.7.0
- Recovering from a complete loss of all local source.
- Currently scoring 100/100 on Google page Speed
- Stable and deployable
- Next version is going on a diet, need to shave 28k to be under the
fold
- COMMITED

### Updated to v1.2.0
- Added support for 2 loader themes (light, neutral and dark) in HTML attributes
- Finalized loader/wrapper crossfade
- Added appMode detection. Used by nanoFW bootstrap to determine if NanoFW should init()
- Updated CSS
- COMMITED

### updated to v1.1.10
- Moved b64 and lzw objects into private area
- Renamed strings (s) to db and moved into private area
- Added new Deep merge (mrg) method for create or combine objects /classes
- Rewrote version system, its now a method named ver()
- fixed export global bugs
- Added 35 more strings to string db
- Added new class handling method (cls) which can set, clear, add, remove replace and toggle any class on an element.
- COMMITED

### updated to v1.1.4
- added dmp method, a PHP print_r() equivalent function
- NOT COMMITED

### updated to v1.1.3
- Changed cPanel bar to 25% opacity and removed Input while closed
- Increased font-size for cPanel Title Bar (was too small on 3dpp devices)
- removed device DPP auto scaling feature (for now)
- removed cPanel input for now
- COMMITED

### updated to v1.1.0
- added vars object for handling temporary variables so they can be deleted when not being used to clean up Maestro Object
- added NF variable to keep from loading the framework during Local Testing.
- fixed bug in maestro.dec() where return was using the wrong variable.
- Added many more features to error handling
- added new cPanel at top of page
- optimized core CSS - broke even after adding cPanel CSS
- Total size is 18,956 bytes (-1,133 bytes)
- Added support for local Script and CSS loading XHR() method
- COMMITED

### initial Commit - 1.0.0
- Separated from nano Framework project.
- Total size is 20,089 bytes
- COMMITED
