/* add your script methods and logic here */

'use strict';

var map = L.map('map-container').setView([40, -98], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'vmsitthideth.cift34hz40expunlyjqu0v7w5',
    accessToken: 'pk.eyJ1Ijoidm1zaXR0aGlkZXRoIiwiYSI6ImNpZnQzNGo2cTF1cmNsZmtydW9jcXgzM2kifQ.EEy4Ds0HBQKV1QITP9X1qA'
}).addTo(map);

var loadData = function(data) {
		var armed = L.layerGroup([]);
		var unarmed = L.layerGroup([]);
		var killCount = 0;
		var armedCount = 0;
		var unarmedCount = 0;
		for (var i = 0; i < data.length; i++) {
			var lat = data[i].lat;
			var lng = data[i].lng;
			var summary = data[i].summary;

			if (summary == null) {
				summary = 'No Detailed Summary';
			}

			if (data[i].armed === true) {
				circlePoint(armed, 'red', '#f03', lat, lng), summary;
				armedCount++;
			} else {
				circlePoint(unarmed, 'blue', '#060691', lat, lng, summary);
				unarmedCount++;
			}

			if (data[i].outcome == "Killed") {
				killCount++;
			}
		}
		var notKillCount = data.length - killCount;

		var armKilled = armedCount * 100;
		var armedNotKilled = 100 - armKilled;
		var unarmedKilled = killCount / unarmedCount * 100;
		var unarmedNotKilled = 100 - unarmedKilled;

		console.log(killCount)
		console.log(notKillCount)
		console.log(armedCount)
		console.log(unarmedCount)

		console.log(armKilled)
		console.log(unarmedKilled)
		console.log(armedNotKilled)
		console.log(unarmedNotKilled)

		var myLayerGroups = {
			"Armed": armed,
			"Unarmed": unarmed
		};


L.control.layers(null, myLayerGroups).addTo(map);
}
function circlePoint(group, color, fillcolor, lat, lng, summary) {
				var circle = L.circle([lat, lng], 500, {
	    		color: color,
	    		fillColor: fillcolor,
	    		fillOpacity: 0.5
				}).bindPopup(summary);
				group.addLayer(circle);
}

$.getJSON('data/data.min.json').then(loadData);