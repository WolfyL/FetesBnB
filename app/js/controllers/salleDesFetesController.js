angular.module('app')

    .controller('SDFController', function($scope, SDFService, EvenementService, Upload) {
        $scope.sallesDesFetes = [];
        $scope.sdf = {};
        $scope.eventsTest = [{
            title: "TEST",
            start: new Date(),
            end: new Date(),
            allDay: true
        }];

        $(document).ready(function() {
            $('.modal').modal();
        });

        $scope.eventCreatea = function(indexSDF, date, event, sdfId) {
            // console.log(event.eventStart);
            console.log('indexINDEXINDEX', indexSDF);
            // let hour = moment($scope.event.eventStart).format("hh:mm A").split(':')[0];
            // let min = moment($scope.event.eventStart).format("hh:mm").split(':')[1];
            let hourStart = moment(event.eventStart).get('hour');
            let minStart = moment(event.eventStart).get('minute');
            let startDate = moment(date).add(hourStart, 'h').add(minStart, 'm');

            let hourEnd = moment(event.eventEnd).get('hour');
            let minEnd = moment(event.eventEnd).get('minute');
            let endDate = moment(event.dayEnd).add(hourEnd, 'h').add(minEnd, 'm');

            // console.log("event.eventEnd : ", event.eventEnd);
            // console.log("event.dayEnd : ", event.dayEnd);
            //
            // console.log("minEnd avant", minEnd, typeof(minEnd));
            if (minEnd === 0) {
                console.log("minEnd apres", minEnd);
                minEnd = '00';
            }

            if (event.dayEnd !== undefined && event.eventEnd !== undefined && event.dayEnd !== '' && event.eventEnd !== '') {
                // $scope.sallesDesFetes[indexSDF].events.push({
                //     title: event.eventTitle + " fini à:" + hourEnd + ':' + minEnd,
                //     start: new Date(startDate),
                //     end: new Date(event.dayEnd),
                //     allDay: false
                // });
                console.log("CREATE", event.eventTitle, new Date(startDate), new Date(event.dayEnd));
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
                            console.log($scope.sallesDesFetes, "SDF KJMLKDJFMLDKJMLFKJS");
                            console.log($scope.sallesDesFetes[indexSDF].evenement, "MON ARRAY D EVENTS");
                        });
                    }, function(err) {
                        console.log("Update failed", err);
                    });
                });
                console.log("1");
            } else if ((event.dayEnd === undefined || event.dayEnd === '') && (event.eventEnd === undefined || event.eventEnd === '')) {
                $scope.sallesDesFetes[indexSDF].events.push({
                    title: event.eventTitle,
                    start: new Date(startDate),
                    allDay: false
                });
                console.log("2");
            } else if (event.dayEnd === undefined || event.dayEnd === '') {
                $scope.sallesDesFetes[indexSDF].events.push({
                    title: event.eventTitle + " fini à:" + hourEnd + ':' + minEnd,
                    start: new Date(startDate),
                    allDay: false
                });
                console.log("3");
            } else if (event.eventEnd === undefined || event.eventEnd === '') {
                $scope.sallesDesFetes[indexSDF].events.push({
                    title: event.eventTitle,
                    start: new Date(startDate),
                    end: new Date(event.dayEnd),
                    allDay: false
                });
                console.log("4");
            }

            event.eventTitle = "";
            event.eventStart = "";
            event.dayEnd = "";
            event.eventEnd = "";
        };

        SDFService.getAll().then(function(res) {
            $scope.sallesDesFetes = res.data;
            console.log('res salle des fetes', $scope.sallesDesFetes);
            $scope.sallesDesFetes = $scope.sallesDesFetes.map(function(salleDesFetes) {
              salleDesFetes.evenement = salleDesFetes.evenement.map(function(event) {
                event.end = new Date(event.end);
                event.start = new Date(event.start);
                return event;
              });
              return salleDesFetes;
            });
            for (var index in $scope.sallesDesFetes) {
                if ($scope.sallesDesFetes[index].events === undefined) {
                    $scope.sallesDesFetes[index].events = [];
                }
                console.log("get all res data sdf", $scope.sallesDesFetes);
                $scope.events[index] = $scope.sallesDesFetes[index].evenement;
                console.log("SCOPE EVENT", $scope.events[index]);
            }
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
    });
