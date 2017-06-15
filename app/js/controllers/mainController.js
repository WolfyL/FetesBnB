angular.module('app')
  .controller('MainController', function($scope, CurrentUser, UserService, SDFService, NgMap) {
    /* Here is your main controller */
    // UserService.getOne(CurrentUser.user()._id).then(function(res) {
    //       $scope.user = res.data;
    //       console.log($scope.user.isAdmin);
    //   });
    // $scope.searchRay = searchRay;
    $scope.searchShow = false;
    // console.log('radius', $scope.searchRay);
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
      console.log(radius, 'coucou');
      if (ville === "" && radius !== null) {
        swal('Impossible !', 'Nous ne pouvons pas effectuer de recherche utilisant le rayon si vous n\'entrez pas de ville', 'error');
      } else {
        SDFService.getCoordo(ville).then(function(res){
          $scope.coordo = res.data.results[0].geometry.location;
          $scope.lat = $scope.coordo.lat;
          $scope.long = $scope.coordo.lng;
        });
        paramFilter = {
          ville: ville,
          // radius : radius,
          capacity: capacity
        };

        console.log(paramFilter);

        SDFService.getResult(paramFilter).then(function(res) {
          console.log(res.data);
          $scope.cities = res.data;
        });
      }
    };

    $scope.addfav = function(sallesDesFetes_id) {
      UserService.addFav(userId, sallesDesFetes_id).then(function(res) {
        console.log(res);
      }, function(err) {});
    };

    $(document).ready(function() {
      $('select').material_select();

    });
  });
