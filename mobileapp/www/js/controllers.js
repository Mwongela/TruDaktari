angular.module('starter.services', [])

  .service('usefulInfo', function() {});

angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  })

  .controller('HelpController', function($scope, $stateParams) {

  })

  .controller('AboutController', function($scope) {

  })

  .controller('InfoController', function($scope, $http, $stateParams) {

    $scope.data = [];

    $http.get("http://trudaktari.azadautoworks.com/index.php?tag=useful_info", {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .success(function(data) {
        $scope.data = data.info;
      })

      .error(function(data) {
        console.log(data);
      })

  })

  .controller('InfoItemController', function($scope, $stateParams, $http) {
    $scope.t = $stateParams.title;
    $scope.item = "";
    $http.get("http://trudaktari.azadautoworks.com/index.php?tag=useful_info", {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .success(function(data) {
        var x = data.info;

        for(var i = 0; i < x.length; i++) {
          var y = x[i];
          if(y.title === $scope.t) {
            $scope.item = y.content;
          }
        }
      })

      .error(function(data) {
        console.log(data);
      })
  })

  .controller('MapController', function ($scope, $cordovaGeolocation) {
    var options = {timeout: 10000, enableHighAccuracy: true};
 
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
   
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   
      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
   
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      //Wait until the map is loaded
      google.maps.event.addListenerOnce($scope.map, 'idle', function(){
       
        var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });      
       
        var infoWindow = new google.maps.InfoWindow({
            content: "Here I am!"
        });
       
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($scope.map, marker);
        });
       
      });
   
    }, function(error){
      console.log("Could not get location");
    });

  })

  .controller('DoctorController', function($scope, $http, $stateParams, $cordovaSocialSharing) {

    var id = $stateParams.id;

    $scope.doctor = {
      name: "",
      reg_date: "",
      reg_no: "",
      address: "",
      qualifications: "",
      speciality: "",
      sub_speciality: ""
    };

    $http.get("http://trudaktari.azadautoworks.com/index.php?tag=search_doctor&reg_no=" + id, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .success(function(data) {

        $scope.doctor.name = data.name;
        $scope.doctor.reg_date = data.reg_date;
        $scope.doctor.reg_no = data.reg_no;
        $scope.doctor.address = data.address;
        $scope.doctor.qualifications = data.qualifications;
        $scope.doctor.qualifications = data.qualifications;
        $scope.doctor.sub_speciality = data.sub_speciality;
      })

      .error(function(data) {
        console.log(data);
      });

      document.getElementById('share').addEventListener('click', function() {

        var message = "Hi, I would like to recommend " + $scope.doctor.name + " for his services. Download TruDaktari to find out more";
        var subject = "Recommend " + $scope.doctor.name;

        $cordovaSocialSharing
          .share(message, subject) // Share via native share sheet
          .then(function(result) {
            // Success!
          }, function(err) {
            // An error occured. Show a message to the user
            console.error(err);
          });

      }, false);

  })

  .controller('FacilityController', function($scope, $http, $stateParams) {

    var id = $stateParams.id;

    $scope.facility = {
      
        name: "GERTRUDES CHILDRENS HOSPITAL - NAIROBI WEST CLINIC",
        reg_no: "002086",
        address: "P.O BOX 42325 00100 NAIROBI",
        type: "MEDICAL CLINIC",
        bed_capacity: "0"
      };

    $http.get("http://trudaktari.azadautoworks.com/index.php?tag=search_facility_by_reg&reg_no=" + id, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .success(function(data) {

        $scope.facility.name = data.name;
        $scope.facility.reg_no = data.reg_no;
        $scope.facility.address = data.address;
        $scope.facility.type = data.type;
        $scope.facility.bed_capacity = data.bed_capacity;
        
      })

      .error(function(data) {
        console.log(data);
      });

  })

  .controller('ReportController', function($scope) {

  })

  .controller('RateController', function($scope) {
    
  })

  .controller('SearchController', function ($scope, $stateParams, $http) {

    $scope.query = "";
    $scope.queryType = "doctor";
    $scope.data = [];
    $scope.url = "http://trudaktari.azadautoworks.com/images/generic_profile.png";

    var q = $stateParams.q;
    var t = $stateParams.t

    if(typeof q === "undefined") {
      console.error("No query provided");
      $scope.data = [];
      return;
    }

    if(typeof t !== "undefined") {
      $scope.queryType = t;
      if(t === 'doctor') {
        $scope.url = "http://trudaktari.azadautoworks.com/images/generic_profile.png";
      } else if(t === 'facility') {
        $scope.url = "http://trudaktari.azadautoworks.com/images/hospital.png";
      }
    }

    $scope.query = q;

    $http.get("http://trudaktari.azadautoworks.com/index.php?tag=search&type=" + $scope.queryType + "&s=" + $scope.query, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .success(function(data) {
        $scope.data = data.results;
      })

      .error(function(data) {
        console.log(data);
      })

  });
