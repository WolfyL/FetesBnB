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
        $scope.searchValid = function() {
            $scope.searchShow = true;
            SDFService.getAll().then(function(res) {
                console.log(res.data);
                $scope.citys = res.data;
            });
        };

        $scope.addfav = function(sallesDesFetes_id) {
            UserService.addFav(userId, sallesDesFetes_id).then(function(res) {
                console.log(res);
            }, function(err) {});
        };
        $(document).ready(function() {
            $('select').material_select();
            // $('input.autocomplete').autocomplete({
            //
            //     data: cities,
            //
            //
            //     limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
            //     onAutocomplete: function(val) {
            //         // Callback function when value is autcompleted.
            //     },
            //     minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
            // });
        });



    });