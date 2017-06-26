angular.module('app')
  .controller('MainController', function($scope, CurrentUser, UserService, SDFService, NgMap, NodeMailerService) {
    /* Here is your main controller */
    // UserService.getOne(CurrentUser.user()._id).then(function(res) {
    //       $scope.user = res.data;
    //       console.log($scope.user.isAdmin);
    //   });
    $scope.searchShow = false;
    var arrayTrueSDF = [],
    sdfAll = [],
    sdfCapacityFilter = [];

    SDFService.getAll().then(function(res) {
      $scope.sallesDesFetes = res.data;
    });

    $scope.sendMail = function() {
      SDFService.getSDFHandler(id).then(function(res){
        $scope.currentHandler = res.data;
        console.log($scope.currentHandler);
      });
      // var link = "mailto:olivier.goy.37@gmail.com" +
      // "?subject=" + escape("Tacitement") +
      // "&body=" + escape("Nique");
      // window.location.href = link;
    };



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
              sdfAll = $scope.sallesDesFetes;
              if (paramFilter.capacity !== null) {
                sdfAll.map(function(salle) {
                  if (paramFilter.capacity >= salle.capacity) {
                    sdfCapacityFilter.push(salle);
                  }
                });
                boundContains(paramFilter, sdfCapacityFilter);
                $scope.sdfRadiusFilters = arrayTrueSDF;
              } else {
                boundContains(paramFilter, sdfAll);
                $scope.sdfRadiusFilters = arrayTrueSDF;
              }
            });
          });
        } else if (radius === null) {
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
      sdfAll.map(function(salle) {
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
            radius: (paramFilter.radius * 1000)
          });

        circle.bindTo('center', markerCenter, 'position');
        var bounds = circle.getBounds();
        if (bounds.contains(latLngX)) {
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
