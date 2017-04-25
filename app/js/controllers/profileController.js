angular.module('app')
    .controller('ProfileController', function($scope, CurrentUser, UserService) {
      UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
            console.log($scope.user);
        });




          $(document).ready(function(){
            $('.modal').modal();
          });

    });
