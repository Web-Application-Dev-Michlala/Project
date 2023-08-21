$(document).ready(function() {//gets api key
  $.ajax
  ({
      url:'/googleKey',
    
  }).done(function(key)
  {
    $('.key').attr("src",key);
    
  })
});
function createMarkers() {//creates map and sets our shops markers
  const mapElement = $('#map')[0]; // Get the actual DOM element
  const map = new google.maps.Map(mapElement, {
    center: { lat: 32.0853, lng: 34.7818 }, // Coordinates of the center point (Tel Aviv)
    zoom: 8 // Zoom level
  });
  $.ajax({
    url: '/googleMaps/shops', // Update the route to match your backend setup
    method: 'GET',
    success: function(shops) {
      console.log(shops);
      shops.forEach(shop => {
        const marker = new google.maps.Marker({
            position: { lat: parseFloat(shop.locationX.$numberDecimal), lng: parseFloat(shop.locationY.$numberDecimal) },
            map: map,
            title: shop.name,
        });
  
        const infoWindowContent = `
            <div class="info-window">
                <h3>${shop.name}</h3>
                <p>Come visit our shop at ${shop.name}, Electy for you!.</p>
            </div>
        `;
        const infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent,
      });
  
      marker.addListener('click', function() {
          infoWindow.open(map, marker);
      });
  
  });
  },
  error: function(err) {
    console.error(err);
  }
  });
}
