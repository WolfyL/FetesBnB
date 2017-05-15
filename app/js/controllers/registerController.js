angular.module('app')
    .controller('RegisterController', function($scope, $state, Auth) {

            $scope.user = {};
            $scope.register = function() {

            if ($scope.user.firstName != null && $scope.user.lastName != null && $scope.user.email != null && $scope.user.password != null) {

                Auth.register($scope.user).then(function(res) {
                  $state.go('user.home');
                }, function(err) {
                  $scope.color = "red";
                  $scope.nop = "Email non valide. exemple d'email : zzz@mail.com";
                  $scope.nopNop = "Ou";
                  $scope.errorRegister = "Mot de passe non valide critère de validation 6 caractéres plus un chiffre minimun.";
                });

            } else {
                $scope.star = "*";
                $scope.color = "red";
                $scope.errorRegister = "Tous les champs sont obligatoire.";
            }
        };
    });
