angular.module('app')
    .service('NodeMailerService', function($http) {
        return {
            // getAll: function() {
            //     return $http.get('/nodeMailer');
            // },
            // getOne: function(id) {
            //     return $http.get('/nodeMailer/' + id);
            // },
            create: function() {
              return $http.post('/nodeMailer/');
            },
            // update: function(id, nodeMailer) {
            //     return $http.put('/nodeMailer/' + id, nodeMailer);
            // },
            // delete: function(id) {
            //     return $http.delete('/nodeMailer/' + id);
            // }
        };
    });
