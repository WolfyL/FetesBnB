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
                    console.log(err);
                    alert("Mail invalide");
                    $scope.alert = "Mail invalide";
                });
            }
        };



        $scope.changePassword = function() {

            var user = {
                password: $scope.addPassword
            };

            if ($scope.newPassword === $scope.addPassword) {
              $scope.textColor = "green";
              $scope.alertPassword = "Mot de passe modifié.";
                UserService.update(id, user).then(function(res) {
                }, function(err) {
                    $scope.textColor = "red";
                    alert("Mot de passe différent.");
                    $scope.alertPassword = "Critère de validation du mot de passe et de 6 carractères minimum avec au moin un chiffre";

                });
            } else {
              $scope.textColor = "red";
              alert("Mot de passe différent.");
              $scope.alertPassword = "Mot de passe différent.";
            }
        };

        $(document).ready(function() {
            $('.modal').modal();
        });

    });
