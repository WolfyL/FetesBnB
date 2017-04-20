angular.module('app')
    .controller('SDFController', function($scope) {
        $scope.sallesDesFetes = [];

        $scope.addSDF = function() {
            maSDF = {
                nom: $scope.nomSDF,
                description: $scope.descriptionSDF,
                capacite: $scope.capaciteSDF,
                surface: $scope.surfaceSDF
            };
            $scope.sallesDesFetes.push(maSDF);
            $scope.nomSDF = '';
            $scope.descriptionSDF = '';
            $scope.capaciteSDF = '';
            $scope.surfaceSDF = '';

            console.log($scope.sallesDesFetes);
        };

        $scope.editSDF = function(index) {
            $scope.editSDF[index] = true;
        };

        $scope.editSDFDone = function(index, maNewSDF) {
            // maNewSDF = {
            //     nom: $scope.newNomSDF,
            //     description: $scope.newDescriptionSDF,
            //     capacite: $scope.newCapaciteSDF,
            //     surface: $scope.newSurfaceSDF
            // };
            console.log('maNewSDF', maNewSDF);
            $scope.sallesDesFetes[index] = maNewSDF;
            $scope.editSDF[index] = false;
        };

        $scope.deleteSDF = function(index) {
            $scope.sallesDesFetes.splice(index, 1);
        };
    });
