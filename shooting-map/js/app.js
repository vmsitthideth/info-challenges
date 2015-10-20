// Vichit Mike Sitthideth
// INFO 343
// JS file for loading map with points and data

'use strict';

//
$(document).ready(function() {
	// Zooms in map to United States
	var map = L.map('map-container').setView([40, -98], 4);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'vmsitthideth.cift34hz40expunlyjqu0v7w5',
	    accessToken: 'pk.eyJ1Ijoidm1zaXR0aGlkZXRoIiwiYSI6ImNpZnQzNGo2cTF1cmNsZmtydW9jcXgzM2kifQ.EEy4Ds0HBQKV1QITP9X1qA'
	}).addTo(map);


	// Function to load data
	var loadData = function(data) {
		var armed = L.layerGroup([]);
		var unarmed = L.layerGroup([]);
		var armedKillCount = 0;
		var unarmedKillCount = 0;
		for (var i = 0; i < data.length; i++) {
			var lat = data[i].lat;
			var lng = data[i].lng;
			var summary = data[i].summary;

			if (summary == null) {
				summary = 'No Detailed Summary';
			}

			if (data[i].armed === true) {
				circlePoint(armed, 'red', '#f03', lat, lng, summary);
				if (data[i].outcome == "Killed") {
					armedKillCount++;
				}
			} else {
				circlePoint(unarmed, 'blue', '#060691', lat, lng, summary);
				if (data[i].outcome == "Killed") {
				unarmedKillCount++;
				}
			}
		}

		var armKillPercent = Math.round(armedKillCount / data.length * 100);
		var armNotKillPercent = 100 - armKillPercent;
		var unarmedKillPercent = Math.round(unarmedKillCount / data.length * 100);
		var unarmedNotKillPercent = 100 - unarmedKillPercent;
		var totalKilled = Math.round((armedKillCount + unarmedKillCount) / data.length * 100);
		var totalNotKilled = 100 - totalKilled;

		var myLayerGroups = {
			"Armed": armed,
			"Unarmed": unarmed
		};

		//  When an event happens (toggle on categories), shows the percentage killed/not killed
		map.on('layeradd', function() {
			if (map.hasLayer(armed) && map.hasLayer(unarmed)) {
	    		$('#killed').text(totalKilled);
	    		$('#notkilled').text(totalNotKilled);
	 		} else if (!map.hasLayer(unarmed) && map.hasLayer(armed)) {
	 	    	$('#killed').text(armKillPercent);
	    		$('#notkilled').text(armNotKillPercent);
	 		} else if (!map.hasLayer(armed) && map.hasLayer(unarmed)) {
	 			$('#killed').text(unarmedKillPercent);
	    		$('#notkilled').text(unarmedNotKillPercent);
	 		}
	 	});

		//	When an event happens (toggle off categories), shows the percentage killed/not killed
		map.on('layerremove', function() {
			if (!map.hasLayer(armed) && !map.hasLayer(unarmed)) {
				$('#killed').text("No Data");
				$('#notkilled').text("No Data");
			} else if (!map.hasLayer(armed) && map.hasLayer(unarmed)) {
				$('#killed').text(unarmedKillPercent);
				$('#notkilled').text(unarmedNotKillPercent);
			} else if (!map.hasLayer(unarmed) && map.hasLayer(armed)) {
				$('#killed').text(armKillPercent);
				$('#notkilled').text(armNotKillPercent);
			} 
		}); 
		L.control.layers(null, myLayerGroups).addTo(map);
	}
	$.getJSON('data/data.min.json').then(loadData);
});


//	Function creates circle markers and adds to layer groups
function circlePoint(group, color, fillcolor, lat, lng, summary) {
	var circle = L.circle([lat, lng], 500, {
		color: color,
	    fillColor: fillcolor,
	    fillOpacity: 0.5
		}).bindPopup(summary);
		group.addLayer(circle);
}
