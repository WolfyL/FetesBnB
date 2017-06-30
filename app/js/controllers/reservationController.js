angular.module('app')
  .controller('ResaController', function($scope, CurrentUser, UserService, SDFService, $state) {
    moment.locale('fr');

    SDFService.getOne($state.params.sdf).then(function(res) {
      $scope.nomSalle = res.data.name;
    });
    var link;
    $scope.sendMail = function(resaDateStart, resaDateEnd, precisionUser) {

      SDFService.getSDFHandler($state.params.sdf).then(function(res) {
        $scope.currentHandler = res.data.handler.email;
        $scope.resaDateStart = moment(resaDateStart).format("LL");
        $scope.resaDateEnd = moment(resaDateEnd).format("LL");
        $scope.precisionUser = precisionUser;

        if ($scope.precisionUser !== undefined) {
          link = "mailto:" + $scope.currentHandler +
            "?subject=" + "Réservation de la salle " + $scope.nomSalle +
            "&body=" + "Nous souhaiterions réserver la salle " + $scope.nomSalle +
            " du " + $scope.resaDateStart + " au " + $scope.resaDateEnd + "." + " Précision de l'utilisateur : " + $scope.precisionUser;
          window.location.href = link;
        } else {
          link = "mailto:" + $scope.currentHandler +
            "?subject=" + "Réservation de la salle " + $scope.nomSalle +
            "&body=" + "Nous souhaiterions réserver la salle " + $scope.nomSalle +
            " du " + $scope.resaDateStart + " au " + $scope.resaDateEnd + ".";
          window.location.href = link;
        }
      });
    };

  });
