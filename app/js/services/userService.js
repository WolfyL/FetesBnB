angular.module('app')
    .service('UserService', function($http) {
        return {
            getAll: function() {
                return $http.get('/users');
            },
            getOne: function(id) {
                return $http.get('/users/' + id);
            },
            update: function(id, user) {
                return $http.put('/users/' + id, user);
            },
            addFav: function(id, sdf) {
                return $http.put('/users/sdf/liked/' + id, sdf);
            },
            delFav: function(id, sdf) {
                return $http.put('/users/liked/' + id, sdf);
            },
            delete: function(id) {
                return $http.delete('/users/' + id);
            }
        };
    });