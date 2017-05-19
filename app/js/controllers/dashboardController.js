angular.module('app')
    .controller('DashboardController', function($scope, CurrentUser, UserService, SDFService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
           
        });
        SDFService.getAll().then(function(res){
$scope.likeds = res;
        });
    });