// Creating map object
var myMap = L.map("mapid", {
    center: [37.1, -95.7],
    zoom: 6
  });

  // Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }).addTo(myMap);

  var url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

  // Grab the data with d3
d3.json(url).then(function(response) {

    // Loop through data
    for (var i = 0; i < response.features.length; i++) {
     
      // Set the data to variables
      var location = [response.features[i].geometry.coordinates[1],response.features[i].geometry.coordinates[0]];
      var depth = response.features[i].geometry.coordinates[2]
      var mag = response.features[i].properties.mag
      var place = response.features[i].properties.place
      var circleColor;
      
        if(depth > 250 ){
          circleColor = '#FF0000';
        }
        if(depth > 200 && mag < 250){
          circleColor = '#00FF00';
        }
        if(depth > 150 && mag < 200){
          circleColor = '#0000FF';
        }
        if(depth > 100 && mag < 150 ){
          circleColor = '#0000FF';
        }
        if(depth > 0 && mag < 100 ){
          circleColor = '#FFFFFF';
        }
      }
  
L.circleMarker(location,{ 
  color: "black",
  fillColor: circleColor,
  fillOpacity: 1,
  radius:mag * 4,
  }).bindPopup("<h3>" + place + "</h3>").addTo(myMap);

  //add legend
})