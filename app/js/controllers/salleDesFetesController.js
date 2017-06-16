angular.module('app')
  .controller('SDFController', function($scope, SDFService, EvenementService, Upload, $anchorScroll, $location, UserService, CurrentUser) {
    $scope.sallesDesFetes = [];
    $scope.sdf = {};
    $scope.user = CurrentUser.user();
    $scope.showEdit = false;
    $scope.showCreate = false;
    $scope.modifOpen = false;
    $scope.msgdenied = '';
    $scope.likeds = [];

    SDFService.getAll().then(function(res) {
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
      console.log("date", date);
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
        $scope.showCreate = false;
      };
    };

    $scope.eventClicked = function(selectedEvent) {
      console.log(selectedEvent);
      $scope.title = selectedEvent.title;
      $scope.showEdit = true;
      setTimeout(function() {
        $location.hash('modifContent');
        $anchorScroll();
      }, 200);
      console.log(selectedEvent.title);

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
        console.log("title", modif.title, "end", modif.dayEnd);
        EvenementService.update(selectedEvent._id, newEvent).then(function(res) {
          console.log("Update success");
          $scope.modifOpen = false;
          $scope.showEdit = false;
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
          $scope.showEdit = false;
          SDFService.getAll().then(function(res) {
            $scope.sallesDesFetes = res.data;
            console.log($scope.sallesDesFetes);
          });
        }, function(err) {
          console.log("Delete failed");
        });
      };

      $scope.cancelSelect = function() {
        if ($scope.modifOpen === true) {
          $scope.modifOpen = false;
        }
        $scope.showEdit = false;
        console.log($scope.showEdit);
      };
    };

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////Gestion des SDF /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    $scope.addSDF = function() {
      // $scope.lat ='';
      // $scope.lng ='';
    $scope.citySDF = $scope.citySDF.toLowerCase().trim();

      // SDFService.getCoordo($scope.citySDF).then(function(res){
      //   console.log("YOHO ET UNE BOUTEILLE DE RHUM", $scope.citySDF);
      //   $scope.coordo = res.data.results[0].geometry.location;
      //   $scope.lat = $scope.coordo.lat;
      //   $scope.lng = $scope.coordo.lng;
      //   console.log("coordoIN",$scope.lat, $scope.lng);
      // });

      SDFService.create({
        name: $scope.nameSDF,
        city: $scope.citySDF,
        postalCode: $scope.postalCodeSDF,
        adress: $scope.adressSDF,
        capacity: $scope.capacitySDF,
        surface: $scope.surfaceSDF,
        text: $scope.textSDF,
        // coordo: {
        //   lat: $scope.lat,
        //   lng: $scope.lng
        // }
      }).then(function(res) {
        SDFService.getAll().then(function(res) {
          $scope.sallesDesFetes = res.data;
          console.log($scope.sallesDesFetes);
        });
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

    $scope.editCancel = function(index) {
      $scope.editSDF[index] = false;
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
              console.log("delete succeed");
              SDFService.getAll().then(function(res) {
                $scope.sallesDesFetes = res.data;
                console.log($scope.sallesDesFetes);
              });
            }, function(err) {
              console.log("Delete failed");
            });
          } else {
            swal("Ouf!", "Votre salle a été conservé!", "error");
          }
        });
    };
    $scope.addFav = function(sallesDesFetes) {
      console.log('in addFav', $scope.likeds);
      if ($scope.user.liked.indexOf(sallesDesFetes._id) !== -1) {
        console.log(sallesDesFetes._id + 'déjà prise')
        return $scope.msgdenied = alert('La salle est deja prise');
      }
      UserService.addFav($scope.user._id, sallesDesFetes).then(function(res) {
        console.log("liked sdf");
        $scope.user.liked = res.data.liked;
      });
    };

  });
