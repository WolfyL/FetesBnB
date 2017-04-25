angular.module('app')
    .controller('SDFController', function($scope, SDFService, UploadService, Upload) {
        $scope.sallesDesFetes = [];
        $scope.sdf = {};

        $scope.submit = function() {
            if ($scope.form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }
        };

        // upload on file select or drop
        $scope.upload = function(file) {
            UploadService.upload(file).then(function(resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function(resp) {
                console.log('Error status: ' + resp.status);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
        // for multiple files:
        $scope.uploadFiles = function(files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    UploadService.upload({
                        data: {
                            file: files[i]
                        }
                    }).then(function(res) {

                    }, function(err) {
                        console.error(err);
                    });
                }
                // or send them all together for HTML5 browsers:
                UploadService.upload({
                    data: {
                        file: files
                    }
                });
            }
        };
        //TEST UPLOAD
        ////////////////////////////////
        ////////////////////////////////
        // $scope.onFileSelect = function($files) {
        //   console.log("EVENT OPEN");
        //
        // if (angular.isArray(image)) {
        //     image = image[0];
        // }
        //
        // // This is how I handle file types in client side
        // if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
        //     alert('Only PNG and JPEG are accepted.');
        //     return;
        // }
        //
        // $scope.uploadInProgress = true;
        // $scope.uploadProgress = 0;
        //
        // $scope.upload = $upload.upload({
        //     url: '/upload/image',
        //     method: 'POST',
        //     file: image
        // }).progress(function(event) {
        //     $scope.uploadProgress = Math.floor(event.loaded / event.total);
        //     $scope.$apply();
        // }).success(function(data, status, headers, config) {
        //     $scope.uploadInProgress = false;
        //     // If you need uploaded file immediately
        //     $scope.uploadedImage = JSON.parse(data);
        // }).error(function(err) {
        //     $scope.uploadInProgress = false;
        //     console.log('Error uploading file: ' + err.message || err);
        // });
        // };
        ////////////////////////////////
        ////////////////////////////////
        ////////////////////////////////
        $(document).ready(function() {
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal').modal();

        });

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
