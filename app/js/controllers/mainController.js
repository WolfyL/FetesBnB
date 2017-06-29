angular.module('app')
  .controller('MainController', function($scope, CurrentUser, UserService, SDFService, NgMap, $state) {
    /* Here is your main controller */
    // UserService.getOne(CurrentUser.user()._id).then(function(res) {
    //       $scope.user = res.data;
    //       console.log($scope.user.isAdmin);
    //   });

    var arrayTrueSDF = [],
      sdfAll = [],
      sdfCapacityFilter = [];
    $scope.sallesDesFetes = [];


    SDFService.getAll().then(function(res) {
      $scope.sallesDesFetes = res.data;
      console.log($scope.sallesDesFetes);
    });

    NgMap.getMap().then(function(map) {
      $scope.map = map;
    });

    $scope.showStore = function(evt, index) {
      $scope.sdf = $scope.sallesDesFetes[index];
      console.log("SDF", $scope.sdf);
      $('#modalMap').modal('open');
      // $scope.map.showInfoWindow('window', this);
    };

    $scope.filterCity = function(query) {
      return $scope.sallesDesFetes.filter(function(salleDesFetes) {
        return salleDesFetes.city.toLowerCase().indexOf(query.toLowerCase().trim()) >= 0;
      });
    };

    $scope.change = function() {
      $scope.searchShow = false;
    };

    $scope.clickSalle = function(index){
      SDFService.getOne(index).then(function(res){
        $scope.ville = res.data;
        $scope.uploadImg = res.data.image;
      });
    };

    $scope.searchValid = function(ville, radius, capacity) {
      console.log("NIIIIIIIIIIIIIIIIIIIIQUE");
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
            console.log("lat", $scope.lat, " coordo;", $scope.coordo);
            var paramFilter = {
              ville: {
                lat: $scope.lat,
                lng: $scope.long
              },
              radius: radius,
              capacity: capacity
            };

            //arrayTrueSDF = "";


            SDFService.getAll().then(function(res) {
              console.log(res.data);
              $scope.sallesDesFetes = res.data;
              sdfAll = $scope.sallesDesFetes;
              if (paramFilter.capacity !== null) {
                sdfAll.map(function(salle) {
                  if (paramFilter.capacity >= salle.capacity) {
                    console.log(sdfCapacityFilter, 'test');
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


    function boundContains(paramFilter, sdfAll) {
      arrayTrueSDF = [];
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

    // $scope.salleResearch = function(id) {
    //   console.log(id);
    // };

    $scope.resa = function(id) {
      $('#modal11').modal('close');
      $state.go('user.reservation', {sdf : id});
    };

    // $scope.sendMail = function(id) {
    //   SDFService.getSDFHandler(id).then(function(res) {
    //     $scope.currentHandler = res.data.handler.email;
    //     $scope.sdfName = res.data.name;
    //     var link = "mailto:" + $scope.currentHandler +
    //       "?subject=" + escape("Réservation de la salle" + $scope.sdfName) +
    //       "&body=" + escape("Nous souhaiterions réserver la salle" + $scope.sdfName + " du " + "#datestart" + " au " + "# dateend" + ". -Précision de l'utilisateur : " + "#txtarea");
    //     window.location.href = link;
    //   });
    // };

    function modalWorks() {

      $(document).ready(function() {
        $('.materialboxed').materialbox();
        $('.slider').slider();
        $('select').material_select();
        $('.modal').modal();
      });

    }
    setTimeout(modalWorks, 200);

  });
