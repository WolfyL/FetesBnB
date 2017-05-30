angular.module('app')
    .service('SDFService', function($http) {
        return {
            getAll: function() {
                return $http.get('/sallesDesFetes');
            },
            getOne: function(id) {
                return $http.get('/sallesDesFetes/' + id);
            },
            create: function(sdf) {
                return $http.post('/sallesDesFetes/', sdf);
            },
            update: function(id, sdf) {
                return $http.put('/sallesDesFetes/' + id, sdf);
            },
            delete: function(id) {
                return $http.delete('/sallesDesFetes/' + id);
            },
            getById: function(sdfId) {
                return $http.get('/sallesDesFetes/' + sdfId);
            }
        };
    });