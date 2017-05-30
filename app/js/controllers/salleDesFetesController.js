angular.module('app')

.controller('SDFController', function($scope, SDFService, EvenementService, Upload, UserService, CurrentUser) {
    $scope.sallesDesFetes = [];
    $scope.sdf = {};
    $scope.user = CurrentUser.user();


    $(document).ready(function() {
        $('.modal').modal();
    });

    $scope.eventCreatea = function(indexSDF, date, event, sdfId) {
        let hourStart = moment(event.eventStart).get('hour');
        let minStart = moment(event.eventStart).get('minute');
        let startDate = moment(date).add(hourStart, 'h').add(minStart, 'm');

        let hourEnd = moment(event.eventEnd).get('hour');
        let minEnd = moment(event.eventEnd).get('minute');
        let endDate = moment(event.dayEnd).add(hourEnd, 'h').add(minEnd, 'm');

        if (minEnd === 0) {
            console.log("minEnd apres", minEnd);
            minEnd = '00';
        }

        if (event.dayEnd !== undefined && event.eventEnd !== undefined && event.dayEnd !== '' && event.eventEnd !== '') {
            let title = event.eventTitle + " fini à:" + hourEnd + ':' + minEnd;
            EvenementService.create({
                title: title,
                start: new Date(startDate),
                end: new Date(event.dayEnd),
                allDay: false
            }).then(function(res) {
                var evenement = res.data;
                console.log('evenement', evenement);
                console.log("INDEX FETE", $scope.sallesDesFetes[indexSDF]._id);
                SDFService.update($scope.sallesDesFetes[indexSDF]._id, evenement).then(function(res) {
                    console.log("Update success");
                    SDFService.getAll().then(function(res) {
                        $scope.sallesDesFetes = res.data;
                    });
                }, function(err) {
                    console.log("Update failed", err);
                });
            });
        } else if ((event.dayEnd === undefined || event.dayEnd === '') && (event.eventEnd === undefined || event.eventEnd === '')) {
            EvenementService.create({
                title: event.eventTitle,
                start: new Date(startDate),
                end: new Date(startDate),
                allDay: false
            }).then(function(res) {
                var evenement = res.data;
                console.log('evenement', evenement);
                console.log("INDEX FETE", $scope.sallesDesFetes[indexSDF]._id);
                SDFService.update($scope.sallesDesFetes[indexSDF]._id, evenement).then(function(res) {
                    console.log("Update success");
                    SDFService.getAll().then(function(res) {
                        $scope.sallesDesFetes = res.data;
                    });
                }, function(err) {
                    console.log("Update failed", err);
                });
            });
        } else if (event.dayEnd === undefined || event.dayEnd === '') {
            let title = event.eventTitle + " fini à:" + hourEnd + ':' + minEnd;
            EvenementService.create({
                title: title,
                start: new Date(startDate),
                end: new Date(startDate),
                allDay: false
            }).then(function(res) {
                var evenement = res.data;
                console.log('evenement', evenement);
                console.log("INDEX FETE", $scope.sallesDesFetes[indexSDF]._id);
                SDFService.update($scope.sallesDesFetes[indexSDF]._id, evenement).then(function(res) {
                    console.log("Update success");
                    SDFService.getAll().then(function(res) {
                        $scope.sallesDesFetes = res.data;
                    });
                }, function(err) {
                    console.log("Update failed", err);
                });
            });
        } else if (event.eventEnd === undefined || event.eventEnd === '') {
            EvenementService.create({
                title: event.eventTitle,
                start: new Date(startDate),
                end: new Date(event.dayEnd),
                allDay: false
            }).then(function(res) {
                var evenement = res.data;
                console.log('evenement', evenement);
                console.log("INDEX FETE", $scope.sallesDesFetes[indexSDF]._id);
                SDFService.update($scope.sallesDesFetes[indexSDF]._id, evenement).then(function(res) {
                    console.log("Update success");
                    SDFService.getAll().then(function(res) {
                        $scope.sallesDesFetes = res.data;
                    });
                }, function(err) {
                    console.log("Update failed", err);
                });
            });
        }

        event.eventTitle = "";
        event.eventStart = "";
        event.dayEnd = "";
        event.eventEnd = "";
    };

    SDFService.getAll().then(function(res) {
        $scope.sallesDesFetes = res.data;
        console.log('res salle des fetes après service', $scope.sallesDesFetes);
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
            console.log("WOUHOUUUUUUUUUUUUUUUUUUUU", $scope.sallesDesFetes);
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
    $scope.addFav = function(sallesDesFetes) {
        console.log('in addFav');
        UserService.addFav($scope.user._id, sallesDesFetes).then(function(res) {
            console.log("liked sdf");
        });
    };
});