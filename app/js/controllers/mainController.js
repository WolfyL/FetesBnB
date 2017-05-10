angular.module('app')
    .controller('MainController', function($scope) {
        /* Here is your main controller */
        
        $(document).ready(function() {
            $('select').material_select();
        });
    });
