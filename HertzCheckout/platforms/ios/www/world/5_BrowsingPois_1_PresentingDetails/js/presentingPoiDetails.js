// information about server communication. This sample webservice is provided by Wikitude and returns random dummy places near given location
var ServerInformation = {
	POIDATA_SERVER: "http://example.wikitude.com/GetSamplePois/",
	POIDATA_SERVER_ARG_LAT: "lat",
	POIDATA_SERVER_ARG_LON: "lon",
	POIDATA_SERVER_ARG_NR_POIS: "nrPois"
};

var vegasData = [{
	"id":"1","longitude":"-115.275289","latitude":"36.081308",
	"description":"$42/day",
	"name":"Kia Rio",
	"details":"<div style=\"text-align: center;\"><img src=\"./assets/car_kia_rio.jpg\" /></div><div>The 2014 Kia Rio is ranked #9 in Affordable Small Cars by U.S. News & World Report.</div><br /><div>4/5 Passengers</div></div>2 Small Suitcases</div><div>Automatic Transmission</div><div>Air Conditioning</div><div>33 miles/gallon or better</div>"
},{
	//"id":"2","longitude":"-115.246289","latitude":"36.097308",
	"id":"2","longitude":"-115.095366","latitude":"36.157955",
	"description":"$42/day",
	"name":"Ford Focus",
	"details":"<div style=\"text-align: center;\"><img src=\"./assets/car_ford_focus.jpg\" /></div><div>The 2014 Ford Focus has an EPA-estimated fuel economy of 40 mpg.</div><br /><div>4/5 Passengers</div></div>2 Small Suitcases</div><div>Automatic Transmission</div><div>Air Conditioning</div><div>33 miles/gallon or better</div>"
},{
	//"id":"3","longitude":"-115.101289","latitude":"36.083308",
	"id":"3","longitude":"-115.239100","latitude":"36.168295",
	"description":"$46/day",
	"name":"Toyota Corolla",
	"details":"<div style=\"text-align: center;\"><img src=\"./assets/car_toyota_corolla.jpg\" /></div><div>The 2014 Toyota Corolla has an EPA-estimated fuel economy of 40 mpg.</div><br /><div>4/5 Passengers</div></div>2 Small Suitcases</div><div>Automatic Transmission</div><div>Air Conditioning</div><div>33 miles/gallon or better</div>"
},{
	//"id":"4","longitude":"-115.212289","latitude":"36.193308",
	"id":"4","longitude":"-115.093875","latitude":"36.056520",
	"description":"$60/day",
	"name":"Nissan Altima",
	"details":"<div style=\"text-align: center;\"><img src=\"./assets/car_nissan_altima.jpg\" /></div><div>The 2014 Nissan Altima has an EPA-estimated fuel economy of 40 mpg.</div><br /><div>4/5 Passengers</div></div>2 Small Suitcases</div><div>Automatic Transmission</div><div>Air Conditioning</div><div>33 miles/gallon or better</div>"
},{
	//"id":"5","longitude":"-115.110289","latitude":"36.104308",
	"id":"5","longitude":"-115.174384","latitude":"36.176609",
	"description":"$61/day",
	"name":"Chevrolet Malibu",
	"details":"<div style=\"text-align: center;\"><img src=\"./assets/car_chevrolet_malibu.jpg\" /></div><div>The 2014 Chevy Malibu has an EPA-estimated fuel economy of 40 mpg.</div><br /><div>4/5 Passengers</div></div>2 Small Suitcases</div><div>Automatic Transmission</div><div>Air Conditioning</div><div>33 miles/gallon or better</div>"
},{
	//"id":"6","longitude":"-115.266289","latitude":"36.096308",
	"id":"6","longitude":"-115.173869","latitude":"36.034035",
	"description":"$66/day",
	"name":"Toyota Camry",
	"details":"<div style=\"text-align: center;\"><img src=\"./assets/car_toyota_camry.jpg\" /></div><div>The 2014 Toyota Camry has an EPA-estimated fuel economy of 40 mpg.</div><br /><div>4/5 Passengers</div></div>2 Small Suitcases</div><div>Automatic Transmission</div><div>Air Conditioning</div><div>33 miles/gallon or better</div>"
},{
	//"id":"7","longitude":"-115.236289","latitude":"36.025308",
	"id":"7","longitude":"-115.277209","latitude":"36.126710",
	"description":"$59/day",
	"name":"Toyota Rav 4",
	"details":"<div style=\"text-align: center;\"><img src=\"./assets/car_toyota_rav4.jpg\" /></div><div>The 2014 Toyota Rav 4 has an EPA-estimated fuel economy of 40 mpg.</div><br /><div>4/5 Passengers</div></div>2 Small Suitcases</div><div>Automatic Transmission</div><div>Air Conditioning</div><div>33 miles/gallon or better</div>"
},{
	//"id":"8","longitude":"-115.170289","latitude":"36.086308",
	"id":"8","longitude":"-115.051818","latitude":"36.108544",
	"description":"$75/day",
	"name":"Chevrolet Equinox",
	"details":"<div style=\"text-align: center;\"><img src=\"./assets/car_chevrolet_equinox.jpg\" /></div><div>The 2014 Chevy Equinox has an EPA-estimated fuel economy of 40 mpg.</div><br /><div>4/5 Passengers</div></div>2 Small Suitcases</div><div>Automatic Transmission</div><div>Air Conditioning</div><div>33 miles/gallon or better</div>"
},{
	//"id":"9","longitude":"-115.122289","latitude":"36.133308",
	"id":"9","longitude":"-115.229487","latitude":"36.053328",
	"description":"$192/day",
	"name":"Mercedes E Class",
	"details":"<div style=\"text-align: center;\"><img src=\"./assets/car_mercedes_e_class.jpg\" /></div><div>The 2014 Mercedes E Class has an EPA-estimated fuel economy of 40 mpg.</div><br /><div>4/5 Passengers</div></div>2 Small Suitcases</div><div>Automatic Transmission</div><div>Air Conditioning</div><div>33 miles/gallon or better</div>"
},{
	//"id":"10","longitude":"-115.238289","latitude":"36.035308",
	"id":"10","longitude":"-115.085292","latitude":"36.088155",
	"description":"$192/day",
	"name":"Ford Mustang GT",
	"details":"<div style=\"text-align: center;\"><img src=\"./assets/car_ford_mustang_gt_premium.jpg\" /></div><div>The 2014 Ford Mustang GT Premium has an EPA-estimated fuel economy of 40 mpg.</div><br /><div>4/5 Passengers</div></div>2 Small Suitcases</div><div>Automatic Transmission</div><div>Air Conditioning</div><div>33 miles/gallon or better</div>"
}];

// implementation of AR-Experience (aka "World")
var World = {
	// you may request new data from server periodically, however: in this sample data is only requested once
	isRequestingData: false,

	// true once data was fetched
	initiallyLoadedData: false,

	// different POI-Marker assets
	markerDrawable_idle: null,
	markerDrawable_selected: null,
	markerDrawable_directionIndicator: null,

	// list of AR.GeoObjects that are currently shown in the scene / World
	markerList: [],

	// The last selected marker
	currentMarker: null,

	locationUpdateCounter: 0,
	updatePlacemarkDistancesEveryXLocationUpdates: 10,

	// called to inject new POI data
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
		poiData = vegasData;
		// empty list of visible markers
		World.markerList = [];

		// start loading marker assets
		World.markerDrawable_idle = new AR.ImageResource("assets/marker_idle.png");
		World.markerDrawable_selected = new AR.ImageResource("assets/marker_selected.png");
		World.markerDrawable_directionIndicator = new AR.ImageResource("assets/indi.png");

		// loop through POI-information and create an AR.GeoObject (=Marker) per POI
		for (var currentPlaceNr = 0; currentPlaceNr < poiData.length; currentPlaceNr++) {
			var singlePoi = {
				"id": poiData[currentPlaceNr].id,
				"latitude": parseFloat(poiData[currentPlaceNr].latitude),
				"longitude": parseFloat(poiData[currentPlaceNr].longitude),
				"altitude": parseFloat(poiData[currentPlaceNr].altitude),
				"title": poiData[currentPlaceNr].name,
				"description": poiData[currentPlaceNr].description,
				"details": poiData[currentPlaceNr].details
			};

			World.markerList.push(new Marker(singlePoi));
		}

		// updates distance information of all placemarks
		World.updateDistanceToUserValues();

		World.updateStatusMessage(currentPlaceNr + ' places loaded');
	},

	// sets/updates distances of all makers so they are available way faster than calling (time-consuming) distanceToUser() method all the time
	updateDistanceToUserValues: function updateDistanceToUserValuesFn() {
		for (var i = 0; i < World.markerList.length; i++) {
			World.markerList[i].distanceToUser = World.markerList[i].markerObject.locations[0].distanceToUser();
		}
	},

	// updates status message shon in small "i"-button aligned bottom center
	updateStatusMessage: function updateStatusMessageFn(message, isWarning) {

		var themeToUse = isWarning ? "e" : "c";
		var iconToUse = isWarning ? "alert" : "info";

		$("#status-message").html(message);
		$("#popupInfoButton").buttonMarkup({
			theme: themeToUse
		});
		$("#popupInfoButton").buttonMarkup({
			icon: iconToUse
		});
	},

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {

		// request data if not already present
		if (!World.initiallyLoadedData) {
			World.requestDataFromServer(lat, lon);
			World.initiallyLoadedData = true;
		} else if (World.locationUpdateCounter === 0) {
			// update placemark distance information frequently, you max also update distances only every 10m with some more effort
			World.updateDistanceToUserValues();
		}

		// helper used to update placemark information every now and then (e.g. every 10 location upadtes fired)
		World.locationUpdateCounter = (++World.locationUpdateCounter % World.updatePlacemarkDistancesEveryXLocationUpdates);
	},

	/*
		POIs usually have a name and sometimes a quite long description. 
		Depending on your content type you may e.g. display a marker with its name and cropped description but allow the user to get more information after selecting it.
	*/

	// fired when user pressed maker in cam
	onMarkerSelected: function onMarkerSelectedFn(marker) {
		World.currentMarker = marker;

		/*
			In this sample a POI detail panel appears when pressing a cam-marker (the blue box with title & description), 
			compare index.html in the sample's directory.
		*/
		// update panel values
		$("#poi-detail-title").html(marker.poiData.title);
		$("#poi-detail-description").html(marker.poiData.description);
		$("#poi-detail-details").html(marker.poiData.details);

		// distance and altitude are measured in meters by the SDK. You may convert them to miles / feet if required.
		var distanceToUserValue = (marker.distanceToUser > 999) ? ((marker.distanceToUser / 1000).toFixed(2) + " km") : (Math.round(marker.distanceToUser) + " m");

		//$("#poi-detail-distance").html(distanceToUserValue);

		// show panel
		$("#panel-poidetail").panel("open", 123);

		$(".ui-panel-dismiss").unbind("mousedown");

		// deselect AR-marker when user exits detail screen div.
		$("#panel-poidetail").on("panelbeforeclose", function(event, ui) {
			World.currentMarker.setDeselected(World.currentMarker);
		});
	},

	// screen was clicked but no geo-object was hit
	onScreenClick: function onScreenClickFn() {
		// you may handle clicks on empty AR space too
	},

	// returns distance in meters of placemark with maxdistance * 1.1
	getMaxDistance: function getMaxDistanceFn() {

		// sort palces by distance so the first entry is the one with the maximum distance
		World.markerList.sort(World.sortByDistanceSortingDescending);

		// use distanceToUser to get max-distance
		var maxDistanceMeters = World.markerList[0].distanceToUser;

		// return maximum distance times some factor >1.0 so ther is some room left and small movements of user don't cause places far away to disappear.
		return maxDistanceMeters * 1.1;
	},

	/*
		JQuery provides a number of tools to load data from a remote origin. 	
		It is highly recommended to use the JSON format for POI information. Requesting and parsing is done in a few lines of code.
		Use e.g. 'AR.context.onLocationChanged = World.locationChanged;' to define the method invoked on location updates. 
		In this sample POI information is requested after the very first location update. 

		This sample uses a test-service of Wikitude which randomly delivers geo-location data around the passed latitude/longitude user location.
		You have to update 'ServerInformation' data to use your own own server. Also ensure the JSON format is same as in previous sample's 'myJsonData.js'-file.
	*/

	// request POI data
	requestDataFromServer: function requestDataFromServerFn(lat, lon) {

		// set helper var to avoid requesting places while loading
		World.isRequestingData = true;
		World.updateStatusMessage('Requesting places from web-service');

		// server-url to JSON content provider
		var serverUrl = ServerInformation.POIDATA_SERVER + "?" + ServerInformation.POIDATA_SERVER_ARG_LAT + "=" + lat + "&" + ServerInformation.POIDATA_SERVER_ARG_LON + "=" + lon + "&" + ServerInformation.POIDATA_SERVER_ARG_NR_POIS + "=20";

		var jqxhr = $.getJSON(serverUrl, function(data) {
				World.loadPoisFromJsonData(data);
			})
			.error(function(err) {
				World.updateStatusMessage("Invalid web-service response.", true);
				World.isRequestingData = false;
			})
			.complete(function() {
				World.isRequestingData = false;
			});
	},

	// helper to sort places by distance
	sortByDistanceSorting: function(a, b) {
		return a.distanceToUser - b.distanceToUser;
	},

	// helper to sort places by distance, descending
	sortByDistanceSortingDescending: function(a, b) {
		return b.distanceToUser - a.distanceToUser;
	}

};


/* forward locationChanges to custom function */
AR.context.onLocationChanged = World.locationChanged;

/* forward clicks in empty area to World */
AR.context.onScreenClick = World.onScreenClick;