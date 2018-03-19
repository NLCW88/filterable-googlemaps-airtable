var map;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: new google.maps.LatLng(0,0),
    mapTypeId: 'roadmap',
  });
  getAirtableData();
}

// Loop through the results array and place a marker for each
// set of coordinates.

function getAirtableData() {
  fetch("https://api.airtable.com/v0/apptDNPo9jnXShzNh/Map%20Test?view=Grid%20view", {
    headers: {
      Authorization: "Bearer keyOfJOed1eMhUOGH"
    }
  }).then(response => response.json()).then(function(response) {
    response.records.forEach(function(item) {
      var latLng = new google.maps.LatLng({
        lat: item.fields.Latitude,
        lng: item.fields.Longitude
      });

      var category = item.fields.Type;

        if( item.fields.Batteries === true) {
          var battStatus = "Yep!";
        } else {
          var battStatus = "Naw dawg..."
        }

        if( item.fields.Glass === true) {
          var glassStatus = "Yep!";
        } else {
          var glassStatus = "Naw dawg..."
        }

        if( item.fields.Metal === true) {
          var metalStatus = "Yep!";
        } else {
          var metalStatus = "Naw dawg..."
        }

        if( item.fields.Paper === true) {
          var paperStatus = "Yep!";
        } else {
          var paperStatus = "Naw dawg..."
        }

        if( item.fields.Plastics === true) {
          var plasticsStatus = "Yep!";
        } else {
          var plasticsStatus = "Naw dawg..."
        }

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'
            +item.fields.Name+
            '</h1>'+
            '<div id="bodyContent">'+
            '<p>'+
            item.fields.Long_Description+
            '</p><p>Batteries: '+
            battStatus+
            '</p><p>Glass: '+
            glassStatus+
            '</p><p>Metal: '+
            metalStatus+
            '</p><p>Paper: '+
            paperStatus+
            '</p><p>Plastics: '+
            plasticsStatus+
            '</p><p><a href="'+
            item.fields.Link_To+
            '" target=_blank>'+
            item.fields.Link_To+
            '</a></p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

      var icons = {
          A: {
            icon: 'https://dl.dropbox.com/s/mpis7ueeqpjecaa/windturbine.png'
          },
          B: {
            icon: 'https://dl.dropbox.com/s/wxps5xdweo9bu7q/leopard_snow.png'
          },
          C: {
            icon: 'https://dl.dropbox.com/s/mpy63j14ho2swru/beautifulview.png'
          },
          D: {
            icon: 'https://dl.dropbox.com/s/tcegvl1i7ckdcep/algae.png'
          }
        };

      var marker = new google.maps.Marker({
        position: latLng,
        category: category,
        icon: icons[item.fields.Type].icon,
        map: map
      });
        marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
        markers.push(marker);
    });
  });
}

/**
 * Function to filter markers by category
 */

filterMarkers = function (category) {
    for (i = 0; i < markers.length; i++) {
        filteredMarker = markers[i];
        // If is same category or category not picked
        if (filteredMarker.category == category || category.length === 0) {
            filteredMarker.setVisible(true);
        }
        // Categories don't match
        else {
            filteredMarker.setVisible(false);
        }
    }
}
