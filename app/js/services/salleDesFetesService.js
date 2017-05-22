angular.module('app')
    .service('SDFService', function($http) {
        return {
            getAll: function() {
                return $http.get('/sallesDesFetes').then(function(res) {
                  res.data = res.data.map(function(salleDesFetes) {
                      salleDesFetes.evenement = salleDesFetes.evenement.map(function(event) {
                        event.end = new Date(event.end);
                        event.start = new Date(event.start);
                        return event;
                    });
                    return salleDesFetes;
                  });
                  return res;
                }, function(err) {
                  return err;
                });
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
            }
        };
    });
