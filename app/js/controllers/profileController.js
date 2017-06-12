angular.module('app')
    .controller('ProfileController', function($scope, CurrentUser, UserService) {
        UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
        });

        var id = CurrentUser.user()._id;

        $scope.user = [];

        $scope.changeProfil = function() {

            var user = {
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                email: $scope.user.email
            };

            if ($scope.user.firstName.length > 0 && $scope.user.lastName.length > 0 && $scope.user.email) {
                UserService.update(id, user).then(function(res) {
                    location.reload();
                }, function(err) {
                    $scope.color = "red";
                    $scope.alert = "Mail invalide exemple d'email : zzz@mail.com";
                });
            } else {
              $scope.color = "red";
              $scope.starError = "*";
              $scope.alert = "Tous les champs sont obligatoire.";
            }
        };



        $scope.changePassword = function() {

            var user = {
                password: $scope.addPassword
            };

            if ($scope.newPassword === $scope.addPassword) {
              if ($scope.newPassword == null) {
                $scope.textColor = "red";
                $scope.starError = "*";
                $scope.alertPassword = "Veuillez modifier le mot de passe avant de valider.";
              } else {
                $scope.textColor = "green";
                $scope.alertPassword = "Mot de passe modifié.";
                UserService.update(id, user).then(function(res) {
                }, function(err) {
                  $scope.textColor = "red";
                  $scope.alertPassword = "Critère de validation du mot de passe et de 6 carractères minimum avec au moin un chiffre.";

                });
              }
            } else {
              $scope.textColor = "red";
              $scope.alertPassword = "Mot de passe différent.";
            }
        };

        $(document).ready(function() {
            $('.modal').modal();
        });

    });
