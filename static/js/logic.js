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
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  var url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

  // Grab the data with d3
d3.json(url).then(function(response) {

    // Loop through data
    for (var i = 0; i < response.features.length; i++) {
     
      // Set the data to variables
      var location = [response.features[i].geometry.coordinates[1],response.features[i].geometry.coordinates[0]];
      location = parseFloat(location)
      var depth = response.features[i].geometry.coordinates[2]
      depth = parseFloat(depth)
      var mag = response.features[i].properties.mag
      var place = response.features[i].properties.place
      var cirColor;

      

        if(depth > 250 ){
          cirColor = '#FF0000';
        }
        if(depth > 200 && mag <= 250){
          cirColor = '#00FF00';
        }
        if(depth > 150 && mag <= 200){
          cirColor = '#0000FF';
        }
        if(depth > 100 && mag <= 150 ){
          cirColor = '#40E0D0';
        }
        if(depth >= 0 && mag <= 100 ){
          cirColor = '#FFFFFF';
        }
      
  //console.log(circleColor)
var circles = L.circleMarker([location],{ 
  color: "black",
  fillColor: cirColor,
  fillOpacity: 1,
  radius:mag * 4,
  }).bindPopup("<h3>" + place + "</h3>").addTo(myMap);

  myMap.addLayer(circles)
    }
  //add legend inside d3 
 
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      
      var limits = [250, 200,150, 100,0];
      var colors = ['#FF0000','#00FF00','#0000FF','#40E0D0','#FFFFFF' ];
      var labels = [];
  
      // Add min & max
      var legendInfo = "<h1>Depth Legend</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
  
      div.innerHTML = legendInfo;
  
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    // Adding legend to the map
    legend.addTo(myMap);

})