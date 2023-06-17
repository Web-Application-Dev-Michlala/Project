
/*

    ToDo:
    * add more markers and content for windows
    *atleast 3 windows

*/

$(document).ready(function() {
    initMap();
});

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
}