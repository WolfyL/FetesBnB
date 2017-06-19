angular.module('app')
  .controller('MainController', function($scope, CurrentUser, UserService, SDFService, NgMap) {
    /* Here is your main controller */
    // UserService.getOne(CurrentUser.user()._id).then(function(res) {
    //       $scope.user = res.data;
    //       console.log($scope.user.isAdmin);
    //   });
    $scope.searchShow = false;
    $scope.sdfAll = [];

    SDFService.getAll().then(function(res) {
      $scope.sallesDesFetes = res.data;
    });


    NgMap.getMap().then(function(map) {
      $scope.map = map;
    });

    $scope.showStore = function(evt, index) {
      $scope.sdf = $scope.sallesDesFetes[index];
      $scope.map.showInfoWindow('window', this);
    };

    $scope.filterCity = function(query) {
      return $scope.sallesDesFetes.filter(function(salleDesFetes) {
        return salleDesFetes.city.toLowerCase().indexOf(query.toLowerCase().trim()) >= 0;
      });
    };

    $scope.searchValid = function(ville, radius, capacity) {
      ville = ville.toLowerCase().trim();
      $scope.searchShow = true;
      if (ville === "" && radius !== null) {
        swal('Impossible !', 'Nous ne pouvons pas effectuer de recherche utilisant le rayon si vous n\'entrez pas de ville', 'error');
      } else {
        if (radius !== null) {
          SDFService.getCoordo(ville).then(function(res) {
            $scope.coordo = res.data.results[0].geometry.location;
            $scope.lat = $scope.coordo.lat;
            $scope.long = $scope.coordo.lng;
            console.log("lat", $scope.lat, " coordo;", $scope.coordo);
            var paramFilter = {
              ville: {
                lat: $scope.lat,
                lng: $scope.long
              },
              radius: radius,
              capacity: capacity
            };

            SDFService.getAll().then(function(res) {
              $scope.sallesDesFetes = res.data;
              $scope.sdfAll = $scope.sallesDesFetes;
              console.log($scope.sdfAll);
              //faire un map pour envoyer un tableau de bool à filtrer
              boundContains(paramFilter, $scope.sdfAll);
            });

          });
        } else if(radius === null){
          paramFilter = {
            ville: ville,
            radius: radius,
            capacity: capacity
          };
          SDFService.getResult(paramFilter).then(function(res) {
            $scope.cities = res.data;
          });
        }
      }
    };

    function boundContains(paramFilter, sdfAll) {
      var arrayTrueSDF =[];
      console.log("MY SDF", sdfAll);
      sdfAll.map(function(salle){
        console.log('salle : ', salle.coordo.lat, salle.coordo.lng);
        var latLngCenter = new google.maps.LatLng(paramFilter.ville.lat, paramFilter.ville.lng),
        latLngX = new google.maps.LatLng(salle.coordo.lat, salle.coordo.lng);


        map = new google.maps.Map(document.getElementById('map'), {
          center: latLngCenter
        }),
        markerCenter = new google.maps.Marker({
          position: latLngCenter,
          title: 'Location',
          // map: map
        }),
        marker = new google.maps.Marker({
          position: latLngX,
          title: 'Location',
          // map: map
        }),
        circle = new google.maps.Circle({
          // map: map,
          radius: paramFilter.radius * 1000
        });

        circle.bindTo('center', markerCenter, 'position');
        var bounds = circle.getBounds();
        console.log("THE ANSWER IS HERE", bounds.contains(latLngX), "location", paramFilter.ville.lat, paramFilter.ville.lng);
        if(bounds.contains(latLngX)){
          arrayTrueSDF.push(salle);
        }
      });


    }

    $scope.addfav = function(sallesDesFetes_id) {
      UserService.addFav(userId, sallesDesFetes_id).then(function(res) {
        // console.log(res);
      }, function(err) {});
    };

    $(document).ready(function() {
      $('select').material_select();

    });
  });
