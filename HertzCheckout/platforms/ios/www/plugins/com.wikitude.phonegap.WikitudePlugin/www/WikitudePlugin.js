cordova.define("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin", function(require, exports, module) {
	/**
	 * Release date: 29.07.14
	 */

	var WikitudePlugin = function() {

		/**
		 *  This is the SDK Key, provided to you after you purchased the Wikitude SDK from http =//www.wikitude.com/store/.
		 *  If you're having a trial version, leave this string empty.
		 */
		this._sdkKey = "cuDvdcxXhdRuMDAqAPtbt9HcjNt9A6EJcMhvF8SERXcX7dKXUNfgiiXad+WuqQ4k1PGeY7k9cWb03JCucKMDx7mC8UxQUkKRDtkPEFjjCp6rRA3LPH160xjwvxe4GZu2QaS05GPkkB5jkzQfXtC4enldr/Qpwd4HKHfC22uJqDFTYWx0ZWRfX2DzB7vD4Qu7XUK+TTKcaZZuMWoHk7SS6rgiVzs0uhstWC3pJPfWJPjoUsP+Yh///toIK3Z+d59WGWwd4L/4lbP5XTvmNyTcQK0rdc9CDC632YDu5n4x6Rzx43tr64w49e3Zzdvev4kRk4u5fcldybb+FBwt2db8nuzGToFny2GdWkF4cTm2tiQHtLPCYctZe/AJ5CpnyLwJIS4SXN6Yd2LFh/6jP7xASc9YLQt4KhhtZTFuu1qKcP3R1Z+LcYtSi07cam3KRoK2/NYukAr0jklXlHUTzvSqK3kiL6W4yLhD0ZhcjForquWuOEc5TJvfWPkQ/9b5psFXXLM+emLL0OSIBkfoPqCXEztMEQX8WFh9r8UV0BAHfefoRPxO/OfEn9nahxqVnOjy3em3Hgo5DzlMj4zFlvZTDPpo8NJDANIRNBNGs9kFygKElOPPi/bw+s11pT+w+1Rkr26Q/lPCsOb/18Lj1wcA5uDad9S+4KE1G5artqAKqFU=";


		/**
		 *  This variable represents if the current device is capable of running ARchitect Worlds.
		 */
		this._isDeviceSupported = false;


		/**
		 *  The Wikitude SDK can run in different modes.
		 *      * Geo means, that objects are placed at latitude/longitude positions.
		 *      * IR means that only image recognition is used in the ARchitect World.
		 *  When your ARchitect World uses both, geo and ir, than set this value to "IrAndGeo". Otherwise, if the ARchitectWorld only needs image recognition, placing "IR" will require less features from the device and therefore, support a wider range of devices. Keep in mind that image recognition requires a dual core cpu to work satisfyingly.
		 */
		this._augmentedRealityMode = "IrAndGeo"; // "IR" for image recognition worlds only, "Geo" if you want to use Geo AR only


		/**
		 *  Callbacks that are used during device compatibilty checks.
		 */
		this._onDeviceSupportedCallback = null;
		this._onDeviceNotSupportedCallback = null;


		/**
		 *  Callbacks that are used if an ARchitect World was launched successfully or not.
		 */
		this._onARchitectWorldLaunchedCallback = null;
		this._onARchitectWorldFailedLaunchingCallback = null;
	};


	/*
	 *	=============================================================================================================================
	 *
	 *	PUBLIC API
	 *
	 *	=============================================================================================================================
	 */

	/* Managing ARchitect world loading */

	/**
	 *  Use this function to check if the current device is capable of running ARchitect Worlds.
	 *
	 * @param {function} successCallback A callback which is called if the device is capable of running ARchitect Worlds.
	 * @param {function} errorCallback A callback which is called if the device is not capable of running ARchitect Worlds.
	 */
	WikitudePlugin.prototype.isDeviceSupported = function(successCallback, errorCallback) {

		// Store a reference to the success and error callback function because we intercept the callbacks ourself but need to call the developer ones afterwards
		this._onDeviceSupportedCallback = successCallback;
		this._onDeviceNotSupportedCallback = errorCallback;


		// Check if the current device is capable of running Architect Worlds
		cordova.exec(this.deviceIsARchitectReady, this.deviceIsNotARchitectReady, "WikitudePlugin", "isDeviceSupported", [this._augmentedRealityMode]);
	};

	/**
	 *	Use this function to load an ARchitect World.
	 *
	 * 	@param {String} worldPath The path to an ARchitect world, ether on the device or on e.g. your Dropbox.
	 */
	WikitudePlugin.prototype.loadARchitectWorld = function(worldPath) {

		// before we actually call load, we check again if the device is able to open the world
		if (this._isDeviceSupported) {

			//	the 'open' function of the Wikitude Plugin requires some parameters
			//	@param {String} SDKKey (required) The Wikitude SDK license key that you received with your purchase
			//	@param {String} ARchitectWorldPath (required) The path to a local ARchitect world or to a ARchitect world on a server or your dropbox
			//	@param {String} AugmentedRealityMode (optional) describes in more detail how the Wikitude SDK should be instantiated
			cordova.exec(this.worldLaunched, this.worldFailedLaunching, "WikitudePlugin", "open", [{
				"SDKKey": this._sdkKey,
				"ARchitectWorldPath": worldPath,
				"AugmentedRealityMode": this._augmentedRealityMode
			}]);


			// We add an event listener on the resume and pause event of the application lifecycle
			document.addEventListener("resume", this.onResume, false);
			document.addEventListener("pause", this.onPause, false);

		} else {

			// If the device is not supported, we call the device not supported callback again.
			if (this._onDeviceNotSupportedCallback) {
				this._onDeviceNotSupportedCallback();
			}
		}
	};

	/* Managing the Wikitude SDK Lifecycle */
	/**
	 *	Use this function to stop the Wikitude SDK and to remove it from the screen.
	 */
	WikitudePlugin.prototype.close = function() {

		document.removeEventListener("pause", this.onPause, false);
		document.removeEventListener("resume", this.onResume, false);

		cordova.exec(this.onWikitudeOK, this.onWikitudeError, "WikitudePlugin", "close", [""]);
	};

	/**
	 *	Use this function to only hide the Wikitude SDK. All location and rendering updates are still active.
	 */
	WikitudePlugin.prototype.hide = function() {
		cordova.exec(this.onWikitudeOK, this.onWikitudeError, "WikitudePlugin", "hide", [""]);
	};

	/**
	 *	Use this function to show the Wikitude SDK again if it was hidden before.
	 */
	WikitudePlugin.prototype.show = function() {
		cordova.exec(this.onWikitudeOK, this.onWikitudeError, "WikitudePlugin", "show", [""]);
	};

	/* Interacting with the Wikitude SDK */

	/**
	 *	Use this function to call javascript which will be executed in the context of the currently loaded ARchitect World.
	 *
	 * @param js The JavaScript that should be evaluated in the ARchitect View.
	 */
	WikitudePlugin.prototype.callJavaScript = function(js) {
		cordova.exec(this.onWikitudeOK, this.onWikitudeError, "WikitudePlugin", "callJavascript", [js]);
	};

	/**
	 *	Use this function to set a callback which will be invoked when the ARchitect World opens an architectsdk =// url.
	 *	document.location = "architectsdk =//opendetailpage?id=9";
	 *
	 *	@param onUrlInvokeCallback A function which will be called when the ARchitect World invokes a call to "document.location = architectsdk =//"
	 */
	WikitudePlugin.prototype.setOnUrlInvokeCallback = function(onUrlInvokeCallback) {
		cordova.exec(onUrlInvokeCallback, this.onWikitudeError, "WikitudePlugin", "onUrlInvoke", [""]);
	};

	/**
	 *  Use this function to inject a location into the Wikituce SDK.
	 *
	 *  @param latitude The latitude which should be simulated
	 *  @param longitude The longitude which should be simulated
	 *  @param altitude The altitude which should be simulated
	 *  @param accuracy The simulated location accuracy
	 */
	WikitudePlugin.prototype.setLocation = function(latitude, longitude, altitude, accuracy) {
		cordova.exec(this.onWikitudeOK, this.onWikitudeError, "WikitudePlugin", "setLocation", [latitude, longitude, altitude, accuracy]);
	};

	/**
	 *  Use this function to generate a screenshot from the current Wikitude SDK view.
	 *
	 *  @param includeWebView Indicates if the ARchitect web view should be included in the generated screenshot or not.
	 *  @param imagePathInBundleorNullForPhotoLibrary If a file path or file name is given, the generated screenshot will be saved in the application bundle. Passing null will save the photo in the device photo library.
	 */
	WikitudePlugin.prototype.captureScreen = function(includeWebView, imagePathInBundleOrNullForPhotoLibrary, successCallback, errorCallback) {
		cordova.exec(successCallback, errorCallback, "WikitudePlugin", "captureScreen", [includeWebView, imagePathInBundleOrNullForPhotoLibrary]);
	};

	/*
	 *	=============================================================================================================================
	 *
	 *	Callbacks of public functions
	 *
	 *	=============================================================================================================================
	 */


	/**
	 *  This function gets called if the Wikitude Plugin reports that the device is able to start the Wikitude SDK
	 */
	WikitudePlugin.prototype.deviceIsARchitectReady = function() {

		// Keep track of the device status
		module.exports._isDeviceSupported = true;

		// if the developer passed in a device supported callback, call it
		if (module.exports._onDeviceSupportedCallback) {
			module.exports._onDeviceSupportedCallback();
		}
	};

	/**
	 *  This function gets called if the Wikitude Plugin reports that the device is not able of starting the Wikitude SDK.
	 */
	WikitudePlugin.prototype.deviceIsNotARchitectReady = function() {

		// Keep track of the device status
		module.exports._isDeviceSupported = false;

		// if the developer passed in a device not supported callback, call it
		if (module.exports._onDeviceNotSupportedCallback) {
			module.exports._onDeviceNotSupportedCallback();
		}
	};

	/**
	 *	Use this callback to get notified when the ARchitect World was loaded successfully.
	 */
	WikitudePlugin.prototype.worldLaunched = function(url) {
		if (module.exports._onARchitectWorldLaunchedCallback) {
			module.exports._onARchitectWorldLaunchedCallback(url);
		}
	};

	/**
	 *	Use this callback to get notified when the ARchitect World could not be loaded.
	 */
	WikitudePlugin.prototype.worldFailedLaunching = function(err) {
		if (module.exports._onARchitectWorldFailedLaunchingCallback) {
			module.exports._onARchitectWorldFailedLaunchingCallback(err);
		}
	};

	/* Lifecycle updates */
	/**
	 *	This function gets called every time the application did become active.
	 */
	WikitudePlugin.prototype.onResume = function() {

		// Call the Wikitude SDK that it should resume.
		cordova.exec(this.onWikitudeOK, this.onWikitudeError, "WikitudePlugin", "onResume", [""]);
	};

	/**
	 *	This function gets called every time the application is about to become inactive.
	 */
	WikitudePlugin.prototype.onPause = function() {

		// Call the Wikitude SDK that the application did become inactive
		cordova.exec(this.onWikitudeOK, this.onWikitudeError, "WikitudePlugin", "onPause", [""]);
	};

	/**
	 *	A generic success callback used inside this wrapper.
	 */
	WikitudePlugin.prototype.onWikitudeOK = function() {};

	/**
	 *  A generic error callback used inside this wrapper.
	 */
	WikitudePlugin.prototype.onWikitudeError = function() {};



	/* Export a new WikitudePlugin instance */
	var wikitudePlugin = new WikitudePlugin();
	module.exports = wikitudePlugin;
});
