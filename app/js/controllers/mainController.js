angular.module('app')
  .controller('MainController', function($scope, CurrentUser, UserService, SDFService, NgMap, $state) {

    var arrayTrueSDF = [],
      sdfAll = [],
      sdfCapacityFilter = [];
    $scope.sallesDesFetes = [];
    $scope.user = CurrentUser.user();

    SDFService.getAll().then(function(res) {
      $scope.sallesDesFetes = res.data;
    });

    NgMap.getMap().then(function(map) {
      $scope.map = map;
    });

    function modalWorks() {
      $(document).ready(function() {
        $('.materialboxed').materialbox();
        $('.slider').slider({
          interval: 2500
        });
        $('select').material_select();
        $('.modal').modal();
      });
    }
    setTimeout(modalWorks, 200);

    function boundContains(paramFilter, sdfAll) {
      arrayTrueSDF = [];
      sdfAll.map(function(salle) {
        var latLngCenter = new google.maps.LatLng(paramFilter.ville.lat, paramFilter.ville.lng),
          latLngX = new google.maps.LatLng(salle.coordo.lat, salle.coordo.lng);

        map = new google.maps.Map(document.getElementById('map'), {
            center: latLngCenter
          });
          markerCenter = new google.maps.Marker({
            position: latLngCenter,
            title: 'Location',
          });
          marker = new google.maps.Marker({
            position: latLngX,
            title: 'Location',
          });
          circle = new google.maps.Circle({
            radius: (paramFilter.radius * 1000)
          });

        circle.bindTo('center', markerCenter, 'position');
        var bounds = circle.getBounds();
        if (bounds.contains(latLngX)) {
          arrayTrueSDF.push(salle);
        }
      });
    }

    $scope.showStore = function(evt, index, id) {
      $scope.indexOf = index;
      SDFService.getOne(id).then(function(res) {
        $scope.uploadMarkers = [];
        $scope.uploadMarkers = res.data.image;
        $scope.sdf = res.data;
        modalWorks();
      });
      $('#modalMap').modal('open');
    };

    $scope.filterCity = function(query) {
      return $scope.sallesDesFetes.filter(function(salleDesFetes) {
        return salleDesFetes.city.toLowerCase().indexOf(query.toLowerCase().trim()) >= 0;
      });
    };

    $scope.change = function() {
      $scope.searchShow = false;
    };

    $scope.clickSalle = function(index) {
      $scope.uploadImgs = [];
      SDFService.getOne(index).then(function(res) {
        $scope.uploadImgs = res.data.image;
        $scope.ville = res.data;
        modalWorks();
      });
    };

    $scope.searchValid = function(ville, radius, capacity) {
      ville = ville.toLowerCase().trim();
      $scope.searchShow = true;
      $scope.cities = "";
      sdfCapacityFilter = [];

      if (ville === "" && radius !== null) {
        swal('Impossible !', 'Nous ne pouvons pas effectuer de recherche utilisant le rayon si vous n\'entrez pas de ville', 'error');
      } else {
        if (radius !== null) {
          SDFService.getCoordo(ville).then(function(res) {
            $scope.coordo = res.data.results[0].geometry.location;
            $scope.lat = $scope.coordo.lat;
            $scope.long = $scope.coordo.lng;
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
            capacity: capacity
          };
          SDFService.getResult(paramFilter).then(function(res) {
            $scope.cities = res.data;
          });
        }
      }
    };

    $scope.addFav = function(city) {
      UserService.getOne($scope.user._id).then(function(res) {
        $scope.liked = res.data.liked;
        if ($scope.liked.filter(function(el) {
            return el._id === city;
          }).length > 0) {
          sweetAlert("Impossible", "La salle actuelle se trouve déjà dans vos favoris", "error");
        } else {
          UserService.addFav($scope.user._id, city).then(function(res) {
            sweetAlert("Ok !", "La salle a été ajouté dans vos favoris", "success");
          });
        }
      });
    };

    $scope.resa = function(id) {
      $('#modal11').modal('close');
      $('#modalMap').modal('close');
      $state.go('user.reservation', {
        sdf: id
      });
    };
  });
