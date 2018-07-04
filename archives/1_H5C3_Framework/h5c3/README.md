com.I2TMLabs.h5c3
=================

GitHub Website: http://nlaakald.github.io/H5C3-Framework

Official Website: http://h5c3.i2tmlabs.com/

HTML5 &amp; CSS3 compliant Framework that provides Cloud Applications and Applets for Mobile devices and Desktops. 
No installation required, everything resides int he cloud. Entire framework and website was designed with the developer 
in mind.

Special Thanks to Third Party software
=====================================================================================================
gameCore.js			Martin Wells		http://blog.getplaycraft.com/gamecore-js/
StackTrace.js							http://stacktracejs.com/
string.js			James Padolsey		http://james.padolsey.com
jQuery									http://jquery.com/
Font-Awesome							http://fortawesome.github.io/Font-Awesome/
Modernizr								http://modernizr.com/
Reset Revisted		Eric Meyer			http://meyerweb.com/eric/thoughts/2011/01/03/reset-revisited/

Martin Wells at PlayCraft Labs got me hooked almost a year ago with his HTML5 game library I have a 
Great Asteroids on steroids in no time that they actually used at a Game Convention. After that, i realized 
that that boring old browsers of the past were gone. We are facing new a era and I desperately wanted to help 
lay the path or framework for this new era. 

So in November 2012 I forked Playcraft v0.5.6 and and set off to develop a full blown Rapid Application Development (RAD)
framework that existed soley on the intenet or "Cloud". Since then I have developed three seperate technologies or layers as
I refer to them that make up the foundation of the H5C3 Framework.

First is the SDAL which stands for Simple DOM Alias layer. With well over 20k lines of javascript you realize two things
very quickly. One, typing "document.getElementById" 5k times sucks! So I made a global alias $DOC(). I was not using jQuery
at the time but mine is only 5 characters verus the original 23...almost 500% smaller, now multiple say just 100 uses by saving 17 characters 
and you saved 1700 bytes before minimizing or compression. So it grew into about a dozen help functions.

Next is the "Core" which brings into play gameCore.js, StackTrace.js, String.js along with many other features such as LZW 
compression and decompression, Base64 encoding & decoding, Smart AJAX 2 enabled including local filesystem access, Advanced Event 
Driven Error Handler, a Plugin system and many, many more. All you have to know how to type is "h5c3." ... It all happens there. 

Third we have the R2WL which stands for Rich, Responsive Web Layer. R2WL provided Full responsive and adaptive browser, 
Google asSense and Analytics intgration with such features as detecting developer mode and not hitting the server and can
be enabled just by adding or removing your UID from the Config file. It also exposes the latest jQuery since I use it at this level. 
jQuery is not used in the "Core" and "Engine" layers. That code is as streamlined as possible. I have also exposed Moderniz and Font-Awesome, 
both of which are used extensivley in the R2W layer. They are loaded by the framework from our servers to maintain support, so you dont have 
to load any of those. R2WL also provides and Cloud Applications and Applets, everything working off AJAX in the background. The R2WL uses
32% less bandwith over traditional web pages before compression.


 
Browsers Supported:
===================
Only Chrome Browser is supported.

Platforms & Devices Supported
=============================
I2TM Labs is designed around the Google Chromium Framework. No other browser is currently supported at this time.
The reason for this is simple...Google Chrome just works, flawlessy with all W3C standards. Microsoft Internet Explorer,
Apple Safari have bugs and issues which even though a work around could be done...it would diminish your overall experience
with our services and applications.

<pre>
- iOS 4.3 & Later
- Android 4.0 & Latar
- Windows XP Service Pack 2+
- Windows Vista
- Windows 7
- Windows 8
- Mac OS X 10.6 or later
- Ubuntu 10.04+
- Debian 6+
- OpenSuSE 11.3+
- Fedora Linux 14
</pre>

Features
========
<pre>
- 100% HTM5 & CSS3 Compliant
- Easy to use, Rapid Application Development
- Integrated Developer Window w/ Console Logging, Statisical Graphs and Profiler
- Total size of Framework is 94kb!
- Users never have to download & install, Updates are instant & users can use on all platforms.
- Simple efficient way of Creating & Extending Scenes, Layers 
- Super Accurate Timer, it ajusts for drift and gives precise FPS
- Advanced Throttling you can use for whatever you app needs to keep it smooth and balanced.
- Factory / Worker system makes it extremely easy to manage large amounts of grouped (Factory) objects (Worker)
- Simple JSON config file include on your page, reset is done for you.
- Automatic Intro (I2TM Splash, H5C3 Splash)
- Application / Game State Manager
- Full Physics Engine powered by Box2D
- Entity manager for all graphic objects
- Automatic device detection (Touchpad integration)
- Seamless Banner (advertising) Just right the Cloud Application / Applet and get paid.
- Wide range of platforms supported
- Smart AJAX 2 enabled including local filesystem access
- Advanced Event Driven Error Handler with an Attitude wrapped around StackTrace.js
- Intellegent Google adSense and Analytics integration.
- 

</pre>

Component List
==============
<pre>
- Activator				Causes an entity to be inactive (no rendering or physics etc) until another entity moves within range of it. Great for autosleeping all your monsters until the player gets close.
- Alpha					Changes the alpha drawing of an associated drawable object (sprite, shape, text etc).
- Circle				Draw a circle. The size is based on the width and height of the associated spatial.
- Clip					Clips all rendering for an entity to be within the specified rect (in layer relative coordinates). You can also specify an entity, which will clip based on the spatial rectangle of the other entity. You can also do both entity clipping as well as stacking a rectangle clip on top.
- Component				The base class for components you want to create.
- Expiry				Automatically expires an entity after a given time. Great for things like bullets that have a known lifetime; just add the expiry component and it will happily kill itself (release) after the given time.
- Fade					Adds a fade effects to the entity.
- Input					Convenience component that lets you bind input states and actions to an entity.
- Joint					Creates a joint that holds to physics entities together.
- Layout				Automatically positions an entity on screen using a variety of layout options.
- Originshifter			Shifts the origin of the entity relative to the origin of the layer it's on, with an additional origin ratio adjuster. You can use this to make an entity shift around as the layer origin moves (parallax within parallax).
- Overlay				Used to lay another sprite over an entity, with options to automagically expire after a certain time limit. Good for things like smoke, explosive damage or muzzle flashs, and where you don't need to create a complete entity.
- Particleemitter		A particle generator.
- Physics				Adds 2D physics to an entity.
- Poly					Draw a polygon
- Rect					Adds a rectangle to an entity.
- Scale					Change the draw scale of an entity.
- Spatial				Represents where an entity exists in 2D space (x, y, width and height). This component is mostly for use by other systems to update and use.
- Spin					Makes an entity spin.
- Sprite				Adds a sprite to an entity.
- Text					Adds display text to an entity.
</pre>

Systems List
============
<pre>
- Activation			Handles activating entities when they get within a certain range of another entity.
- Effects				A effects system that drives effects like fade.
- Entity System			A system that processes entities.
- Expiry				Expiry system.
- Input					Input system.
- Layout				Manages the layout of entities
- Particles				A particle system.
- Physics				A 2D physics system for entities.
- Render				Handles rendering of components: sprite, overlay, rect, text, ect.
- System				The base class for all systems & creating new ones.
</pre>

Designing your graphics
======================
<pre>
All graphics are designed for Full HD (1920x1080). When the WebApp runs it will detect what kind of 
devices is is running on and adapt accorinly. For example if the the device is on a desktop it will 
use the entire window giving a landscape view, if it is on a mobile device which requires touch it 
will run in portrait mode and get the width (most narrow) and make a perfect square for the Game 
Panel. In this case it will use the dead center of the image for the detected size.
</pre>

				