angular.module('app')
    .controller('DashboardController', function($scope, CurrentUser, UserService, SDFService) {
        $scope.user = CurrentUser.user();
        $scope.likeds = [];

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