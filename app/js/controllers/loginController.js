angular.module('app')
    .controller('LoginController', function($scope, $state, Auth) {
        $scope.errors = [];

        $scope.login = function() {
            if($scope.user == null) {
              $scope.colorError = "red";
              $scope.starError = "*"
              $scope.loginError = "Veuillez renseigner tous les champs avant de valider.";
            } else if ($scope.loginForm.$valid) {
                $scope.errors = [];
                Auth.login($scope.user).then(function(result) {
                    $state.go('user.home');
                }).catch(function(err) {
                    $scope.errors.push(err);
                    $scope.colorError = "red";
                    $scope.loginError = "Mot de passe non valide ou email inconnu.";
                });
            }
        };
    });
