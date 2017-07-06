angular.module('app')
  .controller('DashboardController', function($scope, CurrentUser, UserService, SDFService) {
    $scope.user = CurrentUser.user();
    $scope.likeds = [];

    SDFService.getAll().then(function(res) {
      $scope.sallesDesFetes = res.data;
    });
    SDFService.getImg().then(function(res) {});

    function loadLikeds() {
      UserService.getOne(CurrentUser.user()._id).then(function(res) {
        $scope.likeds = res.data.liked;
        modalWorks();
      });

    }
    loadLikeds();

    $scope.delFav = function(id) {
      UserService.delFav($scope.user._id, id).then(function(res) {
        UserService.getOne($scope.user._id).then(function(res) {
          $scope.likeds = res.data.liked;
        });
      });
    };

    function modalWorks() {
      $(document).ready(function() {
        $('.materialboxed').materialbox();
      });
    }
    setTimeout(modalWorks, 200);

  });
