angular.module('app')
    .controller('SDFController', function($scope, SDFService, $http, $timeout, EvenementService, Upload, $anchorScroll, $location, UserService, CurrentUser, UploadService) {
        $scope.sallesDesFetes = [];
        $scope.sdf = {};
        $scope.user = CurrentUser.user();
        $scope.showEdit = false;
        $scope.showCreate = false;
        $scope.modifOpen = false;
        $scope.likeds = [];

        SDFService.getMySDF($scope.user._id).then(function(res){
          $scope.sallesDesFetes = res.data;
        });

        function modalWorks() {
            $(document).ready(function() {
                $('.modal').modal();
            });
        }
        setTimeout(modalWorks, 200);

        $scope.eventCreatea = function(indexSDF, date, event, sdfId) {
            $scope.dayStart = moment(date).format("D-M-Y");
            $scope.showCreate = true;
            setTimeout(function() {
                $location.hash('createContent');
                $anchorScroll();
            }, 200);

            $scope.createCancel = function() {
                $scope.showCreate = false;
            };

            $scope.createEventValidate = function(event) {
                let hourStart = moment(event.eventStart).get('hour');
                let minStart = moment(event.eventStart).get('minute');
                let startDate = moment(date).add(hourStart, 'h').add(minStart, 'm');

                let hourEnd = moment(event.eventEnd).get('hour');
                let minEnd = moment(event.eventEnd).get('minute');
                let endDate = moment(event.dayEnd).add(hourEnd, 'h').add(minEnd, 'm');

                if (minEnd === 0) {
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
                        SDFService.update($scope.sallesDesFetes[indexSDF]._id, evenement).then(function(res) {
                            SDFService.getAll().then(function(res) {
                                $scope.sallesDesFetes = res.data;
                            });
                        }, function(err) {
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
                        SDFService.update($scope.sallesDesFetes[indexSDF]._id, evenement).then(function(res) {
                            SDFService.getAll().then(function(res) {
                                $scope.sallesDesFetes = res.data;
                            });
                        }, function(err) {
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
                        SDFService.update($scope.sallesDesFetes[indexSDF]._id, evenement).then(function(res) {
                            SDFService.getAll().then(function(res) {
                                $scope.sallesDesFetes = res.data;
                            });
                        }, function(err) {
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
                        SDFService.update($scope.sallesDesFetes[indexSDF]._id, evenement).then(function(res) {
                            SDFService.getAll().then(function(res) {
                                $scope.sallesDesFetes = res.data;
                            });
                        }, function(err) {
                        });
                    });
                }

                event.eventTitle = "";
                event.eventStart = "";
                event.dayEnd = "";
                event.eventEnd = "";
                $scope.showCreate = false;
            };
        };

        $scope.eventClicked = function(selectedEvent) {
            $scope.title = selectedEvent.title;
            $scope.showEdit = true;
            setTimeout(function() {
                $location.hash('modifContent');
                $anchorScroll();
            }, 200);

            $scope.editEvent = function() {
                $scope.modifOpen = true;
            };

            $scope.editEventValidate = function(modif) {
                newEvent = {
                    title: modif.title,
                    end: new Date(modif.dayEnd),
                    allDay: false
                };
                if (modif.title === undefined) {
                    modif.title = selectedEvent.title;
                }
                EvenementService.update(selectedEvent._id, newEvent).then(function(res) {
                    $scope.modifOpen = false;
                    $scope.showEdit = false;
                    SDFService.getAll().then(function(res) {
                        $scope.sallesDesFetes = res.data;
                    });
                }, function(err) {
                });
            };

            $scope.deleteEvent = function() {
                EvenementService.delete(selectedEvent._id).then(function(res) {
                    $scope.showEdit = false;
                    SDFService.getAll().then(function(res) {
                        $scope.sallesDesFetes = res.data;
                    });
                }, function(err) {
                });
            };

            $scope.cancelSelect = function() {
                if ($scope.modifOpen === true) {
                    $scope.modifOpen = false;
                }
                $scope.showEdit = false;
            };
        };

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
                price: $scope.priceSDF,
                text: $scope.textSDF,
                handler: $scope.user._id,
            }).then(function(res) {
                SDFService.getMySDF($scope.user._id).then(function(res) {
                    $scope.sallesDesFetes = res.data;
                });
            });
            $scope.nameSDF = '';
            $scope.citySDF = '';
            $scope.postalCodeSDF = '';
            $scope.adressSDF = '';
            $scope.capacitySDF = '';
            $scope.surfaceSDF = '';
            $scope.priceSDF = '';
            $scope.textSDF = '';
        };

        $scope.editSDF = function(index) {
            $scope.editSDF[index] = true;
        };

        $scope.editCancel = function(index) {
            $scope.editSDF[index] = false;
        };

        $scope.editSDFDone = function(index, id, maNewSDF) {
            SDFService.update(id, maNewSDF).then(function(res) {
                SDFService.getMySDF($scope.user._id).then(function(res) {
                    $scope.sallesDesFetes = res.data;
                });
            }, function(err) {
            });
            $scope.editSDF[index] = false;
        };


        $scope.deleteSDF = function(sdf) {
            swal({
                    title: "Cette salle va être supprimée définitivement !",
                    text: "Confirmez-vous la suppression?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Supprimer la salle!",
                    cancelButtonText: "Oops, je vais la conserver!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        swal("Salle supprimée!", "Votre salle a été supprimé définitivement!", "success");
                        SDFService.delete(sdf._id).then(function(res) {
                            SDFService.getMySDF($scope.user._id).then(function(res) {
                                $scope.sallesDesFetes = res.data;
                            });
                        }, function(err) {
                        });
                    } else {
                        swal("Ouf!", "Votre salle a été conservé!", "error");
                    }
                });
        };
        $scope.addFav = function(sallesDesFetes) {
            if ($scope.user.liked.indexOf(sallesDesFetes._id) !== -1) {
                return sweetAlert("Impossible", "La salle actuelle se trouve déjà dans vos favoris", "error");
            }
            UserService.addFav($scope.user._id, sallesDesFetes).then(function(res) {
                $scope.user.liked = res.data.liked;
                return sweetAlert("Ok !", "La salle a bien été ajouté dans vos favoris", "success");
            });
        };
        $scope.uploadPic = function(file, id) {
            file.upload = Upload.upload({
                url: '/img/send',
                data: { file: file },
            });

            file.upload.then(function(response) {
                $timeout(function() {
                    file.result = response.data;
                });

                SDFService.updateImg(id, { image:{ imageRep: response.data.filename}}).then(
                    function(res) {

                    },
                    function(err) {

                    }
                );

            }, function(response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };

    });
