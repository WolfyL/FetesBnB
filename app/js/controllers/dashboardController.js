angular.module('app')
    .controller('DashboardController', function($scope, CurrentUser, UserService, SDFService) {
        $scope.user = CurrentUser.user();
        $scope.likeds = [];

        SDFService.getAll().then(function(res) {
            $scope.sallesDesFetes = res.data;
            console.log('res salle des fetes après service', $scope.sallesDesFetes);
        });
        SDFService.getImg().then(function(res) {
            console.log(res.body);
        });

        function loadLikeds() {
            UserService.getOne(CurrentUser.user()._id).then(function(res) {
                $scope.likeds = (res.data.liked);
                console.log($scope.likeds);

            });
        }
        loadLikeds();

        $scope.delFav = function(salleDesFetes) {
            UserService.delFav($scope.user._id, salleDesFetes).then(function(res) {
                loadLikeds();
            });



        };

    });
