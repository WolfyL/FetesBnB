angular.module('app')
  .controller('ResaController', function($scope, CurrentUser, UserService, SDFService, $state) {

    // console.log($state.params);

    SDFService.getOne($state.params.sdf).then(function(res){
      // console.log(res.data);
      $scope.nomSalle = res.data.name;
    });

    $scope.sendMail = function(resaDateStart, resaDateEnd, precisionUser) {
      SDFService.getSDFHandler($state.params.sdf).then(function(res) {
        console.log("resdata: ", res.data);
        $scope.currentHandler = res.data.handler.email;
        $scope.resaDateStart = resaDateStart;
        $scope.resaDateEnd = resaDateEnd;
        $scope.precisionUser = precisionUser;

        console.log($scope.currentHandler, "= res.data.handler.email;",
        $scope.resaDateStart, "= resaDateStart;",
        $scope.resaDateEnd, "= resaDateEnd;", $scope.precisionUser," = precisionUser;");

        var link = "mailto:" + $scope.currentHandler +
          "?subject=" + escape("Réservation de la salle" + $scope.nomSalle) +
          "&body=" + escape("Nous souhaiterions réserver la salle" + $scope.nomSalle +
          " du " + $scope.resaDateStart + " au " + $scope.resaDateEnd + ". -Précision de l'utilisateur : " + $scope.precisionUser);
        window.location.href = link;
      });
    };

  });
