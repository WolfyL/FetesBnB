angular.module('app')
    .service('EvenementService', function($http) {
        return {
            getAll: function() {
                return $http.get('/evenement');
            },
            getOne: function(id) {
                return $http.get('/evenement/' + id);
            },
            create: function(evenement) {
              return $http.post('/evenement/', evenement);
            },
            update: function(id, evenement) {
                return $http.put('/evenement/' + id, evenement);
            },
            delete: function(id) {
                return $http.delete('/evenement/' + id);
            }
        };
    });
