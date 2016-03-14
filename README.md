# Sample application for various “Cross-Platform HTML5 – in Action!” workshops

## Requirements
* [NodeJS](http://nodejs.org) NodeJS
* Git-Client (GitHub for Desktop)
* Postman https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop
* WebStorm 

## Setup
* Download and install the platform SDKs and/or emulators for the platform you want to develop for (this might take quite a while… so do this first!)
  * [Xcode](https://developer.apple.com/xcode/download/)
  * [Android SDK](https://developer.android.com/sdk/index.html)
  * [Windows 10 SDK](https://dev.windows.com/en-us/downloads/windows-10-sdk)
* Download and install [node.js](https://nodejs.org/)
* Download and install [Atom](https://atom.io/) or another editor of your choice (free: `notepad`, [Visual Studio Code](https://code.visualstudio.com/); commercial: [Sublime Text](https://www.sublimetext.com/), [WebStorm](https://www.jetbrains.com/webstorm/))
 

## Building
The gulp task will build iOS, Windows UWP, Android phone apps as well as desktop apps for Mac OSX, Windows and Linux. To get it working, please do the following:

* After cloning the repo: `npm i --no-progress` within the root folder of this repository
* Run `gulp watch-web` to start a live server, which is best when developing the app
* Run `gulp` to build the web app
* Release Mode: Use the following gulp tasks to build the apps in release mode
    * Run `gulp build-all` to build all apps in debug mode
    * Run `gulp build-web` to build the web app
    * Run `gulp build-cordova` to build all phone related apps
    * Run `gulp build-electron` to build all desktop related apps

## Supported platforms
* Any modern web browser (Chrome, Firefox, Edge, Safari) by simply hosting it
* Mobile platforms (iOS, Android, Windows) by packaging the app using Cordova
* Desktop platforms (Windows, Mac OS X, Linux) by packaging the app using GitHub's electron

## Third-Party Libraries
### JavaScript, CSS
* [Angular2](https://angular.io/), JavaScript framework — HTML enhanced for web apps!
* [Bootstrap](http://getbootstrap.com/), responsive layout framework
* [AdminLTE](https://almsaeedstudio.com/preview), free responsive dashboard template
  * [Font Awesome](https://fortawesome.github.io/Font-Awesome/), free icon font
  * [jQuery](https://jquery.com/), JavaScript library required for AdminLTE
  * [winstore-jscompat](https://github.com/MSOpenTech/winstore-jscompat), fixes jQuery issues with Windows (Phone) 8 and 8.1 platforms
* [FastClick](https://github.com/ftlabs/fastclick), eliminates the [infamous 300 ms lag on touch devices](http://developer.telerik.com/featured/300-ms-click-delay-ios-8/)
* [HammerJS](http://hammerjs.github.io/), for touch interactions
* [FontAwesome](http://fontawesome.io) Images powered by font awesome
* [three.js](http://threejs.org/), JavaScript library for WebGL and 3D content
  * [Touch Polyfill](https://github.com/CamHenlin/TouchPolyfill), adds touch event support to Internet Explorer 11/Windows (Phone) 8.1
* [Leaflet](http://leafletjs.com/), an open-source JavaScript library for mobile-friendly interactive maps
* [pNotify](http://sciactive.com/pnotify/) UI notification library

### Native Wrappers
* [Cordova](https://cordova.apache.org/)
  * [Camera Plugin](https://github.com/apache/cordova-plugin-camera), allows native camera access
  * [Geolocation Plugin](https://github.com/apache/cordova-plugin-geolocation), allows access to geolocation
  * [Statusbar Plugin](https://github.com/apache/cordova-plugin-statusbar), allows modifying the statusbar
* [Ionic](http://ionicframework.com/)
* [Electron](http://electron.atom.io/)

## Additional Resources
* [Cross-platform 2D and 3D visualizations](https://github.com/thinktecture/basta-herbst-2015-2d-3d)
* [Offline-first architecture for HTML5 apps](https://speakerdeck.com/christianweyer/auch-ohne-netz-offline-first-architekturen-fur-html5-apps)
* [Leightweight architecture with ASP.NET and SignalR](https://speakerdeck.com/christianweyer/fur-alle-leichtgewichtige-architekturen-mit-asp-dot-net-web-api-and-signalr)
