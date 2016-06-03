function init() {
  var placesData = JSON.parse(localStorage.getItem("places"));
  console.log(JSON.parse(localStorage.getItem("markers")));
  var PlacesView = function(data) {
    this.name = ko.observable(data.name);
  }
  
  var ViewModel = function() {
    var self = this;
    
    this.filter = ko.observable();
    
    this.places = ko.observableArray([]);
    placesData.forEach(function(place) {
      self.places().push(new PlacesView(place));
    });    
    
    this.placesList = ko.computed(function() {
      if (!self.filter()) {
        return self.places();
      } else {
        return ko.utils.arrayFilter(self.places(), function(place) {
          console.log(place.name());
          return place.name().toLowerCase().indexOf(self.filter().toLowerCase()) > -1;
        })
      }   
    });  
    
    this.triggerMarker = function(index) {
      console.log(index);
      var marker = m[index];
      
      google.maps.event.trigger(marker, 'click');
    }    
  }
  
  ko.applyBindings(new ViewModel());
}