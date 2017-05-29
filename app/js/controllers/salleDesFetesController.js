angular.module('app')

    .controller('SDFController', function($scope, SDFService, EvenementService, Upload, $anchorScroll, $location) {
        $scope.sallesDesFetes = [];
        $scope.sdf = {};
        $scope.show = false;

        SDFService.getAll().then(function(res) {
            $scope.sallesDesFetes = res.data;
            console.log('res salle des fetes après service', $scope.sallesDesFetes);
        });

        $(document).ready(function() {
            $('.modal').modal();
        });
        // $('#modal1').openModal(); try replace le bail de la modal par un ng-click qui prendra l' ID de la modal clickée

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

        $scope.eventClicked = function(selectedEvent) {
            $scope.title = selectedEvent.title;
            // $scope.showDiv = function() {
            $scope.show = true;
            setTimeout(function() {
                $location.hash('finalContent');
                $anchorScroll();
            }, 200);
            console.log(selectedEvent.title);
            // };

            $scope.editEvent = function() {
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Open div with fields to change infos
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


                EvenementService.update(selectedEvent._id, newEvent).then(function(res) {
                    console.log("Update success");
                    SDFService.getAll().then(function(res) {
                        $scope.sallesDesFetes = res.data;
                    });
                }, function(err) {
                    console.log("Update failed", err);
                });
            };

            $scope.deleteEvent = function() {
                console.log(selectedEvent);
                EvenementService.delete(selectedEvent._id).then(function(res) {
                    console.log("delete succeed");
                    $scope.show = false;
                    SDFService.getAll().then(function(res) {
                        $scope.sallesDesFetes = res.data;
                        console.log($scope.sallesDesFetes);
                    });
                }, function(err) {
                    console.log("Delete failed");
                });
            };

            $scope.cancelSelect = function() {
                $scope.show = false;
                console.log($scope.show);
            };
        };

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/////////////////////////// FAIRE LE CREATE PAREIL HISTOIRE DE SAUVER L UX UI
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////Gestion des SDF /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
