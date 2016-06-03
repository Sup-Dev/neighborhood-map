function init() {
  var placesData = JSON.parse(localStorage.getItem("places"));
  
  var PlacesView = function(data) {
    this.name = ko.observable(data.name);
  }
  
  var ViewModel = function() {
    var self = this;
    
    this.placesList = ko.observable([]);
    
    placesData.forEach(function(place) {
      self.placesList().push(new PlacesView(place));
    })
  }
  
  ko.applyBindings(new ViewModel());
}