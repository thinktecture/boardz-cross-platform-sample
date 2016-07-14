# Sample application for various “Cross-Platform HTML5 – in Action!” workshops

## Setup
* Download and install the platform SDKs and/or emulators for the platform you want to develop for (this might take quite a while… so do this first!)
  * [XCode](https://developer.apple.com/xcode/download/)
  * [Android SDK](https://developer.android.com/sdk/index.html)
  * [Windows 10 SDK](https://dev.windows.com/en-us/downloads/windows-10-sdk)
* Download and install [node.js](https://nodejs.org/)
* Make sure you have the [git command line tools](https://git-scm.com/downloads) installed
* Install and install [ImageMagick](http://www.imagemagick.org/script/binary-releases.php) (base toolkit for image processing, here used for splash screen and icon generation)
* Install Cordova: `npm install -g cordova`
* Install gulp: `npm install -g gulp`
* MacOSX and Linux users need to install [Wine](https://wiki.winehq.org/) (for executing the Electron Windows build task)
* Download and install [Atom](https://atom.io/) or another editor of your choice (free: `notepad`, [Visual Studio Code](https://code.visualstudio.com/); commercial: [Sublime Text](https://www.sublimetext.com/), [WebStorm](https://www.jetbrains.com/webstorm/))

## Building
The gulp tasks will build iOS, Windows UWP, Android apps as well as desktop applications for Mac OSX, Windows and Linux.
To get it working, please do the following:

* After cloning the repo: `npm i --no-progress` within the root folder of this repository
* Run `gulp watch-web` to start a live server, which is best when developing the app
* Run `gulp watch-cordova-ios` to orchestrate the cordova ios app with live reloading. When this task runs, go to `dist/mobile` and use `cordova run ios` to open a simulator which will live reload.
* Run `gulp watch-electron` to start a live reloading electron app
* Run `gulp` to build the web app
* Release Mode: Use the following gulp tasks to build the apps in release mode
    * Run `gulp build-all` to build all apps in debug mode
    * Run `gulp build-web` to build the web app
    * Run `gulp build-cordova` to build all phone related apps
    * Run `gulp build-electron` to build all desktop related apps

## Running

### Web

Use `gulp watch-web` as mentioned above to start the browser version of BoardZ.

### Cordova

To run the cordova project, open a terminal and point it to `dist/mobile`. Use one of the following commands to start:

* `cordova run ios`: Runs the iOS version of BoardZ. Requires a Mac
* `cordova run android`: Runs the Android version of BoardZ. Requires Android SDK to be installed and at least a simulator

If a device is connected, the `run` command will automatically deploy the App to your device, so you can start it directly on your device.

### Electron

To start the electron packaged app, go to `dist/desktop/build` and open one of the directories suiting your current operating system. Then open the executable as used to. 

## Supported platforms
* Any modern web browser (Chrome, Firefox, Edge, Safari) by simply hosting it
* Mobile platforms (iOS, Android, Windows) by packaging the app using Cordova
* Desktop platforms (Windows, Mac OS X, Linux) by packaging the app using Electron

### Android Settings

#### SDK version

If you want to change [Android's SDK version](http://developer.android.com/guide/topics/manifest/uses-sdk-element.html), open [cordova/config.xml](cordova/config.xml) and search for `android-minSdkVersion` or `android-targetSdkVersion`:

* `android-minSdkVersion`: An integer designating the minimum API Level required for the application to run.
* `android-targetSdkVersion`: An integer designating the API Level that the application targets. If not set, the default value equals that given to minSdkVersion.

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
* [Leaflet](http://leafletjs.com/), an open-source JavaScript library for mobile-friendly interactive maps
* [pNotify](http://sciactive.com/pnotify/) UI notification library

### Native Wrappers
* [Cordova](https://cordova.apache.org/) for mobile apps
  * [Camera Plugin](https://github.com/apache/cordova-plugin-camera), allows native camera access
  * [Geolocation Plugin](https://github.com/apache/cordova-plugin-geolocation), allows access to geolocation
  * [Statusbar Plugin](https://github.com/apache/cordova-plugin-statusbar), allows modifying the statusbar
* [Electron](http://electron.atom.io/) for desktop applications

## Additional Resources
* [Cross-platform 2D and 3D visualizations](https://github.com/thinktecture/basta-herbst-2015-2d-3d)
* [Offline-first architecture for HTML5 apps](https://speakerdeck.com/christianweyer/auch-ohne-netz-offline-first-architekturen-fur-html5-apps)
* [Leightweight architecture with ASP.NET and SignalR](https://speakerdeck.com/christianweyer/fur-alle-leichtgewichtige-architekturen-mit-asp-dot-net-web-api-and-signalr)
