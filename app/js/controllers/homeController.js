angular.module('app')
    .controller('HomeController', function($scope, CurrentUser, UserService, SDFService, NgMap) {

      $scope.section = {
        color : '#edc34e',
        backColor : '#3e2b2b'
      };
      $scope.color = '#edc34e';
      $scope.backColor = '#3e2b2b';

      UserService.getOne(CurrentUser.user()._id).then(function(res) {
            $scope.user = res.data;
            console.log($scope.user.isAdmin);
        });
        SDFService.getAll().then(function(res){
          console.log(res);
          $scope.sallesDesFetes=res.data;
        });

        NgMap.getMap().then(function(map) {
          $scope.map = map;
        });

        $scope.showStore = function(evt, index) {
            console.log('evt',evt);
            console.log('index',index);
            console.log('this',this);
            $scope.sdf = $scope.sallesDesFetes[index];
            $scope.map.showInfoWindow('window', this);
        };


        $(document).ready(function() {
            $('select').material_select();
        });
    });
