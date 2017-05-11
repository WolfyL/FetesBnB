angular.module('app')

    .controller('SDFController', function($scope, SDFService, Upload) {
        $scope.sallesDesFetes = [];
        $scope.sdf = {};
        $scope.events = [];

        $(document).ready(function() {
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal').modal();
        });

        $scope.eventCreatea = function(date){
          console.log("in", date);
        };

        // $scope.addDate = function(dateVal) {
            // var useID = 'md-1-month-' + moment($scope.myDate).format('YYYY') + '-' + String((Number(moment($scope.myDate).month()))) + '-' + moment($scope.myDate).format('DD');
            // var date = moment(dateVal);
            // var y = date.format('YYYY-');
            // var m = (Number(date.format('M')) -1).toString();
            // var d = date.format('-D');
            // var regex = new RegExp("^md-.+-month-" + y + m + d + "$");
            // console.log('im in', regex);
            // $('.md-calendar-date').filter(function () {
            //   console.log(this.id);
            //   return regex.test(this.id);
            // }).toggleClass("colored");
        //     $scope.dayReserved.push(dateVal);
        //
        // };


        // $scope.myDate = new Date();
        //
        // $scope.minDate = new Date(
        //     $scope.myDate.getFullYear(),
        //     $scope.myDate.getMonth(),
        //     $scope.myDate.getDate());
        //
        // $scope.maxDate = new Date(
        //     $scope.myDate.getFullYear(),
        //     $scope.myDate.getMonth() + 6,
        //     $scope.myDate.getDate());
        //
        //     $scope.notReservedYet = function(date) {
        //       console.log("valeur du jour", date);
        //         // var day = date.getDay();
        //         // console.log("dansNotReservedYet", $scope.dayReserved);
        //         // return $scope.dayReserved;
        //         return true;
        //     };

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

        $scope.editSDFDone = function(index, id, maNewSDF) {
            SDFService.update(id, maNewSDF).then(function(res) {
                console.log("Update success");
                SDFService.getAll().then(function(res) {
                    $scope.sallesDesFetes = res.data;
                });
            }, function(err) {
                console.log("Update failed");
            });
            $scope.editSDF[index] = false;
        };

        $scope.deleteSDF = function(sdf) {
            SDFService.delete(sdf._id).then(function(res) {
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
