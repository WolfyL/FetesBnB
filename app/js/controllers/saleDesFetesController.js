angular.module('app')
    .controller('SDFController', function($scope, SDFService) {
        $scope.sallesDesFetes = [];
        $scope.sdf = {};
        $('#myModal').on('shown.bs.modal', function() {
            $('#myInput').focus();
        });

        $scope.modal = function(index) {
            $scope.sdf = $scope.sallesDesFetes[index];
        };

        SDFService.getAll().then(function(res) {
            $scope.sallesDesFetes = res.data;
            console.log($scope.sallesDesFetes);
        });

        $scope.addSDF = function() {
            SDFService.create({
                name: $scope.nameSDF,
                city: $scope.citySDF,
                postalCode: $scope.postalCodeSDF,
                adress: $scope.adressSDF,
                capacity: $scope.capacitySDF,
                surface: $scope.surfaceSDF,
                text: $scope.textSDF
            });
            SDFService.getAll().then(function(res) {
                $scope.sallesDesFetes = res.data;
                console.log($scope.sallesDesFetes);
            });
            $scope.nameSDF = '';
            $scope.citySDF = '';
            $scope.postalCodeSDF = '';
            $scope.adressSDF = '';
            $scope.capacitySDF = '';
            $scope.surfaceSDF = '';
            $scope.textSDF = '';
        };

        $scope.editSDF = function(index) {
            $scope.editSDF[index] = true;
        };

        $scope.editSDFDone = function(index, maNewSDF) {
            console.log('maNewSDF', maNewSDF);
            $scope.sallesDesFetes[index] = maNewSDF;
            $scope.editSDF[index] = false;
        };

        $scope.deleteSDF = function(sdf) {
            SDFService.delete(sdf._id).then(function(res){
              console.log("delete succeed");
              SDFService.getAll().then(function(res) {
                  $scope.sallesDesFetes = res.data;
                  console.log($scope.sallesDesFetes);
              });

            }, function(err) {
              console.log("Delete failed");
          });
        };
    });
