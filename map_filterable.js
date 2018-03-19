var map;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: new google.maps.LatLng(22.3,114.2),
    mapTypeId: 'roadmap',
  });
  getAirtableData();
}

// Loop through the results array and place a marker for each
// set of coordinates.

function getAirtableData() {
  fetch("https://api.airtable.com/v0/apptDNPo9jnXShzNh/Recycling%20Test?view=Grid%20view", {
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
          Batteries: {
            icon: {
              url: 'https://dl.dropbox.com/s/b8ct97gmw8f1mlo/CustomBatteriesIcon.svg',
              scaledSize: new google.maps.Size(72,72),
              anchor: new google.maps.Point(36,72)
            }
          },
          Glass: {
            icon:{
              url: 'https://dl.dropbox.com/s/34d9hx5573m2xo9/CustomGlassIcon.svg',
              scaledSize: new google.maps.Size(72,72),
              anchor: new google.maps.Point(36,72)
            }
          },
          Mixed: {
            icon: {
              url: 'https://dl.dropbox.com/s/a7hixnwqudgtcn2/CustomRecycleIcon.svg',
              scaledSize: new google.maps.Size(72,72),
              anchor: new google.maps.Point(36,72)
            }
          }
        };

      var marker = new google.maps.Marker({
        position: latLng,
        category: category,
        icon: icons[item.fields.Icon].icon,
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
        if (filteredMarker.category.indexOf(category) >= 0 || category.length === 0) {
            filteredMarker.setVisible(true);
        }
        // Categories don't match
        else {
            filteredMarker.setVisible(false);
        }
    }
}
