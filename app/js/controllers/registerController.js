angular.module('app')
    .controller('RegisterController', function($scope, $state, Auth) {

        $scope.user = {};
        $scope.register = function() {

          if ($scope.user.firstName != null && $scope.user.lastName != null && $scope.user.email != null && $scope.user.password != null) {

            Auth.register($scope.user).then(function() {
              $state.go('anon.home');
            }, function (err) {
              $scope.color = "red";
              $scope.nop = "Mot de passe invalide ou mail incorrecte.";
            });
            } else {
              $scope.star = "*"
              $scope.color = "red";
              $scope.nopNop = "Tous les champs sont obligatoire.";
          }
        };
    });
