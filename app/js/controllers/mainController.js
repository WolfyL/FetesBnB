angular.module('app')
  .controller('MainController', function($scope, CurrentUser, UserService, SDFService, NgMap) {
    /* Here is your main controller */
    // UserService.getOne(CurrentUser.user()._id).then(function(res) {
    //       $scope.user = res.data;
    //       console.log($scope.user.isAdmin);
    //   });
    SDFService.getAll().then(function(res) {
      console.log(res.data);
      $scope.sallesDesFetes = res.data;
    });
    NgMap.getMap().then(function(map) {
      $scope.map = map;
    });
    $scope.showStore = function(evt, index) {
      console.log('evt', evt);
      console.log('index', index);
      console.log('this', this);
      $scope.sdf = $scope.sallesDesFetes[index];
      $scope.map.showInfoWindow('window', this);
    };


    $scope.filterCity = function(query) {
      return $scope.sallesDesFetes.filter(function(salleDesFetes) {
        return salleDesFetes.city.toLowerCase().indexOf(query.toLowerCase().trim()) >= 0;
      });
    };

    $scope.searchShow = false;

    $scope.searchValid = function(ville, radius, capacity) {

      ville = ville.toLowerCase().trim();

      $scope.searchShow = true;
      console.log(radius, 'coucou');
      if (ville === "" && radius !== null) {
        swal('Impossible !', 'Nous ne pouvons pas effectuer de recherche utilisant le rayon si vous n\'entrez pas de ville', 'error');
      } else {
        paramFilter = {
          ville: ville,
          //radius : radius,
          capacity: capacity
        };

        console.log(paramFilter);

        SDFService.getResult(paramFilter).then(function(res) {
          console.log(res.data);
          $scope.cities = res.data;
        });
      }
      //
      // SDFService.getAll().then(function(res) {
      //
      //     $scope.people = res.data;
      //
      //     $scope.citys = res.data;
      //
      //     $scope.peopleSearchs = [];
      //
      //     for (var i = 0; i < $scope.people.length; i++) {
      //         // switch ($scope.searchRay) {
      //         //   case "1":
      //         //     $scope.raySearch = "5";
      //         //     break;
      //         //   case "2":
      //         //     $scope.raySearch = "10";
      //         //     break;
      //         //   case "3":
      //         //     $scope.raySearch = "20";
      //         //     break;
      //         //   case "4":
      //         //     $scope.raySearch = "30";
      //         //     break;
      //         //   case "5":
      //         //     $scope.raySearch = "50";
      //         //     break;
      //         //   default:
      //         //     $scope.raySearch = "100";
      //         // }
      //
      //         // research by ray for search by km.
      //         switch ($scope.searchPeople) {
      //             case "1":
      //                 if ($scope.people[i].capacity <= 50) {
      //                     $scope.peopleSearchs.push($scope.people[i]);
      //                 }
      //                 // $scope.peopleSearchs = salle;
      //                 break;
      //             case "2":
      //                 if ($scope.people[i].capacity <= 100) {
      //                     $scope.peopleSearchs.push($scope.people[i]);
      //                 }
      //                 break;
      //             case "3":
      //                 if ($scope.people[i].capacity <= 150) {
      //                     $scope.peopleSearchs.push($scope.people[i]);
      //                 }
      //                 break;
      //             case "4":
      //                 if ($scope.people[i].capacity <= 250) {
      //                     $scope.peopleSearchs.push($scope.people[i]);
      //                 } //test version for research with capacity.
      //                 break;
      //             case "5":
      //                 if ($scope.people[i].capacity <= 500) {
      //                     $scope.peopleSearchs.push($scope.people[i]);
      //                 }
      //                 break;
      //             default:
      //                 if ($scope.people[i].capacity <= 1000) {
      //                     $scope.peopleSearchs.push($scope.people[i]);
      //                 }
      //         }
      //     }
      // });

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
