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
            getResult: function(paramFilter) {
                return $http.get('/sallesDesFetes/result',{params:paramFilter});
            },
            getMySDF: function(handler) {
                return $http.get('/sallesDesFetes/adminSDF/'+ handler);
            },
            //AIzaSyCv5auTo8Sbai_cAn0L8vS1yTJi6WCIoDU
            //AIzaSyDsX7VokXB7CtKCl5wJSc-zsviHLySFJKk
            //last one : AIzaSyAwtHS2XSIYvSChTHcQPyf1Fs3K8GPSs7w
            getCoordo: function(city) {
                return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=AIzaSyAwtHS2XSIYvSChTHcQPyf1Fs3K8GPSs7w');
            },
            create: function(sdf) {
                return $http.post('/sallesDesFetes/', sdf);
            },
            update: function(id, sdf) {
                return $http.put('/sallesDesFetes/' + id, sdf);
            },
            updateImg: function(id, sdf) {
                return $http.put('/sallesDesFetes/img/' + id, sdf);
            },
            getImg: function(id, sdf) {
                return $http.get('/sallesDesFetes/img/' + id, sdf);
            },
            delete: function(id) {
                return $http.delete('/sallesDesFetes/' + id);
            },
            getById: function(sdfId) {
                return $http.get('/sallesDesFetes/' + sdfId);
            },
            getSDFHandler: function(id) {
              return $http.get('/sallesDesFetes/handler/' + id);
            }
        };
    });
