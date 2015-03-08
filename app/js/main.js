

var coordLat; // = position.coords.latitude;
var coordLong; // = position.coords.longitude;

var firstPlace;
var secondPlace;
var thirdPlace;

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(found_location, no_location);
} else {
  no_location();
}

  function found_location(position) {
    //string = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    //set( "loading", string );
    coordLat = position.coords.latitude;
    coordLong = position.coords.longitude;
    //alert(coordLat + " " + coordLong);
  }

  function no_location() {
    string = "No location service"; 
    //set( "loading", string );

  }

var mapMarkers = [];


  // Name/title, category, image, rating, lat/long

$("li").on("click", ".dropmenu1", function(){
  var sText = $(this).html();
  $("#drop1text").html(sText);
  randomizeTiles();
});

$("li").on("click", ".dropmenu2", function(){
  var sText = $(this).html();
  $("#drop2text").html(sText);
  randomizeTiles();
});

$("li").on("click", ".dropmenu3", function(){
  var sText = $(this).html();
  $("#drop3text").html(sText);
  randomizeTiles();
});

  $("li").on("click", "#sortDistance", function(){
    $("#sortButton").html($("#sortDistance").html());
  });

  $("li").on("click", "#sortRating", function(){
    $("#sortButton").html($("#sortRating").html());
  });  

  // Function to randomly populate the three tiles at the bottom
  function randomizeTiles(){
    var tileOne = document.getElementById("tileOne");
    var tileTwo = document.getElementById("tileTwo");
    var tileThree = document.getElementById("tileThree");


    firstPlace = mapMarkers[Math.floor(Math.random() * mapMarkers.length)];
    do {
      secondPlace = mapMarkers[Math.floor(Math.random() * mapMarkers.length)];
    }
    while(secondPlace === firstPlace);
    do {
      thirdPlace = mapMarkers[Math.floor(Math.random() * mapMarkers.length)];
    }
    while(thirdPlace === firstPlace || thirdPlace === secondPlace);

    $(tileOne).css("background-image", "url(" + firstPlace.image + ")");
    $("#tileOneName").html(firstPlace.name);
    $("#tileOneCategory").html(firstPlace.category);
    $("#tileOneRating").html("Rating: " + firstPlace.rating);

    $(tileTwo).css("background-image", "url(" + secondPlace.image + ")");
    $("#tileTwoName").html(secondPlace.name);
    $("#tileTwoCategory").html(secondPlace.category);
    $("#tileTwoRating").html("Rating: " + secondPlace.rating);

    $(tileThree).css("background-image", "url(" + thirdPlace.image + ")");
    $("#tileThreeName").html(thirdPlace.name);
    $("#tileThreeCategory").html(thirdPlace.category);
    $("#tileThreeRating").html("Rating: " + thirdPlace.rating);

  }



  // The unique shop id is stored in the data-place attribute for future retrieval
  function setShop(tileId, placeId){
    var tile = document.getElementById(tileId);
    $(tile).attr("data-place", placeId);
  }

  // The unique shop id stored in the data-place attribute is retrieved
  function getShop(tileId){
    var tile = document.getElementById(tileId);
    var dataPlace = $(tile).attr("data-place");
    return dataPlace;
  }

function sortCurrentTiles(){
  var tileOne = document.getElementById("tileOne");
  var tileTwo = document.getElementById("tileTwo");
  var tileThree = document.getElementById("tileThree");
}

function sortByDistance(placeOne, placeTwo, placeThree){

  var tileOne = document.getElementById("tileOne");
  var tileTwo = document.getElementById("tileTwo");
  var tileThree = document.getElementById("tileThree");

  var closest;
  var middlest;
  var farthest;
  var distanceOne = Math.pow((placeOne.gps.latitude - coordLat), 2) + Math.pow((placeOne.gps.longitude - coordLong), 2);
  var distanceTwo = Math.pow((placeTwo.gps.latitude - coordLat), 2) + Math.pow((placeTwo.gps.longitude - coordLong), 2);
  var distanceThree = Math.pow((placeThree.gps.latitude - coordLat), 2) + Math.pow((placeThree.gps.longitude - coordLong), 2);

  if(distanceOne > distanceTwo && distanceOne > distanceThree){
    closest = placeOne;
    if(distanceTwo > distanceThree){
      middlest = placeTwo;
      farthest = placeThree;
    } else {
      farthest = placeTwo;
      middlest = placeThree;
    }
  } else if(distanceTwo > distanceOne && distanceTwo > distanceThree){
    closest = placeTwo;
    if(distanceOne > distanceThree){
      middlest = placeOne;
      farthest = placeThree;
    } else {
      farthest = placeOne;
      middlest = placeThree;
    }
  } else {
    closest = placeThree;
    if(distanceOne > distanceTwo){
      middlest = placeOne;
      farthest = placeTwo;
    } else {
      farthest = placeOne;
      middlest = placeTwo;
    }
  }
  $(tileOne).css("background-image", "url(" + closest.image + ")");
  $("#tileOneName").html(closest.name);
  $("#tileOneCategory").html(closest.category);
  $("#tileOneRating").html("Rating: " + closest.rating);

  $(tileTwo).css("background-image", "url(" + middlest.image + ")");
  $("#tileTwoName").html(middlest.name);
  $("#tileTwoCategory").html(middlest.category);
  $("#tileTwoRating").html("Rating: " + middlest.rating);

  $(tileThree).css("background-image", "url(" + farthest.image + ")");
  $("#tileThreeName").html(farthest.name);
  $("#tileThreeCategory").html(farthest.category);
  $("#tileThreeRating").html("Rating: " + farthest.rating);
}


function sortByRating(placeOne, placeTwo, placeThree){
  var tileOne = document.getElementById("tileOne");
  var tileTwo = document.getElementById("tileTwo");
  var tileThree = document.getElementById("tileThree");

  var best;
  var middle;
  var worst;

  var ratingOne = placeOne.rating;
  var ratingTwo = placeTwo.rating;
  var ratingThree = placeThree.rating;

  if(ratingOne > ratingTwo && ratingOne > ratingThree){
    best = placeOne;
    if(ratingTwo > ratingThree){
      middle = placeTwo;
      worst = placeThree;
    } else {
      middle = placeThree;
      worst = placeTwo;
    }
  } else if(ratingTwo > ratingOne && ratingTwo > ratingThree){
    best = placeTwo;
    if(ratingOne > ratingThree){
      middle = placeOne;
      worst = placeThree;
    } else {
      middle = placeThree;
      worst = placeOne;
    }
  } else {
    best = placeThree;
    if(ratingOne > ratingTwo){
      middle = placeOne;
      worst = placeTwo;
    } else {
      middle = placeTwo;
      worst = placeOne;
    }
  }

  $(tileOne).css("background-image", "url(" + best.image + ")");
  $("#tileOneName").html(best.name);
  $("#tileOneCategory").html(best.category);
  $("#tileOneRating").html("Rating: " + best.rating);

  $(tileTwo).css("background-image", "url(" + middle.image + ")");
  $("#tileTwoName").html(middle.name);
  $("#tileTwoCategory").html(middle.category);
  $("#tileTwoRating").html("Rating: " + middle.rating);

  $(tileThree).css("background-image", "url(" + worst.image + ")");
  $("#tileThreeName").html(worst.name);
  $("#tileThreeCategory").html(worst.category);
  $("#tileThreeRating").html("Rating: " + worst.rating);
}



$("#sortDistance").click(function(){
  sortByDistance(firstPlace, secondPlace, thirdPlace);
});

$("#sortRating").click(function(){
  sortByRating(firstPlace, secondPlace, thirdPlace);
});

// "Peter Kinev - dev - Community, location, available ameneties"

// "My wife is a big cigar smoker and has trouble finding places to smoke"





function initialize() {

  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    //mapTypeId: google.maps.MapTypeId.ROADMAP, zoom: 14
    center: {lat: 47.6278645, lng: -122.3158121},
    zoom: 12
  });

  infowindow = new google.maps.InfoWindow();

  

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  //var jsonURL = "https://www.urbansmokes.co/api/?lat=" + ABC + "&long=" + XYZ;

  var jsonURL = "https://www.urbansmokes.co/api/?lat=47.6097&long=-122.3331";


  $.get(jsonURL, function(data){
    for(i = 0; i < data.length; i++){
      mapMarkers[i] = data[i];
      var marker = new google.maps.Marker({
        map: map,
        //icon: data[i].image,
        title: data[i].name,
        position: {lat: data[i].gps.latitude, lng: data[i].gps.longitude}
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(this.title);
        infowindow.open(map, this);
      });
    }
    randomizeTiles();
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    //searchBox.setBounds(bounds);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
