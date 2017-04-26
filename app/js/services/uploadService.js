angular.module('app')
    .service('UploadService', function(Upload) {
        var uploadSettings = {
            url: '/upload/',
            data: {
              file: {},
            },
            method: 'POST',
            withCredentials: false,
        };

        return {
          upload: function(file) {
            var copieSettings = JSON.parse(JSON.stringify(uploadSettings));
            copieSettings.data.file = file;
            console.log(file);
            return Upload.upload(copieSettings);
          }
        };

        // return {
        //     getAll: function() {
        //         return $http.get('/upload');
        //     },
        //     getOne: function(id) {
        //         return $http.get('/upload/' + id);
        //     },
        //     create: function(img) {
        //       return $http.post('/upload/', img);
        //     },
        //     update: function(id, sdf) {
        //         return $http.put('/upload/' + id, sdf);
        //     },
        //     delete: function(id) {
        //         return $http.delete('/upload/' + id);
        //     }
        // };
    });
