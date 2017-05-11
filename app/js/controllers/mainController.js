angular.module('app')
    .controller('MainController', function($scope, CurrentUser, UserService, SDFService) {
        /* Here is your main controller */


        // UserService.getOne(CurrentUser.user()._id).then(function(res) {
        //       $scope.user = res.data;
        //       console.log($scope.user.isAdmin);
        //   });
        //   SDFService.getAll().then(function(res){
        //     console.log(res);
        //     $scope.sallesDesFetes=res.data;
        //   });


        $(document).ready(function() {
            $('select').material_select();
        });
    });
