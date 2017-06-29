angular.module('app').service('UploadService', function(Upload, $http) {
    var URL = '';
    return {
        uploadImage: function(file) {
            return $http.post(URL + '/img/send/:image', {
                image: file
            });
        },
        getAll: function(file) {
            return $http.get('/upload');
        }

    };
});