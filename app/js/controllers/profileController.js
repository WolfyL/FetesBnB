angular.module('app')
    .controller('ProfileController', function($scope, CurrentUser, UserService) {
      UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
            console.log($scope.user);
        });
      var id = CurrentUser.user()._id;
      $scope.user = [];

      $scope.changeProfil = function () {

        var user = {
          firstName: $scope.user.firstName,
          lastName: $scope.user.lastName,
          email: $scope.user.email
        };

        if($scope.user.firstName.length > 0 && $scope.user.lastName.length > 0 && $scope.user.email) {
          UserService.update(id, user).then(function(res) {
            location.reload();
          }, function (err) {
            console.log(err);
          });
        }


      };


          $(document).ready(function(){
            $('.modal').modal();
          });

    });
