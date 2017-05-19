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
            addFav: function(id, sallesDesFetes_id) {
                return $http.put('/users/sdf/' + id, {sallesDesFetes_id:sallesDesFetes_id});
            },
            delete: function(id) {
                return $http.delete('/users/' + id);
            }
        };
    });
