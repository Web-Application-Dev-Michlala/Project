
/*

    ToDo:
    * add more markers and content for windows
    *atleast 3 windows

*/

$(document).ready(function() {
  $.ajax
  ({
      url:'/googleKey',
    
  }).done(function(key)
  {
    $('.key').attr("src",key);
    
  })
});
initMap();
function initMap() {
    var mapElement = $('#map')[0]; // Get the actual DOM element
    var map = new google.maps.Map(mapElement, {
      center: { lat: 32.0853, lng: 34.7818 }, // Coordinates of the center point (Tel Aviv)
      zoom: 8 // Zoom level
    });
  
    // Add marker for Haifa
    var haifaMarker = new google.maps.Marker({
      position: { lat: 32.7940, lng: 34.9896 }, // Coordinates of Haifa
      map: map,
      title: 'Haifa'
    });
  
    // Add info window for Haifa marker
    var haifaInfoContent = `
        <div class="info-window">
        <h3>Haifa</h3>
        <p>Some Text about the store.</p>
        </div>
    `;

    // Create info window for Haifa marker
    var haifaInfoWindow = new google.maps.InfoWindow({
        content: haifaInfoContent // Use the custom HTML content
    });
  
    // Add click event listener for Haifa marker
    haifaMarker.addListener('click', function() {
      haifaInfoWindow.open(map, haifaMarker);
    });
   
//-----------------------------------------------------------------------------------------------------------------

    // Add marker for Ashdod
var ashdodMarker = new google.maps.Marker({
  position: { lat: 31.7907, lng: 34.6450 }, // Coordinates of Ashdod
  map: map,
  title: 'Ashdod'
});

// Add info window for Ashdod marker
var ashdodInfoContent = `
    <div class="info-window">
    <h3>Ashdod</h3>
    <p>Some Text about the store.</p>
    </div>
`;

// Create info window for Ashdod marker
var ashdodInfoWindow = new google.maps.InfoWindow({
    content: ashdodInfoContent // Use the custom HTML content
});

// Add click event listener for Ashdod marker
ashdodMarker.addListener('click', function() {
  ashdodInfoWindow.open(map, ashdodMarker);
});
//--------------------------------------------------------------------------------------------------------
 // Add marker for Tel Aviv
var telAvivMarker = new google.maps.Marker({
  position: { lat: 32.0853, lng: 34.7818 }, // Coordinates of Tel Aviv
  map: map,
  title: 'Tel Aviv'
});

// Add info window for Tel Aviv marker
var telAvivInfoContent = `
    <div class="info-window">
    <h3>Tel Aviv</h3>
    <p>Some Text about the store.</p>
    </div>
`;

// Create info window for Tel Aviv marker
var telAvivInfoWindow = new google.maps.InfoWindow({
    content: telAvivInfoContent // Use the custom HTML content
});

// Add click event listener for Tel Aviv marker
telAvivMarker.addListener('click', function() {
  telAvivInfoWindow.open(map, telAvivMarker);
});



//--------------------------------------------------------------------------------------------------------
 // Add marker for Beer-Sheva
var beerShevaMarker = new google.maps.Marker({
  position: { lat: 31.2438, lng: 34.7930 }, // Coordinates of Beer-Sheva
  map: map,
  title: 'Beer-Sheva'
});

// Add info window for Beer-Sheva marker
var beerShevaInfoContent = `
    <div class="info-window">
    <h3>Beer-Sheva</h3>
    <p>Some Text about the store.</p>
    </div>
`;

// Create info window for Beer-Sheva marker
var beerShevaInfoWindow = new google.maps.InfoWindow({
    content: beerShevaInfoContent // Use the custom HTML content
});

// Add click event listener for Beer-Sheva marker
beerShevaMarker.addListener('click', function() {
  beerShevaInfoWindow.open(map, beerShevaMarker);
});
//--------------------------------------------------------------------------------------------------------
 // Add marker for Jerusalem
 var jerusalemMarker = new google.maps.Marker({
  position: { lat: 31.7683, lng: 35.2137 }, // Coordinates of Jerusalem
  map: map,
  title: 'Jerusalem'
});

// Add info window for Jerusalem marker
var jerusalemInfoContent = `
    <div class="info-window">
    <h3>Jerusalem</h3>
    <p>Some Text about the store.</p>
    </div>
`;

// Create info window for Jerusalem marker
var jerusalemInfoWindow = new google.maps.InfoWindow({
    content: jerusalemInfoContent // Use the custom HTML content
});

// Add click event listener for Jerusalem marker
jerusalemMarker.addListener('click', function() {
    jerusalemInfoWindow.open(map, jerusalemMarker);
});


//--------------------------------------------------------------------------------------------------------
 // Add marker for Eilat
var eilatMarker = new google.maps.Marker({
  position: { lat: 29.5561, lng: 34.9519 }, // Coordinates of Eilat
  map: map,
  title: 'Eilat'
});

// Add info window for Eilat marker
var eilatInfoContent = `
    <div class="info-window">
    <h3>Eilat</h3>
    <p>Some Text about the store.</p>
    </div>
`;

// Create info window for Eilat marker
var eilatInfoWindow = new google.maps.InfoWindow({
    content: eilatInfoContent // Use the custom HTML content
});

// Add click event listener for Eilat marker
eilatMarker.addListener('click', function() {
  eilatInfoWindow.open(map, eilatMarker);
});



}