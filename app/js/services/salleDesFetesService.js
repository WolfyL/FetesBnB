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
            update: function(id, user) {
                return $http.put('/sallesDesFetes/' + id, user);
            },
            delete: function(id) {
                return $http.delete('/sallesDesFetes/' + id);
            }
        };
    });
