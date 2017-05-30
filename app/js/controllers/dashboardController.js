angular.module('app')
    .controller('DashboardController', function($scope, CurrentUser, UserService, SDFService) {
        $scope.user = CurrentUser.user();
        $scope.likeds = [];
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.likeds = (res.data.liked);
            console.log($scope.likeds);
        });
    });