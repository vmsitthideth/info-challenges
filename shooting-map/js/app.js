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
	for (var i = 0; i < data.length; i++) {
		var lat = data[i].lat;
		var lng = data[i].lng;

if (data[i].armed == true) {
var circle = L.circle([lat, lng], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map);
} else {
	var circle = L.circle([lat, lng], 500, {
    color: 'blue',
    fillColor: '#03036D',
    fillOpacity: 0.5
}).addTo(map);
}
}
/*var circle = L.circle([lat, lng], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map);
}*/

}

$.getJSON('data/data.min.json').then(loadData);

/*var marker = L.marker([51.5, -0.09]).addTo(map);

var circle = L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);
 */