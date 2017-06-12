angular.module('app')
    .controller('RegisterController', function($scope, $state, Auth) {

        $scope.user = {};

        $scope.change = function(){
          $scope.registerError = "";
          $scope.starError = "";
          $scope.colorError = "";
        };

        $scope.register = function() {

            if ($scope.user.firstName && $scope.user.lastName && $scope.user.email && $scope.user.password) {

                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.user.email)) {
                    Auth.register($scope.user).then(function(res) {
                        $state.go('user.home');
                    }, function(err) {
                        $scope.colorError = "red";
                        $scope.registerError = "Mot de passe non valide critère de validation 6 caractéres plus un chiffre minimun.";
                    });
                } else {
                    $scope.colorError = "red";
                    $scope.registerError = "Email non valide. exemple d'email : zzz@mail.com";
                }

            } else {
                $scope.starError = "*";
                $scope.colorError = "red";
                $scope.registerError = "Tous les champs sont obligatoire.";
            }
        };
    });
