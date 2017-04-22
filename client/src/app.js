var PubGet = require('./models/pub_getter.js')
var PubListView = require('./views/pub_list_view.js')
var GeoLocate = require("./models/geolocate.js")
var MapView = require("./views/map_view.js")

var app = function(){
  //start an instance of your API-getting object
  var pubGetter = new PubGet("http://localhost:3000/api/pubs")

  //set up your document element with the DOM to make your view
  var pubListElement = document.querySelector('#pub-list')
  var pubLister = new PubListView(pubListElement)

  //get your data and render it
  pubGetter.getData(function(pubs){
    pubLister.render(pubs)
  })

  //get the map and render to screen
  var mapView = new MapView()
  mapView.initialize()

  //get a reference to the 'near me' button
  var nearMeButton = document.querySelector('#near-me-button')
  nearMeButton.addEventListener('click', function(){
    mapView.centerNearMe()
  })

}

window.onload = app
