angular.module('app')

    .controller('SDFController', function($scope, SDFService, Upload) {
        $scope.sallesDesFetes = [];
        $scope.sdf = {};
        $scope.events = [];

        $(document).ready(function() {
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal').modal();
        });

        $scope.eventCreatea = function(date) {
            console.log($scope.eventStart);
            // let hour = moment($scope.eventStart).format("hh:mm A").split(':')[0];
            // let min = moment($scope.eventStart).format("hh:mm").split(':')[1];
            let hourStart = moment($scope.eventStart).get('hour');
            let minStart = moment($scope.eventStart).get('minute');
            let startDate = moment(date).add(hourStart, 'h').add(minStart, 'm');

            let hourEnd = moment($scope.eventEnd).get('hour');
            let minEnd = moment($scope.eventEnd).get('minute');
            let endDate = moment($scope.dayEnd).add(hourEnd, 'h').add(minEnd, 'm');

            console.log("eventEnd : ", $scope.eventEnd);
            console.log("dayEnd : ", $scope.dayEnd);

            console.log("minEnd avant", minEnd, typeof(minEnd));
            if (minEnd === 0) {
              console.log("minEnd apres", minEnd);
              minEnd = '00';
            }

            if ($scope.dayEnd !== undefined && $scope.eventEnd !== undefined && $scope.dayEnd !== '' && $scope.eventEnd !== '') {
                $scope.events.push({
                    title: $scope.eventTitle + " fini à:" + hourEnd + ':' + minEnd,
                    start: new Date(startDate),
                    end: new Date($scope.dayEnd),
                    allDay: false
                });
                console.log("1");
            } else if (($scope.dayEnd === undefined || $scope.dayEnd === '') && ($scope.eventEnd === undefined || $scope.eventEnd === '')) {
                $scope.events.push({
                    title: $scope.eventTitle,
                    start: new Date(startDate),
                    allDay: false
                });
                console.log("2");
            } else if ($scope.dayEnd === undefined || $scope.dayEnd === '') {
                $scope.events.push({
                    title: $scope.eventTitle + " fini à:" + hourEnd + ':' + minEnd,
                    start: new Date(startDate),
                    allDay: false
                });
                console.log("3");
            } else if ($scope.eventEnd === undefined || $scope.eventEnd === '') {
                $scope.events.push({
                    title: $scope.eventTitle,
                    start: new Date(startDate),
                    end: new Date($scope.dayEnd),
                    allDay: false
                });
                console.log("4");
            }

            $scope.eventTitle = "";
            $scope.eventStart = "";
            $scope.dayEnd = "";
            $scope.eventEnd = "";
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
