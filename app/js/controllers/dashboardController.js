angular.module('app')
    .controller('DashboardController', function($scope, CurrentUser, UserService, SDFService) {
        $scope.user = CurrentUser.user();
        $scope.liked = [];
        UserService.update(CurrentUser.user()._id).then(function(res) {
            res.data.liked.forEach(function(sdf) {
                SDFService.findById(sdf.sdfId).then(function(res){
                    $scope.liked.push(res.data[0]);
                     console.log(res.data);
                });
            });
        });
    });
